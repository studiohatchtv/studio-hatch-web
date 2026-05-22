-- Studio HATCH — newsletter subscribers (marketing site signups)
-- Run this in the Supabase Dashboard > SQL Editor (same project as the app).
-- Depends on public.is_admin() from the main schema (studio-hatch/supabase/schema.sql).

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  lang text default 'tr',
  source text default 'website',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Anyone (anon, from the website) may subscribe...
drop policy if exists "newsletter insert" on public.newsletter_subscribers;
create policy "newsletter insert" on public.newsletter_subscribers
  for insert with check (true);

-- ...but only admins can read the list (e.g. the marketing app / dashboard).
drop policy if exists "newsletter admin read" on public.newsletter_subscribers;
create policy "newsletter admin read" on public.newsletter_subscribers
  for select using (public.is_admin());
