import * as RadixSelect from '@radix-ui/react-select';
import React, { useId } from 'react';
import { useBstTheme } from '../../theme';
import { buildBstCssVars } from '../../utils/buildBstCssVars';
import styles from './FormField.module.css';

// ─── Icons ────────────────────────────────────────────────────

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────

export interface SelectOption {
  /** The value submitted by the form */
  value: string;
  /** The label displayed to the user */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface SelectProps {
  /** Label displayed above the select */
  label?: string;
  /** Error message — triggers error styling and renders below the field */
  error?: string;
  /** The list of options to render */
  options: SelectOption[];
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Callback fired when the selection changes */
  onChange?: (eventOrValue: any) => void;
  /** Radix idiomatic value change callback */
  onValueChange?: (value: string) => void;
  /** HTML field name attribute */
  name?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS class for the container */
  className?: string;
  /** Unique ID */
  id?: string;
}

// ─── High-Level Component ─────────────────────────────────────

const SelectBase = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder = 'Select an option...',
      value,
      defaultValue,
      onChange,
      onValueChange,
      name,
      disabled = false,
      className,
      id,
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id || (label ? `bst-select-${label.toLowerCase().replace(/\s+/g, '-')}` : generatedId);
    const { themeName, token } = useBstTheme();

    const handleValueChange = (newVal: string) => {
      if (onValueChange) {
        onValueChange(newVal);
      }
      if (onChange) {
        // Support both direct value callback and synthetic event for react-hook-form
        try {
          onChange({
            target: { name, value: newVal },
            type: 'change',
          });
        } catch {
          onChange(newVal);
        }
      }
    };

    const triggerClass = [
      styles.selectTrigger,
      error ? styles.selectTriggerError : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const portalStyle = buildBstCssVars(token) as React.CSSProperties;

    return (
      <div className={styles.field}>
        {label && (
          <label className={styles.label} htmlFor={fieldId}>
            {label}
          </label>
        )}

        <RadixSelect.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          name={name}
          disabled={disabled}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={fieldId}
            className={triggerClass}
            aria-invalid={!!error}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={styles.selectIcon}>
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={styles.selectContent}
              position="popper"
              sideOffset={4}
              collisionPadding={12}
              data-theme={themeName}
              style={portalStyle}
            >
              <RadixSelect.Viewport className={styles.selectViewport}>
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={styles.selectItem}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                      <CheckIcon />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {error && (
          <p className={styles.error} id={`${fieldId}-error`} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

SelectBase.displayName = 'Select';

// ─── Export with Radix Primitives ─────────────────────────────

export const Select = Object.assign(SelectBase, {
  Root: RadixSelect.Root,
  Trigger: RadixSelect.Trigger,
  Value: RadixSelect.Value,
  Portal: RadixSelect.Portal,
  Content: RadixSelect.Content,
  Viewport: RadixSelect.Viewport,
  Item: RadixSelect.Item,
  ItemText: RadixSelect.ItemText,
  ItemIndicator: RadixSelect.ItemIndicator,
});
