'use client';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Home-only editorial visualizations.
 *
 * Distinct from the /about set (visualizations.tsx) on purpose — each page
 * gets its own visual motifs so nothing repeats across the site. Same
 * line-art language (accent stroke + alpha fills) themed per home card.
 */

/* ============ § 02 · Qué hago ============ */

/* Área 1 — Formación en inteligencia artificial:
   pantalla/curso con botón de play → módulos de lección con progreso */
export function VizLearning({ color, lineColor }: { color: string; lineColor: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 280 90"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Screen / monitor */}
      <rect x={12} y={14} width={108} height={62} rx={6} fill={alpha(color, 0.06)} stroke={color} strokeWidth={1.3} />
      <line x1={12} y1={27} x2={120} y2={27} stroke={lineColor} strokeWidth={1} />
      <circle cx={21} cy={20.5} r={1.6} fill={color} />
      <circle cx={28} cy={20.5} r={1.6} fill={alpha(color, 0.5)} />
      {/* Play button */}
      <circle cx={58} cy={52} r={15} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.2} />
      <polygon points="53,45 53,59 65,52" fill={color} />
      {/* Knowledge spark */}
      <path d="M100 44 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 z" fill={alpha(color, 0.5)} stroke={color} strokeWidth={0.8} />
      {/* Connectors → lesson modules */}
      <path d="M120 33 C 150 33, 150 22, 176 22" stroke={color} strokeWidth={1.2} fill="none" />
      <path d="M120 47 L176 47" stroke={color} strokeWidth={1.2} fill="none" />
      <path d="M120 61 C 150 61, 150 72, 176 72" stroke={color} strokeWidth={1.2} fill="none" />
      {/* Lesson modules with progress */}
      {[22, 47, 72].map((cy, i) => (
        <g key={i}>
          <rect x={176} y={cy - 9} width={92} height={18} rx={4} fill={alpha(color, i === 0 ? 0.18 : 0.1)} stroke={color} strokeWidth={1.1} />
          <circle cx={187} cy={cy} r={3.4} fill="none" stroke={color} strokeWidth={1.1} />
          {i < 2 && <path d={`M185 ${cy} l1.6 2 l3.2 -3.8`} fill="none" stroke={color} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />}
          <line x1={197} y1={cy - 2} x2={258} y2={cy - 2} stroke={color} strokeWidth={0.8} opacity={0.5} />
          <line x1={197} y1={cy + 3} x2={244} y2={cy + 3} stroke={color} strokeWidth={0.8} opacity={0.3} />
        </g>
      ))}
    </Box>
  );
}

/* Área 2 — Arquitectura de negocios digitales:
   stack de capas conectadas sobre una base (infraestructura por capas) */
export function VizStack({ color, lineColor }: { color: string; lineColor: string }) {
  const layers = [8, 26, 44, 62];
  return (
    <Box
      component="svg"
      viewBox="0 0 280 90"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Side frame pillars */}
      <line x1={44} y1={4} x2={44} y2={84} stroke={lineColor} strokeWidth={1} />
      <line x1={236} y1={4} x2={236} y2={84} stroke={lineColor} strokeWidth={1} />
      {layers.map((y, i) => (
        <g key={i}>
          <rect x={52} y={y} width={176} height={14} rx={3} fill={alpha(color, i % 2 === 0 ? 0.18 : 0.1)} stroke={color} strokeWidth={1.1} />
          <circle cx={62} cy={y + 7} r={1.6} fill={color} />
          <line x1={70} y1={y + 7} x2={118} y2={y + 7} stroke={color} strokeWidth={0.8} opacity={0.5} />
          <line x1={150} y1={y + 7} x2={208} y2={y + 7} stroke={color} strokeWidth={0.8} opacity={0.35} />
          {i < layers.length - 1 && <line x1={140} y1={y + 14} x2={140} y2={y + 18} stroke={color} strokeWidth={1} />}
          {/* connection nodes on pillars */}
          <circle cx={44} cy={y + 7} r={1.8} fill={color} />
          <circle cx={236} cy={y + 7} r={1.8} fill={color} />
        </g>
      ))}
      {/* Foundation base */}
      <rect x={40} y={82} width={200} height={5} rx={2.5} fill={alpha(color, 0.25)} />
    </Box>
  );
}

/* Área 3 (wide) — Implementación en empresas:
   hub central (empresa/edificio) con herramientas integrándose alrededor */
export function VizIntegrate({ color, lineColor }: { color: string; lineColor: string }) {
  const tools = [
    { x: 12, y: 16, node: [110, 60], dashed: false, active: true },
    { x: 218, y: 16, node: [170, 60], dashed: true, active: false },
    { x: 8, y: 79, node: [106, 90], dashed: false, active: true },
    { x: 222, y: 79, node: [174, 90], dashed: false, active: true },
    { x: 12, y: 142, node: [110, 120], dashed: true, active: false },
    { x: 218, y: 142, node: [170, 120], dashed: false, active: true },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 280 180"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Connectors tool → hub */}
      {tools.map((t, i) => {
        const cx = t.x + 25;
        const cy = t.y + 11;
        return (
          <line
            key={`c-${i}`}
            x1={cx}
            y1={cy}
            x2={t.node[0]}
            y2={t.node[1]}
            stroke={color}
            strokeWidth={1.2}
            strokeDasharray={t.dashed ? '3 3' : undefined}
            opacity={t.dashed ? 0.55 : 0.9}
          />
        );
      })}
      {/* Central hub — edificio/empresa */}
      <rect x={106} y={56} width={68} height={68} rx={10} fill={alpha(color, 0.1)} stroke={color} strokeWidth={1.5} />
      {/* windows */}
      {[120, 136, 152].map((x) =>
        [66, 84].map((y) => (
          <rect key={`w-${x}-${y}`} x={x} y={y} width={9} height={9} rx={1.5} fill={alpha(color, 0.3)} stroke={color} strokeWidth={0.8} />
        )),
      )}
      {/* door */}
      <rect x={131} y={104} width={14} height={18} rx={1.5} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1} />
      {/* plug nodes at hub edges */}
      {tools.map((t, i) => (
        <circle key={`n-${i}`} cx={t.node[0]} cy={t.node[1]} r={2.4} fill={color} />
      ))}
      {/* Tools */}
      {tools.map((t, i) => (
        <g key={`t-${i}`}>
          <rect x={t.x} y={t.y} width={50} height={22} rx={4} fill={alpha(color, t.active ? 0.16 : 0.08)} stroke={color} strokeWidth={1.1} />
          <circle cx={t.x + 10} cy={t.y + 11} r={2.6} fill="none" stroke={color} strokeWidth={1.1} />
          <line x1={t.x + 18} y1={t.y + 8} x2={t.x + 42} y2={t.y + 8} stroke={color} strokeWidth={0.8} opacity={0.5} />
          <line x1={t.x + 18} y1={t.y + 14} x2={t.x + 36} y2={t.y + 14} stroke={color} strokeWidth={0.8} opacity={0.3} />
          {t.active && (
            <path d={`M${t.x + 8} ${t.y + 11} l1.6 2 l3.2 -3.8`} fill="none" stroke={color} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      ))}
    </Box>
  );
}

/* ============ § 04 · Casos de uso ============ */

/* E.01 — Automatización de captación de clientes:
   prospectos dispersos → embudo → tarjeta de contacto/CRM */
export function VizFunnelDrop({ color, lineColor }: { color: string; lineColor: string }) {
  const leads = [
    { x: 24, y: 12 }, { x: 42, y: 8 }, { x: 60, y: 13 },
    { x: 36, y: 20 }, { x: 54, y: 21 }, { x: 70, y: 9 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {/* incoming leads */}
      {leads.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.1} fill={color} opacity={0.7} />
      ))}
      {/* funnel */}
      <path d="M16 28 L88 28 L60 50 L60 64 L44 64 L44 50 Z" fill={alpha(color, 0.1)} stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
      <line x1={26} y1={34} x2={78} y2={34} stroke={color} strokeWidth={0.8} opacity={0.4} />
      <line x1={34} y1={41} x2={70} y2={41} stroke={color} strokeWidth={0.8} opacity={0.3} />
      {/* drops + arrow to CRM */}
      <circle cx={52} cy={71} r={2.2} fill={color} />
      <path d="M64 60 L116 56" stroke={color} strokeWidth={1.3} fill="none" />
      <polygon points="112,53 118,56 112,59" fill={color} />
      {/* CRM / contact card */}
      <rect x={120} y={28} width={66} height={42} rx={5} fill={alpha(color, 0.06)} stroke={color} strokeWidth={1.2} />
      <circle cx={135} cy={42} r={6} fill={alpha(color, 0.2)} stroke={color} strokeWidth={1.1} />
      <line x1={148} y1={39} x2={178} y2={39} stroke={color} strokeWidth={1} opacity={0.6} />
      <line x1={148} y1={45} x2={170} y2={45} stroke={color} strokeWidth={1} opacity={0.4} />
      <line x1={128} y1={58} x2={178} y2={58} stroke={color} strokeWidth={0.8} opacity={0.3} />
    </Box>
  );
}

/* E.02 — Automatización de marketing:
   megáfono → contenido emitido en abanico + reloj (programación) */
export function VizBroadcast({ color, lineColor }: { color: string; lineColor: string }) {
  const cards = [
    { x: 96, y: 8, rot: -14 },
    { x: 108, y: 30, rot: 0 },
    { x: 96, y: 52, rot: 14 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {/* megaphone handle */}
      <rect x={12} y={34} width={8} height={14} rx={2} fill={alpha(color, 0.2)} stroke={color} strokeWidth={1.1} />
      {/* megaphone horn */}
      <path d="M20 30 L46 22 L46 60 L20 52 Z" fill={alpha(color, 0.15)} stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M46 26 L54 24 L54 58 L46 56" fill={alpha(color, 0.1)} stroke={color} strokeWidth={1.1} strokeLinejoin="round" />
      {/* sound waves */}
      <path d="M60 30 Q 67 41, 60 52" stroke={color} strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M68 26 Q 79 41, 68 56" stroke={color} strokeWidth={1} fill="none" opacity={0.3} />
      {/* emitted content cards */}
      {cards.map((c, i) => (
        <g key={i} transform={`rotate(${c.rot} ${c.x + 18} ${c.y + 10})`}>
          <rect x={c.x} y={c.y} width={40} height={20} rx={3} fill={alpha(color, i === 1 ? 0.18 : 0.1)} stroke={color} strokeWidth={1.1} />
          <line x1={c.x + 7} y1={c.y + 8} x2={c.x + 33} y2={c.y + 8} stroke={color} strokeWidth={0.9} opacity={0.55} />
          <line x1={c.x + 7} y1={c.y + 13} x2={c.x + 25} y2={c.y + 13} stroke={color} strokeWidth={0.9} opacity={0.35} />
        </g>
      ))}
      {/* schedule clock */}
      <circle cx={176} cy={18} r={11} fill={alpha(color, 0.06)} stroke={color} strokeWidth={1.2} />
      <line x1={176} y1={18} x2={176} y2={11} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <line x1={176} y1={18} x2={181} y2={21} stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Box>
  );
}

/* E.03 — Dashboards de negocio:
   panel con dona de progreso + barras + tile KPI + sparkline */
export function VizDashboard({ color, lineColor }: { color: string; lineColor: string }) {
  const bars = [
    { x: 78, h: 16 }, { x: 90, h: 26 }, { x: 102, h: 20 }, { x: 114, h: 32 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {/* panel frame */}
      <rect x={6} y={8} width={188} height={64} rx={6} fill={alpha(color, 0.04)} stroke={lineColor} strokeWidth={1} />
      {/* donut */}
      <circle cx={38} cy={40} r={16} fill="none" stroke={alpha(color, 0.18)} strokeWidth={6} />
      <circle
        cx={38}
        cy={40}
        r={16}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray="64 36"
        transform="rotate(-90 38 40)"
      />
      <circle cx={38} cy={40} r={3} fill={color} />
      {/* bars */}
      <line x1={72} y1={58} x2={128} y2={58} stroke={color} strokeWidth={0.8} opacity={0.35} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={58 - b.h} width={7} height={b.h} rx={1.5} fill={alpha(color, i === bars.length - 1 ? 0.45 : 0.22)} stroke={color} strokeWidth={1} />
      ))}
      {/* KPI tile */}
      <rect x={146} y={16} width={40} height={22} rx={3} fill={alpha(color, 0.1)} stroke={color} strokeWidth={1.1} />
      <line x1={152} y1={24} x2={170} y2={24} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <line x1={152} y1={31} x2={180} y2={31} stroke={color} strokeWidth={1} opacity={0.4} />
      {/* sparkline */}
      <path d="M146 62 l8 -5 l8 3 l8 -7 l8 4 l8 -6" fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

/* E.04 — Automatización de procesos internos:
   engranajes engranados + rayo de automatización */
export function VizGears({ color, lineColor }: { color: string; lineColor: string }) {
  const gear = (cx: number, cy: number, r: number, teeth: number, fillAlpha: number) => {
    const lines = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * r;
      const y1 = cy + Math.sin(a) * r;
      const x2 = cx + Math.cos(a) * (r + 5);
      const y2 = cy + Math.sin(a) * (r + 5);
      lines.push(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.4} strokeLinecap="round" />,
      );
    }
    return (
      <g>
        {lines}
        <circle cx={cx} cy={cy} r={r} fill={alpha(color, fillAlpha)} stroke={color} strokeWidth={1.4} />
        <circle cx={cx} cy={cy} r={r * 0.38} fill="none" stroke={color} strokeWidth={1.2} />
      </g>
    );
  };
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {gear(64, 42, 20, 9, 0.1)}
      {gear(112, 48, 14, 8, 0.16)}
      {/* automation bolt */}
      <path d="M156 18 L146 42 L154 42 L150 62 L166 36 L157 36 Z" fill={alpha(color, 0.45)} stroke={color} strokeWidth={1} strokeLinejoin="round" />
    </Box>
  );
}
