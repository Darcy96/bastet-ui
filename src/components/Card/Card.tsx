import React from 'react';
import { useBstTheme } from '../../theme';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** If true, adds a hover lift effect and shadow */
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, style, ...rest }, ref) => {
    const { token } = useBstTheme();

    const customStyles = {
      ...style,
      '--bst-card-bg': token.colorBgContainer,
      '--bst-card-border': token.colorBorderSecondary,
    } as React.CSSProperties;

    const classNames = [
      styles.card,
      hoverable && styles.hoverable,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classNames} style={customStyles} {...rest}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={[styles.header, className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={[styles.body, className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </div>
    );
  }
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={[styles.footer, className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
