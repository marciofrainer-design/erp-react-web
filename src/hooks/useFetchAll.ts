import type { UseFetchAllResult } from "./types";
import type { Repository } from "@/infra/interface/types";
import { useEffect, useState } from "react";

export function useFetchAll<T>(
  repository: Repository<T>,
  enabled = true,
): UseFetchAllResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setLoading(true);
    repository
      .getAll({ page: 1, pageCount: 1, limit: -1 })
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
  }, [repository, enabled]);

  return { data, loading, error };
}
