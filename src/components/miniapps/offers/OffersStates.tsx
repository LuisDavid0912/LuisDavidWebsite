'use client';

import { Alert, Box, Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RefreshIcon from '@mui/icons-material/Refresh';

import SecondaryButton from '@/components/SecondaryButton';
import { siteContent } from '@/content/site';

const copy = siteContent.offersDashboard.states;

/** Skeleton grid shown while fetching from the webhook. */
export function OffersLoading({ count = 6 }: { count?: number }) {
  return (
    <Box role="status" aria-live="polite" aria-label={copy.loadingTitle}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {copy.loadingText}
      </Typography>
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card variant="outlined" sx={{ borderColor: 'divider', '&:hover': { transform: 'none' } }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton variant="rounded" width={90} height={24} />
                    <Skeleton variant="text" width={80} height={32} />
                  </Box>
                  <Skeleton variant="text" height={28} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="45%" />
                  <Skeleton variant="rectangular" height={54} />
                  <Skeleton variant="rounded" height={44} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

interface EmptyStateProps {
  variant: 'empty' | 'noResults';
  onAction?: () => void;
  actionLabel?: string;
}

/** Empty state: no rows in DB yet, or filters produced zero results. */
export function OffersEmpty({ variant, onAction, actionLabel }: EmptyStateProps) {
  const Icon = variant === 'empty' ? InboxIcon : SearchOffIcon;
  const title = variant === 'empty' ? copy.emptyTitle : copy.noResultsTitle;
  const text = variant === 'empty' ? copy.emptyText : copy.noResultsText;

  return (
    <Card variant="outlined" sx={{ borderColor: 'divider', borderStyle: 'dashed', '&:hover': { transform: 'none', boxShadow: 'none' } }}>
      <CardContent
        sx={{
          py: { xs: 6, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Icon sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
        <Typography variant="h5" component="p" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 440, mb: onAction ? 3 : 0 }}>
          {text}
        </Typography>
        {onAction && actionLabel && (
          <SecondaryButton onClick={onAction} sx={{ py: 0.75, px: 2.5 }}>
            {actionLabel}
          </SecondaryButton>
        )}
      </CardContent>
    </Card>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function OffersError({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        <SecondaryButton
          size="small"
          color="inherit"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ py: 0.5, px: 1.5, fontSize: '0.8rem' }}
        >
          {copy.retry}
        </SecondaryButton>
      }
      sx={{ alignItems: 'center' }}
    >
      <strong>{copy.errorTitle}.</strong> {message}
    </Alert>
  );
}
