import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip Component (Radix Tooltip)', () => {
  it('renders trigger child', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: /hover me/i })).toBeDefined();
  });
});
