/**
 * 🧪 HeroCreativeLayout — Tests Unitarios
 *
 * Este componente es un layout (contenedor), así que testeamos
 * que los slots se rendericen correctamente, no la lógica interna.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { HeroCreativeLayout } from './HeroCreativeLayout';
import styles from './HeroCreativeLayout.module.css';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

describe('HeroCreativeLayout', () => {

  // Test 1: Renderiza el titleSlot
  it('renders titleSlot content', () => {
    renderWithTheme(
      <HeroCreativeLayout titleSlot={<h1>Hello World</h1>} />
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  // Test 2: Renderiza el descriptionSlot
  it('renders descriptionSlot content', () => {
    renderWithTheme(
      <HeroCreativeLayout
        titleSlot={<h1>Title</h1>}
        descriptionSlot={<p>My description</p>}
      />
    );

    expect(screen.getByText('My description')).toBeInTheDocument();
  });

  // Test 3: Renderiza el actionsSlot
  it('renders actionsSlot content', () => {
    renderWithTheme(
      <HeroCreativeLayout
        titleSlot={<h1>Title</h1>}
        actionsSlot={<button>CTA</button>}
      />
    );

    expect(screen.getByText('CTA')).toBeInTheDocument();
  });

  // Test 4: Renderiza el navbarSlot
  it('renders navbarSlot content', () => {
    renderWithTheme(
      <HeroCreativeLayout
        titleSlot={<h1>Title</h1>}
        navbarSlot={<nav data-testid="hero-nav">Nav</nav>}
      />
    );

    expect(screen.getByTestId('hero-nav')).toBeInTheDocument();
  });

  // Test 5: Acepta className personalizado
  it('accepts custom className', () => {
    const { container } = renderWithTheme(
      <HeroCreativeLayout
        titleSlot={<h1>Title</h1>}
        className="my-hero"
      />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass(styles.heroCreative);
    expect(section).toHaveClass('my-hero');
  });

  // Test 6: Soporta forwardRef
  it('forwards ref to the section element', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    renderWithTheme(
      <HeroCreativeLayout ref={ref} titleSlot={<h1>Title</h1>} />
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
