import React from 'react';
import './FormField.css';

// ─── Types ────────────────────────────────────────────────────

export interface SelectOption {
  /** The value submitted by the form */
  value: string;
  /** The label displayed to the user */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Label displayed above the select */
  label?: string;
  /** Error message — triggers error styling and renders below the field */
  error?: string;
  /** The list of options to render */
  options: SelectOption[];
  /** Placeholder text shown as the first disabled option */
  placeholder?: string;
}

// ─── Component ────────────────────────────────────────────────

/**
 * Select
 *
 * A themed dropdown select that extends native `<select>` attributes.
 * Built with `React.forwardRef` for seamless react-hook-form integration.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Choose a country"
 *   options={[
 *     { value: 'mx', label: 'Mexico' },
 *     { value: 'us', label: 'United States' },
 *   ]}
 * />
 * ```
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...rest }, ref) => {
    const fieldId = id || (label ? `bst-select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const controlClasses = [
      'bst-field__control',
      'bst-field__control--select',
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
        <select
          ref={ref}
          id={fieldId}
          className={controlClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          defaultValue=""
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="bst-field__error" id={`${fieldId}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
