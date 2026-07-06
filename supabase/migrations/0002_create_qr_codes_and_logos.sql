-- qr_codes tablosu
create table if not exists public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type text not null,
  content jsonb not null,
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.qr_codes enable row level security;

create policy "Users can view own qr codes"
  on public.qr_codes for select
  using (auth.uid() = user_id);

create policy "Users can insert own qr codes"
  on public.qr_codes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own qr codes"
  on public.qr_codes for update
  using (auth.uid() = user_id);

create policy "Users can delete own qr codes"
  on public.qr_codes for delete
  using (auth.uid() = user_id);

create index if not exists idx_qr_codes_user_id on public.qr_codes(user_id);

-- updated_at otomatik güncelleme
create or replace function public.handle_qr_codes_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_qr_codes_updated
  before update on public.qr_codes
  for each row execute procedure public.handle_qr_codes_updated_at();

-- logos tablosu
create table if not exists public.logos (
  id uuid primary key default gen_random_uuid(),
  qr_id uuid not null references public.qr_codes(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.logos enable row level security;

create policy "Users can view own logos"
  on public.logos for select
  using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = logos.qr_id
      and qr_codes.user_id = auth.uid()
    )
  );

create policy "Users can insert own logos"
  on public.logos for insert
  with check (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = logos.qr_id
      and qr_codes.user_id = auth.uid()
    )
  );

create policy "Users can delete own logos"
  on public.logos for delete
  using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = logos.qr_id
      and qr_codes.user_id = auth.uid()
    )
  );

create index if not exists idx_logos_qr_id on public.logos(qr_id);
