import { useCallback, useRef, useState } from 'react';
import { ToastContainer } from './ToastContainer';
import type { ToastContextValue, ToastItem, ToastOptions, ToastPosition, ToastType } from './ToastContext';
import { ToastContext } from './ToastContext';

// ─── Provider ─────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of the toast container. Default: 'top-right' */
  position?: ToastPosition;
  /** Max number of visible toasts. Default: 5 */
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, options?: ToastOptions) => {
      counterRef.current += 1;
      const id = `bst-toast-${counterRef.current}-${Date.now()}`;

      const newToast: ToastItem = {
        id,
        type,
        message,
        title: options?.title,
        duration: options?.duration ?? 4000,
      };

      setToasts((prev) => {
        const next = [...prev, newToast];
        // Trim oldest toasts if we exceed maxToasts
        if (next.length > maxToasts) {
          return next.slice(next.length - maxToasts);
        }
        return next;
      });
    },
    [maxToasts],
  );

  const contextValue: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} position={position} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = 'ToastProvider';
