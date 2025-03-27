import type { EndpointType, Method } from '@ts-enums';
import type { CarResponse } from '@ts-interfaces';

export type GetCarsEndpoint = {
  method: Method.GET;
  path: [EndpointType.GARAGE];
  body: undefined;
  query: {
    _page?: number;
    _limit?: number;
  };
  response: CarResponse[];
  headers: {
    'X-Total-Count'?: string;
  };
};
