import type { Endpoint, EndpointAttributes, EndpointRequest } from '@ts-types';

export type MatchEndpointWithRequest<
  E extends Endpoint,
  R extends EndpointRequest<E>,
> = Record<EndpointAttributes, R[EndpointAttributes]>;
