import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.router";
import { render, screen } from "@testing-library/react";
import { Outlet, RouterProvider } from "react-router";

// vi.mock("@/admin/layouts/AdminLayout");
// vi.mock("@/admin/pages/AdminPage");
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
  HeroPage: () => <div data-testid="hero-page"></div>,
}));

describe("app.router.tsx", () => {
  test("should be configured as expected", () => {
    expect(appRouter.routes.length).toBe(3);
    expect(appRouter.routes.at(0)?.path).toBe("/");
    expect(appRouter.routes.at(1)?.path).toBe("/admin");
    expect(appRouter.routes.at(2)?.path).toBe("*");
  });

  test("should render HomePage at root path", () => {
    render(<RouterProvider router={appRouter} />);

    expect(screen.getByTestId("home-page")).toBeDefined();
  });
});
