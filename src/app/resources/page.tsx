'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ResourceCard, LeadCaptureForm } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

export default function ResourcesPage() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const { resources, newsletter } = siteContent;

  const accentColor = isLight ? brandColors.primary : brandColors.secondary;
  const dividerColor = isLight
    ? alpha(brandColors.black, alphaLevels.borderLight)
    : alpha(brandColors.white, alphaLevels.borderDark);
  const elevatedBg = isLight
    ? alpha(brandColors.black, alphaLevels.paperLight)
    : alpha(brandColors.white, alphaLevels.paperDark);
  const mutedText = isLight
    ? alpha(brandColors.black, alphaLevels.textMuted)
    : alpha(brandColors.white, alphaLevels.textMuted);

  return (
    <>
      {/* ============= HERO ============= */}
      <Box
        component="section"
        sx={{
          pt: { xs: 14, md: 18 },
          pb: { xs: 6, md: 8 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="span"
            sx={{
              display: 'block',
              color: accentColor,
              fontSize: '0.78125rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {resources.subtitle}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mt: 3,
              fontSize: { xs: '2.5rem', sm: '3.25rem', md: '4.5rem', lg: '5.5rem' },
              fontWeight: 600,
              letterSpacing: '-0.045em',
              lineHeight: 1.04,
              maxWidth: '20ch',
              color: 'text.primary',
              textWrap: 'balance',
            }}
          >
            {resources.headline.before}
            <Box
              component="em"
              sx={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: accentColor,
              }}
            >
              {resources.headline.em}
            </Box>
            {resources.headline.after}
          </Typography>
          <Typography
            sx={{
              mt: 3,
              maxWidth: 720,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              color: 'text.secondary',
              textWrap: 'pretty',
            }}
          >
            {resources.lead}
          </Typography>
        </Container>
      </Box>

      {/* ============= RESOURCES GRID ============= */}
      <Box
        component="section"
        sx={{
          pt: { xs: 4, md: 6 },
          pb: { xs: 10, md: 15 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          {resources.items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography
                sx={{
                  fontSize: '1.0625rem',
                  color: 'text.secondary',
                }}
              >
                {resources.emptyMessage}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {resources.items.map((resource) => (
                <Grid item xs={12} sm={6} lg={4} key={resource.slug}>
                  <ResourceCard
                    slug={resource.slug}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    tags={resource.tags}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* ============= NEWSLETTER ============= */}
      <Box
        component="section"
        id="newsletter"
        sx={{
          py: { xs: 12, md: 18 },
          px: { xs: 3, md: 6 },
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            component="span"
            sx={{
              display: 'block',
              color: accentColor,
              fontSize: '0.78125rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {newsletter.subtitle}
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mt: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.25rem', lg: '3.75rem' },
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: 'text.primary',
              textWrap: 'balance',
            }}
          >
            {newsletter.headline.before}
            <Box
              component="em"
              sx={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: accentColor,
              }}
            >
              {newsletter.headline.em}
            </Box>
            {newsletter.headline.after}
          </Typography>
          <Typography
            sx={{
              mt: 2.5,
              mx: 'auto',
              maxWidth: 520,
              fontSize: { xs: '1rem', md: '1.0625rem' },
              lineHeight: 1.6,
              color: 'text.secondary',
            }}
          >
            {newsletter.description}
          </Typography>

          <Box sx={{ mt: 5 }}>
            <LeadCaptureForm />
          </Box>

          <Typography
            sx={{
              mt: 2.5,
              fontSize: '0.6875rem',
              color: mutedText,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {newsletter.fine}
          </Typography>
        </Container>
      </Box>
    </>
  );
}
