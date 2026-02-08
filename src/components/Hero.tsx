'use client';

import { Box, Container, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { siteContent } from '@/content/site';

export default function Hero() {
  return (
    <Box
      id="inicio"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        // Theme-aware gradient background
        background: (theme) => 
          theme.palette.mode === 'light'
            ? `linear-gradient(135deg, 
                ${theme.palette.background.default} 0%, 
                ${theme.palette.background.paper} 50%,
                rgba(1, 47, 214, 0.03) 100%)`
            : `linear-gradient(135deg, 
                ${theme.palette.background.default} 0%, 
                ${theme.palette.background.paper} 50%,
                rgba(14, 255, 248, 0.03) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '150%',
          // Decorative glow using secondary color
          background: (theme) => 
            theme.palette.mode === 'light'
              ? `radial-gradient(circle, rgba(14, 255, 248, 0.08) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(14, 255, 248, 0.05) 0%, transparent 70%)`,
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
