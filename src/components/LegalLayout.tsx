'use client';

import { Container, Typography, Box, Stack, Divider } from '@mui/material';
import { Section } from '@/components';
import { brandColors } from '@/theme/tokens';
import { alpha } from '@mui/material/styles';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const dateColor = alpha(brandColors.black, 0.6);

  return (
    <Box sx={{ minHeight: '80vh', pt: { xs: 12, md: 16 }, pb: 10 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box component="header" sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              color: 'primary.main',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: dateColor,
              fontStyle: 'italic',
            }}
          >
            Última actualización: {lastUpdated}
          </Typography>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Content Wrapper */}
        <Box
          component="article"
          sx={{
            '& h3': {
              color: 'text.primary',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              mt: 4,
              mb: 2,
            },
            '& p': {
              color: 'text.secondary',
              lineHeight: 1.8,
              mb: 2,
              fontSize: { xs: '1rem', md: '1.05rem' },
            },
            '& ul': {
              pl: 3,
              mb: 2,
              color: 'text.secondary',
            },
            '& li': {
              mb: 1,
              lineHeight: 1.7,
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
