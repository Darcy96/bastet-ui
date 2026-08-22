import React from 'react';
import './Tooltip.css';

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
    <div className={`bst-tooltip-wrapper ${className}`}>
      {children}
      <div className="bst-tooltip-bubble" role="tooltip">
        {content}
      </div>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
