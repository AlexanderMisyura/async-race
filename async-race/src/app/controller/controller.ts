import { CarStatus } from '@ts-enums';
import type {
  CarRequest,
  CarResponse,
  EngineDriveModeResponse,
  EngineResponse,
  WinnerRequest,
  WinnerResponse,
} from '@ts-interfaces';
import { getRandomRacer } from '@utils/get-random';

import Loader from './loader';

function generateCars(count: number): CarRequest[] {
  return Array.from({ length: count }, () => getRandomRacer());
}

class Controller extends Loader {
  public async saveWinner(
    body: WinnerRequest
  ): Promise<{ data: WinnerResponse }> {
    try {
      return await this.createWinner(body);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === '500 - INTERNAL SERVER ERROR'
      ) {
        return await this.updateWinner(body.id, {
          time: body.time,
          wins: body.wins,
        });
      }

      throw error;
    }
  }

  public async updateCar(
    id: number,
    body: CarRequest
  ): Promise<{ data: CarResponse }> {
    try {
      return await this.updateCar(id, body);
    } catch (error) {
      if (error instanceof Error && error.message === '404 - NOT FOUND') {
        console.log('Car with such id was not found in the garage.');
      }

      throw error;
    }
  }

  public async deleteCar(id: number): Promise<{ data: Record<string, never> }> {
    try {
      try {
        await super.deleteWinner(id);
      } catch {
        // ignore
      }
      return await super.deleteCar(id);
    } catch (error) {
      if (error instanceof Error && error.message === '404 - NOT FOUND') {
        return { data: {} };
      }

      throw error;
    }
  }

  public async startEngine(id: number): Promise<{ data: EngineResponse }> {
    try {
      return await this.startStopEngine({ id, status: CarStatus.STARTED });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === '400 - BAD REQUEST') {
          console.log(
            'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
          );
        } else if (error.message === '404 - NOT FOUND') {
          console.log('Car with such id was not found in the garage.');
        }
      }

      throw error;
    }
  }

  public async stopEngine(id: number): Promise<{ data: EngineResponse }> {
    try {
      return await this.startStopEngine({ id, status: CarStatus.STOPPED });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          console.log(
            'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
          );
        } else if (error.message.includes('404')) {
          console.log('No tractor to stop. Perhaps it was removed.');
        }
      }

      throw error;
    }
  }

  public async driveCar(
    id: number,
    signal: AbortSignal
  ): Promise<{ data: EngineDriveModeResponse }> {
    try {
      return await super.switchEngineToDrive(
        { id, status: CarStatus.DRIVE },
        signal
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          console.log(
            'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
          );
        }
        if (error.message.includes('404')) {
          console.log('No tractor to drive. Perhaps it was removed.');
        }
        if (error.message.includes('429')) {
          console.log(
            "You can't make the tractor move faster! Drive is already in progress."
          );
        }
        if (error.message.includes('500')) {
          console.log('The tractor is stuck!');
          return { data: { success: false } };
        }
      }

      throw error;
    }
  }

  public async createCarsBulk(count: number): Promise<{
    data: CarResponse[];
  }> {
    const cars = generateCars(count);
    const carPromiseArray = cars.map((car) => this.createCar(car));
    const carsResponses = await Promise.all(carPromiseArray);
    const data = carsResponses.map((response) => response.data);

    return { data };
  }
}

export default new Controller();
