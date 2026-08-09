import { useGlobals } from 'storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { HeroCreativeLayout } from './HeroCreativeLayout';
import { Navbar } from '../Navbar';
import { Button } from '../Button';
import type { ThemeName } from '../../theme/tokens';

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

const TextBlock = () => (
  <>
    <h1>
      Construye tu <span className="bst-highlight">Visión</span>
    </h1>
    <p>
      Bienvenido a un lienzo en blanco. Este layout flexible permite 
      diseñar interfaces fluidas donde el fondo, la navegación y las 
      tarjetas orgánicas conviven armónicamente consumiendo las variables CSS globales.
    </p>
    <div className="bst-hero-creative__actions">
      <Button variant="primary" size="lg">Empezar ahora</Button>
      <Button variant="secondary" size="lg">Ver portafolio</Button>
    </div>
  </>
);

const VisualBlockSandbox = () => (
  <div style={{ position: 'relative', width: '100%', height: '400px' }}>
    {/* Background organic shape */}
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
    
    {/* Floating Card 1 */}
    <div 
      className="bst-floating-card"
      style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '240px',
        zIndex: 2,
      }}
    >
      <h3 style={{ marginTop: 0, color: 'var(--bst-primary)' }}>Integración Perfecta</h3>
      <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: 0 }}>
        Esta tarjeta lee --bst-bg y --bst-border directamente desde el contenedor.
      </p>
    </div>

    {/* Floating Card 2 */}
    <div 
      className="bst-floating-card"
      style={{
        position: 'absolute',
        bottom: '15%',
        right: '5%',
        width: '260px',
        zIndex: 3,
        borderRadius: 'calc(var(--bst-radius) * 2)', // Exaggerated organic radius
      }}
    >
      <h3 style={{ marginTop: 0 }}>Diseño Líquido</h3>
      <p style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: 0 }}>
        Experimenta cambiando de tema y observa cómo se adaptan las formas.
      </p>
    </div>
  </div>
);

// ─── Stories ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    textContentSlot: <TextBlock />,
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
      />
    );
  },
};
