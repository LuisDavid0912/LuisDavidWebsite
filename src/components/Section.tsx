'use client';

import { ReactNode } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { brandColors, alphaLevels } from '@/theme/tokens';

type SectionBackground = 'default' | 'paper' | 'primary' | 'secondary' | 'alt';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  background?: SectionBackground;
  centered?: boolean;
  minHeight?: string | { xs?: string; md?: string; lg?: string };
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  background = 'default',
  centered = false,
  minHeight,
}: SectionProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // Compute solid background colors using brand colors + alpha
  const getBackgroundColor = () => {
    switch (background) {
      case 'paper':
        return isLight
          ? alpha(brandColors.black, alphaLevels.paperLight)
          : alpha(brandColors.white, alphaLevels.paperDark);
      case 'alt':
        return isLight
          ? alpha(brandColors.black, alphaLevels.altLight)
          : alpha(brandColors.white, alphaLevels.altDark);
      case 'primary':
        return brandColors.primary;
      case 'secondary':
        return isLight
          ? alpha(brandColors.secondary, 0.1)
          : alpha(brandColors.secondary, 0.15);
      case 'default':
      default:
        return isLight ? brandColors.white : brandColors.black;
    }
  };

  // Text colors for different backgrounds
  const getTextColor = () => {
    if (background === 'primary') return brandColors.white;
    return undefined; // Use theme default
  };

  const getSecondaryTextColor = () => {
    if (background === 'primary') return alpha(brandColors.white, 0.8);
    return undefined;
  };

  const getSubtitleColor = () => {
    if (background === 'primary') return brandColors.secondary;
    return 'primary.main';
  };

  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 8, md: 12, lg: 16 },
        backgroundColor: getBackgroundColor(),
        minHeight: minHeight,
      }}
    >
      <Container maxWidth="lg">
        {(title || subtitle) && (
          <Box
            sx={{
              mb: 6,
              textAlign: centered ? 'center' : 'left',
              mx: centered ? 'auto' : 0,
              maxWidth: centered ? 800 : undefined,
            }}
          >
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: getSubtitleColor(),
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 1,
                }}
              >
                {subtitle}
              </Typography>
            )}
            {title && (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: getTextColor() || 'text.primary',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                {title}
              </Typography>
            )}
          </Box>
        )}
        <Box sx={{ color: getSecondaryTextColor() }}>{children}</Box>
      </Container>
    </Box>
  );
}
