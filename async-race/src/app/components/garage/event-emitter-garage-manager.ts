import type { Car } from '@ts-types';
import Emitter from '@utils/event-emitter-generic';

class EmitterGarageManager extends Emitter<[Car | boolean, ...unknown[]]> {}

export default EmitterGarageManager;
