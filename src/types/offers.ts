/**
 * Offers Dashboard — shared types
 *
 * The field names intentionally mirror the Supabase table columns
 * (Spanish snake_case) so the n8n workflow can insert rows 1:1 and the
 * frontend can consume the webhook response without a mapping layer.
 *
 * Full contract (JSON shape, table DDL, webhook response):
 *   docs/n8n-offers-contract.md
 */

export const OFFER_CATEGORIES = ['viajes', 'vuelos', 'empleos', 'servicios'] as const;

export type OfferCategory = (typeof OFFER_CATEGORIES)[number];

/**
 * One offer row as stored by n8n and returned by the read webhook.
 */
export interface Offer {
  /** Stable unique id (uuid or the provider's own id). */
  id: string;
  titulo: string;
  categoria: OfferCategory;
  /** Free text: city, airport code, company, region... */
  origen: string;
  destino: string;
  /** Numeric price. Use 0 when the offer has no price (e.g. job listings). */
  precio: number;
  /** ISO 4217 code. Defaults to 'MXN' when omitted by the workflow. */
  moneda: string;
  /** ISO-8601 date (YYYY-MM-DD) or datetime. Nullable when not applicable. */
  fecha_inicio: string | null;
  fecha_fin: string | null;
  detalles: string;
  url_reserva: string;
  /** ISO-8601 datetime set by n8n on every insert/update. */
  updated_at: string;
}

export type OfferSortKey = 'recientes' | 'precio_asc' | 'precio_desc' | 'fecha_inicio';

/**
 * Client-side filter state used by the dashboard UI.
 * Every field is optional so an empty object means "no filters".
 */
export interface OffersFilters {
  search: string;
  categoria: OfferCategory | 'todas';
  precioMin: number | null;
  precioMax: number | null;
  /** YYYY-MM-DD */
  fechaDesde: string;
  /** YYYY-MM-DD */
  fechaHasta: string;
  sort: OfferSortKey;
}

export interface OffersServiceResponse {
  ok: boolean;
  offers: Offer[];
  /** Human-readable status message (Spanish, safe to show in UI). */
  message: string;
  /** ISO datetime of the most recent `updated_at` in the payload, if any. */
  lastUpdatedAt: string | null;
  /** True when the data came from the sessionStorage cache. */
  fromCache: boolean;
}
