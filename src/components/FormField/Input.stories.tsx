import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// ═══════════════════════════════════════════════════════════════
// Input Stories
// ═══════════════════════════════════════════════════════════════

const inputMeta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default inputMeta;
type Story = StoryObj<typeof inputMeta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <Input label="Normal" placeholder="Type something..." />
      <Input label="With Error" placeholder="Invalid value" error="This field is required" />
      <Input label="Disabled" placeholder="Cannot edit" disabled />
      <Input label="Email" placeholder="you@email.com" type="email" />
      <Input label="Password" placeholder="••••••••" type="password" />
    </div>
  ),
};
