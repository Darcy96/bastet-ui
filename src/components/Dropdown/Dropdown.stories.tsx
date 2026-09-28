import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import { Button } from '../Button';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="primary">Options</Button>
      </Dropdown.Trigger>
      <Dropdown.Content align="center">
        <div style={{ padding: '8px', minWidth: '150px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Option 1</p>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Option 2</p>
          <p style={{ margin: 0, fontSize: '14px' }}>Option 3</p>
        </div>
      </Dropdown.Content>
    </Dropdown>
  ),
};
