import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";

vi.mock("@/heroes/layouts/HeroesLayout", () => ({
  HeroesLayout: () => (
    <div data-testid="heroes-layout">
      <Outlet />
    </div>
  ),
}));
vi.mock("@/heroes/pages/home/HomePage", () => ({
  HomePage: () => <div data-testid="home-page"></div>,
}));
vi.mock("@/heroes/pages/hero/HeroPage", () => ({
  HeroPage: () => {
    const { idSlug = "" } = useParams();

    return <div data-testid="hero-page">idSlug - {idSlug}</div>;
  },
}));
vi.mock("@/heroes/pages/search/SearchPage", () => ({
  default: () => <div data-testid="search-page"></div>,
}));
// vi.mock("@/admin/layouts/AdminLayout");
// vi.mock("@/admin/pages/AdminPage");

describe("app.router.tsx", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes.length).toBe(3);
    expect(appRouter.routes.at(0)?.path).toBe("/");
    expect(appRouter.routes.at(1)?.path).toBe("/admin");
    expect(appRouter.routes.at(2)?.path).toBe("*");
  });

  test("should render HomePage at / path", () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });

  test("should render HeroPage at /heroes/:idSlug path", () => {
    const idSlug = "clark-kent";
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: [`/heroes/${idSlug}`],
    });

    render(<RouterProvider router={router} />);

    const heroPageComponent = screen.getByTestId("hero-page");
    expect(heroPageComponent).toBeDefined();
    expect(heroPageComponent.innerHTML).toContain(idSlug);
  });

  test("should render SearchPage at /search path", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: [`/search`],
    });
    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId("search-page")).toBeDefined();
    // expect(heroPageComponent).toBeDefined();
    // expect(heroPageComponent.innerHTML).toContain(idSlug);
  });
});
