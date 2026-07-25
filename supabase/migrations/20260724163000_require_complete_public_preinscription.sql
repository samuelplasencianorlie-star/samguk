drop policy if exists "Public can create registration requests"
on public.registration_requests;

create policy "Public can create registration requests"
on public.registration_requests
for insert
to anon
with check (
  char_length(trim(full_name)) >= 2
  and birth_date is not null
  and char_length(trim(coalesce(dni_nie, ''))) >= 5
  and char_length(trim(coalesce(address, ''))) >= 4
  and char_length(trim(coalesce(postal_code, ''))) = 5
  and char_length(trim(phone)) >= 6
  and condiciones_aceptadas = true
  and proteccion_datos_aceptada = true
  and responsabilidad_aceptada = true
  and fecha_aceptacion_legal is not null
  and texto_legal_version is not null
  and status = 'Pendiente'
);
