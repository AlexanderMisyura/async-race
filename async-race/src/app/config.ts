import { WinnersOrderParameter, WinnersSortParameter } from '@ts-enums';

export default {
  API_URL: 'http://localhost:3000/',
  DEFAULT_WINNERS_PER_PAGE: 7,
  DEFAULT_WINNERS_PAGE_NUMBER: 1,
  DEFAULT_WINNERS_SORT_BY: WinnersSortParameter.TIME,
  DEFAULT_WINNERS_SORT_ORDER: WinnersOrderParameter.ASC,
  DEFAULT_CARS_PER_PAGE: 7,
  DEFAULT_CARS_PAGE_NUMBER: 1,
} as const;
