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
});
