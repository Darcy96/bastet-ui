import { theme, type ThemeConfig } from 'antd';

/**
 * Bastet UI — Design Tokens
 *
 * 5 theme presets defined as Ant Design ThemeConfig objects.
 * Each theme specifies an algorithm (light/dark) and seed tokens
 * that cascade down to all component-level tokens automatically.
 */

// ─── Light (Default) ──────────────────────────────────────────
const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#6366F1',
    colorBgBase: '#FFFFFF',
    colorTextBase: '#1A1A1A',
    colorBorder: '#E5E5E5',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FAFAFA',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

// ─── Dark ─────────────────────────────────────────────────────
const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#818CF8',
    colorBgBase: '#121212',
    colorTextBase: '#E0E0E0',
    colorBorder: '#2E2E2E',
    colorBgContainer: '#1E1E1E',
    colorBgElevated: '#252525',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
};

// ─── Oriental ─────────────────────────────────────────────────
// Alto contraste, fondos estilo papel de arroz, acentos carmesí
const orientalTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#B22222',
    colorBgBase: '#F5F0E8',
    colorTextBase: '#2C1810',
    colorBorder: '#C4B8A6',
    colorBgContainer: '#F5F0E8',
    colorBgElevated: '#EDE5D5',
    colorLink: '#8B1A1A',
    borderRadius: 4,
    fontFamily: "'Inter', 'Noto Serif', serif",
  },
  components: {
    Button: {
      colorPrimaryHover: '#8B1A1A',
      colorPrimaryActive: '#6B1010',
    },
  },
};

// ─── Black Metal ──────────────────────────────────────────────
// Fondos casi negros, texto ceniza, acentos rojo sangre
const blackMetalTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#8B0000',
    colorBgBase: '#0A0A0A',
    colorTextBase: '#8A8A8A',
    colorBorder: '#1A1A1A',
    colorBgContainer: '#0E0E0E',
    colorBgElevated: '#111111',
    colorLink: '#6B0000',
    borderRadius: 2,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      colorPrimaryHover: '#6B0000',
      colorPrimaryActive: '#500000',
    },
  },
};

// ─── Barbie ───────────────────────────────────────────────────
// Rosa vibrante, fondos blush, acentos hot pink/fucsia
const barbieTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#FF69B4',
    colorBgBase: '#FFF0F5',
    colorTextBase: '#880058',
    colorBorder: '#FFB6C1',
    colorBgContainer: '#FFF5F9',
    colorBgElevated: '#FFE4ED',
    colorLink: '#FF1493',
    colorSuccess: '#FF69B4',
    colorWarning: '#FF85C2',
    colorInfo: '#DA70D6',
    borderRadius: 16,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      colorPrimaryHover: '#FF1493',
      colorPrimaryActive: '#C71585',
      borderRadius: 9999,
    },
  },
};

// ─── Theme Registry ───────────────────────────────────────────

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  oriental: orientalTheme,
  'black-metal': blackMetalTheme,
  barbie: barbieTheme,
} as const;

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as ThemeName[];
