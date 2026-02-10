'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { brandColors } from '@/theme/tokens';
import { alpha } from '@mui/material/styles';

export type ImageVariant = 'hero' | 'portrait' | 'card' | 'logo';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  variant?: ImageVariant;
  priority?: boolean;
  aspectRatio?: string; // e.g. "4/3", "16/9", "1/1"
  sx?: SxProps<Theme>;
  className?: string;
}

export default function ResponsiveImage({
  src,
  alt,
  variant = 'card',
  priority = false,
  aspectRatio,
  sx = {},
  className,
}: ResponsiveImageProps) {
  // Base styles for all images
  const baseStyles: SxProps<Theme> = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto', // default, overridden by specific variants if needed
    backgroundColor: alpha(brandColors.black, 0.05), // placeholder background
  };

  // Variant-specific styles
  const variantStyles: Record<ImageVariant, SxProps<Theme>> = {
    hero: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
    },
    portrait: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    card: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    logo: {
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
    },
  };

  // Container styles if aspectRatio is provided to prevent layout shift
  const containerStyles: SxProps<Theme> = aspectRatio
    ? {
        aspectRatio: aspectRatio,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        '& img': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      }
    : {};

  const ImageElement = (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      sx={{
        ...baseStyles,
        ...(aspectRatio ? { width: '100%', height: '100%' } : variantStyles[variant]),
        ...sx,
      } as any}
      className={className}
    />
  );

  if (aspectRatio) {
    return <Box sx={containerStyles}>{ImageElement}</Box>;
  }

  return ImageElement;
}
