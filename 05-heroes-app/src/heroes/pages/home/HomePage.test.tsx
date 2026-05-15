import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";
import type { useHeroesSummary } from "@/heroes/hooks/useHeroesSummary";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock("@/heroes/hooks/usePaginatedHeroes");
const mockedUsePaginatedHeroes = vi.mocked(usePaginatedHeroes);
mockedUsePaginatedHeroes.mockReturnValue({
  data: { total: 0, pages: 0, heroes: [] },
  isLoading: false,
} as unknown as ReturnType<typeof usePaginatedHeroes>);

const mockedUseHeroesSummaryData = {
  totalHeroes: 25,
  heroCount: 18,
  villainCount: 7,
  strongestHero: { alias: "Superman" },
  smartestHero: { alias: "Batman" },
};
vi.mock("@/heroes/hooks/useHeroesSummary", () => ({
  useHeroesSummary: () =>
    ({
      data: mockedUseHeroesSummaryData,
      isLoading: false,
    }) as unknown as ReturnType<typeof useHeroesSummary>,
}));

const renderHomePage = (initialEntries: string = "") => {
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <FavoriteHeroProvider>
        <HomePage />
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

describe("HomePage.tsx", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render with default values", () => {
    renderHomePage();

    expect(
      screen.queryByText("All Characters", { exact: false }),
    ).toBeDefined();
  });

  test("should call usePaginatedHero with default values", () => {
    renderHomePage();

    expect(mockedUsePaginatedHeroes).toHaveBeenCalled();
  });

  test("should render the correct tab when tab params change", () => {
    renderHomePage("/?tab=heroes");

    // const { totalHeroes, heroCount } = mockedUseHeroesSummaryData;
    // const allCharsTabTrigger = screen.getByText(
    //   `All Characters (${totalHeroes})`,
    // );
    // const heroTabTrigger = screen.getByText(`Heroes (${heroCount})`);
    const [allCharsTabTrigger, , heroTabTrigger] = screen.getAllByRole("tab");

    expect(allCharsTabTrigger.getAttribute("aria-selected")).toBe("false");
    expect(heroTabTrigger.getAttribute("aria-selected")).toBe("true");
  });

  test("should change to new tab when tabTrigger is clicked", () => {
    // const { totalHeroes, heroCount } = mockedUseHeroesSummaryData;
    renderHomePage();

    // const allCharsTabTrigger = screen.getByText(
    //   `All Characters (${totalHeroes})`,
    // );
    // const heroTabTrigger = screen.getByText(`Heroes (${heroCount})`);
    const [allCharsTabTrigger, , heroTabTrigger] = screen.getAllByRole("tab");

    expect(allCharsTabTrigger.getAttribute("aria-selected")).toBe("true");
    expect(heroTabTrigger.getAttribute("aria-selected")).toBe("false");

    fireEvent.click(heroTabTrigger);

    expect(allCharsTabTrigger.getAttribute("aria-selected")).toBe("false");
    expect(heroTabTrigger.getAttribute("aria-selected")).toBe("true");
  });
});
