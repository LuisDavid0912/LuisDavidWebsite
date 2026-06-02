'use client';

import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Shared editorial design primitives.
 *
 * These power the magazine-style layout used across /about and / (home):
 * monospace eyebrow labels (Kicker) and a display headline with an
 * italic, accent-colored emphasis word (Headline).
 */

export const MONO_FONT =
  'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace';

interface KickerProps {
  children: ReactNode;
  color: string;
  mono?: boolean;
  sx?: object;
}

export function Kicker({ children, color, mono = false, sx }: KickerProps) {
  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-block',
        color,
        fontSize: mono ? '0.6875rem' : '0.78125rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontFamily: mono ? MONO_FONT : undefined,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

interface HeadlineProps {
  before: string;
  em: string;
  after: string;
  emColor: string;
  size?: 'hero' | 'lg' | 'md';
}

export function Headline({ before, em, after, emColor, size = 'md' }: HeadlineProps) {
  const fontSize =
    size === 'hero'
      ? { xs: '3rem', sm: '4rem', md: '5.5rem', lg: '7rem', xl: '7.5rem' }
      : size === 'lg'
        ? { xs: '2.25rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' }
        : { xs: '2rem', sm: '2.25rem', md: '3rem', lg: '3.25rem' };

  const lineHeight = size === 'hero' ? 0.96 : 1.04;
  const letterSpacing = size === 'hero' ? '-0.05em' : '-0.04em';
  const fontWeight = 500;

  return (
    <Typography
      component={size === 'hero' ? 'h1' : 'h2'}
      sx={{
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        color: 'text.primary',
        textWrap: 'balance',
      }}
    >
      {before}
      <Box
        component="em"
        sx={{
          fontStyle: 'italic',
          fontWeight: 300,
          color: emColor,
        }}
      >
        {em}
      </Box>
      {after}
    </Typography>
  );
}
