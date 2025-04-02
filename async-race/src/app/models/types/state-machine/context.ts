import type { WinnersOrderParameter, WinnersSortParameter } from '@ts-enums';
import type { CarRequest, WinnerRequest } from '@ts-interfaces';
import type { Car, Winner } from '@ts-types';

export type Context = {
  car: Car | undefined;
  newCar: CarRequest | undefined;
  pageCars: Car[];
  carsTotal: number;
  carId: number | undefined;
  newWinner: WinnerRequest | undefined;
  pageWinners: Winner[];
  winnersTotal: number;
  winnersPerPage: number;
  winnersPageNumber: number;
  winnersSortBy: WinnersSortParameter;
  winnersSortOrder: WinnersOrderParameter;
  carsPerPage: number;
  carsPageNumber: number;
  isSoundEnabled: boolean;
};
