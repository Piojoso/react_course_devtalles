import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query";

describe("get-gifs-by-query.ts", () => {
  test("should return a list of gifs", async () => {
    const gifs = await getGifsByQuery("Hollow Knight");

    expect(gifs.length).toBe(10);

    const [gif1] = gifs;

    expect(gif1).toStrictEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  });
});
