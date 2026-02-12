/**
 * Lead Capture Service
 *
 * Infrastructure layer for lead capture webhook integration.
 * Follows SoC: this file handles only external communication,
 * no UI or domain logic.
 */

const N8N_WEBHOOK_URL = 'https://n8n.luisdavidmag.com/webhook/lead-capture';
// JWT token signed with HS256 (sub: website, iss: luisdavidmag.com)
const N8N_JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3ZWJzaXRlIiwiaXNzIjoibHVpc2RhdmlkbWFnLmNvbSIsImlhdCI6MTc3MDgzOTIzOH0.ckl3svlOCOoh-rSEfXM5m32CSSJc2KrJwf3cSOc0v_E';
const REQUEST_TIMEOUT_MS = 8_000;

interface LeadPayload {
  name: string;
  email: string;
  /** Optional: resource slug when downloading a gated resource */
  resource?: string;
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
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        source: payload.resource ? 'resource' : (payload.source ?? 'website'),
        ...(payload.resource ? { resource: payload.resource } : {}),
      }),
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
