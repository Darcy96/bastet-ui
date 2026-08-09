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
const lightTheme: ThemeConfig = {
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
const darkTheme: ThemeConfig = {
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
const orientalTheme: ThemeConfig = {
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
const blackMetalTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#F0EAD6',      // Bone white primary accent
    colorSuccess: '#555548',
    colorWarning: '#D89614',
    colorError: '#991A1A',
    colorBgBase: '#0A0A0A',        // Deep black
    colorTextBase: '#F0EAD6',      // Bone white text
    colorBorder: '#F0EAD6',        // Bone white border
    borderRadius: 0,              // Sharp 0px corners
    fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
  },
  components: {
    Button: {
      colorPrimaryHover: '#F0EAD6',
      colorPrimaryActive: '#D9D3C3',
    },
  },
};

// ─── Barbie ───────────────────────────────────────────────────
const barbieTheme: ThemeConfig = {
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
