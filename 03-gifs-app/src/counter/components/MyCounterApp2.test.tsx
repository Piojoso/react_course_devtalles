import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

const mockedHandleAddFn = vi.fn();
const mockedHandleResetFn = vi.fn();
const mockedHandleSubtractFn = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 20,
    handleAdd: mockedHandleAddFn,
    handleReset: mockedHandleResetFn,
    handleSubtract: mockedHandleSubtractFn,
  }),
}));

describe("MyCounterApp.tsx", () => {
  afterEach(() => vi.clearAllMocks());

  test("should render the component", () => {
    render(<MyCounterApp />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    const buttonElements = screen.getAllByRole("button");

    expect(h1Element).toBeDefined();
    expect(h1Element.innerHTML).toContain("counter: 20");

    expect(buttonElements).toBeDefined();
    expect(buttonElements.length).toBe(3);
  });

  test("should call handleAdd if +1 button is clicked", () => {
    render(<MyCounterApp />);

    const addButtonElem = screen.getByRole("button", { name: "+1" });

    fireEvent.click(addButtonElem);

    expect(mockedHandleAddFn).toHaveBeenCalled();
  });

  // test("should call handleAdd if 1 button is clicked", () => {
  //   render(<MyCounterApp />);

  //   const addButtonElem = screen.getByRole("button", { name: "+1" });

  //   fireEvent.click(addButtonElem);

  //   expect(mockedHandleAddFn).toHaveBeenCalled();
  // });
});
