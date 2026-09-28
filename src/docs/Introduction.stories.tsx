import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from '../components/Typography';
import { Card, CardBody } from '../components/Card';
import { List, ListItem } from '../components/List';

const IntroductionContent = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <Heading level={1} highlight style={{ marginBottom: '16px' }}>Welcome to Bastet UI</Heading>
    <Text size="lg" variant="secondary" style={{ marginBottom: '32px' }}>
      Bastet UI is a React component library built with modern design principles, fluid interfaces, and a powerful theme system powered by Ant Design tokens.
    </Text>

    <Heading level={2} accent style={{ marginTop: '32px' }}>
      Core Features
    </Heading>
    <List variant="shape">
      <ListItem><strong>CSS Modules:</strong> Total style encapsulation. Eliminates global styling conflicts.</ListItem>
      <ListItem><strong>Multi-theme Architecture:</strong> Native support for multiple themes (Light, Dark, Black Metal, White City, Pink, Oriental).</ListItem>
      <ListItem><strong>Ant Design Tokens:</strong> Seamless compatibility with the Ant Design variable architecture.</ListItem>
      <ListItem><strong>Responsive Design:</strong> Built using Flexbox and CSS Grid to adapt to any screen size.</ListItem>
      <ListItem><strong>High Performance:</strong> Hardware-accelerated transitions and animations.</ListItem>
    </List>

    <Heading level={2} accent style={{ marginTop: '40px' }}>
      Available Components
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Explore the Storybook sidebar to see all components in action.
    </Text>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Layouts & Navigation</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Navbar, HeroCreativeLayout, Footer, Card</Text>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Interaction</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Button, CopyPill, ThemeSwitcher</Text>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Feedback & Display</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Toast, Modal, Tooltip, Badge, Typography</Text>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Forms</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Input, Select, Textarea</Text>
        </CardBody>
      </Card>
    </div>
  </div>
);

const meta = {
  title: 'Docs/Introduction',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  render: () => <IntroductionContent />,
};
