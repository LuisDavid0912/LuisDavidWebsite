'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Fade, Grid, Stack, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoModeIcon from '@mui/icons-material/AutoMode';

import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import { fetchOffers } from '@/services/offersService';
import type { Offer, OffersFilters } from '@/types/offers';
import OfferCard from './OfferCard';
import OffersTable from './OffersTable';
import OffersFilterBar, { type OffersViewMode } from './OffersFilterBar';
import { OffersEmpty, OffersError, OffersLoading } from './OffersStates';
import { DEFAULT_OFFERS_FILTERS, filterOffers, getPriceBounds, hasActiveFilters } from './filterOffers';
import { formatDateTime } from './formatters';

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

/**
 * OffersDashboard — read-only view of offers collected by an n8n workflow.
 *
 * Data flow: n8n → Supabase → n8n read webhook → fetchOffers() → this view.
 * No API keys are required from the visitor; the webhook is public and
 * hardened in n8n (origin allowlist + rate limit).
 */
export default function OffersDashboard() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const copy = siteContent.offersDashboard;

  const [status, setStatus] = useState<LoadStatus>('idle');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const [filters, setFilters] = useState<OffersFilters>(DEFAULT_OFFERS_FILTERS);
  const [viewMode, setViewMode] = useState<OffersViewMode>('cards');

  const load = useCallback(async (forceRefresh = false) => {
    setStatus('loading');
    setErrorMessage('');
    const result = await fetchOffers({ forceRefresh });
    if (!result.ok) {
      setStatus('error');
      setErrorMessage(result.message);
      return;
    }
    setOffers(result.offers);
    setLastUpdatedAt(result.lastUpdatedAt);
    setStatus('ready');
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const priceBounds = useMemo(() => getPriceBounds(offers), [offers]);
  const visibleOffers = useMemo(() => filterOffers(offers, filters), [offers, filters]);
  const filtersActive = hasActiveFilters(filters);

  const handleReset = () => setFilters(DEFAULT_OFFERS_FILTERS);
  const handleRefresh = () => {
    void load(true);
  };

  const stats = [
    { label: copy.stats.total, value: String(offers.length) },
    { label: copy.stats.showing, value: String(visibleOffers.length) },
    { label: copy.stats.lastUpdate, value: formatDateTime(lastUpdatedAt) ?? copy.stats.never },
  ];

  return (
    <Stack spacing={4}>
      {/* Intro banner — same visual language as the catalog's privacy card */}
      <Card variant="outlined" sx={{ borderColor: 'primary.main', backgroundColor: 'action.hover', '&:hover': { transform: 'none' } }}>
        <CardContent sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <AutoModeIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1, minWidth: 240 }}>
            {copy.intro}
          </Typography>
        </CardContent>
      </Card>

      {/* Stat tiles */}
      <Grid container spacing={2}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block' }}>
                {stat.label}
              </Typography>
              <Typography
                variant="h3"
                component="p"
                sx={{ fontWeight: 700, color: isLight ? brandColors.primary : brandColors.secondary }}
              >
                {status === 'loading' ? '…' : stat.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <OffersFilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        onRefresh={handleRefresh}
        priceBounds={priceBounds}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        disabled={status === 'loading'}
      />

      {/* Content area */}
      <Box>
        {status === 'loading' && <OffersLoading />}

        {status === 'error' && <OffersError message={errorMessage} onRetry={handleRefresh} />}

        {status === 'ready' && offers.length === 0 && (
          <OffersEmpty variant="empty" onAction={handleRefresh} actionLabel={copy.states.retry} />
        )}

        {status === 'ready' && offers.length > 0 && visibleOffers.length === 0 && (
          <OffersEmpty variant="noResults" onAction={handleReset} actionLabel={copy.filters.clear} />
        )}

        {status === 'ready' && visibleOffers.length > 0 && (
          <Fade in timeout={300}>
            <Box>
              {viewMode === 'cards' ? (
                <Grid container spacing={3}>
                  {visibleOffers.map((offer) => (
                    <Grid item xs={12} sm={6} md={4} key={offer.id}>
                      <OfferCard offer={offer} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <OffersTable offers={visibleOffers} />
              )}

              {filtersActive && (
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 2, color: alpha(isLight ? brandColors.black : brandColors.white, 0.5) }}
                >
                  {visibleOffers.length} / {offers.length}
                </Typography>
              )}
            </Box>
          </Fade>
        )}
      </Box>
    </Stack>
  );
}
