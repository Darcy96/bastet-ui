import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
];

describe('Select Component (Radix UI)', () => {
  it('renders with label and placeholder', () => {
    render(<Select label="Fruit" placeholder="Select fruit..." options={options} />);
    expect(screen.getByText('Fruit')).toBeDefined();
    expect(screen.getByText('Select fruit...')).toBeDefined();
  });

  it('displays error message and applies invalid state', () => {
    render(
      <Select
        label="Fruit"
        options={options}
        error="Selection is required"
      />
    );
    expect(screen.getByText('Selection is required')).toBeDefined();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('opens content and selects an option', () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="Fruit"
        options={options}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    // Option should be visible
    const appleOption = screen.getByText('Apple');
    expect(appleOption).toBeDefined();

    // Select option
    fireEvent.click(appleOption);
    expect(handleChange).toHaveBeenCalled();
  });
});
