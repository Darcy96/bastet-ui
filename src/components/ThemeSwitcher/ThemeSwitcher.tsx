import React from 'react';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useBstTheme } from '../../theme';
import { CONTRAST_DARK } from '../../utils/colors';
import { themeNames, type ThemeName } from '../../theme/tokens';
import styles from './ThemeSwitcher.module.css';

// ─── Types ────────────────────────────────────────────────────

export type ThemeSwitcherSize = 'sm' | 'md';

export interface ThemeSwitcherProps {
  /** Callback fired when a theme is selected */
  onThemeChange: (theme: ThemeName) => void;
  /** Override the active theme (defaults to context via useBstTheme) */
  activeTheme?: ThemeName;
  /** Size preset */
  size?: ThemeSwitcherSize;
  /** Display variant: horizontal group of buttons or a compact dropdown */
  variant?: 'group' | 'dropdown';
  /** Additional CSS class */
  className?: string;
}

// ─── Theme Labels ─────────────────────────────────────────────

const themeLabels: Record<ThemeName, { emoji: string; label: string }> = {
  light:        { emoji: '☀️',  label: 'Light' },
  dark:         { emoji: '🌙', label: 'Dark' },
  oriental:     { emoji: '🏯', label: 'Oriental' },
  'black-metal': { emoji: '🤘', label: 'Black Metal' },
  pink:         { emoji: '💖', label: 'Pink' },
  'white-city': { emoji: '🏛️', label: 'Ciudad Blanca' },
};

// ─── Size Map ─────────────────────────────────────────────────

const sizeMap: Record<ThemeSwitcherSize, { height: number; fontSize: number; paddingInline: number; gap: number }> = {
  sm: { height: 30, fontSize: 12, paddingInline: 10, gap: 4 },
  md: { height: 36, fontSize: 13, paddingInline: 14, gap: 6 },
};

// ─── Component ────────────────────────────────────────────────

/**
 * ThemeSwitcher
 *
 * An interactive theme selector that renders a horizontal group of
 * buttons — one per Bastet UI theme preset. The active theme is
 * highlighted with the current theme's primary color.
 *
 * This is a **controlled** component: it does not manage theme state
 * internally. The parent is responsible for calling `onThemeChange`
 * and passing the result down to `BstThemeProvider`.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher
 *   onThemeChange={(t) => setTheme(t)}
 *   activeTheme="dark"
 *   size="md"
 * />
 * ```
 */
export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  (
    {
      onThemeChange,
      activeTheme: activeThemeProp,
      size = 'md',
      variant = 'group',
      className,
    },
    ref,
  ) => {
    const { themeName: contextTheme, token } = useBstTheme();
    const activeThemeRaw = activeThemeProp ?? contextTheme;
    const activeTheme = themeNames.includes(activeThemeRaw as ThemeName) ? activeThemeRaw : 'light';
    const sizeValues = sizeMap[size];

    const groupClasses = [
      styles.themeSwitcher,
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (variant === 'dropdown') {
      const activeLabelInfo = themeLabels[activeTheme as ThemeName];
      
      const items: MenuProps['items'] = themeNames.map((name) => {
        const { emoji, label } = themeLabels[name];
        return {
          key: name,
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: token.fontFamily }}>
              <span>{emoji}</span>
              <span>{label}</span>
            </span>
          ),
          onClick: () => onThemeChange(name),
        };
      });

      return (
        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
          <Button 
            style={{ 
              fontFamily: token.fontFamily, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              height: sizeValues.height,
              borderRadius: token.borderRadius,
            }}
          >
            <span>{activeLabelInfo.emoji}</span>
            <span>{activeLabelInfo.label}</span>
          </Button>
        </Dropdown>
      );
    }

    return (
      <div
        ref={ref}
        className={groupClasses}
        data-theme={activeTheme}
        role="radiogroup"
        aria-label="Theme selector"
        style={{
          gap: sizeValues.gap,
          borderRadius: token.borderRadius,
          fontFamily: token.fontFamily,
        }}
      >
        {themeNames.map((name) => {
          const isActive = name === activeTheme;
          const { emoji, label } = themeLabels[name];

          const btnStyle: React.CSSProperties = {
            height: sizeValues.height,
            fontSize: sizeValues.fontSize,
            paddingInline: sizeValues.paddingInline,
            borderRadius: token.borderRadius,
            fontFamily: token.fontFamily,
            backgroundColor: isActive ? token.colorPrimary : token.colorBgContainer,
            color: isActive ? '#FFFFFF' : token.colorText,
            borderColor: isActive ? token.colorPrimary : token.colorBorder,
          };

          // Override active color for black-metal (dark text on bone primary)
          if (isActive && activeTheme === 'black-metal') {
            btnStyle.color = CONTRAST_DARK;
          }

          return (
            <button
              key={name}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={label}
              className={[
                styles.btn,
                isActive && styles.btnActive,
              ]
                .filter(Boolean)
                .join(' ')}
              style={btnStyle}
              onClick={() => onThemeChange(name)}
            >
              <span className={styles.emoji} aria-hidden="true">
                {emoji}
              </span>
              <span className={styles.label}>{label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);

ThemeSwitcher.displayName = 'ThemeSwitcher';
