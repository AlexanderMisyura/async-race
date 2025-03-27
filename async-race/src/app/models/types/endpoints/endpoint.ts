import type { CreateCarEndpoint } from './create-car';
import type { CreateWinnerEndpoint } from './create-winner';
import type { DeleteCarEndpoint } from './delete-car';
import type { DeleteWinnerEndpoint } from './delete-winner';
import type { SwitchEngineToDriveEndpoint } from './drive-engine';
import type { GetCarEndpoint } from './get-car';
import type { GetCarsEndpoint } from './get-cars';
import type { GetWinnerEndpoint } from './get-winner';
import type { GetWinnersEndpoint } from './get-winners';
import type { StartStopEngineEndpoint } from './start-stop-engine';
import type { UpdateCarEndpoint } from './update-car';
import type { UpdateWinnerEndpoint } from './update-winner';

export type Endpoint =
  | GetCarsEndpoint
  | GetCarEndpoint
  | CreateCarEndpoint
  | DeleteCarEndpoint
  | UpdateCarEndpoint
  | StartStopEngineEndpoint
  | SwitchEngineToDriveEndpoint
  | GetWinnersEndpoint
  | GetWinnerEndpoint
  | CreateWinnerEndpoint
  | DeleteWinnerEndpoint
  | UpdateWinnerEndpoint;
