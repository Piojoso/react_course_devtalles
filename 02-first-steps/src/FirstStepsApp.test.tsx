import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { FirstStepsApp } from './FirstStepsApp';
// import { ItemCounter } from './shopping-cart/ItemCounter';

const mockItemCounter = vi.fn((props: unknown) => {
  return <div data-testid="ItemCounter" />;
});

vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
  ItemCounter: (props: unknown) => mockItemCounter(props),
}));

// vi.mock('./shopping-cart/ItemCounter.tsx', () => ({
//   ItemCounter: (props: unknown) => (
//     <div data-testid="ItemCounter" name={props.name} />
//   ),
// }));

describe('FirstStepsApp.tsx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should match snapshot', () => {
    const { container } = render(<FirstStepsApp />);

    expect(container).toMatchSnapshot();
  });

  test('should render the correct number of ItemCounter components', () => {
    render(<FirstStepsApp />);

    const itemCounterElements = screen.getAllByTestId('ItemCounter');

    expect(itemCounterElements.length).toBe(3);
  });

  test('should render ItemCounter with the correct props', () => {
    render(<FirstStepsApp />);

    expect(mockItemCounter).toHaveBeenCalledTimes(3);
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: 'Steam Deck',
      quantity: 1,
    });
  });
});
