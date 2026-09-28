import React from 'react';
import { useBstTheme } from '../../theme';
import styles from './List.module.css';

export type ListVariant = 'shape' | 'icon' | 'none';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
  /** 
   * Visual style of the list markers: 
   * - 'shape': Theme-aware geometric CSS shapes (circles, diamonds). 
   * - 'icon': Theme-specific emojis.
   * - 'none': No markers.
   * @default 'shape'
   */
  variant?: ListVariant;
}

const ListContext = React.createContext<{ variant: ListVariant }>({ variant: 'shape' });

/**
 * List
 * 
 * A styled unordered list that consumes theme tokens and provides
 * cohesive markers (CSS shapes or emojis) that adapt to the active theme.
 */
export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, variant = 'shape', className, ...rest }, ref) => {
    const classNames = [styles.list, className].filter(Boolean).join(' ');

    return (
      <ListContext.Provider value={{ variant }}>
        <ul ref={ref} className={classNames} {...rest}>
          {children}
        </ul>
      </ListContext.Provider>
    );
  }
);
List.displayName = 'List';

export interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  /** Optional custom icon to override the theme default marker for this specific item */
  customIcon?: React.ReactNode;
}

const themeIcons: Record<string, string> = {
  'light': '☀️',
  'dark': '🌙',
  'oriental': '🏯',
  'black-metal': '🤘',
  'pink': '💖',
  'white-city': '🏛️',
};

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, customIcon, className, ...rest }, ref) => {
    const { themeName } = useBstTheme();
    const { variant } = React.useContext(ListContext);

    const isShape = variant === 'shape' && !customIcon;
    const classNames = [
      styles.listItem,
      isShape && styles.hasShape,
      className
    ].filter(Boolean).join(' ');

    const iconToRender = customIcon ? customIcon : (variant === 'icon' ? (themeIcons[themeName] || '•') : null);

    return (
      <li ref={ref} className={classNames} data-theme={themeName} {...rest}>
        {iconToRender && (
          <span className={styles.iconWrapper} aria-hidden="true">
            {iconToRender}
          </span>
        )}
        <span className={styles.content}>{children}</span>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
