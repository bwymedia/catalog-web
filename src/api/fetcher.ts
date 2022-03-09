import { deserialize } from "deserialize-json-api";

const baseUrl = process.env.NEXT_PUBLIC_API_ORIGIN + "/api/v2/";

export default async function fetcher({ path, params }: ApiKey) {
  const url = new URL(path, baseUrl);
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
    },
  });
  const parsed = await response.json();
  const deserialized = deserialize(parsed, {
    transformKeys: "camelCase",
  });
  if (typeof window !== "undefined")
    console.log("fetched", path, params, deserialized);
  return deserialized;
}
