'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

/* ── Helper: icon by resource type ── */
function ResourceTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'video':
      return <OndemandVideoIcon sx={{ fontSize: { xs: 48, md: 64 }, color: 'primary.main' }} />;
    case 'pdf':
    default:
      return <PictureAsPdfIcon sx={{ fontSize: { xs: 48, md: 64 }, color: 'primary.main' }} />;
  }
}

interface ResourceDetailContentProps {
  slug: string;
}

export default function ResourceDetailContent({ slug }: ResourceDetailContentProps) {
  const { resources } = siteContent;
  const resource = resources.items.find((r) => r.slug === slug);

  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Guard: should never happen since generateStaticParams constrains slugs
  if (!resource) return null;

  return (
    <>
      {/* Back link */}
      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 } }}>
        <SecondaryButton
          component={Link}
          href="/resources/"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          {resources.backLabel}
        </SecondaryButton>
      </Container>

      {/* Hero section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: alpha(brandColors.primary, 0.04),
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            alignItems={{ md: 'center' }}
          >
            {/* Icon bubble */}
            <Box
              sx={{
                width: { xs: 100, md: 140 },
                height: { xs: 100, md: 140 },
                minWidth: { xs: 100, md: 140 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(brandColors.secondary, 0.15),
                mx: { xs: 'auto', md: 0 },
              }}
            >
              <ResourceTypeIcon type={resource.type} />
            </Box>

            {/* Title + Tags + short description */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 800,
                  color: 'text.primary',
                  mb: 1.5,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                {resource.title}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}
              >
                {resource.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  maxWidth: 720,
                  textAlign: { xs: 'center', md: 'justify' },
                }}
              >
                {resource.description}
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Detail content */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          {/* Long description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.8,
              mb: { xs: 4, md: 5 },
              textAlign: 'justify',
            }}
          >
            {resource.longDescription}
          </Typography>

          {/* Highlights */}
          <Box
            sx={{
              backgroundColor: alpha(brandColors.primary, 0.04),
              borderRadius: 3,
              p: { xs: 3, md: 4 },
              mb: { xs: 4, md: 5 },
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2.5,
                fontSize: { xs: '1.15rem', md: '1.35rem' },
                color: 'text.primary',
              }}
            >
              ¿Qué incluye?
            </Typography>
            <Stack spacing={1.5}>
              {resource.highlights.map((highlight) => (
                <Stack key={highlight} direction="row" spacing={1.5} alignItems="flex-start">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: { xs: 20, md: 22 },
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      lineHeight: 1.5,
                    }}
                  >
                    {highlight}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* CTA section */}
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                mb: 3,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              {resource.ctaText}
            </Typography>
            <PrimaryButton
              size="large"
              onClick={() => setDialogOpen(true)}
              aria-label={`Descargar ${resource.title}`}
              sx={{
                px: { xs: 4, md: 5 },
                py: { xs: 1.5, md: 1.75 },
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              {resources.form.buttonLabel}
            </PrimaryButton>
          </Box>
        </Container>
      </Box>

      {/* Lead gate dialog — reuses existing LeadCaptureForm */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        aria-labelledby={`resource-dialog-title-${resource.slug}`}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: alpha(brandColors.black, 0.6),
              backdropFilter: 'blur(4px)',
            },
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : 3,
            boxShadow: `0 24px 48px ${alpha(brandColors.black, 0.25)}`,
            backgroundColor: 'background.default',
            maxHeight: fullScreen ? '100%' : '90vh',
          },
        }}
      >
        <DialogTitle
          id={`resource-dialog-title-${resource.slug}`}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
            px: { xs: 2.5, sm: 3 },
            pt: { xs: 2, sm: 2.5 },
            pb: 0,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                display: 'block',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
              }}
            >
              {resources.form.dialogTitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'primary.main',
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              {resource.title}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDialogOpen(false)}
            aria-label="Cerrar"
            edge="end"
            sx={{ mt: -0.5 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 3 },
            pt: 2,
            pb: { xs: 3, sm: 3.5 },
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            {resources.form.dialogDescription}
          </Typography>

          <LeadCaptureForm
            resourceSlug={resource.slug}
            downloadUrl={resource.downloadUrl}
            buttonLabel={resources.form.buttonLabel}
            successMessage={resources.form.successMessage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
