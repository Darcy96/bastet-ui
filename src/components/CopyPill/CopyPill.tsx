import { useCallback, useState } from 'react';
import { Tooltip } from '../Tooltip';
import styles from './CopyPill.module.css';

export interface CopyPillProps {
  /** El texto que se va a copiar y mostrar (o copiar silenciosamente si hay label) */
  value: string;
  /** Un texto alternativo para mostrar en lugar del valor */
  label?: string;
  /** Callback opcional cuando se copia exitosamente */
  onCopy?: (value: string) => void;
  /** Clase CSS adicional */
  className?: string;
}

export function CopyPill({ value, label, onCopy, className = '' }: CopyPillProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (onCopy) onCopy(value);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  }, [value, onCopy]);

  return (
    <Tooltip content={label ? `Copiar: ${value}` : 'Copiar al portapapeles'}>
      <button
        className={`${styles.copyPill} ${copied ? styles.copied : ''} ${className}`}
        onClick={handleCopy}
        type="button"
      >
        <span className={styles.text}>
          {label || value}
        </span>
        <span className={styles.icon}>
        {copied ? (
          // Check icon (✓)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          // Clipboard icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  </Tooltip>
);
}

CopyPill.displayName = 'CopyPill';
