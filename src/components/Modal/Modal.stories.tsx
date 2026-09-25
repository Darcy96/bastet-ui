import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useGlobals } from 'storybook/preview-api';
import { Modal } from './Modal';
import { BstThemeProvider, useBstTheme } from '../../theme';
import type { ThemeName } from '../../theme/tokens';

// Inner wrapper to map tokens to CSS variables
const InnerWrapper = ({ children, theme }: { children: React.ReactNode, theme?: ThemeName }) => {
  const { themeName, token } = useBstTheme();
  return (
    <div
      className="bst-theme-root"
      data-theme={theme || themeName}
      style={{
        padding: '40px',
        backgroundColor: token.colorBgBase || token.colorBgLayout,
        color: token.colorText,
        minHeight: '100vh',
        fontFamily: token.fontFamily,
        // Map Ant Design tokens to our custom CSS variables
        '--bst-primary': token.colorPrimary,
        '--bst-bg-container': token.colorBgContainer,
        '--bst-bg-elevated': token.colorBgElevated,
        '--bst-text': token.colorText,
        '--bst-text-secondary': token.colorTextSecondary,
        '--bst-border': token.colorBorder,
        '--bst-radius': `${token.borderRadius}px`,
        '--bst-font-family': token.fontFamily,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: 'var(--bst-primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--bst-radius)',
          cursor: 'pointer',
          fontFamily: 'var(--bst-font-family)',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 style={{ color: 'var(--bst-primary)', marginTop: 0 }}>¡Hola desde el Modal!</h2>
        <p style={{ lineHeight: 1.6 }}>
          Este modal respeta completamente las variables CSS del tema seleccionado.
          El fondo, la fuente, los bordes y el estilo del botón de cerrar cambian
          automáticamente cuando seleccionas un tema diferente en la barra superior.
        </p>
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bst-bg-elevated)', border: `1px solid var(--bst-border)`, borderRadius: 'var(--bst-radius)' }}>
          <p style={{ margin: 0, color: 'var(--bst-text-secondary)', fontSize: '0.9rem' }}>
            Puedes cerrarme presionando ESC, haciendo clic en la X, o haciendo clic en el overlay borroso oscuro.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => {
    const [globals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;

    return (
      <BstThemeProvider theme={activeTheme}>
        <InnerWrapper theme={activeTheme}>
          <ModalDemo />
        </InnerWrapper>
      </BstThemeProvider>
    );
  },
};
