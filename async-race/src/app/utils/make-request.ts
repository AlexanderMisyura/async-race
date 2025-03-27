import type { Endpoint, EndpointRequest, EndpointResponse } from '@ts-types';

export default async function makeRequest<
  E extends Endpoint,
  R extends EndpointRequest<E>,
>(
  apiUrl: string,
  endpoint: R
): Promise<EndpointResponse<E, EndpointRequest<E>>> {
  const { method, path, query, body } = endpoint;
  const fullPath = `${path.join('/')}${
    query
      ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
      : ''
  }`;

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

  return data;
}
