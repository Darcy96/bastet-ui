/**
 * 🧪 LanguageSwitcher — Tests Unitarios
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { LanguageSwitcher } from './LanguageSwitcher';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

const mockLocales = [
  { value: 'en', label: 'EN', icon: '🇺🇸' },
  { value: 'es', label: 'ES', icon: '🇪🇸' },
];

describe('LanguageSwitcher', () => {

  // Test 1: Renderiza los idiomas
  it('renders all locale options', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <LanguageSwitcher
        activeLocale="en"
        locales={mockLocales}
        onLocaleChange={handleChange}
      />
    );

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  // Test 2: Marca el idioma activo con aria-checked
  it('marks the active locale with aria-checked', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <LanguageSwitcher
        activeLocale="es"
        locales={mockLocales}
        onLocaleChange={handleChange}
      />
    );

    const esBtn = screen.getByLabelText('ES');
    expect(esBtn).toHaveAttribute('aria-checked', 'true');

    const enBtn = screen.getByLabelText('EN');
    expect(enBtn).toHaveAttribute('aria-checked', 'false');
  });

  // Test 3: Llama a onLocaleChange al hacer click
  it('calls onLocaleChange when a locale is clicked', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <LanguageSwitcher
        activeLocale="en"
        locales={mockLocales}
        onLocaleChange={handleChange}
      />
    );

    const esBtn = screen.getByLabelText('ES');
    fireEvent.click(esBtn);

    expect(handleChange).toHaveBeenCalledWith('es');
  });

  // Test 4: Tiene role="radiogroup" en el contenedor
  it('has radiogroup role on the wrapper', () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <LanguageSwitcher
        activeLocale="en"
        locales={mockLocales}
        onLocaleChange={handleChange}
      />
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toBeInTheDocument();
  });
});
