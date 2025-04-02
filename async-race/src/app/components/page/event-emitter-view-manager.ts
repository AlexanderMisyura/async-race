import type { PageView } from '@ts-types';
import Emitter from '@utils/event-emitter-generic';

class EmitterViewManager extends Emitter<[PageView, ...unknown[]]> {}

export default EmitterViewManager;
