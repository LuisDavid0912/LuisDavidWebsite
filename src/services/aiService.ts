/**
 * AI Service
 * 
 * Infrastructure layer for client-side direct API requests to OpenAI and Google Gemini.
 * Follows SoC: this file handles only external communication, no UI or domain logic.
 * 
 * Security context:
 * - API keys are supplied by the client and are NOT hardcoded in the codebase or environment variables.
 * - Transactions are made directly from the user's browser, preventing leakage to intermediate servers.
 */

interface AIServiceResponse {
  ok: boolean;
  content: string;
  message: string;
}

const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Generate a response using OpenAI Chat Completions API
 */
export async function generateOpenAICompletion(
  apiKey: string,
  prompt: string,
  model = 'gpt-4o-mini'
): Promise<AIServiceResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error ${response.status}`;
      return {
        ok: false,
        content: '',
        message: `Error de OpenAI: ${errMsg}`,
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    if (!content) {
      return {
        ok: false,
        content: '',
        message: 'La API de OpenAI devolvió una respuesta vacía.',
      };
    }

    return {
      ok: true,
      content,
      message: 'Completado con éxito.',
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        content: '',
        message: 'La solicitud a OpenAI tardó demasiado (tiempo de espera agotado).',
      };
    }
    return {
      ok: false,
      content: '',
      message: `Error de red al conectar con OpenAI: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Generate a response using Google Gemini API
 */
export async function generateGeminiCompletion(
  apiKey: string,
  prompt: string,
  model = 'gemini-1.5-flash'
): Promise<AIServiceResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error ${response.status}`;
      return {
        ok: false,
        content: '',
        message: `Error de Gemini: ${errMsg}`,
      };
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!content) {
      return {
        ok: false,
        content: '',
        message: 'La API de Gemini devolvió una respuesta vacía.',
      };
    }

    return {
      ok: true,
      content,
      message: 'Completado con éxito.',
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        content: '',
        message: 'La solicitud a Gemini tardó demasiado (tiempo de espera agotado).',
      };
    }
    return {
      ok: false,
      content: '',
      message: `Error de red al conectar con Gemini: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Response type for image generation functions that return multiple images.
 */
export interface AIServiceImagesResponse {
  ok: boolean;
  images: string[];
  message: string;
}

/**
 * Internal helper: extract image data URIs from an OpenAI image API response.
 */
function extractImagesFromResponse(data: Record<string, unknown>): string[] {
  const items = (data.data as Array<Record<string, string>>) || [];
  return items
    .map((item) => {
      if (item.b64_json) return `data:image/png;base64,${item.b64_json}`;
      if (item.url) return item.url;
      return '';
    })
    .filter(Boolean);
}

/**
 * Generate images using OpenAI GPT Image API (gpt-image-2, gpt-image-1.5).
 *
 * Supports generating 1–4 images at once via the `n` parameter.
 * Returns an array of data URIs (base64) or URLs.
 */
export async function generateOpenAIImages(
  apiKey: string,
  prompt: string,
  size: '1024x1024' | '1024x1536' | '1536x1024' | 'auto' = '1536x1024',
  n: number = 1,
  model = 'gpt-image-2'
): Promise<AIServiceImagesResponse> {
  const controller = new AbortController();
  // Image generation can take longer with reasoning models — 90s timeout for multi-image.
  const timeoutId = setTimeout(() => controller.abort(), 90_000);

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        n: Math.min(Math.max(n, 1), 4),
        size,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData as Record<string, Record<string, string>>).error?.message || `HTTP error ${response.status}`;
      return {
        ok: false,
        images: [],
        message: `Error de Imagen OpenAI: ${errMsg}`,
      };
    }

    const data = await response.json();
    const images = extractImagesFromResponse(data as Record<string, unknown>);

    if (images.length === 0) {
      return {
        ok: false,
        images: [],
        message: 'La API de Imagen de OpenAI no devolvió ninguna imagen.',
      };
    }

    return {
      ok: true,
      images,
      message: `${images.length} imagen(es) generada(s) con éxito.`,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        images: [],
        message: 'La solicitud de generación de imagen tardó demasiado (tiempo de espera agotado).',
      };
    }
    return {
      ok: false,
      images: [],
      message: `Error de red al generar imagen: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Edit/compose an image using OpenAI GPT Image API with a reference photo.
 *
 * Uses the /v1/images/edits endpoint with multipart/form-data.
 * The reference image (e.g. a selfie) is sent as `image` and the AI
 * integrates it into the thumbnail based on the prompt.
 *
 * Supports 1–4 output images via `n`.
 */
export async function generateOpenAIImageEdit(
  apiKey: string,
  prompt: string,
  referenceImage: File,
  size: '1024x1024' | '1024x1536' | '1536x1024' | 'auto' = '1536x1024',
  n: number = 1,
  model = 'gpt-image-2'
): Promise<AIServiceImagesResponse> {
  const controller = new AbortController();
  // Edits with reference images may take even longer — 120s timeout.
  const timeoutId = setTimeout(() => controller.abort(), 120_000);

  try {
    const formData = new FormData();
    formData.append('model', model);
    formData.append('prompt', prompt);
    formData.append('image', referenceImage);
    formData.append('n', String(Math.min(Math.max(n, 1), 4)));
    formData.append('size', size);

    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        // No Content-Type header — the browser sets it with the correct boundary for FormData
      },
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData as Record<string, Record<string, string>>).error?.message || `HTTP error ${response.status}`;
      return {
        ok: false,
        images: [],
        message: `Error de Edición OpenAI: ${errMsg}`,
      };
    }

    const data = await response.json();
    const images = extractImagesFromResponse(data as Record<string, unknown>);

    if (images.length === 0) {
      return {
        ok: false,
        images: [],
        message: 'La API de Edición de OpenAI no devolvió ninguna imagen.',
      };
    }

    return {
      ok: true,
      images,
      message: `${images.length} imagen(es) generada(s) con éxito usando tu foto de referencia.`,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        images: [],
        message: 'La solicitud de edición de imagen tardó demasiado (tiempo de espera agotado).',
      };
    }
    return {
      ok: false,
      images: [],
      message: `Error de red al editar imagen: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * @deprecated Use generateOpenAIImages (plural) instead.
 * Kept for backward compatibility — wraps generateOpenAIImages and returns first image.
 */
export async function generateOpenAIImage(
  apiKey: string,
  prompt: string,
  size: '1024x1024' | '1024x1536' | '1536x1024' | 'auto' = '1536x1024',
  model = 'gpt-image-2'
): Promise<AIServiceResponse> {
  const result = await generateOpenAIImages(apiKey, prompt, size, 1, model);
  return {
    ok: result.ok,
    content: result.images[0] || '',
    message: result.message,
  };
}

// ============================================
// SEO AUDIT — STRUCTURED OUTPUT (GEMINI)
// ============================================

export interface SeoAuditFinding {
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
}

export interface SeoAuditCategory {
  name: string;
  score: number;
  findings: SeoAuditFinding[];
}

export interface SeoAuditResult {
  overallScore: number;
  summary: string;
  categories: SeoAuditCategory[];
  strengths: string[];
  quickWins: string[];
}

export interface SeoAuditServiceResponse {
  ok: boolean;
  result: SeoAuditResult | null;
  message: string;
}

/**
 * JSON Schema sent to Gemini for structured audit output.
 */
const SEO_AUDIT_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    overallScore: { type: 'integer', description: 'Overall website quality score from 0 to 100' },
    summary: { type: 'string', description: 'Executive summary of the audit in 2-3 sentences in Spanish' },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Category name in Spanish' },
          score: { type: 'integer', description: 'Category score from 0 to 100' },
          findings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                severity: { type: 'string', description: 'One of: critical, warning, info' },
                title: { type: 'string', description: 'Short finding title in Spanish' },
                description: { type: 'string', description: 'Detailed description of the issue in Spanish' },
                recommendation: { type: 'string', description: 'Actionable recommendation in Spanish' },
              },
              required: ['severity', 'title', 'description', 'recommendation'],
            },
          },
        },
        required: ['name', 'score', 'findings'],
      },
    },
    strengths: { type: 'array', items: { type: 'string' }, description: 'Top 3 strengths of the website in Spanish' },
    quickWins: { type: 'array', items: { type: 'string' }, description: 'Top 3 quick wins for immediate improvement in Spanish' },
  },
  required: ['overallScore', 'summary', 'categories', 'strengths', 'quickWins'],
} as const;

/**
 * Build the analysis prompt for the SEO audit.
 */
function buildAuditPrompt(siteContent: string): string {
  return `Eres un consultor experto en SEO, copywriting de conversión y diseño UX con más de 15 años de experiencia auditando landing pages para agencias digitales.

Analiza el siguiente contenido HTML/texto de un sitio web y genera un reporte de auditoría profesional basado en 5 categorías.

CATEGORÍAS DE ANÁLISIS (cada una con score de 0-100):

1. **SEO Técnico**: Meta tags (title, description, og:*), estructura de headings (H1 único, jerarquía correcta), alt text en imágenes, URLs amigables, schema markup, canonical, robots, sitemap hints.

2. **Copywriting y Conversión**: Claridad de los CTAs, uso de urgencia/escasez, jerarquía del mensaje, proof elements (testimonios, logos, números), formularios optimizados, microcopy efectivo.

3. **Propuesta de Valor**: ¿Es clara y diferenciada? ¿Se entiende en 5 segundos? ¿Está above the fold? ¿Comunica beneficios vs features? ¿Tiene un headline potente?

4. **UX y Estructura**: Jerarquía visual, legibilidad (font sizes, line-height, contraste), navegación intuitiva, responsive hints en el código, espaciado, consistencia visual.

5. **Performance y Accesibilidad**: Imágenes sin optimizar, scripts bloqueantes, atributos ARIA, roles semánticos, labels en formularios, contraste de texto.

REGLAS:
- Sé específico: cita elementos exactos del HTML cuando sea posible
- Cada finding debe ser accionable con una recomendación clara
- El severity debe ser: "critical" (rompe conversión/SEO), "warning" (impacta negativamente), "info" (oportunidad de mejora)
- Incluye al menos 2-4 findings por categoría
- Las strengths deben ser genuinas, no inventadas
- Los quickWins deben ser implementables en menos de 1 hora
- Todo el texto debe estar en español
- El overallScore es un promedio ponderado: SEO Técnico (25%), Copywriting (25%), Propuesta de Valor (20%), UX (15%), Performance (15%)

CONTENIDO DEL SITIO A ANALIZAR:
---
${siteContent.substring(0, 100_000)}
---

Genera el reporte de auditoría completo.`;
}

/**
 * Generate a structured SEO audit using Google Gemini with Structured Outputs.
 *
 * Uses responseFormat with JSON schema to enforce structured response.
 * The API key is sent directly from the browser to Google — no intermediaries.
 */
export async function generateGeminiStructuredAudit(
  apiKey: string,
  siteContent: string,
  model = 'gemini-2.5-flash'
): Promise<SeoAuditServiceResponse> {
  const controller = new AbortController();
  // Large HTML analysis can take time — 120s timeout
  const timeoutId = setTimeout(() => controller.abort(), 120_000);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildAuditPrompt(siteContent),
              },
            ],
          },
        ],
        generationConfig: {
          responseFormat: {
            text: {
              mimeType: 'application/json',
              schema: SEO_AUDIT_RESPONSE_SCHEMA,
            },
          },
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData as Record<string, Record<string, string>>).error?.message || `HTTP error ${response.status}`;
      return {
        ok: false,
        result: null,
        message: `Error de Gemini: ${errMsg}`,
      };
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!rawText) {
      return {
        ok: false,
        result: null,
        message: 'Gemini devolvió una respuesta vacía. Intenta nuevamente.',
      };
    }

    // Parse structured JSON response
    let parsed: SeoAuditResult;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return {
        ok: false,
        result: null,
        message: 'No se pudo interpretar la respuesta de Gemini como JSON. Intenta con un contenido diferente.',
      };
    }

    // Basic validation
    if (
      typeof parsed.overallScore !== 'number' ||
      !Array.isArray(parsed.categories) ||
      parsed.categories.length === 0
    ) {
      return {
        ok: false,
        result: null,
        message: 'La respuesta de Gemini no tiene el formato esperado. Intenta nuevamente.',
      };
    }

    return {
      ok: true,
      result: parsed,
      message: 'Auditoría completada con éxito.',
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        result: null,
        message: 'La auditoría tardó demasiado (tiempo de espera agotado). Intenta con un contenido más corto.',
      };
    }
    return {
      ok: false,
      result: null,
      message: `Error de red al conectar con Gemini: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Fetch the HTML content of a URL using a CORS proxy.
 * Falls back gracefully if the proxy is unavailable.
 */
export async function fetchUrlHtml(url: string): Promise<{ ok: boolean; html: string; message: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        ok: false,
        html: '',
        message: `No se pudo obtener el HTML de la URL (HTTP ${response.status}). Intenta pegar el HTML directamente.`,
      };
    }

    const html = await response.text();
    if (!html.trim()) {
      return {
        ok: false,
        html: '',
        message: 'La URL devolvió un contenido vacío. Intenta pegar el HTML directamente.',
      };
    }

    return {
      ok: true,
      html,
      message: 'HTML obtenido con éxito.',
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        ok: false,
        html: '',
        message: 'La solicitud de la URL tardó demasiado. Intenta pegar el HTML directamente.',
      };
    }
    return {
      ok: false,
      html: '',
      message: `Error al obtener la URL: ${error instanceof Error ? error.message : String(error)}. Intenta pegar el HTML directamente.`,
    };
  }
}

