import { use } from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import type { Hero } from "../interfaces/hero.interface";

const stringifyHero = (hero: Hero) => {
  return (
    <div key={hero.id} data-testid={`hero-${hero.id}`}>
      {hero.name}
    </div>
  );
};

const TestComponent = () => {
  const { favorites, favoriteCount, isHeroFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorites">
        {favoriteCount > 0 ? favorites.map(stringifyHero) : "No favorites"}
      </div>

      <div data-testid="favoriteCount">{favoriteCount}</div>
    </div>
  );
};

const renderTestComponent = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};

describe("FavoriteHeroContext.tsx", () => {
  test("should initialize with default values", () => {
    renderTestComponent();

    expect(screen.getByTestId("favoriteCount").textContent).toBe("0");
    expect(screen.getByTestId("favorites").textContent).toBe("No favorites");
  });
});
