/**
 * 🧪 Navbar — Tests Unitarios
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { Navbar } from './Navbar';
import styles from './Navbar.module.css';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

describe('Navbar', () => {

  // Test 1: Renderiza el brand como texto
  it('renders brand as text', () => {
    renderWithTheme(
      <Navbar brand="Darcysm" />
    );

    expect(screen.getByText('Darcysm')).toBeInTheDocument();
  });

  // Test 2: Renderiza el brand como ReactNode
  it('renders brand as ReactNode', () => {
    renderWithTheme(
      <Navbar brand={<span data-testid="custom-brand">Logo</span>} />
    );

    expect(screen.getByTestId('custom-brand')).toBeInTheDocument();
  });

  // Test 3: Renderiza los links de navegación
  it('renders navigation links', () => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
    ];
    renderWithTheme(<Navbar brand="Test" links={links} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  // Test 4: Aplica clase sticky cuando sticky={true}
  it('applies sticky class when sticky prop is true', () => {
    const { container } = renderWithTheme(
      <Navbar brand="Test" sticky />
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass(styles['navbar--sticky']);
  });

  // Test 5: No aplica sticky por defecto
  it('does not apply sticky class by default', () => {
    const { container } = renderWithTheme(
      <Navbar brand="Test" />
    );

    const nav = container.querySelector('nav');
    expect(nav).not.toHaveClass(styles['navbar--sticky']);
  });

  // Test 6: Renderiza el slot de LanguageSwitcher
  it('renders languageSwitcherSlot', () => {
    renderWithTheme(
      <Navbar
        brand="Test"
        languageSwitcherSlot={<div data-testid="lang-slot">ES/EN</div>}
      />
    );

    expect(screen.getByTestId('lang-slot')).toBeInTheDocument();
  });

  // Test 7: Muestra ThemeSwitcher cuando onThemeChange está presente
  it('shows ThemeSwitcher when onThemeChange is provided', () => {
    const handleThemeChange = vi.fn();
    renderWithTheme(
      <Navbar brand="Test" onThemeChange={handleThemeChange} />
    );

    // El Navbar usa ThemeSwitcher en variant="dropdown" por defecto,
    // que renderiza un botón de Ant Design (no radio buttons).
    // Verificamos que exista un botón con el emoji del tema activo.
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
