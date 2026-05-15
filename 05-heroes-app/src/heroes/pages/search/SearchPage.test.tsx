import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchPage from "./SearchPage";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/interfaces/hero.interface";

vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroesGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid="heroes-grid">
      {heroes.map((h) => (
        <div key={h.id}>{h.alias}</div>
      ))}
    </div>
  ),
}));

const mockedSearchHeroesActionResponse = [
  { id: "1", alias: "Superman" },
  { id: "2", alias: "Batman" },
] as Hero[];

vi.mock("@/heroes/actions/search-heroes.action");
const mockedSearchHeroesAction = vi.mocked(searchHeroesAction);
mockedSearchHeroesAction.mockResolvedValue(mockedSearchHeroesActionResponse);

const renderSearchPage = (initialEntries: string = "") => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

const fullRenderedSearchPage = async (initialEntries: string = "") => {
  const { container } = renderSearchPage(initialEntries);

  await waitFor(() => screen.findByText("Search superheroes"));

  return container;
};

describe("SearchPage.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render SearchPage with default values", async () => {
    await fullRenderedSearchPage();

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: "",
      strength: "",
    });
  });

  test("should call searchHeroesAction with name parameter", () => {
    const mockedName = "superman";
    renderSearchPage(`/?name=${mockedName}`);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: mockedName,
      strength: "",
    });
  });

  test("should call searchHeroesAction with strength parameter", () => {
    const mockedStrength = "1";
    renderSearchPage(`/?min-strength=${mockedStrength}`);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: "",
      strength: mockedStrength,
    });
  });

  test("should call searchHeroesAction with both parameters", () => {
    const mockedName = "superman";
    const mockedStrength = "1";
    renderSearchPage(`/?name=${mockedName}&min-strength=${mockedStrength}`);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: mockedName,
      strength: mockedStrength,
    });
  });

  test("should render searchHeroesAction response on HeroGrid", async () => {
    await fullRenderedSearchPage();

    const heroGridElement = screen.getByTestId("heroes-grid");

    expect(heroGridElement.children.length).toBe(
      mockedSearchHeroesActionResponse.length,
    );
  });
});
