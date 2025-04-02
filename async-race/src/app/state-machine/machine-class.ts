import type { Context, MachineDefinition, MachinePayload } from '@ts-types';

import Emitter from './event-emitter-machine';

export class StateMachine {
  public value: MachineDefinition['initialState'];
  public context: MachineDefinition['context'];
  public readonly events = {
    machineStateChanged: 'machineStateChanged',
  } as const;
  private emitter: Emitter = new Emitter();
  private definition: MachineDefinition;

  constructor(stateMachineDefinition: MachineDefinition) {
    this.definition = stateMachineDefinition;
    this.value = stateMachineDefinition.initialState;
    this.context = stateMachineDefinition.context;
  }

  public async makeTransition(
    currentState: string,
    trigger: string,
    contextData?: Partial<Context>
  ): Promise<string | void> {
    const currentStateDefinition = this.definition.states[currentState];
    const destinationTransition = currentStateDefinition.transitions[trigger];

    if (!destinationTransition) return;

    const destinationState = destinationTransition.target;
    const destinationStateDefinition = this.definition.states[destinationState];

    const payload: MachinePayload = {
      updateContext: this.updateContext.bind(this),
      getFullContext: this.getFullContext.bind(this),
      contextData,
      trigger,
    };

    try {
      await destinationTransition.action?.(payload);
      await currentStateDefinition.actions.onExit?.(payload);
      await destinationStateDefinition.actions.onEnter?.(payload);

      this.value = destinationState;
      this.emit(this.events.machineStateChanged, payload);
    } catch (error) {
      console.log(
        `An error occurred during state machine's transition from ${currentState} to ${destinationState}:`,
        error
      );
    }

    return this.value;
  }

  public updateContext(contextData: Partial<Context>): void {
    this.context = { ...this.context, ...contextData };
  }

  public getFullContext(): Context {
    return this.context;
  }

  public on(
    event: string,
    callback: (payload: MachinePayload, ...other: unknown[]) => void
  ): void {
    this.emitter.on(event, callback);
  }

  public emit(
    event: string,
    payload: MachinePayload,
    ...other: unknown[]
  ): void {
    this.emitter.emit(event, payload, ...other);
  }
}
