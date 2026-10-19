import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown Compound Component', () => {
  it('renders trigger and opens content on click', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button data-testid="trigger">Open</button>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <div data-testid="content">Menu Item</div>
        </Dropdown.Content>
      </Dropdown>
    );

    // Content should not be visible initially
    expect(screen.queryByTestId('content')).toBeNull();

    // Trigger open
    fireEvent.pointerDown(screen.getByTestId('trigger'));

    // Content should now be visible
    expect(screen.getByTestId('content')).toBeDefined();
  });

  it('closes content when clicking outside or pressing Escape', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown>
          <Dropdown.Trigger>
            <button data-testid="trigger">Open</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <div data-testid="content">Menu Item</div>
          </Dropdown.Content>
        </Dropdown>
      </div>
    );

    // Open dropdown
    fireEvent.pointerDown(screen.getByTestId('trigger'));
    expect(screen.getByTestId('content')).toBeDefined();

    // Press Escape to close (native Radix behavior)
    fireEvent.keyDown(screen.getByTestId('content'), { key: 'Escape' });
    expect(screen.queryByTestId('content')).toBeNull();
  });
});
