import { useGlobals } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { ThemeName } from '../../theme/tokens';

// ─── Meta ─────────────────────────────────────────────────────

const meta = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size preset for the switcher buttons',
    },
    onThemeChange: {
      action: 'themeChanged',
      description: 'Callback fired when a theme is selected',
    },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────

/** Default interactive switcher — click to change the theme live */
export const Default: Story = {
  args: { onThemeChange: () => {} },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <ThemeSwitcher
        {...args}
        activeTheme={activeTheme}
        onThemeChange={(t) => updateGlobals({ bstTheme: t })}
      />
    );
  },
};

/** Small size variant */
export const Small: Story = {
  args: { onThemeChange: () => {}, size: 'sm' },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <ThemeSwitcher
        {...args}
        activeTheme={activeTheme}
        onThemeChange={(t) => updateGlobals({ bstTheme: t })}
        size="sm"
      />
    );
  },
};

/** Medium size variant (default) */
export const Medium: Story = {
  args: { onThemeChange: () => {}, size: 'md' },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <ThemeSwitcher
        {...args}
        activeTheme={activeTheme}
        onThemeChange={(t) => updateGlobals({ bstTheme: t })}
        size="md"
      />
    );
  },
};

/** Both sizes side by side for comparison */
export const SizeComparison: Story = {
  args: { onThemeChange: () => {} },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    const handleChange = (t: ThemeName) => updateGlobals({ bstTheme: t });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', padding: 24 }}>
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1 }}>Small</p>
          <ThemeSwitcher {...args} activeTheme={activeTheme} onThemeChange={handleChange} size="sm" />
        </div>
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1 }}>Medium</p>
          <ThemeSwitcher {...args} activeTheme={activeTheme} onThemeChange={handleChange} size="md" />
        </div>
      </div>
    );
  },
};

/** Dropdown variant (compact, great for mobile or navbars) */
export const DropdownVariant: Story = {
  args: { onThemeChange: () => {}, variant: 'dropdown' },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <ThemeSwitcher
        {...args}
        activeTheme={activeTheme}
        onThemeChange={(t) => updateGlobals({ bstTheme: t })}
      />
    );
  },
};
