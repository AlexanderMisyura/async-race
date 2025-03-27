import type { EndpointType, Method } from '@ts-enums';

export type DeleteCarEndpoint = {
  method: Method.DELETE;
  path: [EndpointType.GARAGE, number];
  body: undefined;
  query: undefined;
  response: Record<string, never>;
};
