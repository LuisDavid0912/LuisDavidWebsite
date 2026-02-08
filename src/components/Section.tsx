import { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  background?: 'default' | 'paper';
  centered?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  background = 'default',
  centered = false,
}: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: background === 'paper' ? 'background.paper' : 'background.default',
      }}
    >
      <Container maxWidth="lg">
        {(title || subtitle) && (
          <Box
            sx={{
              mb: 6,
              textAlign: centered ? 'center' : 'left',
            }}
          >
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 1,
                }}
              >
                {subtitle}
              </Typography>
            )}
            {title && (
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  color: 'text.primary',
                }}
              >
                {title}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}
