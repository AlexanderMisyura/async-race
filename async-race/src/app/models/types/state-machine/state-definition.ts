import type { MachinePayload } from '@ts-types';

export type StateDefinition = {
  actions: {
    onEnter?(payload: MachinePayload): Promise<void>;
    onExit?(payload: MachinePayload): Promise<void>;
  };
  transitions: {
    [key: string]: {
      target: string;
      action?(payload: MachinePayload): Promise<void>;
    };
  };
};
