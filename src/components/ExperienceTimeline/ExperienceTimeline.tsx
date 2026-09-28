import React, { useState } from 'react';
import { useBstTheme } from '../../theme';
import { Modal } from '../Modal';
import { Card, CardBody } from '../Card';
import { Badge } from '../Badge';
import { Heading, Text } from '../Typography';
import { List, ListItem } from '../List';
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

              <Card
                className={styles.card}
                hoverable
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
                <CardBody>
                  <Text size="sm" variant="secondary" weight="bold" className={styles.date}>{item.date}</Text>
                  <Heading level={3} noMargin className={styles.role}>{item.role}</Heading>
                  <Heading level={4} noMargin className={styles.company}>{item.company}</Heading>
                  <Text size="sm" variant="secondary" className={styles.location}>{item.location}</Text>

                  {item.stack && item.stack.length > 0 && (
                    <div className={styles.stack}>
                      {item.stack.map((tech) => (
                        <Badge key={tech} variant="outline" size="sm" className={styles.badge}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>

        {/* The Detailed Modal */}
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          {selectedItem && (
            <div className={styles.body}>
              <div className={styles.header}>
                <Heading level={2} noMargin className={styles.role}>{selectedItem.role}</Heading>
                <Text variant="secondary" className={styles.meta}>
                  <strong>{selectedItem.company}</strong> &bull; {selectedItem.date} &bull; {selectedItem.location}
                </Text>
              </div>

              <div className={styles.desc}>
                {Array.isArray(selectedItem.detailedDescription) ? (
                  <List variant="shape">
                    {selectedItem.detailedDescription.map((desc, idx) => (
                      <ListItem key={idx}>
                        <Text inline>{desc}</Text>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>{selectedItem.detailedDescription}</Text>
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
