create table if not exists public.student_monthly_payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  payment_month date not null,
  status text not null default 'Pagado' check (status in ('Pagado')),
  paid_at timestamptz not null default now(),
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, payment_month)
);

drop trigger if exists set_student_monthly_payments_updated_at
on public.student_monthly_payments;

create trigger set_student_monthly_payments_updated_at
before update on public.student_monthly_payments
for each row execute function public.set_updated_at();

alter table public.student_monthly_payments enable row level security;

drop policy if exists "Samguk admins can manage monthly payments"
on public.student_monthly_payments;

create policy "Samguk admins can manage monthly payments"
on public.student_monthly_payments
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

grant select, insert, update, delete on public.student_monthly_payments
to authenticated;
