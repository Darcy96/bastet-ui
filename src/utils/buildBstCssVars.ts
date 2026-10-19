import type { BstThemeTokens } from '../theme/tokens';
import { hexToRgb } from './colors';

/**
 * buildBstCssVars
 *
 * Creates the canonical map of `--bst-*` CSS custom properties from
 * Bastet UI theme tokens. This is the **single source of truth**
 * for all CSS variable injection in Bastet UI — used by both
 * BstThemeRoot (main tree) and Portals (Modal, Select, Dropdown).
 *
 * Adding a new variable here automatically propagates it everywhere.
 */
export function buildBstCssVars(token: BstThemeTokens): Record<string, string> {
  return {
    '--bst-primary': token.colorPrimary,
    '--bst-primary-hover': token.colorPrimaryHover,
    '--bst-primary-active': token.colorPrimaryActive,
    '--bst-primary-rgb': hexToRgb(token.colorPrimary),
    '--bst-bg-base': token.colorBgBase,
    '--bst-bg-container': token.colorBgContainer,
    '--bst-bg-elevated': token.colorBgElevated,
    '--bst-text': token.colorText,
    '--bst-text-base': token.colorTextBase,
    '--bst-text-secondary': token.colorTextSecondary,
    '--bst-border': token.colorBorder,
    '--bst-radius': `${token.borderRadius}px`,
    '--bst-font-family': token.fontFamily,
    '--bst-error': token.colorError,
    '--bst-error-hover': token.colorErrorHover,
    '--bst-error-active': token.colorErrorActive,
    '--bst-success': token.colorSuccess,
    '--bst-warning': token.colorWarning,
    '--bst-info': token.colorInfo,
  };
}
