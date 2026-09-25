import React from 'react';
import { useBstTheme } from '../../theme';
import styles from './Heading.module.css';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level: 1 to 6 */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Applies theme-specific highlight styling (e.g., gradients, shadows) */
  highlight?: boolean;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Margin bottom reset / control */
  noMargin?: boolean;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 1,
      highlight = false,
      align,
      noMargin = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();
    const Component = `h${level}` as React.ElementType;

    const classNames = [
      styles.heading,
      styles[`h${level}`],
      highlight && styles.highlight,
      align && styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
      noMargin && styles.noMargin,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as React.Ref<HTMLHeadingElement>}
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

Heading.displayName = 'Heading';
