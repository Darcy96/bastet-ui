/**
 * 🧪 Button — Tests Unitarios
 *
 * Este archivo prueba el componente Button de forma aislada.
 * Cada `it(...)` es un caso de prueba individual que verifica
 * UN solo comportamiento.
 *
 * 💡 TIP: Lee cada test como una oración en inglés:
 *    "it renders children text" → "renderiza el texto de los hijos"
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { BstThemeProvider } from '../../theme';

/**
 * Función helper para envolver componentes en el ThemeProvider.
 * Nuestros componentes usan `useBstTheme()` internamente,
 * que necesita un Provider arriba en el árbol de React.
 * Sin esto, el test crashearía con "Cannot read property of undefined".
 */
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <BstThemeProvider>{ui}</BstThemeProvider>
  );
};

// ─── Test Suite ───────────────────────────────────────────────

describe('Button', () => {

  // Test 1: ¿Renderiza el texto que le pasamos?
  it('renders children text', () => {
    renderWithTheme(<Button>Click me</Button>);

    // screen.getByText busca un elemento que contenga ese texto.
    // Si no lo encuentra, el test FALLA automáticamente.
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  // Test 2: ¿Aplica la clase CSS correcta según el variant?
  it('applies variant class', () => {
    renderWithTheme(<Button variant="secondary">Test</Button>);

    const button = screen.getByRole('button');
    // toHaveClass verifica que el elemento tenga esa clase CSS
    expect(button).toHaveClass('bst-button--secondary');
  });

  // Test 3: ¿Aplica la clase CSS correcta según el size?
  it('applies size class', () => {
    renderWithTheme(<Button size="lg">Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bst-button--lg');
  });

  // Test 4: ¿El botón se desactiva cuando le pasamos disabled?
  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    // toBeDisabled es un matcher de jest-dom que verifica
    // que el elemento HTML tenga el atributo `disabled`
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bst-button--disabled');
  });

  // Test 5: ¿Llama a onClick cuando el usuario hace click?
  it('calls onClick handler when clicked', () => {
    // vi.fn() crea una función "espía" (mock function).
    // Después podemos preguntarle: ¿te llamaron? ¿cuántas veces?
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole('button');
    // fireEvent.click simula un click real del usuario
    fireEvent.click(button);

    // toHaveBeenCalledTimes(1) verifica que la función espía
    // fue llamada exactamente 1 vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 6: ¿NO llama a onClick cuando está desactivado?
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button disabled onClick={handleClick}>Click</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // La función espía NO debió ser llamada
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 7: ¿Aplica la clase de full-width?
  it('applies full-width class when fullWidth is true', () => {
    renderWithTheme(<Button fullWidth>Wide</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bst-button--full-width');
  });

  // Test 8: ¿Usa los valores por defecto correctos?
  it('uses default variant (primary) and size (md)', () => {
    renderWithTheme(<Button>Default</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bst-button--primary');
    expect(button).toHaveClass('bst-button--md');
  });

  // Test 9: ¿Acepta className adicional?
  it('accepts custom className', () => {
    renderWithTheme(<Button className="my-custom">Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('my-custom');
    // Y también mantiene sus clases propias
    expect(button).toHaveClass('bst-button');
  });

  // Test 10: ¿Acepta ref? (forwardRef funciona correctamente)
  it('forwards ref to the button element', () => {
    // React.createRef crea una referencia que se "conecta" al DOM.
    // Si forwardRef funciona, ref.current será el <button> real.
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    renderWithTheme(<Button ref={ref}>Ref test</Button>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
