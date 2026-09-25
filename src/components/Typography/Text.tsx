import React from 'react';
import { useBstTheme } from '../../theme';
import styles from './Text.module.css';

export type TextVariant = 'default' | 'secondary' | 'primary' | 'success' | 'warning' | 'error';
export type TextSize = 'sm' | 'md' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'bold';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  /** Thematic color variant */
  variant?: TextVariant;
  /** Size preset */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** If true, renders a <span> instead of a <p> */
  inline?: boolean;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'default',
      size = 'md',
      weight = 'normal',
      align,
      inline = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();
    const Component = inline ? 'span' : 'p';

    const classNames = [
      styles.text,
      styles[variant],
      styles[size],
      styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}`],
      align && styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
      inline && styles.inline,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement & HTMLSpanElement>}
        className={classNames}
        data-theme={themeName}
        style={{
          fontFamily: token.fontFamily,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
