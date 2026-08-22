import { useEffect, useState } from 'react';
import type { ToastItem, ToastPosition } from './ToastContext';
import './Toast.css';

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
      ? 'bst-toast--entering'
      : state === 'exiting'
        ? 'bst-toast--exiting'
        : '';

  return (
    <div
      className={`bst-toast bst-toast--${toast.type} ${animClass}`}
      onClick={handleClick}
      role="alert"
      aria-live="polite"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <span className="bst-toast__icon" aria-hidden="true">
        {ICONS[toast.type]}
      </span>

      <div className="bst-toast__content">
        {toast.title && <div className="bst-toast__title">{toast.title}</div>}
        <div className="bst-toast__message">{toast.message}</div>
      </div>

      <button
        className="bst-toast__close"
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
        className="bst-toast__progress"
        style={{
          animation: `bst-toast-progress ${toast.duration ?? 4000}ms linear forwards`,
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
    <div className={`bst-toast-container bst-toast-container--${position}`}>
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

ToastContainer.displayName = 'ToastContainer';
