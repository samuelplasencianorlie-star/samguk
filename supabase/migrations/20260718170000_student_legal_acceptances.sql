create table if not exists public.student_legal_acceptances (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) on delete set null,
  student_name text not null,
  tutor_name text,
  accepted_by_name text not null,
  accepted_by_relation text not null,
  is_minor boolean not null default false,
  condiciones_aceptadas boolean not null default true,
  proteccion_datos_aceptada boolean not null default true,
  tutor_confirmado boolean not null default false,
  responsabilidad_aceptada boolean not null default true,
  derechos_imagen boolean,
  texto_legal_version text not null,
  accepted_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.student_legal_acceptances enable row level security;

drop policy if exists "Samguk admins can manage legal acceptances"
on public.student_legal_acceptances;

create policy "Samguk admins can manage legal acceptances"
on public.student_legal_acceptances
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

grant select, insert on public.student_legal_acceptances to authenticated;
