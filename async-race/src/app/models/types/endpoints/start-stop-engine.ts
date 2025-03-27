import type { CarStatus, EndpointType, Method } from '@ts-enums';
import type { EngineResponse } from '@ts-interfaces';

export type StartStopEngineEndpoint = {
  method: Method.PATCH;
  path: [EndpointType.ENGINE];
  body: undefined;
  query: {
    id: number;
    status: CarStatus.STARTED | CarStatus.STOPPED;
  };
  response: EngineResponse;
};
