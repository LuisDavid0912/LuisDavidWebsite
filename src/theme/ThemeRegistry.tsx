'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { brandColors, lightTokens, darkTokens, accentTokens } from './tokens';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode(): ThemeContextType {
  const context = useContext(ThemeContext);
  // Return default values for SSR/static export (no provider available)
  if (!context) {
    return {
      mode: 'light',
      toggleMode: () => {},
    };
  }
  return context;
}

/**
 * Apple-like Typography System
 */
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

function createAppTheme(mode: ThemeMode) {
  const tokens = mode === 'light' ? lightTokens : darkTokens;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: brandColors.primary,
        light: '#012fd6',
        dark: '#012fd6',
        contrastText: brandColors.white,
      },
      secondary: {
        main: brandColors.secondary,
        light: '#0efff8',
        dark: '#0efff8',
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
      h1: {
        fontSize: '3rem',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.005em',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.45,
        letterSpacing: '0',
      },
      body1: {
        fontSize: '1.0625rem',
        lineHeight: 1.65,
        letterSpacing: '-0.01em',
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        letterSpacing: '-0.005em',
        fontWeight: 400,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '-0.01em',
      },
      caption: {
        fontSize: '0.8125rem',
        lineHeight: 1.5,
        letterSpacing: '0',
        fontWeight: 400,
      },
      overline: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        letterSpacing: '0.08em',
        fontWeight: 500,
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: '1rem',
          },
          sizeLarge: {
            padding: '14px 32px',
            fontSize: '1.125rem',
          },
          containedPrimary: {
            boxShadow: tokens.shadows.button,
            '&:hover': {
              boxShadow: tokens.shadows.cardHover,
            },
          },
          outlinedPrimary: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: tokens.action.hover,
            },
          },
          containedSecondary: {
            color: brandColors.black,
          },
          outlinedSecondary: {
            borderColor: brandColors.secondary,
            color: mode === 'light' ? brandColors.primary : brandColors.secondary,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: accentTokens.background,
            },
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
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: tokens.shadows.cardHover,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.appBar.background,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: tokens.text.link,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: accentTokens.chip,
            color: mode === 'light' ? brandColors.primary : brandColors.secondary,
            fontWeight: 500,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: tokens.action.hover,
            },
          },
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
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // Check system preference
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

  // Prevent flash of wrong theme
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
