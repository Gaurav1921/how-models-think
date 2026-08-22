import { useEffect, useState } from "react";

type ApiState<T> =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; data: T };

/** Runs an async fetcher on mount and exposes its loading/error/success state. */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ status: "loading" });

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- deps is intentionally caller-supplied
  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    fetcher()
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- deps is intentionally caller-supplied
  }, deps);

  return state;
}
