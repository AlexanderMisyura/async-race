import type {
  Endpoint,
  EndpointRequest,
  MatchEndpointWithRequest,
} from '@ts-types';

export type EndpointResponse<
  E extends Endpoint,
  R extends EndpointRequest<E>,
> = Extract<E, MatchEndpointWithRequest<E, R>>['response'];
