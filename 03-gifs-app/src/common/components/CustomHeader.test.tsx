import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader.tsx", () => {
  const title = "Title example";

  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);

    const pageTitle = screen.getByRole("heading", { level: 1 });

    expect(pageTitle.innerHTML).toBe(title);

    // Teacher
    expect(screen.getByText(title)).toBeDefined();
  });

  test("should render the subtitle when provided", () => {
    const subtitle = "Subtitle example";

    render(<CustomHeader title={title} subtitle={subtitle} />);

    const subtitleParagraph = screen.getByRole("paragraph");

    expect(subtitleParagraph).toBeDefined();

    // Teacher
    expect(screen.getByText(subtitle)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(subtitle);
  });

  test("should not render subtitle when not proveded", () => {
    const { container } = render(<CustomHeader title={title} />);

    expect(container.innerHTML).not.contain("<p>");

    // Teacher
    const h1Element = container
      .querySelector(".content-center")
      ?.querySelector("h1");

    expect(h1Element?.innerHTML).toBe(title);
    expect(container.querySelector("p")?.innerHTML).not.toBeDefined();
  });
});
