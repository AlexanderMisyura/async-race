import type { EndpointType, Method } from '@ts-enums';
import type { WinnerResponse, WinnersQuery } from '@ts-interfaces';

export type GetWinnersEndpoint = {
  method: Method.GET;
  path: [EndpointType.WINNERS];
  body: undefined;
  query: WinnersQuery;
  response: WinnerResponse[];
  headers: {
    'X-Total-Count'?: string;
  };
};
