import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'El texto que se mostrará en el Tooltip.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: '¡Hola! Soy un tooltip elegante',
    children: <Button variant="secondary">Pasa el cursor por aquí</Button>,
  },
};
