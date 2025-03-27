import type { EndpointType, Method, WinnersSortParameter } from '@ts-enums';
import type { WinnerResponse } from '@ts-interfaces';

export type GetWinnersEndpoint = {
  method: Method.GET;
  path: [EndpointType.WINNERS];
  body: undefined;
  query: {
    _page?: number;
    _limit?: number;
    _sort?: WinnersSortParameter;
    _order?: 'ASC' | 'DESC';
  };
  response: WinnerResponse[];
  headers: {
    'X-Total-Count'?: string;
  };
};
