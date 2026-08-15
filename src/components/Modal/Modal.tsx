import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBstTheme } from '../../theme';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  const [mounted, setMounted] = useState(false);
  const { themeName, token } = useBstTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalClasses = [
    'bst-modal-overlay',
    isOpen ? 'bst-modal-overlay--open' : '',
    className
  ].filter(Boolean).join(' ');

  const portalStyle = {
    '--bst-primary': token.colorPrimary,
    '--bst-bg-container': token.colorBgContainer,
    '--bst-bg-elevated': token.colorBgElevated,
    '--bst-text': token.colorText,
    '--bst-text-secondary': token.colorTextSecondary,
    '--bst-border': token.colorBorder,
    '--bst-radius': `${token.borderRadius}px`,
    '--bst-font-family': token.fontFamily,
  } as React.CSSProperties;

  return createPortal(
    <div className="bst-theme-root" data-theme={themeName} style={portalStyle}>
      <div className={modalClasses} onClick={handleOverlayClick} aria-modal="true" role="dialog">
        <div className="bst-modal-content">
          <button className="bst-modal-close-btn" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = 'Modal';
