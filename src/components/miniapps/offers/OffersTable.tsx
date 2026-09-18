'use client';

import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

import { siteContent } from '@/content/site';
import { brandColors } from '@/theme/tokens';
import type { Offer } from '@/types/offers';
import { formatDateRange, formatDateTime, formatPrice } from './formatters';

interface OffersTableProps {
  offers: Offer[];
}

export default function OffersTable({ offers }: OffersTableProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const copy = siteContent.offersDashboard;
  const accent = isLight ? brandColors.primary : brandColors.secondary;

  return (
    <TableContainer
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        backgroundColor: 'background.paper',
        overflowX: 'auto',
      }}
    >
      <Table size="medium" aria-label={siteContent.projects.items.find((i) => i.id === 'offers-dashboard')?.title}>
        <TableHead>
          <TableRow sx={{ '& th': { fontWeight: 700, whiteSpace: 'nowrap', color: 'text.secondary' } }}>
            <TableCell>{copy.table.title}</TableCell>
            <TableCell>{copy.table.category}</TableCell>
            <TableCell>{copy.table.route}</TableCell>
            <TableCell align="right">{copy.table.price}</TableCell>
            <TableCell>{copy.table.dates}</TableCell>
            <TableCell>{copy.table.updated}</TableCell>
            <TableCell align="center">{copy.table.action}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
              <TableCell sx={{ minWidth: 220 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {offer.titulo}
                </Typography>
                {offer.detalles && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {offer.detalles}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Chip label={copy.categories[offer.categoria]} size="small" sx={{ height: 22, fontSize: '0.75rem', fontWeight: 600 }} />
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {offer.origen || offer.destino ? `${offer.origen || '—'} → ${offer.destino || '—'}` : '—'}
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap', fontWeight: 700, color: accent }}>
                {formatPrice(offer.precio, offer.moneda, copy.card.noPrice)}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formatDateRange(offer.fecha_inicio, offer.fecha_fin, copy.card.noDates)}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                {formatDateTime(offer.updated_at) ?? '—'}
              </TableCell>
              <TableCell align="center">
                <Tooltip title={copy.card.book}>
                  <IconButton
                    component="a"
                    href={offer.url_reserva}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    color="primary"
                    aria-label={`${copy.card.book}: ${offer.titulo}`}
                  >
                    <LaunchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {offers.length === 0 && <Box sx={{ p: 2 }} />}
    </TableContainer>
  );
}
