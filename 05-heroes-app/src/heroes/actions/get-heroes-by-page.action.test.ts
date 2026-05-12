import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/hero.api";

const HERO_URL = import.meta.env.VITE_API_URL;

describe("get-heroes-by-page.action.ts", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("should return the default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 6,
      pages: 2,
      heroes: [{ image: "1.jpg" }, { image: "2.jpg" }, { image: "3.jpg" }],
    });

    const response = await getHeroesByPageAction(1, 6, "all");

    expect(response).toStrictEqual({
      total: expect.any(Number),
      pages: expect.any(Number),
      heroes: expect.arrayContaining([
        { image: expect.stringContaining(HERO_URL) },
      ]),
    });
  });

  test("should heroesApi have been called with offset = 0 when page is not a number", async () => {
    const mockedResponse = { total: 10, pages: 1, heroes: [] };

    heroesApiMock.onGet("/").reply(200, mockedResponse);

    await getHeroesByPageAction("abc" as unknown as number, 6, "all");

    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({
      limit: expect.any(Number),
      offset: 0,
      category: expect.any(String),
    });
  });

  test("should heroesApi have been called with limit = 1 when limit is not a number", async () => {
    // Arrange
    heroesApiMock.onGet("/").reply(200, { total: 10, pages: 1, heroes: [] });

    // Act
    await getHeroesByPageAction("abc" as unknown as number, 6, "all");
    const params = heroesApiMock.history.get[0].params;

    // Assert
    expect(params).toStrictEqual({
      limit: 6,
      offset: expect.any(Number),
      category: expect.any(String),
    });
  });

  test("should heroesApi have been called with correct offset when page is a string number", async () => {
    // Arrange
    const limit = 6;
    const page = "5";
    heroesApiMock.onGet("/").reply(200, { total: 10, pages: 1, heroes: [] });

    // Act
    await getHeroesByPageAction(page as unknown as number, limit, "all");
    const params = heroesApiMock.history.get[0].params;

    expect(params).toStrictEqual({
      limit: expect.any(Number),
      offset: (+page - 1) * limit,
      category: expect.any(String),
    });
  });
});
