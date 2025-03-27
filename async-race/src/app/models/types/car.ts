import type { CarStatus } from '@ts-enums';

export type Car = {
  name: string;
  color: string;
  id: number;
  status: CarStatus;
  velocity: number;
  distance: number;
  wins: number | undefined;
  bestWinTime: undefined | number;
};
