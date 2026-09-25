import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Text } from '../Typography';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 350 }}>
      <CardHeader>Project Title</CardHeader>
      <CardBody>
        <Text>
          This is a simple card component. It's great for displaying content in a structured and elegant way.
        </Text>
      </CardBody>
      <CardFooter style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hoverable style={{ width: 350 }}>
      <CardHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Bastet UI <Badge size="sm" color="success">v0.1.0</Badge>
      </CardHeader>
      <CardBody>
        <Text>
          Try hovering over this card! It will gently lift and display a dynamic shadow depending on your active theme.
        </Text>
      </CardBody>
    </Card>
  ),
};
