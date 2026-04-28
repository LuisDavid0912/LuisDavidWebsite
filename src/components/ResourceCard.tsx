'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined';
import { brandColors, alphaLevels } from '@/theme/tokens';
import { siteContent } from '@/content/site';

interface ResourceCardProps {
  slug: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
}

export default function ResourceCard({
  slug,
  title,
  description,
  type,
  tags,
}: ResourceCardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const accentColor = isLight ? brandColors.primary : brandColors.secondary;
  const borderColor = isLight
    ? alpha(brandColors.black, alphaLevels.borderLight)
    : alpha(brandColors.white, alphaLevels.borderDark);
  const borderStrong = isLight
    ? alpha(brandColors.black, alphaLevels.borderDark)
    : alpha(brandColors.white, 0.25);
  const cardBg = isLight ? brandColors.white : brandColors.black;
  const mutedText = isLight
    ? alpha(brandColors.black, alphaLevels.textMuted)
    : alpha(brandColors.white, alphaLevels.textMuted);

  const eyebrow = (tags[0] ?? type).toUpperCase();
  const formatLabel = type === 'video' ? 'Video · gratis' : 'PDF · gratis';
  const ctaLabel = siteContent.resources.form.viewButtonLabel;

  return (
    <Box
      component={Link}
      href={`/resources/${slug}/`}
      aria-label={title}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 300,
        p: { xs: 3, md: 4 },
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        backgroundColor: cardBg,
        textDecoration: 'none',
        color: 'inherit',
        transition:
          'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          borderColor: accentColor,
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px -8px ${alpha(brandColors.primary, alphaLevels.shadowPrimaryHover)}`,
        },
        '&:hover .res-cta': {
          gap: 1.25,
        },
        '&:hover .res-cta-arrow': {
          transform: 'translateX(2px)',
        },
        '&:focus-visible': {
          outline: `2px solid ${accentColor}`,
          outlineOffset: 2,
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          display: 'inline-block',
          fontSize: '0.65625rem',
          color: accentColor,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {eyebrow}
      </Typography>

      <Typography
        component="h3"
        sx={{
          mt: 2.5,
          fontSize: { xs: '1.25rem', md: '1.375rem' },
          fontWeight: 500,
          letterSpacing: '-0.025em',
          lineHeight: 1.2,
          color: 'text.primary',
          textWrap: 'balance',
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1.75,
          fontSize: { xs: '0.875rem', md: '0.9375rem' },
          lineHeight: 1.6,
          color: 'text.secondary',
          textWrap: 'pretty',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </Typography>

      <Box
        sx={{
          mt: 'auto',
          pt: 3,
          borderTop: `1px solid ${borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          rowGap: 1.5,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: '0.6875rem',
            color: mutedText,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {formatLabel}
        </Typography>
        <Box
          className="res-cta"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 999,
            backgroundColor: brandColors.primary,
            color: brandColors.white,
            fontSize: '0.8125rem',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            transition: 'gap 0.2s ease',
            boxShadow: `0 4px 14px 0 ${alpha(brandColors.primary, alphaLevels.shadowButton)}`,
          }}
        >
          {ctaLabel}
          <ArrowForwardOutlined
            className="res-cta-arrow"
            sx={{
              fontSize: 16,
              transition: 'transform 0.2s ease',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
