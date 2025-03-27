import type { EndpointType, Method } from '@ts-enums';
import type { EngineDriveModeResponse, EngineDriveQuery } from '@ts-interfaces';

export type SwitchEngineToDriveEndpoint = {
  method: Method.PATCH;
  path: [EndpointType.ENGINE];
  body: undefined;
  query: EngineDriveQuery;
  response: EngineDriveModeResponse;
};
