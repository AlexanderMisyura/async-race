/* eslint-disable max-lines-per-function */
import BaseComponent from '@components/base-component';
import CarTrack from '@components/car-track/car-track';
import tag from '@components/utility-components';
import machine from '@state-machine/machine';
import { CarStatus } from '@ts-enums';
import type { Car, Context, MachinePayload } from '@ts-types';
import { getRandomHexColor, getRandomName } from '@utils/get-random';
import config from 'src/app/config';

import EmitterGarageManager from './event-emitter-garage-manager';
import * as styles from './garage.module.scss';

const INITIAL_CARS_TOTAL = 0;

export default class Garage extends BaseComponent<'div'> {
  private raceContainer: BaseComponent<'div'>;
  private totalHeading: BaseComponent<'div'> | undefined;
  private pageHeading: BaseComponent<'div'> | undefined;
  private prevButton: BaseComponent<'button'> | undefined;
  private nextButton: BaseComponent<'button'> | undefined;
  private nameInputNew: BaseComponent<'input'> | undefined;
  private colorInputNew: BaseComponent<'input'> | undefined;
  private nameInputUpdate: BaseComponent<'input'> | undefined;
  private colorInputUpdate: BaseComponent<'input'> | undefined;
  private newCarButton: BaseComponent<'button'> | undefined;
  private updateCarButton: BaseComponent<'button'> | undefined;
  private generateButton: BaseComponent<'button'> | undefined;
  private startAllButton: BaseComponent<'button'> | undefined;
  private resetAllButton: BaseComponent<'button'> | undefined;
  private carsPageNumber: number = config.DEFAULT_CARS_PAGE_NUMBER;
  private carsPerPage: number = config.DEFAULT_CARS_PER_PAGE;
  private carsTotal: number = INITIAL_CARS_TOTAL;
  private selectedCar: Car | undefined = undefined;
  private pageCars: Car[] = [];
  private emitterGarageManager: EmitterGarageManager =
    new EmitterGarageManager();
  private readonly events = {
    carSelected: 'carSelected',
    carDropSelected: 'carDropSelected',
    inputNewChanged: 'inputNewChanged',
    inputUpdateChanged: 'inputUpdateChanged',
  };

  constructor() {
    super({ elementTag: 'div', classes: [styles.garage] });

    const navigation = this.createNavigation();
    this.raceContainer = tag.div({ classes: [styles.raceContainer] });

    this.appendChildren(...this.createLines(), this.raceContainer, navigation);

    this.addListeners();
  }

  private addListeners(): void {
    machine.on(
      machine.events.machineStateChanged,
      this.handleStateChange.bind(this)
    );

    this.emitterGarageManager.on(
      this.events.carSelected,
      this.handleCarSelected.bind(this)
    );
  }

  private handleCarSelected(car: Car | boolean): void {
    this.selectedCar = car as Car;
    if (
      this.nameInputUpdate?.getElement() &&
      this.colorInputUpdate?.getElement()
    ) {
      this.nameInputUpdate.getElement().value = this.selectedCar.name;
      this.colorInputUpdate.getElement().value = this.selectedCar.color;
      this.nameInputUpdate.getElement().removeAttribute('disabled');
      this.colorInputUpdate.getElement().removeAttribute('disabled');
      this.updateCarButton?.getElement().removeAttribute('disabled');
    }
  }

  private handleStateChange(payload: MachinePayload): void {
    const { trigger, getFullContext, contextData } = payload;
    const { carsPageNumber, carsPerPage, carsTotal, pageCars } =
      getFullContext();
    switch (trigger) {
      case 'removeCar': {
        this.handleRemoveCar(
          contextData,
          carsPageNumber,
          carsPerPage,
          carsTotal,
          pageCars
        );
        break;
      }
      case 'resetRace':
      case 'resetCar': {
        this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
        this.handleReset();
        break;
      }
      case 'startRace': {
        this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
        this.resetSelectedCar();
        break;
      }
      case 'startCar': {
        this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
        this.resetAllButton?.getElement().removeAttribute('disabled');
        this.startAllButton?.getElement().setAttribute('disabled', '');
        if (contextData?.car?.id === this.selectedCar?.id) {
          this.resetSelectedCar();
        }
        break;
      }
      case 'initialize':
      case 'getCars':
      case 'addCar':
      case 'addBulkCars': {
        this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
        this.updateUI(carsPageNumber, carsTotal, pageCars);
        break;
      }
      case 'finishRace': {
        this.resetAllButton?.getElement().removeAttribute('disabled');
        this.updateNavigation();
        break;
      }
      case 'checkDriveSuccess': {
        if (this.pageCars.every((car) => car.driveSuccess === false)) {
          this.resetAllButton?.getElement().removeAttribute('disabled');
        }

        break;
      }
    }
  }

  private handleRemoveCar(
    contextData: Partial<Context> | undefined,
    carsPageNumber: number,
    carsPerPage: number,
    carsTotal: number,
    pageCars: Car[]
  ): void {
    if (contextData?.car?.id === this.selectedCar?.id) {
      this.resetSelectedCar();
    }
    this.updateData(carsPageNumber, carsPerPage, carsTotal, pageCars);
    this.updateUI(carsPageNumber, carsTotal, pageCars);
  }

  private handleReset(): void {
    const areCarsReady = this.pageCars.every((car) => {
      return car.status === CarStatus.STOPPED;
    });
    if (areCarsReady) {
      this.enableButtons();
      for (const car of this.raceContainer.childComponents) {
        if (car instanceof CarTrack) {
          car.enableControls();
        }
      }
      this.resetAllButton?.getElement().setAttribute('disabled', '');
      this.startAllButton?.getElement().removeAttribute('disabled');
      void machine.makeTransition(machine.value, 'resetToIdle');
    }
  }

  private createLines(): BaseComponent<'div'>[] {
    this.totalHeading = tag.div({
      classes: [styles.sideHeading],
      text: `Garage (0)`,
    });

    this.pageHeading = tag.div({ classes: [styles.sideHeading] });

    const inputBlockNew = this.createInputNew();
    const inputBlockUpdate = this.createInputUpdate();
    const bottomLine = this.createControlsLine();

    return [
      tag.div({ classes: [styles.line] }, inputBlockNew, this.totalHeading),
      tag.div({ classes: [styles.line] }, inputBlockUpdate, this.pageHeading),
      bottomLine,
    ];
  }

  private createControlsLine(): BaseComponent<'div'> {
    this.generateButton = this.createGenerateButton();
    this.resetAllButton = this.createResetAllButton();
    this.startAllButton = this.createStartAllButton();

    return tag.div(
      { classes: [styles.line] },
      this.generateButton,
      tag.div(
        { classes: [styles.raceControls] },
        this.resetAllButton,
        this.startAllButton
      )
    );
  }

  private createGenerateButton(): BaseComponent<'button'> {
    return tag.button({
      classes: [styles.strippedButton, 'button'],
      text: 'Generate 100 Hell Trucks',
      title: "Yeah, they're very ordinary, but they're kinda cool too",
      onclick: () => void machine.makeTransition(machine.value, 'addBulkCars'),
    });
  }

  private createResetAllButton(): BaseComponent<'button'> {
    return tag.button({
      classes: ['button'],
      text: 'Reset All',
      disabled: true,
      onclick: async () => {
        this.resetAllButton?.getElement().setAttribute('disabled', '');
        await machine.makeTransition(machine.value, 'resetRace');
      },
    });
  }

  private createStartAllButton(): BaseComponent<'button'> {
    return tag.button({
      classes: ['button'],
      text: 'Race !!!',
      onclick: async () => {
        this.disableButtons();

        if (this.pageCars.some((car) => car.status !== CarStatus.STOPPED)) {
          await machine.makeTransition(machine.value, 'resetRace');
        }

        await machine.makeTransition(machine.value, 'startRace');

        for (const car of this.pageCars) {
          void machine.makeTransition(machine.value, 'checkDriveSuccess', {
            car,
          });
        }
      },
    });
  }

  private createNavigation(): BaseComponent<'div'> {
    const ONE_PAGE = 1;

    this.prevButton = tag.button({
      classes: ['button'],
      text: '<< prev',
      onclick: async () => {
        if (
          this.pageCars.some(
            (car) =>
              car.status !== CarStatus.STOPPED || car.driveSuccess !== undefined
          )
        ) {
          await machine.makeTransition(machine.value, 'resetRace');
        }

        await machine.makeTransition(machine.value, 'getCars', {
          carsPageNumber: this.carsPageNumber - ONE_PAGE,
        });
      },
    });

    this.nextButton = tag.button({
      classes: ['button'],
      text: 'next >>',
      onclick: async () => {
        if (
          this.pageCars.some(
            (car) =>
              car.status !== CarStatus.STOPPED || car.driveSuccess !== undefined
          )
        ) {
          await machine.makeTransition(machine.value, 'resetRace');
        }

        await machine.makeTransition(machine.value, 'getCars', {
          carsPageNumber: this.carsPageNumber + ONE_PAGE,
        });
      },
    });

    return tag.div(
      { classes: [styles.navigation] },
      this.prevButton,
      this.nextButton
    );
  }

  private updateData(
    carsPageNumber: number,
    carsPerPage: number,
    carsTotal: number,
    pageCars: Car[]
  ): void {
    this.carsPageNumber = carsPageNumber;
    this.carsPerPage = carsPerPage;
    this.carsTotal = carsTotal;
    this.pageCars = pageCars;
  }

  private updateUI(
    carsPageNumber: number,
    carsTotal: number,
    pageCars: Car[]
  ): void {
    if (this.totalHeading) this.totalHeading.setText(`Garage (${carsTotal})`);

    if (this.pageHeading) this.pageHeading.setText(`Page #${carsPageNumber}`);

    this.updateNavigation();

    for (const child of this.raceContainer.childComponents) {
      if (child instanceof CarTrack) {
        this.emitterGarageManager.off(
          this.events.carDropSelected,
          child.boundUnSelect
        );
      }
    }

    this.raceContainer.removeChildren();

    for (const car of pageCars) {
      this.pageCars = this.pageCars.map((car) => ({ ...car }));
      const carTrack = new CarTrack(car, this.emitCar.bind(this));
      this.emitterGarageManager.on(
        this.events.carDropSelected,
        carTrack.boundUnSelect
      );
      this.raceContainer.appendSingle(carTrack);
    }
  }

  private createInputNew(): BaseComponent<'div'> {
    this.nameInputNew = tag.input({
      classes: [styles.nameInput, 'input'],
      placeholder: 'Cool truck name needed',
      value: getRandomName(),
      oninput: () => this.newInputHandle(),
    });

    this.colorInputNew = tag.input({
      classes: [styles.colorInput],
      type: 'color',
      value: getRandomHexColor(),
    });

    this.newCarButton = tag.button({
      classes: [styles.strippedButton, 'button'],
      text: 'New Hell Truck',
      onclick: () => this.addCar(),
    });

    this.emitterGarageManager.on(this.events.inputNewChanged, (isDisabled) => {
      if (isDisabled) {
        this.newCarButton?.getElement().setAttribute('disabled', '');
      } else {
        this.newCarButton?.getElement().removeAttribute('disabled');
      }
    });

    return tag.div(
      { classes: [styles.inputBlock] },
      this.nameInputNew,
      this.colorInputNew,
      this.newCarButton
    );
  }

  private newInputHandle(): void {
    this.emitterGarageManager.emit(
      this.events.inputNewChanged,
      !this.nameInputNew?.getElement().value
    );
  }

  private async addCar(): Promise<void> {
    if (
      this.nameInputNew?.getElement().value &&
      this.colorInputNew?.getElement().value
    ) {
      await machine.makeTransition(machine.value, 'addCar', {
        newCar: {
          name: this.nameInputNew.getElement().value,
          color: this.colorInputNew.getElement().value,
        },
      });

      this.nameInputNew.getElement().value = getRandomName();
      this.colorInputNew.getElement().value = getRandomHexColor();
    }
  }

  private emitCar(car: Car): void {
    this.emitterGarageManager.emit(this.events.carSelected, car);
    this.emitterGarageManager.emit(this.events.carDropSelected, car);
  }

  private createInputUpdate(): BaseComponent<'div'> {
    this.nameInputUpdate = tag.input({
      classes: [styles.nameInput, 'input'],
      placeholder: 'Change not-so-cool name',
      disabled: true,
      oninput: () => this.createInputHandle(),
    });

    this.colorInputUpdate = tag.input({
      classes: [styles.colorInput],
      type: 'color',
      disabled: true,
    });

    this.updateCarButton = tag.button({
      classes: ['button'],
      text: 'Update',
      disabled: true,
      onclick: () => this.updateCar(),
    });

    this.emitterGarageManager.on(
      this.events.inputUpdateChanged,
      (isDisabled) => {
        if (isDisabled) {
          this.updateCarButton?.getElement().setAttribute('disabled', '');
        } else {
          this.updateCarButton?.getElement().removeAttribute('disabled');
        }
      }
    );

    return tag.div(
      { classes: [styles.inputBlock] },
      this.nameInputUpdate,
      this.colorInputUpdate,
      this.updateCarButton
    );
  }

  private createInputHandle(): void {
    this.emitterGarageManager.emit(
      this.events.inputUpdateChanged,
      !this.nameInputUpdate?.getElement().value
    );
  }

  private updateCar(): void {
    if (
      this.nameInputUpdate?.getElement().value &&
      this.colorInputUpdate?.getElement().value &&
      this.selectedCar
    ) {
      void machine.makeTransition(machine.value, 'updateCar', {
        car: Object.assign(this.selectedCar, {
          name: this.nameInputUpdate.getElement().value,
          color: this.colorInputUpdate.getElement().value,
        }),
      });

      this.resetSelectedCar();
    }
  }

  private resetSelectedCar(): void {
    if (
      this.nameInputUpdate?.getElement() &&
      this.colorInputUpdate?.getElement()
    ) {
      this.emitterGarageManager.emit(this.events.carDropSelected, true);

      this.selectedCar = undefined;

      this.nameInputUpdate.getElement().value = '';
      this.colorInputUpdate.getElement().value = '#000000';
      this.nameInputUpdate.getElement().setAttribute('disabled', '');
      this.colorInputUpdate.getElement().setAttribute('disabled', '');
      this.updateCarButton?.getElement().setAttribute('disabled', '');
    }
  }

  private updateNavigation(): void {
    const FIRST_PAGE = 1;
    const { carsPageNumber, carsPerPage, carsTotal } = this;
    const lastPageNumber = Math.ceil(carsTotal / carsPerPage) || FIRST_PAGE;

    if (carsPageNumber > lastPageNumber && carsPageNumber !== FIRST_PAGE) {
      void machine.makeTransition(machine.value, 'getCars', {
        carsPageNumber: this.carsPageNumber - FIRST_PAGE,
      });

      return;
    }

    if (carsPageNumber === FIRST_PAGE) {
      this.prevButton?.getElement().setAttribute('disabled', '');
    } else {
      this.prevButton?.getElement().removeAttribute('disabled');
    }

    if (carsPageNumber === lastPageNumber) {
      this.nextButton?.getElement().setAttribute('disabled', '');
    } else {
      this.nextButton?.getElement().removeAttribute('disabled');
    }
  }

  private disableButtons(): void {
    this.prevButton?.getElement().setAttribute('disabled', '');
    this.nextButton?.getElement().setAttribute('disabled', '');
    this.newCarButton?.getElement().setAttribute('disabled', '');
    this.updateCarButton?.getElement().setAttribute('disabled', '');
    this.generateButton?.getElement().setAttribute('disabled', '');
    this.startAllButton?.getElement().setAttribute('disabled', '');
  }

  private enableButtons(): void {
    this.updateNavigation();
    this.newCarButton?.getElement().removeAttribute('disabled');
    this.generateButton?.getElement().removeAttribute('disabled');
    this.startAllButton?.getElement().removeAttribute('disabled');
  }
}
