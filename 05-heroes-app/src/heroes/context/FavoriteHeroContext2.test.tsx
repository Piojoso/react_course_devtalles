import { use } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import type { Hero } from "../interfaces/hero.interface";

const mockHero = {
  id: "1",
  name: "batman",
} as Hero;

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

      <button
        data-testid="toggleFavorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>

      <div data-testid="isHeroFavorite">
        {isHeroFavorite(mockHero).toString()}
      </div>
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

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("FavoriteHeroContext.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should initialize with default values", () => {
    renderTestComponent();

    expect(screen.getByTestId("favoriteCount").textContent).toBe("0");
    expect(screen.getByTestId("favorites").textContent).toBe("No favorites");
  });

  test("should add hero to favorites when toggleFavorite is called", () => {
    renderTestComponent();

    const toggleFavoriteButton = screen.getByTestId("toggleFavorite");

    fireEvent.click(toggleFavoriteButton);

    expect(screen.getByTestId("isHeroFavorite").textContent).toBe("true");
    expect(screen.getByTestId("favoriteCount").textContent).toBe("1");
    expect(screen.getByTestId("hero-1").textContent).toBe("batman");

    // expect(localStorage.getItem("favorites")).toBe(
    //   '[{"id":"1","name":"batman"}]',
    // );
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favorites",
      '[{"id":"1","name":"batman"}]',
    );
  });

  test("should remove  hero to favorites when toggleFavorite is called", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

    renderTestComponent();
    expect(screen.getByTestId("favoriteCount").textContent).toBe("1");

    const toggleFavoriteButton = screen.getByTestId("toggleFavorite");

    fireEvent.click(toggleFavoriteButton);

    expect(screen.getByTestId("isHeroFavorite").textContent).toBe("false");
    expect(screen.getByTestId("favoriteCount").textContent).toBe("0");
    expect(screen.queryByTestId("hero-1")).toBeNull();

    // expect(localStorage.getItem("favorites")).toBe("[]");
    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", "[]");
  });
});
