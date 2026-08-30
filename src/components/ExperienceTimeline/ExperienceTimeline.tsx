import React, { useState } from 'react';
import { useBstTheme } from '../../theme';
import { Modal } from '../Modal';
import './ExperienceTimeline.css';

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

    const wrapperClasses = ['bst-exp-timeline', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={wrapperClasses} data-theme={themeName} data-layout={layout} {...rest}>
        {/* The Track */}
        <div className="bst-exp-timeline__track">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="bst-exp-timeline__item"
              style={{ gridColumn: index + 1 }}
            >
              <div className="bst-exp-timeline__dot" aria-hidden="true" />

              <div
                className="bst-exp-timeline__card"
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
                <span className="bst-exp-timeline__date">{item.date}</span>
                <h3 className="bst-exp-timeline__role">{item.role}</h3>
                <h4 className="bst-exp-timeline__company">{item.company}</h4>
                <p className="bst-exp-timeline__location">{item.location}</p>

                {item.stack && item.stack.length > 0 && (
                  <div className="bst-exp-timeline__stack">
                    {item.stack.map((tech) => (
                      <span key={tech} className="bst-exp-timeline__badge">
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
            <div className="bst-exp-modal-body">
              <div className="bst-exp-modal-header">
                <h2 className="bst-exp-modal-role">{selectedItem.role}</h2>
                <p className="bst-exp-modal-meta">
                  <strong>{selectedItem.company}</strong> &bull; {selectedItem.date} &bull; {selectedItem.location}
                </p>
              </div>

              <div className="bst-exp-modal-desc">
                {Array.isArray(selectedItem.detailedDescription) ? (
                  <ul className="bst-exp-modal-list">
                    {selectedItem.detailedDescription.map((desc, idx) => (
                      <li key={idx} className="bst-exp-modal-list-item">
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
