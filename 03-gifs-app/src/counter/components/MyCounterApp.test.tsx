import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe("MyCounterApp.tsx", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    const buttonElements = screen.getAllByRole("button");

    expect(h1Element).toBeDefined();
    expect(h1Element.innerHTML).toContain("counter: 1");

    expect(buttonElements).toBeDefined();
    expect(buttonElements.length).toBe(3);
  });

  test("should increment the counter", () => {
    render(<MyCounterApp />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    const addButtonElem = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButtonElem);

    expect(h1Element.innerHTML).toContain("counter: 2");
  });

  test("should decrement the counter", () => {
    render(<MyCounterApp />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    const subtractButtonElem = screen.getByRole("button", { name: "-1" });

    fireEvent.click(subtractButtonElem);

    expect(h1Element.innerHTML).toContain("counter: 0");
  });
});
