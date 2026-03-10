import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { GifsApp } from "./GifsApp";

describe("GifsApp.tsx", () => {
  test("should render component properly", () => {
    render(<GifsApp />);

    const pageTitle = screen.getByRole("heading", { level: 1 });

    expect(pageTitle.innerHTML).toBe("Buscador de gifs");
  });
});
