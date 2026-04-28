'use client';

import { ReactNode } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrackChangesOutlined from '@mui/icons-material/TrackChangesOutlined';
import AutoModeOutlined from '@mui/icons-material/AutoModeOutlined';
import StorageOutlined from '@mui/icons-material/StorageOutlined';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, ResponsiveImage } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

const PILLAR_ICONS = [
  TrackChangesOutlined,
  AutoModeOutlined,
  StorageOutlined,
  InsightsOutlined,
];

interface KickerProps {
  children: ReactNode;
  color: string;
}

function Kicker({ children, color }: KickerProps) {
  return (
    <Typography
      component="span"
      sx={{
        color,
        fontSize: '0.78125rem',
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        display: 'block',
      }}
    >
      {children}
    </Typography>
  );
}

interface HeadlineProps {
  before: string;
  em: string;
  after: string;
  emColor: string;
  size?: 'lg' | 'md';
}

function Headline({ before, em, after, emColor, size = 'md' }: HeadlineProps) {
  const fontSize =
    size === 'lg'
      ? { xs: '2.5rem', sm: '3rem', md: '4rem', lg: '5rem' }
      : { xs: '2rem', sm: '2.25rem', md: '3rem', lg: '3.25rem' };

  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        mt: 3,
        fontSize,
        fontWeight: 600,
        letterSpacing: '-0.035em',
        lineHeight: 1.05,
        color: 'text.primary',
        textWrap: 'balance',
      }}
    >
      {before}
      <Box
        component="em"
        sx={{
          fontStyle: 'italic',
          fontWeight: 400,
          color: emColor,
        }}
      >
        {em}
      </Box>
      {after}
    </Typography>
  );
}

export default function AboutPage() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const accentColor = isLight ? brandColors.primary : brandColors.secondary;
  const dividerColor = isLight
    ? alpha(brandColors.black, alphaLevels.borderLight)
    : alpha(brandColors.white, alphaLevels.borderDark);
  const elevatedBg = isLight
    ? alpha(brandColors.black, alphaLevels.paperLight)
    : alpha(brandColors.white, alphaLevels.paperDark);
  const accentBlockBg = isLight
    ? brandColors.white
    : alpha(brandColors.white, alphaLevels.altDark);
  const mutedText = isLight
    ? alpha(brandColors.black, alphaLevels.textMuted)
    : alpha(brandColors.white, alphaLevels.textMuted);

  const { aboutHero, aboutWhy, aboutWhat, aboutApproach, aboutVision, aboutCta } =
    siteContent;

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
          <Kicker color={accentColor}>{aboutHero.kicker}</Kicker>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mt: 3,
              fontSize: { xs: '2.75rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
              fontWeight: 600,
              letterSpacing: '-0.045em',
              lineHeight: 1.02,
              maxWidth: '18ch',
              color: 'text.primary',
              textWrap: 'balance',
            }}
          >
            {aboutHero.headline.before}
            <Box
              component="em"
              sx={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: accentColor,
              }}
            >
              {aboutHero.headline.em}
            </Box>
            {aboutHero.headline.after}
          </Typography>
          <Stack
            direction="row"
            spacing={{ xs: 1.5, md: 2.5 }}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: 4, color: 'text.secondary' }}
          >
            {aboutHero.meta.map((item, i) => (
              <Stack
                key={item}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ fontSize: '0.875rem' }}
              >
                {i > 0 && (
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: mutedText,
                    }}
                  />
                )}
                <Typography component="span" sx={{ fontSize: '0.875rem' }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ============= INTRO ============= */}
      <Box
        component="section"
        sx={{
          pt: { xs: 4, md: 8 },
          pb: { xs: 10, md: 14 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: { md: 'sticky' },
                  top: { md: 110 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${dividerColor}`,
                  maxWidth: { xs: 440, md: '100%' },
                  mx: { xs: 'auto', md: 0 },
                  height: { xs: 520, sm: 600, md: 680, lg: 740 },
                }}
              >
                <ResponsiveImage
                  src={aboutHero.photo}
                  alt="Luis David"
                  variant="hero"
                  sx={{ objectPosition: 'center top' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.3125rem' },
                  lineHeight: 1.55,
                  letterSpacing: '-0.01em',
                  color: 'text.primary',
                  textWrap: 'pretty',
                }}
              >
                {aboutHero.lead}
              </Typography>
              <Stack spacing={2.5} sx={{ mt: 3 }}>
                {aboutHero.paragraphs.slice(1).map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: { xs: '1rem', md: '1.0625rem' },
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      textWrap: 'pretty',
                    }}
                  >
                    {p}
                  </Typography>
                ))}
              </Stack>
              <Box
                sx={{
                  mt: 5,
                  height: '1px',
                  width: 80,
                  backgroundColor: dividerColor,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============= WHY ============= */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 3, md: 6 },
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 5, md: 10 }} alignItems="flex-start">
            <Grid item xs={12} md={5}>
              <Kicker color={accentColor}>{aboutWhy.kicker}</Kicker>
              <Headline
                before={aboutWhy.headline.before}
                em={aboutWhy.headline.em}
                after={aboutWhy.headline.after}
                emColor={accentColor}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack spacing={2.5}>
                {aboutWhy.body.map((p, i) => (
                  <Typography
                    key={i}
                    sx={{
                      fontSize: { xs: '1rem', md: '1.0625rem' },
                      lineHeight: 1.75,
                      color: 'text.secondary',
                      textWrap: 'pretty',
                    }}
                  >
                    {p}
                  </Typography>
                ))}
              </Stack>
              <Box
                sx={{
                  mt: 4,
                  px: { xs: 3, md: 3.5 },
                  py: 3,
                  borderLeft: `2px solid ${accentColor}`,
                  borderRadius: '0 12px 12px 0',
                  backgroundColor: accentBlockBg,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.0625rem' },
                    lineHeight: 1.6,
                    color: 'text.primary',
                  }}
                >
                  {aboutWhy.accent}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ============= WHAT I DO ============= */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 4, md: 7 }}
            alignItems="flex-end"
            sx={{ mb: { xs: 5, md: 7 } }}
          >
            <Grid item xs={12} md={5}>
              <Kicker color={accentColor}>{aboutWhat.kicker}</Kicker>
              <Headline
                before={aboutWhat.headline.before}
                em={aboutWhat.headline.em}
                after={aboutWhat.headline.after}
                emColor={accentColor}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.0625rem' },
                  lineHeight: 1.65,
                  color: 'text.secondary',
                  maxWidth: 480,
                }}
              >
                {aboutWhat.description}
              </Typography>
            </Grid>
          </Grid>

          <Box>
            {aboutWhat.areas.map((area, i) => (
              <Grid
                key={i}
                container
                spacing={{ xs: 1.5, md: 5 }}
                sx={{
                  py: { xs: 4, md: 4.5 },
                  borderTop: `1px solid ${dividerColor}`,
                  ...(i === aboutWhat.areas.length - 1 && {
                    borderBottom: `1px solid ${dividerColor}`,
                  }),
                }}
                alignItems="flex-start"
              >
                <Grid item xs={12} md="auto">
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      color: mutedText,
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      pt: { md: 0.75 },
                      fontVariantNumeric: 'tabular-nums',
                      minWidth: { md: 60 },
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.375rem' },
                      fontWeight: 500,
                      letterSpacing: '-0.025em',
                      lineHeight: 1.2,
                      color: 'text.primary',
                    }}
                  >
                    {area.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9375rem', md: '0.9688rem' },
                      lineHeight: 1.65,
                      color: 'text.secondary',
                      textWrap: 'pretty',
                    }}
                  >
                    {area.description}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ============= APPROACH (4 PILLARS) ============= */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 3, md: 6 },
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 720, mb: { xs: 5, md: 7 } }}>
            <Kicker color={accentColor}>{aboutApproach.kicker}</Kicker>
            <Headline
              before={aboutApproach.headline.before}
              em={aboutApproach.headline.em}
              after={aboutApproach.headline.after}
              emColor={accentColor}
            />
            <Typography
              sx={{
                mt: 2.5,
                fontSize: { xs: '1rem', md: '1.0625rem' },
                lineHeight: 1.7,
                color: 'text.secondary',
              }}
            >
              {aboutApproach.description}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {aboutApproach.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? TrackChangesOutlined;
              return (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Box
                    sx={{
                      height: '100%',
                      p: { xs: 3, md: 3.5 },
                      borderRadius: 2,
                      border: `1px solid ${dividerColor}`,
                      backgroundColor: isLight
                        ? brandColors.white
                        : brandColors.black,
                      transition:
                        'border-color 0.25s ease, transform 0.25s ease',
                      '&:hover': {
                        borderColor: accentColor,
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.25,
                        border: `1px solid ${dividerColor}`,
                        display: 'grid',
                        placeItems: 'center',
                        color: accentColor,
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Typography
                      component="h4"
                      sx={{
                        mt: 3,
                        fontSize: '1.0625rem',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                      }}
                    >
                      {pillar.title}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: '0.875rem',
                        lineHeight: 1.55,
                        color: 'text.secondary',
                      }}
                    >
                      {pillar.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* ============= VISION ============= */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 3, md: 6 },
        }}
      >
        <Container maxWidth="md">
          <Kicker color={accentColor}>{aboutVision.kicker}</Kicker>
          <Box sx={{ mt: 3 }}>
            <Typography
              component="span"
              sx={{
                fontSize: '4rem',
                fontWeight: 300,
                color: accentColor,
                lineHeight: 0.5,
                display: 'inline-block',
                mb: 1.5,
              }}
            >
              “
            </Typography>
            <Typography
              component="blockquote"
              sx={{
                m: 0,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                fontWeight: 400,
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                color: 'text.primary',
                textWrap: 'balance',
              }}
            >
              {aboutVision.quote.before}
              <Box
                component="em"
                sx={{
                  fontStyle: 'italic',
                  color: accentColor,
                }}
              >
                {aboutVision.quote.em}
              </Box>
              {aboutVision.quote.after}
            </Typography>
          </Box>

          <Divider sx={{ mt: 6, mb: 4, borderColor: dividerColor }} />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: `1px solid ${dividerColor}`,
                display: 'grid',
                placeItems: 'center',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: 'text.primary',
              }}
            >
              {aboutVision.signatureInitials}
            </Box>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              <Box
                component="strong"
                sx={{ color: 'text.primary', fontWeight: 500 }}
              >
                {aboutVision.signatureName}
              </Box>
              {' — '}
              {aboutVision.signatureRole}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* ============= CTA ============= */}
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 15 },
          px: { xs: 3, md: 6 },
          textAlign: 'center',
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
        }}
      >
        <Container maxWidth="md">
          <Kicker color={accentColor}>{aboutCta.kicker}</Kicker>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mt: 2.5,
              mx: 'auto',
              fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.75rem', lg: '4rem' },
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              maxWidth: '18ch',
              color: 'text.primary',
              textWrap: 'balance',
            }}
          >
            {aboutCta.headline.before}
            <Box
              component="em"
              sx={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: accentColor,
              }}
            >
              {aboutCta.headline.em}
            </Box>
            {aboutCta.headline.after}
          </Typography>
          <Typography
            sx={{
              mt: 2.5,
              mx: 'auto',
              maxWidth: 520,
              fontSize: { xs: '1rem', md: '1.0625rem' },
              lineHeight: 1.65,
              color: 'text.secondary',
            }}
          >
            {aboutCta.description}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4.5 }}
          >
            <PrimaryButton
              component={Link}
              href={aboutCta.button1.href}
              target={
                aboutCta.button1.href.startsWith('http') ? '_blank' : undefined
              }
              rel={
                aboutCta.button1.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              sx={{ minWidth: { xs: '100%', sm: 200 } }}
            >
              {aboutCta.button1.label}
            </PrimaryButton>
            <SecondaryButton
              component={Link}
              href={aboutCta.button2.href}
              sx={{ minWidth: { xs: '100%', sm: 200 } }}
            >
              {aboutCta.button2.label}
            </SecondaryButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
