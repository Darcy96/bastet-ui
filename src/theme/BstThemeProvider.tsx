import React, { createContext, useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import { themes, type ThemeName } from './tokens';

// ─── Context ──────────────────────────────────────────────────

interface BstThemeContextValue {
  /** Current active theme name */
  themeName: ThemeName;
}

const BstThemeContext = createContext<BstThemeContextValue>({
  themeName: 'light',
});

// ─── Provider ─────────────────────────────────────────────────

export interface BstThemeProviderProps {
  /** Theme preset to apply. Defaults to 'light'. */
  theme?: ThemeName;
  children: React.ReactNode;
}

/**
 * BstThemeProvider
 *
 * Wraps Ant Design's ConfigProvider to apply one of Bastet UI's
 * 5 theme presets. All child components — both Ant Design and
 * Bastet custom components — will inherit the active theme tokens.
 *
 * @example
 * ```tsx
 * <BstThemeProvider theme="dark">
 *   <App />
 * </BstThemeProvider>
 * ```
 */
export function BstThemeProvider({
  theme: themeName = 'light',
  children,
}: BstThemeProviderProps) {
  const themeConfig = themes[themeName];

  const contextValue = useMemo<BstThemeContextValue>(
    () => ({ themeName }),
    [themeName],
  );

  return (
    <BstThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </BstThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────

/**
 * useBstTheme
 *
 * Access the current Bastet theme name and Ant Design's resolved
 * design tokens from anywhere in the component tree.
 *
 * @example
 * ```tsx
 * const { themeName, token } = useBstTheme();
 * console.log(token.colorPrimary); // '#6366F1'
 * ```
 */
export function useBstTheme() {
  const { themeName } = useContext(BstThemeContext);
  const { token } = theme.useToken();

  return {
    themeName,
    token,
  };
}
