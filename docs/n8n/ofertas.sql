-- Dashboard de Ofertas — tabla leída por el webhook GET /offers y escrita por el recolector.
-- Ejecutar una sola vez en Supabase Studio (SQL Editor) de supabase.luisdavidmag.com.
-- Contrato de datos: docs/n8n-offers-contract.md

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
  activo        boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists ofertas_categoria_idx  on public.ofertas (categoria);
create index if not exists ofertas_activo_idx     on public.ofertas (activo);
create index if not exists ofertas_updated_at_idx on public.ofertas (updated_at desc);

-- RLS activo: nadie lee desde el navegador con la anon key; n8n usa la service key.
alter table public.ofertas enable row level security;
