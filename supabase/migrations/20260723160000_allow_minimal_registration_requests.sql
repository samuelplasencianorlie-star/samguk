grant usage on schema public to anon;
grant insert on public.registration_requests to anon;

drop policy if exists "Public can create registration requests"
on public.registration_requests;

create policy "Public can create registration requests"
on public.registration_requests
for insert
to anon
with check (
  char_length(trim(full_name)) >= 2
  and char_length(trim(phone)) >= 6
  and proteccion_datos_aceptada = true
  and status = 'Pendiente'
);
