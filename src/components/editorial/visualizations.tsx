'use client';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Abstract editorial visualizations.
 *
 * Pure presentational SVGs driven by a `color` (and sometimes `lineColor`)
 * prop so they adapt to the active brand accent in light/dark mode. Shared
 * between /about and / (home) to keep the bento and pillar sections cohesive.
 */

/* Datos e inteligencia de negocio:
   Múltiples eventos → pipeline → dashboard con gráficas */
export function VizFlow({ color, lineColor }: { color: string; lineColor: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 280 90"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Sources (eventos) — pequeños cuadros apilados */}
      <g>
        <rect x={6} y={10} width={36} height={14} rx={2} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1.1} />
        <rect x={6} y={32} width={36} height={14} rx={2} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.1} />
        <rect x={6} y={54} width={36} height={14} rx={2} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1.1} />
        <rect x={6} y={76} width={36} height={6} rx={2} fill={alpha(color, 0.08)} stroke={lineColor} strokeWidth={1} />
      </g>
      {/* Convergencia hacia pipeline */}
      <path d="M42 17 C 70 17, 70 45, 96 45" stroke={color} strokeWidth={1.2} fill="none" />
      <path d="M42 39 L96 45" stroke={color} strokeWidth={1.2} fill="none" />
      <path d="M42 61 C 70 61, 70 45, 96 45" stroke={color} strokeWidth={1.2} fill="none" />
      {/* Pipeline / motor de procesamiento */}
      <rect x={96} y={26} width={88} height={38} rx={6} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.3} />
      <line x1={120} y1={26} x2={120} y2={64} stroke={lineColor} strokeWidth={1} />
      <line x1={156} y1={26} x2={156} y2={64} stroke={lineColor} strokeWidth={1} />
      <circle cx={108} cy={45} r={2.5} fill={color} />
      <circle cx={138} cy={45} r={2.5} fill={color} />
      <circle cx={170} cy={45} r={2.5} fill={color} />
      {/* Salida hacia dashboard */}
      <path d="M184 45 L208 45" stroke={color} strokeWidth={1.4} fill="none" />
      <polygon points="204,42 208,45 204,48" fill={color} />
      {/* Dashboard / mini bar-chart + sparkline */}
      <g transform="translate(214, 12)">
        <rect x={0} y={0} width={60} height={66} rx={4} fill={alpha(color, 0.06)} stroke={lineColor} strokeWidth={1} />
        {/* mini bars */}
        <rect x={6} y={40} width={8} height={18} fill={alpha(color, 0.35)} />
        <rect x={18} y={28} width={8} height={30} fill={alpha(color, 0.45)} />
        <rect x={30} y={36} width={8} height={22} fill={alpha(color, 0.35)} />
        <rect x={42} y={20} width={8} height={38} fill={color} />
        {/* trend line */}
        <path d="M6 24 L18 18 L30 22 L42 12 L52 8" fill="none" stroke={color} strokeWidth={1.4} />
      </g>
    </Box>
  );
}

/* Automatización e inteligencia artificial:
   Múltiples inputs → núcleo de IA (con procesamiento) → múltiples outputs */
export function VizBranch({ color, lineColor }: { color: string; lineColor: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 280 90"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Inputs */}
      <rect x={6} y={10} width={50} height={20} rx={4} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.1} />
      <rect x={6} y={60} width={50} height={20} rx={4} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.1} />
      {/* Núcleo IA — círculo con nodos internos */}
      <g>
        <circle cx={140} cy={45} r={26} fill={alpha(color, 0.10)} stroke={color} strokeWidth={1.3} />
        <circle cx={140} cy={45} r={18} fill="none" stroke={color} strokeWidth={1} strokeDasharray="2 2" opacity={0.7} />
        {/* nodos internos como una pequeña red neuronal */}
        <circle cx={128} cy={38} r={2.2} fill={color} />
        <circle cx={140} cy={32} r={2.2} fill={color} />
        <circle cx={152} cy={38} r={2.2} fill={color} />
        <circle cx={134} cy={52} r={2.2} fill={color} />
        <circle cx={146} cy={52} r={2.2} fill={color} />
        <line x1={128} y1={38} x2={140} y2={32} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={140} y1={32} x2={152} y2={38} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={128} y1={38} x2={134} y2={52} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={152} y1={38} x2={146} y2={52} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={134} y1={52} x2={146} y2={52} stroke={color} strokeWidth={0.8} opacity={0.6} />
      </g>
      {/* Outputs */}
      <rect x={224} y={10} width={50} height={20} rx={4} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.1} />
      <rect x={224} y={60} width={50} height={20} rx={4} fill={alpha(color, 0.12)} stroke={color} strokeWidth={1.1} />
      {/* Conexiones input → core */}
      <path d="M56 20 C 90 20, 100 45, 114 45" stroke={color} strokeWidth={1.3} fill="none" />
      <path d="M56 70 C 90 70, 100 45, 114 45" stroke={color} strokeWidth={1.3} fill="none" />
      {/* Conexiones core → output */}
      <path d="M166 45 C 190 45, 200 20, 224 20" stroke={color} strokeWidth={1.3} fill="none" />
      <path d="M166 45 C 190 45, 200 70, 224 70" stroke={color} strokeWidth={1.3} fill="none" />
      {/* puntos de paso */}
      <circle cx={114} cy={45} r={2} fill={color} />
      <circle cx={166} cy={45} r={2} fill={color} />
    </Box>
  );
}

/* Arquitectura de negocios digitales:
   DISPERSO → ESTRUCTURADO. Stack de bloques conectados (módulos del negocio) */
export function VizCluster({ color, lineColor }: { color: string; lineColor: string }) {
  const scatteredDots = [
    { x: 20, y: 40 }, { x: 48, y: 60 }, { x: 80, y: 32 },
    { x: 100, y: 80 }, { x: 36, y: 100 }, { x: 74, y: 120 },
    { x: 110, y: 48 }, { x: 22, y: 138 }, { x: 92, y: 148 },
    { x: 60, y: 160 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 280 180"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* Labels decorativos */}
      <text x={6} y={14} fontSize={8} fill={lineColor} letterSpacing={0.6} fontFamily="ui-monospace, monospace">
        DISPERSO
      </text>
      <text x={170} y={14} fontSize={8} fill={lineColor} letterSpacing={0.6} fontFamily="ui-monospace, monospace">
        ESTRUCTURADO
      </text>
      {/* Caos: puntos dispersos con conexiones débiles */}
      <g>
        {scatteredDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={3} fill={color} />
        ))}
        {/* algunas líneas débiles entre puntos */}
        <line x1={20} y1={40} x2={48} y2={60} stroke={color} strokeWidth={0.6} opacity={0.3} />
        <line x1={48} y1={60} x2={80} y2={32} stroke={color} strokeWidth={0.6} opacity={0.3} />
        <line x1={80} y1={32} x2={110} y2={48} stroke={color} strokeWidth={0.6} opacity={0.3} />
        <line x1={36} y1={100} x2={74} y2={120} stroke={color} strokeWidth={0.6} opacity={0.3} />
        <line x1={74} y1={120} x2={92} y2={148} stroke={color} strokeWidth={0.6} opacity={0.3} />
      </g>
      {/* Flecha de transformación */}
      <path d="M132 90 L150 90" stroke={color} strokeWidth={1.4} fill="none" />
      <polygon points="146,86 152,90 146,94" fill={color} />
      {/* Sistema estructurado — bloques modulares */}
      <g transform="translate(160,28)">
        <rect x={0} y={0} width={110} height={124} rx={6} fill={alpha(color, 0.04)} stroke={lineColor} strokeWidth={1} />
        {/* 6 módulos en grid 2x3 */}
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => {
            const x = 8 + col * 50;
            const y = 8 + row * 40;
            const isActive = (row + col) % 2 === 0;
            return (
              <g key={`m-${row}-${col}`}>
                <rect
                  x={x}
                  y={y}
                  width={42}
                  height={32}
                  rx={3}
                  fill={isActive ? alpha(color, 0.25) : alpha(color, 0.10)}
                  stroke={color}
                  strokeWidth={1.1}
                />
                {/* indicador interno */}
                <circle cx={x + 6} cy={y + 6} r={1.5} fill={color} />
                <line x1={x + 6} y1={y + 14} x2={x + 36} y2={y + 14} stroke={color} strokeWidth={0.8} opacity={0.5} />
                <line x1={x + 6} y1={y + 22} x2={x + 28} y2={y + 22} stroke={color} strokeWidth={0.8} opacity={0.5} />
              </g>
            );
          }),
        )}
        {/* conexiones entre módulos */}
        <line x1={50} y1={24} x2={58} y2={24} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={50} y1={64} x2={58} y2={64} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={50} y1={104} x2={58} y2={104} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={29} y1={40} x2={29} y2={48} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={79} y1={40} x2={79} y2={48} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={29} y1={80} x2={29} y2={88} stroke={color} strokeWidth={0.8} opacity={0.6} />
        <line x1={79} y1={80} x2={79} y2={88} stroke={color} strokeWidth={0.8} opacity={0.6} />
      </g>
    </Box>
  );
}

/* Atraer clientes: target/bullseye attracting scattered dots */
export function VizFunnel({ color }: { color: string }) {
  const incoming = [
    { x: 12, y: 16 }, { x: 22, y: 42 }, { x: 14, y: 64 },
    { x: 44, y: 22 }, { x: 38, y: 56 }, { x: 60, y: 36 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {/* dashed convergence lines */}
      {incoming.map((p, i) => (
        <line
          key={`l-${i}`}
          x1={p.x + 2}
          y1={p.y}
          x2={158}
          y2={40}
          stroke={color}
          strokeWidth={0.8}
          strokeDasharray="2 3"
          opacity={0.35}
        />
      ))}
      {/* incoming dots */}
      {incoming.map((p, i) => (
        <circle key={`d-${i}`} cx={p.x} cy={p.y} r={2.2} fill={color} opacity={0.75} />
      ))}
      {/* bullseye target */}
      <circle cx={158} cy={40} r={22} fill="none" stroke={color} strokeWidth={1.2} opacity={0.45} />
      <circle cx={158} cy={40} r={14} fill="none" stroke={color} strokeWidth={1.2} opacity={0.7} />
      <circle cx={158} cy={40} r={7} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1.4} />
      <circle cx={158} cy={40} r={3} fill={color} />
    </Box>
  );
}

/* Automatizar: 3 nodes + loop arrow showing repetition */
export function VizCycle({ color }: { color: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      <rect x={6} y={34} width={32} height={20} rx={4} fill={alpha(color, 0.15)} stroke={color} strokeWidth={1.2} />
      <rect x={84} y={34} width={32} height={20} rx={4} fill={alpha(color, 0.15)} stroke={color} strokeWidth={1.2} />
      <rect x={162} y={34} width={32} height={20} rx={4} fill={alpha(color, 0.15)} stroke={color} strokeWidth={1.2} />
      {/* linear arrows */}
      <path d="M38 44 L80 44" stroke={color} strokeWidth={1.4} fill="none" />
      <polygon points="80,41 84,44 80,47" fill={color} />
      <path d="M116 44 L158 44" stroke={color} strokeWidth={1.4} fill="none" />
      <polygon points="158,41 162,44 158,47" fill={color} />
      {/* loop back */}
      <path
        d="M178 34 Q 178 8, 100 8 Q 22 8, 22 34"
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray="3 3"
        opacity={0.7}
      />
      <polygon points="19,30 22,34 25,30" fill={color} opacity={0.85} />
    </Box>
  );
}

/* Centralizar datos: scattered points → database stack */
export function VizMerge({ color, lineColor }: { color: string; lineColor: string }) {
  const scattered = [
    { x: 10, y: 14 }, { x: 28, y: 32 }, { x: 14, y: 52 },
    { x: 36, y: 18 }, { x: 22, y: 70 }, { x: 50, y: 50 },
    { x: 44, y: 8 }, { x: 60, y: 28 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {scattered.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={color} opacity={0.7} />
      ))}
      {/* arrow */}
      <path d="M80 40 L108 40" stroke={color} strokeWidth={1.4} fill="none" />
      <polygon points="108,37 112,40 108,43" fill={color} />
      {/* database stack — 3 stacked cylinders */}
      <g transform="translate(130, 12)">
        <ellipse cx={26} cy={6} rx={26} ry={4} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1.2} />
        <line x1={0} y1={6} x2={0} y2={20} stroke={color} strokeWidth={1.2} />
        <line x1={52} y1={6} x2={52} y2={20} stroke={color} strokeWidth={1.2} />
        <ellipse cx={26} cy={20} rx={26} ry={4} fill={alpha(color, 0.12)} stroke={lineColor} strokeWidth={1} />
        <line x1={0} y1={20} x2={0} y2={34} stroke={color} strokeWidth={1.2} />
        <line x1={52} y1={20} x2={52} y2={34} stroke={color} strokeWidth={1.2} />
        <ellipse cx={26} cy={34} rx={26} ry={4} fill={alpha(color, 0.12)} stroke={lineColor} strokeWidth={1} />
        <line x1={0} y1={34} x2={0} y2={48} stroke={color} strokeWidth={1.2} />
        <line x1={52} y1={34} x2={52} y2={48} stroke={color} strokeWidth={1.2} />
        <ellipse cx={26} cy={48} rx={26} ry={4} fill={alpha(color, 0.18)} stroke={color} strokeWidth={1.2} />
      </g>
    </Box>
  );
}

/* Tomar mejores decisiones: bar chart + ascending trend line */
export function VizGrowth({ color }: { color: string }) {
  const bars = [
    { x: 12, h: 28 }, { x: 44, h: 46 }, { x: 76, h: 36 },
    { x: 108, h: 58 }, { x: 140, h: 70 }, { x: 172, h: 62 },
  ];
  return (
    <Box
      component="svg"
      viewBox="0 0 200 80"
      preserveAspectRatio="xMidYMid meet"
      sx={{ width: '100%', height: 80, display: 'block' }}
    >
      {/* baseline */}
      <line x1={0} y1={76} x2={200} y2={76} stroke={color} strokeWidth={1} opacity={0.35} />
      {/* bars */}
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={76 - b.h}
          width={20}
          height={b.h}
          fill={alpha(color, 0.18)}
          stroke={color}
          strokeWidth={1.2}
          rx={1.5}
        />
      ))}
      {/* trend line going up — touches top of each bar */}
      <path
        d={`M${22} ${76 - 28} L${54} ${76 - 46} L${86} ${76 - 36} L${118} ${76 - 58} L${150} ${76 - 70} L${182} ${76 - 62}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      {/* arrow at end pointing up-right */}
      <polygon points="178,12 192,4 188,18 184,12" fill={color} />
    </Box>
  );
}
