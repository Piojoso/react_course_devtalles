import { describe, expect, test } from "vitest";
import { giphyAPI } from "./giphy.api";

describe("giphy.api.ts", () => {
  test("should be configured correctly", () => {
    const { baseURL, params } = giphyAPI.defaults;

    expect(baseURL).toBe("https://api.giphy.com/v1/gifs");

    // expect(params.lang).toBe("es");
    // expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
    expect(params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      lang: "es",
    });
  });
});
