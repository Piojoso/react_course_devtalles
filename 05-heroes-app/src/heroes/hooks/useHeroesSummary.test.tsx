import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroesSummary } from "./useHeroesSummary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeroesSummaryAction } from "../actions/get-heroes-summary.action";
import type { SummaryResponse } from "../interfaces/get-heroes-summary.response";

vi.mock("../actions/get-heroes-summary.action", () => ({
  getHeroesSummaryAction: vi.fn(),
}));

const mockGetHeroesSummaryAction = vi.mocked(getHeroesSummaryAction);

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

const mockSummaryData = {
  totalHeroes: 25,
  strongestHero: { alias: "Superman", strength: 10 },
  smartestHero: { alias: "Batman", intelligence: 10 },
  heroCount: 18,
  villainCount: 7,
} as SummaryResponse;

describe("useHeroesSummary.tsx", () => {
  beforeEach(() => {
    mockGetHeroesSummaryAction.mockReset();
  });

  test("should return the initial state (isLoading)", () => {
    mockGetHeroesSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroesSummary(), {
      wrapper: tanstackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeeds", async () => {
    mockGetHeroesSummaryAction.mockResolvedValue(mockSummaryData);

    const { result } = renderHook(() => useHeroesSummary(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
  });
});
