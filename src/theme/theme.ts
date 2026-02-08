'use client';

import { createTheme } from '@mui/material/styles';

/**
 * Apple-like Typography System
 * 
 * Font Stack Priority:
 * 1. System fonts (SF Pro on Apple devices via system-ui/-apple-system)
 * 2. Inter as explicit fallback via CSS variable (--font-inter)
 * 3. Standard system fallbacks
 * 
 * This ensures native Apple look on macOS/iOS while maintaining
 * consistency on other platforms with Inter.
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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a365d', // Deep blue
      light: '#2c5282',
      dark: '#0f2942',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#319795', // Teal accent
      light: '#4fd1c5',
      dark: '#2c7a7b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f7fafc',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily,
    // Headings: Strong but clean, Apple-like refinement
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
    // Body: Extremely legible with balanced spacing
    body1: {
      fontSize: '1.0625rem', // 17px - Apple's preferred body size
      lineHeight: 1.65,
      letterSpacing: '-0.01em',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.6,
      letterSpacing: '-0.005em',
      fontWeight: 400,
    },
    // Buttons: No forced uppercase, medium weight
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    // Captions and small text
    caption: {
      fontSize: '0.8125rem', // 13px
      lineHeight: 1.5,
      letterSpacing: '0',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem', // 12px
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
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
