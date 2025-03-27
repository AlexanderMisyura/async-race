import type { EndpointType, Method } from '@ts-enums';
import type { EngineResponse, EngineStartStopQuery } from '@ts-interfaces';

export type StartStopEngineEndpoint = {
  method: Method.PATCH;
  path: [EndpointType.ENGINE];
  body: undefined;
  query: EngineStartStopQuery;
  response: EngineResponse;
};
