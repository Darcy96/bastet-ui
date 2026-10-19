import React, { createContext, useContext, useMemo } from 'react';
import { ToastProvider } from '../components/Toast';
import { buildBstCssVars } from '../utils/buildBstCssVars';
import {
  themes,
  resolveTokens,
  type BstSeedTokens,
  type BstThemeTokens,
  type ThemeName,
} from './tokens';

// ─── Context ──────────────────────────────────────────────────

interface BstThemeContextValue {
  /** Current active theme name */
  themeName: ThemeName;
  /** Resolved active design tokens */
  token: BstThemeTokens;
  /** Current performance mode */
  performanceMode: 'auto' | 'always' | 'never';
}

const defaultTokens = themes.light;

const BstThemeContext = createContext<BstThemeContextValue>({
  themeName: 'light',
  token: defaultTokens,
  performanceMode: 'auto',
});

// ─── Provider ─────────────────────────────────────────────────

export interface BstThemeProviderProps {
  /** 
   * Theme preset to apply. Defaults to 'light'.
   * Can be one of the preset names or a custom theme token object.
   */
  theme?: ThemeName | BstThemeTokens | BstSeedTokens;
  /** Efficiency mode to disable heavy animations. Defaults to 'auto' (respects OS). */
  performanceMode?: 'auto' | 'always' | 'never';
  children: React.ReactNode;
}

// ─── Internal Theme Root ────────────────────────────────────────

function BstThemeRoot({
  children,
  safeThemeName,
  token,
  performanceMode,
}: {
  children: React.ReactNode;
  safeThemeName: string;
  token: BstThemeTokens;
  performanceMode: string;
}) {
  const containerStyle = useMemo<React.CSSProperties>(
    () =>
      ({
        fontFamily: token.fontFamily,
        color: token.colorTextBase,
        backgroundColor: token.colorBgBase,
        minHeight: '100%',
        transition: 'color 200ms ease, background-color 200ms ease',
        ...buildBstCssVars(token),
      } as React.CSSProperties),
    [token],
  );

  return (
    <div
      className="bst-theme-root"
      data-theme={safeThemeName}
      data-bst-reduce-motion={performanceMode}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

/**
 * BstThemeProvider
 *
 * Lightweight, zero-dependency theme provider for Bastet UI.
 * Applies one of Bastet UI's theme presets (or a custom theme),
 * computing CSS custom variables (`--bst-*`) and sharing tokens
 * across the component tree.
 */
export function BstThemeProvider({
  theme: themeInput = 'light',
  performanceMode = 'auto',
  children,
}: BstThemeProviderProps) {
  const isCustomObject = typeof themeInput === 'object';

  // Resolve tokens
  const token: BstThemeTokens = useMemo(() => {
    if (isCustomObject) {
      return resolveTokens(themeInput as BstSeedTokens);
    }
    const preset = themes[themeInput as ThemeName];
    return preset || themes.light;
  }, [themeInput, isCustomObject]);

  const safeThemeName = (isCustomObject
    ? 'light'
    : themes[themeInput as ThemeName]
    ? themeInput
    : 'light') as ThemeName;

  const contextValue = useMemo<BstThemeContextValue>(
    () => ({
      themeName: safeThemeName,
      token,
      performanceMode,
    }),
    [safeThemeName, token, performanceMode],
  );

  return (
    <BstThemeContext.Provider value={contextValue}>
      <BstThemeRoot
        safeThemeName={safeThemeName}
        token={token}
        performanceMode={performanceMode}
      >
        <ToastProvider>{children}</ToastProvider>
      </BstThemeRoot>
    </BstThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────

/**
 * useBstTheme
 *
 * Access the current Bastet theme name and resolved design tokens
 * from anywhere in the component tree.
 *
 * @example
 * ```tsx
 * const { themeName, token } = useBstTheme();
 * console.log(token.colorPrimary); // '#1677FF'
 * ```
 */
export function useBstTheme() {
  const context = useContext(BstThemeContext);
  return {
    themeName: context.themeName,
    performanceMode: context.performanceMode,
    token: context.token,
  };
}
