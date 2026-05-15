import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchPage from "./SearchPage";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import type { Hero } from "@/heroes/interfaces/hero.interface";

vi.mock("@/heroes/components/HeroGrid", () => ({
  HeroesGrid: () => <div data-testid="hero-grid"></div>,
}));

vi.mock("@/heroes/actions/search-heroes.action");
const mockedSearchHeroesAction = vi.mocked(searchHeroesAction);
mockedSearchHeroesAction.mockResolvedValue([{ id: "1" } as Hero]);

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
  test("should render SearchPage with default values", async () => {
    await fullRenderedSearchPage();

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: "",
      strength: "",
    });
  });
});
