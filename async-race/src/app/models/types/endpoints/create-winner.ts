import type { EndpointType, Method } from '@ts-enums';
import type { WinnerRequest, WinnerResponse } from '@ts-interfaces';

export type CreateWinnerEndpoint = {
  method: Method.POST;
  path: [EndpointType.WINNERS];
  body: WinnerRequest;
  query: undefined;
  response: WinnerResponse;
};
