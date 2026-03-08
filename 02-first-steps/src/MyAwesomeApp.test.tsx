import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyAwesomeApp } from './MyAwesomeApp';

describe('MyAwesomeApp.tsx', () => {
  test('should render firstName and lastname', () => {
    const { container } = render(<MyAwesomeApp />);

    const h1 = container.querySelector('h1');
    const h3 = container.querySelector('h3');

    expect(h1?.innerHTML).toContain('Leonel');
    expect(h3?.innerHTML).toContain('Bongiovanni');
  });

  test('should render firstName and lastname with screen', () => {
    render(<MyAwesomeApp />);
    // screen.debug();

    // const h1 = screen.getByRole('heading', { level: 1 });
    const h1 = screen.getByTestId('firstname-heading');

    expect(h1.innerHTML).toBe('Leonel');
  });
});
