import React from 'react';
import { useBstTheme } from '../../theme';
import type { ThemeName } from '../../theme/tokens';
import { ThemeSwitcher } from '../ThemeSwitcher';
import './Navbar.css';

// ─── Types ────────────────────────────────────────────────────

export interface NavbarLink {
  /** Display label */
  label: string;
  /** Navigation URL */
  href: string;
}

export interface NavbarProps {
  /** Brand element — logo, text, or ReactNode */
  brand: React.ReactNode;
  /** Navigation links */
  links?: NavbarLink[];
  /** Callback fired when a theme is selected via the built-in ThemeSwitcher */
  onThemeChange?: (theme: ThemeName) => void;
  /** Override the active theme passed to the ThemeSwitcher */
  activeTheme?: ThemeName;
  /** Display variant for the integrated ThemeSwitcher */
  themeSwitcherVariant?: 'group' | 'dropdown';
  /** If true, the navbar sticks to the top of the viewport */
  sticky?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────

/**
 * Navbar
 *
 * A reusable navigation bar that integrates the ThemeSwitcher.
 * Features a glassmorphism backdrop-blur effect, themed styling
 * via Ant Design tokens, and per-theme micro-interactions.
 *
 * Layout: `[ Brand ] ——— [ Links ] ——— [ ThemeSwitcher ]`
 *
 * @example
 * ```tsx
 * <Navbar
 *   brand="Darcysm"
 *   links={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About', href: '/about' },
 *   ]}
 *   onThemeChange={(t) => setTheme(t)}
 * />
 * ```
 */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      links = [],
      onThemeChange,
      activeTheme,
      themeSwitcherVariant = 'dropdown',
      sticky = false,
      className,
      style,
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();
    const currentTheme = activeTheme ?? themeName;

    const navClasses = [
      'bst-navbar',
      sticky && 'bst-navbar--sticky',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const navStyle: React.CSSProperties = {
      fontFamily: token.fontFamily,
      borderBottomColor: token.colorBorderSecondary,
      backgroundColor: `${token.colorBgContainer}cc`,
      ...style,
    };

    return (
      <nav
        ref={ref}
        className={navClasses}
        data-theme={currentTheme}
        style={navStyle}
      >
        <div className="bst-navbar__inner">
          {/* Brand */}
          <div className="bst-navbar__brand">
            {typeof brand === 'string' ? (
              <span
                className="bst-navbar__brand-text"
                style={{
                  color: token.colorText,
                  fontFamily: token.fontFamily,
                }}
              >
                {brand}
              </span>
            ) : (
              brand
            )}
          </div>

          {/* Links */}
          {links.length > 0 && (
            <ul className="bst-navbar__links" role="navigation">
              {links.map((link) => (
                <li key={link.href} className="bst-navbar__link-item">
                  <a
                    href={link.href}
                    className="bst-navbar__link"
                    style={{
                      color: token.colorTextSecondary,
                      fontFamily: token.fontFamily,
                      ['--bst-nav-link-hover' as string]: token.colorPrimary,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Theme Switcher */}
          {onThemeChange && (
            <div className="bst-navbar__actions">
              <ThemeSwitcher
                onThemeChange={onThemeChange}
                activeTheme={currentTheme}
                size="sm"
                variant={themeSwitcherVariant}
              />
            </div>
          )}
        </div>
      </nav>
    );
  },
);

Navbar.displayName = 'Navbar';
