create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'registration_request_status') then
    create type public.registration_request_status as enum ('Pendiente', 'Revisada', 'Aceptada', 'Rechazada');
  end if;

  if not exists (select 1 from pg_type where typname = 'student_status') then
    create type public.student_status as enum ('Activo', 'En prueba', 'Pendiente', 'Baja');
  end if;
end $$;

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'admin',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  age_range text,
  days text,
  time text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.registration_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age integer,
  birth_date date,
  guardian text,
  address text,
  postal_code text,
  dni_nie text,
  phone text,
  phone2 text,
  email text,
  message text,
  condiciones_aceptadas boolean not null default false,
  proteccion_datos_aceptada boolean not null default false,
  tutor_confirmado boolean not null default false,
  responsabilidad_aceptada boolean not null default false,
  derechos_imagen boolean not null default false,
  fecha_aceptacion_legal timestamptz,
  texto_legal_version text,
  status public.registration_request_status not null default 'Pendiente',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age integer,
  birth_date date,
  guardian text,
  address text,
  postal_code text,
  dni_nie text,
  group_id uuid references public.groups(id) on delete set null,
  group_name text,
  schedule text,
  phone text,
  phone2 text,
  email text,
  status public.student_status not null default 'Pendiente',
  enrollment_date date default current_date,
  condiciones_aceptadas boolean not null default false,
  proteccion_datos_aceptada boolean not null default false,
  tutor_confirmado boolean not null default false,
  responsabilidad_aceptada boolean not null default false,
  derechos_imagen boolean,
  fecha_aceptacion_legal timestamptz,
  texto_legal_version text,
  documentation_complete boolean not null default false,
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  note text not null,
  visibility text not null default 'private',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  group_id uuid references public.groups(id) on delete set null,
  attended_on date not null,
  status text not null default 'present',
  notes text,
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, attended_on)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_admin_profiles_updated_at on public.admin_profiles;
create trigger set_admin_profiles_updated_at
before update on public.admin_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_groups_updated_at on public.groups;
create trigger set_groups_updated_at
before update on public.groups
for each row execute function public.set_updated_at();

drop trigger if exists set_registration_requests_updated_at on public.registration_requests;
create trigger set_registration_requests_updated_at
before update on public.registration_requests
for each row execute function public.set_updated_at();

drop trigger if exists set_students_updated_at on public.students;
create trigger set_students_updated_at
before update on public.students
for each row execute function public.set_updated_at();

drop trigger if exists set_student_notes_updated_at on public.student_notes;
create trigger set_student_notes_updated_at
before update on public.student_notes
for each row execute function public.set_updated_at();

drop trigger if exists set_attendance_records_updated_at on public.attendance_records;
create trigger set_attendance_records_updated_at
before update on public.attendance_records
for each row execute function public.set_updated_at();

create or replace function public.is_samguk_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and active = true
  );
$$;

revoke all on function public.is_samguk_admin() from public;
grant execute on function public.is_samguk_admin() to authenticated;

alter table public.admin_profiles enable row level security;
alter table public.groups enable row level security;
alter table public.registration_requests enable row level security;
alter table public.students enable row level security;
alter table public.student_notes enable row level security;
alter table public.attendance_records enable row level security;

drop policy if exists "Admin profile can read own row" on public.admin_profiles;
create policy "Admin profile can read own row"
on public.admin_profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Samguk admins can read groups" on public.groups;
create policy "Samguk admins can read groups"
on public.groups
for select
to authenticated
using (public.is_samguk_admin());

drop policy if exists "Samguk admins can write groups" on public.groups;
create policy "Samguk admins can write groups"
on public.groups
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

drop policy if exists "Samguk admins can manage registration requests" on public.registration_requests;
create policy "Samguk admins can manage registration requests"
on public.registration_requests
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

drop policy if exists "Samguk admins can manage students" on public.students;
create policy "Samguk admins can manage students"
on public.students
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

drop policy if exists "Samguk admins can manage notes" on public.student_notes;
create policy "Samguk admins can manage notes"
on public.student_notes
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

drop policy if exists "Samguk admins can manage attendance" on public.attendance_records;
create policy "Samguk admins can manage attendance"
on public.attendance_records
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

insert into public.groups (name, age_range, days, time, sort_order)
values
  ('Curso 1', 'Curso 1', 'Lunes · Miércoles · Viernes', '17:15 a 18:15', 1),
  ('Curso 2', 'Curso 2', 'Lunes · Miércoles · Viernes', '18:20 a 19:20', 2),
  ('Curso 3', 'Curso 3', 'Lunes · Miércoles · Viernes', '19:25 a 20:25', 3),
  ('Curso 4', 'Curso 4', 'Lunes · Miércoles · Viernes', '20:30 a 21:00', 4)
on conflict (name) do update
set
  age_range = excluded.age_range,
  days = excluded.days,
  time = excluded.time,
  sort_order = excluded.sort_order,
  updated_at = now();
