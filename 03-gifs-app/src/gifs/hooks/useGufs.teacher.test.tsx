import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as getGifActions from "../actions/get-gifs-by-query";

describe("useGifs.tsx", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(useGifs);

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousSearches.length).toBe(0);

    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handlePreviousSerchesClick).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => await result.current.handleSearch("goku"));

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handlePreviousSerchesClick is called", async () => {
    const { result } = renderHook(useGifs);

    await act(
      async () => await result.current.handlePreviousSerchesClick("goku"),
    );

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(useGifs);
    await act(async () => await result.current.handleSearch("goku"));
    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(getGifActions, "getGifsByQuery").mockRejectedValue(
      new Error("This is an error"),
    );

    await act(
      async () => await result.current.handlePreviousSerchesClick("goku"),
    );
    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 5 previous terms", async () => {
    const { result } = renderHook(useGifs);

    vi.spyOn(getGifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => await result.current.handleSearch("goku1"));
    await act(async () => await result.current.handleSearch("goku2"));
    await act(async () => await result.current.handleSearch("goku3"));
    await act(async () => await result.current.handleSearch("goku4"));
    await act(async () => await result.current.handleSearch("goku5"));
    await act(async () => await result.current.handleSearch("goku6"));

    expect(result.current.previousSearches.length).toBe(5);
    expect(result.current.previousSearches).toStrictEqual([
      "goku6",
      "goku5",
      "goku4",
      "goku3",
      "goku2",
    ]);
  });
});
