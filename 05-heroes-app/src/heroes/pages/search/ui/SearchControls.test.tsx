import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter, useLocation } from "react-router";

const URLDebugger = () => {
  const location = useLocation();
  return <div data-testid="current-url">{location.search}</div>;
};

const renderSearchControls = (initialEntries: string = "") => {
  return render(
    <MemoryRouter initialEntries={[initialEntries]}>
      <SearchControls />
      <URLDebugger />
    </MemoryRouter>,
  );
};

describe("SearchControls.tsx", () => {
  test("should render SearchControls with default values", () => {
    const { container } = renderSearchControls();

    expect(container.getElementsByTagName("input").length).toBe(1);
    expect(container.getElementsByTagName("button").length).toBe(4);
    expect(screen.getByRole("region")).toBeDefined();
  });

  test("should set input defaultValue when name params is set", () => {
    const mockedName = "Superman";
    const { container } = renderSearchControls(`/?name=${mockedName}`);

    const inputElement = container.getElementsByTagName("input")[0];

    expect(inputElement.defaultValue).toBe(mockedName);
  });
  test("should not change params when input is changed and Enter is not pressed", () => {
    const { container, getByTestId } = renderSearchControls();
    const inputElement = container.getElementsByTagName("input")[0];
    const urlElement = getByTestId("current-url");

    fireEvent.change(inputElement, { target: { value: "Superman" } });

    expect(urlElement.textContent).toBe("");
  });

  test("should change params when input is changed and Enter is pressed", () => {
    const { container, getByTestId } = renderSearchControls();
    const inputElement = container.getElementsByTagName("input")[0];
    const urlElement = getByTestId("current-url");

    fireEvent.change(inputElement, { target: { value: "Superman" } });
    fireEvent.keyDown(inputElement, { key: "Enter" });

    expect(urlElement.textContent).toBe("?name=Superman");
    expect(inputElement.value).toBe("Superman");
  });
});
