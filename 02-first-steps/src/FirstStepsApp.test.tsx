import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { FirstStepsApp } from './FirstStepsApp';

vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
  ItemCounter: () => <div data-testid="ItemCounter" />,
}));

describe('FirstStepsApp.tsx', () => {
  test('should match snapshot', () => {
    const { container } = render(<FirstStepsApp />);

    expect(container).toMatchSnapshot();
  });

  test('should render the correct number of ItemCounter components', () => {
    render(<FirstStepsApp />);

    const itemCounterElements = screen.getAllByTestId('ItemCounter');

    expect(itemCounterElements.length).toBe(3);
  });
});
