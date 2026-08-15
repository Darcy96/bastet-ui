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

export { LanguageSwitcher } from './components/LanguageSwitcher';
export type { LanguageSwitcherProps, LanguageOption, LanguageSwitcherSize } from './components/LanguageSwitcher';

export { Navbar } from './components/Navbar';
export type { NavbarProps, NavbarLink } from './components/Navbar';

export { Footer } from './components/Footer';
export type { FooterProps, SocialLink, SocialPlatform } from './components/Footer';

export { HorizontalExperience } from './components/HorizontalExperience';
export type { HorizontalExperienceProps, ExperienceItem } from './components/HorizontalExperience';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { HeroCreativeLayout } from './components/HeroCreativeLayout';
export type { HeroCreativeLayoutProps } from './components/HeroCreativeLayout';

export { Carousel } from './components/Carousel';
export type { CarouselProps } from './components/Carousel';
