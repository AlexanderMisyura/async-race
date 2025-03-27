import type { EndpointType, Method } from '@ts-enums';
import type { WinnerRequest, WinnerResponse } from '@ts-interfaces';

export type UpdateWinnerEndpoint = {
  method: Method.PUT;
  path: [EndpointType.WINNERS, number];
  body: Omit<WinnerRequest, 'id'>;
  query: undefined;
  response: WinnerResponse;
};
