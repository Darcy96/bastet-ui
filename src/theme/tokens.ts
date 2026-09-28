import { theme, type ThemeConfig } from 'antd';

/**
 * Bastet UI — Design Tokens
 *
 * 5 theme presets defined with exact Ant Design seed tokens:
 * - Light (Inter)
 * - Dark (Inter)
 * - Oriental (Noto Serif)
 * - Black Metal (UnifrakturMaguntia - Bone White Dimmu Style)
 * - Barbie (Fredoka)
 */

// ─── Light ────────────────────────────────────────────────────
export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1677FF',
    colorSuccess: '#52C41A',
    colorWarning: '#FAAD14',
    colorError: '#F5222D',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#000000',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

// ─── Dark ─────────────────────────────────────────────────────
export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1668DC',
    colorSuccess: '#49AA19',
    colorWarning: '#D89614',
    colorError: '#D32029',
    colorBgBase: '#141414',
    colorTextBase: '#FFFFFF',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

// ─── Oriental ─────────────────────────────────────────────────
export const orientalTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#FA541C',
    colorSuccess: '#52C41A',
    colorWarning: '#FAAD14',
    colorError: '#A8071A', // Deeper crimson red to contrast with the orange primary
    colorBgBase: '#FFF5EB',
    colorTextBase: '#1A0F05',
    colorBorder: '#D4B896',
    borderRadius: 4,
    fontFamily: "'Noto Serif', Georgia, serif",
  },
};

// ─── Black Metal (Bone White Dimmu Style) ─────────────────────
export const blackMetalTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#F0EAD6',      // Bone white primary accent
    colorSuccess: '#49AA19',
    colorWarning: '#D89614',
    colorError: '#991A1A',
    colorBgBase: '#0A0A0A',        // Deep black
    colorTextBase: '#F0EAD6',      // Bone white text
    colorBorder: '#F0EAD6',        // Bone white border
    borderRadius: 0,              // Sharp 0px corners
    fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
    colorPrimaryHover: '#F0EAD6',
    colorPrimaryActive: '#D9D3C3',
  },
};

// ─── Pink ───────────────────────────────────────────────────
export const pinkTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#FF69B4',
    colorSuccess: '#38A169',
    colorWarning: '#FAAD14',
    colorError: '#F5222D', // Standard pure red to contrast with the pink primary
    colorBgBase: '#FFF5F8',
    colorTextBase: '#1A0510',
    colorBorder: '#FFC1D0',
    borderRadius: 16,
    fontFamily: "'Fredoka', 'Quicksand', sans-serif",
  },
};

// ─── Popayán Ciudad Blanca (Estilo Colonial Tradicional) ─────────────────────
export const whiteCityTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm, // Algoritmo claro para hacer honor a la "Ciudad Blanca"
  token: {
    colorPrimary: '#C25E3E',      // Teja Colonial (Terracota)
    colorSuccess: '#3B6B35',      // Verde Montaña
    colorWarning: '#ECA62A',      // Oro Catedral
    colorError: '#A22325',        // Rojo Colonial Intenso
    colorBgBase: '#FFFFFF',        // Blanco Óptico (Fachadas limpias)
    colorTextBase: '#1F2326',      // Hierro Forjado (Gris muy oscuro)
    colorBorder: '#E8E5E1',        // Piedra sutil
    borderRadius: 4,              // Bordes ligeramente suavizados (simula la imperfección de la arquitectura colonial)
    fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif", // Tipografía elegante y con serifa histórica
    colorPrimaryHover: '#D94941', // Lighter and more vibrant for hover
    colorPrimaryActive: '#A1322E', // Darker variant for active click
  },
  components: {
    Button: {
      colorTextLightSolid: '#FFFFFF', // Texto blanco puro dentro de botones sólidos
    },
    Card: {
      colorBgContainer: '#FFFFFF', // Blanco puro para los contenedores principales para contrastar con el fondo cal
    },
  },
};

// ─── Theme Registry ───────────────────────────────────────────

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  oriental: orientalTheme,
  'black-metal': blackMetalTheme,
  pink: pinkTheme,
  'white-city': whiteCityTheme,
} as const;

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as ThemeName[];
