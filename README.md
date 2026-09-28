# Bastet UI

A professional, thematic UI component library built with React 18, TypeScript, Vite, and Ant Design Design Tokens.

---

## Installation

You can install the library via npm or bun:

```bash
npm install @darcysm/bastet-ui
# or using bun
bun add @darcysm/bastet-ui
```

## Documentation & Components

Explore the interactive component catalog and read the full documentation here:
👉 **[bastet-ui.vercel.app](https://bastet-ui.vercel.app)**

## Quick Start

Wrap your application with the `BstThemeProvider` to enable the global design system and component styling.

```tsx
import { BstThemeProvider } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css';

function App() {
  return (
    <BstThemeProvider theme="light">
      <YourApp />
    </BstThemeProvider>
  );
}
```

## Available Themes

Bastet UI provides multiple built-in themes that can be dynamically switched through the provider:

- `light`: Default clean light theme
- `dark`: Elegant dark theme
- `oriental`: Warm rice-paper backgrounds with terracotta accents
- `black-metal`: High contrast black backgrounds with ash red accents
- `pink`: Blush backgrounds with magenta details
- `white-city`: Premium light aesthetic

---

## Development & Build Scripts

If you are contributing to or developing the library locally:

### Install Dependencies
```bash
bun install
```

### Development Environment (Storybook)
Starts Storybook on `http://localhost:6006` with the interactive component catalog and dynamic theme selector.
```bash
bun run dev
```

### Build Library
Generates production bundles in ESM, CJS, TypeScript types (`.d.ts`), and compiled CSS in the `dist/` folder.
```bash
bun run build
```

### Validate TypeScript
Verifies that there are no TypeScript compilation errors in the project:
```bash
bun run lint
```
