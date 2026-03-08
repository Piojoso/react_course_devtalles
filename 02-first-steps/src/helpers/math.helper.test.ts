import { describe, expect, test } from 'vitest';
import { add, multiply, subtract } from './math.helper';

describe('add', () => {
  test('should add two positive numbers', () => {
    const a = 1;
    const b = 2;

    const result = add(a, b);

    expect(result).toBe(a + b);
  });

  test('should add two negative numbers', () => {
    const a = -1;
    const b = -2;

    const result = add(a, b);

    expect(result).toBe(a + b);
  });

  test("shouldn't add if one number is 0", () => {
    const a = 0;
    const b = 3;

    const result = add(a, b);

    expect(result).toBe(b);
  });
});

describe('subtract', () => {
  test('should subtract two positive number', () => {
    const a = 1;
    const b = 2;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });

  test('should subtract two negative numbers', () => {
    const a = -1;
    const b = -2;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });
});

describe('multiply', () => {
  test('should multiply two positive numbers', () => {
    const a = 2;
    const b = 4;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test('should multiply two negative numbers', () => {
    const a = -2;
    const b = -4;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test('should multiply by zero', () => {
    const a = 2;
    const b = 0;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test('should zero be multiplied', () => {
    const a = 0;
    const b = 4;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });
});
