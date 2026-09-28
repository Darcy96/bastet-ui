import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem } from './List';
import { Text } from '../Typography';
import { Card, CardBody } from '../Card';

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['shape', 'icon', 'none'],
      description: 'The visual style of the list markers.',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShapeVariant: Story = {
  args: {
    variant: 'shape',
  },
  render: (args) => (
    <Card>
      <CardBody>
        <List {...args}>
          <ListItem>First item with a CSS geometric shape.</ListItem>
          <ListItem>Second item showing off the hover micro-interactions.</ListItem>
          <ListItem>Third item adapting perfectly to the active theme.</ListItem>
        </List>
      </CardBody>
    </Card>
  ),
};

export const IconVariant: Story = {
  args: {
    variant: 'icon',
  },
  render: (args) => (
    <Card>
      <CardBody>
        <List {...args}>
          <ListItem>First item using theme-specific emojis.</ListItem>
          <ListItem>Second item adding a touch of personality.</ListItem>
          <ListItem>Third item adapting its icon based on the active theme.</ListItem>
        </List>
      </CardBody>
    </Card>
  ),
};

export const CustomIcons: Story = {
  args: {
    variant: 'none',
  },
  render: (args) => (
    <Card>
      <CardBody>
        <Text variant="secondary" style={{ marginBottom: '16px' }}>
          You can also pass a custom icon to specific ListItems:
        </Text>
        <List {...args}>
          <ListItem customIcon="✅">Task successfully completed.</ListItem>
          <ListItem customIcon="❌">Task failed successfully.</ListItem>
          <ListItem customIcon="⏳">Waiting for user input...</ListItem>
        </List>
      </CardBody>
    </Card>
  ),
};
