/**
 * Lead Capture Service
 *
 * Infrastructure layer for lead capture webhook integration.
 * Follows SoC: this file handles only external communication,
 * no UI or domain logic.
 *
 * Security model (static export site):
 *  - No client-side secrets. Any NEXT_PUBLIC_* variable is inlined into the
 *    browser bundle and therefore publicly visible. For that reason we do NOT
 *    send an Authorization header from the client.
 *  - The n8n webhook MUST be hardened server-side with:
 *      1. Origin allowlist check (first node of the workflow).
 *      2. Rate limiting per IP (e.g. 1 request / 30s).
 *      3. Honeypot field rejection (`hp` field must be empty).
 *      4. Optional Cloudflare Turnstile / hCaptcha token validation.
 */

const N8N_WEBHOOK_URL = 'https://n8n.luisdavidmag.com/webhook/lead-capture';
const REQUEST_TIMEOUT_MS = 10_000;

// Stricter email regex: requires valid TLD of at least 2 chars,
// no leading/trailing dots, and no consecutive dots.
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

interface LeadPayload {
  name: string;
  email: string;
  /** Optional: resource slug when downloading a gated resource */
  resource?: string;
  /** Optional: contact form message */
  message?: string;
  /** Optional: diagnostic survey responses (JSON string) */
  diagnostic?: string;
  /** Optional: Cloudflare Turnstile / hCaptcha token for bot verification */
  captchaToken?: string;
  /**
   * Honeypot field. If a bot fills the hidden input, we short-circuit and
   * pretend success without hitting the webhook.
   */
  hp?: string;
  /** Override source: defaults to 'website' */
  source?: string;
}

interface LeadResponse {
  ok: boolean;
  message: string;
}

/**
 * Submit a lead to the n8n webhook.
 * Includes timeout via AbortController, honeypot check, and error handling.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  // 1. Honeypot — silently succeed without sending if a bot filled the trap.
  if (payload.hp && payload.hp.trim().length > 0) {
    return {
      ok: true,
      message: '¡Gracias por suscribirte! Pronto recibirás novedades.',
    };
  }

  // 2. Client-side validation guardrail (UI already validates, but defence in depth).
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();

  if (!name || name.length < 2) {
    return { ok: false, message: 'El nombre no es válido.' };
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return { ok: false, message: 'El correo electrónico no es válido.' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const resource = (payload.resource ?? '').trim();
    const message = (payload.message ?? '').trim();
    const diagnostic = (payload.diagnostic ?? '').trim();
    const captchaToken = (payload.captchaToken ?? '').trim();
    const fallbackSource = (payload.source ?? 'website').trim().toLowerCase();

    const source = resource
      ? 'resource'
      : diagnostic
        ? 'diagnostic'
        : message
          ? 'contact'
          : fallbackSource;

    const body = {
      name,
      email,
      source,
      ...(resource ? { resource } : {}),
      ...(message ? { message } : {}),
      ...(diagnostic ? { diagnostic } : {}),
      ...(captchaToken ? { captchaToken } : {}),
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[leadCapture] Webhook returned non-OK:', response.status);
      }
      return {
        ok: false,
        message: 'No pudimos enviar tus datos. Por favor, inténtalo de nuevo.',
      };
    }

    return {
      ok: true,
      message: '¡Gracias por suscribirte! Pronto recibirás novedades.',
    };
  } catch (error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[leadCapture] Error submitting lead:', error);
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        message: 'La solicitud tardó demasiado. Por favor, inténtalo de nuevo.',
      };
    }

    return {
      ok: false,
      message: 'Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
