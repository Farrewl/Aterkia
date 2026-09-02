-- Run this in the Supabase SQL Editor.
-- Supabase Auth stores credentials in auth.users; this table stores app data.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  avatar_url text,
  role text not null default 'user' check (role in ('admin', 'user')),
  division text,
  is_active boolean not null default true,
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
as $$
begin
  new.role = old.role;
  new.is_active = old.is_active;
  new.email = old.email;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileges on public.profiles;
create trigger protect_profile_privileges
  before update on public.profiles
  for each row execute procedure public.protect_profile_privileges();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Perbaikan avatar (jalankan sekali di SQL Editor bila gambar profil hilang setelah refresh) ──
-- Google menyimpan foto di raw_user_meta_data->>'picture'. Isi kembali profiles.avatar_url
-- untuk akun yang avatar_url-nya kosong.
update public.profiles p
set avatar_url = u.raw_user_meta_data->>'picture'
from auth.users u
where p.id = u.id
  and (p.avatar_url is null or p.avatar_url = '')
  and (u.raw_user_meta_data->>'picture') is not null;
