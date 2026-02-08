'use client';

import { Box, Container, Typography, Stack } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { siteContent } from '@/content/site';

export default function Hero() {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="inicio"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '60%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(49, 151, 149, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'secondary.main',
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
            <PrimaryButton onClick={() => handleClick(siteContent.hero.ctaPrimary.href)}>
              {siteContent.hero.ctaPrimary.label}
            </PrimaryButton>
            <SecondaryButton onClick={() => handleClick(siteContent.hero.ctaSecondary.href)}>
              {siteContent.hero.ctaSecondary.label}
            </SecondaryButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
