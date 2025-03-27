import type { EndpointType, Method } from '@ts-enums';

export type DeleteWinnerEndpoint = {
  method: Method.DELETE;
  path: [EndpointType.WINNERS, number];
  body: undefined;
  query: undefined;
  response: Record<string, never>;
};
