import React, { useState } from 'react';
import { useBstTheme } from '../../theme';
import { Modal } from '../Modal';
import styles from './ExperienceTimeline.module.css';

// ─── Types ────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string | number;
  date: string;
  role: string;
  company: string;
  location: string;
  stack: string[];
  detailedDescription?: React.ReactNode | string[];
}

export type ExperienceLayout = 'horizontal' | 'vertical' | 'auto';

export interface ExperienceTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of experiences */
  items: ExperienceItem[];
  /** Layout mode: 'horizontal' (zigzag), 'vertical' (mobile), or 'auto' (responsive) */
  layout?: ExperienceLayout;
  /** Additional CSS classes */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────

/**
 * ExperienceTimeline
 *
 * A modern, app-like timeline that renders cards in a zigzag pattern (horizontal)
 * or a vertical timeline (vertical). Use `layout="auto"` (default) for automatic
 * responsive switching at 768px.
 */
export const ExperienceTimeline = React.forwardRef<HTMLDivElement, ExperienceTimelineProps>(
  ({ items, layout = 'auto', className, ...rest }, ref) => {
    const { themeName } = useBstTheme();
    const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

    if (!items || items.length === 0) return null;

    const wrapperClasses = [styles.timeline, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={wrapperClasses} data-theme={themeName} data-layout={layout} {...rest}>
        {/* The Track */}
        <div className={styles.track}>
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className={styles.item}
              style={{ gridColumn: index + 1 }}
            >
              <div className={styles.dot} aria-hidden="true" />

              <div
                className={styles.card}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
              >
                <span className={styles.date}>{item.date}</span>
                <h3 className={styles.role}>{item.role}</h3>
                <h4 className={styles.company}>{item.company}</h4>
                <p className={styles.location}>{item.location}</p>

                {item.stack && item.stack.length > 0 && (
                  <div className={styles.stack}>
                    {item.stack.map((tech) => (
                      <span key={tech} className={styles.badge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* The Detailed Modal */}
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          {selectedItem && (
            <div className={styles.body}>
              <div className={styles.header}>
                <h2 className={styles.role}>{selectedItem.role}</h2>
                <p className={styles.meta}>
                  <strong>{selectedItem.company}</strong> &bull; {selectedItem.date} &bull; {selectedItem.location}
                </p>
              </div>

              <div className={styles.desc}>
                {Array.isArray(selectedItem.detailedDescription) ? (
                  <ul className={styles.list}>
                    {selectedItem.detailedDescription.map((desc, idx) => (
                      <li key={idx} className={styles.listItem}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  selectedItem.detailedDescription
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }
);

ExperienceTimeline.displayName = 'ExperienceTimeline';
