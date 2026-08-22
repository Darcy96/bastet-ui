import React, { useState } from 'react';
import { useBstTheme } from '../../theme';
import { Modal } from '../Modal';
import './HorizontalExperience.css';

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

export interface HorizontalExperienceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of experiences */
  items: ExperienceItem[];
  /** Additional CSS classes */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────

/**
 * HorizontalExperience
 *
 * A modern, app-like horizontal timeline that renders cards in a zigzag pattern.
 * Clicking a card opens a centered Modal with detailed architectural achievements.
 */
export const HorizontalExperience = React.forwardRef<HTMLDivElement, HorizontalExperienceProps>(
  ({ items, className, ...rest }, ref) => {
    const { themeName } = useBstTheme();
    const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

    if (!items || items.length === 0) return null;

    const wrapperClasses = ['bst-horizontal-experience', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={wrapperClasses} data-theme={themeName} {...rest}>
        {/* The Track with Horizontal Scroll */}
        <div className="bst-horizontal-track">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="bst-horizontal-item"
              style={{ gridColumn: index + 1 }}
            >
              <div className="bst-horizontal-dot" aria-hidden="true" />

              <div
                className="bst-horizontal-card"
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
                <span className="bst-horizontal-date">{item.date}</span>
                <h3 className="bst-horizontal-role">{item.role}</h3>
                <h4 className="bst-horizontal-company">{item.company}</h4>
                <p className="bst-horizontal-location">{item.location}</p>

                {item.stack && item.stack.length > 0 && (
                  <div className="bst-horizontal-stack">
                    {item.stack.map((tech) => (
                      <span key={tech} className="bst-horizontal-badge">
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

HorizontalExperience.displayName = 'HorizontalExperience';
