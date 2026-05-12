import { describe, expect, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHeroesSummary } from "./useHeroesSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const tanstackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroesSummary.tsx", () => {
  test("should return the initial state (isLoading)", () => {
    const { result } = renderHook(() => useHeroesSummary(), {
      wrapper: tanstackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
