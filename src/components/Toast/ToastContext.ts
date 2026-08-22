import { createContext } from 'react';

// ─── Types ────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  /** Duration in ms before auto-dismiss. Default: 4000 */
  duration?: number;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (type: ToastType, message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────

export const ToastContext = createContext<ToastContextValue | null>(null);
