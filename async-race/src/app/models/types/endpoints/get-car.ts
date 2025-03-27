import type { EndpointType, Method } from '@ts-enums';
import type { CarResponse } from '@ts-interfaces';

export type GetCarEndpoint = {
  method: Method.GET;
  path: [EndpointType.GARAGE, number];
  body: undefined;
  query: undefined;
  response: CarResponse;
};
