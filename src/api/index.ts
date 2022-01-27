import { deserialize } from "json-api-deserialize";
import useSWR from "swr";

const baseUrl = "https://accounts.broadwaymedia.com/api/v2/";

export function useApi<T>(key: ApiKey, config?: any) {
  return useSWR<ApiDocument<T>>(key, apiFetcher, config);
}

const apiFetchRequest = {
  method: "GET",
  headers: {
    Accept: "application/vnd.api+json",
  },
};

export async function apiFetcher<T>({ path, params }: ApiKey) {
  const url = new URL(path, baseUrl);
  if (params) url.search = new URLSearchParams(params).toString();
  const response = await fetch(url.toString(), apiFetchRequest);
  const parsed = await response.json();
  const deserialized: ApiDocument<T> = deserialize(parsed);
  if (typeof window !== "undefined")
    console.log(`Fetched: ${url}`, deserialized);
  return deserialized;
}
