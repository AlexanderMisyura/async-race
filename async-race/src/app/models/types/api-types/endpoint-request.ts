import type { Endpoint, EndpointAttributes, PickAttributes } from '@ts-types';

export type EndpointRequest<E extends Endpoint> = PickAttributes<
  E,
  EndpointAttributes
>;
