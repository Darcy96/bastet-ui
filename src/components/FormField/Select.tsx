import React, { useState, useEffect } from 'react';
import { Select as AntSelect } from 'antd';
import styles from './FormField.module.css';

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
 * A themed dropdown select powered by Ant Design to support multi-theme popups.
 * Built with `React.forwardRef` and a hidden native select for seamless react-hook-form integration.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, value, defaultValue, onChange, ...rest }, ref) => {
    const fieldId = id || (label ? `bst-select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Internal state to sync AntSelect with the native select
    const [internalValue, setInternalValue] = useState<string | undefined>(
      (value as string) !== undefined ? (value as string) : ((defaultValue as string) !== undefined ? (defaultValue as string) : undefined)
    );

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);

    const handleAntChange = (val: string) => {
      if (value === undefined) {
        setInternalValue(val);
      }
      if (onChange) {
        // Simulate native event for react-hook-form register
        onChange({
          target: { name: rest.name, value: val },
          type: 'change'
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
          </label>
        )}
        
        {/* Hidden native select to maintain 100% compatibility with react-hook-form register() and refs */}
        <select
          ref={ref}
          name={rest.name}
          value={internalValue || ''}
          style={{ display: 'none' }}
          onChange={() => {}} // React warning prevention
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <AntSelect
          id={fieldId}
          value={internalValue || undefined}
          onChange={handleAntChange}
          onBlur={rest.onBlur as React.FocusEventHandler<HTMLElement> | undefined}
          options={options}
          placeholder={placeholder}
          status={error ? 'error' : undefined}
          disabled={rest.disabled}
          className={`${styles.customAntSelect} ${className || ''}`}
          style={{ width: '100%' }}
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

Select.displayName = 'Select';
