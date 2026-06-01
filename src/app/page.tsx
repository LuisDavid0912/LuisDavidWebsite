'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import Link from 'next/link';
import { Hero, Section, PrimaryButton, ProjectCard, LeadCaptureForm } from '@/components';
import { siteContent } from '@/content/site';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Contexto Section */}
      <Section
        id="contexto"
        title={siteContent.homeContext.title}
        background="paper"
        centered
      >
        <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          {siteContent.homeContext.paragraphs.map((p, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                textAlign: { xs: 'left', md: 'justify' },
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
        <Grid container spacing={4}>
          {siteContent.homeContext.blocks.map((block, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 3, md: 4 },
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 2,
                  },
                }}
                elevation={0}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}
                >
                  {block.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'left', md: 'justify' },
                  }}
                >
                  {block.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Qué hago exactamente Section */}
      <Section
        id="que-hago"
        title={siteContent.homeWhatIDo.title}
        background="default"
        centered
      >
        <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          {siteContent.homeWhatIDo.paragraphs.map((p, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                textAlign: { xs: 'left', md: 'justify' },
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
        <Grid container spacing={4} justifyContent="center">
          {siteContent.homeWhatIDo.areas.map((area, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  textAlign: 'left',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'secondary.main', mb: 2, fontWeight: 600 }}
                >
                  {area.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'left', md: 'justify' },
                  }}
                >
                  {area.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Methodology Section */}
      <Section
        id="metodologia"
        title={siteContent.homeMethodology.title}
        background="paper"
        centered
      >
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {siteContent.homeMethodology.steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}
                >
                  {step.step}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 2, mt: 1, fontWeight: 600 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton component={Link} href={siteContent.homeMethodology.cta.href}>
            {siteContent.homeMethodology.cta.label}
          </PrimaryButton>
        </Box>
      </Section>

      {/* Examples Section */}
      <Section
        id="ejemplos"
        title={siteContent.homeExamples.title}
        background="default"
        centered
      >
        <Grid container spacing={4}>
          {siteContent.homeExamples.examples.map((example, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 3, md: 4 },
                }}
                elevation={0}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}
                >
                  {example.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'left', md: 'justify' },
                  }}
                >
                  {example.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Newsletter Section */}
      <Section
        id="newsletter"
        title={siteContent.newsletter.title}
        subtitle={siteContent.newsletter.subtitle}
        background="alt"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 5,
            maxWidth: 600,
            mx: 'auto',
            textAlign: { xs: 'center', md: 'justify' },
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8,
          }}
        >
          {siteContent.newsletter.description}
        </Typography>
        <LeadCaptureForm />
      </Section>

      {/* CTA Section */}
      <Section
        id="contacto-cta"
        title={siteContent.homeCta.title}
        subtitle={siteContent.homeCta.subtitle}
        background="secondary"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 5,
            maxWidth: 600,
            mx: 'auto',
            textAlign: { xs: 'center', md: 'justify' },
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.8,
          }}
        >
          {siteContent.homeCta.description}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton component={Link} href={siteContent.homeCta.buttonHref}>
            {siteContent.homeCta.buttonLabel}
          </PrimaryButton>
        </Box>
      </Section>
    </>
  );
}
