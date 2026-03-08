import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ItemCounter } from './ItemCounter';

describe('ItemCounter.tsx', () => {
  test('should render with default values', () => {
    const itemName = 'itemName';
    render(<ItemCounter name={itemName} />);

    const itemNameElement = screen.getByText(itemName);

    expect(itemNameElement).toBeDefined();
  });

  test('should render with custom quantity', () => {
    const itemName = 'itemName';
    const quantity = 10;
    render(<ItemCounter name={itemName} quantity={quantity} />);

    const itemNameElement = screen.getByText(quantity);
    expect(itemNameElement).toBeDefined();
  });

  test('should increase count when +1 is pressed', () => {
    render(<ItemCounter name="itemName" quantity={1} />);
    const [addBtn] = screen.getAllByRole('button');

    fireEvent.click(addBtn);

    expect(screen.getByText('2')).toBeDefined();
  });

  test('should decrease count when -1 is pressed', () => {
    const quantity = 5;
    render(<ItemCounter name="itemName" quantity={quantity} />);
    const [, subBtn] = screen.getAllByRole('button');

    fireEvent.click(subBtn);

    expect(screen.getByText(`${quantity - 1}`)).toBeDefined();
  });

  test("shouldn't decrease count when -1 is pressed and quantity is 1", () => {
    const quantity = 1;
    render(<ItemCounter name="itemName" quantity={quantity} />);
    const [, subBtn] = screen.getAllByRole('button');

    fireEvent.click(subBtn);

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test('should not change when count is 1', () => {
    // Originally in the course, the span with the name of the item changed if
    // it only has one item. I didn't do that, so mine, wont change. But I'll
    // try to test it any way.

    const quantity = 1;
    const itemName = 'itemName';
    render(<ItemCounter name={itemName} quantity={quantity} />);

    const itemNameElement = screen.getByText(itemName);

    expect(itemNameElement.style.color).toBe('');
  });
});
