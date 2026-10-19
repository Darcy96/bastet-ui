import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from '../components/Typography';
import { Card, CardBody } from '../components/Card';
import { List, ListItem } from '../components/List';

const IntroductionContent = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <Heading level={1} highlight style={{ marginBottom: '16px' }}>Welcome to Bastet UI 🐾</Heading>
    <Text size="lg" variant="secondary" style={{ marginBottom: '32px' }}>
      Bastet UI is a modern, accessible React component library built with clean architectural principles, fluid interfaces, Radix UI Primitives, and a zero-dependency Native Token Engine.
    </Text>

    <Heading level={2} accent style={{ marginTop: '32px' }}>
      Core Architectural Pillars
    </Heading>
    <List variant="shape">
      <ListItem><strong>Headless & Accessible:</strong> Built on Radix UI Primitives ensuring 100% WAI-ARIA compliance, full keyboard navigation, and automatic focus management.</ListItem>
      <ListItem><strong>Zero-Dependency Design Tokens:</strong> Native TypeScript token engine without runtime CSS-in-JS overhead. Full support for 6 themes: Light, Dark, Oriental, Black Metal, Pink, and Popayán Ciudad Blanca.</ListItem>
      <ListItem><strong>CSS Modules Encapsulation:</strong> Clean, performant styling with scoped CSS custom properties (<code>--bst-*</code>).</ListItem>
      <ListItem><strong>Ultra Lightweight:</strong> Entire bundle under 60 kB gzipped with atomic tree-shaking support.</ListItem>
      <ListItem><strong>Composition via Slot (asChild):</strong> Effortless component composition with Next.js <code>&lt;Link&gt;</code> or any custom HTML element.</ListItem>
    </List>

    <Heading level={2} accent style={{ marginTop: '40px' }}>
      Component Catalog
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      Explore the Storybook sidebar to test every component with interactive controls and theme switching.
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
          <Heading level={4} noMargin>Primitives & Triggers</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Button (Slot asChild), Dropdown (Radix Menu), CopyPill, ThemeSwitcher, LanguageSwitcher</Text>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Overlays & Feedback</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Modal (Radix Dialog), Tooltip (Radix Tooltip), Toast, Badge, Typography</Text>
        </CardBody>
      </Card>
      <Card hoverable>
        <CardBody>
          <Heading level={4} noMargin>Forms & Controls</Heading>
          <Text variant="secondary" size="sm" noMargin style={{ marginTop: '8px' }}>Select (Radix Select with keyboard nav), Input, Textarea</Text>
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
