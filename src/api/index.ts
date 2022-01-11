import { deserialize } from 'json-api-deserialize';

const baseUrl = 'https://accounts.broadwaymedia.com/api/v2/';
// const baseUrl = 'http://0.0.0.0:8080/api/v2/';

async function apiRequest<T>(
  path: string,
  params: Record<string, any>,
  requestInit: RequestInit
) {
  const url = new URL(path, baseUrl);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url.toString(), requestInit);
  const parsed = await response.json();
  const { data } = deserialize(parsed);
  return data as T;
}

export function apiGet<T>(path: string, params: Record<string, any> = {}) {
  return apiRequest<T>(path, params, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.api+json',
    },
  });
}

export async function fetcher<T>(path: string) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.api+json',
    },
  });
  const parsed = await response.json();
  return deserialize(parsed) as DeserializedApiDocument<T>;
}
