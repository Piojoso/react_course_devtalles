import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";
import { AxiosError } from "axios";

describe("get-hero.action.ts", () => {
  const HERO_URL = import.meta.env.VITE_API_URL;

  test("should fetch hero data and return with complete image url", async () => {
    // arrange
    const idSlug = "clark-kent";

    // act
    const response = await getHeroAction({ idSlug });

    // assert
    expect(response).toBeDefined();
    expect(response.slug).toBe(idSlug);
    expect(response.image).toContain(HERO_URL);
  });

  test("should throw an error if hero is not found", async () => {
    // arrange
    const idSlug = "non-existent-hero";

    // act
    const response = await getHeroAction({ idSlug }).catch((error) => {
      // assert
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(AxiosError);
      expect((error as AxiosError).status).toBe(404);
    });

    expect(response).not.toBeDefined();
  });
});
