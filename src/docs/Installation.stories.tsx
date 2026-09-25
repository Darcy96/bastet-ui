import type { Meta, StoryObj } from '@storybook/react-vite';

const CodeBlock = ({ code }: { code: string }) => (
  <pre style={{ 
    background: '#1e1e1e', 
    color: '#d4d4d4', 
    padding: '16px', 
    borderRadius: '8px', 
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.95rem',
    border: '1px solid #333'
  }}>
    <code>{code}</code>
  </pre>
);

const InstallationContent = () => (
  <div style={{ fontFamily: 'var(--bst-font-family)', color: 'var(--bst-text)', maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Instalación y Uso Rápido 🚀</h1>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px' }}>
      Bastet UI está pensada para ser consumida directamente como un paquete local o distribuida a través de npm. 
      Dado que la librería exporta el bundle en formato ES Modules y CommonJS, es muy sencillo integrarla a tu aplicación (por ejemplo, con Next.js o Vite).
    </p>

    <h2 style={{ fontSize: '1.8rem', marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      1. Agregar al proyecto
    </h2>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '16px' }}>
      Si la usas como paquete local en un monorepo (como tu configuración actual con <code>darcysm-portfolio</code>), puedes enlazarla desde tu <code>package.json</code>:
    </p>
    <CodeBlock code={`"dependencies": {
  "@darcysm/bastet-ui": "workspace:*" // o la ruta local como "file:../bastet-ui"
}`} />
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: '16px 0' }}>
      Luego, instala las dependencias:
    </p>
    <CodeBlock code={`bun install`} />

    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      2. Configurar el Provider
    </h2>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '16px' }}>
      Para que el ecosistema de temas y los Toasts de notificaciones funcionen correctamente, debes envolver la raíz de tu aplicación con el <code>BstProvider</code>. <br/><br/>
      <strong>Nota:</strong> Si usas Next.js App Router, este provider debe ir en un <em>Client Component</em> (ej. <code>ThemeShell.tsx</code>).
    </p>
    <CodeBlock code={`// src/components/ThemeShell.tsx
'use client';

import React from 'react';
import { BstProvider } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css'; // ¡Importante importar el CSS global!

export function ThemeShell({ children }) {
  return (
    <BstProvider defaultTheme="default">
      {children}
    </BstProvider>
  );
}`} />

    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      3. Utilizar Componentes
    </h2>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '16px' }}>
      ¡Listo! Ya puedes empezar a usar los componentes en cualquier lugar de tu aplicación.
    </p>
    <CodeBlock code={`import { Button, Heading } from '@darcysm/bastet-ui';

export function MiSeccion() {
  return (
    <section>
      <Heading level={2} highlight>
        Hola Bastet UI
      </Heading>
      <Button variant="primary" size="lg">
        ¡Hacer click!
      </Button>
    </section>
  );
}`} />
  </div>
);

const meta = {
  title: 'Docs/Installation',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Installation: Story = {
  render: () => <InstallationContent />,
};
