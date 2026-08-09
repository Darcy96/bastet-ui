// ═══════════════════════════════════════════════════════════════
// Bastet UI — Main Entry Point
// ═══════════════════════════════════════════════════════════════

// Base styles (resets, typography)
import './styles/globals.css';

// Theme system
export { BstThemeProvider, useBstTheme } from './theme';
export type { BstThemeProviderProps } from './theme';
export { themes, themeNames } from './theme/tokens';
export type { ThemeName } from './theme/tokens';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { ThemeSwitcher } from './components/ThemeSwitcher';
export type { ThemeSwitcherProps, ThemeSwitcherSize } from './components/ThemeSwitcher';

export { Navbar } from './components/Navbar';
export type { NavbarProps, NavbarLink } from './components/Navbar';

export { Footer } from './components/Footer';
export * from './components/HeroCreativeLayout';
export type { FooterProps, SocialLink, SocialPlatform } from './components/Footer';
