import type { EndpointType, Method } from '@ts-enums';
import type { CarResponse, CarsQuery } from '@ts-interfaces';

export type GetCarsEndpoint = {
  method: Method.GET;
  path: [EndpointType.GARAGE];
  body: undefined;
  query: CarsQuery;
  response: CarResponse[];
  headers: {
    'X-Total-Count'?: string;
  };
};
