import controller from '@controller/controller';
import { CarStatus } from '@ts-enums';
import type { MachineDefinition } from '@ts-types';

import config from '../config';
import { StateMachine } from './machine-class';

const stateMachineDefinition: MachineDefinition = {
  initialState: 'state:initial',

  context: {
    car: undefined,
    newCar: undefined,
    pageCars: [],
    carsTotal: 0,
    carId: undefined,
    newWinner: undefined,
    pageWinners: [],
    winnersTotal: 0,
    winnersPerPage: config.DEFAULT_WINNERS_PER_PAGE,
    winnersPageNumber: config.DEFAULT_WINNERS_PAGE_NUMBER,
    winnersSortBy: config.DEFAULT_WINNERS_SORT_BY,
    winnersSortOrder: config.DEFAULT_WINNERS_SORT_ORDER,
    carsPerPage: config.DEFAULT_CARS_PER_PAGE,
    carsPageNumber: config.DEFAULT_CARS_PAGE_NUMBER,
    isSoundEnabled: false,
  },
  states: {
    'state:initial': {
      actions: {
        async onEnter() {},
        // eslint-disable-next-line max-lines-per-function
        async onExit(payload) {
          const { updateContext, getFullContext } = payload;

          const {
            carsPerPage,
            carsPageNumber,
            winnersPerPage,
            winnersPageNumber,
            winnersSortBy,
            winnersSortOrder,
            carsTotal,
            winnersTotal,
          } = getFullContext();

          const { data: cars, headers: carsHeaders } = await controller.getCars(
            {
              _limit: carsPerPage,
              _page: carsPageNumber,
            }
          );

          const { data: pageWinners, headers: winnersHeaders } =
            await controller.getWinners({
              _limit: winnersPerPage,
              _page: winnersPageNumber,
              _sort: winnersSortBy,
              _order: winnersSortOrder,
            });

          updateContext({
            pageCars: cars.map((car) => ({
              ...car,
              status: CarStatus.STOPPED,
              velocity: 0,
              distance: 0,
              driveSuccess: undefined,
              stopDriveController: new AbortController(),
            })),
            carsTotal: carsHeaders['X-Total-Count']
              ? Number(carsHeaders['X-Total-Count'])
              : carsTotal,
            pageWinners,
            winnersTotal: winnersHeaders['X-Total-Count']
              ? Number(winnersHeaders['X-Total-Count'])
              : winnersTotal,
          });
        },
      },
      transitions: {
        initialize: {
          target: 'state:idle',
          async action() {},
        },
      },
    },
    'state:idle': {
      actions: {
        async onEnter() {},
        async onExit() {},
      },
      transitions: {
        getCar: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, contextData } = payload;

            if (contextData?.carId) {
              const { carId } = contextData;
              const { data: car } = await controller.getCar(carId);

              updateContext({
                car: {
                  ...car,
                  status: CarStatus.STOPPED,
                  velocity: 0,
                  distance: 0,
                  driveSuccess: undefined,
                  stopDriveController: new AbortController(),
                },
              });
            }
          },
        },
        getCars: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();

            const pageNumber = contextData?.carsPageNumber ?? carsPageNumber;
            const perPage = contextData?.carsPerPage ?? carsPerPage;

            const updatedCarsData = await controller.getCars({
              _page: pageNumber,
              _limit: perPage,
            });

            updateContext({
              pageCars: updatedCarsData.data.map((car) => ({
                ...car,
                status: CarStatus.STOPPED,
                velocity: 0,
                distance: 0,
                driveSuccess: undefined,
                stopDriveController: new AbortController(),
              })),
              carsTotal: updatedCarsData.headers['X-Total-Count']
                ? Number(updatedCarsData.headers['X-Total-Count'])
                : carsTotal,
              carsPageNumber: pageNumber,
              carsPerPage: perPage,
            });
          },
        },
        getWinners: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;

            const {
              winnersPageNumber,
              winnersPerPage,
              winnersTotal,
              winnersSortBy,
              winnersSortOrder,
            } = getFullContext();

            const pageNumber =
              contextData?.winnersPageNumber ?? winnersPageNumber;
            const perPage = contextData?.winnersPerPage ?? winnersPerPage;
            const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
            const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;

            const updatedWinnersData = await controller.getWinners({
              _page: pageNumber,
              _limit: perPage,
              _sort: sortBy,
              _order: sortOrder,
            });

            updateContext({
              pageWinners: updatedWinnersData.data,
              winnersTotal: updatedWinnersData.headers['X-Total-Count']
                ? Number(updatedWinnersData.headers['X-Total-Count'])
                : winnersTotal,
              winnersPageNumber: pageNumber,
              winnersPerPage: perPage,
              winnersSortBy: sortBy,
              winnersSortOrder: sortOrder,
            });
          },
        },
        addCar: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();

            if (contextData?.newCar) {
              const { newCar } = contextData;
              await controller.createCar(newCar);

              const updatedCarsData = await controller.getCars({
                _limit: carsPerPage,
                _page: carsPageNumber,
              });

              updateContext({
                pageCars: updatedCarsData.data.map((car) => ({
                  ...car,
                  status: CarStatus.STOPPED,
                  velocity: 0,
                  distance: 0,
                  driveSuccess: undefined,
                  stopDriveController: new AbortController(),
                })),
                carsTotal: updatedCarsData.headers['X-Total-Count']
                  ? Number(updatedCarsData.headers['X-Total-Count'])
                  : carsTotal,
              });
            }
          },
        },
        addBulkCars: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext } = payload;
            const { carsPageNumber, carsPerPage, carsTotal } = getFullContext();

            await controller.createCarsBulk(config.BULK_CARS_NUMBER);

            const updatedCarsData = await controller.getCars({
              _limit: carsPerPage,
              _page: carsPageNumber,
            });

            updateContext({
              pageCars: updatedCarsData.data.map((car) => ({
                ...car,
                status: CarStatus.STOPPED,
                velocity: 0,
                distance: 0,
                driveSuccess: undefined,
                stopDriveController: new AbortController(),
              })),
              carsTotal: updatedCarsData.headers['X-Total-Count']
                ? Number(updatedCarsData.headers['X-Total-Count'])
                : carsTotal,
            });
          },
        },
        removeCar: {
          target: 'state:idle',
          // eslint-disable-next-line max-lines-per-function
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const {
              carsPageNumber,
              carsPerPage,
              carsTotal,
              winnersPageNumber,
              winnersPerPage,
              winnersSortBy,
              winnersSortOrder,
              winnersTotal,
              pageCars,
            } = getFullContext();

            if (contextData?.car) {
              const { car: carToRemove } = contextData;
              await controller.deleteCar(carToRemove.id);

              const updatedCarsData = await controller.getCars({
                _limit: carsPerPage,
                _page: carsPageNumber,
              });
              const updatedWinnersData = await controller.getWinners({
                _limit: winnersPerPage,
                _page: winnersPageNumber,
                _sort: winnersSortBy,
                _order: winnersSortOrder,
              });

              updateContext({
                pageCars: updatedCarsData.data.map((updatedCar) => {
                  const car = pageCars.find((car) => car.id === updatedCar.id);

                  return (
                    car ?? {
                      ...updatedCar,
                      status: CarStatus.STOPPED,
                      velocity: 0,
                      distance: 0,
                      driveSuccess: undefined,
                      stopDriveController: new AbortController(),
                    }
                  );
                }),
                carsTotal: updatedCarsData.headers['X-Total-Count']
                  ? Number(updatedCarsData.headers['X-Total-Count'])
                  : carsTotal,
                pageWinners: updatedWinnersData.data,
                winnersTotal: updatedWinnersData.headers['X-Total-Count']
                  ? Number(updatedWinnersData.headers['X-Total-Count'])
                  : winnersTotal,
              });
            }
          },
        },
        updateCar: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToUpdate } = contextData;
              await controller.updateCar(carToUpdate.id, {
                color: carToUpdate.color,
                name: carToUpdate.name,
              });

              updateContext({
                pageCars: pageCars.map((car) => {
                  return car.id === carToUpdate.id
                    ? Object.assign(carToUpdate, {
                        color: carToUpdate.color,
                        name: carToUpdate.name,
                      })
                    : car;
                }),
              });
            }
          },
        },
        startCar: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToStart } = contextData;

              const { data: updatedCarEngine } = await controller.startEngine(
                carToStart.id
              );

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToStart.id
                    ? Object.assign(carToStart, {
                        status: CarStatus.STARTED,
                        velocity: updatedCarEngine.velocity,
                        distance: updatedCarEngine.distance,
                        driveSuccess: undefined,
                      })
                    : car
                ),
              });
            }
          },
        },
        startRace: {
          target: 'state:race',
          async action(payload) {
            const { updateContext, getFullContext } = payload;
            const { pageCars } = getFullContext();

            const result = await Promise.all(
              pageCars.map(async (carToStart) => {
                return await controller.startEngine(carToStart.id);
              })
            );

            updateContext({
              pageCars: pageCars.map((car, index) => {
                return Object.assign(pageCars[index], {
                  status: CarStatus.STARTED,
                  velocity: result[index].data.velocity,
                  distance: result[index].data.distance,
                  driveSuccess: undefined,
                });
              }),
              newWinner: undefined,
            });
          },
        },
        checkDriveSuccess: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToCheck } = contextData;

              const {
                data: { success },
              } = await controller.driveCar(carToCheck.id);

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToCheck.id
                    ? Object.assign(carToCheck, {
                        ...car,
                        driveSuccess: success,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetCar: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToStop } = contextData;
              const { data: updatedCarEngine } = await controller.stopEngine(
                carToStop.id
              );

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToStop.id
                    ? Object.assign(carToStop, {
                        status: CarStatus.STOPPED,
                        velocity: updatedCarEngine.velocity,
                        distance: updatedCarEngine.distance,
                        driveSuccess: undefined,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetRace: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext } = payload;
            const { pageCars } = getFullContext();

            const result = await Promise.all(
              pageCars.map(async (carToStop) => {
                return await controller.stopEngine(carToStop.id);
              })
            );

            updateContext({
              pageCars: pageCars.map((car, index) =>
                Object.assign(car, {
                  status: CarStatus.STOPPED,
                  velocity: result[index].data.velocity,
                  distance: result[index].data.distance,
                  driveSuccess: undefined,
                })
              ),
            });
          },
        },
      },
    },
    'state:race': {
      actions: {
        async onEnter() {},
        async onExit() {},
      },
      transitions: {
        finishRace: {
          target: 'state:finish',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;

            const {
              winnersPageNumber,
              winnersPerPage,
              winnersSortBy,
              winnersSortOrder,
              winnersTotal,
            } = getFullContext();

            if (contextData?.newWinner) {
              const { newWinner } = contextData;

              await controller.saveWinner(newWinner);

              const updatedWinnersData = await controller.getWinners({
                _page: winnersPageNumber,
                _limit: winnersPerPage,
                _sort: winnersSortBy,
                _order: winnersSortOrder,
              });

              updateContext({
                pageWinners: updatedWinnersData.data,
                winnersTotal: updatedWinnersData.headers['X-Total-Count']
                  ? Number(updatedWinnersData.headers['X-Total-Count'])
                  : winnersTotal,
              });
            }
          },
        },
        checkDriveSuccess: {
          target: 'state:race',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToCheck } = contextData;

              const {
                data: { success },
              } = await controller.driveCar(carToCheck.id);

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToCheck.id
                    ? Object.assign(carToCheck, {
                        ...car,
                        driveSuccess: success,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetCar: {
          target: 'state:race',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToStop } = contextData;

              const { data: updatedCarEngine } = await controller.stopEngine(
                carToStop.id
              );

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToStop.id
                    ? Object.assign(carToStop, {
                        status: CarStatus.STOPPED,
                        velocity: updatedCarEngine.velocity,
                        distance: updatedCarEngine.distance,
                        driveSuccess: undefined,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetRace: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext } = payload;
            const { pageCars } = getFullContext();

            const result = await Promise.all(
              pageCars.map(async (carToStop) => {
                return await controller.stopEngine(carToStop.id);
              })
            );

            updateContext({
              pageCars: pageCars.map((car, index) =>
                Object.assign(car, {
                  status: CarStatus.STOPPED,
                  velocity: result[index].data.velocity,
                  distance: result[index].data.distance,
                  driveSuccess: undefined,
                })
              ),
            });
          },
        },
        resetToIdle: {
          target: 'state:idle',
          async action() {},
        },
        getCar: {
          target: 'state:race',
          async action(payload) {
            const { updateContext, contextData } = payload;

            if (contextData?.carId) {
              const { carId } = contextData;
              const { data: car } = await controller.getCar(carId);

              updateContext({
                car: {
                  ...car,
                  status: CarStatus.STOPPED,
                  velocity: 0,
                  distance: 0,
                  driveSuccess: undefined,
                  stopDriveController: new AbortController(),
                },
              });
            }
          },
        },
        getWinners: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;

            const {
              winnersPageNumber,
              winnersPerPage,
              winnersTotal,
              winnersSortBy,
              winnersSortOrder,
            } = getFullContext();

            const pageNumber =
              contextData?.winnersPageNumber ?? winnersPageNumber;
            const perPage = contextData?.winnersPerPage ?? winnersPerPage;
            const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
            const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;

            const updatedWinnersData = await controller.getWinners({
              _page: pageNumber,
              _limit: perPage,
              _sort: sortBy,
              _order: sortOrder,
            });

            updateContext({
              pageWinners: updatedWinnersData.data,
              winnersTotal: updatedWinnersData.headers['X-Total-Count']
                ? Number(updatedWinnersData.headers['X-Total-Count'])
                : winnersTotal,
              winnersPageNumber: pageNumber,
              winnersPerPage: perPage,
              winnersSortBy: sortBy,
              winnersSortOrder: sortOrder,
            });
          },
        },
      },
    },
    'state:finish': {
      actions: {
        async onEnter() {},
        async onExit() {},
      },
      transitions: {
        resetCar: {
          target: 'state:finish',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToStop } = contextData;
              const { data: updatedCarEngine } = await controller.stopEngine(
                carToStop.id
              );

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToStop.id
                    ? Object.assign(carToStop, {
                        status: CarStatus.STOPPED,
                        velocity: updatedCarEngine.velocity,
                        distance: updatedCarEngine.distance,
                        driveSuccess: undefined,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetRace: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext } = payload;
            const { pageCars } = getFullContext();

            const result = await Promise.all(
              pageCars.map(async (carToStop) => {
                return await controller.stopEngine(carToStop.id);
              })
            );

            updateContext({
              pageCars: pageCars.map((car, index) =>
                Object.assign(car, {
                  status: CarStatus.STOPPED,
                  velocity: result[index].data.velocity,
                  distance: result[index].data.distance,
                  driveSuccess: undefined,
                })
              ),
            });
          },
        },
        getCar: {
          target: 'state:finish',
          async action(payload) {
            const { updateContext, contextData } = payload;

            if (contextData?.carId) {
              const { carId } = contextData;
              const { data: car } = await controller.getCar(carId);

              updateContext({
                car: {
                  ...car,
                  status: CarStatus.STOPPED,
                  velocity: 0,
                  distance: 0,
                  driveSuccess: undefined,
                  stopDriveController: new AbortController(),
                },
              });
            }
          },
        },
        checkDriveSuccess: {
          target: 'state:finish',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;
            const { pageCars } = getFullContext();

            if (contextData?.car) {
              const { car: carToCheck } = contextData;

              const {
                data: { success },
              } = await controller.driveCar(carToCheck.id);

              updateContext({
                pageCars: pageCars.map((car) =>
                  car.id === carToCheck.id
                    ? Object.assign(carToCheck, {
                        ...car,
                        driveSuccess: success,
                      })
                    : car
                ),
              });
            }
          },
        },
        resetToIdle: {
          target: 'state:idle',
          async action() {},
        },
        getWinners: {
          target: 'state:idle',
          async action(payload) {
            const { updateContext, getFullContext, contextData } = payload;

            const {
              winnersPageNumber,
              winnersPerPage,
              winnersTotal,
              winnersSortBy,
              winnersSortOrder,
            } = getFullContext();

            const pageNumber =
              contextData?.winnersPageNumber ?? winnersPageNumber;
            const perPage = contextData?.winnersPerPage ?? winnersPerPage;
            const sortBy = contextData?.winnersSortBy ?? winnersSortBy;
            const sortOrder = contextData?.winnersSortOrder ?? winnersSortOrder;

            const updatedWinnersData = await controller.getWinners({
              _page: pageNumber,
              _limit: perPage,
              _sort: sortBy,
              _order: sortOrder,
            });

            updateContext({
              pageWinners: updatedWinnersData.data,
              winnersTotal: updatedWinnersData.headers['X-Total-Count']
                ? Number(updatedWinnersData.headers['X-Total-Count'])
                : winnersTotal,
              winnersPageNumber: pageNumber,
              winnersPerPage: perPage,
              winnersSortBy: sortBy,
              winnersSortOrder: sortOrder,
            });
          },
        },
      },
    },
  },
};

const machine = new StateMachine(stateMachineDefinition);

export default machine;
