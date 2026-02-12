'use client';

import { Grid, Container, Typography, Box } from '@mui/material';
import { Section, ResourceCard, LeadCaptureForm } from '@/components';
import { siteContent } from '@/content/site';

export default function ResourcesPage() {
  const { resources } = siteContent;

  return (
    <>
      {/* Hero Section */}
      <Section
        id="resources-hero"
        title={resources.title}
        subtitle={resources.subtitle}
        background="default"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 720,
            mx: 'auto',
            textAlign: 'center',
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.6,
          }}
        >
          {resources.description}
        </Typography>
      </Section>

      {/* Resources Grid */}
      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
        {resources.items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {resources.emptyMessage}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {resources.items.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource.slug}>
                <ResourceCard
                  slug={resource.slug}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  tags={resource.tags}
                  downloadUrl={resource.downloadUrl}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Newsletter Section */}
      <Section
        id="resources-newsletter"
        title={siteContent.newsletter.title}
        subtitle={siteContent.newsletter.subtitle}
        background="alt"
        centered
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center',
            mb: 3,
          }}
        >
          {siteContent.newsletter.description}
        </Typography>
        <LeadCaptureForm />
      </Section>
    </>
  );
}
