import type { EndpointType, Method } from '@ts-enums';
import type { CarRequest, CarResponse } from '@ts-interfaces';

export type CreateCarEndpoint = {
  method: Method.POST;
  path: [EndpointType.GARAGE];
  body: CarRequest;
  query: undefined;
  response: CarResponse;
};
