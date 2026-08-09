import { useGlobals } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import type { NavbarLink } from './Navbar';
import type { ThemeName } from '../../theme/tokens';

// ─── Sample Data ──────────────────────────────────────────────

const sampleLinks: NavbarLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// ─── Meta ─────────────────────────────────────────────────────

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: 'text',
      description: 'Brand element — logo, text, or ReactNode',
    },
    sticky: {
      control: 'boolean',
      description: 'Stick to top of viewport',
    },
    onThemeChange: {
      action: 'themeChanged',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────

/** Default navbar with brand, links, and theme switcher */
export const Default: Story = {
  args: { brand: 'Darcysm', links: sampleLinks },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return <Navbar {...args} activeTheme={activeTheme} onThemeChange={(t) => updateGlobals({ bstTheme: t })} />;
  },
};

/** Navbar with custom brand element */
export const CustomBrand: Story = {
  args: { brand: 'Bastet UI' },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return (
      <Navbar
        {...args}
        brand={
          <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            🐱 <strong>Bastet UI</strong>
          </span>
        }
        links={sampleLinks}
        activeTheme={activeTheme}
        onThemeChange={(t) => updateGlobals({ bstTheme: t })}
      />
    );
  },
};

/** Navbar without links — brand and switcher only */
export const BrandOnly: Story = {
  args: { brand: 'Darcysm' },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    return <Navbar {...args} activeTheme={activeTheme} onThemeChange={(t) => updateGlobals({ bstTheme: t })} />;
  },
};

/** Sticky navbar with scrollable content */
export const Sticky: Story = {
  args: { brand: 'Darcysm', sticky: true },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;

    return (
      <div>
        <Navbar {...args} links={sampleLinks} activeTheme={activeTheme} onThemeChange={(t) => updateGlobals({ bstTheme: t })} />
        <div style={{ padding: 40 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i} style={{ marginBottom: 16, opacity: 0.7 }}>
              Scroll down to see the sticky navbar in action. Paragraph {i + 1}.
            </p>
          ))}
        </div>
      </div>
    );
  },
};
