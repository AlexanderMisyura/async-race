import BaseComponent from '@components/base-component';
import createSvgChunk from '@components/create-svg-chunk';
import { modal } from '@components/modal/modal';
import tag from '@components/utility-components';
import machine from '@state-machine/machine';
import { CarStatus } from '@ts-enums';
import type { Car, Context, MachinePayload, Winner } from '@ts-types';
import animate from '@utils/animate';
import { easeInQuad } from '@utils/timing-function';

import flagSvg from '../../assets/img/flag.svg';
import racerSvg from '../../assets/img/monster-truck.svg';
import * as styles from './car-track.module.scss';

const RESET_TIMEOUT = 2000;

export default class CarTrack extends BaseComponent {
  public boundUnSelect: (car: Car | boolean) => void;
  private selectButton: BaseComponent<'button'> | undefined;
  private removeButton: BaseComponent<'button'> | undefined;
  private carName: BaseComponent<'div'> | undefined;
  private startButton: BaseComponent<'button'> | undefined;
  private stopButton: BaseComponent<'button'> | undefined;
  private racer: BaseComponent<'div'>;
  private track: BaseComponent<'div'>;
  private racerSvg: SVGElement;
  private isAnimating: boolean = false;

  constructor(
    private carData: Car,
    private emitCar: (car: Car) => void
  ) {
    super({ elementTag: 'div', classes: [styles.trackSection] });

    this.boundUnSelect = this.unSelect.bind(this);

    const controls = tag.div(
      { classes: [styles.controls] },
      ...this.createControls()
    );

    this.racerSvg = createSvgChunk(racerSvg, ['icon', 'iconShadow']);
    this.racerSvg.style.color = this.carData.color;
    this.racer = tag.div({ classes: [styles.racer] });
    this.racer.getElement().append(this.racerSvg);

    const flag = createSvgChunk(flagSvg, ['icon']);
    const finish = tag.div({ classes: [styles.finish] });
    finish.getElement().append(flag);

    this.track = tag.div({ classes: [styles.track] }, this.racer, finish);

    this.appendChildren(controls, this.track);

    this.addListeners();
  }

  public enableStart(): void {
    this.startButton?.getElement().removeAttribute('disabled');
  }

  public enableSelect(): void {
    this.selectButton?.getElement().removeAttribute('disabled');
  }

  public enableRemove(): void {
    this.removeButton?.getElement().removeAttribute('disabled');
  }

  public enableControls(): void {
    this.enableStart();
    this.enableSelect();
    this.enableRemove();
  }

  public disableSelectRemoveControls(): void {
    this.selectButton?.getElement().setAttribute('disabled', '');
    this.removeButton?.getElement().setAttribute('disabled', '');
  }

  public enableSelectRemoveControls(): void {
    this.enableSelect();
    this.enableRemove();
  }

  public async start(): Promise<void> {
    await machine.makeTransition(machine.value, 'startCar', {
      car: this.carData,
    });
  }

  public unSelect(car: Car | boolean): void {
    if (typeof car === 'object' && car.id === this.carData.id) return;

    this.racer.removeClasses(styles.selected);
  }

  private addListeners(): void {
    machine.on(
      machine.events.machineStateChanged,
      this.handleStateChange.bind(this)
    );
  }

  private createCarControls(): BaseComponent<'div'> {
    this.startButton = tag.button(
      {
        classes: [styles.raceButton, styles.active, 'button'],
        onclick: () => {
          this.startButton?.getElement().setAttribute('disabled', '');
          void this.start();
        },
      },
      tag.div({ classes: [styles.buttonText], text: 'start' })
    );

    this.stopButton = tag.button(
      {
        classes: [styles.raceButton, 'button'],
        onclick: () => {
          this.stopButton?.getElement().setAttribute('disabled', '');
          void this.reset();
        },
        disabled: true,
      },
      tag.div({ classes: [styles.buttonText], text: 'reset' })
    );

    return tag.div(
      { classes: [styles.buttonsContainer] },
      this.startButton,
      this.stopButton
    );
  }

  private createControls(): [
    BaseComponent<'button'>,
    BaseComponent<'button'>,
    BaseComponent<'div'>,
    BaseComponent<'div'>,
  ] {
    this.selectButton = tag.button({
      classes: [styles.select, 'button'],
      text: 'Select',
      onclick: () => {
        if (this.carData.status === CarStatus.STOPPED) {
          this.racer.addClasses(styles.selected);
          this.emitCar(this.carData);
        }
      },
    });

    this.removeButton = tag.button({
      classes: [styles.remove, 'button'],
      text: 'Remove',
      onclick: () => this.removeCar(),
    });

    this.carName = tag.div({
      classes: [styles.name],
      text: this.carData.name,
    });

    return [
      this.selectButton,
      this.removeButton,
      this.carName,
      this.createCarControls(),
    ];
  }

  private async reset(): Promise<void> {
    await machine.makeTransition(machine.value, 'resetCar', {
      car: this.carData,
    });
  }

  private async removeCar(): Promise<void> {
    await machine.makeTransition(machine.value, 'removeCar', {
      car: this.carData,
    });
    this.carData.id = Number.NaN;
  }

  // eslint-disable-next-line max-lines-per-function
  private handleStateChange(payload: MachinePayload): void {
    const { trigger, getFullContext, contextData } = payload;
    switch (trigger) {
      case 'startRace': {
        const { pageCars } = getFullContext();
        if (!pageCars.includes(this.carData)) break;
        this.handleStartRace(getFullContext());
        break;
      }
      case 'startCar': {
        this.disableSelectRemoveControls();

        if (
          Number.isNaN(this.carData.id) ||
          contextData?.car !== this.carData ||
          !getFullContext().pageCars.includes(this.carData)
        )
          break;

        this.handleStartRace(getFullContext());
        void machine.makeTransition(machine.value, 'checkDriveSuccess', {
          car: this.carData,
        });
        break;
      }
      case 'resetCar': {
        if (contextData?.car?.id !== this.carData.id) break;
        this.handleResetCar(getFullContext());
        break;
      }
      case 'resetRace': {
        this.enableSelectRemoveControls();
        this.handleResetCar(getFullContext());
        break;
      }
      case 'resetToIdle': {
        this.enableSelectRemoveControls();
        break;
      }
      case 'updateCar': {
        if (contextData?.car?.id !== this.carData.id) break;
        this.handleUpdateCar(contextData.car);
        break;
      }
      case 'checkDriveSuccess': {
        if (contextData?.car !== this.carData) break;
        this.updateCarTrack(getFullContext());
        break;
      }
      case 'finishRace': {
        const { pageCars, car } = getFullContext();
        if (
          contextData?.newWinner &&
          contextData.newWinner.id === this.carData.id &&
          car === this.carData &&
          car &&
          pageCars.includes(this.carData)
        ) {
          this.showWinner(contextData.newWinner);
        }
      }
    }
  }

  private handleResetCar(context: Context): void {
    if (this.startButton && this.stopButton) {
      if (machine.value !== 'state:race' && machine.value !== 'state:finish') {
        setTimeout(() => {
          this.startButton?.getElement().removeAttribute('disabled');
        }, RESET_TIMEOUT);
      }
      this.stopButton.getElement().setAttribute('disabled', '');
      this.startButton.addClasses(styles.active);
      this.stopButton.removeClasses(styles.active);
    }

    this.updateCarTrack(context);
  }

  private handleUpdateCar(car: Car): void {
    this.carData = Object.assign(this.carData, car);
    this.carName?.setText(this.carData.name);
    this.racerSvg.style.color = this.carData.color;
  }

  private handleStartRace(context: Context): void {
    this.updateCarTrack(context);

    if (this.startButton && this.stopButton) {
      this.startButton.getElement().setAttribute('disabled', '');
      this.stopButton.getElement().removeAttribute('disabled');
      this.startButton.removeClasses(styles.active);
      this.stopButton.addClasses(styles.active);
    }

    this.disableSelectRemoveControls();
  }

  private updateCarTrack(context: Context): void {
    const updatedCar = context.pageCars.find((car) => car === this.carData);

    if (!updatedCar) return;

    this.updateCarData(updatedCar);

    switch (this.carData.driveSuccess) {
      case undefined: {
        if (this.carData.status === CarStatus.STARTED) {
          this.updateStartedCar();
          break;
        } else if (this.carData.status === CarStatus.STOPPED) {
          this.updateStoppedCar();
        }
        break;
      }
      case true: {
        this.isAnimating = false;

        if (this.carData.status === CarStatus.STOPPED) {
          void machine.makeTransition(machine.value, 'resetCar', {
            car: this.carData,
          });
          break;
        }

        if (machine.getFullContext().newWinner) break;
        else this.updateWonCar();

        break;
      }
      case false: {
        this.updateDriveUnsuccessfulCar();
        break;
      }
    }
  }

  private updateCarData(updatedCarData: Car): void {
    this.carData.status = updatedCarData.status;
    this.carData.distance = updatedCarData.distance;
    this.carData.velocity = updatedCarData.velocity;
    this.carData.driveSuccess = updatedCarData.driveSuccess;
  }

  private updateStartedCar(): void {
    const THROTTLE_DURATION_MS = 2000;

    this.addClasses(styles.raceActive);

    this.racerSvg.classList.add(styles.throttle);
    setTimeout(() => {
      this.racerSvg.classList.remove(styles.throttle);
    }, THROTTLE_DURATION_MS);

    this.isAnimating = true;
    const duration = this.carData.distance / this.carData.velocity;

    animate({
      duration,
      timing: easeInQuad,
      draw: this.moveRacer.bind(this),
    });
  }

  private updateStoppedCar(): void {
    this.isAnimating = false;
    this.removeClasses(styles.raceActive);
    this.racerSvg.classList.remove(styles.throttle);
    this.racer.getElement().style = '';
  }

  private updateWonCar(): void {
    const ROUNDING_DIGITS = 2;
    const msInSecond = 1000;
    const timeSeconds = Number(
      (this.carData.distance / this.carData.velocity / msInSecond).toFixed(
        ROUNDING_DIGITS
      )
    );

    const winner = {
      id: this.carData.id,
      wins: 1,
      time: timeSeconds,
    };

    machine.updateContext({ car: this.carData, newWinner: winner });

    void machine.makeTransition(machine.value, 'finishRace', {
      newWinner: winner,
    });
  }

  private updateDriveUnsuccessfulCar(): void {
    this.isAnimating = false;
    this.racerSvg.classList.remove(styles.throttle);

    if (this.carData.status === CarStatus.STOPPED) {
      void machine.makeTransition(machine.value, 'resetCar', {
        car: this.carData,
      });
    }
  }

  private showWinner(winner: Winner): void {
    modal.showModal(this.createWinnerMessage(winner));
  }

  private createWinnerMessage(winner: Winner): BaseComponent<'div'> {
    const hail = tag.div({
      text: 'HAIL',
      classes: [styles.emphasized],
    });
    const name = tag.div({
      text: `${this.carData.name} !!!`,
      classes: [styles.emphasized, styles.winnerName],
    });
    const message = tag.div({
      text: `who finished The METAL HELLSYNC RACE first in ${winner.time} seconds!`,
      classes: [styles.emphasized],
    });

    return tag.div({}, hail, name, message);
  }

  private moveRacer(progress: number): void {
    const RACER_WIDTH = 57;
    const distance = this.track.getElement().clientWidth - RACER_WIDTH;

    if (!this.isAnimating) return;

    this.racer.getElement().style.transform = `translateX(${distance * progress}px)`;
  }
}
