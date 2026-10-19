/**
 * Bastet UI — Design Tokens & Native Token Engine
 *
 * Zero-dependency, lightweight token system replacing Ant Design.
 * Provides full support for:
 * - Light (Inter)
 * - Dark (Inter)
 * - Oriental (Noto Serif)
 * - Black Metal (UnifrakturMaguntia - Bone White Dimmu Style)
 * - Barbie / Pink (Fredoka)
 * - Popayán Ciudad Blanca (Colonial Style)
 */

export interface BstThemeTokens {
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryBg: string;

  colorSuccess: string;
  colorSuccessBg: string;

  colorWarning: string;
  colorWarningBg: string;

  colorError: string;
  colorErrorBg: string;
  colorErrorHover: string;
  colorErrorActive: string;

  colorInfo: string;
  colorInfoBg: string;

  colorBgBase: string;
  colorBgContainer: string;
  colorBgElevated: string;
  colorBgLayout: string;

  colorTextBase: string;
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextLightSolid: string;

  colorBorder: string;
  colorBorderSecondary: string;
  colorFillAlter: string;

  borderRadius: number;
  fontFamily: string;
  mode: 'light' | 'dark';
}

export type BstSeedTokens = Partial<BstThemeTokens> & {
  colorPrimary: string;
  colorBgBase: string;
  colorTextBase: string;
  borderRadius: number;
  fontFamily: string;
  mode?: 'light' | 'dark';
};

/**
 * Resolves full tokens from seed tokens with intelligent defaults
 */
export function resolveTokens(seed: BstSeedTokens): BstThemeTokens {
  const isDark = seed.mode === 'dark' || seed.colorBgBase === '#0A0A0A' || seed.colorBgBase === '#141414';

  const colorBorder = seed.colorBorder || (isDark ? '#424242' : '#D9D9D9');
  const colorTextSecondary = seed.colorTextSecondary || (isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)');

  return {
    colorPrimary: seed.colorPrimary,
    colorPrimaryHover: seed.colorPrimaryHover || seed.colorPrimary,
    colorPrimaryActive: seed.colorPrimaryActive || seed.colorPrimary,
    colorPrimaryBg: seed.colorPrimaryBg || `${seed.colorPrimary}18`,

    colorSuccess: seed.colorSuccess || '#52C41A',
    colorSuccessBg: seed.colorSuccessBg || (isDark ? '#162312' : '#F6FFED'),

    colorWarning: seed.colorWarning || '#FAAD14',
    colorWarningBg: seed.colorWarningBg || (isDark ? '#2B2111' : '#FFFBE6'),

    colorError: seed.colorError || '#F5222D',
    colorErrorBg: seed.colorErrorBg || (isDark ? '#2A1215' : '#FFF2F0'),
    colorErrorHover: seed.colorErrorHover || '#FF4D4F',
    colorErrorActive: seed.colorErrorActive || '#CF1322',

    colorInfo: seed.colorInfo || seed.colorPrimary,
    colorInfoBg: seed.colorInfoBg || `${seed.colorPrimary}15`,

    colorBgBase: seed.colorBgBase,
    colorBgContainer: seed.colorBgContainer || seed.colorBgBase,
    colorBgElevated: seed.colorBgElevated || (isDark ? '#1F1F1F' : '#FFFFFF'),
    colorBgLayout: seed.colorBgLayout || seed.colorBgBase,

    colorTextBase: seed.colorTextBase,
    colorText: seed.colorText || seed.colorTextBase,
    colorTextSecondary,
    colorTextTertiary: seed.colorTextTertiary || (isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)'),
    colorTextLightSolid: seed.colorTextLightSolid || '#FFFFFF',

    colorBorder,
    colorBorderSecondary: seed.colorBorderSecondary || (isDark ? '#303030' : '#E8E8E8'),
    colorFillAlter: seed.colorFillAlter || (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'),

    borderRadius: seed.borderRadius,
    fontFamily: seed.fontFamily,
    mode: isDark ? 'dark' : 'light',
  };
}

// ─── Light ────────────────────────────────────────────────────
export const lightTheme: BstThemeTokens = resolveTokens({
  mode: 'light',
  colorPrimary: '#1677FF',
  colorPrimaryHover: '#4096FF',
  colorPrimaryActive: '#0958D9',
  colorSuccess: '#52C41A',
  colorWarning: '#FAAD14',
  colorError: '#F5222D',
  colorBgBase: '#FFFFFF',
  colorBgContainer: '#FFFFFF',
  colorBgElevated: '#FFFFFF',
  colorTextBase: '#000000',
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorBorder: '#D9D9D9',
  borderRadius: 8,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
});

// ─── Dark ─────────────────────────────────────────────────────
export const darkTheme: BstThemeTokens = resolveTokens({
  mode: 'dark',
  colorPrimary: '#1668DC',
  colorPrimaryHover: '#3C89E8',
  colorPrimaryActive: '#1554AD',
  colorSuccess: '#49AA19',
  colorWarning: '#D89614',
  colorError: '#D32029',
  colorBgBase: '#141414',
  colorBgContainer: '#141414',
  colorBgElevated: '#1F1F1F',
  colorTextBase: '#FFFFFF',
  colorText: 'rgba(255, 255, 255, 0.85)',
  colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
  colorBorder: '#424242',
  borderRadius: 8,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
});

// ─── Oriental ─────────────────────────────────────────────────
export const orientalTheme: BstThemeTokens = resolveTokens({
  mode: 'light',
  colorPrimary: '#FA541C',
  colorPrimaryHover: '#FF7A45',
  colorPrimaryActive: '#D4380D',
  colorSuccess: '#52C41A',
  colorWarning: '#FAAD14',
  colorError: '#A8071A',
  colorBgBase: '#FFF5EB',
  colorBgContainer: '#FFFDF9',
  colorBgElevated: '#FFFFFF',
  colorTextBase: '#1A0F05',
  colorText: '#1A0F05',
  colorTextSecondary: '#6B5B4D',
  colorBorder: '#D4B896',
  borderRadius: 4,
  fontFamily: "'Noto Serif', Georgia, serif",
});

// ─── Black Metal (Bone White Dimmu Style) ─────────────────────
export const blackMetalTheme: BstThemeTokens = resolveTokens({
  mode: 'dark',
  colorPrimary: '#F0EAD6',      // Bone white primary accent
  colorPrimaryHover: '#FFFFFF',
  colorPrimaryActive: '#D9D3C3',
  colorSuccess: '#49AA19',
  colorWarning: '#D89614',
  colorError: '#991A1A',
  colorBgBase: '#0A0A0A',        // Deep black
  colorBgContainer: '#0A0A0A',
  colorBgElevated: '#141414',
  colorTextBase: '#F0EAD6',      // Bone white text
  colorText: '#F0EAD6',
  colorTextSecondary: '#A39D8D',
  colorBorder: '#F0EAD6',        // Bone white border
  borderRadius: 0,              // Sharp 0px corners
  fontFamily: "'UnifrakturMaguntia', 'Cinzel Decorative', serif",
});

// ─── Pink ───────────────────────────────────────────────────
export const pinkTheme: BstThemeTokens = resolveTokens({
  mode: 'light',
  colorPrimary: '#FF69B4',
  colorPrimaryHover: '#FF85C0',
  colorPrimaryActive: '#EB2F96',
  colorSuccess: '#38A169',
  colorWarning: '#FAAD14',
  colorError: '#F5222D',
  colorBgBase: '#FFF5F8',
  colorBgContainer: '#FFFFFF',
  colorBgElevated: '#FFFFFF',
  colorTextBase: '#1A0510',
  colorText: '#1A0510',
  colorTextSecondary: '#805068',
  colorBorder: '#FFC1D0',
  borderRadius: 16,
  fontFamily: "'Fredoka', 'Quicksand', sans-serif",
});

// ─── Popayán Ciudad Blanca (Estilo Colonial Tradicional) ──────
export const whiteCityTheme: BstThemeTokens = resolveTokens({
  mode: 'light',
  colorPrimary: '#C25E3E',      // Teja Colonial (Terracota)
  colorPrimaryHover: '#D94941',
  colorPrimaryActive: '#A1322E',
  colorSuccess: '#3B6B35',      // Verde Montaña
  colorWarning: '#ECA62A',      // Oro Catedral
  colorError: '#A22325',        // Rojo Colonial Intenso
  colorBgBase: '#FFFFFF',        // Blanco Óptico
  colorBgContainer: '#FFFFFF',
  colorBgElevated: '#F8F6F2',
  colorTextBase: '#1F2326',      // Hierro Forjado
  colorText: '#1F2326',
  colorTextSecondary: '#5C646A',
  colorTextLightSolid: '#FFFFFF',
  colorBorder: '#E8E5E1',
  borderRadius: 4,
  fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif",
});

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
