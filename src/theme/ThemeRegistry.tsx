'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brandColors, alphaLevels } from './tokens';

/**
 * BRAND COLOR LOCK:
 * This file uses ONLY the 4 official hex values from brandColors.
 * All variants are derived using alpha() at runtime.
 */

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode(): ThemeContextType {
  const context = useContext(ThemeContext);
  // Return default values for SSR/static export
  if (!context) {
    return {
      mode: 'light',
      toggleMode: () => {},
    };
  }
  return context;
}

const fontFamily = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'var(--font-inter)',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(', ');

/**
 * Creates tokens computed at runtime using alpha()
 */
function createTokens(mode: ThemeMode) {
  const isLight = mode === 'light';

  return {
    background: {
      default: isLight ? brandColors.white : brandColors.black,
      paper: isLight 
        ? alpha(brandColors.black, alphaLevels.paperLight)
        : alpha(brandColors.white, alphaLevels.paperDark),
      elevated: isLight
        ? brandColors.white
        : alpha(brandColors.white, alphaLevels.elevated),
    },
    text: {
      primary: isLight ? brandColors.black : brandColors.white,
      secondary: isLight 
        ? alpha(brandColors.black, alphaLevels.textSecondary)
        : alpha(brandColors.white, alphaLevels.textSecondary),
      muted: isLight
        ? alpha(brandColors.black, alphaLevels.textMuted)
        : alpha(brandColors.white, alphaLevels.textMuted),
      link: isLight ? brandColors.primary : brandColors.secondary,
    },
    border: {
      default: isLight
        ? alpha(brandColors.black, alphaLevels.borderLight)
        : alpha(brandColors.white, alphaLevels.borderDark),
      light: isLight
        ? alpha(brandColors.black, alphaLevels.borderSubtle)
        : alpha(brandColors.white, alphaLevels.borderDarkSubtle),
    },
    action: {
      hover: isLight
        ? alpha(brandColors.primary, alphaLevels.hoverStrong)
        : alpha(brandColors.secondary, alphaLevels.selected),
      selected: isLight
        ? alpha(brandColors.primary, alphaLevels.selectedStrong)
        : alpha(brandColors.secondary, alphaLevels.selectedDarkStrong),
      disabled: isLight
        ? alpha(brandColors.black, alphaLevels.disabled)
        : alpha(brandColors.white, alphaLevels.disabledDark),
      disabledBackground: isLight
        ? alpha(brandColors.black, alphaLevels.disabledBg)
        : alpha(brandColors.white, alphaLevels.disabledBg),
    },
    shadows: {
      card: isLight
        ? `0 4px 6px -1px ${alpha(brandColors.primary, alphaLevels.shadowPrimary)}, 0 2px 4px -1px ${alpha(brandColors.black, alphaLevels.hover)}`
        : `0 4px 6px -1px ${alpha(brandColors.black, alphaLevels.shadowDark)}, 0 2px 4px -1px ${alpha(brandColors.black, alphaLevels.shadowDarkSecondary)}`,
      cardHover: isLight
        ? `0 12px 24px -8px ${alpha(brandColors.primary, alphaLevels.shadowPrimaryHover)}`
        : `0 12px 24px -8px ${alpha(brandColors.secondary, alphaLevels.shadowSecondaryHover)}`,
      button: isLight
        ? `0 4px 14px 0 ${alpha(brandColors.primary, alphaLevels.shadowButton)}`
        : `0 4px 14px 0 ${alpha(brandColors.secondary, alphaLevels.shadowSecondaryButton)}`,
    },
    appBar: {
      background: isLight
        ? alpha(brandColors.white, alphaLevels.appBarLight)
        : alpha(brandColors.black, alphaLevels.appBarDark),
    },
    accent: {
      background: alpha(brandColors.secondary, alphaLevels.accentBg),
      chip: alpha(brandColors.secondary, alphaLevels.accentChip),
    },
  };
}

function createAppTheme(mode: ThemeMode) {
  const tokens = createTokens(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: brandColors.primary,
        light: brandColors.primary,
        dark: brandColors.primary,
        contrastText: brandColors.white,
      },
      secondary: {
        main: brandColors.secondary,
        light: brandColors.secondary,
        dark: brandColors.secondary,
        contrastText: brandColors.black,
      },
      background: {
        default: tokens.background.default,
        paper: tokens.background.paper,
      },
      text: {
        primary: tokens.text.primary,
        secondary: tokens.text.secondary,
      },
      divider: tokens.border.default,
      action: {
        hover: tokens.action.hover,
        selected: tokens.action.selected,
        disabled: tokens.action.disabled,
        disabledBackground: tokens.action.disabledBackground,
      },
    },
    typography: {
      fontFamily,
      h1: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em' },
      h2: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' },
      h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.015em' },
      h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35, letterSpacing: '-0.01em' },
      h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.005em' },
      h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.45, letterSpacing: '0' },
      body1: { fontSize: '1.0625rem', lineHeight: 1.65, letterSpacing: '-0.01em', fontWeight: 400 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.6, letterSpacing: '-0.005em', fontWeight: 400 },
      button: { textTransform: 'none', fontWeight: 500, letterSpacing: '-0.01em' },
      caption: { fontSize: '0.8125rem', lineHeight: 1.5, letterSpacing: '0', fontWeight: 400 },
      overline: { fontSize: '0.75rem', lineHeight: 1.5, letterSpacing: '0.08em', fontWeight: 500, textTransform: 'uppercase' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { transition: 'background-color 0.3s ease, color 0.3s ease' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, padding: '12px 28px', fontSize: '1rem' },
          sizeLarge: { padding: '14px 32px', fontSize: '1.125rem' },
          containedPrimary: {
            boxShadow: tokens.shadows.button,
            '&:hover': { boxShadow: tokens.shadows.cardHover },
          },
          outlinedPrimary: {
            borderWidth: 2,
            '&:hover': { borderWidth: 2, backgroundColor: tokens.action.hover },
          },
          containedSecondary: { color: brandColors.black },
          outlinedSecondary: {
            borderColor: brandColors.secondary,
            color: mode === 'light' ? brandColors.primary : brandColors.secondary,
            borderWidth: 2,
            '&:hover': { borderWidth: 2, backgroundColor: tokens.accent.background },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: tokens.shadows.card,
            backgroundColor: tokens.background.paper,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: tokens.shadows.cardHover },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.appBar.background,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 1px 3px 0 ${alpha(brandColors.black, 0.1)}`,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: tokens.text.link,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.accent.chip,
            color: mode === 'light' ? brandColors.primary : brandColors.secondary,
            fontWeight: 500,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { '&:hover': { backgroundColor: tokens.action.hover } },
        },
      },
    },
  });
}

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode]);

  if (!mounted) {
    return (
      <ThemeProvider theme={createAppTheme('light')}>
        <CssBaseline />
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// Export helper for components that need to compute colors at runtime
export { brandColors, alphaLevels } from './tokens';
