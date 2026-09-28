/**
 * 🧪 Carousel — Tests Unitarios
 *
 * Verifica el comportamiento del carrusel:
 * - ¿Renderiza los slides?
 * - ¿Muestra los dots de navegación?
 * - ¿No renderiza nada si no hay items?
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Carousel } from './Carousel';
import styles from './Carousel.module.css';

// El Carousel no usa useBstTheme(), así que no necesita ThemeProvider 🎉

describe('Carousel', () => {

  // Test 1: Si no hay items, no renderiza nada
  it('renders nothing when items array is empty', () => {
    const { container } = render(<Carousel items={[]} />);

    // container.firstChild es null si el componente retorna null
    expect(container.firstChild).toBeNull();
  });

  // Test 2: Renderiza la cantidad correcta de slides
  it('renders the correct number of slides', () => {
    const items = [
      <div key="1">Slide 1</div>,
      <div key="2">Slide 2</div>,
      <div key="3">Slide 3</div>,
    ];
    render(<Carousel items={items} />);

    // Verificamos que los 3 textos estén en el DOM
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  // Test 3: Renderiza un dot por cada item
  it('renders one dot per item', () => {
    const items = [
      <div key="1">A</div>,
      <div key="2">B</div>,
    ];
    render(<Carousel items={items} />);

    // Los dots tienen role="tab", así que podemos buscarlos por rol
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(2);
  });

  // Test 4: El primer dot inicia como activo
  it('starts with the first dot active', () => {
    const items = [
      <div key="1">A</div>,
      <div key="2">B</div>,
    ];
    render(<Carousel items={items} />);

    const dots = screen.getAllByRole('tab');
    // aria-selected indica cuál tab/dot está activo
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  // Test 5: Acepta className personalizado
  it('accepts custom className', () => {
    const items = [<div key="1">A</div>];
    const { container } = render(<Carousel items={items} className="my-carousel" />);

    expect(container.firstChild).toHaveClass(styles.carouselWrapper);
    expect(container.firstChild).toHaveClass('my-carousel');
  });

  // Test 6: Soporta forwardRef
  it('forwards ref to wrapper div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    const items = [<div key="1">A</div>];
    render(<Carousel ref={ref} items={items} />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
