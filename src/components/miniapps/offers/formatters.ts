/**
 * Display formatters for the Offers Dashboard (locale es-MX).
 */

const DATE_FORMATTER = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
const DATETIME_FORMATTER = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatPrice(amount: number, currency: string, fallback: string): string {
  if (!amount || amount <= 0) return fallback;
  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Unknown currency code coming from scraped data → plain number + code.
    return `${amount.toLocaleString('es-MX')} ${currency}`;
  }
}

export function formatDate(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  return Number.isNaN(date.getTime()) ? null : DATE_FORMATTER.format(date);
}

export function formatDateRange(start: string | null, end: string | null, fallback: string): string {
  const s = formatDate(start);
  const e = formatDate(end);
  if (s && e && s !== e) return `${s} – ${e}`;
  return s ?? e ?? fallback;
}

export function formatDateTime(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : DATETIME_FORMATTER.format(date);
}
