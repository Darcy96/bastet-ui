import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from 'storybook/preview-api';
import { HorizontalExperience, type ExperienceItem } from './HorizontalExperience';
import { BstThemeProvider, useBstTheme } from '../../theme';
import type { ThemeName } from '../../theme/tokens';

// Inner wrapper to map tokens to CSS variables
const InnerWrapper = ({ children, theme }: { children: React.ReactNode, theme?: ThemeName }) => {
  const { themeName, token } = useBstTheme();
  return (
    <div
      className="bst-theme-root"
      data-theme={theme || themeName}
      style={{
        padding: '0',
        backgroundColor: token.colorBgBase || token.colorBgLayout,
        color: token.colorText,
        minHeight: '100vh',
        fontFamily: token.fontFamily,
        // Map Ant Design tokens to our custom CSS variables
        '--bst-primary': token.colorPrimary,
        '--bst-bg-container': token.colorBgContainer,
        '--bst-bg-elevated': token.colorBgElevated,
        '--bst-text': token.colorText,
        '--bst-text-secondary': token.colorTextSecondary,
        '--bst-border': token.colorBorder,
        '--bst-radius': `${token.borderRadius}px`,
        '--bst-font-family': token.fontFamily,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const meta: Meta<typeof HorizontalExperience> = {
  title: 'Components/HorizontalExperience',
  component: HorizontalExperience,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HorizontalExperience>;

const mockItems: ExperienceItem[] = [
  {
    id: 1,
    date: 'Ene 2024 - Presente',
    role: 'Senior Frontend Engineer',
    company: 'Tech Corp Inc.',
    location: 'Remoto, USA',
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    detailedDescription: [
      'Lideré el equipo de frontend en la migración de la arquitectura principal hacia Next.js App Router.',
      'Reduje el tiempo de carga (LCP) en un 40% migrando componentes críticos a Server Components.',
      'Arquitecté e implementé un sistema de diseño interno (UI Kit) que ahora es consumido por 5 equipos de desarrollo independientes.',
      'Establecí nuevos estándares de testing para la compañía, logrando un 85% de cobertura de código utilizando Vitest y React Testing Library.'
    ],
  },
  {
    id: 2,
    date: 'Mar 2021 - Dic 2023',
    role: 'Frontend Developer',
    company: 'Startup Hub',
    location: 'Híbrido, CDMX',
    stack: ['Vue.js', 'Nuxt', 'GraphQL', 'Jest'],
    detailedDescription: [
      'Fui responsable del desarrollo de nuevas features clave para la plataforma SaaS principal, la cual es utilizada por miles de usuarios diarios.',
      'Implementé desde cero el editor drag-and-drop de dashboards personalizados, lo cual incrementó la retención de usuarios premium en un 20%.',
      'Migré exitosamente el estado global de toda la aplicación de Vuex a Pinia, eliminando cuellos de botella de rendimiento y mejorando la experiencia de desarrollo (DX) del equipo.',
    ],
  },
  {
    id: 3,
    date: 'Jun 2019 - Feb 2021',
    role: 'Web Developer',
    company: 'Creative Agency',
    location: 'Presencial, Barcelona',
    stack: ['JavaScript', 'Sass', 'Shopify', 'WordPress'],
    detailedDescription: [
      'Trabajé en la creación de sitios web interactivos de alto impacto visual y plataformas de e-commerce para clientes internacionales.',
      'Desarrollé más de 15 sitios e-commerce altamente personalizados desde cero.',
      'Optimicé y construí animaciones complejas utilizando GSAP y WebGL, asegurando mantener 60fps en dispositivos móviles de gama media.',
    ],
  },
  {
    id: 4,
    date: 'Ene 2018 - May 2019',
    role: 'Junior UI Developer',
    company: 'Digital Solutions',
    location: 'Remoto',
    stack: ['HTML', 'CSS', 'jQuery'],
    detailedDescription: 'Inicié mi carrera profesional maquetando interfaces píxel-perfect a partir de diseños en Sketch y Figma. Colaboré de cerca con el equipo de diseño para asegurar la viabilidad técnica de las interfaces propuestas.',
  }
];

export const Default: Story = {
  args: {
    items: mockItems,
  },
  render: (args) => {
    const [globals] = useGlobals();
    const activeTheme = (globals['bstTheme'] || 'light') as ThemeName;

    return (
      <BstThemeProvider theme={activeTheme}>
        <InnerWrapper theme={activeTheme}>
          {/* We add a container to constrain the width nicely for Storybook but allow horizontal scroll */}
          <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <HorizontalExperience {...args} />
          </div>
        </InnerWrapper>
      </BstThemeProvider>
    );
  },
};
