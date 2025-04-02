import { EndpointType, Method } from '@ts-enums';
import type {
  CarRequest,
  CarResponse,
  CarsQuery,
  EngineDriveModeResponse,
  EngineDriveQuery,
  EngineResponse,
  EngineStartStopQuery,
  WinnerRequest,
  WinnerResponse,
  WinnersQuery,
} from '@ts-interfaces';
import type {
  CreateCarEndpoint,
  CreateWinnerEndpoint,
  DeleteCarEndpoint,
  DeleteWinnerEndpoint,
  EndpointRequest,
  GetCarEndpoint,
  GetCarsEndpoint,
  GetWinnerEndpoint,
  GetWinnersEndpoint,
  StartStopEngineEndpoint,
  SwitchEngineToDriveEndpoint,
  UpdateCarEndpoint,
  UpdateWinnerEndpoint,
} from '@ts-types';
import makeRequest from '@utils/make-request';

import config from '../config';

export default class Loader {
  private API_URL = config.API_URL;

  public async getCars(carQuery: CarsQuery): Promise<{
    data: CarResponse[];
    headers: Record<string, string | null | undefined>;
  }> {
    return makeRequest<GetCarsEndpoint, EndpointRequest<GetCarsEndpoint>>(
      this.API_URL,
      {
        method: Method.GET,
        path: [EndpointType.GARAGE],
        body: undefined,
        query: carQuery,
      }
    );
  }

  public async getCar(id: number): Promise<{ data: CarResponse }> {
    return makeRequest<GetCarEndpoint, EndpointRequest<GetCarEndpoint>>(
      this.API_URL,
      {
        method: Method.GET,
        path: [EndpointType.GARAGE, id],
        body: undefined,
        query: undefined,
      }
    );
  }

  public async createCar(body: CarRequest): Promise<{ data: CarResponse }> {
    return makeRequest<CreateCarEndpoint, EndpointRequest<CreateCarEndpoint>>(
      this.API_URL,
      {
        method: Method.POST,
        path: [EndpointType.GARAGE],
        body,
        query: undefined,
      }
    );
  }

  public async deleteCar(id: number): Promise<{ data: Record<string, never> }> {
    return makeRequest<DeleteCarEndpoint, EndpointRequest<DeleteCarEndpoint>>(
      this.API_URL,
      {
        method: Method.DELETE,
        path: [EndpointType.GARAGE, id],
        body: undefined,
        query: undefined,
      }
    );
  }

  public async updateCar(
    id: number,
    body: CarRequest
  ): Promise<{ data: CarResponse }> {
    return makeRequest<UpdateCarEndpoint, EndpointRequest<UpdateCarEndpoint>>(
      this.API_URL,
      {
        method: Method.PUT,
        path: [EndpointType.GARAGE, id],
        body,
        query: undefined,
      }
    );
  }

  public async startStopEngine(
    query: EngineStartStopQuery
  ): Promise<{ data: EngineResponse }> {
    return makeRequest<
      StartStopEngineEndpoint,
      EndpointRequest<StartStopEngineEndpoint>
    >(this.API_URL, {
      method: Method.PATCH,
      path: [EndpointType.ENGINE],
      body: undefined,
      query,
    });
  }

  public async switchEngineToDrive(
    query: EngineDriveQuery,
    signal: AbortSignal
  ): Promise<{ data: EngineDriveModeResponse }> {
    return makeRequest<
      SwitchEngineToDriveEndpoint,
      EndpointRequest<SwitchEngineToDriveEndpoint>
    >(
      this.API_URL,
      {
        method: Method.PATCH,
        path: [EndpointType.ENGINE],
        body: undefined,
        query,
      },
      signal
    );
  }

  public async getWinners(query: WinnersQuery): Promise<{
    data: WinnerResponse[];
    headers: Record<string, string | null | undefined>;
  }> {
    return makeRequest<GetWinnersEndpoint, EndpointRequest<GetWinnersEndpoint>>(
      this.API_URL,
      {
        method: Method.GET,
        path: [EndpointType.WINNERS],
        body: undefined,
        query,
      }
    );
  }

  public async getWinner(id: number): Promise<{ data: WinnerResponse }> {
    return makeRequest<GetWinnerEndpoint, EndpointRequest<GetWinnerEndpoint>>(
      this.API_URL,
      {
        method: Method.GET,
        path: [EndpointType.WINNERS, id],
        body: undefined,
        query: undefined,
      }
    );
  }

  public async createWinner(
    body: WinnerRequest
  ): Promise<{ data: WinnerResponse }> {
    return makeRequest<
      CreateWinnerEndpoint,
      EndpointRequest<CreateWinnerEndpoint>
    >(this.API_URL, {
      method: Method.POST,
      path: [EndpointType.WINNERS],
      body,
      query: undefined,
    });
  }

  public deleteWinner(id: number): Promise<{ data: Record<string, never> }> {
    return makeRequest<
      DeleteWinnerEndpoint,
      EndpointRequest<DeleteWinnerEndpoint>
    >(this.API_URL, {
      method: Method.DELETE,
      path: [EndpointType.WINNERS, id],
      body: undefined,
      query: undefined,
    });
  }

  public updateWinner(
    id: number,
    body: Omit<WinnerRequest, 'id'>
  ): Promise<{ data: WinnerResponse }> {
    return makeRequest<
      UpdateWinnerEndpoint,
      EndpointRequest<UpdateWinnerEndpoint>
    >(this.API_URL, {
      method: Method.PUT,
      path: [EndpointType.WINNERS, id],
      body,
      query: undefined,
    });
  }
}
