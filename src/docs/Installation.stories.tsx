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
    <Heading level={1} highlight style={{ marginBottom: '16px' }}>Installation & Quick Start</Heading>
    <Text style={{ marginBottom: '32px' }}>
      Bastet UI is distributed via npm and can also be consumed as a workspace package. It carries <strong>zero heavy peer dependencies</strong> (no Ant Design or Emotion required) and delivers native TypeScript types and compiled CSS out of the box.
    </Text>

    <Heading level={2} accent style={{ marginTop: '32px' }}>
      1. Install Package
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Install with your preferred package manager:
    </Text>
    <CodeBlock code={`bun add @darcysm/bastet-ui
# or with npm
npm install @darcysm/bastet-ui
# or with yarn
yarn add @darcysm/bastet-ui`} />

    <Heading level={2} accent style={{ marginTop: '40px' }}>
      2. Configure BstThemeProvider
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Wrap your application root with <code>BstThemeProvider</code> and import the compiled stylesheet. <br />
      <em>Note for Next.js App Router:</em> Place the provider inside a Client Component wrapper (e.g. <code>ThemeShell.tsx</code>).
    </Text>

    <Heading level={3} accent style={{ marginTop: '24px', fontSize: '1.25rem' }}>
      Dynamic Multi-Theme Usage
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Pass the theme name as a string (<code>light</code>, <code>dark</code>, <code>oriental</code>, <code>black-metal</code>, <code>pink</code>, or <code>white-city</code>):
    </Text>
    <CodeBlock code={`// src/components/ThemeShell.tsx
'use client';

import React from 'react';
import { BstThemeProvider } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css'; // Global tokens and component styles

export function ThemeShell({ children }) {
  return (
    <BstThemeProvider theme="oriental">
      {children}
    </BstThemeProvider>
  );
}`} />

    <Heading level={3} accent style={{ marginTop: '32px', fontSize: '1.25rem' }}>
      Single-Theme Tree Shaking
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      If your application only needs one theme, pass the theme object directly to enable bundler tree-shaking:
    </Text>
    <CodeBlock code={`'use client';

import React from 'react';
import { BstThemeProvider, whiteCityTheme } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css';

export function ThemeShell({ children }) {
  return (
    <BstThemeProvider theme={whiteCityTheme}>
      {children}
    </BstThemeProvider>
  );
}`} />

    <Heading level={2} accent style={{ marginTop: '40px' }}>
      3. Using Accessible Components
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Consume components anywhere with full TypeScript auto-completion and Radix UI composition (<code>asChild</code>):
    </Text>
    <CodeBlock code={`import { Button, Heading, Select } from '@darcysm/bastet-ui';
import Link from 'next/link';

export function MySection() {
  return (
    <section>
      <Heading level={2} highlight>
        Hello Bastet UI
      </Heading>
      
      {/* Composable button with Next.js Link */}
      <Button asChild variant="primary" size="lg">
        <Link href="/projects">Explore Projects</Link>
      </Button>

      {/* Fully accessible Radix Select */}
      <Select
        label="Country"
        options={[
          { value: 'co', label: 'Colombia' },
          { value: 'mx', label: 'Mexico' },
        ]}
      />
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
