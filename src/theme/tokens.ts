/**
 * Design Tokens - Luis David Official Brand Colors
 * 
 * This file centralizes all color values used across the site.
 * Components should reference these tokens or theme.palette, never hex codes directly.
 */

// Official Brand Colors (Base Palette)
export const brandColors = {
  primary: '#012fd6',      // Azul Rey Principal
  secondary: '#0efff8',    // Azul claro/Cyan Secundario
  white: '#ffffff',
  black: '#0a0a0a',        // Soft black for better readability
  pureBlack: '#000000',
} as const;

// Light Mode Tokens
export const lightTokens = {
  // Backgrounds
  background: {
    default: brandColors.white,
    paper: '#f8fafc',
    elevated: brandColors.white,
    hero: `linear-gradient(135deg, ${brandColors.white} 0%, #f0f4ff 50%, #e6f7ff 100%)`,
  },

  // Text Colors
  text: {
    primary: brandColors.black,
    secondary: '#4a5568',
    muted: '#718096',
    inverse: brandColors.white,
    link: brandColors.primary,
  },

  // Surfaces
  surface: {
    default: brandColors.white,
    alt: '#f7fafc',
    hover: 'rgba(1, 47, 214, 0.04)',
    selected: 'rgba(1, 47, 214, 0.08)',
  },

  // Borders
  border: {
    default: '#e2e8f0',
    light: '#edf2f7',
    focus: brandColors.primary,
    accent: brandColors.secondary,
  },

  // Action States
  action: {
    hover: 'rgba(1, 47, 214, 0.08)',
    selected: 'rgba(1, 47, 214, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },

  // Shadows
  shadows: {
    card: '0 4px 6px -1px rgba(1, 47, 214, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    cardHover: '0 12px 24px -8px rgba(1, 47, 214, 0.2)',
    button: '0 4px 14px 0 rgba(1, 47, 214, 0.3)',
  },

  // AppBar
  appBar: {
    background: `${brandColors.white}f5`,
  },
} as const;

// Dark Mode Tokens
export const darkTokens = {
  // Backgrounds
  background: {
    default: '#0a0a0f',
    paper: '#12121a',
    elevated: '#1a1a24',
    hero: `linear-gradient(135deg, #0a0a0f 0%, #0f0f18 50%, #101020 100%)`,
  },

  // Text Colors
  text: {
    primary: '#f0f0f5',
    secondary: '#a0a0b0',
    muted: '#6a6a7a',
    inverse: brandColors.black,
    link: '#4d7fff', // Lighter primary for dark mode
  },

  // Surfaces
  surface: {
    default: '#12121a',
    alt: '#1a1a24',
    hover: 'rgba(14, 255, 248, 0.08)',
    selected: 'rgba(14, 255, 248, 0.12)',
  },

  // Borders
  border: {
    default: '#2a2a3a',
    light: '#1f1f2f',
    focus: brandColors.secondary,
    accent: brandColors.secondary,
  },

  // Action States
  action: {
    hover: 'rgba(14, 255, 248, 0.08)',
    selected: 'rgba(14, 255, 248, 0.12)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },

  // Shadows
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    cardHover: '0 12px 24px -8px rgba(14, 255, 248, 0.15)',
    button: '0 4px 14px 0 rgba(14, 255, 248, 0.25)',
  },

  // AppBar
  appBar: {
    background: 'rgba(10, 10, 15, 0.95)',
  },
} as const;

// Accent tokens (same for both modes)
export const accentTokens = {
  glow: `0 0 20px ${brandColors.secondary}40`,
  border: brandColors.secondary,
  background: `${brandColors.secondary}15`,
  chip: `${brandColors.secondary}20`,
} as const;

export type BrandColors = typeof brandColors;
export type ModeTokens = typeof lightTokens | typeof darkTokens;
