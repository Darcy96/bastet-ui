import React from 'react';
import styles from './FormField.module.css';

// ─── Types ────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label displayed above the textarea */
  label?: string;
  /** Error message — triggers error styling and renders below the field */
  error?: string;
}

// ─── Component ────────────────────────────────────────────────

/**
 * Textarea
 *
 * A themed multiline text input that extends native `<textarea>` attributes.
 * Built with `React.forwardRef` for seamless react-hook-form integration.
 *
 * @example
 * ```tsx
 * <Textarea label="Message" placeholder="Write your message..." rows={5} />
 * <Textarea label="Bio" error="Bio is too long" />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const fieldId = id || (label ? `bst-textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const controlClasses = [
      styles.control,
      styles.controlTextarea,
      error && styles.controlError,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          className={controlClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p className={styles.error} id={`${fieldId}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
