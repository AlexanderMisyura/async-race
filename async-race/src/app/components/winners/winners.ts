import BaseComponent from '@components/base-component';
import tag from '@components/utility-components';
import WinnerRecord from '@components/winner-record/winner-record';
import machine from '@state-machine/machine';
import { WinnersOrderParameter, WinnersSortParameter } from '@ts-enums';
import type { MachinePayload, Winner } from '@ts-types';
import config from 'src/app/config';

import * as styles from './winners.module.scss';

const INITIAL_CARS_TOTAL = 0;
const INDEX_OFFSET = 1;

export default class Winners extends BaseComponent<'div'> {
  private winnersTable: BaseComponent<'div'>;
  private totalHeading: BaseComponent<'div'> | undefined;
  private pageHeading: BaseComponent<'div'> | undefined;
  private prevButton: BaseComponent<'button'> | undefined;
  private nextButton: BaseComponent<'button'> | undefined;
  private winsButton: BaseComponent<'button'> | undefined;
  private timeButton: BaseComponent<'button'> | undefined;
  private winnersPageNumber: number = config.DEFAULT_WINNERS_PAGE_NUMBER;
  private winnersPerPage: number = config.DEFAULT_WINNERS_PER_PAGE;
  private winnersSortBy: WinnersSortParameter = config.DEFAULT_WINNERS_SORT_BY;
  private winnersSortOrder: WinnersOrderParameter =
    config.DEFAULT_WINNERS_SORT_ORDER;
  private winnersTotal: number = INITIAL_CARS_TOTAL;
  private pageWinners: Winner[] = [];

  constructor() {
    super({ elementTag: 'div', classes: [styles.winners] });

    const [topLine, bottomLine] = this.createLines();
    const navigation = this.createNavigation();
    const tableHead = this.createHead();

    this.winnersTable = tag.div({ classes: [styles.winnersTable] });
    this.appendChildren(
      topLine,
      bottomLine,
      tableHead,
      this.winnersTable,
      navigation
    );

    machine.on(
      machine.events.machineStateChanged,
      this.handleStateChange.bind(this)
    );
  }

  private createHead(): BaseComponent<'div'> {
    const number = tag.div({ classes: [styles.number], text: '№' });
    const truckImage = tag.div({
      classes: [styles.truckImage],
      text: 'Truck',
    });
    const name = tag.div({ classes: [styles.name], text: 'Name' });
    this.winsButton = tag.button({
      classes: [styles.sortButton, 'button'],
      onclick: () => this.handleSortWins(),
    });
    this.timeButton = tag.button({
      classes: [styles.sortButton, 'button'],
      onclick: () => this.handleSortTime(),
    });

    return tag.div(
      { classes: [styles.head] },
      number,
      truckImage,
      name,
      this.winsButton,
      this.timeButton
    );
  }

  private handleSortWins(): void {
    let winnersSortOrder;
    const winnersSortBy = WinnersSortParameter.WINS;
    if (this.winnersSortBy === WinnersSortParameter.WINS) {
      winnersSortOrder =
        this.winnersSortOrder === WinnersOrderParameter.ASC
          ? WinnersOrderParameter.DESC
          : WinnersOrderParameter.ASC;
    } else {
      winnersSortOrder = WinnersOrderParameter.DESC;
    }

    void machine.makeTransition(machine.value, 'getWinners', {
      winnersPageNumber: this.winnersPageNumber,
      winnersPerPage: this.winnersPerPage,
      winnersSortBy,
      winnersSortOrder,
    });
  }

  private handleSortTime(): void {
    let winnersSortOrder;
    const winnersSortBy = WinnersSortParameter.TIME;
    if (this.winnersSortBy === WinnersSortParameter.TIME) {
      winnersSortOrder =
        this.winnersSortOrder === WinnersOrderParameter.ASC
          ? WinnersOrderParameter.DESC
          : WinnersOrderParameter.ASC;
    } else {
      winnersSortOrder = WinnersOrderParameter.ASC;
    }

    void machine.makeTransition(machine.value, 'getWinners', {
      winnersPageNumber: this.winnersPageNumber,
      winnersPerPage: this.winnersPerPage,
      winnersSortBy,
      winnersSortOrder,
    });
  }

  private createLines(): BaseComponent<'div'>[] {
    this.totalHeading = tag.div({
      classes: [styles.sideHeading],
      text: `Garage (0)`,
    });
    this.pageHeading = tag.div({ classes: [styles.sideHeading] });

    return [
      tag.div({ classes: [styles.line] }, this.totalHeading),
      tag.div({ classes: [styles.line] }, this.pageHeading),
    ];
  }

  private createNavigation(): BaseComponent<'div'> {
    const ONE_PAGE = 1;

    this.prevButton = tag.button({
      classes: ['button'],
      text: '<< prev',
      onclick: () =>
        machine.makeTransition(machine.value, 'getWinners', {
          winnersPageNumber: this.winnersPageNumber - ONE_PAGE,
        }),
    });

    this.nextButton = tag.button({
      classes: ['button'],
      text: 'next >>',
      onclick: () =>
        machine.makeTransition(machine.value, 'getWinners', {
          winnersPageNumber: this.winnersPageNumber + ONE_PAGE,
        }),
    });

    return tag.div(
      { classes: [styles.navigation] },
      this.prevButton,
      this.nextButton
    );
  }

  private handleStateChange(payload: MachinePayload): void {
    const { trigger, getFullContext } = payload;
    const {
      winnersPageNumber,
      winnersPerPage,
      winnersSortBy,
      winnersSortOrder,
      winnersTotal,
      pageWinners,
    } = getFullContext();

    switch (trigger) {
      case 'initialize':
      case 'getWinners':
      case 'finishRace':
      case 'removeCar': {
        this.updateData(
          winnersPageNumber,
          winnersPerPage,
          winnersSortBy,
          winnersSortOrder,
          winnersTotal,
          pageWinners
        );

        this.updateUI(
          winnersPageNumber,
          winnersSortBy,
          winnersSortOrder,
          winnersTotal,
          pageWinners
        );
        break;
      }
    }
  }

  private updateData(
    winnersPageNumber: number,
    winnersPerPage: number,
    winnersSortBy: WinnersSortParameter,
    winnersSortOrder: WinnersOrderParameter,
    winnersTotal: number,
    pageWinners: Winner[]
  ): void {
    this.winnersPageNumber = winnersPageNumber;
    this.winnersPerPage = winnersPerPage;
    this.winnersSortBy = winnersSortBy;
    this.winnersSortOrder = winnersSortOrder;
    this.winnersTotal = winnersTotal;
    this.pageWinners = pageWinners;
  }

  private updateUI(
    winnersPageNumber: number,
    winnersSortBy: WinnersSortParameter,
    winnersSortOrder: WinnersOrderParameter,
    winnersTotal: number,
    pageWinners: Winner[]
  ): void {
    if (this.totalHeading)
      this.totalHeading.setText(`Winners (${winnersTotal})`);

    if (this.pageHeading)
      this.pageHeading.setText(`Page #${winnersPageNumber}`);

    this.updateNavigation();
    this.updateHead();

    this.winnersTable.removeChildren();

    for (const [index, winner] of pageWinners.entries()) {
      const winnerRecord = new WinnerRecord(winner, index + INDEX_OFFSET);
      this.winnersTable.appendSingle(winnerRecord);
    }
  }

  private updateNavigation(): void {
    const FIRST_PAGE = 1;
    const { winnersPageNumber, winnersPerPage, winnersTotal } = this;
    const lastPageNumber =
      Math.ceil(winnersTotal / winnersPerPage) || FIRST_PAGE;

    if (
      winnersPageNumber > lastPageNumber &&
      winnersPageNumber !== FIRST_PAGE
    ) {
      void machine.makeTransition(machine.value, 'getWinners', {
        winnersPageNumber: this.winnersPageNumber - FIRST_PAGE,
      });

      return;
    }

    if (winnersPageNumber === FIRST_PAGE) {
      this.prevButton?.getElement().setAttribute('disabled', '');
    } else {
      this.prevButton?.getElement().removeAttribute('disabled');
    }

    if (winnersPageNumber === lastPageNumber) {
      this.nextButton?.getElement().setAttribute('disabled', '');
    } else {
      this.nextButton?.getElement().removeAttribute('disabled');
    }
  }

  private updateHead(): void {
    const { winnersSortBy, winnersSortOrder } = this;

    if (winnersSortBy === WinnersSortParameter.TIME) {
      if (winnersSortOrder === WinnersOrderParameter.ASC) {
        this.winsButton?.setText('Wins');
        this.timeButton?.setText('Time ↑');
      } else {
        this.winsButton?.setText('Wins');
        this.timeButton?.setText('Time ↓');
      }
    } else if (winnersSortBy === WinnersSortParameter.WINS) {
      if (winnersSortOrder === WinnersOrderParameter.ASC) {
        this.winsButton?.setText('Wins ↑');
        this.timeButton?.setText('Time');
      } else {
        this.winsButton?.setText('Wins ↓');
        this.timeButton?.setText('Time');
      }
    }
  }
}
