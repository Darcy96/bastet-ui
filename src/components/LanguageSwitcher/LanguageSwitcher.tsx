import React from 'react';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useBstTheme } from '../../theme';
import { CONTRAST_DARK } from '../../utils/colors';
import './LanguageSwitcher.css';

// ─── Types ────────────────────────────────────────────────────

export type LanguageSwitcherSize = 'sm' | 'md';

export interface LanguageOption {
  value: string;
  label: string;
  icon?: string; // e.g., '🇬🇧' or 'US'
}

export interface LanguageSwitcherProps {
  /** The currently selected locale */
  activeLocale: string;
  /** Available locales to switch between */
  locales: LanguageOption[];
  /** Callback fired when a language is selected */
  onLocaleChange: (locale: string) => void;
  /** Size preset */
  size?: LanguageSwitcherSize;
  /** Display variant: horizontal group of buttons or a compact dropdown */
  variant?: 'group' | 'dropdown';
  /** Additional CSS class */
  className?: string;
}

// ─── Size Map ─────────────────────────────────────────────────

const sizeMap: Record<LanguageSwitcherSize, { height: number; fontSize: number; paddingInline: number; gap: number }> = {
  sm: { height: 30, fontSize: 12, paddingInline: 10, gap: 4 },
  md: { height: 36, fontSize: 13, paddingInline: 14, gap: 6 },
};

// ─── Component ────────────────────────────────────────────────

/**
 * LanguageSwitcher
 *
 * An interactive language selector that renders a horizontal group of
 * buttons or a dropdown. The active language is highlighted with the 
 * current theme's primary color.
 *
 * This is a **controlled** component: it does not manage routing internally.
 */
export const LanguageSwitcher = React.forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  (
    {
      activeLocale,
      locales,
      onLocaleChange,
      size = 'md',
      variant = 'group',
      className,
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();
    const sizeValues = sizeMap[size];

    const groupClasses = [
      'bst-lang-switcher',
      `bst-lang-switcher--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const activeOption = locales.find((l) => l.value === activeLocale) || locales[0];

    if (variant === 'dropdown') {
      const items: MenuProps['items'] = locales.map((locale) => ({
        key: locale.value,
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: token.fontFamily }}>
            {locale.icon && <span>{locale.icon}</span>}
            <span>{locale.label}</span>
          </span>
        ),
        onClick: () => onLocaleChange(locale.value),
      }));

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
            {activeOption?.icon && <span>{activeOption.icon}</span>}
            <span>{activeOption?.label}</span>
          </Button>
        </Dropdown>
      );
    }

    return (
      <div
        ref={ref}
        className={groupClasses}
        data-theme={themeName}
        role="radiogroup"
        aria-label="Language selector"
        style={{
          gap: sizeValues.gap,
          borderRadius: token.borderRadius,
          fontFamily: token.fontFamily,
        }}
      >
        {locales.map((locale) => {
          const isActive = locale.value === activeLocale;

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

          // Override active color for black-metal
          if (isActive && themeName === 'black-metal') {
            btnStyle.color = CONTRAST_DARK;
          }

          return (
            <button
              key={locale.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={locale.label}
              className={[
                'bst-lang-switcher__btn',
                isActive && 'bst-lang-switcher__btn--active',
              ]
                .filter(Boolean)
                .join(' ')}
              style={btnStyle}
              onClick={() => onLocaleChange(locale.value)}
            >
              {locale.icon && (
                <span className="bst-lang-switcher__icon" aria-hidden="true">
                  {locale.icon}
                </span>
              )}
              <span className="bst-lang-switcher__label">{locale.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
