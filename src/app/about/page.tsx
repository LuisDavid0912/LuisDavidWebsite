import { Box, Typography, Grid, Card, Stack, Divider, Container } from '@mui/material';
import { Section, PrimaryButton, SecondaryButton, ResponsiveImage } from '@/components';
import Link from 'next/link';
import { siteContent } from '@/content/site';

export default function AboutPage() {
  return (
    <>
      <Section
        title={siteContent.aboutHero.title}
        subtitle={siteContent.aboutHero.subtitle}
        background="default"
      >
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <ResponsiveImage 
                src={siteContent.aboutHero.photo} 
                alt="Luis David" 
                variant="card"
                aspectRatio="4/5"
                sx={{ borderRadius: 4 }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'secondary.main', 
                fontWeight: 600, 
                letterSpacing: '0.1em', 
                display: 'block', 
                mb: 3,
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            >
              {siteContent.aboutHero.tags}
            </Typography>
            <Stack spacing={3}>
              {siteContent.aboutHero.paragraphs.map((p, i) => (
                <Typography 
                  key={i} 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontSize: { xs: '1.125rem', md: '1.25rem' }, 
                    lineHeight: 1.8, 
                    textAlign: { xs: 'left', md: 'justify' } 
                  }}
                >
                  {p}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Section>

      <Section 
        title={siteContent.aboutWhy.title} 
        background="paper" 
        centered
      >
        <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
          {siteContent.aboutWhy.paragraphs.map((p, i) => (
            <Typography 
              key={i} 
              variant="body1" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: { xs: '1rem', md: '1.125rem' }, 
                lineHeight: 1.8, 
                textAlign: { xs: 'left', md: 'center' } 
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Section>

      <Section 
        title={siteContent.aboutWhat.title} 
        subtitle={siteContent.aboutWhat.subtitle} 
        background="default"
      >
        <Grid container spacing={4}>
          {siteContent.aboutWhat.areas.map((area, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card 
                sx={{ 
                  height: '100%', 
                  backgroundColor: 'background.paper', 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  p: { xs: 3, md: 4 } 
                }} 
                elevation={0}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}
                >
                  {area.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: 'text.secondary', lineHeight: 1.7, textAlign: { xs: 'left', md: 'justify' } }}
                >
                  {area.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section 
        title={siteContent.aboutApproach.title} 
        background="alt"
      >
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {siteContent.aboutApproach.paragraphs.map((p, i) => (
                <Typography 
                  key={i} 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontSize: { xs: '1.125rem', md: '1.25rem' }, 
                    lineHeight: 1.8, 
                    textAlign: { xs: 'left', md: 'justify' } 
                  }}
                >
                  {p}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                backgroundColor: 'background.paper', 
                border: '1px solid', 
                borderColor: 'divider', 
                p: { xs: 4, md: 5 } 
              }} 
              elevation={0}
            >
              <Stack spacing={2} component="ul" sx={{ m: 0, pl: 2 }}>
                {siteContent.aboutApproach.bullets.map((bullet, i) => (
                  <Typography 
                    key={i} 
                    component="li" 
                    variant="h6" 
                    sx={{ color: 'text.primary', fontWeight: 500, mb: 1 }}
                  >
                    {bullet}
                  </Typography>
                ))}
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Typography 
                variant="body1" 
                sx={{ color: 'primary.main', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.8 }}
              >
                {siteContent.aboutApproach.conclusion}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Section>

      <Section 
        title={siteContent.aboutVision.title} 
        background="paper" 
        centered
      >
        <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
          {siteContent.aboutVision.paragraphs.map((p, i) => (
            <Typography 
              key={i} 
              variant="body1" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: { xs: '1rem', md: '1.125rem' }, 
                lineHeight: 1.8, 
                textAlign: { xs: 'left', md: 'center' } 
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Section>

      <Section 
        title={siteContent.aboutCta.title} 
        subtitle="Oportunidades" 
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
            lineHeight: 1.8 
          }}
        >
          {siteContent.aboutCta.description}
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center" 
          alignItems="center"
        >
          <PrimaryButton 
            component={Link} 
            href={siteContent.aboutCta.button1.href} 
            sx={{ minWidth: { xs: '100%', sm: 200 } }}
          >
            {siteContent.aboutCta.button1.label}
          </PrimaryButton>
          <SecondaryButton 
            component={Link} 
            href={siteContent.aboutCta.button2.href} 
            sx={{ minWidth: { xs: '100%', sm: 200 } }}
          >
            {siteContent.aboutCta.button2.label}
          </SecondaryButton>
        </Stack>
      </Section>
    </>
  );
}

