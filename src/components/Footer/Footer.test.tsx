/**
 * 🧪 Footer — Tests Unitarios
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BstThemeProvider } from '../../theme';
import { Footer } from './Footer';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<BstThemeProvider>{ui}</BstThemeProvider>);
};

describe('Footer', () => {

  // Test 1: Renderiza los links sociales
  it('renders social links', () => {
    renderWithTheme(
      <Footer
        socials={[
          { platform: 'github', url: 'https://github.com/test' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/test' },
        ]}
      />
    );

    // Cada link tiene aria-label con el nombre de la plataforma
    const githubLink = screen.getByLabelText('github');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test');

    const linkedinLink = screen.getByLabelText('linkedin');
    expect(linkedinLink).toBeInTheDocument();
  });

  // Test 2: Links externos abren en nueva pestaña
  it('opens external links in new tab', () => {
    renderWithTheme(
      <Footer
        socials={[
          { platform: 'github', url: 'https://github.com/test' },
        ]}
      />
    );

    const link = screen.getByLabelText('github');
    // target="_blank" abre en nueva pestaña
    expect(link).toHaveAttribute('target', '_blank');
    // rel="noopener noreferrer" es por seguridad
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Test 3: Email links NO abren en nueva pestaña
  it('does not set target="_blank" for email links', () => {
    renderWithTheme(
      <Footer
        socials={[
          { platform: 'email', url: 'mailto:test@test.com' },
        ]}
      />
    );

    const link = screen.getByLabelText('email');
    expect(link).not.toHaveAttribute('target');
  });

  // Test 4: Renderiza el texto de copyright
  it('renders copyright text', () => {
    renderWithTheme(
      <Footer copyright="© 2026 Darcysm" />
    );

    expect(screen.getByText('© 2026 Darcysm')).toBeInTheDocument();
  });

  // Test 5: Renderiza children personalizados
  it('renders custom children', () => {
    renderWithTheme(
      <Footer>
        <p>Built with love</p>
      </Footer>
    );

    expect(screen.getByText('Built with love')).toBeInTheDocument();
  });
});
