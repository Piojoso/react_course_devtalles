import { render, screen } from '@testing-library/react';
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
});
