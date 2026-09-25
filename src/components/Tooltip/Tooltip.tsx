import React from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The text content to display inside the tooltip */
  content: string;
  /** Optional CSS class for the wrapper */
  className?: string;
}

export function Tooltip({ children, content, className = '' }: TooltipProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
      <div className={styles.tooltipBubble} role="tooltip">
        {content}
      </div>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
