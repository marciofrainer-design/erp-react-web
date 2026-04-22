export type UseFetchAllResult<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  variables?: Record<string, unknown>;
};