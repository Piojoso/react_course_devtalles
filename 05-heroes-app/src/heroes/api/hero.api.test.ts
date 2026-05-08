import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const HERO_URL = import.meta.env.VITE_API_URL;

describe("hero.api.ts", () => {
  test("should be configured pointing to testing server", () => {
    expect(heroApi).toBeDefined();

    expect(heroApi.defaults.baseURL).toBe(`${HERO_URL}/api/heroes`);

    expect(heroApi.defaults.baseURL).toContain("3001");
  });
});
