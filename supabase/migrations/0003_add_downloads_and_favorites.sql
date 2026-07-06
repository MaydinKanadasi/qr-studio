alter table public.qr_codes
  add column if not exists download_count integer not null default 0,
  add column if not exists is_favorite boolean not null default false;

-- İndirme sayısını artıran fonksiyon (RLS bypass etmeden, sadece kendi kaydını artırabilir)
create or replace function public.increment_download_count(qr_id uuid)
returns void
language plpgsql
security invoker
as $$
begin
  update public.qr_codes
  set download_count = download_count + 1
  where id = qr_id and user_id = auth.uid();
end;
$$;

grant execute on function public.increment_download_count(uuid) to authenticated;
