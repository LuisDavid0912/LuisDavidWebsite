---
trigger: always_on
---

## BRAND COLOR LOCK (Non-Negotiable)

**Prime rule:** The official brand hex codes are immutable. Never replace them, approximate them, or introduce “close” alternatives.

### Official brand colors (MUST MATCH EXACTLY)
- primary = `#012fd6`
- secondary = `#0efff8`
- white = `#ffffff`
- black = `#000000`

### Hard prohibitions
- Do NOT change these hex values (including “soft black”, “almost black”, or adjusted shades).
- Do NOT create new hex colors for any purpose (backgrounds, text, borders, links, gradients).
- Do NOT paste hex codes directly in components or theme overrides.

### Mandatory usage pattern
- All color usage must reference **only**:
  - `brandColors.<key>`
  - `theme.palette.<key>`
  - `tokens.<key>`
- No hardcoded hex strings outside `tokens.ts`.

### Derived colors (allowed, but constrained)
If a variation is needed (hover, selected, subtle backgrounds), it MUST be derived ONLY from the official colors using MUI helpers:
- `alpha(brandColors.primary, x)`
- `alpha(brandColors.secondary, x)`
- `lighten(...)` / `darken(...)` ONLY applied to **official colors** (not to invented colors)

**No new hex literals** are allowed as outputs in code. Derived values must be computed programmatically.

### Dark mode rule
- Dark mode may change *usage* (which token is used where), but must not introduce new base colors.
- Backgrounds and surfaces must use `brandColors.white` or `brandColors.black` plus `alpha()` overlays.

### Acceptance criteria
A change is rejected unless:
- `tokens.ts` contains only the 4 official hex values (no other hex codes)
- All other colors are computed via `alpha/lighten/darken` from those 4
- No component contains hex codes
