import React from 'react';
import { useBstTheme } from '../../theme';
import './HeroCreativeLayout.css';

export interface HeroCreativeLayoutProps {
  /** Slot for the top navigation bar (e.g., Navbar component) */
  navbarSlot?: React.ReactNode;
  /** Slot for the main text content (Title, subtitle, CTA buttons) */
  textContentSlot: React.ReactNode;
  /** Slot for the right visual area (Avatars, organic shapes, floating cards) */
  visualContentSlot?: React.ReactNode;
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * HeroCreativeLayout
 *
 * A modern, flexible hero section that fuses the header (navbar) and the main content.
 * It provides a grid layout split into a text block and a visual block.
 *
 * It automatically maps Ant Design theme tokens to standard CSS variables so that
 * any custom floating elements (like pill cards) placed inside can easily consume them.
 *
 * Provided CSS Variables for children:
 * --bst-primary
 * --bst-bg
 * --bst-text
 * --bst-border
 * --bst-radius
 */
export const HeroCreativeLayout = React.forwardRef<HTMLDivElement, HeroCreativeLayoutProps>(
  (
    {
      navbarSlot,
      textContentSlot,
      visualContentSlot,
      className,
      style,
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();

    const wrapperClasses = [
      'bst-hero-creative',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Map theme tokens to CSS variables so children can freely use them for organic shapes
    const cssVars = {
      '--bst-primary': token.colorPrimary,
      '--bst-bg': token.colorBgContainer,
      '--bst-text': token.colorText,
      '--bst-text-secondary': token.colorTextSecondary,
      '--bst-border': token.colorBorder,
      '--bst-radius': `${token.borderRadius}px`,
      fontFamily: token.fontFamily,
      ...style,
    } as React.CSSProperties;

    return (
      <section
        ref={ref}
        className={wrapperClasses}
        data-theme={themeName}
        style={cssVars}
      >
        {/* Navbar Slot (Top) */}
        {navbarSlot && (
          <div className="bst-hero-creative__nav">
            {navbarSlot}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bst-hero-creative__main">
          {/* Left: Text Content */}
          <div className="bst-hero-creative__text-block">
            {textContentSlot}
          </div>

          {/* Right: Visual Content (Creative Sandbox) */}
          {visualContentSlot && (
            <div className="bst-hero-creative__visual-block">
              {visualContentSlot}
            </div>
          )}
        </div>
      </section>
    );
  },
);

HeroCreativeLayout.displayName = 'HeroCreativeLayout';
