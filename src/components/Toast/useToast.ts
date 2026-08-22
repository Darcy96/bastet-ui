import { useContext } from 'react';
import { ToastContext } from './ToastContext';
import type { ToastOptions } from './ToastContext';

/**
 * useToast
 *
 * Hook to trigger toast notifications from anywhere inside a ToastProvider.
 *
 * @example
 * ```tsx
 * const toast = useToast();
 * toast.success('Changes saved!');
 * toast.error('Something went wrong', { title: 'Error' });
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      '[bastet-ui] useToast must be used within a <ToastProvider>. ' +
      'Wrap your app with <ToastProvider> inside <BstThemeProvider>.',
    );
  }

  const { addToast } = context;

  return {
    success: (message: string, options?: ToastOptions) =>
      addToast('success', message, options),
    error: (message: string, options?: ToastOptions) =>
      addToast('error', message, options),
    info: (message: string, options?: ToastOptions) =>
      addToast('info', message, options),
    warning: (message: string, options?: ToastOptions) =>
      addToast('warning', message, options),
  };
}
