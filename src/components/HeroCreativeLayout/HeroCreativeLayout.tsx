import React from 'react';
import { useBstTheme } from '../../theme';
import { Carousel } from '../Carousel';
import styles from './HeroCreativeLayout.module.css';

export interface HeroCreativeLayoutProps {
  /** Slot for the top navigation bar (e.g., Navbar component) */
  navbarSlot?: React.ReactNode;
  /** Slot for the main title (H1) */
  titleSlot: React.ReactNode;
  /** Slot for the description text */
  descriptionSlot?: React.ReactNode;
  /** Slot for the CTA buttons */
  actionsSlot?: React.ReactNode;
  /** Slot for the right visual area (Avatars, organic shapes, floating cards) - shown on Desktop */
  visualContentSlot?: React.ReactNode;
  /** Array of items to show in an interactive carousel on Mobile screens */
  mobileCarouselItems?: React.ReactNode[];
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
      titleSlot,
      descriptionSlot,
      actionsSlot,
      visualContentSlot,
      mobileCarouselItems,
      className,
      style,
    },
    ref,
  ) => {
    const { themeName, token } = useBstTheme();

    const wrapperClasses = [
      styles.heroCreative,
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
          <div className={styles.nav}>
            {navbarSlot}
          </div>
        )}

        {/* Main Content Area */}
        <div className={styles.main}>
          {/* Title */}
          <div className={styles.title}>
            {titleSlot}
          </div>

          {/* Desktop Description */}
          {descriptionSlot && (
            <div className={styles.descriptionDesktop}>
              {descriptionSlot}
            </div>
          )}

          {/* Visual Content (Creative Sandbox / Carousel) */}
          {(visualContentSlot || mobileCarouselItems) && (
            <div className={styles.visualBlock}>
              {/* Desktop view (static sandbox) */}
              {visualContentSlot && (
                <div className={styles.visualDesktop}>
                  {visualContentSlot}
                </div>
              )}
              
              {/* Mobile Carousel View */}
              {mobileCarouselItems && mobileCarouselItems.length > 0 && (
                <div className={styles.visualMobile}>
                  <Carousel items={mobileCarouselItems} />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {actionsSlot && (
            <div className={styles.actionsBlock}>
              {actionsSlot}
            </div>
          )}
        </div>
      </section>
    );
  },
);

HeroCreativeLayout.displayName = 'HeroCreativeLayout';
