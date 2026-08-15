/**
 * Setup file para Vitest.
 *
 * Este archivo se ejecuta ANTES de cada archivo de test.
 * Importa los "matchers" de @testing-library/jest-dom, que son
 * funciones extra para hacer assertions sobre el DOM, como:
 *
 *   - toBeInTheDocument()   → ¿existe este elemento?
 *   - toBeDisabled()        → ¿está desactivado?
 *   - toHaveClass('xyz')    → ¿tiene esta clase CSS?
 *   - toHaveAttribute('x')  → ¿tiene este atributo HTML?
 *
 * Sin esta importación, expect(...).toBeInTheDocument() no existiría.
 */
import '@testing-library/jest-dom';
