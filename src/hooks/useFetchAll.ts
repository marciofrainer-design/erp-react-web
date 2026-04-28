import type { UseFetchAllResult } from "./types";
import { GraphQLAdapter } from "@/infra/api/service";
import { useEffect, useState } from "react";

const graphqlAdapter = new GraphQLAdapter();

export function useFetchAll<T>(
  query: string,
  variables?: Record<string, unknown>,
  enabled = true,
): UseFetchAllResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setLoading(true);
    graphqlAdapter
      .query<{ data: T[] }>(query, variables)
      .then((result) => {
        if (!cancelled) setData(result.data);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (!cancelled) setError(msg);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, variables, enabled]);

  return { data, loading, error };
}
