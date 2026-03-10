import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe("useCounter.tsx", () => {
  test("should initialize with default value of 10", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(10);
  });

  test("should initialize with custom value", () => {
    const customInitialValue = 69;
    const { result } = renderHook(() => useCounter(customInitialValue));

    expect(result.current.counter).toBe(customInitialValue);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.handleAdd());

    expect(result.current.counter).toBe(11);
  });

  test("should decrement counter when handleSubtract is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.handleSubtract());

    expect(result.current.counter).toBe(9);
  });

  test("should reset the counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => result.current.handleAdd());
    act(() => result.current.handleReset());

    expect(result.current.counter).toBe(10);
  });

  test("should reset to the initialValue the counter when handleReset is called", () => {
    const customInitialValue = 69;
    const { result } = renderHook(() => useCounter(customInitialValue));

    act(() => result.current.handleAdd());
    act(() => result.current.handleReset());

    expect(result.current.counter).toBe(customInitialValue);
  });
});
