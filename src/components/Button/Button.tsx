import React from 'react';
import { theme } from 'antd';
import { useBstTheme } from '../../theme';
import { CONTRAST_LIGHT, CONTRAST_DARK, DANGER_HOVER, DANGER_ACTIVE } from '../../utils/colors';
import './Button.css';

// ─── Types ────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size preset */
  size?: ButtonSize;
  /** Stretch to fill container width */
  fullWidth?: boolean;
  /** Button contents */
  children?: React.ReactNode;
  /** HTML button type attribute */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

// ─── Size Map ─────────────────────────────────────────────────

const sizeMap: Record<ButtonSize, { height: number; fontSize: number; paddingInline: number }> = {
  sm: { height: 32, fontSize: 13, paddingInline: 12 },
  md: { height: 40, fontSize: 14, paddingInline: 20 },
  lg: { height: 48, fontSize: 16, paddingInline: 28 },
};

// ─── Component ────────────────────────────────────────────────

/**
 * Button
 *
 * A themed button component that consumes Ant Design design tokens
 * via `theme.useToken()`. Supports 4 variants and 3 sizes.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      htmlType = 'button',
      children,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();
    const sizeValues = sizeMap[size];

    // Resolve variant-specific colors from Ant Design tokens
    const variantStyles = getVariantStyles(variant, token, themeName);

    const buttonStyle: React.CSSProperties = {
      ...variantStyles,
      height: sizeValues.height,
      fontSize: sizeValues.fontSize,
      paddingInline: sizeValues.paddingInline,
      borderRadius: token.borderRadius,
      fontFamily: token.fontFamily,
      width: fullWidth ? '100%' : undefined,
      ...style,
    };

    const classNames = [
      'bst-button',
      `bst-button--${variant}`,
      `bst-button--${size}`,
      fullWidth && 'bst-button--full-width',
      disabled && 'bst-button--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={htmlType}
        className={classNames}
        data-theme={themeName}
        disabled={disabled}
        style={buttonStyle}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

// ─── Variant Style Resolver ───────────────────────────────────

function getVariantStyles(
  variant: ButtonVariant,
  t: ReturnType<typeof theme.useToken>['token'],
  themeName?: string,
): React.CSSProperties {
  if (themeName === 'black-metal') {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: t.colorPrimary,
          color: CONTRAST_DARK,
          borderColor: t.colorPrimary,
          ['--bst-btn-hover-bg' as string]: CONTRAST_LIGHT,
          ['--bst-btn-hover-border' as string]: CONTRAST_LIGHT,
          ['--bst-btn-hover-color' as string]: '#000000',
          ['--bst-btn-active-bg' as string]: t.colorPrimaryActive,
          ['--bst-btn-active-color' as string]: '#000000',
        };

      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: t.colorPrimary,
          borderColor: t.colorPrimary,
          ['--bst-btn-hover-bg' as string]: t.colorPrimary,
          ['--bst-btn-hover-border' as string]: t.colorPrimary,
          ['--bst-btn-hover-color' as string]: CONTRAST_DARK,
          ['--bst-btn-active-bg' as string]: t.colorPrimaryActive,
          ['--bst-btn-active-color' as string]: '#000000',
        };

      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: t.colorPrimary,
          borderColor: 'transparent',
          ['--bst-btn-hover-bg' as string]: 'rgba(240, 234, 214, 0.15)',
          ['--bst-btn-hover-border' as string]: 'transparent',
          ['--bst-btn-hover-color' as string]: t.colorPrimary,
        };

      case 'danger':
        return {
          backgroundColor: t.colorError,
          color: CONTRAST_LIGHT,
          borderColor: t.colorError,
          ['--bst-btn-hover-bg' as string]: DANGER_HOVER,
          ['--bst-btn-hover-border' as string]: DANGER_HOVER,
          ['--bst-btn-active-bg' as string]: DANGER_ACTIVE,
        };
    }
  }

  if (themeName === 'white-city') {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: t.colorPrimary,
          color: '#FAF9F6', // whiteCityTheme.components.Button.colorTextLightSolid
          borderColor: t.colorPrimary,
          ['--bst-btn-hover-bg' as string]: '#A1322E',
          ['--bst-btn-hover-border' as string]: '#A1322E',
          ['--bst-btn-active-bg' as string]: '#6B1D1A',
        };

      case 'secondary':
        return {
          backgroundColor: t.colorBgContainer,
          color: t.colorText,
          borderColor: t.colorBorder,
          ['--bst-btn-hover-bg' as string]: t.colorBgContainer,
          ['--bst-btn-hover-border' as string]: t.colorPrimary,
          ['--bst-btn-hover-color' as string]: t.colorPrimary,
        };

      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: t.colorPrimary,
          borderColor: 'transparent',
          ['--bst-btn-hover-bg' as string]: `${t.colorPrimary}12`,
          ['--bst-btn-hover-border' as string]: 'transparent',
        };

      case 'danger':
        return {
          backgroundColor: t.colorError,
          color: '#FAF9F6',
          borderColor: t.colorError,
          ['--bst-btn-hover-bg' as string]: t.colorErrorHover,
          ['--bst-btn-hover-border' as string]: t.colorErrorHover,
          ['--bst-btn-active-bg' as string]: t.colorErrorActive,
        };
    }
  }

  switch (variant) {
    case 'primary':
      return {
        backgroundColor: t.colorPrimary,
        color: CONTRAST_LIGHT,
        borderColor: t.colorPrimary,
        ['--bst-btn-hover-bg' as string]: t.colorPrimaryHover,
        ['--bst-btn-hover-border' as string]: t.colorPrimaryHover,
        ['--bst-btn-active-bg' as string]: t.colorPrimaryActive,
      };

    case 'secondary':
      return {
        backgroundColor: t.colorBgContainer,
        color: t.colorText,
        borderColor: t.colorBorder,
        ['--bst-btn-hover-bg' as string]: t.colorBgContainer,
        ['--bst-btn-hover-border' as string]: t.colorPrimary,
        ['--bst-btn-hover-color' as string]: t.colorPrimary,
      };

    case 'ghost':
      return {
        backgroundColor: 'transparent',
        color: t.colorPrimary,
        borderColor: 'transparent',
        ['--bst-btn-hover-bg' as string]: `${t.colorPrimary}12`,
        ['--bst-btn-hover-border' as string]: 'transparent',
      };

    case 'danger':
      return {
        backgroundColor: t.colorError,
        color: CONTRAST_LIGHT,
        borderColor: t.colorError,
        ['--bst-btn-hover-bg' as string]: t.colorErrorHover,
        ['--bst-btn-hover-border' as string]: t.colorErrorHover,
        ['--bst-btn-active-bg' as string]: t.colorErrorActive,
      };
  }
}
