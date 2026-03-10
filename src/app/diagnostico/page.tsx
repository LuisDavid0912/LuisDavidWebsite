'use client';

import { Box, Container, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha } from '@mui/material/styles';
import { SecondaryButton } from '@/components';
import DiagnosticSurvey from '@/components/DiagnosticSurvey';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

export default function DiagnosticoPage() {
  const { diagnostic } = siteContent;

  const handleScrollToSurvey = () => {
    const el = document.getElementById('encuesta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =============================================
          HERO — Fondo oscuro (mismo patrón que Contact)
          ============================================= */}
      <Box
        sx={{
          minHeight: { xs: '70vh', md: '60vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: brandColors.black,
          position: 'relative',
          textAlign: 'center',
          px: { xs: 3, md: 4 },
          py: { xs: 12, md: 16 },
        }}
      >
        <Container maxWidth="md">
          {/* Accent label */}
          <Typography
            variant="overline"
            sx={{
              color: brandColors.secondary,
              fontWeight: 600,
              letterSpacing: '0.15em',
              mb: 2,
              display: 'block',
            }}
          >
            {diagnostic.hero.subtitle}
          </Typography>

          {/* Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: brandColors.white,
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            {diagnostic.hero.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: alpha(brandColors.white, 0.75),
              maxWidth: 650,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.6,
              mb: 5,
            }}
          >
            {diagnostic.hero.description}
          </Typography>

          {/* CTA — scroll to survey */}
          <SecondaryButton
            onClick={handleScrollToSurvey}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              borderColor: brandColors.secondary,
              color: brandColors.secondary,
              '&:hover': {
                borderColor: brandColors.secondary,
                bgcolor: alpha(brandColors.secondary, 0.1),
              },
            }}
          >
            {diagnostic.hero.ctaLabel}
          </SecondaryButton>
        </Container>
      </Box>

      {/* =============================================
          SECCIÓN DE ENCUESTA
          ============================================= */}
      <Box
        component="section"
        id="encuesta"
        sx={{
          py: { xs: 4, md: 8 },
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? brandColors.white : brandColors.black,
        }}
      >
        <DiagnosticSurvey />
      </Box>
    </>
  );
}
