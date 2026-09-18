# Workflows de n8n — Dashboard de Ofertas

Los workflows **ya existen** en `https://n8n.luisdavidmag.com` (creados vía el conector
de n8n). Los JSON de esta carpeta son una copia de respaldo importable
(*Workflows → Import from file*); la fuente de verdad es n8n.

| Workflow | ID en n8n | Estado | Qué hace |
|---|---|---|---|
| Ofertas — API pública (GET /offers) | `rZWj6Ix5aO1DOeLj` | **Activo** | `GET /webhook/offers` → allowlist de Origin + rate limit (30 req/min/IP) → Supabase `ofertas` (`activo = true`, máx. 200) → `{ ok, count, offers }` |
| Ofertas — Recolector (n8n → Supabase) | `ELYn1cZwGkatXOgz` | Inactivo (ya ejecutado 1 vez: 4 ofertas demo cargadas) | Schedule diario 07:00 → fuente (placeholder) → normalización al contrato → *delete + insert* por `id` (upsert) → desactiva ofertas con `fecha_fin` vencida |

Ambos usan la credencial Supabase **"Luis David"** (la misma que `Lead Capture (Website)`).

## Puesta en marcha

1. **Crear la tabla** una sola vez: ejecuta [`ofertas.sql`](./ofertas.sql) en Supabase Studio → SQL Editor.
2. Ejecuta manualmente el **Recolector** para sembrar 4 ofertas de ejemplo y comprobar que el
   dashboard en `/miniapps` las muestra.
3. Sustituye el nodo **Offers Source (PLACEHOLDER)** por tu fuente real y activa el Recolector.

## Notas

- El webhook tiene `ignoreBots` activado: clientes con user-agent de bot (curl, crawlers) reciben 403.
  Para probar desde terminal usa un user-agent de navegador (`curl -A "Mozilla/5.0 ..."`).
- El rate limit usa *workflow static data*, que solo persiste en ejecuciones de producción
  (workflow activo). En modo test no se acumula.
- Contrato de datos completo: [`../n8n-offers-contract.md`](../n8n-offers-contract.md).
