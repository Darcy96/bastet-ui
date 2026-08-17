// ═══════════════════════════════════════════════════════════════
// Bastet UI — Semantic Color Constants
//
// Hardcoded contrast colors used across components when Ant Design
// tokens don't provide the exact shade needed (e.g., text on a
// bone-white primary button in black-metal theme).
// ═══════════════════════════════════════════════════════════════

/** Pure white — used for text on dark/colored backgrounds */
export const CONTRAST_LIGHT = '#FFFFFF';

/** Near-black — used for text on light/bone-white backgrounds (black-metal theme) */
export const CONTRAST_DARK = '#0A0A0A';

/** Danger hover shade */
export const DANGER_HOVER = '#C00000';

/** Danger active shade */
export const DANGER_ACTIVE = '#800000';

/**
 * hexToRgb
 *
 * Converts a hex color string (e.g. '#1677FF' or '#fff') to an
 * RGB triplet string (e.g. '22, 119, 255') suitable for use in
 * CSS `rgba(var(--color-rgb), alpha)` patterns.
 *
 * Returns '0, 0, 0' as fallback for invalid input.
 */
export function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const fullHex =
    clean.length === 3
      ? clean.split('').map((c) => c + c).join('')
      : clean;

  const num = parseInt(fullHex, 16);

  if (isNaN(num)) return '0, 0, 0';

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `${r}, ${g}, ${b}`;
}

