import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

// ─── Sample Data ──────────────────────────────────────────────

const sampleSocials = [
  { platform: 'github' as const, url: 'https://github.com/darcysm' },
  { platform: 'linkedin' as const, url: 'https://linkedin.com/in/darcysm' },
  { platform: 'twitter' as const, url: 'https://x.com/darcysm' },
  { platform: 'email' as const, url: 'mailto:hello@darcysm.dev' },
];

// ─── Meta ─────────────────────────────────────────────────────

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    copyright: {
      control: 'text',
      description: 'Copyright text',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────

/** Default footer with social links and copyright */
export const Default: Story = {
  args: {
    socials: sampleSocials,
    copyright: '© 2026 Darcysm. All rights reserved.',
  },
};

/** Footer with social links only (no copyright) */
export const SocialsOnly: Story = {
  args: {
    socials: sampleSocials,
  },
};

/** Footer with copyright only (no social links) */
export const CopyrightOnly: Story = {
  args: {
    copyright: '© 2026 Darcysm. Built with Bastet UI.',
  },
};

/** Footer with custom children content */
export const WithChildren: Story = {
  args: {
    socials: [
      { platform: 'github', url: 'https://github.com/darcysm' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/darcysm' },
    ],
    copyright: '© 2026 Darcysm',
    children: 'Built with 🐱 Bastet UI and ☕ lots of coffee',
  },
};

/** Minimal footer */
export const Minimal: Story = {
  args: {
    copyright: '© 2026 Darcysm',
  },
};
