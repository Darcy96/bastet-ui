import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { useBstTheme } from '../../theme';
import styles from './Dropdown.module.css';

// ─── Context ─────────────────────────────────────────────────────────────

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be rendered within a Dropdown');
  }
  return context;
};

// ─── Root Component ──────────────────────────────────────────────────────

export interface DropdownProps {
  children: ReactNode;
}

const DropdownRoot: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, triggerRef }}>
      <div className={styles.dropdownContainer} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// ─── Trigger Component ───────────────────────────────────────────────────

export interface DropdownTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, asChild }, ref) => {
    const { toggle, triggerRef } = useDropdownContext();
    
    // Merge internal triggerRef with external ref if provided
    const setRefs = (element: HTMLDivElement) => {
      (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
      if (typeof ref === 'function') ref(element);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = element;
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref: setRefs,
        onClick: (e: React.MouseEvent) => {
          toggle();
          if (child.props.onClick) child.props.onClick(e);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': useDropdownContext().isOpen,
      });
    }

    return (
      <div
        ref={setRefs}
        className={styles.triggerWrapper}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={useDropdownContext().isOpen}
      >
        {children}
      </div>
    );
  }
);
DropdownTrigger.displayName = 'Dropdown.Trigger';

// ─── Content Component ───────────────────────────────────────────────────

export interface DropdownContentProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, align = 'right', className }, ref) => {
    const { isOpen } = useDropdownContext();
    const { themeName, token } = useBstTheme();

    if (!isOpen) return null;

    const classNames = [
      styles.content,
      styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`],
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        data-theme={themeName}
        style={{
          fontFamily: token.fontFamily,
          borderRadius: token.borderRadius,
          backgroundColor: token.colorBgBase,
          borderColor: token.colorBorder,
        }}
        role="menu"
      >
        {children}
      </div>
    );
  }
);
DropdownContent.displayName = 'Dropdown.Content';

// ─── Item Component ────────────────────────────────────────────────────────

export interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, icon, className, onClick, ...rest }, ref) => {
    const { close } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(e);
      close();
    };

    return (
      <div
        ref={ref}
        className={`${styles.item} ${className || ''}`}
        onClick={handleClick}
        role="menuitem"
        tabIndex={0}
        {...rest}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemContent}>{children}</span>
      </div>
    );
  }
);
DropdownItem.displayName = 'Dropdown.Item';

// ─── Export ─────────────────────────────────────────────────────────────

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
});
