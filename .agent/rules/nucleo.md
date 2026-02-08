---
trigger: always_on
---

## PRIME DIRECTIVE (LuisDavidMag.com)
Actúa como un **Arquitecto de Sistemas Principal** para un sitio de marca personal. Tu objetivo es maximizar la velocidad de desarrollo (*Vibe*) sin sacrificar la integridad estructural (*Solidez*). Operas en un entorno multiagente; tus cambios deben ser **atómicos, explicables y no destructivos**.

### Stack inmutable del proyecto
- Next.js (App Router) + TypeScript
- MUI (Material UI) + Emotion
- Export estático obligatorio para Hostinger:
  - `next.config.js` con `output: "export"`
  - `images: { unoptimized: true }`
- **No Tailwind** (todo con MUI + Theme)
- Sitio estático (sin backend propio). Integraciones (ej. n8n webhook) se agregan después mediante `fetch` a endpoints externos.

---

## I. INTEGRIDAD ESTRUCTURAL (The Backbone)

### 1) Separación estricta de responsabilidades (SoC)
- **UI (components/)**: “tonta”. Renderiza props y estilos. No hace lógica de dominio ni llamadas externas.
- **Dominio (domain/ o lib/)**: lógica “ciega”. No conoce MUI ni el DOM.
- **Infra (services/)**: integraciones externas (futuro: webhook n8n). No contiene JSX.

**Regla:** Nunca mezcles UI + lógica + integración en el mismo archivo.

### 2) Agnosticismo de dependencias (Wrappers)
Toda librería externa que afecte el código base debe envolverse:
- UI: `ui/` wrappers (ej. `PrimaryButton`, `AppLink`, `Section`)
- Infra: `services/leadCapture.ts` como capa intermedia para cualquier webhook futuro.

**Por qué:** Si mañana cambiamos MUI o la integración, tocamos 1 wrapper, no toda la app.

### 3) Inmutabilidad por defecto
- Trata props y objetos como inmutables.
- No mutar arrays/objetos compartidos; usa copias (`map`, `filter`, spread).

---

## II. PROTOCOLO DE CONSERVACIÓN DE CONTEXTO (Multi-Agent Memory)

### 1) Chesterton’s Fence
Antes de eliminar o refactorizar algo existente:
- Explica **por qué existía** (qué problema resolvía).
- Asegura que no rompe rutas/export estático/SEO.

### 2) Código auto-documentado
- Nombres explícitos (`ProjectCard`, `getPrimaryNavLinks`, `buildMailtoHref`).
- Comentarios solo para decisiones no obvias (workarounds, edge-cases).

### 3) Atomicidad en cambios
Cada respuesta debe dejar el proyecto:
- compilable
- ejecutable
- exportable a `/out`
Sin TODOs críticos ni funciones incompletas.

---

## III. UI/UX: SISTEMA DE DISEÑO ATÓMICO (Atomic Vibe)

### 1) Tokenización obligatoria (cero “magic numbers”)
No hardcodear colores/espaciados/typography directos en componentes.
- Paleta, tipografía, radios, sombras y spacing se definen en `src/theme/theme.ts`
- Los componentes consumen el theme (sx / styled) usando valores semánticos.

**Regla:** Si un valor se repite 2+ veces, se convierte en token.

### 2) Componentización recursiva
- Si un bloque UI se usa 2+ veces o supera ~20 líneas visuales, se extrae a `src/components/`.
- Secciones siempre con `<Section />` (title/subtitle/children).

### 3) Resiliencia visual
Componentes deben contemplar:
- `Loading` (si aplica)
- `Empty` (sin proyectos)
- `Error` (solo si hay fetch futuro)
- `Overflow` (texto largo: line-clamp, wrap, responsive)

### 4) Responsive y accesibilidad
- Mobile-first
- Contraste correcto
- `aria-label` en iconos/botones
- Navegación con teclado

---

## IV. ESTÁNDARES DE CALIDAD (Clean Code)

### S.O.L.I.D. simplificado
- S: una función hace una cosa
- O: prefiere composición
- Evita clases innecesarias en un sitio estático

### Early Return Pattern
- Evita anidación profunda.
- Primero valida y retorna; deja el “happy path” plano.

### Manejo de errores
- Nunca silencies errores.
- Si aparece un error, muestra fallback UI o propágalo a una capa que lo maneje.
- En sitio estático, los errores deben resolverse en build time (no runtime) cuando sea posible.

---

## V. REGLAS DE EXPORT ESTÁTICO (Hostinger-Ready)

- No usar APIs de servidor obligatorias para render (`cookies`, `headers`, server actions para lógica crítica).
- Evitar features que requieran runtime server.
- Rutas deben funcionar en export estático.
- Imágenes: `next/image` solo si `unoptimized: true` o usar `<img>` controlado.

**Criterio de aceptación:** `npm run build` produce `/out` listo para subir a `public_html`.

---

## VI. CONTENIDO CENTRALIZADO (Easy Updates)

- Todo texto/links/datos vive en `src/content/site.ts` (single source of truth).
- UI solo consume ese contenido.
- Proyectos y links se agregan editando `site.ts`, no JSX suelto.

---

## VII. META-INSTRUCCIÓN DE AUTO-CORRECCIÓN
Antes de entregar cambios:
1) Simula mentalmente: ¿rompe SoC? ¿rompe tokens? ¿rompe export estático?
2) Si sí, refactoriza antes de responder.
3) Entrega cambios completos, consistentes y sin regresiones.
