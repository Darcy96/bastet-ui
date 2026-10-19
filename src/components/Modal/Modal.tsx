import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { useBstTheme } from '../../theme';
import { buildBstCssVars } from '../../utils/buildBstCssVars';
import styles from './Modal.module.css';

export interface ModalProps {
  /** Controls whether the modal is visible */
  isOpen: boolean;
  /** Callback fired when the modal requests to close (backdrop click, escape, close button) */
  onClose: () => void;
  /** Modal contents */
  children: React.ReactNode;
  /** Optional accessible title for screen readers */
  title?: string;
  /** Additional class name for modal content */
  className?: string;
}

const ModalBase: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  const { themeName, token } = useBstTheme();
  const portalStyle = buildBstCssVars(token) as React.CSSProperties;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} data-theme={themeName} style={portalStyle}>
          <Dialog.Content
            className={`${styles.content} ${className || ''}`}
            data-theme={themeName}
            style={portalStyle}
          >
            {title ? (
              <Dialog.Title style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 600 }}>
                {title}
              </Dialog.Title>
            ) : (
              <Dialog.Title style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
                Dialog
              </Dialog.Title>
            )}

            <Dialog.Close asChild>
              <button
                className={styles.closeBtn}
                aria-label="Close modal"
              >
                &times;
              </button>
            </Dialog.Close>

            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

ModalBase.displayName = 'Modal';

// ─── Export with Radix Primitives ─────────────────────────────

export const Modal = Object.assign(ModalBase, {
  Root: Dialog.Root,
  Trigger: Dialog.Trigger,
  Portal: Dialog.Portal,
  Overlay: Dialog.Overlay,
  Content: Dialog.Content,
  Title: Dialog.Title,
  Description: Dialog.Description,
  Close: Dialog.Close,
});
