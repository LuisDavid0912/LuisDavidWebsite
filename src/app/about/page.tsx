'use client';

import { ReactNode } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton, ResponsiveImage } from '@/components';
import { siteContent } from '@/content/site';
import { brandColors, alphaLevels } from '@/theme/tokens';

const MONO_FONT =
  'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace';

interface KickerProps {
  children: ReactNode;
  color: string;
  mono?: boolean;
  sx?: object;
}

function Kicker({ children, color, mono = false, sx }: KickerProps) {
  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-block',
        color,
        fontSize: mono ? '0.6875rem' : '0.78125rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontFamily: mono ? MONO_FONT : undefined,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

interface HeadlineProps {
  before: string;
  em: string;
  after: string;
  emColor: string;
  size?: 'hero' | 'lg' | 'md';
}

function Headline({ before, em, after, emColor, size = 'md' }: HeadlineProps) {
  const fontSize =
    size === 'hero'
      ? { xs: '3rem', sm: '4rem', md: '5.5rem', lg: '7rem', xl: '7.5rem' }
      : size === 'lg'
        ? { xs: '2.25rem', sm: '2.75rem', md: '3.5rem', lg: '4rem' }
        : { xs: '2rem', sm: '2.25rem', md: '3rem', lg: '3.25rem' };

  const lineHeight = size === 'hero' ? 0.96 : 1.04;
  const letterSpacing = size === 'hero' ? '-0.05em' : '-0.04em';
  const fontWeight = size === 'hero' ? 500 : 500;

  return (
    <Typography
      component={size === 'hero' ? 'h1' : 'h2'}
      sx={{
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        color: 'text.primary',
        textWrap: 'balance',
      }}
    >
      {before}
      <Box
        component="em"
        sx={{
          fontStyle: 'italic',
          fontWeight: 300,
          color: emColor,
        }}
      >
        {em}
      </Box>
      {after}
    </Typography>
  );
}

/* ============ Visualizations ============ */

/* Bento 1 — Sistemas de datos e inteligencia de negocio:
   Múltiples eventos → pipeline → dashboard con gráficas */
function VizFlow({ color, lineColor }: { color: string; lineColor: string }) {
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

/* Bento 2 — Automatización e inteligencia artificial:
   Múltiples inputs → núcleo de IA (con procesamiento) → múltiples outputs */
function VizBranch({ color, lineColor }: { color: string; lineColor: string }) {
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

/* Bento 3 — Arquitectura de negocios digitales:
   DISPERSO → ESTRUCTURADO. Stack de bloques conectados (módulos del negocio) */
function VizCluster({ color, lineColor }: { color: string; lineColor: string }) {
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

/* Pillar 1 — Atraer clientes: target/bullseye attracting scattered dots */
function VizFunnel({ color }: { color: string }) {
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

/* Pillar 2 — Automatizar: 3 nodes + loop arrow showing repetition */
function VizCycle({ color }: { color: string }) {
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

/* Pillar 3 — Centralizar datos: scattered points → database stack */
function VizMerge({ color, lineColor }: { color: string; lineColor: string }) {
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

/* Pillar 4 — Tomar mejores decisiones: bar chart + ascending trend line */
function VizGrowth({ color }: { color: string }) {
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

const PILLAR_VIZ_RENDERERS = [
  (color: string, _line: string) => <VizFunnel color={color} />,
  (color: string, _line: string) => <VizCycle color={color} />,
  (color: string, line: string) => <VizMerge color={color} lineColor={line} />,
  (color: string, _line: string) => <VizGrowth color={color} />,
];

/* Mini-vizes para cada bullet de la card "Sin datos".
   Cada índice corresponde al bullet en aboutWhy.bullets:
   0: no hay personalización       → 4 figuras idénticas (cookie cutter)
   1: no hay automatización inteligente → loop roto con X
   2: no hay optimización           → línea plana (sin tendencia)
   3: no hay decisiones precisas    → puntos dispersos sin patrón */
function SinDatosMiniViz({
  index,
  color,
  strong,
}: {
  index: number;
  color: string;
  strong: string;
}) {
  const baseSx = { width: '100%', height: 28, display: 'block' } as const;

  if (index === 0) {
    // Cookie cutter — 4 figuras idénticas (sin personalización)
    return (
      <Box component="svg" viewBox="0 0 100 28" sx={baseSx}>
        {[0, 1, 2, 3].map((i) => {
          const x = 6 + i * 24;
          return (
            <g key={i}>
              <circle
                cx={x + 6}
                cy={9}
                r={3.2}
                fill="none"
                stroke={strong}
                strokeWidth={1.2}
              />
              <path
                d={`M${x} 24 L${x + 12} 24 L${x + 10.5} 16 L${x + 1.5} 16 Z`}
                fill={color}
                stroke={strong}
                strokeWidth={1.1}
                opacity={0.35}
              />
            </g>
          );
        })}
      </Box>
    );
  }

  if (index === 1) {
    // Loop roto — círculo con X (automatización rota)
    return (
      <Box component="svg" viewBox="0 0 100 28" sx={baseSx}>
        <path
          d="M14 22 Q 14 6, 32 6 L 46 6"
          fill="none"
          stroke={strong}
          strokeWidth={1.3}
          strokeDasharray="3 2"
        />
        <path
          d="M86 6 Q 86 22, 68 22 L 54 22"
          fill="none"
          stroke={strong}
          strokeWidth={1.3}
          strokeDasharray="3 2"
          opacity={0.4}
        />
        {/* X central */}
        <line x1={44} y1={8} x2={56} y2={20} stroke={strong} strokeWidth={1.4} />
        <line x1={56} y1={8} x2={44} y2={20} stroke={strong} strokeWidth={1.4} />
      </Box>
    );
  }

  if (index === 2) {
    // Línea plana — sin crecimiento ni tendencia
    return (
      <Box component="svg" viewBox="0 0 100 28" sx={baseSx}>
        {/* baseline */}
        <line
          x1={0}
          y1={24}
          x2={100}
          y2={24}
          stroke={color}
          strokeWidth={1}
          opacity={0.5}
        />
        {/* línea plana dashed (sin movimiento) */}
        <line
          x1={4}
          y1={14}
          x2={96}
          y2={14}
          stroke={strong}
          strokeWidth={1.6}
          strokeDasharray="4 3"
        />
        {/* puntos a lo largo, todos al mismo nivel */}
        {[14, 38, 62, 86].map((x) => (
          <circle key={x} cx={x} cy={14} r={1.6} fill={strong} opacity={0.7} />
        ))}
      </Box>
    );
  }

  // index === 3 → Puntos dispersos sin patrón (decisiones imprecisas)
  const dots = [
    { x: 8, y: 8 },
    { x: 22, y: 20 },
    { x: 36, y: 6 },
    { x: 48, y: 22 },
    { x: 62, y: 10 },
    { x: 76, y: 18 },
    { x: 90, y: 8 },
  ];
  return (
    <Box component="svg" viewBox="0 0 100 28" sx={baseSx}>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={1.8}
          fill={strong}
          opacity={0.6 + (i % 3) * 0.12}
        />
      ))}
      {/* Líneas dashed sin sentido (caos) */}
      <line
        x1={8}
        y1={8}
        x2={48}
        y2={22}
        stroke={color}
        strokeWidth={0.7}
        strokeDasharray="2 3"
        opacity={0.35}
      />
      <line
        x1={36}
        y1={6}
        x2={76}
        y2={18}
        stroke={color}
        strokeWidth={0.7}
        strokeDasharray="2 3"
        opacity={0.35}
      />
      <line
        x1={22}
        y1={20}
        x2={62}
        y2={10}
        stroke={color}
        strokeWidth={0.7}
        strokeDasharray="2 3"
        opacity={0.35}
      />
    </Box>
  );
}

export default function AboutPage() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const accentColor = isLight ? brandColors.primary : brandColors.secondary;
  // Dorado real, sólo usado para destacar la frase "oro del futuro".
  // El brand-lock se respeta en el resto de la página — este es un acento puntual.
  const goldColor = '#f0a83a';
  const goldSoft = 'rgba(240, 168, 58, 0.20)';
  const highlightColor = goldColor;

  // Shimmer metálico animado para el texto dorado.
  // Si el usuario prefiere reducir movimiento, la animación se desactiva
  // y queda un degradado estático bien posicionado.
  const goldShimmerSx = {
    background:
      'linear-gradient(110deg, #b87a1c 0%, #f0a83a 25%, #fff1c4 48%, #ffffff 52%, #fff1c4 56%, #f0a83a 75%, #b87a1c 100%)',
    backgroundSize: '300% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: 'goldShimmer 4s linear infinite',
    '@keyframes goldShimmer': {
      '0%': { backgroundPosition: '200% 0' },
      '100%': { backgroundPosition: '-100% 0' },
    },
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      backgroundPosition: '50% 0',
    },
  } as const;
  // Glow envolvente alrededor del texto dorado (efecto brillo).
  const goldGlowSx = {
    display: 'inline-block',
    filter: `drop-shadow(0 0 14px ${alpha(goldColor, 0.45)}) drop-shadow(0 0 2px ${alpha(goldColor, 0.6)})`,
    '@media (prefers-reduced-motion: reduce)': {
      filter: `drop-shadow(0 0 6px ${alpha(goldColor, 0.3)})`,
    },
  } as const;
  const dividerColor = isLight
    ? alpha(brandColors.black, alphaLevels.borderLight)
    : alpha(brandColors.white, alphaLevels.borderDark);
  const dividerStrong = isLight
    ? alpha(brandColors.black, alphaLevels.borderDark)
    : alpha(brandColors.white, 0.22);
  const elevatedBg = isLight
    ? alpha(brandColors.black, alphaLevels.paperLight)
    : alpha(brandColors.white, alphaLevels.paperDark);
  const mutedText = isLight
    ? alpha(brandColors.black, alphaLevels.textMuted)
    : alpha(brandColors.white, alphaLevels.textMuted);
  const faintText = isLight
    ? alpha(brandColors.black, 0.4)
    : alpha(brandColors.white, 0.4);
  const cardBg = isLight ? brandColors.white : brandColors.black;

  const { aboutHero, aboutWhy, aboutWhat, aboutApproach, aboutVision, aboutCta } =
    siteContent;

  const heroDocCols = { xs: '1fr', lg: '1.1fr 1fr' };
  const bioGridCols = { xs: '1fr', lg: '220px 1fr' };
  const maniGridCols = { xs: '1fr', lg: '1fr 1fr' };
  const bentoCols = { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(6, 1fr)' };
  const pillarCols = { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' };

  // Split aboutHero.paragraphs: 1st is the lead (already used), rest goes into bio body
  const bioBody = aboutHero.paragraphs.slice(1);
  const pullBands = aboutWhy.bodyAfterBullets ?? [];

  // Robust split of the bio-lead to italicize "más inteligente"
  const leadEm = 'más inteligente';
  const leadParts = aboutHero.lead.split(leadEm);
  const leadBefore = leadParts[0] ?? aboutHero.lead;
  const leadAfter = leadParts.length > 1 ? leadParts.slice(1).join(leadEm) : '';
  const leadHasEm = leadParts.length > 1;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          pt: { xs: 13, md: 17 },
          pb: 0,
          px: { xs: 2.75, sm: 3.5, md: 6 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(900px 600px at 80% 0%, ${alpha(accentColor, 0.08)}, transparent 60%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 1320,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: heroDocCols,
            gap: { xs: 6, lg: 9 },
            alignItems: 'end',
            position: 'relative',
          }}
        >
          {/* Left col: stamp row + h1 + meta */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.75}
              sx={{
                mb: { xs: 4, md: 4.5 },
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: mutedText,
                fontFamily: MONO_FONT,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: accentColor,
                  boxShadow: `0 0 14px ${accentColor}`,
                }}
              />
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                {aboutHero.kicker}
              </Box>
              <Box sx={{ width: 28, height: '1px', backgroundColor: dividerStrong }} />
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                LD · 2026
              </Box>
            </Stack>

            <Headline
              before={aboutHero.headline.before}
              em={aboutHero.headline.em}
              after={aboutHero.headline.after}
              emColor={accentColor}
              size="hero"
            />

            <Box
              sx={{
                mt: 4.5,
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 1.5, md: 2.25 },
                fontSize: '0.8125rem',
                color: mutedText,
                fontFamily: MONO_FONT,
              }}
            >
              {aboutHero.meta.map((item, i) => (
                <Stack
                  key={item}
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  component="span"
                >
                  {i > 0 && (
                    <Box component="span" sx={{ color: accentColor, opacity: 0.7 }}>
                      +
                    </Box>
                  )}
                  <Box component="span">{item}</Box>
                </Stack>
              ))}
            </Box>
          </Box>

          {/* Right col: portrait card */}
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: 3,
              overflow: 'hidden',
              border: `1px solid ${dividerStrong}`,
              maxWidth: { xs: 440, lg: '100%' },
              mx: { xs: 'auto', lg: 0 },
              width: '100%',
              boxShadow: `0 30px 80px -30px ${alpha(accentColor, 0.25)}, 0 0 0 1px ${alpha(accentColor, 0.06)}`,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.45) 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              },
            }}
          >
            <ResponsiveImage
              src={aboutHero.photo}
              alt={aboutVision.signatureName}
              variant="hero"
              sx={{ objectPosition: 'center 18%' }}
            />
            {/* Top ticket */}
            <Box
              sx={{
                position: 'absolute',
                top: 18,
                left: 18,
                right: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                color: brandColors.white,
                textShadow: `0 1px 4px ${alpha(brandColors.black, 0.4)}`,
                fontSize: '0.65625rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontFamily: MONO_FONT,
                zIndex: 2,
              }}
            >
              <Box>{aboutVision.signatureInitials}</Box>
              <Box sx={{ textAlign: 'right', opacity: 0.85 }}>4 : 5</Box>
            </Box>
            {/* Bottom foot */}
            <Box
              sx={{
                position: 'absolute',
                left: 18,
                right: 18,
                bottom: 18,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1.5,
                zIndex: 2,
                color: brandColors.white,
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: MONO_FONT,
              }}
            >
              <Box component="span">{aboutVision.signatureName}</Box>
              <Box component="span" sx={{ color: accentColor }}>
                {aboutVision.signatureRole}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ===================== BIO ===================== */}
      <Box
        component="section"
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 12, md: 15 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: bioGridCols,
              gap: { xs: 4, lg: 10 },
              alignItems: 'start',
            }}
          >
            {/* Sticky side */}
            <Box
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 110 },
                fontSize: '0.6875rem',
                color: faintText,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: MONO_FONT,
              }}
            >
              <Box sx={{ color: accentColor, fontWeight: 500 }}>§ 01</Box>
              <Box sx={{ width: 40, height: '1px', backgroundColor: dividerStrong, my: 1.75 }} />
              <Box>{aboutHero.kicker}</Box>
            </Box>

            {/* Content */}
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: '1.625rem', sm: '2rem', md: '2.5rem', lg: '2.75rem' },
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: 'text.primary',
                  textWrap: 'balance',
                  mb: { xs: 5, md: 6 },
                  '& em': {
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: accentColor,
                  },
                }}
              >
                {leadBefore}
                {leadHasEm && <Box component="em">{leadEm}</Box>}
                {leadAfter}
              </Typography>

              <Box
                sx={{
                  columnCount: { xs: 1, md: 2 },
                  columnGap: { md: '48px' },
                  fontSize: '1rem',
                  color: 'text.secondary',
                  lineHeight: 1.7,
                }}
              >
                {bioBody.map((p, i) => (
                  <Typography
                    key={i}
                    component="p"
                    sx={{
                      m: '0 0 18px',
                      breakInside: 'avoid',
                      textWrap: 'pretty',
                      fontSize: i === 3 ? '1.0625rem' : '1rem',
                      fontWeight: i === 3 ? 500 : 400,
                      color: i === 3 ? 'text.primary' : 'text.secondary',
                    }}
                  >
                    {p}
                  </Typography>
                ))}
              </Box>

              {/* Bio tagline — "Los datos son el oro del futuro" */}
              <Box
                sx={{
                  mt: 7,
                  pt: 5,
                  borderTop: `1px solid ${dividerColor}`,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2.25,
                  flexWrap: 'wrap',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: MONO_FONT,
                    fontSize: '0.6875rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: faintText,
                  }}
                >
                  Tesis
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem', lg: '3rem' },
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                    color: 'text.primary',
                  }}
                >
                  Los datos son el{' '}
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(180deg, transparent 70%, ${goldSoft} 70%)`,
                      px: 0.5,
                      ...goldGlowSx,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontStyle: 'italic',
                        fontWeight: 400,
                        ...goldShimmerSx,
                      }}
                    >
                      oro del futuro
                    </Box>
                  </Box>
                  .
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ===================== MANIFESTO ===================== */}
      <Box
        component="section"
        sx={{
          py: { xs: 12, md: 16 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          {/* Head */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2.25}
            sx={{
              mb: { xs: 5, md: 7 },
              fontSize: '0.6875rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: accentColor,
              fontFamily: MONO_FONT,
              flexWrap: 'wrap',
              rowGap: 1,
            }}
          >
            <Box component="span" sx={{ color: faintText }}>
              § 02
            </Box>
            <Box component="span">{aboutWhy.kicker}</Box>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: dividerColor, minWidth: 40 }} />
          </Stack>

          {/* Headline + Body grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: maniGridCols,
              gap: { xs: 4.5, lg: 10 },
              alignItems: 'start',
            }}
          >
            <Headline
              before={aboutWhy.headline.before}
              em={aboutWhy.headline.em}
              after={aboutWhy.headline.after}
              emColor={accentColor}
              size="lg"
            />
            <Stack spacing={2.75} sx={{ pt: { lg: 1 } }}>
              {aboutWhy.body.map((p, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    textWrap: 'pretty',
                  }}
                >
                  {p}
                </Typography>
              ))}

              {/* "Sin datos" — bento-style card */}
              <Box
                sx={{
                  mt: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${dividerColor}`,
                  borderRadius: 3,
                  backgroundColor: cardBg,
                  p: { xs: 3, md: 3.75 },
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  '&:hover': {
                    borderColor: accentColor,
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                {/* Mono eyebrow with status dot */}
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: accentColor,
                      boxShadow: `0 0 10px ${alpha(accentColor, 0.5)}`,
                    }}
                  />
                  <Box
                    sx={{
                      fontFamily: MONO_FONT,
                      fontSize: '0.6875rem',
                      color: accentColor,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {aboutWhy.bulletIntro}
                  </Box>
                </Stack>

                {/* Title — uses bulletIntro stripped of trailing colon */}
                <Typography
                  component="h3"
                  sx={{
                    mt: 2,
                    fontSize: { xs: '1.25rem', md: '1.375rem' },
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                    color: 'text.primary',
                  }}
                >
                  
                </Typography>

                {/* Visual diagram — cada consecuencia como mini-card con viz temática */}
                <Box
                  sx={{
                    mt: 2.75,
                    border: `1px dashed ${dividerStrong}`,
                    borderRadius: 1.5,
                    p: { xs: 1.5, md: 2 },
                  }}
                >
                  <Box
                    component="ul"
                    sx={{
                      listStyle: 'none',
                      m: 0,
                      p: 0,
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                      gap: 1.5,
                    }}
                  >
                    {aboutWhy.bullets.map((b, i) => (
                      <Box
                        key={i}
                        component="li"
                        sx={{
                          p: { xs: 1.75, md: 2 },
                          border: `1px solid ${dividerColor}`,
                          borderRadius: 1.25,
                          backgroundColor: cardBg,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1.5,
                          transition: 'border-color 0.2s ease',
                          '&:hover': { borderColor: dividerStrong },
                        }}
                      >
                        {/* Mini viz — diferente por índice, todas comunican "ausencia" */}
                        <Box
                          sx={{
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <SinDatosMiniViz
                            index={i}
                            color={faintText}
                            strong={mutedText}
                          />
                        </Box>
                        {/* Texto */}
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          spacing={1.25}
                        >
                          <Box
                            component="span"
                            sx={{
                              color: faintText,
                              fontFamily: MONO_FONT,
                              fontSize: '0.75rem',
                              mt: 0.25,
                              flexShrink: 0,
                            }}
                          >
                            —
                          </Box>
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              color: 'text.primary',
                              lineHeight: 1.45,
                            }}
                          >
                            {b}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Pull bands */}
          {pullBands.length >= 2 && (
            <Box sx={{ mt: { xs: 7, md: 10 } }}>
              {[
                { text: pullBands[0], side: pullBands[1], num: 'P.01' },
                { text: pullBands[2], side: pullBands[3], num: 'P.02' },
              ]
                .filter((b) => b.text)
                .map((band, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mt: idx === 0 ? 0 : { xs: 5, md: 7 },
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
                      gap: { xs: 2.5, lg: 3 },
                      alignItems: 'start',
                    }}
                  >
                    <Box
                      sx={{
                        gridColumn: { lg: 'span 1' },
                        fontFamily: MONO_FONT,
                        fontSize: '0.75rem',
                        color: faintText,
                        letterSpacing: '0.1em',
                        pt: { lg: 1 },
                      }}
                    >
                      {band.num}
                    </Box>
                    <Typography
                      sx={{
                        gridColumn: { lg: 'span 8' },
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                        fontWeight: 400,
                        letterSpacing: '-0.028em',
                        lineHeight: 1.18,
                        color: 'text.primary',
                        textWrap: 'balance',
                      }}
                    >
                      {band.text}
                    </Typography>
                    {band.side && (
                      <Typography
                        sx={{
                          gridColumn: { lg: 'span 3' },
                          fontSize: '0.84375rem',
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          borderLeft: { lg: `1px solid ${dividerColor}` },
                          borderTop: { xs: `1px solid ${dividerColor}`, lg: 'none' },
                          pl: { lg: 2.25 },
                          pt: { xs: 2, lg: 0 },
                        }}
                      >
                        {band.side}
                      </Typography>
                    )}
                  </Box>
                ))}
            </Box>
          )}

          {/* Callout */}
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              maxWidth: 920,
              p: { xs: 3.5, md: 4.5 },
              border: `1px solid ${dividerStrong}`,
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: '0 16px 16px 0',
              background: `linear-gradient(90deg, ${alpha(accentColor, 0.05)}, transparent 60%)`,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              color: 'text.primary',
              textWrap: 'pretty',
            }}
          >
            {aboutWhy.accent}
          </Box>
        </Box>
      </Box>

      {/* ===================== AREAS (BENTO) ===================== */}
      <Box
        component="section"
        sx={{
          py: { xs: 12, md: 16 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: 'auto' }}>
          {/* Head */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: { xs: 3, lg: 8 },
              alignItems: 'end',
              mb: { xs: 5, md: 7 },
            }}
          >
            <Box>
              <Kicker color={accentColor} mono>
                § 03 · {aboutWhat.kicker}
              </Kicker>
              <Box sx={{ mt: 2.25 }}>
                <Headline
                  before={aboutWhat.headline.before}
                  em={aboutWhat.headline.em}
                  after={aboutWhat.headline.after}
                  emColor={accentColor}
                  size="md"
                />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: '1rem',
                color: 'text.secondary',
                lineHeight: 1.65,
                maxWidth: 460,
              }}
            >
              {aboutWhat.description}
            </Typography>
          </Box>

          {/* Bento grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: bentoCols,
              gap: 2,
            }}
          >
            {aboutWhat.areas.map((area, i) => {
              const isWide = i === 2;
              return (
                <Box
                  key={i}
                  sx={{
                    gridColumn: {
                      xs: 'span 2',
                      lg: isWide ? 'span 6' : 'span 3',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${dividerColor}`,
                    borderRadius: 3,
                    backgroundColor: elevatedBg,
                    p: { xs: 3, md: 3.75 },
                    minHeight: { xs: 320, md: isWide ? 280 : 360 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'border-color 0.25s ease, transform 0.25s ease',
                    '&:hover': {
                      borderColor: accentColor,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {isWide ? (
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
                        gap: { xs: 3, md: 5 },
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              fontFamily: MONO_FONT,
                              fontSize: '0.6875rem',
                              color: accentColor,
                              letterSpacing: '0.16em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {String(i + 1).padStart(2, '0')} — {area.title.toUpperCase()}
                          </Box>
                          <Typography
                            component="h3"
                            sx={{
                              mt: 2,
                              fontSize: { xs: '1.25rem', md: '1.375rem' },
                              fontWeight: 500,
                              letterSpacing: '-0.025em',
                              lineHeight: 1.2,
                              color: 'text.primary',
                            }}
                          >
                            {area.title}
                          </Typography>
                          <Typography
                            sx={{
                              mt: 1.75,
                              fontSize: '0.90625rem',
                              color: 'text.secondary',
                              lineHeight: 1.6,
                            }}
                          >
                            {area.description}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          minHeight: 180,
                          border: `1px dashed ${dividerStrong}`,
                          borderRadius: 1.5,
                          p: 1.75,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <VizCluster color={accentColor} lineColor={dividerStrong} />
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box>
                        <Box
                          sx={{
                            fontFamily: MONO_FONT,
                            fontSize: '0.6875rem',
                            color: accentColor,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {String(i + 1).padStart(2, '0')} — {area.title.toUpperCase()}
                        </Box>
                        <Typography
                          component="h3"
                          sx={{
                            mt: 2,
                            fontSize: { xs: '1.25rem', md: '1.375rem' },
                            fontWeight: 500,
                            letterSpacing: '-0.025em',
                            lineHeight: 1.2,
                            color: 'text.primary',
                          }}
                        >
                          {area.title}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 1.75,
                            fontSize: '0.90625rem',
                            color: 'text.secondary',
                            lineHeight: 1.6,
                          }}
                        >
                          {area.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: 2.75,
                          minHeight: 100,
                          border: `1px dashed ${dividerStrong}`,
                          borderRadius: 1.5,
                          p: 1.75,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {i === 0 ? (
                          <VizFlow color={accentColor} lineColor={dividerStrong} />
                        ) : (
                          <VizBranch color={accentColor} lineColor={dividerStrong} />
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* ===================== APPROACH ===================== */}
      <Box
        component="section"
        sx={{
          py: { xs: 12, md: 16 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
          borderBottom: `1px solid ${dividerColor}`,
        }}
      >
        <Box sx={{ maxWidth: 1320, mx: 'auto' }}>
          <Box sx={{ maxWidth: 760, mb: { xs: 5, md: 6 } }}>
            <Kicker color={accentColor} mono>
              § 04 · {aboutApproach.kicker}
            </Kicker>
            <Box sx={{ mt: 2.25 }}>
              <Headline
                before={aboutApproach.headline.before}
                em={aboutApproach.headline.em}
                after={aboutApproach.headline.after}
                emColor={accentColor}
                size="md"
              />
            </Box>
            <Typography
              sx={{
                mt: 2.25,
                fontSize: '1rem',
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              {aboutApproach.description}
            </Typography>
          </Box>

          {/* Pillar strip */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: pillarCols,
              borderTop: `1px solid ${dividerColor}`,
              borderBottom: `1px solid ${dividerColor}`,
            }}
          >
            {aboutApproach.pillars.map((pillar, i) => {
              const renderViz =
                PILLAR_VIZ_RENDERERS[i] ?? PILLAR_VIZ_RENDERERS[3];
              return (
                <Box
                  key={i}
                  sx={{
                    p: { xs: 3.5, md: 4 },
                    borderRight: {
                      xs: 'none',
                      sm: i % 2 === 0 ? `1px solid ${dividerColor}` : 'none',
                      lg:
                        i < aboutApproach.pillars.length - 1
                          ? `1px solid ${dividerColor}`
                          : 'none',
                    },
                    borderBottom: {
                      xs:
                        i < aboutApproach.pillars.length - 1
                          ? `1px solid ${dividerColor}`
                          : 'none',
                      sm: i < 2 ? `1px solid ${dividerColor}` : 'none',
                      lg: 'none',
                    },
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: MONO_FONT,
                      fontSize: '0.6875rem',
                      color: faintText,
                      letterSpacing: '0.12em',
                    }}
                  >
                    F.{String(i + 1).padStart(2, '0')}
                  </Box>
                  <Typography
                    component="h4"
                    sx={{
                      mt: 2,
                      fontSize: '1.1875rem',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      color: 'text.primary',
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {pillar.description}
                  </Typography>
                  <Box sx={{ mt: 3.25 }}>{renderViz(accentColor, dividerStrong)}</Box>
                </Box>
              );
            })}
          </Box>

          {/* Closing */}
          <Box
            sx={{
              mt: { xs: 6, md: 7.5 },
              maxWidth: 800,
              position: 'relative',
              '&::before': {
                content: '""',
                display: 'block',
                width: 40,
                height: '1px',
                backgroundColor: accentColor,
                mb: 2.75,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: '1.0625rem',
                color: 'text.primary',
                lineHeight: 1.6,
                fontStyle: 'italic',
                textWrap: 'pretty',
              }}
            >
              {aboutApproach.conclusion}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ===================== VISION ===================== */}
      <Box
        component="section"
        sx={{
          py: { xs: 14, md: 18 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(700px 400px at 20% 20%, ${alpha(accentColor, 0.06)}, transparent 60%), radial-gradient(900px 500px at 90% 90%, ${goldSoft}, transparent 60%)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ maxWidth: 1080, mx: 'auto', position: 'relative' }}>
          <Kicker color={accentColor} mono>
            § 05 · {aboutVision.kicker}
          </Kicker>

          <Typography
            component="span"
            sx={{
              display: 'block',
              mt: 3.5,
              fontSize: { xs: '5rem', md: '7.5rem' },
              fontWeight: 300,
              color: accentColor,
              lineHeight: 0.4,
            }}
          >
            “
          </Typography>

          <Typography
            component="blockquote"
            sx={{
              m: 0,
              mt: 3.25,
              fontSize: { xs: '1.625rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.18,
              textWrap: 'balance',
              color: 'text.primary',
              '& em': {
                fontStyle: 'italic',
                fontWeight: 300,
                color: accentColor,
              },
            }}
          >
            {aboutVision.quote.before}
          </Typography>

          {/* Gold stamp — frase destacada en dorado real con shimmer */}
          <Typography
            sx={{
              mt: 5.5,
              fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.75rem', lg: '3.25rem' },
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textWrap: 'balance',
            }}
          >
            <Box
              component="span"
              sx={{
                background: `linear-gradient(180deg, transparent 68%, ${goldSoft} 68%)`,
                px: 0.5,
                ...goldGlowSx,
              }}
            >
              <Box component="span" sx={goldShimmerSx}>
                {aboutVision.quote.em}
              </Box>
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3.5,
              fontSize: '0.9375rem',
              color: 'text.secondary',
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            {aboutVision.closing}
          </Typography>

          {/* Vision foot */}
          <Box
            sx={{
              mt: 7,
              pt: 4,
              borderTop: `1px solid ${dividerColor}`,
              display: 'flex',
              alignItems: 'center',
              gap: 2.25,
            }}
          >
            <Box
              role="img"
              aria-label={aboutVision.signatureName}
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundImage: `url(${aboutHero.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 18%',
                border: `1px solid ${dividerStrong}`,
                flexShrink: 0,
              }}
            />
            <Box>
              <Box
                component="strong"
                sx={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  display: 'block',
                }}
              >
                {aboutVision.signatureName}
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  mt: 0.5,
                  fontSize: '0.8125rem',
                  color: faintText,
                }}
              >
                {aboutVision.signatureRole}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ===================== CTA ===================== */}
      <Box
        component="section"
        sx={{
          py: { xs: 11, md: 14 },
          px: { xs: 2.75, sm: 3.5, md: 6 },
          textAlign: 'center',
          backgroundColor: elevatedBg,
          borderTop: `1px solid ${dividerColor}`,
        }}
      >
        <Container maxWidth="md">
          <Kicker color={accentColor} mono>
            {aboutCta.kicker}
          </Kicker>
          <Box sx={{ mt: 2.25 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mx: 'auto',
                fontSize: { xs: '2.125rem', sm: '2.5rem', md: '3.25rem', lg: '3.75rem' },
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                maxWidth: '18ch',
                color: 'text.primary',
                textWrap: 'balance',
              }}
            >
              {aboutCta.headline.before}
              <Box
                component="em"
                sx={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: accentColor,
                }}
              >
                {aboutCta.headline.em}
              </Box>
              {aboutCta.headline.after}
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 2.25,
              mx: 'auto',
              maxWidth: 480,
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'text.secondary',
            }}
          >
            {aboutCta.description}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <PrimaryButton
              component={Link}
              href={aboutCta.button1.href}
              target={
                aboutCta.button1.href.startsWith('http') ? '_blank' : undefined
              }
              rel={
                aboutCta.button1.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              sx={{ minWidth: { xs: '100%', sm: 200 } }}
            >
              {aboutCta.button1.label}
            </PrimaryButton>
            <SecondaryButton
              component={Link}
              href={aboutCta.button2.href}
              sx={{ minWidth: { xs: '100%', sm: 200 } }}
            >
              {aboutCta.button2.label}
            </SecondaryButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
