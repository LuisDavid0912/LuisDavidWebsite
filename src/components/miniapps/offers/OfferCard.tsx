'use client';

import { Box, Card, CardContent, Chip, Stack, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LuggageIcon from '@mui/icons-material/Luggage';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HandymanIcon from '@mui/icons-material/Handyman';

import PrimaryButton from '@/components/PrimaryButton';
import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import type { Offer, OfferCategory } from '@/types/offers';
import { formatDateRange, formatDateTime, formatPrice } from './formatters';

const CATEGORY_ICONS: Record<OfferCategory, typeof FlightTakeoffIcon> = {
  vuelos: FlightTakeoffIcon,
  viajes: LuggageIcon,
  empleos: WorkOutlineIcon,
  servicios: HandymanIcon,
};

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const copy = siteContent.offersDashboard;
  const CategoryIcon = CATEGORY_ICONS[offer.categoria];
  const accent = isLight ? brandColors.primary : brandColors.secondary;

  const price = formatPrice(offer.precio, offer.moneda, copy.card.noPrice);
  const dates = formatDateRange(offer.fecha_inicio, offer.fecha_fin, copy.card.noDates);
  const updated = formatDateTime(offer.updated_at);
  const hasRoute = Boolean(offer.origen || offer.destino);

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Category + price row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          <Chip
            icon={<CategoryIcon sx={{ fontSize: 16 }} />}
            label={copy.categories[offer.categoria]}
            size="small"
            sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }}
          />
          <Typography
            variant="h4"
            component="p"
            sx={{ fontWeight: 700, color: accent, whiteSpace: 'nowrap', lineHeight: 1.2 }}
          >
            {price}
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h5" component="h4" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {offer.titulo}
        </Typography>

        {/* Route */}
        {hasRoute && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {offer.origen || '—'}
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: 16, color: accent }} aria-label={copy.card.route} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {offer.destino || '—'}
            </Typography>
          </Stack>
        )}

        {/* Dates */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <CalendarMonthIcon sx={{ fontSize: 16 }} aria-hidden />
          <Typography variant="body2">{dates}</Typography>
        </Stack>

        {/* Details (clamped) */}
        {offer.detalles && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {offer.detalles}
          </Typography>
        )}

        {/* Footer */}
        <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <PrimaryButton
            component="a"
            href={offer.url_reserva}
            target="_blank"
            rel="noopener noreferrer nofollow"
            endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
            aria-label={`${copy.card.book}: ${offer.titulo}`}
            fullWidth
          >
            {copy.card.book}
          </PrimaryButton>
          {updated && (
            <Typography
              variant="caption"
              sx={{ color: alpha(isLight ? brandColors.black : brandColors.white, 0.5), textAlign: 'center' }}
            >
              {copy.card.updated}: {updated}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
