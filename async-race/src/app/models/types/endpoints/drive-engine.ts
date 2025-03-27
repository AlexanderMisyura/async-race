import type { CarStatus, EndpointType, Method } from '@ts-enums';
import type { EngineDriveModeResponse } from '@ts-interfaces';

export type SwitchEngineToDriveEndpoint = {
  method: Method.PATCH;
  path: [EndpointType.ENGINE];
  body: undefined;
  query: {
    id: number;
    status: CarStatus.DRIVE;
  };
  response: EngineDriveModeResponse;
};
