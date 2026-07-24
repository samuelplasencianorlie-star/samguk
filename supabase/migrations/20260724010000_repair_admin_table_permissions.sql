grant usage on schema public to authenticated;

grant execute on function public.is_samguk_admin() to authenticated;
grant select on public.admin_profiles to authenticated;

grant usage on type public.student_status to authenticated;
grant usage on type public.registration_request_status to authenticated;

grant select, insert, update, delete on public.groups to authenticated;
grant select, insert, update, delete on public.registration_requests to authenticated;
grant select, insert, update, delete on public.students to authenticated;
grant select, insert, update, delete on public.student_notes to authenticated;
grant select, insert, update, delete on public.attendance_records to authenticated;

do $$
begin
  if to_regclass('public.student_legal_acceptances') is not null then
    execute 'grant select, insert on public.student_legal_acceptances to authenticated';
  end if;

  if to_regclass('public.student_monthly_payments') is not null then
    execute 'grant select, insert, update, delete on public.student_monthly_payments to authenticated';
  end if;
end $$;

drop policy if exists "Samguk admins can manage students" on public.students;
create policy "Samguk admins can manage students"
on public.students
for all
to authenticated
using (public.is_samguk_admin())
with check (public.is_samguk_admin());

drop policy if exists "Samguk admins can manage groups" on public.groups;
drop policy if exists "Samguk admins can read groups" on public.groups;
drop policy if exists "Samguk admins can write groups" on public.groups;
create policy "Samguk admins can manage groups"
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

do $$
begin
  if to_regclass('public.student_legal_acceptances') is not null then
    execute 'drop policy if exists "Samguk admins can manage legal acceptances" on public.student_legal_acceptances';

    execute 'create policy "Samguk admins can manage legal acceptances" on public.student_legal_acceptances for all to authenticated using (public.is_samguk_admin()) with check (public.is_samguk_admin())';
  end if;

  if to_regclass('public.student_monthly_payments') is not null then
    execute 'drop policy if exists "Samguk admins can manage monthly payments" on public.student_monthly_payments';

    execute 'create policy "Samguk admins can manage monthly payments" on public.student_monthly_payments for all to authenticated using (public.is_samguk_admin()) with check (public.is_samguk_admin())';
  end if;
end $$;
