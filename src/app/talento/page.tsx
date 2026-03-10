import { Grid, Typography, Box, Card, Stack, Chip } from '@mui/material';
import { Section, PrimaryButton, SecondaryButton } from '@/components';
import { siteContent } from '@/content/site';
import Link from 'next/link';

export default function TalentoPage() {
  const { hero, benefits, programs } = siteContent.talento;

  return (
    <>
      <Section
        title={hero.title}
        subtitle={hero.subtitle}
        background="paper"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 5,
            maxWidth: 800,
            mx: 'auto',
            textAlign: { xs: 'left', md: 'center' },
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            lineHeight: 1.8,
          }}
        >
          {hero.description}
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <PrimaryButton component={Link} href={hero.ctaPrimary.href}>
            {hero.ctaPrimary.label}
          </PrimaryButton>
          <SecondaryButton 
            component={Link} 
            href={hero.ctaSecondary.href}
            target={hero.ctaSecondary.href.startsWith('http') ? '_blank' : undefined}
            rel={hero.ctaSecondary.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {hero.ctaSecondary.label}
          </SecondaryButton>
        </Stack>
      </Section>

      <Section
        id="beneficios"
        title={benefits.title}
        background="default"
        centered
      >
        <Grid container spacing={4}>
          {benefits.items.map((benefit, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
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
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'left', md: 'justify' },
                  }}
                >
                  {benefit.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section
        id="programas"
        title={programs.title}
        background="paper"
        centered
      >
        <Grid container spacing={4} justifyContent="center">
          {programs.items.map((program, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.default',
                  textAlign: 'left',
                }}
              >
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={program.duration} size="small" color="secondary" />
                  <Chip label={program.level} size="small" variant="outlined" />
                </Stack>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}
                >
                  {program.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                  }}
                >
                  {program.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
