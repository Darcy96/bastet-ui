import React from 'react';
import type { Preview } from '@storybook/react';
import { BstThemeProvider } from '../src/theme';
import type { ThemeName } from '../src/theme';
import '../src/styles/globals.css';

// ─── Theme Toolbar ────────────────────────────────────────────

const THEME_OPTIONS: Record<ThemeName, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark',
  oriental: '🏯 Oriental',
  'black-metal': '🤘 Black Metal',
  pink: '💖 Pink',
  'white-city': '🏛️ Ciudad Blanca',
};

const preview: Preview = {
  globalTypes: {
    bstTheme: {
      name: 'Bastet Theme',
      description: 'Switch between Bastet UI themes',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: Object.entries(THEME_OPTIONS).map(([value, title]) => ({
          value,
          title,
        })),
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    bstTheme: 'light' as ThemeName,
  },

  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.bstTheme || 'light') as ThemeName;

      return (
        <BstThemeProvider theme={selectedTheme}>
          <div
            style={{
              padding: 24,
              minHeight: '100%',
            }}
          >
            <Story />
          </div>
        </BstThemeProvider>
      );
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
