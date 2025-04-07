import type { Endpoint, EndpointRequest, EndpointResponse } from '@ts-types';

import delay from './delay';

const MAX_RETRIES = 3;
const RETRY_DELAY = 500;

// eslint-disable-next-line max-lines-per-function
export default async function makeRequest<
  E extends Endpoint,
  R extends EndpointRequest<E>,
>(
  apiUrl: string,
  endpoint: R,
  maxRetries: number = MAX_RETRIES,
  retryDelay: number = RETRY_DELAY
): Promise<{
  data: EndpointResponse<E, EndpointRequest<E>>;
  headers: Record<string, string | null | undefined>;
}> {
  const { method, path, query, body } = endpoint;
  const fullPath = `${path.join('/')}${
    query
      ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
      : ''
  }`;

  let attempt = 0;
  let lastError: Error;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(`${apiUrl}${fullPath}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      const data = (await response.json()) as EndpointResponse<
        E,
        EndpointRequest<E>
      >;
      const headers = response.headers.get('X-Total-Count')
        ? { 'X-Total-Count': response.headers.get('X-Total-Count') }
        : {};

      return { data, headers };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      attempt++;

      if (
        attempt < maxRetries &&
        lastError.message.includes('Failed to fetch')
      ) {
        console.log(
          `Error - "${lastError.message}" with path "${fullPath}". Attempt (#${attempt}) to refetch. Retrying in ${retryDelay}ms. If no further errors, the request to ${fullPath} was successful.`
        );
        await delay(retryDelay);
      } else {
        throw lastError;
      }
    }
  }
  throw new Error('Request failed');
}
