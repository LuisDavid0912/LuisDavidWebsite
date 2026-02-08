'use client';

import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

export default function Hero() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // Compute colors at runtime using alpha()
  const gradientEnd = isLight
    ? alpha(brandColors.primary, alphaLevels.gradientSubtle)
    : alpha(brandColors.secondary, alphaLevels.gradientSecondary);
  
  const gradientMid = isLight
    ? alpha(brandColors.black, alphaLevels.paperLight)
    : alpha(brandColors.white, alphaLevels.gradientSubtle);

  const glowColor = alpha(brandColors.secondary, isLight ? 0.08 : 0.05);

  return (
    <Box
      id="inicio"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          ${isLight ? brandColors.white : brandColors.black} 0%, 
          ${gradientMid} 50%,
          ${gradientEnd} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '150%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            Hola, soy Luis David
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {siteContent.hero.headline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 5,
              maxWidth: 560,
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {siteContent.hero.subheadline}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <PrimaryButton
              component={Link}
              href={siteContent.hero.ctaPrimary.href}
            >
              {siteContent.hero.ctaPrimary.label}
            </PrimaryButton>
            <SecondaryButton
              component={Link}
              href={siteContent.hero.ctaSecondary.href}
            >
              {siteContent.hero.ctaSecondary.label}
            </SecondaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
