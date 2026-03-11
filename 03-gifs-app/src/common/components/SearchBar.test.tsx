import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar.tsx", () => {
  test("should render SearchBar correcly", () => {
    const { container } = render(<SearchBar onSearch={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole("textbox")).toBeDefined();
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);
    const inputValue = "Hello world";

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: inputValue } });

    //! The next approach is a really bad one!.
    // await new Promise((res) => setTimeout(res, 701));

    //! THIS... is the correct way of doing it.
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith(inputValue);
    });
  });

  test("should call only once with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "t" } });
    fireEvent.change(inputElement, { target: { value: "te" } });
    fireEvent.change(inputElement, { target: { value: "tes" } });
    fireEvent.change(inputElement, { target: { value: "test" } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledWith("test");
      expect(onQuery).toHaveBeenCalledTimes(1);
    });
  });

  test("should call onQuery when button clicked with the input value", () => {
    const onQuery = vi.fn();
    render(<SearchBar onSearch={onQuery} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test" } });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("test");
  });

  test("should the input has the correct placeholder value", () => {
    const placeholderText = "placeholder";
    render(<SearchBar onSearch={() => {}} placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeDefined();
  });
});
