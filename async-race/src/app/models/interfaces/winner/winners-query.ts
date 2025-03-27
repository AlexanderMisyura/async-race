import type { WinnersOrderParameter, WinnersSortParameter } from '@ts-enums';

export interface WinnersQuery {
  _page?: number;
  _limit?: number;
  _sort?: WinnersSortParameter;
  _order?: WinnersOrderParameter;
}
