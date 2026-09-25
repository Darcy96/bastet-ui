import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import type { ToastItem, ToastPosition } from './ToastContext';

// ─── Icons ────────────────────────────────────────────────────

const ICONS: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

// ─── Single Toast ─────────────────────────────────────────────

interface ToastItemProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
}

function ToastItemComponent({ toast, onRemove }: ToastItemProps) {
  const [state, setState] = useState<'entering' | 'idle' | 'exiting'>('entering');

  useEffect(() => {
    // After enter animation completes, set to idle
    const enterTimer = setTimeout(() => setState('idle'), 400);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    // Auto-dismiss timer
    const duration = toast.duration ?? 4000;
    const dismissTimer = setTimeout(() => {
      setState('exiting');
    }, duration);

    return () => clearTimeout(dismissTimer);
  }, [toast.duration]);

  useEffect(() => {
    // After exit animation completes, remove from state
    if (state === 'exiting') {
      const exitTimer = setTimeout(() => onRemove(toast.id), 280);
      return () => clearTimeout(exitTimer);
    }
  }, [state, toast.id, onRemove]);

  const handleClick = () => {
    setState('exiting');
  };

  const animClass =
    state === 'entering'
      ? styles.entering
      : state === 'exiting'
        ? styles.exiting
        : '';

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]} ${animClass}`}
      onClick={handleClick}
      role="alert"
      aria-live="polite"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <span className={styles.icon} aria-hidden="true">
        {ICONS[toast.type]}
      </span>

      <div className={styles.content}>
        {toast.title && <div className={styles.title}>{toast.title}</div>}
        <div className={styles.message}>{toast.message}</div>
      </div>

      <button
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          setState('exiting');
        }}
        aria-label="Dismiss notification"
      >
        ×
      </button>

      {/* Progress bar */}
      <div
        className={styles.progress}
        style={{
          animationDuration: `${toast.duration ?? 4000}ms`,
        }}
      />
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────

interface ToastContainerProps {
  toasts: ToastItem[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, position, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={`${styles.toastContainer} ${styles['toastContainer--' + position]}`}>
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

ToastContainer.displayName = 'ToastContainer';
