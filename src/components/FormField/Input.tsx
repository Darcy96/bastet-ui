import React from 'react';
import styles from './FormField.module.css';

// ─── Types ────────────────────────────────────────────────────

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label displayed above the input */
  label?: string;
  /** Error message — triggers error styling and renders below the field */
  error?: string;
}

// ─── Component ────────────────────────────────────────────────

/**
 * Input
 *
 * A themed text input that extends native `<input>` attributes.
 * Built with `React.forwardRef` for seamless react-hook-form integration.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" />
 * <Input label="Name" error="This field is required" />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const fieldId = id || (label ? `bst-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const controlClasses = [
      styles.control,
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
        <input
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

Input.displayName = 'Input';
