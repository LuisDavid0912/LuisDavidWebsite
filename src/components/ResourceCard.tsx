'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CloseIcon from '@mui/icons-material/Close';
import { alpha } from '@mui/material/styles';
import PrimaryButton from '@/components/PrimaryButton';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

interface ResourceCardProps {
  slug: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
  downloadUrl: string;
}

function ResourceTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'video':
      return <OndemandVideoIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main' }} />;
    case 'pdf':
    default:
      return <PictureAsPdfIcon sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main' }} />;
  }
}

export default function ResourceCard({
  slug,
  title,
  description,
  type,
  tags,
  downloadUrl,
}: ResourceCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { resources } = siteContent;

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          // hover handled by theme components override
        }}
      >
        {/* Icon header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 3, md: 4 },
            backgroundColor: alpha(brandColors.primary, 0.06),
          }}
        >
          <Box
            sx={{
              width: { xs: 64, md: 80 },
              height: { xs: 64, md: 80 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: alpha(brandColors.secondary, 0.15),
            }}
          >
            <ResourceTypeIcon type={type} />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <PrimaryButton
            fullWidth
            onClick={() => setDialogOpen(true)}
            aria-label={`Descargar ${title}`}
          >
            {resources.form.buttonLabel}
          </PrimaryButton>
        </CardActions>
      </Card>

      {/* Lead gate dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
        aria-labelledby={`resource-dialog-title-${slug}`}
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
          id={`resource-dialog-title-${slug}`}
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
              {title}
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
            resourceSlug={slug}
            downloadUrl={downloadUrl}
            buttonLabel={resources.form.buttonLabel}
            successMessage={resources.form.successMessage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
