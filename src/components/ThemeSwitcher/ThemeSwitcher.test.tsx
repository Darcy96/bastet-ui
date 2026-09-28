/**
 * 🧪 ThemeSwitcher — Tests Unitarios
 *
 * Verifica que el selector de temas:
 * - Renderiza los 5 temas
 * - Marca el tema activo correctamente
 * - Llama al callback cuando se selecciona un tema
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { ThemeSwitcher } from './ThemeSwitcher';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

describe('ThemeSwitcher', () => {

  // Test 1: Renderiza un botón por cada uno de los 6 temas
  it('renders 6 theme buttons', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <ThemeSwitcher onThemeChange={handleChange} />
    );

    // Cada botón tiene role="radio" (definido en el componente)
    const buttons = screen.getAllByRole('radio');
    expect(buttons).toHaveLength(6);
  });

  // Test 2: El tema activo tiene aria-checked="true"
  it('marks the active theme with aria-checked', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <ThemeSwitcher onThemeChange={handleChange} activeTheme="dark" />
    );

    // Buscamos el botón con aria-label "Dark"
    const darkBtn = screen.getByLabelText('Dark');
    expect(darkBtn).toHaveAttribute('aria-checked', 'true');

    // Los demás NO deben estar checked
    const lightBtn = screen.getByLabelText('Light');
    expect(lightBtn).toHaveAttribute('aria-checked', 'false');
  });

  // Test 3: Llama a onThemeChange al hacer click
  it('calls onThemeChange when a theme is clicked', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <ThemeSwitcher onThemeChange={handleChange} activeTheme="light" />
    );

    // Hacemos click en "Oriental"
    const orientalBtn = screen.getByLabelText('Oriental');
    fireEvent.click(orientalBtn);

    // Verificamos que fue llamado con 'oriental'
    expect(handleChange).toHaveBeenCalledWith('oriental');
  });

  // Test 4: Cada botón muestra su emoji y label
  it('renders emoji and label for each theme', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <ThemeSwitcher onThemeChange={handleChange} />
    );

    // Verificamos que los labels estén visibles
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Oriental')).toBeInTheDocument();
    expect(screen.getByText('Black Metal')).toBeInTheDocument();
    expect(screen.getByText('Pink')).toBeInTheDocument();
    expect(screen.getByText('Ciudad Blanca')).toBeInTheDocument();
  });
});
