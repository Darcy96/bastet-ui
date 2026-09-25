// ═══════════════════════════════════════════════════════════════
// Bastet UI — Main Entry Point
// ═══════════════════════════════════════════════════════════════

// Base styles (resets, typography)
import './styles/globals.css';

// Theme system
export { BstThemeProvider, useBstTheme } from './theme';
export type { BstThemeProviderProps } from './theme';
export { themeNames, themes } from './theme/tokens';
export type { ThemeName } from './theme/tokens';

// Components
export { Button } from './components/Button';
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/Button';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeColor, BadgeSize, BadgeVariant } from './components/Badge';

export { ThemeSwitcher } from './components/ThemeSwitcher';
export type { ThemeSwitcherProps, ThemeSwitcherSize } from './components/ThemeSwitcher';

// Typography
export * from './components/Typography';

export { LanguageSwitcher } from './components/LanguageSwitcher';
export type { LanguageOption, LanguageSwitcherProps, LanguageSwitcherSize } from './components/LanguageSwitcher';

export { Navbar } from './components/Navbar';
export type { NavbarLink, NavbarProps } from './components/Navbar';

export { Footer } from './components/Footer';
export type { FooterProps, SocialLink, SocialPlatform } from './components/Footer';

export { ExperienceTimeline } from './components/ExperienceTimeline';
export type { ExperienceItem, ExperienceLayout, ExperienceTimelineProps } from './components/ExperienceTimeline';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { HeroCreativeLayout } from './components/HeroCreativeLayout';
export type { HeroCreativeLayoutProps } from './components/HeroCreativeLayout';

export { Carousel } from './components/Carousel';
export type { CarouselProps } from './components/Carousel';

export { Input } from './components/FormField';
export type { InputProps } from './components/FormField';

export { Textarea } from './components/FormField';
export type { TextareaProps } from './components/FormField';

export { Select } from './components/FormField';
export type { SelectOption, SelectProps } from './components/FormField';

export { ToastProvider, useToast } from './components/Toast';
export type { ToastItem, ToastOptions, ToastPosition, ToastProviderProps, ToastType } from './components/Toast';

export { CopyPill } from './components/CopyPill';
export type { CopyPillProps } from './components/CopyPill';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';
