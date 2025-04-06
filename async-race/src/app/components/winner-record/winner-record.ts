import BaseComponent from '@components/base-component';
import createSvgChunk from '@components/create-svg-chunk';
import tag from '@components/utility-components';
import machine from '@state-machine/machine';
import type { Car, MachinePayload, Winner } from '@ts-types';

import racerSvg from '../../assets/img/monster-truck.svg';
import * as styles from './winner-record.module.scss';

export default class WinnerRecord extends BaseComponent<'div'> {
  private id: BaseComponent<'div'> | undefined;
  private image: BaseComponent<'div'> | undefined;
  private name: BaseComponent<'div'> | undefined;
  private wins: BaseComponent<'div'> | undefined;
  private racerSvg: SVGElement | undefined;
  private racer: BaseComponent<'div'> | undefined;
  private bestTime: BaseComponent<'div'> | undefined;

  constructor(
    private winnerData: Winner,
    seqNumber: number
  ) {
    super({ elementTag: 'div', classes: [styles.winnerRecord] });

    void machine.makeTransition(machine.value, 'getCar', {
      carId: this.winnerData.id,
    });

    const recordFields = this.createRecordFields(seqNumber);

    this.appendChildren(...recordFields);

    machine.on(
      machine.events.machineStateChanged,
      this.handleStateChange.bind(this)
    );
  }

  private handleStateChange(payload: MachinePayload): void {
    const { trigger, getFullContext, contextData } = payload;

    switch (trigger) {
      case 'updateCar': {
        if (contextData?.car?.id !== this.winnerData.id) break;

        this.updateRecord(contextData.car);

        break;
      }

      case 'getCar': {
        if (contextData?.carId !== this.winnerData.id) break;
        const { car } = getFullContext();
        if (car) this.updateRecord(car);
      }
    }
  }

  private createRecordFields(seqNumber: number): BaseComponent<'div'>[] {
    const number = tag.div({
      classes: [styles.number],
      text: seqNumber.toString(),
    });
    this.racer = tag.div({ classes: [styles.racer] });
    this.racerSvg = createSvgChunk(racerSvg, ['iconSmall']);
    this.racer.getElement().append(this.racerSvg);
    this.name = tag.div({ classes: [styles.name] });
    const nameContainer = tag.div(
      { classes: [styles.nameContainer] },
      this.name
    );
    this.wins = tag.div({
      classes: [styles.wins],
      text: this.winnerData.wins.toString(),
    });
    this.bestTime = tag.div({
      classes: [styles.bestTime],
      text: this.winnerData.time.toString(),
    });

    return [number, this.racer, nameContainer, this.wins, this.bestTime];
  }

  private updateRecord(car: Car): void {
    if (this.racer) this.racer.getElement().style.color = car.color;
    this.name?.setText(car.name);
  }
}
