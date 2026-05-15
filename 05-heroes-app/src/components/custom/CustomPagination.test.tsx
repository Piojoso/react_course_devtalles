import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";
import type React from "react";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("CustomPagination.tsx", () => {
  test("should render component with default values", () => {
    const mockedTotalPages = 2;
    const totalButtons = mockedTotalPages + 2; // adding previous and next buttons
    const { container } = renderWithRouter(
      <CustomPagination totalPages={mockedTotalPages} />,
    );

    expect(screen.getByText("Previous")).toBeDefined();
    expect(container.querySelectorAll("button").length).toBe(totalButtons);
    expect(screen.getByText("Next")).toBeDefined();
  });
});
