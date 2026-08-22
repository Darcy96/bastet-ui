import type { Meta, StoryObj } from '@storybook/react';
import { CopyPill } from './CopyPill';

const meta: Meta<typeof CopyPill> = {
  title: 'Components/CopyPill',
  component: CopyPill,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'El texto que se copiará al portapapeles.',
    },
    label: {
      control: 'text',
      description: 'Texto opcional para mostrar en lugar del valor.',
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales.',
    },
    onCopy: { action: 'copied' },
  },
};

export default meta;
type Story = StoryObj<typeof CopyPill>;

export const Default: Story = {
  args: {
    value: 'hello@bastetui.com',
  },
};

export const WithLabel: Story = {
  args: {
    value: 'token_abc123xyz_secreto_789',
    label: 'Copiar Token de API',
  },
};

export const LongText: Story = {
  args: {
    value: 'Este es un texto muy largo que seguramente será truncado por el estilo text-overflow de la píldora para que no rompa el diseño del contenedor.',
  },
};
