import type { Meta, StoryObj } from '@storybook/react-vite';

const IntroductionContent = () => (
  <div style={{ fontFamily: 'var(--bst-font-family)', color: 'var(--bst-text)', maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Bienvenido a Bastet UI 🐾</h1>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--bst-text-secondary)', marginBottom: '32px' }}>
      <strong>Bastet UI</strong> es una librería de componentes de React construida con diseño moderno, interfaces tipo <em>glassmorphism</em> y un potente sistema de temas alimentado por los design tokens de Ant Design.
    </p>

    <h2 style={{ fontSize: '1.8rem', marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      Características Principales ✨
    </h2>
    <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', paddingLeft: '24px' }}>
      <li><strong>💅 CSS Modules:</strong> Encapsulamiento total de estilos. Olvídate de los conflictos globales.</li>
      <li><strong>🎨 Multi-tema:</strong> Soporte nativo para 5 temas diferentes (Default, Black Metal, Hacker, Pink, Oriental).</li>
      <li><strong>⚙️ Tokens de Ant Design:</strong> Compatibilidad con la arquitectura de variables de Ant Design.</li>
      <li><strong>📱 Responsivo:</strong> Componentes construidos usando Flexbox/CSS Grid diseñados para adaptarse a cualquier pantalla.</li>
      <li><strong>⚡ Alto Rendimiento:</strong> Transiciones y animaciones aceleradas por hardware.</li>
    </ul>

    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '16px', borderBottom: '1px solid var(--bst-border)', paddingBottom: '8px' }}>
      ¿Qué hay adentro?
    </h2>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '16px' }}>
      Explora la barra lateral de Storybook para ver todos los componentes en acción. Puedes probar:
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
      <div style={{ padding: '16px', background: 'var(--bst-bg-elevated)', borderRadius: '8px', border: '1px solid var(--bst-border)' }}>
        <strong>Layouts y Navegación</strong>
        <p style={{ color: 'var(--bst-text-secondary)', marginTop: '8px' }}>Navbar, HeroCreativeLayout, Footer</p>
      </div>
      <div style={{ padding: '16px', background: 'var(--bst-bg-elevated)', borderRadius: '8px', border: '1px solid var(--bst-border)' }}>
        <strong>Interacción</strong>
        <p style={{ color: 'var(--bst-text-secondary)', marginTop: '8px' }}>Button, CopyPill, ThemeSwitcher</p>
      </div>
      <div style={{ padding: '16px', background: 'var(--bst-bg-elevated)', borderRadius: '8px', border: '1px solid var(--bst-border)' }}>
        <strong>Feedback</strong>
        <p style={{ color: 'var(--bst-text-secondary)', marginTop: '8px' }}>Toast, Modal, Tooltip</p>
      </div>
      <div style={{ padding: '16px', background: 'var(--bst-bg-elevated)', borderRadius: '8px', border: '1px solid var(--bst-border)' }}>
        <strong>Formularios</strong>
        <p style={{ color: 'var(--bst-text-secondary)', marginTop: '8px' }}>Input, Select, Textarea</p>
      </div>
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
