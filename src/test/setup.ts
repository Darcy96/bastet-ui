/**
 * Setup file para Vitest.
 *
 * Este archivo se ejecuta ANTES de cada archivo de test.
 * Importa los "matchers" de @testing-library/jest-dom y polyfills para Radix UI en JSDOM.
 */
import '@testing-library/jest-dom';

// Polyfills para Radix UI en JSDOM
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = window.HTMLElement.prototype.scrollIntoView || (() => {});
  window.HTMLElement.prototype.hasPointerCapture = window.HTMLElement.prototype.hasPointerCapture || (() => false);
  window.HTMLElement.prototype.setPointerCapture = window.HTMLElement.prototype.setPointerCapture || (() => {});
  window.HTMLElement.prototype.releasePointerCapture = window.HTMLElement.prototype.releasePointerCapture || (() => {});

  if (!window.PointerEvent) {
    class PointerEvent extends MouseEvent {
      public pointerId?: number;
      constructor(type: string, params: PointerEventInit = {}) {
        super(type, params);
        this.pointerId = params.pointerId;
      }
    }
    // @ts-ignore
    window.PointerEvent = PointerEvent;
  }
}
