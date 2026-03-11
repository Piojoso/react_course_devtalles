import { afterEach, describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useGifs } from "./useGifs";
import { testGifsMock } from "../../../test/mocks/gifs.data";
import type { Gif } from "../interfaces/gif.interface";

const getGifsByQuerySpy = vi.fn((_: string): Gif[] => {
  return testGifsMock.gifs;
});

vi.mock("../actions/get-gifs-by-query", () => ({
  getGifsByQuery: (query: string) => getGifsByQuerySpy(query),
}));

describe("useGifs.tsx", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("General Tests", () => {
    test("should return default values and methods", () => {
      const { result } = renderHook(useGifs);

      expect(result.current.gifs).toStrictEqual([]);
      expect(result.current.previousSearches).toStrictEqual([]);

      expect(result.current.handleSearch).toBeDefined();
      expect(result.current.handleGetGifUrl).toBeDefined();
      expect(result.current.handlePreviousSerchesClick).toBeDefined();
    });
  });

  describe("handleSearch()", () => {
    test("should ... trim and lower the query", async () => {
      const { result } = renderHook(useGifs);

      const queryToTest = " Some Text ";
      const expectedQuery = queryToTest.trim().toLowerCase();

      await act(async () => await result.current.handleSearch(queryToTest));

      expect(getGifsByQuerySpy).toHaveBeenCalled();
      expect(getGifsByQuerySpy).toHaveBeenCalledWith(expectedQuery);
    });

    test("should ... not continue when query is empty", async () => {
      const { result } = renderHook(useGifs);

      const testingQuery = "";

      await act(async () => {
        await result.current.handleSearch(testingQuery);
      });

      expect(getGifsByQuerySpy).not.toHaveBeenCalled();

      expect(result.current.gifs).toStrictEqual([]);
    });

    test("should ... return a cached list if the query was previusly searched", async () => {
      const { result } = renderHook(useGifs);

      const testingQuery = "query";

      await act(async () => {
        await result.current.handleSearch(testingQuery);
      });

      await act(async () => {
        await result.current.handleSearch(testingQuery);
      });

      expect(getGifsByQuerySpy).toHaveBeenCalledTimes(1);
      expect(getGifsByQuerySpy).not.toHaveBeenCalledTimes(2);

      expect(result.current.gifs).toStrictEqual(testGifsMock.gifs);
    });

    test("should ... add to previousSearches if the query is a new search", async () => {
      const { result } = renderHook(useGifs);
      const testingQuery = "query";

      expect(result.current.previousSearches).toStrictEqual([]);

      await act(async () => await result.current.handleSearch(testingQuery));

      expect(result.current.previousSearches).toStrictEqual([testingQuery]);
    });

    test("should NOT ... add to previousSearches if the query already was searched before", async () => {
      const { result } = renderHook(useGifs);
      const testingQuery = "query";
      expect(result.current.previousSearches).toStrictEqual([]);

      await act(async () => await result.current.handleSearch(testingQuery));
      await act(async () => await result.current.handleSearch(testingQuery));

      expect(result.current.previousSearches).toStrictEqual([testingQuery]);
      expect(result.current.previousSearches).not.toStrictEqual([
        testingQuery,
        testingQuery,
      ]);
    });

    test("should never ... add more than 5 previousSearches", async () => {
      const { result } = renderHook(useGifs);

      const expectedPreviousSearches = [];

      let i = 0;
      while (i < 6) {
        const testingQuery = `query_${i}`;

        await act(async () => await result.current.handleSearch(testingQuery));
        expectedPreviousSearches.unshift(testingQuery);

        i++;
      }

      expect(result.current.previousSearches.length).toBe(5);
      expect(result.current.previousSearches).toStrictEqual(
        expectedPreviousSearches.slice(0, 5),
      );
    });

    test("should ... return a list of gifs when is called correctly", async () => {
      const { result } = renderHook(useGifs);

      const testingQuery = "fakequery";

      await act(async () => {
        await result.current.handleSearch(testingQuery);
      });

      expect(getGifsByQuerySpy).toHaveBeenCalled();
      expect(getGifsByQuerySpy).toHaveBeenCalledWith(testingQuery);

      expect(result.current.gifs).toStrictEqual(testGifsMock.gifs);
    });
  });

  describe("handlePreviousSerchesClick()", () => {
    test("should ... return a list of gifs when handleTermClicked is Called", async () => {
      const { result } = renderHook(useGifs);

      const searchedTerm = "query";

      await act(
        async () =>
          await result.current.handlePreviousSerchesClick(searchedTerm),
      );

      expect(result.current.gifs).not.toStrictEqual([]);
      expect(result.current.gifs).toStrictEqual(testGifsMock.gifs);
    });
  });
});
