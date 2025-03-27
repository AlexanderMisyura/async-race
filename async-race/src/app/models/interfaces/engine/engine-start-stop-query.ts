import type { CarStatus } from '@ts-enums';

export interface EngineStartStopQuery {
  id: number;
  status: CarStatus.STARTED | CarStatus.STOPPED;
}
