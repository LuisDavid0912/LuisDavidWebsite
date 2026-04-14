/**
 * Lead Capture Service
 *
 * Infrastructure layer for lead capture webhook integration.
 * Follows SoC: this file handles only external communication,
 * no UI or domain logic.
 */

const N8N_WEBHOOK_URL = 'https://n8n.luisdavidmag.com/webhook/lead-capture';
// To set this token, add NEXT_PUBLIC_N8N_JWT_TOKEN="eyJhb..." to your .env file
const N8N_JWT_TOKEN = process.env.NEXT_PUBLIC_N8N_JWT_TOKEN || '';
const REQUEST_TIMEOUT_MS = 15_000;

interface LeadPayload {
  name: string;
  email: string;
  /** Optional: resource slug when downloading a gated resource */
  resource?: string;
  /** Optional: contact form message */
  message?: string;
  /** Optional: diagnostic survey responses (JSON string) */
  diagnostic?: string;
  /** Override source: defaults to 'website' */
  source?: string;
}

interface LeadResponse {
  ok: boolean;
  message: string;
}

/**
 * Submit a lead to the n8n webhook.
 * Includes timeout via AbortController and error handling.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${N8N_JWT_TOKEN}`,
      },
      body: JSON.stringify((() => {
        const name = payload.name.trim();
        const email = payload.email.trim().toLowerCase();
        const resource = (payload.resource ?? '').trim();
        const message = (payload.message ?? '').trim();
        const diagnostic = (payload.diagnostic ?? '').trim();
        const fallbackSource = (payload.source ?? 'website').trim().toLowerCase();

        const source = resource
          ? 'resource'
          : diagnostic
            ? 'diagnostic'
            : message
              ? 'contact'
              : fallbackSource;

        return {
          name,
          email,
          source,
          ...(resource ? { resource } : {}),
          ...(message ? { message } : {}),
          ...(diagnostic ? { diagnostic } : {}),
        };
      })()),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        message: 'Error al enviar los datos. Por favor, inténtalo de nuevo.',
      };
    }

    return {
      ok: true,
      message: '¡Gracias por suscribirte! Pronto recibirás novedades.',
    };
  } catch (error: unknown) {
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
