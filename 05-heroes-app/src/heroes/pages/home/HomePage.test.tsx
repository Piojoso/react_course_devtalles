import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/heroes/hooks/usePaginatedHeroes");
const mockedUsePaginatedHeroes = vi.mocked(usePaginatedHeroes);
mockedUsePaginatedHeroes.mockReturnValue({
  data: { total: 0, pages: 0, heroes: [] },
  isLoading: false,
} as unknown as ReturnType<typeof usePaginatedHeroes>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string = "") => {
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("HomePage.tsx", () => {
  test("should render with default values", () => {
    renderHomePage();

    expect(screen.getByText("Superhero Universe")).toBeDefined();
  });
});
