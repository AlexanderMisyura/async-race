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
      const { data: existedWinner } = await this.getWinner(body.id);

      return await this.updateWinner(body.id, {
        wins: existedWinner.wins + body.wins,
        time: Math.min(existedWinner.time, body.time),
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return await this.createWinner({
          id: body.id,
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
      return await super.updateCar(id, body);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404)')) {
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
        console.log('Car was not found in the winners list.');
      }
      return await super.deleteCar(id);
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
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
        if (error.message.includes('400')) {
          console.log(
            'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
          );
        } else if (error.message.includes('404')) {
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
          console.log('No truck to stop. Perhaps it was removed.');
        }
      }

      throw error;
    }
  }

  public async driveCar(
    id: number
  ): Promise<{ data: EngineDriveModeResponse }> {
    try {
      const result = await super.switchEngineToDrive({
        id,
        status: CarStatus.DRIVE,
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          console.log(
            'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
          );
        }
        if (error.message.includes('404')) {
          console.log(
            "No truck to drive. Perhaps it wasn't started beforehand or was removed."
          );
        }
        if (error.message.includes('429')) {
          console.log(
            "You can't make the truck move faster! Drive is already in progress."
          );
        }
        if (error.message.includes('500')) {
          console.log('The truck has burned down! Hell yeah!');
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
