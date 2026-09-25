import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Text } from '../components/Typography';
import { Card, CardBody } from '../components/Card';

const IntroductionContent = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <Heading level={1} style={{ marginBottom: '16px' }}>Welcome to Bastet UI / Bienvenido a Bastet UI</Heading>
    <Text size="lg" variant="secondary" style={{ marginBottom: '32px' }}>
      <strong>EN:</strong> Bastet UI is a React component library built with modern design principles, fluid interfaces, and a powerful theme system powered by Ant Design tokens.
      <br /><br />
      <strong>ES:</strong> Bastet UI es una librería de componentes de React construida con principios de diseño moderno, interfaces fluidas y un potente sistema de temas alimentado por los design tokens de Ant Design.
    </Text>

    <Heading level={2} style={{ marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      Core Features / Características Principales
    </Heading>
    <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', paddingLeft: '24px' }}>
      <li><strong>CSS Modules:</strong> Total style encapsulation. Eliminates global styling conflicts. / Encapsulamiento total de estilos. Evita conflictos globales.</li>
      <li><strong>Multi-theme Architecture:</strong> Native support for multiple themes (Default, Black Metal, White City, Pink, Oriental). / Soporte nativo para múltiples temas.</li>
      <li><strong>Ant Design Tokens:</strong> Seamless compatibility with the Ant Design variable architecture. / Compatibilidad con la arquitectura de variables de Ant Design.</li>
      <li><strong>Responsive Design:</strong> Built using Flexbox and CSS Grid to adapt to any screen size. / Construido con Flexbox y CSS Grid para adaptarse a cualquier pantalla.</li>
      <li><strong>High Performance:</strong> Hardware-accelerated transitions and animations. / Transiciones y animaciones aceleradas por hardware.</li>
    </ul>

    <Heading level={2} style={{ marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      Available Components / Componentes Disponibles
    </Heading>
    <Text style={{ marginBottom: '16px' }}>
      <strong>EN:</strong> Explore the Storybook sidebar to see all components in action. <br />
      <strong>ES:</strong> Explora la barra lateral de Storybook para ver todos los componentes en acción.
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
