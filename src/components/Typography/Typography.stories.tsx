import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text } from './index';

const meta = {
  title: 'Components/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Heading level={1}>Heading 1: The Quick Brown Fox</Heading>
      <Heading level={2}>Heading 2: Jumps Over</Heading>
      <Heading level={3}>Heading 3: The Lazy Dog</Heading>
      <Heading level={4}>Heading 4: Pack my box</Heading>
      <Heading level={5}>Heading 5: With five dozen</Heading>
      <Heading level={6}>Heading 6: Liquor jugs</Heading>
      
      <div style={{ marginTop: '24px', padding: '16px', border: '1px solid var(--bst-border)' }}>
        <Heading level={2} highlight>Highlighted Thematic Heading</Heading>
        <Text>Change the theme in the toolbar to see how the highlight reacts.</Text>
      </div>
    </div>
  ),
};

export const Texts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text>Default text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      
      <Text variant="secondary">Secondary text. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
      
      <Text variant="primary">Primary text variant.</Text>
      
      <Text variant="success">Success text variant.</Text>
      
      <Text variant="warning">Warning text variant.</Text>
      
      <Text variant="error">Error text variant.</Text>

      <div style={{ marginTop: '16px' }}>
        <Text size="sm">Small size text.</Text>
        <Text size="md">Medium size text (default).</Text>
        <Text size="lg">Large size text.</Text>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Text weight="normal">Normal weight text.</Text>
        <Text weight="medium">Medium weight text.</Text>
        <Text weight="bold">Bold weight text.</Text>
      </div>
    </div>
  ),
};
