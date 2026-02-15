'use client';

import { Box, Container, Typography, Stack, Grid, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha } from '@mui/material/styles';
import { LeadCaptureForm, SecondaryButton } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

export default function ContactPage() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { contact } = siteContent;

  const handleScrollToForm = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =============================================
          HERO — Fondo oscuro, siempre
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
            {contact.title}
          </Typography>

          {/* Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: brandColors.white,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' },
              lineHeight: 1.1,
              mb: 3,
            }}
          >
            {contact.hero.title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: alpha(brandColors.white, 0.75),
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6,
              mb: 5,
            }}
          >
            {contact.hero.subtitle}
          </Typography>

          {/* CTA button — scroll to form */}
          <SecondaryButton
            onClick={handleScrollToForm}
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
            {contact.hero.ctaLabel}
          </SecondaryButton>
        </Container>
      </Box>

      {/* =============================================
          SECCIÓN DE CONTACTO — 2 columnas
          ============================================= */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12, lg: 16 },
          bgcolor: isLight ? brandColors.white : brandColors.black,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="flex-start">
            {/* ---- Columna izquierda: Calificación (second on mobile) ---- */}
            <Grid item xs={12} md={5} sx={{ order: { xs: 2, md: 1 } }}>
              <Box
                sx={{
                  bgcolor: alpha(brandColors.primary, isLight ? 0.04 : 0.12),
                  borderRadius: 3,
                  p: { xs: 3, md: 4 },
                  border: 1,
                  borderColor: alpha(brandColors.primary, isLight ? 0.1 : 0.2),
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    color: 'text.primary',
                    mb: 3,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 600,
                  }}
                >
                  {contact.qualification.title}
                </Typography>

                <Stack spacing={2}>
                  {contact.qualification.items.map((item, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          color: isLight ? brandColors.primary : brandColors.secondary,
                          fontSize: '1.25rem',
                          mt: 0.25,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Email directo */}
                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: 1,
                    borderColor: alpha(
                      isLight ? brandColors.black : brandColors.white,
                      0.1,
                    ),
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.8125rem',
                      mb: 0.5,
                    }}
                  >
                    ¿Prefieres email directo?
                  </Typography>
                  <Typography
                    component="a"
                    href={`mailto:${contact.email}`}
                    variant="body2"
                    sx={{
                      color: isLight ? brandColors.primary : brandColors.secondary,
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {contact.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* ---- Columna derecha: Formulario (first on mobile) ---- */}
            <Grid item xs={12} md={7} id="contacto" sx={{ order: { xs: 1, md: 2 } }}>
              <Box sx={{ maxWidth: 600 }}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    color: 'text.primary',
                    mb: 1,
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                  }}
                >
                  Envíame un mensaje
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                  }}
                >
                  {contact.description}
                </Typography>
              </Box>

              <LeadCaptureForm variant="contact" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
