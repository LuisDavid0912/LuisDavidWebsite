import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import Link from 'next/link';
import { Hero, Section, PrimaryButton, ProjectCard } from '@/components';
import { siteContent } from '@/content/site';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Intro Section */}
      <Section
        id="intro"
        title={siteContent.homeIntro.title}
        subtitle={siteContent.homeIntro.subtitle}
        background="paper"
      >
        <Stack spacing={3} sx={{ maxWidth: 800 }}>
          {siteContent.homeIntro.paragraphs.map((p, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Section>

      {/* Services Section */}
      <Section
        id="servicios"
        title={siteContent.homeServices.title}
        subtitle={siteContent.homeServices.subtitle}
        background="default"
        centered
      >
        <Grid container spacing={4}>
          {siteContent.homeServices.items.map((service, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                elevation={0}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Stats Section */}
      <Section
        id="impacto"
        title={siteContent.homeStats.title}
        subtitle={siteContent.homeStats.subtitle}
        background="primary"
        centered
      >
        <Grid container spacing={4} justifyContent="center">
          {siteContent.homeStats.items.map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h2"
                  component="p"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'inherit',
                    opacity: 0.9,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Featured Projects Section */}
      <Section
        id="proyectos-destacados"
        title={siteContent.homeProjects.title}
        subtitle={siteContent.homeProjects.subtitle}
        background="paper"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 6,
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          {siteContent.homeProjects.description}
        </Typography>
        <Grid container spacing={4}>
          {siteContent.projects.items.slice(0, 3).map((project, i) => (
            <Grid item xs={12} md={4} key={i}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <PrimaryButton component={Link} href="/projects">
            Ver Todos los Proyectos
          </PrimaryButton>
        </Box>
      </Section>

      {/* Testimonials Section */}
      <Section
        id="testimonios"
        title={siteContent.homeTestimonials.title}
        subtitle={siteContent.homeTestimonials.subtitle}
        background="default"
        centered
      >
        <Grid container spacing={4}>
          {siteContent.homeTestimonials.items.map((testimonial, i) => (
            <Grid item xs={12} md={4} key={i}>
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
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    mb: 3,
                    lineHeight: 1.8,
                    '&::before': { content: '"""' },
                    '&::after': { content: '"""' },
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                  >
                    {testimonial.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'primary.main' }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
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
            textAlign: 'center',
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
