import type { Endpoint } from '@ts-types';

export type EndpointAttributes = keyof Omit<Endpoint, 'response'>;
