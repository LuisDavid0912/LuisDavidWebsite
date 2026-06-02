'use client';

import { Box, Typography, Stack, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import {
  PrimaryButton,
  SecondaryButton,
  ResponsiveImage,
  LeadCaptureForm,
} from '@/components';
import {
  Kicker,
  Headline,
  MONO_FONT,
  VizLearning,
  VizStack,
  VizIntegrate,
  VizFunnelDrop,
  VizBroadcast,
  VizDashboard,
  VizGears,
} from '@/components/editorial';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

/* Palabra de la headline del hero que se destaca en itálica/acento. */
const HERO_EM = 'Inteligencia Artificial';

/* Viz por ejemplo — set propio del inicio (no se repite con /about).
   0: captación → embudo+CRM · 1: marketing → megáfono · 2: dashboards → panel · 3: procesos → engranajes */
const EXAMPLE_VIZ_RENDERERS = [
  (color: string, line: string) => <VizFunnelDrop color={color} lineColor={line} />,
  (color: string, line: string) => <VizBroadcast color={color} lineColor={line} />,
  (color: string, line: string) => <VizDashboard color={color} lineColor={line} />,
  (color: string, line: string) => <VizGears color={color} lineColor={line} />,
];

export default function Home() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const accentColor = isLight ? brandColors.primary : brandColors.secondary;
  const dividerColor = isLight
    ? alpha(brandColors.black, alphaLevels.borderLight)
    : alpha(brandColors.white, alphaLevels.borderDark);
  const dividerStrong = isLight
    ? alpha(brandColors.black, alphaLevels.borderDark)
    : alpha(brandColors.white, 0.22);
  const elevatedBg = isLight
    ? alpha(brandColors.black, alphaLevels.paperLight)
    : alpha(brandColors.white, alphaLevels.paperDark);
  const mutedText = isLight
    ? alpha(brandColors.black, alphaLevels.textMuted)
    : alpha(brandColors.white, alphaLevels.textMuted);
  const faintText = isLight
    ? alpha(brandColors.black, 0.4)
    : alpha(brandColors.white, 0.4);
  const cardBg = isLight ? brandColors.white : brandColors.black;

  const {
    hero,
    homeContext,
    homeWhatIDo,
    homeMethodology,
    homeExamples,
    newsletter,
    homeCta,
    aboutVision,
  } = siteContent;

  // Split del headline del hero para italizar "Inteligencia Artificial"
  const heroParts = hero.headline.split(HERO_EM);
  const heroBefore = heroParts[0] ?? hero.headline;
  const heroAfter = heroParts.length > 1 ? heroParts.slice(1).join(HERO_EM) : '';
  const heroHasEm = heroParts.length > 1;

  // Grids responsivos — mismo sistema visual que /about
  const heroCols = { xs: '1fr', lg: '1.1fr 1fr' };
  const splitCols = { xs: '1fr', lg: '1fr 1fr' };
  const bentoCols = { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(6, 1fr)' };
  const stepCols = { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' };
  const exampleCols = { xs: '1fr', sm: 'repeat(2, 1fr)' };

  // Justificación de cuerpos de texto (md+), conservada del diseño original
  const bodyJustify = { xs: 'left', md: 'justify' } as const;

  const sectionX = { xs: 2.75, sm: 3.5, md: 6 };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <Box
        component="section"
        id="inicio"
        sx={{
          position: 'relative',
          pt: { xs: 13, md: 17 },
          pb: { xs: 11, md: 16 },
          px: sectionX,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(900px 600px at 80% 0%, ${alpha(accentColor, 0.08)}, transparent 60%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 1320,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: heroCols,
            gap: { xs: 6, lg: 9 },
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left: stamp + eyebrow + headline + subheadline + CTAs */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.75}
              sx={{
                mb: { xs: 3.5, md: 4 },
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: mutedText,
                fontFamily: MONO_FONT,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: accentColor,
                  boxShadow: `0 0 14px ${accentColor}`,
                }}
              />
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                {aboutVision.signatureName}
              </Box>
              <Box sx={{ width: 28, height: '1px', backgroundColor: dividerStrong }} />
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                LD · 2026
              </Box>
            </Stack>

            <Typography
              sx={{
                mb: { xs: 2, md: 2.5 },
                fontSize: { xs: '0.95rem', md: '1.0625rem' },
                fontWeight: 500,
                color: accentColor,
                letterSpacing: '-0.01em',
              }}
            >
              {hero.preHeadline}
            </Typography>

            <Headline
              before={heroBefore}
              em={heroHasEm ? HERO_EM : ''}
              after={heroAfter}
              emColor={accentColor}
              size="hero"
            />

            <Typography
              sx={{
                mt: { xs: 3.5, md: 4.5 },
                maxWidth: 560,
                fontSize: { xs: '1rem', md: '1.1875rem' },
                lineHeight: 1.7,
                color: 'text.secondary',
                textAlign: bodyJustify,
                textWrap: 'pretty',
              }}
            >
              {hero.subheadline}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.75}
              sx={{ mt: { xs: 4, md: 5 } }}
            >
              <PrimaryButton component={Link} href={hero.ctaPrimary.href}>
                {hero.ctaPrimary.label}
              </PrimaryButton>
              <SecondaryButton
                component={Link}
                href={hero.ctaSecondary.href}
                target={
                  hero.ctaSecondary.href.startsWith('http') ? '_blank' : undefined
                }
                rel={
                  hero.ctaSecondary.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {hero.ctaSecondary.label}
              </SecondaryButton>
            </Stack>
          </Box>

          {/* Right: portrait card */}
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: 3,
              overflow: 'hidden',
              border: `1px solid ${dividerStrong}`,
              maxWidth: { xs: 440, lg: '100%' },
              mx: { xs: 'auto', lg: 0 },
              width: '100%',
              boxShadow: `0 30px 80px -30px ${alpha(accentColor, 0.25)}, 0 0 0 1px ${alpha(accentColor, 0.06)}`,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              },
            }}
          >
            <ResponsiveImage
              src="/images/photos/originales/BCruzadoManos.jpg"
              alt={aboutVision.signatureName}
              variant="hero"
              priority
              sx={{ objectPosition: 'center 20%' }}
            />
            {/* Top ticket */}
            <Box
              sx={{
                position: 'absolute',
                top: 18,
                left: 18,
                right: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                color: brandColors.white,
                textShadow: `0 1px 4px ${alpha(brandColors.black, 0.4)}`,
                fontSize: '0.65625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontFamily: MONO_FONT,
                zIndex: 2,
              }}
            >
              <Box>{aboutVision.signatureInitials}</Box>
              <Box sx={{ textAlign: 'right', opacity: 0.85 }}>4 : 5</Box>
            </Box>
            {/* Bottom foot */}
            <Box
              sx={{
                position: 'absolute',
                left: 18,
                right: 18,
                bottom: 18,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1.5,
                zIndex: 2,
                color: brandColors.white,
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: MONO_FONT,
              }}
            >
              <Box component="span">{aboutVision.signatureName}</Box>
              <Box component="span" sx={{ color: accentColor }}>
                {aboutVision.signatureRole}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ===================== § 01 · CONTEXTO ===================== */}
      <Box
        component="section"
        id="contexto"
        sx={{
          py: { xs: 12, md: 16 },
          px: sectionX,
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2.25}
            sx={{
              mb: { xs: 5, md: 7 },
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: accentColor,
              fontFamily: MONO_FONT,
              flexWrap: 'wrap',
              rowGap: 1,
            }}
          >
            <Box component="span" sx={{ color: faintText }}>
              § 01
            </Box>
            <Box component="span">{homeContext.kicker}</Box>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: dividerColor, minWidth: 40 }} />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: splitCols,
              gap: { xs: 4.5, lg: 10 },
              alignItems: 'start',
            }}
          >
            <Headline
              before={homeContext.headline.before}
              em={homeContext.headline.em}
              after={homeContext.headline.after}
              emColor={accentColor}
              size="lg"
            />
            <Stack spacing={2.75} sx={{ pt: { lg: 1 } }}>
              {homeContext.paragraphs.map((p, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: { xs: '1rem', md: '1.0625rem' },
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    textAlign: bodyJustify,
                    textWrap: 'pretty',
                  }}
                >
                  {p}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* 3 bloques */}
          <Box
            sx={{
              mt: { xs: 6, md: 9 },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {homeContext.blocks.map((block, i) => (
              <Box
                key={i}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${dividerColor}`,
                  borderRadius: 3,
                  backgroundColor: cardBg,
                  p: { xs: 3, md: 3.75 },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  '&:hover': {
                    borderColor: accentColor,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Box
                  sx={{
                    fontFamily: MONO_FONT,
                    fontSize: '0.6875rem',
                    color: accentColor,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    mt: 2,
                    fontSize: { xs: '1.1875rem', md: '1.3125rem' },
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    color: 'text.primary',
                  }}
                >
                  {block.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 1.75,
                    fontSize: '0.90625rem',
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: bodyJustify,
                  }}
                >
                  {block.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ===================== § 02 · QUÉ HAGO (BENTO) ===================== */}
      <Box
        component="section"
        id="que-hago"
        sx={{
          py: { xs: 12, md: 16 },
          px: sectionX,
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: { xs: 3, lg: 8 },
              alignItems: 'end',
              mb: { xs: 5, md: 7 },
            }}
          >
            <Box>
              <Kicker color={accentColor} mono>
                § 02 · {homeWhatIDo.kicker}
              </Kicker>
              <Box sx={{ mt: 2.25 }}>
                <Headline
                  before={homeWhatIDo.headline.before}
                  em={homeWhatIDo.headline.em}
                  after={homeWhatIDo.headline.after}
                  emColor={accentColor}
                  size="md"
                />
              </Box>
            </Box>
            <Stack spacing={1.5} sx={{ maxWidth: 460 }}>
              {homeWhatIDo.paragraphs.map((p, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: bodyJustify,
                  }}
                >
                  {p}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Bento grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: bentoCols,
              gap: 2,
            }}
          >
            {homeWhatIDo.areas.map((area, i) => {
              const isWide = i === 2;
              return (
                <Box
                  key={i}
                  sx={{
                    gridColumn: {
                      xs: 'span 2',
                      lg: isWide ? 'span 6' : 'span 3',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${dividerColor}`,
                    borderRadius: 3,
                    backgroundColor: elevatedBg,
                    p: { xs: 3, md: 3.75 },
                    minHeight: { xs: 320, md: isWide ? 280 : 360 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.25s ease, transform 0.25s ease',
                    '&:hover': {
                      borderColor: accentColor,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {isWide ? (
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                        gap: { xs: 3, md: 5 },
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              fontFamily: MONO_FONT,
                              fontSize: '0.6875rem',
                              color: accentColor,
                              letterSpacing: '0.16em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {String(i + 1).padStart(2, '0')} — {area.title.toUpperCase()}
                          </Box>
                          <Typography
                            component="h3"
                            sx={{
                              mt: 2,
                              fontSize: { xs: '1.25rem', md: '1.375rem' },
                              fontWeight: 500,
                              letterSpacing: '-0.025em',
                              lineHeight: 1.2,
                              color: 'text.primary',
                            }}
                          >
                            {area.title}
                          </Typography>
                          <Typography
                            sx={{
                              mt: 1.75,
                              fontSize: '0.90625rem',
                              color: 'text.secondary',
                              lineHeight: 1.6,
                              textAlign: bodyJustify,
                            }}
                          >
                            {area.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          minHeight: 180,
                          border: `1px dashed ${dividerStrong}`,
                          borderRadius: 1.5,
                          p: 1.75,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <VizIntegrate color={accentColor} lineColor={dividerStrong} />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box>
                        <Box
                          sx={{
                            fontFamily: MONO_FONT,
                            fontSize: '0.6875rem',
                            color: accentColor,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')} — {area.title.toUpperCase()}
                        </Box>
                        <Typography
                          component="h3"
                          sx={{
                            mt: 2,
                            fontSize: { xs: '1.25rem', md: '1.375rem' },
                            fontWeight: 500,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.2,
                            color: 'text.primary',
                          }}
                        >
                          {area.title}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 1.75,
                            fontSize: '0.90625rem',
                            color: 'text.secondary',
                            lineHeight: 1.6,
                            textAlign: bodyJustify,
                          }}
                        >
                          {area.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: 2.75,
                          minHeight: 100,
                          border: `1px dashed ${dividerStrong}`,
                          borderRadius: 1.5,
                          p: 1.75,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {i === 0 ? (
                          <VizLearning color={accentColor} lineColor={dividerStrong} />
                        ) : (
                          <VizStack color={accentColor} lineColor={dividerStrong} />
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* ===================== § 03 · METODOLOGÍA ===================== */}
      <Box
        component="section"
        id="metodologia"
        sx={{
          py: { xs: 12, md: 16 },
          px: sectionX,
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: 'auto' }}>
          <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 6 } }}>
            <Kicker color={accentColor} mono>
              § 03 · {homeMethodology.kicker}
            </Kicker>
            <Box sx={{ mt: 2.25 }}>
              <Headline
                before={homeMethodology.headline.before}
                em={homeMethodology.headline.em}
                after={homeMethodology.headline.after}
                emColor={accentColor}
                size="md"
              />
            </Box>
          </Box>

          {/* Step strip */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: stepCols,
              borderTop: `1px solid ${dividerColor}`,
              borderBottom: `1px solid ${dividerColor}`,
            }}
          >
            {homeMethodology.steps.map((step, i) => (
              <Box
                key={i}
                sx={{
                  p: { xs: 3.5, md: 4 },
                  borderRight: {
                    xs: 'none',
                    sm: i % 2 === 0 ? `1px solid ${dividerColor}` : 'none',
                    lg:
                      i < homeMethodology.steps.length - 1
                        ? `1px solid ${dividerColor}`
                        : 'none',
                  },
                  borderBottom: {
                    xs:
                      i < homeMethodology.steps.length - 1
                        ? `1px solid ${dividerColor}`
                        : 'none',
                    sm: i < 2 ? `1px solid ${dividerColor}` : 'none',
                    lg: 'none',
                  },
                  position: 'relative',
                }}
              >
                {/* Timeline node + connector */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      border: `2px solid ${accentColor}`,
                      backgroundColor: cardBg,
                      boxShadow: `0 0 12px ${alpha(accentColor, 0.45)}`,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, height: '1px', backgroundColor: dividerStrong, ml: 1 }} />
                </Box>
                <Box
                  sx={{
                    fontFamily: MONO_FONT,
                    fontSize: '0.6875rem',
                    color: accentColor,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.step}
                </Box>
                <Typography
                  component="h3"
                  sx={{
                    mt: 1.5,
                    fontSize: '1.1875rem',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textAlign: bodyJustify,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: { xs: 6, md: 7.5 } }}>
            <PrimaryButton
              component={Link}
              href={homeMethodology.cta.href}
              sx={{ minWidth: { xs: '100%', sm: 220 } }}
            >
              {homeMethodology.cta.label}
            </PrimaryButton>
          </Box>
        </Box>
      </Box>

      {/* ===================== § 04 · EJEMPLOS ===================== */}
      <Box
        component="section"
        id="ejemplos"
        sx={{
          py: { xs: 12, md: 16 },
          px: sectionX,
        }}
      >
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 7 } }}>
            <Kicker color={accentColor} mono>
              § 04 · {homeExamples.kicker}
            </Kicker>
            <Box sx={{ mt: 2.25 }}>
              <Headline
                before={homeExamples.headline.before}
                em={homeExamples.headline.em}
                after={homeExamples.headline.after}
                emColor={accentColor}
                size="md"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: exampleCols,
              gap: 2,
            }}
          >
            {homeExamples.examples.map((example, i) => {
              const renderViz =
                EXAMPLE_VIZ_RENDERERS[i] ?? EXAMPLE_VIZ_RENDERERS[0];
              return (
                <Box
                  key={i}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${dividerColor}`,
                    borderRadius: 3,
                    backgroundColor: elevatedBg,
                    p: { xs: 3, md: 3.75 },
                    minHeight: { xs: 'auto', md: 280 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.25s ease, transform 0.25s ease',
                    '&:hover': {
                      borderColor: accentColor,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        fontFamily: MONO_FONT,
                        fontSize: '0.6875rem',
                        color: accentColor,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                      }}
                    >
                      E.{String(i + 1).padStart(2, '0')} — {example.title.toUpperCase()}
                    </Box>
                    <Typography
                      component="h3"
                      sx={{
                        mt: 2,
                        fontSize: { xs: '1.25rem', md: '1.375rem' },
                        fontWeight: 500,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.2,
                        color: 'text.primary',
                      }}
                    >
                      {example.title}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 1.75,
                        fontSize: '0.9375rem',
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        textAlign: bodyJustify,
                      }}
                    >
                      {example.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mt: 2.75,
                      minHeight: 100,
                      border: `1px dashed ${dividerStrong}`,
                      borderRadius: 1.5,
                      p: 1.75,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {renderViz(accentColor, dividerStrong)}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* ===================== NEWSLETTER ===================== */}
      <Box
        component="section"
        id="newsletter"
        sx={{
          py: { xs: 12, md: 16 },
          px: sectionX,
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Box sx={{ maxWidth: 880, mx: 'auto', textAlign: 'center' }}>
          <Kicker color={accentColor} mono>
            {newsletter.subtitle}
          </Kicker>
          <Box sx={{ mt: 2.5 }}>
            <Headline
              before={newsletter.headline.before}
              em={newsletter.headline.em}
              after={newsletter.headline.after}
              emColor={accentColor}
              size="md"
            />
          </Box>
          <Typography
            sx={{
              mt: 2.5,
              mx: 'auto',
              maxWidth: 600,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              textAlign: { xs: 'center', md: 'justify' },
            }}
          >
            {newsletter.description}
          </Typography>
          <Box sx={{ mt: 5 }}>
            <LeadCaptureForm />
          </Box>
        </Box>
      </Box>

      {/* ===================== CTA ===================== */}
      <Box
        component="section"
        id="contacto-cta"
        sx={{
          py: { xs: 13, md: 17 },
          px: sectionX,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(700px 380px at 50% 0%, ${alpha(accentColor, 0.08)}, transparent 65%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ maxWidth: 880, mx: 'auto', position: 'relative' }}>
          <Kicker color={accentColor} mono>
            {homeCta.subtitle}
          </Kicker>
          <Box sx={{ mt: 2.5 }}>
            <Headline
              before={homeCta.headline.before}
              em={homeCta.headline.em}
              after={homeCta.headline.after}
              emColor={accentColor}
              size="lg"
            />
          </Box>
          <Typography
            sx={{
              mt: 3,
              mx: 'auto',
              maxWidth: 600,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              color: 'text.secondary',
              textAlign: { xs: 'center', md: 'justify' },
            }}
          >
            {homeCta.description}
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
              href={homeCta.buttonHref}
              sx={{ minWidth: { xs: '100%', sm: 220 } }}
            >
              {homeCta.buttonLabel}
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
