/**
 * Offers Service
 *
 * Infrastructure layer for the Offers Dashboard mini app.
 * Follows SoC: this file handles only external communication and
 * payload normalisation — no UI, no filtering/business logic.
 *
 * Architecture (static export site, same model as leadCapture.ts):
 *
 *   n8n scraper/cron ──▶ Supabase table `ofertas`
 *                                  │
 *   browser ──GET──▶ n8n PUBLIC webhook (reads Supabase) ──▶ JSON ──▶ this service
 *
 * Security model:
 *  - The frontend NEVER talks to Supabase directly and NEVER sends tokens.
 *  - The read webhook must be hardened server-side (n8n workflow):
 *      1. Origin allowlist (luisdavidmag.com).
 *      2. Rate limiting per IP.
 *      3. GET only, returns a bounded number of rows (e.g. max 200).
 *      4. Only public columns are selected (see docs/n8n-offers-contract.md).
 *
 * Expected webhook response (any of these shapes is accepted):
 *   { "ok": true, "offers": Offer[] }   ← preferred
 *   { "data": Offer[] }
 *   Offer[]
 */

import {
  OFFER_CATEGORIES,
  type Offer,
  type OfferCategory,
  type OffersServiceResponse,
} from '@/types/offers';

const OFFERS_WEBHOOK_URL = 'https://n8n.luisdavidmag.com/webhook/offers';
const REQUEST_TIMEOUT_MS = 10_000;

// Short-lived cache to avoid hammering the webhook on every tab switch.
const OFFERS_CACHE_KEY = 'offers-dashboard-cache-v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

const DEFAULT_CURRENCY = 'MXN';

interface CachedOffers {
  savedAt: number;
  offers: Offer[];
}

// ---------------------------------------------------------------------------
// Normalisation helpers
// ---------------------------------------------------------------------------

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
}

function asNullableDate(value: unknown): string | null {
  const str = asString(value);
  if (!str) return null;
  return Number.isNaN(Date.parse(str)) ? null : str;
}

function asPrice(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, value);
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
  }
  return 0;
}

function asCategory(value: unknown): OfferCategory | null {
  const str = asString(value).toLowerCase();
  return (OFFER_CATEGORIES as readonly string[]).includes(str) ? (str as OfferCategory) : null;
}

/**
 * Only allow http(s) links to be rendered as booking URLs.
 * Prevents `javascript:` or other schemes coming from scraped data.
 */
function asSafeUrl(value: unknown): string {
  const str = asString(value);
  if (!str) return '';
  try {
    const url = new URL(str);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

/**
 * Convert an unknown row from the webhook into a strongly typed Offer.
 * Returns null when the row lacks the minimum required fields.
 */
export function normalizeOffer(raw: unknown): Offer | null {
  if (!isRecord(raw)) return null;

  const id = asString(raw.id);
  const titulo = asString(raw.titulo);
  const categoria = asCategory(raw.categoria);
  const url_reserva = asSafeUrl(raw.url_reserva);

  if (!id || !titulo || !categoria || !url_reserva) return null;

  return {
    id,
    titulo,
    categoria,
    origen: asString(raw.origen),
    destino: asString(raw.destino),
    precio: asPrice(raw.precio),
    moneda: asString(raw.moneda, DEFAULT_CURRENCY).toUpperCase() || DEFAULT_CURRENCY,
    fecha_inicio: asNullableDate(raw.fecha_inicio),
    fecha_fin: asNullableDate(raw.fecha_fin),
    detalles: asString(raw.detalles),
    url_reserva,
    updated_at: asNullableDate(raw.updated_at) ?? new Date().toISOString(),
  };
}

function extractRows(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (isRecord(payload)) {
    if (Array.isArray(payload.offers)) return payload.offers;
    if (Array.isArray(payload.data)) return payload.data;
    // n8n "Respond to Webhook" sometimes wraps items as [{ json: {...} }]
    if (Array.isArray(payload.items)) return payload.items;
  }
  return [];
}

function getLastUpdatedAt(offers: Offer[]): string | null {
  if (offers.length === 0) return null;
  return offers.reduce<string>(
    (latest, offer) => (offer.updated_at > latest ? offer.updated_at : latest),
    offers[0].updated_at
  );
}

// ---------------------------------------------------------------------------
// sessionStorage cache (best effort — never throws)
// ---------------------------------------------------------------------------

function readCache(): Offer[] | null {
  try {
    const raw = sessionStorage.getItem(OFFERS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedOffers;
    if (!parsed || typeof parsed.savedAt !== 'number' || !Array.isArray(parsed.offers)) return null;
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed.offers;
  } catch {
    return null;
  }
}

function writeCache(offers: Offer[]): void {
  try {
    const entry: CachedOffers = { savedAt: Date.now(), offers };
    sessionStorage.setItem(OFFERS_CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Storage may be unavailable (private mode, quota). Ignore.
  }
}

export function clearOffersCache(): void {
  try {
    sessionStorage.removeItem(OFFERS_CACHE_KEY);
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

interface FetchOffersOptions {
  /** Skip the sessionStorage cache and hit the webhook. */
  forceRefresh?: boolean;
}

/**
 * Fetch offers from the n8n read webhook.
 * Includes timeout via AbortController, payload validation and a short cache.
 */
export async function fetchOffers(options: FetchOffersOptions = {}): Promise<OffersServiceResponse> {
  if (!options.forceRefresh) {
    const cached = readCache();
    if (cached) {
      return {
        ok: true,
        offers: cached,
        message: 'Ofertas cargadas.',
        lastUpdatedAt: getLastUpdatedAt(cached),
        fromCache: true,
      };
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OFFERS_WEBHOOK_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[offersService] Webhook returned non-OK:', response.status);
      }
      return {
        ok: false,
        offers: [],
        message: 'No pudimos cargar las ofertas. Por favor, inténtalo de nuevo.',
        lastUpdatedAt: null,
        fromCache: false,
      };
    }

    const payload: unknown = await response.json();
    const offers = extractRows(payload)
      .map((row) => normalizeOffer(isRecord(row) && isRecord(row.json) ? row.json : row))
      .filter((offer): offer is Offer => offer !== null);

    writeCache(offers);

    return {
      ok: true,
      offers,
      message: 'Ofertas cargadas.',
      lastUpdatedAt: getLastUpdatedAt(offers),
      fromCache: false,
    };
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[offersService] Error fetching offers:', error);
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        offers: [],
        message: 'La solicitud tardó demasiado. Por favor, inténtalo de nuevo.',
        lastUpdatedAt: null,
        fromCache: false,
      };
    }

    return {
      ok: false,
      offers: [],
      message: 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.',
      lastUpdatedAt: null,
      fromCache: false,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
