/**
 * Design Tokens - Luis David Official Brand Colors
 * 
 * BRAND COLOR LOCK (Non-Negotiable):
 * The only hex codes allowed in the entire repo are:
 * - #012fd6 (primary/Azul Rey)
 * - #0efff8 (secondary/Cyan)
 * - ##F0EEE9 (white)
 * - #000000 (black)
 * 
 * All other colors MUST be derived using alpha(), lighten(), or darken()
 * applied to these 4 official colors at RUNTIME (in ThemeRegistry).
 */

// ============================================
// OFFICIAL BRAND COLORS (IMMUTABLE)
// These are the ONLY hex values allowed in the entire repo.
// ============================================
export const brandColors = {
  primary: '#012fd6',
  secondary: '#0efff8',
  white: '#F0EFE9',
  black: '#000000',
} as const;

// ============================================
// ALPHA VALUES FOR TOKENS
// These define the opacity levels used throughout the app.
// The actual color computation (alpha()) happens in ThemeRegistry.
// ============================================
export const alphaLevels = {
  // Background paper/surface levels
  paperLight: 0.02,      // black @ 2%
  paperDark: 0.05,       // white @ 5%
  altLight: 0.03,        // black @ 3%
  altDark: 0.08,         // white @ 8%
  elevated: 0.08,        // white @ 8% (dark mode only)

  // Text transparencies
  textSecondary: 0.7,
  textMuted: 0.5,

  // Borders
  borderLight: 0.12,
  borderSubtle: 0.08,
  borderDark: 0.15,
  borderDarkSubtle: 0.1,

  // Actions
  hover: 0.06,
  hoverStrong: 0.08,
  selected: 0.1,
  selectedStrong: 0.12,
  selectedDarkStrong: 0.15,
  disabled: 0.26,
  disabledDark: 0.3,
  disabledBg: 0.12,

  // Shadows
  shadowPrimary: 0.1,
  shadowPrimaryHover: 0.2,
  shadowButton: 0.3,
  shadowDark: 0.4,
  shadowDarkSecondary: 0.3,
  shadowSecondaryHover: 0.2,
  shadowSecondaryButton: 0.25,

  // Accents
  accentGlow: 0.4,
  accentBg: 0.15,
  accentChip: 0.2,

  // AppBar
  appBarLight: 0.95,
  appBarDark: 0.95,

  // Gradients
  gradientSubtle: 0.03,
  gradientSecondary: 0.05,
} as const;

export type BrandColors = typeof brandColors;
export type AlphaLevels = typeof alphaLevels;
