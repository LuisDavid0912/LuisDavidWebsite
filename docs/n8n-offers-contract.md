# Contrato de datos — Dashboard de Ofertas (n8n ↔ Supabase ↔ web)

Este documento define **exactamente** qué debe guardar el flujo de n8n en
Supabase y qué debe devolver el webhook de lectura para que la mini app
`offers-dashboard` (`src/components/miniapps/offers/`) funcione sin cambios.

Archivos relacionados en el repo:

| Archivo | Rol |
|---|---|
| `src/types/offers.ts` | Interfaces TypeScript (`Offer`, `OfferCategory`, filtros) |
| `src/services/offersService.ts` | `fetchOffers()` — GET al webhook, timeout 10 s, validación y caché de sesión (5 min) |
| `src/components/miniapps/offers/` | UI del dashboard (tarjetas, tabla, filtros, estados) |
| `src/content/site.ts` → `offersDashboard` | Toda la copia en español |

---

## 1. Arquitectura

```
[n8n · cron/scraper] ──insert/upsert──▶ [Supabase · tabla public.ofertas]
                                                    ▲
[navegador] ──GET──▶ [n8n · webhook público /webhook/offers] ──select──┘
                          │
                          └──JSON──▶ fetchOffers() ──▶ <OffersDashboard />
```

El frontend es un sitio estático (`output: 'export'`). **Nunca** habla con
Supabase directamente ni envía tokens. Toda la seguridad vive en n8n.

---

## 2. Estructura JSON de una oferta (lo que n8n debe guardar)

Un registro = un objeto con esta forma. Nombres en `snake_case` español,
idénticos a las columnas de la tabla y a la interfaz `Offer`.

```json
{
  "id": "vuelo-mex-cun-2026-10-12-aeromexico",
  "titulo": "Vuelo redondo CDMX → Cancún en octubre",
  "categoria": "vuelos",
  "origen": "Ciudad de México (MEX)",
  "destino": "Cancún (CUN)",
  "precio": 2890,
  "moneda": "MXN",
  "fecha_inicio": "2026-10-12",
  "fecha_fin": "2026-10-19",
  "detalles": "Incluye equipaje de mano. Tarifa básica, salidas entre semana.",
  "url_reserva": "https://ejemplo.com/ofertas/vuelo-mex-cun",
  "updated_at": "2026-09-14T13:05:00Z"
}
```

### Reglas por campo

| Campo | Tipo | Obligatorio | Reglas |
|---|---|---|---|
| `id` | `string` | ✅ | Único y **estable** entre ejecuciones (úsalo como clave de upsert). Recomendado: slug determinista o hash de `url_reserva`. |
| `titulo` | `string` | ✅ | Máx. ~120 caracteres para que la tarjeta no se rompa. |
| `categoria` | `"viajes" \| "vuelos" \| "empleos" \| "servicios"` | ✅ | Minúsculas. Cualquier otro valor hace que la fila se **descarte** en el frontend. |
| `origen` | `string` | ➖ | Ciudad, aeropuerto, empresa, región… Puede ir vacío (`""`). |
| `destino` | `string` | ➖ | Igual que `origen`. |
| `precio` | `number` | ✅ | Numérico, sin símbolos. Usa `0` cuando no aplique (ej. empleos) → la UI muestra "Consultar". |
| `moneda` | `string` | ➖ | ISO 4217 (`MXN`, `USD`…). Si falta, el frontend asume `MXN`. |
| `fecha_inicio` | `string \| null` | ➖ | ISO-8601 `YYYY-MM-DD` (o datetime). `null` si no aplica. |
| `fecha_fin` | `string \| null` | ➖ | Igual. Si solo hay una fecha, deja `fecha_fin: null`. |
| `detalles` | `string` | ➖ | Texto plano (sin HTML). Se recorta a 3 líneas en tarjeta. |
| `url_reserva` | `string` | ✅ | **Debe** empezar por `https://` o `http://`. Otros esquemas se descartan. |
| `updated_at` | `string` | ✅ | ISO-8601 datetime. Ponlo con `{{ $now.toISO() }}` en cada insert/upsert. Se usa para "Más recientes" y "Última actualización". |

> Filas que no cumplan `id`, `titulo`, `categoria` válida o `url_reserva`
> válida se ignoran silenciosamente en `normalizeOffer()`.

---

## 3. Tabla en Supabase (DDL — también en `docs/n8n/ofertas.sql`)

```sql
create table if not exists public.ofertas (
  id            text primary key,
  titulo        text not null,
  categoria     text not null check (categoria in ('viajes','vuelos','empleos','servicios')),
  origen        text not null default '',
  destino       text not null default '',
  precio        numeric(12,2) not null default 0,
  moneda        char(3) not null default 'MXN',
  fecha_inicio  date,
  fecha_fin     date,
  detalles      text not null default '',
  url_reserva   text not null,
  activo        boolean not null default true,   -- para ocultar sin borrar
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists ofertas_categoria_idx on public.ofertas (categoria);
create index if not exists ofertas_updated_at_idx on public.ofertas (updated_at desc);

-- RLS: nadie lee desde el navegador; solo la service key de n8n.
alter table public.ofertas enable row level security;
```

`activo` y `created_at` son internos: el webhook de lectura **no** los expone.

---

## 4. Flujo de escritura (n8n)

Implementado en el workflow **Ofertas — Recolector (n8n → Supabase)**
(`ELYn1cZwGkatXOgz`, respaldo en `docs/n8n/ofertas-recolector.json`):

1. **Schedule Trigger** diario 07:00.
2. **Offers Source (PLACEHOLDER)** → sustituir por la fuente real; debe emitir un item por oferta.
3. **Normalize to Contract** (Code) → aplica las reglas del punto 2 y descarta filas inválidas.
4. **Delete Existing by ID** + **Insert Offers** (nodos Supabase) → equivale a un upsert por `id`.
   Se usa este par en lugar de `Prefer: resolution=merge-duplicates` porque el nodo Supabase
   nativo recibe la credencial automáticamente y no tiene operación de upsert.
5. **Deactivate Expired Offers** → `activo = false` donde `fecha_fin < hoy`.

---

## 5. Webhook de lectura (n8n) — lo que consume el frontend

- **URL**: `https://n8n.luisdavidmag.com/webhook/offers` (constante
  `OFFERS_WEBHOOK_URL` en `offersService.ts`).
- **Método**: `GET`. Sin headers de autenticación (el cliente no envía nada
  más que `Accept: application/json`).
- **Respuesta preferida** (`Respond to Webhook` → JSON):

```json
{
  "ok": true,
  "offers": [
    { "...": "objetos con la forma del punto 2" }
  ]
}
```

También se aceptan `{ "data": [...] }`, un array plano `[...]`, o el formato
nativo de n8n `[{ "json": {...} }, ...]`.

### Nodos sugeridos

```
Webhook (GET /offers)
  → Code: validar Origin ∈ allowlist, si no → responder 403
  → Rate limit (Redis / Data table / Code con ventana por IP)
  → Supabase: select id,titulo,categoria,origen,destino,precio,moneda,
              fecha_inicio,fecha_fin,detalles,url_reserva,updated_at
              where activo = true
              order by updated_at desc
              limit 200
  → Respond to Webhook: { ok: true, offers: $input.all().map(i => i.json) }
```

### Seguridad obligatoria del endpoint (regla 2.5 de CLAUDE.md)

1. **Allowlist de `Origin`**: `https://luisdavidmag.com` y
   `https://www.luisdavidmag.com` (+ `http://localhost:3000` solo en dev).
2. **Rate limit por IP** (ej. 30 req / min).
3. **Solo lectura, solo columnas públicas** y `limit` acotado (≤ 200 filas).
4. Headers de respuesta recomendados:
   `Access-Control-Allow-Origin: <origin validado>`,
   `Cache-Control: public, max-age=300`.

---

## 6. Caché en el navegador

`fetchOffers()` guarda la última respuesta en `sessionStorage`
(`offers-dashboard-cache-v1`) durante 5 minutos. El botón "Actualizar" del
dashboard fuerza una nueva petición (`forceRefresh: true`).
