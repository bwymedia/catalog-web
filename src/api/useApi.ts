import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import fetcher from "./fetcher";

const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
};

export default function useApi<T>(key: ApiKey, config?: SWRConfiguration) {
  return useSWR<ApiDocument<T>>(key, fetcher, {
    ...defaultConfig,
    ...config,
  });
}
