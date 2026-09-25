import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Write your message here...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    error: 'Bio must be at least 20 characters',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Read-only field',
    disabled: true,
    rows: 3,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 360 }}>
      <Textarea label="Normal" placeholder="Type here..." rows={3} />
      <Textarea label="With Error" placeholder="Invalid content" error="This field is required" rows={3} />
      <Textarea label="Disabled" placeholder="Cannot edit" disabled rows={3} />
    </div>
  ),
};
