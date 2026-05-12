import { describe, expect, test } from "vitest";
import { getHeroesSummaryAction } from "./get-heroes-summary.action";

describe("get-heroes-summary.action.ts", () => {
  test("should fetch summary and return complete information", async () => {
    // Arrange

    // Act
    const response = await getHeroesSummaryAction();

    // Assert
    expect(response).toStrictEqual({
      totalHeroes: expect.any(Number),
      strongestHero: expect.objectContaining({
        alias: expect.any(String),
        strength: expect.any(Number),
      }),
      smartestHero: expect.objectContaining({
        alias: expect.any(String),
        intelligence: expect.any(Number),
      }),
      heroCount: expect.any(Number),
      villainCount: expect.any(Number),
    });
  });
});
