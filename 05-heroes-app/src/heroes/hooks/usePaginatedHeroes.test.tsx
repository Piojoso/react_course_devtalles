import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { usePaginatedHeroes } from "./usePaginatedHeroes";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import type { HeroesResponse } from "../interfaces/get-heroes.response";

vi.mock("../actions/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn(),
}));

vi.mock("react-router", () => ({
  useSearchParams: vi.fn(() => [
    new URLSearchParams("tab=all&page=1&limit=6"),
    vi.fn(),
  ]),
}));

const mockedGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);
const mockedUseSearchParams = vi.mocked(useSearchParams);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});
const tanstackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHeroes.tsx", () => {
  beforeEach(() => {
    mockedGetHeroesByPageAction.mockReset();
    mockedUseSearchParams.mockReset();
    queryClient.clear();
  });

  test("should return the initial state (isLoading)", async () => {
    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("should return success state with data when API call succeeds", async () => {
    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call getHeroesByPageAction with params when search params aren't defined", async () => {
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);

    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call getHeroesByPageAction with correct params when searchParams change", async () => {
    const tab = "all";
    const page = "2";
    const limit = "5";

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams(`tab=${tab}&page=${page}&limit=${limit}`),
      vi.fn(),
    ]);

    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(
      +page,
      +limit,
      "all",
    );
  });

  test("should call getHeroesByPageAction with correct category when tab is 'heroes'", async () => {
    const tab = "heroes";
    const page = "2";
    const limit = "5";

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams(`tab=${tab}&page=${page}&limit=${limit}`),
      vi.fn(),
    ]);

    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(
      +page,
      +limit,
      "hero",
    );
  });

  test("should call getHeroesByPageAction with correct category when tab is 'villains'", async () => {
    const tab = "villains";
    const page = "2";
    const limit = "5";

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams(`tab=${tab}&page=${page}&limit=${limit}`),
      vi.fn(),
    ]);

    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(
      +page,
      +limit,
      "villain",
    );
  });

  test("should call getHeroesByPageAction with correct params when searchParams are incorrect", async () => {
    const tab = "non-existant";
    const page = "not-a-number";
    const limit = "not-a-number";

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams(`tab=${tab}&page=${page}&limit=${limit}`),
      vi.fn(),
    ]);

    mockedGetHeroesByPageAction.mockResolvedValue({} as HeroesResponse);

    const { result } = renderHook(() => usePaginatedHeroes(), {
      wrapper: tanstackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockedGetHeroesByPageAction).toHaveBeenCalledWith(
      +page,
      +limit,
      "all",
    );
  });
});
