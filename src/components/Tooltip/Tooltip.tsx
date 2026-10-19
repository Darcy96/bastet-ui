import * as RadixTooltip from '@radix-ui/react-tooltip';
import React from 'react';
import { useBstTheme } from '../../theme';
import { buildBstCssVars } from '../../utils/buildBstCssVars';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The text content to display inside the tooltip */
  content: string;
  /** Optional delay before showing the tooltip in ms */
  delayDuration?: number;
  /** Side where the tooltip opens */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Optional CSS class for the content */
  className?: string;
  /** Whether the trigger should be rendered using Radix asChild */
  asChild?: boolean;
}

export function Tooltip({
  children,
  content,
  delayDuration = 200,
  side = 'top',
  className = '',
  asChild = true,
}: TooltipProps) {
  const { themeName, token } = useBstTheme();
  const portalStyle = buildBstCssVars(token) as React.CSSProperties;

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild={asChild}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className={`${styles.content} ${className}`}
            data-theme={themeName}
            style={portalStyle}
          >
            {content}
            <RadixTooltip.Arrow className={styles.arrow} width={10} height={5} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

Tooltip.displayName = 'Tooltip';

export const TooltipPrimitives = {
  Provider: RadixTooltip.Provider,
  Root: RadixTooltip.Root,
  Trigger: RadixTooltip.Trigger,
  Portal: RadixTooltip.Portal,
  Content: RadixTooltip.Content,
  Arrow: RadixTooltip.Arrow,
};
