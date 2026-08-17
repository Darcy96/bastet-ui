import type { GlobalToken } from 'antd';
import { hexToRgb } from './colors';

/**
 * buildBstCssVars
 *
 * Creates the canonical map of `--bst-*` CSS custom properties from
 * resolved Ant Design tokens. This is the **single source of truth**
 * for all CSS variable injection in Bastet UI — used by both
 * BstThemeRoot (main tree) and Modal (portal tree).
 *
 * Adding a new variable here automatically propagates it everywhere.
 */
export function buildBstCssVars(token: GlobalToken): Record<string, string> {
  return {
    '--bst-primary': token.colorPrimary,
    '--bst-primary-rgb': hexToRgb(token.colorPrimary),
    '--bst-bg-container': token.colorBgContainer,
    '--bst-bg-elevated': token.colorBgElevated,
    '--bst-text': token.colorText,
    '--bst-text-secondary': token.colorTextSecondary,
    '--bst-border': token.colorBorder,
    '--bst-radius': `${token.borderRadius}px`,
    '--bst-font-family': token.fontFamily,
    '--bst-error': token.colorError,
  };
}
