import React from 'react';
import { useBstTheme } from '../../theme';
import { CONTRAST_LIGHT, CONTRAST_DARK } from '../../utils/colors';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'outline' | 'ghost';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default' | (string & NonNullable<unknown>);
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'solid', color = 'primary', size = 'md', className, children, style, ...rest }, ref) => {
    const { token, themeName } = useBstTheme();

    // Map color prop to Ant Design tokens
    let baseColor = token.colorPrimary;
    let baseBg = token.colorPrimary;
    let textColor = CONTRAST_LIGHT;

    switch (color) {
      case 'success':
        baseColor = token.colorSuccess;
        baseBg = token.colorSuccessBg;
        textColor = CONTRAST_LIGHT;
        break;
      case 'warning':
        baseColor = token.colorWarning;
        baseBg = token.colorWarningBg;
        textColor = CONTRAST_DARK;
        break;
      case 'error':
        baseColor = token.colorError;
        baseBg = token.colorErrorBg;
        textColor = CONTRAST_LIGHT;
        break;
      case 'info':
        baseColor = token.colorInfo;
        baseBg = token.colorInfoBg;
        textColor = CONTRAST_LIGHT;
        break;
      case 'default':
        baseColor = token.colorTextSecondary;
        baseBg = token.colorFillAlter;
        textColor = token.colorText;
        break;
      case 'primary':
        baseColor = token.colorPrimary;
        baseBg = token.colorPrimaryBg;
        textColor = themeName === 'black-metal' ? CONTRAST_DARK : CONTRAST_LIGHT;
        break;
      default:
        // If it's a custom color string (e.g. '#9333ea', 'purple')
        baseColor = color;
        baseBg = color;
        textColor = CONTRAST_LIGHT;
        break;
    }

    const customStyles: React.CSSProperties = {
      ...style,
      '--bst-badge-bg': color === 'default' ? baseBg : baseColor,
      '--bst-badge-color': textColor,
      '--bst-badge-text-color': baseColor,
      '--bst-badge-border': baseColor,
      '--bst-badge-bg-ghost': baseBg,
    } as React.CSSProperties;

    const classNames = [
      styles.badge,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classNames} style={customStyles} {...rest}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
