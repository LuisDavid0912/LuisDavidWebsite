# Reglas del proyecto — luisdavidmag.com

Este archivo lo lee automáticamente Claude Code / Cursor / editores con IA
antes de modificar el proyecto. Contiene el contrato de buenas prácticas
que TODA asistencia de IA debe respetar en este repo.

Si vas a generar código para este proyecto, leelo completo antes.

---

## 1. Stack y arquitectura

- **Framework**: Next.js 14 (App Router) con `output: 'export'` → sitio
  estático puro. NO hay server routes (`/app/api/*`). NO se puede usar
  `getServerSideProps`, middleware server-side, ni APIs internas.
- **UI**: Material UI v6 (MUI) + Emotion. No mezclar con Tailwind ni otras librerías de estilos.
- **Lenguaje**: TypeScript estricto. Nada de `any` sin justificación.
- **Hosting**: Hostinger (estático). VPS separado con Dokploy para n8n + Supabase + otros servicios.
- **Datos / captura de leads**: navegador → webhook público de n8n → n8n escribe en Supabase y dispara secuencia de emails. El frontend NUNCA habla directo con Supabase.

## 2. Seguridad (crítico — no negociable)

1. **NUNCA** pongas secretos en variables `NEXT_PUBLIC_*`. Todo lo que tenga ese prefijo se compila dentro del JavaScript que descarga el navegador y queda visible públicamente.
2. **NUNCA** hagas fetch directo desde el cliente con tokens, claves de API o JWTs en headers. Si una llamada necesita autenticación, debe protegerse del lado del servidor (en este proyecto, del lado de n8n).
3. **NUNCA** comitees archivos `.env` ni `*.key`. Verifica `.gitignore` antes de crear archivos con secretos.
4. Formularios públicos SIEMPRE deben incluir:
   - Campo honeypot oculto (`name="website"`) cableado al estado `hp`.
   - Regex de email estricto (ver `EMAIL_REGEX` en `src/services/leadCapture.ts`).
   - Guardado en `sessionStorage` para bloquear reenvíos duplicados en la misma sesión.
   - Timeout en fetch (AbortController, ≤10s).
5. El endpoint de n8n DEBE estar protegido en el workflow con: allowlist de `Origin`, rate limit por IP, rechazo si `hp` viene con valor.
6. Si detectas un secreto expuesto en código o en un bundle, detén la tarea y avisa al usuario para rotar la credencial antes de continuar.

## 3. Organización del código

- `src/app/`          → páginas (App Router). Cada carpeta = ruta.
- `src/components/`   → componentes compartidos. Formularios en `components/forms/`.
- `src/content/`      → toda la copia del sitio en `site.ts` (fuente única de verdad). NO hardcodear strings en componentes.
- `src/services/`     → capa de infraestructura (webhooks, APIs externas). Sin UI ni lógica de negocio.
- `src/theme/`        → tokens de diseño y configuración MUI.
- `src/types/`        → tipos compartidos.
- `src/assets/`       → imágenes y recursos estáticos importados por código.

## 4. Convenciones de código

- Imports con alias `@/*` (ver `tsconfig.json`). NO usar `../../../`.
- Componentes en PascalCase, funciones camelCase, constantes SCREAMING_SNAKE_CASE.
- Cada componente cliente empieza con `'use client';` en la primera línea.
- Copy y strings UI siempre en español. El código (variables, funciones, comentarios técnicos) en inglés.
- Accesibilidad: todo `<button>`/rol `button` necesita `aria-label` o texto visible. Forms con `aria-label` y `noValidate` + validación propia.
- Animaciones con MUI `Fade` / `Collapse`, no CSS transitions sueltas.

## 5. Captura de leads

- Usar siempre `submitLead` de `src/services/leadCapture.ts`. NO crear clientes fetch paralelos.
- Campos estándar: `name`, `email`. Opcionales: `resource`, `diagnostic`, `message`, `hp`, `captchaToken`.
- Tras éxito: limpiar estado, marcar `sessionStorage`, llamar `onSuccess?.()` si aplica.
- En caso de resource gate: cerrar dialog y mostrar botón de descarga.

## 6. Contenido y tono de la marca

- Audiencia principal: dueños de negocios físicos (restaurantes, estéticas, talleres, clínicas, retail) interesados en IA y automatización, y aprendices curiosos que eventualmente pueden volverse emprendedores.
- Tono: directo, cálido, práctico, sin jerga técnica cuando la audiencia es no-técnica. Ejemplos concretos siempre que se pueda.
- Nunca prometer resultados irreales. Nunca generar testimonios ficticios.

## 7. Al agregar dependencias

- Antes de `npm install`, preguntar si de verdad se necesita. El bundle importa.
- Prioridad: lo ya presente (MUI, Next, React). Si hace falta algo nuevo, preferir librería bien mantenida y con buen tree-shaking.
- Fijar versiones en `package.json` sin `^` si es crítica para seguridad.

## 8. Al generar páginas nuevas

1. Agregar la copia en `src/content/site.ts` primero.
2. Crear la página en `src/app/<ruta>/page.tsx` consumiendo `siteContent`.
3. Respetar el layout general (Navbar + contenido + Footer viene de `src/app/layout.tsx`).
4. Aspectos legales: no generar páginas que prometan licencias, certificaciones o servicios que el usuario no ofrezca realmente.

## 9. Workflow de git

- Commits en inglés, formato convencional (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`).
- NO hacer `git add .` ni `git add -A` ciegamente. Agregar archivos por nombre.
- NUNCA pushear con `--force` a `main`.
- NUNCA usar `--no-verify` para saltarse hooks.

## 10. Cosas que la IA NO debe hacer sin preguntar

- Cambiar `next.config.js` o `tsconfig.json`.
- Añadir tracking / analytics de terceros.
- Modificar la estructura de `src/content/site.ts` (solo agregar campos, no renombrar los existentes; muchos componentes lo consumen).
- Borrar archivos.
- Cambiar el modelo de captura de leads (single source of truth).
- Mezclar Tailwind u otros sistemas de estilos.
- Hacer llamadas a servicios que requieran autenticación desde el cliente.

---

**Si algo en este archivo está desactualizado, actualízalo explícitamente
en un commit separado antes de hacer el cambio que requiere la nueva regla.**
