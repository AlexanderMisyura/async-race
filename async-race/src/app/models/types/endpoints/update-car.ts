import type { EndpointType, Method } from '@ts-enums';
import type { CarRequest, CarResponse } from '@ts-interfaces';

export type UpdateCarEndpoint = {
  method: Method.PUT;
  path: [EndpointType.GARAGE, number];
  body: CarRequest;
  query: undefined;
  response: CarResponse;
};
