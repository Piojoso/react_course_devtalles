import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FirstStepsApp } from './FirstStepsApp';

describe('FirstStepsApp.tsx', () => {
  test('should match snapshot', () => {
    const { container } = render(<FirstStepsApp />);

    expect(container).toMatchSnapshot();
  });
});
