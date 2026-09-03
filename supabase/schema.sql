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

-- ── Admin policies ──
-- Admin aktif dapat membaca semua profil dan memperbarui profil pengguna lain
-- (role / division / is_active). Email dikelola oleh auth, tidak diubah di sini.
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles for select
to authenticated
using (
  auth.uid() = id
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.is_active = true
  )
);

drop policy if exists "Admins can update other profiles" on public.profiles;
create policy "Admins can update other profiles"
on public.profiles for update
to authenticated
using (
  auth.uid() <> id
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.is_active = true
  )
)
with check (
  auth.uid() <> id
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin' and p.is_active = true
  )
);

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  is_admin boolean;
begin
  -- Cek keistimewaan pengguna yang sedang login (definer → aman dari RLS).
  select (p.role = 'admin' and p.is_active) into is_admin
  from public.profiles p
  where p.id = auth.uid();

  if auth.uid() = old.id then
    -- Perubahan pada profil sendiri: role / is_active / email tidak boleh diubah (cegah eskalasi).
    new.role = old.role;
    new.is_active = old.is_active;
    new.email = old.email;
  elsif is_admin then
    -- Admin mengubah profil pengguna lain: boleh ubah role & is_active; email tetap auth-managed.
    new.email = old.email;
  else
    -- Bukan admin dan bukan diri sendiri → tolak.
    raise exception 'Not authorized to modify this profile';
  end if;
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

-- ── Jalankan sekali di SQL Editor untuk mengangkat akun menjadi admin ──
-- Ganti email sesuai akun yang ingin dijadikan admin. Jalankan SETELAH skema di atas.
-- update public.profiles
-- set role = 'admin'
-- where email = 'ibnufirdaus2030@gmail.com';
