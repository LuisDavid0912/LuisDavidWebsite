import { Box, Typography, Grid, Card, CardContent, Stack, Chip, Divider } from '@mui/material';
import { Section, PrimaryButton, ResponsiveImage } from '@/components';
import Link from 'next/link';
import { siteContent } from '@/content/site';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section
        title={siteContent.aboutHero.title}
        subtitle={siteContent.aboutHero.subtitle}
        background="default"
        minHeight={{ xs: '60vh', md: '70vh' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: { xs: '30vh', md: '40vh' } }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              lineHeight: 1.8,
              textAlign: { xs: 'left', md: 'justify' },
            }}
          >
            {siteContent.aboutHero.intro}
          </Typography>
        </Box>
      </Section>

      {/* My Story Section */}
      <Section
        id="mi-historia"
        title={siteContent.aboutStory.title}
        subtitle={siteContent.aboutStory.subtitle}
        background="paper"
      >
        <Stack spacing={4} sx={{ maxWidth: 800 }}>
          {siteContent.aboutStory.paragraphs.map((p, i) => (
            <Typography
              key={i}
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.9,
                textAlign: { xs: 'left', md: 'justify' },
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Section>

      {/* Skills Section */}
      <Section
        id="habilidades"
        title={siteContent.aboutSkills.title}
        subtitle={siteContent.aboutSkills.subtitle}
        background="default"
      >
        <Grid container spacing={4}>
          {siteContent.aboutSkills.categories.map((category, i) => (
            <Grid item xs={12} md={6} key={i}>
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
                  sx={{ color: 'primary.main', mb: 3, fontWeight: 600 }}
                >
                  {category.name}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {category.skills.map((skill, j) => (
                    <Chip
                      key={j}
                      label={skill}
                      size="medium"
                      sx={{
                        backgroundColor: 'action.selected',
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Gallery Section */}
      <Section
        title="Galería"
        subtitle="Un poco más sobre mí"
        background="alt"
      >
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
            <ResponsiveImage 
                src="/images/photos/originales/CSentadoPisoConMac.jpg" 
                alt="Luis David trabajando" 
                variant="card"
                aspectRatio="4/3"
                sx={{ borderRadius: 2 }}
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <ResponsiveImage 
                src="/images/photos/originales/KParadoSonriendo.jpg" 
                alt="Conferencia" 
                variant="card"
                aspectRatio="4/3"
                sx={{ borderRadius: 2 }}
            />
            </Grid>
        </Grid>
      </Section>

      {/* Experience Section */}
      <Section
        id="experiencia"
        title={siteContent.aboutExperience.title}
        subtitle={siteContent.aboutExperience.subtitle}
        background="primary"
      >
        <Stack spacing={0} sx={{ maxWidth: 800 }}>
          {siteContent.aboutExperience.items.map((item, i) => (
            <Box
              key={i}
              sx={{
                py: 4,
                borderBottom: i < siteContent.aboutExperience.items.length - 1 ? '1px solid' : 'none',
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 1,
                }}
              >
                {item.period}
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                sx={{ color: 'inherit', fontWeight: 600, mb: 0.5 }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: 'secondary.main', mb: 2 }}
              >
                {item.company}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'inherit',
                  opacity: 0.85,
                  lineHeight: 1.7,
                  textAlign: { xs: 'left', md: 'justify' },
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Section>

      {/* Values Section */}
      <Section
        id="valores"
        title={siteContent.aboutValues.title}
        subtitle={siteContent.aboutValues.subtitle}
        background="paper"
        centered
      >
        <Grid container spacing={4}>
          {siteContent.aboutValues.items.map((value, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: { xs: 3, md: 4 },
                }}
                elevation={0}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'left', md: 'justify' },
                  }}
                >
                  {value.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Education Section */}
      <Section
        id="educacion"
        title={siteContent.aboutEducation.title}
        subtitle={siteContent.aboutEducation.subtitle}
        background="default"
      >
        <Grid container spacing={3}>
          {siteContent.aboutEducation.items.map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                }}
                elevation={0}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    mb: 1,
                  }}
                >
                  {item.year}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ color: 'text.primary', mb: 1, fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  {item.institution}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* Interests Section */}
      <Section
        id="intereses"
        title={siteContent.aboutInterests.title}
        subtitle={siteContent.aboutInterests.subtitle}
        background="alt"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 6,
            maxWidth: 600,
            mx: 'auto',
            textAlign: { xs: 'center', md: 'justify' },
            lineHeight: 1.8,
          }}
        >
          {siteContent.aboutInterests.description}
        </Typography>
        <Grid container spacing={4}>
          {siteContent.aboutInterests.items.map((interest, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}
                >
                  {interest.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: { xs: 'center', md: 'justify' },
                  }}
                >
                  {interest.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* CTA Section */}
      <Section
        id="contacto-cta"
        title="¿Quieres Trabajar Conmigo?"
        subtitle="Contacto"
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
          Si tienes un proyecto en mente o simplemente quieres conectar, no dudes en contactarme. Siempre estoy abierto a nuevas oportunidades y colaboraciones interesantes.
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <PrimaryButton component={Link} href="/contact">
            Contáctame
          </PrimaryButton>
        </Box>
      </Section>
    </>
  );
}
