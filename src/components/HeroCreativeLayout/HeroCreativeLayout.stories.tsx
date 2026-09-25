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
    Construye tu <span className="bst-highlight">Visión</span>
  </Heading>
);

const DescriptionBlock = () => (
  <Text size="lg">
    Bienvenido a un lienzo en blanco. Este layout flexible permite 
    diseñar interfaces fluidas donde el fondo, la navegación y las 
    tarjetas orgánicas conviven armónicamente consumiendo las variables CSS globales.
  </Text>
);

const ActionsBlock = () => (
  <div className="bst-hero-creative__actions">
    <Button variant="primary" size="lg">Empezar ahora</Button>
    <Button variant="secondary" size="lg">Ver portafolio</Button>
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
        <Heading level={3} highlight noMargin>Integración Perfecta</Heading>
        <Text size="sm" variant="secondary" noMargin>
          Esta tarjeta lee --bst-bg y --bst-border.
        </Text>
      </CardBody>
    </Card>

    <Card
      hoverable
      style={{ position: 'absolute', bottom: '15%', right: '5%', width: '260px', zIndex: 3, borderRadius: 'calc(var(--bst-radius) * 2)' }}
    >
      <CardBody>
        <Heading level={3} noMargin>Diseño Líquido</Heading>
        <Text size="sm" variant="secondary" noMargin>
          Observa cómo se adaptan las formas.
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
                <Heading level={3} highlight noMargin>Integración Perfecta</Heading>
                <Text size="sm" variant="secondary" noMargin>
                  Esta tarjeta lee --bst-bg y --bst-border.
                </Text>
              </CardBody>
            </Card>
          </div>,
          <div key="card2" style={{ width: '260px', margin: '0 auto' }}>
            <Card hoverable style={{ borderRadius: 'calc(var(--bst-radius) * 2)' }}>
              <CardBody>
                <Heading level={3} noMargin>Diseño Líquido</Heading>
                <Text size="sm" variant="secondary" noMargin>
                  Observa cómo se adaptan las formas.
                </Text>
              </CardBody>
            </Card>
          </div>
        ]}
      />
    );
  },
};
