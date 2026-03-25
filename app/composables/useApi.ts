export const useApi = () => {
  const config = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    timeout: config.public.timeout,
  });

  return {
    api,
  };
};
