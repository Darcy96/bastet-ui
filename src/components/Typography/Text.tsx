import React from 'react';
import { useBstTheme } from '../../theme';
import './Text.css';

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
      'bst-text',
      `bst-text--${variant}`,
      `bst-text--${size}`,
      `bst-text--weight-${weight}`,
      align && `bst-text--align-${align}`,
      inline && 'bst-text--inline',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as any}
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
