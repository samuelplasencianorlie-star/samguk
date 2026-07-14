# SAMGUK Cabo Blanco

Estado: primera versión pública real de la web de SAMGUK Cabo Blanco con área privada inicial protegida por sesión.

## Incluye

- Web pública real con hero aprobado.
- Secciones de espacio, entrenos, horarios, inscripción, maestro, historia y contacto.
- Horarios reales configurados en `lib/site-config.ts`.
- Historia del club integrada con texto real facilitado por Leo.
- Contacto real con teléfono, email, dirección, Instagram y Facebook.
- Página `/inscripcion` para preparar una solicitud inicial y enviarla por WhatsApp o email.
- Página `/historia`.
- Páginas legales básicas.
- Área privada inicial protegida por Supabase Auth.

## Área Privada

Rutas disponibles:

- `/admin`
- `/admin/login`
- `/admin/dashboard`
- `/admin/solicitudes`
- `/admin/alumnos`
- `/admin/cursos`
- `/admin/documentos`
- `/admin/configuracion`

Estado técnico del área privada:

- UI real.
- Rutas reales.
- Layout privado compartido.
- Navegación interna.
- Tipos e interfaces en `lib/admin-types.ts`.
- Grupos base centralizados y lectura preparada desde Supabase.
- Login privado mediante Supabase Auth.
- Recuperación de contraseña mediante Supabase Auth.
- Sesión gestionada con cookies seguras de Supabase SSR.
- Protección de rutas privadas por middleware.
- Migración SQL para alumnos, grupos, solicitudes, notas y asistencia en `supabase/migrations`.
- Row Level Security preparado para acceso exclusivo de administradores autorizados.

## Variables De Entorno

Crea `.env.local` a partir de `.env.example`:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

No uses la `service_role key` en el frontend ni como variable pública de la web.

## Supabase

Proyecto previsto: `samguk-platform`.

La base de datos se define en:

```bash
supabase/migrations/20260714143000_samguk_platform_schema.sql
```

Después de ejecutar la migración en Supabase hay que crear el usuario de Leo en
Supabase Auth y vincularlo con `public.admin_profiles` para darle acceso al
panel privado.

## Información Que Conviene Revisar Antes De Publicar

- Texto legal definitivo del club.
- Cuotas definitivas si Leo quiere mostrarlas.
- Configuración final del dominio.
- Configuración de URLs de recuperación de contraseña en Supabase/Vercel.

## Ejecutar Localmente

```bash
npm install
npm run dev
```

Después abre `http://localhost:3000`. Si el puerto está ocupado, Next.js usará otro puerto disponible.

## Build De Producción

```bash
npm run build
```
