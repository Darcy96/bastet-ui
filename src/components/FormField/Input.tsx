import React from 'react';
import './FormField.css';

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
      'bst-field__control',
      error && 'bst-field__control--error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="bst-field">
        {label && (
          <label className="bst-field__label" htmlFor={fieldId}>
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
          <p className="bst-field__error" id={`${fieldId}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
