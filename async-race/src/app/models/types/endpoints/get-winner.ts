import type { EndpointType, Method } from '@ts-enums';
import type { WinnerResponse } from '@ts-interfaces';

export type GetWinnerEndpoint = {
  method: Method.GET;
  path: [EndpointType.WINNERS, number];
  body: undefined;
  query: undefined;
  response: WinnerResponse;
};
