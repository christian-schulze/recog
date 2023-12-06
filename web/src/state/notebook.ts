import { proxy } from 'valtio';

export const notebook = proxy({
  shouldReFetch: false,
});

export const setShouldReFetch = (shouldRefresh: boolean) =>
  (notebook.shouldReFetch = shouldRefresh);
