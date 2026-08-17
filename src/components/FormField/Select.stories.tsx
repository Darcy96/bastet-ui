import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const countryOptions = [
  { value: 'mx', label: '🇲🇽 México' },
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'co', label: '🇨🇴 Colombia' },
  { value: 'es', label: '🇪🇸 España' },
  { value: 'ar', label: '🇦🇷 Argentina' },
];

const roleOptions = [
  { value: 'frontend', label: 'Front-End Engineer' },
  { value: 'backend', label: 'Back-End Engineer' },
  { value: 'fullstack', label: 'Full-Stack Engineer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'designer', label: 'UI/UX Designer' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countryOptions,
  },
};

export const WithError: Story = {
  args: {
    label: 'Role',
    placeholder: 'Select your role',
    options: roleOptions,
    error: 'Please select a role',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Plan',
    placeholder: 'Select a plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
    ],
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Subscription',
    placeholder: 'Choose a plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise (Coming Soon)', disabled: true },
    ],
  },
};

export const AllStates: Story = {
  args: {
    label: 'All States',
    options: countryOptions,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <Select label="Normal" placeholder="Choose..." options={countryOptions} />
      <Select label="With Error" placeholder="Choose..." options={roleOptions} error="Selection is required" />
      <Select label="Disabled" placeholder="Choose..." options={countryOptions} disabled />
    </div>
  ),
};
