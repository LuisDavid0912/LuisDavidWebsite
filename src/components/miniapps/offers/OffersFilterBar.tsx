'use client';

import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';

import AppSelect from '@/components/ui/AppSelect';
import SecondaryButton from '@/components/SecondaryButton';
import { siteContent } from '@/content/site';
import { OFFER_CATEGORIES, type OfferSortKey, type OffersFilters } from '@/types/offers';
import { formatPrice } from './formatters';
import { hasActiveFilters } from './filterOffers';

export type OffersViewMode = 'cards' | 'table';

interface OffersFilterBarProps {
  filters: OffersFilters;
  onChange: (next: OffersFilters) => void;
  onReset: () => void;
  onRefresh: () => void;
  priceBounds: { min: number; max: number };
  viewMode: OffersViewMode;
  onViewModeChange: (mode: OffersViewMode) => void;
  disabled?: boolean;
}

export default function OffersFilterBar({
  filters,
  onChange,
  onReset,
  onRefresh,
  priceBounds,
  viewMode,
  onViewModeChange,
  disabled = false,
}: OffersFilterBarProps) {
  const copy = siteContent.offersDashboard;
  const active = hasActiveFilters(filters);

  const sliderValue: [number, number] = [
    filters.precioMin ?? priceBounds.min,
    filters.precioMax ?? priceBounds.max,
  ];
  const priceDisabled = disabled || priceBounds.max <= priceBounds.min;

  const categoryOptions = [
    { value: 'todas', label: copy.filters.allCategories },
    ...OFFER_CATEGORIES.map((c) => ({ value: c, label: copy.categories[c] })),
  ];

  const sortOptions = (Object.keys(copy.filters.sortOptions) as OfferSortKey[]).map((key) => ({
    value: key,
    label: copy.filters.sortOptions[key],
  }));

  return (
    <Card variant="outlined" sx={{ borderColor: 'divider', '&:hover': { transform: 'none', boxShadow: 'none' } }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
          <Typography variant="h5" component="h4" sx={{ fontWeight: 700 }}>
            {copy.filters.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              size="small"
              onChange={(_, value: OffersViewMode | null) => value && onViewModeChange(value)}
              aria-label="Modo de vista"
            >
              <ToggleButton value="cards" aria-label={copy.filters.viewCards}>
                <Tooltip title={copy.filters.viewCards}><GridViewIcon fontSize="small" /></Tooltip>
              </ToggleButton>
              <ToggleButton value="table" aria-label={copy.filters.viewTable}>
                <Tooltip title={copy.filters.viewTable}><TableRowsIcon fontSize="small" /></Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <Tooltip title={copy.filters.refresh}>
              <span>
                <IconButton onClick={onRefresh} disabled={disabled} aria-label={copy.filters.refresh} color="primary">
                  <RefreshIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Box>

        <Grid container spacing={2.5}>
          {/* Search */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={copy.filters.search}
              value={filters.search}
              disabled={disabled}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6} md={3}>
            <AppSelect
              id="offers-category"
              label={copy.filters.category}
              value={filters.categoria}
              options={categoryOptions}
              disabled={disabled}
              onChange={(value) => onChange({ ...filters, categoria: value as OffersFilters['categoria'] })}
            />
          </Grid>

          {/* Sort */}
          <Grid item xs={12} sm={6} md={3}>
            <AppSelect
              id="offers-sort"
              label={copy.filters.sort}
              value={filters.sort}
              options={sortOptions}
              disabled={disabled}
              onChange={(value) => onChange({ ...filters, sort: value as OfferSortKey })}
            />
          </Grid>

          {/* Dates */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label={copy.filters.dateFrom}
              value={filters.fechaDesde}
              disabled={disabled}
              onChange={(e) => onChange({ ...filters, fechaDesde: e.target.value })}
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: filters.fechaHasta || undefined } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              type="date"
              label={copy.filters.dateTo}
              value={filters.fechaHasta}
              disabled={disabled}
              onChange={(e) => onChange({ ...filters, fechaHasta: e.target.value })}
              slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: filters.fechaDesde || undefined } }}
            />
          </Grid>

          {/* Price range */}
          <Grid item xs={12} md={6}>
            <Box sx={{ px: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary" id="offers-price-label">
                  {copy.filters.priceRange}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {formatPrice(sliderValue[0], 'MXN', '$0')} – {formatPrice(sliderValue[1], 'MXN', '$0')}
                </Typography>
              </Box>
              <Slider
                value={sliderValue}
                min={priceBounds.min}
                max={priceBounds.max}
                step={Math.max(1, Math.round((priceBounds.max - priceBounds.min) / 100))}
                disabled={priceDisabled}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => formatPrice(v, 'MXN', '$0')}
                getAriaLabel={() => copy.filters.priceRange}
                aria-labelledby="offers-price-label"
                onChange={(_, value) => {
                  const [min, max] = value as number[];
                  onChange({
                    ...filters,
                    precioMin: min <= priceBounds.min ? null : min,
                    precioMax: max >= priceBounds.max ? null : max,
                  });
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {active && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <SecondaryButton
              size="small"
              startIcon={<FilterAltOffIcon />}
              onClick={onReset}
              sx={{ py: 0.75, px: 2, fontSize: '0.85rem' }}
            >
              {copy.filters.clear}
            </SecondaryButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
