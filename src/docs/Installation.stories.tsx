import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from '../components/Typography';

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
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <Heading level={1} style={{ marginBottom: '16px' }}>Installation & Quick Start</Heading>
    <Text style={{ marginBottom: '32px' }}>
      Bastet UI is designed to be consumed directly as a local package or distributed via npm. Since the library exports the bundle in ES Modules and CommonJS formats, it is easily integrated into any modern React application (e.g., Next.js or Vite).
    </Text>

    <Heading level={2} style={{ marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      1. Add to Project
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      If using as a local workspace package, link it in your <code>package.json</code>:
    </Text>
    <CodeBlock code={`"dependencies": {
  "@darcysm/bastet-ui": "workspace:*"
}`} />
    <Text style={{ margin: '16px 0' }}>
      Then, install dependencies:
    </Text>
    <CodeBlock code={`bun install`} />

    <Heading level={2} style={{ marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      2. Configure Provider
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      To ensure the theme ecosystem and global components (like Toasts) work correctly, wrap the application root with the <code>BstThemeProvider</code>. <br />
      <em>Note for Next.js App Router:</em> The provider must be placed in a Client Component.
    </Text>
    <CodeBlock code={`// src/components/ThemeShell.tsx
'use client';

import React from 'react';
import { BstThemeProvider } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css'; // Required CSS import

export function ThemeShell({ children }) {
  return (
    <BstThemeProvider theme="oriental">
      {children}
    </BstThemeProvider>
  );
}`} />

    <Heading level={2} style={{ marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      3. Usage
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      You are now ready to consume components anywhere in your application.
    </Text>
    <CodeBlock code={`import { Button, Heading } from '@darcysm/bastet-ui';

export function MySection() {
  return (
    <section>
      <Heading level={2} highlight>
        Hello Bastet UI
      </Heading>
      <Button variant="primary" size="lg">
        Click Me
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
