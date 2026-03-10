import { describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { getGifsByQuery } from "./get-gifs-by-query";
import { giphyAPI } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../../test/mocks/giphy.response.data";

describe("get-gifs-by-query.ts", () => {
  const giphyApiMock = new AxiosMockAdapter(giphyAPI);

  // test("should return a list of gifs", async () => {
  //   const gifs = await getGifsByQuery("Hollow Knight");
  //   expect(gifs.length).toBe(10);
  //   const [gif1] = gifs;
  //   expect(gif1).toStrictEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });

  test("should return a list of gifs", async () => {
    giphyApiMock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("Hollow Knight");

    expect(gifs.length).toBe(10);
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });
  });
});
