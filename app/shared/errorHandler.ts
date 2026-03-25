export const errorHandler = (message: string, error: unknown) => {
  if (import.meta.dev) console.error(message, error);
};
