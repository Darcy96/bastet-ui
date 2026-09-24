import React, { createContext, useContext, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import { themes, type ThemeName } from './tokens';
import { buildBstCssVars } from '../utils/buildBstCssVars';

// ─── Context ──────────────────────────────────────────────────

interface BstThemeContextValue {
  /** Current active theme name */
  themeName: ThemeName;
  /** Current performance mode */
  performanceMode: 'auto' | 'always' | 'never';
}

const BstThemeContext = createContext<BstThemeContextValue>({
  themeName: 'light',
  performanceMode: 'auto',
});

// ─── Provider ─────────────────────────────────────────────────

export interface BstThemeProviderProps {
  /** Theme preset to apply. Defaults to 'light'. */
  theme?: ThemeName;
  /** Efficiency mode to disable heavy animations. Defaults to 'auto' (respects OS). */
  performanceMode?: 'auto' | 'always' | 'never';
  children: React.ReactNode;
}

// ─── Internal Theme Root ────────────────────────────────────────

function BstThemeRoot({ children, safeThemeName, performanceMode }: { children: React.ReactNode, safeThemeName: string, performanceMode: string }) {
  const { token } = theme.useToken();

  const containerStyle = useMemo<React.CSSProperties>(() => ({
    fontFamily: token.fontFamily,
    color: token.colorTextBase,
    backgroundColor: token.colorBgBase,
    minHeight: '100%',
    transition: 'color 200ms ease, background-color 200ms ease',
    ...buildBstCssVars(token),
  } as React.CSSProperties), [token]);

  return (
    <div className="bst-theme-root" data-theme={safeThemeName} data-bst-reduce-motion={performanceMode} style={containerStyle}>
      {children}
    </div>
  );
}

import { ToastProvider } from '../components/Toast';

/**
 * BstThemeProvider
 *
 * Wraps Ant Design's ConfigProvider to apply one of Bastet UI's
 * 5 theme presets. All child components — both Ant Design and
 * Bastet custom components — will inherit the active theme tokens.
 */
export function BstThemeProvider({
  theme: themeName = 'light',
  performanceMode = 'auto',
  children,
}: BstThemeProviderProps) {
  // Fallback to light if an invalid or old cached theme name is passed
  const themeConfig = themes[themeName] || themes['light'];
  const safeThemeName = themes[themeName] ? themeName : 'light';

  const contextValue = useMemo<BstThemeContextValue>(
    () => ({ themeName: safeThemeName, performanceMode }),
    [safeThemeName, performanceMode],
  );

  return (
    <BstThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>
        <BstThemeRoot safeThemeName={safeThemeName} performanceMode={performanceMode}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </BstThemeRoot>
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
  const { themeName, performanceMode } = useContext(BstThemeContext);
  const { token } = theme.useToken();

  return {
    themeName,
    performanceMode,
    token,
  };
}
