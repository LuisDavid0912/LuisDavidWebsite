/**
 * Pure helpers for filtering/sorting offers on the client.
 * No React, no side effects — easy to unit test.
 */

import type { Offer, OffersFilters } from '@/types/offers';

export const DEFAULT_OFFERS_FILTERS: OffersFilters = {
  search: '',
  categoria: 'todas',
  precioMin: null,
  precioMax: null,
  fechaDesde: '',
  fechaHasta: '',
  sort: 'recientes',
};

/** Compare only the calendar date part (YYYY-MM-DD) to avoid timezone drift. */
function toDateKey(value: string | null): string | null {
  if (!value) return null;
  return value.slice(0, 10);
}

export function getPriceBounds(offers: Offer[]): { min: number; max: number } {
  if (offers.length === 0) return { min: 0, max: 0 };
  let min = Number.POSITIVE_INFINITY;
  let max = 0;
  for (const offer of offers) {
    if (offer.precio < min) min = offer.precio;
    if (offer.precio > max) max = offer.precio;
  }
  return { min: Number.isFinite(min) ? min : 0, max };
}

export function hasActiveFilters(filters: OffersFilters): boolean {
  return (
    filters.search.trim() !== '' ||
    filters.categoria !== 'todas' ||
    filters.precioMin !== null ||
    filters.precioMax !== null ||
    filters.fechaDesde !== '' ||
    filters.fechaHasta !== ''
  );
}

export function filterOffers(offers: Offer[], filters: OffersFilters): Offer[] {
  const search = filters.search.trim().toLowerCase();

  const result = offers.filter((offer) => {
    if (filters.categoria !== 'todas' && offer.categoria !== filters.categoria) return false;

    if (filters.precioMin !== null && offer.precio < filters.precioMin) return false;
    if (filters.precioMax !== null && offer.precio > filters.precioMax) return false;

    // Date overlap: an offer matches when its window intersects the requested one.
    const start = toDateKey(offer.fecha_inicio);
    const end = toDateKey(offer.fecha_fin) ?? start;
    if (filters.fechaDesde && end && end < filters.fechaDesde) return false;
    if (filters.fechaHasta && start && start > filters.fechaHasta) return false;

    if (search) {
      const haystack = `${offer.titulo} ${offer.origen} ${offer.destino} ${offer.detalles}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    return true;
  });

  return sortOffers(result, filters.sort);
}

export function sortOffers(offers: Offer[], sort: OffersFilters['sort']): Offer[] {
  const copy = [...offers];
  switch (sort) {
    case 'precio_asc':
      return copy.sort((a, b) => a.precio - b.precio);
    case 'precio_desc':
      return copy.sort((a, b) => b.precio - a.precio);
    case 'fecha_inicio':
      return copy.sort((a, b) => (a.fecha_inicio ?? '9999').localeCompare(b.fecha_inicio ?? '9999'));
    case 'recientes':
    default:
      return copy.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  }
}
