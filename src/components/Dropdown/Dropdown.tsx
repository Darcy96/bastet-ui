import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';
import { useBstTheme } from '../../theme';
import { buildBstCssVars } from '../../utils/buildBstCssVars';
import styles from './Dropdown.module.css';

// ─── Root Component ──────────────────────────────────────────────────────

export interface DropdownProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DropdownRoot: React.FC<DropdownProps> = ({
  children,
  open,
  defaultOpen,
  onOpenChange,
}) => {
  return (
    <DropdownMenu.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </DropdownMenu.Root>
  );
};

// ─── Trigger Component ───────────────────────────────────────────────────

export interface DropdownTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, asChild = true, className }, ref) => {
    return (
      <DropdownMenu.Trigger
        ref={ref}
        asChild={asChild}
        className={asChild ? undefined : `${styles.triggerWrapper} ${className || ''}`}
      >
        {children}
      </DropdownMenu.Trigger>
    );
  },
);
DropdownTrigger.displayName = 'Dropdown.Trigger';

// ─── Content Component ───────────────────────────────────────────────────

export interface DropdownContentProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, align = 'end', sideOffset = 8, className }, ref) => {
    const { themeName, token } = useBstTheme();
    const portalStyle = buildBstCssVars(token) as React.CSSProperties;

    const radixAlign: 'start' | 'center' | 'end' =
      align === 'left' ? 'start' : align === 'right' ? 'end' : align;

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={ref}
          align={radixAlign}
          sideOffset={sideOffset}
          collisionPadding={12}
          className={`${styles.content} ${className || ''}`}
          data-theme={themeName}
          style={{
            ...portalStyle,
            fontFamily: token.fontFamily,
            borderRadius: token.borderRadius,
            backgroundColor: token.colorBgElevated || token.colorBgBase,
            borderColor: token.colorBorder,
          }}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    );
  },
);
DropdownContent.displayName = 'Dropdown.Content';

// ─── Item Component ────────────────────────────────────────────────────────

export interface DropdownItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, icon, className, disabled, onSelect, onClick, ...rest }, ref) => {
    return (
      <DropdownMenu.Item
        ref={ref}
        disabled={disabled}
        onSelect={onSelect}
        onClick={onClick}
        className={`${styles.item} ${className || ''}`}
        {...rest}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemContent}>{children}</span>
      </DropdownMenu.Item>
    );
  },
);
DropdownItem.displayName = 'Dropdown.Item';

// ─── Export ─────────────────────────────────────────────────────────────

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Root: DropdownMenu.Root,
  Portal: DropdownMenu.Portal,
  Group: DropdownMenu.Group,
  Label: DropdownMenu.Label,
  CheckboxItem: DropdownMenu.CheckboxItem,
  RadioGroup: DropdownMenu.RadioGroup,
  RadioItem: DropdownMenu.RadioItem,
  Separator: DropdownMenu.Separator,
});
