grant usage on schema public to authenticated;

grant select on public.admin_profiles to authenticated;

grant select, insert, update, delete on public.groups to authenticated;
grant select, insert, update, delete on public.registration_requests to authenticated;
grant select, insert, update, delete on public.students to authenticated;
grant select, insert, update, delete on public.student_notes to authenticated;
grant select, insert, update, delete on public.attendance_records to authenticated;

grant execute on function public.is_samguk_admin() to authenticated;
