import type { Meta, StoryObj } from '@storybook/react-vite';
import { useGlobals } from 'storybook/preview-api';
import type { ThemeName } from '../../theme/tokens';
import { Button } from '../Button';
import { Card, CardBody } from '../Card';
import { Heading, Text } from '../Typography';
import { Navbar } from '../Navbar';
import { HeroCreativeLayout } from './HeroCreativeLayout';

// ─── Meta ─────────────────────────────────────────────────────

const meta = {
  title: 'Layout/HeroCreativeLayout',
  component: HeroCreativeLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### EN: HeroCreativeLayout
A modern, flexible hero section that seamlessly integrates the navigation bar and the main content. It provides a robust grid layout divided into text and visual content slots. It automatically maps design tokens to standard CSS variables, ensuring that any custom elements or floating components placed inside can easily consume the active theme variables.

### ES: HeroCreativeLayout
Una sección hero moderna y flexible que integra de forma fluida la barra de navegación y el contenido principal. Proporciona un diseño robusto de cuadrícula dividido en bloques de texto y contenido visual. Mapea automáticamente los tokens de diseño a variables CSS estándar, garantizando que los elementos personalizados consuman las variables del tema activo correctamente.

**Variables CSS / CSS Variables:**
- \`--bst-primary\`
- \`--bst-bg\`
- \`--bst-text\`
- \`--bst-border\`
- \`--bst-radius\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroCreativeLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Sample Components ────────────────────────────────────────

const SampleNavbar = ({ activeTheme, onThemeChange }: { activeTheme: ThemeName; onThemeChange: (t: ThemeName) => void }) => (
  <Navbar
    brand={<strong>Darcysm</strong>}
    links={[
      { label: 'Home', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'About', href: '#' },
    ]}
    activeTheme={activeTheme}
    onThemeChange={onThemeChange}
    themeSwitcherVariant="dropdown"
  />
);

const TitleBlock = () => (
  <Heading level={1}>
    Build your Vision <br />
    <span className="bst-highlight">Construye tu Visión</span>
  </Heading>
);

const DescriptionBlock = () => (
  <Text size="lg">
    <strong>EN:</strong> A robust and flexible layout architecture designed to seamlessly integrate dynamic backgrounds, navigation, and organic components.
    <br /><br />
    <strong>ES:</strong> Una arquitectura de diseño robusta y flexible, diseñada para integrar fluidamente fondos dinámicos, navegación y componentes orgánicos.
  </Text>
);

const ActionsBlock = () => (
  <div className="bst-hero-creative__actions">
    <Button variant="primary" size="lg">Get Started / Empezar</Button>
    <Button variant="secondary" size="lg">View Documentation / Ver Documentación</Button>
  </div>
);

const VisualBlockSandbox = () => (
  <div style={{ position: 'relative', width: '100%', height: '400px' }}>
    <div 
      style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'var(--bst-primary)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        opacity: 0.15,
        filter: 'blur(10px)',
      }}
    />
    
    <Card
      hoverable
      style={{ position: 'absolute', top: '20%', left: '10%', width: '240px', zIndex: 2 }}
    >
      <CardBody>
        <Heading level={3} highlight noMargin>Seamless Integration</Heading>
        <Text size="sm" variant="secondary" noMargin>
          EN: This card dynamically inherits --bst-bg and --bst-border.
          <br />
          ES: Esta tarjeta hereda dinámicamente --bst-bg y --bst-border.
        </Text>
      </CardBody>
    </Card>

    <Card
      hoverable
      style={{ position: 'absolute', bottom: '15%', right: '5%', width: '260px', zIndex: 3, borderRadius: 'calc(var(--bst-radius) * 2)' }}
    >
      <CardBody>
        <Heading level={3} noMargin>Liquid Design</Heading>
        <Text size="sm" variant="secondary" noMargin>
          EN: Observe how shapes adapt to theme changes.
          <br />
          ES: Observe cómo las formas se adaptan a los cambios de tema.
        </Text>
      </CardBody>
    </Card>
  </div>
);

// ─── Stories ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    titleSlot: <TitleBlock />,
    descriptionSlot: <DescriptionBlock />,
    actionsSlot: <ActionsBlock />,
  },
  render: (args) => {
    const [globals, updateGlobals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;
    
    return (
      <HeroCreativeLayout
        {...args}
        navbarSlot={
          <SampleNavbar 
            activeTheme={activeTheme} 
            onThemeChange={(t) => updateGlobals({ bstTheme: t })} 
          />
        }
        visualContentSlot={<VisualBlockSandbox />}
        mobileCarouselItems={[
          <div key="desc" style={{ padding: '0 24px', textAlign: 'center' }}>
            <DescriptionBlock />
          </div>,
          <div key="card1" style={{ width: '260px', margin: '0 auto' }}>
            <Card hoverable>
              <CardBody>
                <Heading level={3} highlight noMargin>Seamless Integration</Heading>
                <Text size="sm" variant="secondary" noMargin>
                  EN: This card dynamically inherits --bst-bg and --bst-border.
                  <br />
                  ES: Esta tarjeta hereda dinámicamente --bst-bg y --bst-border.
                </Text>
              </CardBody>
            </Card>
          </div>,
          <div key="card2" style={{ width: '260px', margin: '0 auto' }}>
            <Card hoverable style={{ borderRadius: 'calc(var(--bst-radius) * 2)' }}>
              <CardBody>
                <Heading level={3} noMargin>Liquid Design</Heading>
                <Text size="sm" variant="secondary" noMargin>
                  EN: Observe how shapes adapt to theme changes.
                  <br />
                  ES: Observe cómo las formas se adaptan a los cambios de tema.
                </Text>
              </CardBody>
            </Card>
          </div>
        ]}
      />
    );
  },
};
