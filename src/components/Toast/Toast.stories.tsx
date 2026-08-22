import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './index';
import { Button } from '../Button';

// ═══════════════════════════════════════════════════════════════
// Toast Stories
// ═══════════════════════════════════════════════════════════════

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story, context) => (
      <ToastProvider position={context.args.position || 'top-right'}>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      description: 'Position of the toast container',
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Demo Component ───────────────────────────────────────────

function ToastDemo() {
  const toast = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button
        variant="primary"
        onClick={() => toast.success('Changes saved successfully!')}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast.error('Something went wrong. Please try again.', {
            title: 'Error',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.info('Your session will expire in 5 minutes.', {
            title: 'Heads up',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.warning('This action cannot be undone.', {
            title: 'Warning',
          })
        }
      >
        Warning
      </Button>
    </div>
  );
}

// ─── Stories ───────────────────────────────────────────────────

export const Default: Story = {
  render: () => <ToastDemo />,
};

function CustomDurationDemo() {
  const toast = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button
        variant="primary"
        onClick={() =>
          toast.success('This disappears in 2 seconds', { duration: 2000 })
        }
      >
        2s Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.info('This one stays for 8 seconds', { duration: 8000 })
        }
      >
        8s Toast
      </Button>
    </div>
  );
}

export const CustomDuration: Story = {
  render: () => <CustomDurationDemo />,
};

function StressTestDemo() {
  const toast = useToast();
  let count = 0;

  const spamToasts = () => {
    const types = ['success', 'error', 'info', 'warning'] as const;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        count++;
        toast[types[i % 4]](`Toast notification #${count}`);
      }, i * 100);
    }
  };

  return (
    <Button variant="danger" onClick={spamToasts}>
      Spam 8 Toasts (max 5 visible)
    </Button>
  );
}

export const StressTest: Story = {
  render: () => <StressTestDemo />,
};
