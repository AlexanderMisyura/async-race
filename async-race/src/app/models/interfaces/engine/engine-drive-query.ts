import type { CarStatus } from '@ts-enums';

export interface EngineDriveQuery {
  id: number;
  status: CarStatus.DRIVE;
}
