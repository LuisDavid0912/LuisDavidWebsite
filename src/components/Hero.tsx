'use client';

import { Box, Container, Typography, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import ResponsiveImage from './ResponsiveImage';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

export default function Hero() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      id="inicio"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isLight ? brandColors.white : brandColors.black,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            alignItems="center"
            spacing={{ xs: 6, md: 8 }}
          >
            <Box sx={{ flex: 1, maxWidth: { md: 600 } }}>
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
                  fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' },
                  lineHeight: 1.1,
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
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6,
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

            <Box 
              sx={{ 
                flex: 1, 
                width: '100%',
                maxWidth: { xs: 400, md: 500 },
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <ResponsiveImage
                src="/images/photos/originales/BCruzadoManos.jpg"
                alt="Luis David Mag"
                variant="hero"
                priority
                aspectRatio="3/4"
                sx={{
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Stack>
      </Container>
    </Box>
  );
}
