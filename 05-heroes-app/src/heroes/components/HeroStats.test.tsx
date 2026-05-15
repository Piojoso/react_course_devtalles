import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientContext } from "@tanstack/react-query";
import { HeroStats } from "./HeroStats";
import { useHeroesSummary } from "../hooks/useHeroesSummary";
import type { SummaryResponse } from "../interfaces/get-heroes-summary.response";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";

const mockedSummaryResponse: SummaryResponse = {
  totalHeroes: 25,
  strongestHero: {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

vi.mock("../hooks/useHeroesSummary");
const mockedUseHeroesSummary = vi.mocked(useHeroesSummary);

const renderHeroStats = (mockedData?: Partial<SummaryResponse>) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  mockedUseHeroesSummary.mockReturnValue({
    data: mockedData,
  } as unknown as ReturnType<typeof useHeroesSummary>);

  return render(
    <QueryClientContext value={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientContext>,
  );
};

describe("HeroStats.tsx", () => {
  beforeEach(() => {});

  test("should render component with default values", () => {
    renderHeroStats();

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should render hereos stats with mocked stats", () => {
    renderHeroStats(mockedSummaryResponse);

    const msr = mockedSummaryResponse;

    expect(screen.getByText(`${msr.heroCount} Heroes`)).toBeDefined();
    expect(screen.getByText(`${msr.villainCount} Villains`)).toBeDefined();
    expect(msr.strongestHero.alias).toBeDefined();
    expect(`Strength: ${msr?.strongestHero.strength}/10`).toBeDefined();
    expect(msr.smartestHero.alias).toBeDefined();
    expect(`Intelligence: ${msr?.smartestHero.intelligence}/10`).toBeDefined();
  });

  test("should change the percentage of favorites when a hero is added to favorites", () => {
    const favHeroes = [mockedSummaryResponse.smartestHero];
    const { totalHeroes } = mockedSummaryResponse;
    localStorage.setItem("favorites", JSON.stringify(favHeroes));
    renderHeroStats(mockedSummaryResponse);

    const favoritePercentageElement = screen.queryByText("% of total", {
      exact: false,
    });
    const favPercentage = ((favHeroes.length * 100) / totalHeroes).toString();

    expect(favoritePercentageElement).not.toBeNull();
    expect(favoritePercentageElement?.innerHTML).toContain(favPercentage);
  });
});
