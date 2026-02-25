'use client';

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import Link from 'next/link';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { alpha } from '@mui/material/styles';
import PrimaryButton from '@/components/PrimaryButton';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';

interface ResourceCardProps {
  slug: string;
  title: string;
  description: string;
  type: string;
  tags: string[];
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
}: ResourceCardProps) {
  const { resources } = siteContent;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
            textAlign: { xs: 'left', md: 'justify' },
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
          component={Link}
          href={`/resources/${slug}/`}
          aria-label={`Ver detalles de ${title}`}
        >
          {resources.form.viewButtonLabel}
        </PrimaryButton>
      </CardActions>
    </Card>
  );
}
