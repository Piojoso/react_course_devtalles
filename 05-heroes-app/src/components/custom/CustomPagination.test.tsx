import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

const renderWithRouter = (
  totalPages: number = 0,
  searchParams: string = "",
) => {
  return render(
    <MemoryRouter initialEntries={[searchParams]}>
      <CustomPagination totalPages={totalPages} />,
    </MemoryRouter>,
  );
};

describe("CustomPagination.tsx", () => {
  test("should render component with default values", () => {
    const mockedTotalPages = 2;
    const totalButtons = mockedTotalPages + 2; // adding previous and next buttons
    const { container } = renderWithRouter(mockedTotalPages);

    expect(screen.getByText("Previous")).toBeDefined();
    expect(container.querySelectorAll("button").length).toBe(totalButtons);
    expect(screen.getByText("Next")).toBeDefined();
  });

  test("should desable previous button when page is 1", () => {
    renderWithRouter(2);

    const previousButton = screen.getByText("Previous");

    expect(previousButton.getAttributeNames()).toContain("disabled");
  });

  test("should desable next button when we're in the last page", () => {
    renderWithRouter(2, "/?page=2");

    const nextButton = screen.getByText("Next");

    expect(nextButton.getAttributeNames()).toContain("disabled");
  });

  test("should desable actual page button", () => {
    renderWithRouter(5, "/?page=3");

    const otherPageButton = screen.getByText("2");
    const pageButton = screen.getByText("3");

    expect(otherPageButton.getAttribute("variant")).toBe("ghost");
    expect(pageButton.getAttribute("variant")).toBe("default");
  });

  test("should change page when page button cliked", () => {
    renderWithRouter(5, "/?page=3");

    const pageButton = screen.getByText("3");
    expect(pageButton.getAttribute("variant")).toBe("default");

    const newPageButton = screen.getByText("4");
    fireEvent.click(newPageButton);

    expect(pageButton.getAttribute("variant")).toBe("ghost");
    expect(newPageButton.getAttribute("variant")).toBe("default");
  });
});
