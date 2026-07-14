# SAM GUK CLUB TAEKWONDO
## Especificación profesional del sistema de alumnos y grupos

**Documento:** `04_STUDENTS_GROUPS.md`  
**Versión:** 1.1  
**Estado:** Especificación funcional, visual, técnica y operativa  
**Responsable del producto:** LUMEN Studio  
**Usuario principal:** Leo  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito del documento

Este documento define por completo el sistema de gestión de alumnos y grupos de SAM GUK Club Taekwondo.

Es uno de los documentos centrales del proyecto porque describe la herramienta que Leo utilizará diariamente para:

- Localizar alumnos.
- Consultar grupos.
- Abrir fichas.
- Revisar documentación.
- Comprobar consentimientos.
- Registrar observaciones.
- Cambiar alumnos de grupo.
- Gestionar altas y bajas.
- Consultar cumpleaños.
- Resolver avisos.
- Revisar el historial.

El sistema debe sustituir procesos dispersos, listas manuales y búsquedas lentas por una estructura única, clara y segura.

Este documento no contiene código. Define reglas de producto, interacción, información, arquitectura, seguridad, rendimiento y criterios de aceptación.

---

# 2. Objetivos no negociables

## 2.1 Encontrar cualquier alumno en menos de cinco segundos

Leo deberá poder localizar un alumno desde la sección Alumnos mediante:

- Vista inmediata por grupo.
- Buscador global.
- Búsqueda instantánea.
- Filtros.
- Navegación estable.

El objetivo se medirá con alumnos reales, nombres similares y varios cientos de registros.

## 2.2 Cambios importantes en menos de tres clics

Desde una pantalla relevante, Leo deberá completar en un máximo de tres clics:

- Abrir una ficha.
- Cambiar de grupo.
- Añadir una observación.
- Registrar una baja.
- Consultar documentación.
- Revisar consentimiento.
- Abrir historial.

## 2.3 Ver los cuatro grupos inmediatamente

Nada más entrar en Alumnos, Leo visualizará los cuatro grupos principales.

No deberá:

- Abrir un menú.
- Elegir una vista.
- Desplazarse por una tabla.
- Aplicar un filtro.

## 2.4 Comprender el estado de cada alumno

En pocos segundos deberá distinguir:

- Activo.
- Inactivo.
- Baja temporal.
- Documentación pendiente.
- Consentimiento pendiente.
- Pago pendiente.
- Aviso importante.

## 2.5 Evitar errores

El sistema deberá impedir o advertir:

- Mover a grupo incompatible.
- Superar capacidad.
- Duplicar alumno.
- Perder historial.
- Publicar foto sin autorización.
- Dar de baja sin confirmación.
- Modificar evidencia legal.

## 2.6 Existencia del alumno

La sección Alumnos contiene exclusivamente personas creadas después de la aprobación manual de Leo.

Una solicitud pública o una solicitud introducida manualmente:

- No aparece dentro de los grupos.
- No cuenta como alumno.
- No ocupa una plaza.
- No tiene estado de alumno.

Solo la acción administrativa “Aprobar alumno”, después de completar todas las validaciones, crea la ficha y la pertenencia inicial a un grupo.

---

# 3. Relación con otros documentos

Este sistema deberá respetar:

- `00_PRODUCT_BOOK.md`.
- `01_PUBLIC_WEBSITE.md`.
- `02_REGISTRATION_FLOW.md`.
- `03_ADMIN_PANEL.md`.
- `05_PAYMENTS_RECEIPTS.md`.

Reglas heredadas:

- Una solicitud no es un alumno.
- El alumno se crea tras aprobación manual.
- Los documentos son versionados.
- Los consentimientos son separados.
- La imagen es opcional.
- Las acciones sensibles se auditan.
- El panel prioriza tres clics.
- WCAG 2.2 AA.
- Privacidad por defecto.

---

# 4. Los cuatro grupos principales

## 4.1 Situación actual

SAM GUK dispone actualmente de cuatro grupos operativos principales.

El sistema deberá mostrar exactamente cuatro grupos en la vista principal durante la fase inicial.

## 4.2 Nombres pendientes

La documentación actual no contiene los nombres oficiales.

Hasta que Leo los confirme, se describirán como:

- Grupo operativo 1.
- Grupo operativo 2.
- Grupo operativo 3.
- Grupo operativo 4.

Estos nombres son referencias documentales y nunca deberán publicarse en la interfaz final si no son los nombres reales.

## 4.3 No inventar el cuarto grupo

No se asumirá que el cuarto grupo es:

- Competición.
- Técnica.
- Combate.
- Iniciación.
- Segundo grupo infantil.

La función real deberá ser confirmada.

## 4.4 Categorías públicas y grupos operativos

La web pública utiliza:

- Infantil.
- Jóvenes.
- Adultos.

Estas son categorías de comunicación.

No tienen por qué corresponder uno a uno con los cuatro grupos internos.

Ejemplos posibles:

- Una categoría pública puede tener dos grupos.
- Un grupo puede cubrir varias edades.
- Un grupo avanzado puede no aparecer como categoría pública.

El sistema tendrá un campo de categoría pública independiente del nombre operativo.

## 4.5 Orden

Cada grupo tendrá:

- Posición del 1 al 4.
- Nombre oficial.
- Categoría pública.
- Color.
- Estado.

Leo podrá cambiar el orden desde Configuración, pero no accidentalmente desde la vista diaria.

---

# 5. Conceptos del dominio

## 5.1 Alumno

Persona aprobada y registrada.

## 5.2 Solicitud

Petición pendiente.

No aparece dentro de grupos hasta aprobar.

## 5.3 Grupo

Unidad operativa con:

- Nombre.
- Horario.
- Instructor.
- Capacidad.
- Alumnos.
- Reglas.

## 5.4 Pertenencia

Relación entre alumno y grupo.

Incluye:

- Inicio.
- Fin.
- Estado.
- Motivo.

## 5.5 Grupo actual

Pertenencia activa vigente.

## 5.6 Historial de grupo

Todas las pertenencias anteriores.

## 5.7 Categoría pública

Clasificación utilizada en la web.

## 5.8 Estado administrativo

Situación general del alumno.

## 5.9 Estado documental

Situación de documentos.

## 5.10 Estado de consentimiento

Situación por finalidad y canal.

Estos estados serán independientes.

---

# 6. Entrada a la sección Alumnos

## 6.1 Ruta

> `/admin/alumnos`

## 6.2 Cabecera

Contenido:

- Título “Alumnos”.
- Total activos.
- Buscador.
- Botón “Crear solicitud manual”.
- Filtros.

## 6.3 Primer viewport

Orden:

1. Cabecera compacta.
2. Aviso crítico, solo si existe.
3. Cuatro grupos.

Los cuatro grupos deberán ser visibles sin scroll en escritorio estándar.

En móvil se utilizará una cuadrícula 2 por 2 compacta.

## 6.4 Elementos posteriores

Después:

- Avisos.
- Cumpleaños.
- Directorio.
- Actividad.

No antes de los grupos.

---

# 7. Vista general de grupos

## 7.1 Objetivo

Dar visión inmediata del club.

## 7.2 Composición de escritorio

Cuatro tarjetas en una fila cuando exista espacio.

Alternativa:

- Cuadrícula 2 por 2 en portátiles.

## 7.3 Composición móvil

- Cuadrícula 2 por 2.
- Tarjetas compactas.
- Nombre legible.
- Total visible.

## 7.4 Interacción

Pulsar una tarjeta abre el grupo.

No habrá botón adicional “Entrar”.

La tarjeta completa será un enlace accesible.

## 7.5 Información por grupo

- Nombre.
- Categoría.
- Horario próximo.
- Activos.
- Capacidad.
- Ocupación.
- Avisos.
- Documentación pendiente.
- Cumpleaños.

## 7.6 Prioridad

Orden visual:

1. Nombre.
2. Número de alumnos.
3. Horario.
4. Ocupación.
5. Alertas.

## 7.7 Densidad

La tarjeta no mostrará listas de nombres.

Los detalles estarán en el grupo.

---

# 8. Diseño de tarjeta de grupo

## 8.1 Estructura

### Cabecera

- Identificador visual.
- Nombre.
- Estado.

### Cuerpo

- “18 alumnos”.
- “Lunes y miércoles, 17:00”.
- “18 de 22 plazas”.

### Pie

- “2 avisos”.
- “1 documentación pendiente”.

## 8.2 Ocupación

Barra acompañada de texto.

Estados:

- Disponible.
- Casi completo.
- Completo.
- Cerrado.

## 8.3 Umbrales

Configurables.

Referencia:

- Disponible: menos del 80 %.
- Casi completo: 80 a 99 %.
- Completo: 100 %.

## 8.4 Avisos

Mostrar máximo dos.

Si hay más:

> +3 avisos

## 8.5 Hover

- Borde más visible.
- Fondo sutil.
- Sin movimiento grande.

## 8.6 Focus

- Anillo.
- Nombre anunciado.
- Resumen accesible.

---

# 9. Colores de grupo

## 9.1 Principio

El color ayuda a reconocer, pero nunca comunica solo.

## 9.2 Paleta inicial

### Grupo operativo 1

Azul:

`#174EA6`

### Grupo operativo 2

Azul acero:

`#2F6B8A`

### Grupo operativo 3

Verde:

`#137A5B`

### Grupo operativo 4

Azul gris:

`#4D5F75`

## 9.3 Aplicación

- Borde superior.
- Identificador.
- Etiqueta.
- Calendario.

No como fondo completo saturado.

## 9.4 Colores reservados

- Rojo: error.
- Ámbar: advertencia.
- Verde éxito: confirmación.

Los colores de grupo no deberán confundirse.

## 9.5 Identificación redundante

Cada grupo tendrá:

- Nombre.
- Código corto.
- Color.
- Posición.

---

# 10. Orden visual y navegación

## 10.1 Orden principal

1. Grupos.
2. Avisos.
3. Cumpleaños.
4. Todos los alumnos.

## 10.2 Dentro de grupo

1. Cabecera.
2. Resumen.
3. Búsqueda y filtros.
4. Tarjetas.
5. Actividad.

## 10.3 Migas

Ejemplo:

> Alumnos / Grupo oficial

## 10.4 Volver

Conserva:

- Scroll.
- Filtros.
- Búsqueda.
- Orden.

---

# 11. Vista de grupo

## 11.1 Cabecera

- Nombre.
- Color.
- Categoría.
- Horario.
- Instructor.
- Capacidad.
- Estado.

## 11.2 Acciones

- Crear solicitud manual con el grupo preseleccionado.
- Registrar asistencia.
- Editar grupo.

## 11.3 Resumen

- Activos.
- Pendientes.
- Cuotas pendientes.
- Documentos pendientes.
- Cumpleaños.
- Asistencia.

## 11.4 Buscador local

Placeholder:

> Buscar en este grupo

## 11.5 Filtros rápidos

- Todos.
- Con avisos.
- Pago pendiente.
- Documentación pendiente.
- Cumpleaños.

## 11.6 Lista

Tarjetas de alumno.

## 11.7 Capacidad

Visible.

Si completo:

> Grupo completo

La acción añadir seguirá visible pero explicará el bloqueo.

---

# 12. Tarjeta de alumno

## 12.1 Objetivo

Identificar rápidamente.

## 12.2 Información principal

- Nombre.
- Apellidos.
- Edad.
- Cinturón.
- Estado.

## 12.3 Información secundaria

- Responsable.
- Último pago.
- Asistencia reciente.
- Próximo cumpleaños.

## 12.4 Indicadores

- Pago pendiente.
- Documento pendiente.
- Consentimiento pendiente.
- Aviso.

## 12.5 Fotografía

Por defecto:

- Iniciales.

Se utilizará foto interna solo si:

- Existe base válida.
- Está autorizada para identificación interna.
- No se confunde con consentimiento público.

La autorización pública de imagen no implica automáticamente foto de perfil interna.

## 12.6 Acciones

- Ver ficha.
- Registrar pago.
- Cambiar grupo.
- Más.

## 12.7 Interacción

El nombre o área principal abre ficha.

Los botones son independientes.

No anidar controles dentro de un enlace completo.

## 12.8 Diseño

- Fondo blanco.
- Radio 8 px.
- Borde.
- Sin sombra fuerte.
- Altura estable.

## 12.9 Móvil

Tarjeta horizontal compacta:

- Inicial.
- Nombre.
- Grupo.
- Indicadores.
- Menú.

---

# 13. Modos de visualización

## 13.1 Tarjetas

Predeterminado.

Ideal para:

- Identificación.
- Estados.
- Uso diario.

## 13.2 Lista compacta

Opcional.

Ideal para:

- Muchos alumnos.
- Comparar.
- Escritorio.

## 13.3 Preferencia

Se conserva por usuario.

## 13.4 Coherencia

Ambos modos ofrecen:

- Mismos datos.
- Mismos filtros.
- Mismas acciones.

---

# 14. Búsqueda instantánea

## 14.1 Objetivo

Alumno en menos de cinco segundos.

## 14.2 Alcance

Desde vista general:

- Todos los grupos.
- Inactivos.
- Solicitudes, mediante categoría separada.

Desde grupo:

- Grupo actual por defecto.
- Opción “Buscar en todos”.

## 14.3 Campos

- Nombre.
- Apellidos.
- Responsable.
- Teléfono.
- Correo.
- Número.
- Grupo.

## 14.4 Comportamiento

- Resultados desde dos caracteres.
- Menos de 200 ms.
- Sin Enter.
- Resalta coincidencia.

## 14.5 Normalización

- Mayúsculas.
- Tildes.
- Espacios.
- Teléfonos.
- Guiones.

## 14.6 Resultado

- Alumno.
- Estado.
- Grupo.
- Edad.
- Responsable.

## 14.7 Teclado

- Flechas.
- Enter.
- Escape.

## 14.8 Sin resultados

> No encontramos ningún alumno con esos datos.

Acciones:

- Buscar en inactivos.
- Buscar solicitudes.
- Limpiar.

## 14.9 Privacidad

- No analítica.
- No terceros.
- No PII en URL.
- Limpiar al cerrar sesión.

---

# 15. Filtros

## 15.1 Grupo

- Cuatro grupos.
- Sin grupo.
- Inactivos.

## 15.2 Estado

- Activo.
- Baja temporal.
- Inactivo.
- Baja definitiva.
- Pendiente documental.

## 15.3 Administración

- Al día.
- Pago pendiente.
- Documentación pendiente.
- Consentimiento pendiente.

## 15.4 Perfil

- Edad.
- Cinturón.
- Alta.
- Responsable.

## 15.5 Actividad

- Asistencia baja.
- Sin actividad.
- Próximo cumpleaños.

## 15.6 Comportamiento

- Aplicación inmediata.
- Chips.
- Contador.
- Limpiar.

## 15.7 Filtros guardados

Ejemplos:

- Pendientes de hoy.
- Cumpleaños.
- Cuotas.
- Sin documentación.

---

# 16. Ordenación

Opciones:

- Apellidos.
- Nombre.
- Edad.
- Cinturón.
- Alta.
- Cumpleaños.
- Pago.
- Asistencia.

Predeterminado:

> Apellidos

Orden estable.

---

# 17. Ficha completa del alumno

## 17.1 Cabecera

- Nombre.
- Estado.
- Grupo.
- Cinturón.
- Edad.
- Número de alumno.

## 17.2 Acciones

- Editar.
- Cambiar grupo.
- Registrar pago.
- Añadir observación.
- Gestionar baja.

## 17.3 Pestañas

1. Resumen.
2. Datos.
3. Grupo.
4. Documentación.
5. Consentimientos.
6. Pagos.
7. Asistencia.
8. Observaciones.
9. Historial.

## 17.4 Resumen

- Datos.
- Responsable.
- Grupo.
- Horario.
- Pago.
- Asistencia.
- Documentos.
- Consentimientos.
- Avisos.

## 17.5 Datos

- Identidad.
- Nacimiento.
- Contacto.
- Responsable.
- Alta.
- Estado.

## 17.6 Grupo

- Actual.
- Horario.
- Instructor.
- Fecha.
- Anteriores.

## 17.7 No saturación

La ficha no mostrará todo abierto.

Resumen primero.

Detalle en pestañas.

---

# 18. Estado administrativo

## 18.1 ACTIVO

Alumno vigente.

## 18.2 BAJA_TEMPORAL

Pausa con posibilidad de regreso.

## 18.3 INACTIVO

No participa actualmente.

## 18.4 BAJA_DEFINITIVA

Relación cerrada.

## 18.5 Documentación pendiente como indicador

`PENDIENTE_DOCUMENTACIÓN` no será un estado de alta inicial en la V1.

Si faltan documentos obligatorios antes de la aprobación:

- El registro permanece como solicitud.
- No se crea un alumno.
- No se asigna una pertenencia al grupo.

Un alumno ya existente podrá mostrar un indicador independiente de documentación pendiente cuando un documento vigente haya sido sustituido y requiera actualización. Este indicador no cambia por sí solo su estado administrativo.

## 18.6 ARCHIVADO

Fuera de vistas diarias.

## 18.7 Independencia

Un activo puede tener:

- Pago pendiente.
- Consentimiento no autorizado.
- Documento actualizado pendiente.

No mezclar estados.

---

# 19. Documentación aceptada

## 19.1 Vista

- Documento.
- Versión.
- Fecha.
- Persona.
- Estado.

## 19.2 Estados

- Vigente.
- Pendiente.
- Sustituido.
- Requiere renovación.
- No aplicable.

## 19.3 Acciones

- Ver.
- Evidencia.
- Recibo.
- Solicitar actualización.

## 19.4 Pendiente

Indicador:

> Documentación pendiente

## 19.5 No editar

No interruptores.

Nueva evidencia.

## 19.6 Grupo

Cambiar grupo no invalida por defecto.

Si documento depende del grupo:

- Detectar.
- Solicitar nueva aceptación.

---

# 20. Consentimientos pendientes

## 20.1 Vista

- Finalidad.
- Decisión.
- Canales.
- Fecha.
- Persona.

## 20.2 Estados

- Autorizado.
- No autorizado.
- Parcial.
- Retirado.
- Pendiente.
- Revisión.

## 20.3 Pendiente

Aviso:

> Falta registrar una decisión.

## 20.4 Imagen

- Web.
- Redes.
- Impreso.
- Familias.

## 20.5 No bloqueo

No autorizar imagen no bloquea alumno.

## 20.6 Cambio

- Nueva decisión.
- Fuente.
- Fecha.
- Evidencia.

---

# 21. Observaciones

## 21.1 Tipos

- Administrativa.
- Entrenamiento.
- Contacto.
- Seguimiento.

## 21.2 Añadir

1. Pulsar.
2. Escribir y categoría.
3. Guardar.

## 21.3 Contenido

- Objetivo.
- Breve.
- Respetuoso.

## 21.4 Fijadas

Máximo tres.

## 21.5 Privacidad

Privadas por defecto.

Roles.

## 21.6 Corrección

No borrar.

Añadir corrección.

---

# 22. Historial de cambios

## 22.1 Eventos

- Alta.
- Grupo.
- Datos.
- Estado.
- Pago.
- Documento.
- Consentimiento.
- Observación.
- Baja.

## 22.2 Fila

- Fecha.
- Actor.
- Acción.
- Antes.
- Después.
- Motivo.

## 22.3 Filtros

- Tipo.
- Fecha.
- Actor.

## 22.4 Inmutabilidad

No editar.

No borrar.

---

# 23. Cumpleaños del mes

## 23.1 Ubicación

- Vista general.
- Filtro.
- Grupo.
- Ficha.

## 23.2 Widget

- Próximos 7 días.
- Total mensual.

## 23.3 Datos

- Nombre.
- Día.
- Edad.
- Grupo.

## 23.4 Privacidad

- No fecha completa en notificaciones.
- No mensaje automático.
- No publicación.

## 23.5 Orden

Por fecha.

## 23.6 Casos

- 29 de febrero.
- Zona horaria.

---

# 24. Avisos importantes

## 24.1 Tipos

- Documento pendiente.
- Consentimiento pendiente.
- Pago pendiente.
- Ausencia.
- Cumpleaños.
- Grupo incompatible.
- Grupo lleno.
- Edad fuera de rango.
- Datos incompletos.

## 24.2 Prioridades

### Crítica

Riesgo legal o seguridad.

### Alta

Requiere hoy.

### Media

Requiere seguimiento.

### Informativa

Sin acción inmediata.

## 24.3 Presentación

- Icono.
- Texto.
- Prioridad.
- Acción.

## 24.4 No saturación

Agrupar.

No más de tres en tarjeta.

## 24.5 Resolución

El aviso se resuelve con acción real.

No ocultarlo manualmente sin motivo.

---

# 25. Indicadores visuales

## 25.1 Estado alumno

- Texto.
- Icono.
- Color.

## 25.2 Pago

- Al día.
- Pendiente.
- Vencido.

## 25.3 Documentos

- Completos.
- Pendientes.
- Renovación.

## 25.4 Consentimiento

- Autorizado.
- No autorizado.
- Parcial.
- Retirado.

## 25.5 Reglas

- No color solo.
- Etiquetas breves.
- Tooltips.
- Consistencia.

---

# 26. Cambio manual de grupo

## 26.1 Accesos

- Tarjeta alumno.
- Ficha.
- Grupo.

## 26.2 Tres clics

1. Cambiar grupo.
2. Elegir.
3. Confirmar.

## 26.3 Panel de cambio

- Alumno.
- Grupo actual.
- Destinos.
- Horarios.
- Capacidad.
- Cuota.
- Fecha efectiva.

## 26.4 Grupos compatibles

Primero.

Otros:

- Bajo sección “Otros grupos”.
- Advertencia.

## 26.5 Validaciones

- Capacidad.
- Edad.
- Horario.
- Instructor.
- Estado.
- Pago.
- Documentación.

## 26.6 Grupo lleno

Mensaje:

> Este grupo está completo.

Opciones:

- Cancelar.
- Añadir a espera, si existe.
- Forzar con permiso y motivo.

## 26.7 Fecha

- Inmediata.
- Programada.

## 26.8 Confirmación

> {Alumno} pasará de {origen} a {destino} el {fecha}.

Mostrar:

- Horario.
- Cuota futura.
- Avisos.

## 26.9 Resultado

> Grupo actualizado correctamente.

## 26.10 Transacción

- Cerrar pertenencia anterior.
- Crear nueva.
- Actualizar roster.
- Actualizar horario.
- Recalcular cuota futura.
- Historial.
- Notificación.

## 26.11 No modificar

- Pagos anteriores.
- Recibos anteriores.
- Asistencia anterior.
- Historial.

---

# 27. Futuro soporte drag and drop

## 27.1 Estado

Fuera del MVP.

No se desarrollarán en la V1 componentes, eventos, permisos ni pruebas específicas de drag and drop.

El cambio manual de grupo será el único flujo operativo del MVP.

## 27.2 Objetivo

Mover visualmente entre grupos.

## 27.3 Activación

Solo escritorio amplio.

## 27.4 Inicio

- Asa visible.
- No toda tarjeta.
- Evitar arrastre accidental.

## 27.5 Durante

- Tarjeta fantasma.
- Origen.
- Destinos.
- Capacidad.

## 27.6 Destino inválido

- No permitir drop.
- Explicar.

## 27.7 Confirmación

Soltar no ejecuta inmediatamente.

Abre confirmación.

## 27.8 Accesibilidad

Debe existir siempre:

- Botón manual.
- Teclado.
- Anuncios.

Drag and drop nunca único.

## 27.9 Móvil

No drag por defecto.

Usar flujo manual.

## 27.10 Auditoría

Igual que manual.

---

# 28. Solicitud manual de alta

## 28.1 Uso

Solo excepciones.

Permite a Leo introducir una solicitud recibida presencialmente o por un canal alternativo, pero no crear directamente un alumno.

## 28.2 Botón

> Crear solicitud manual

## 28.3 Flujo

1. Datos.
2. Documentación.
3. Revisión.
4. Confirmación y pago.
5. Aprobación manual.

## 28.4 Datos

- Identidad.
- Nacimiento.
- Contacto.
- Responsable.
- Grupo.
- Alta.

## 28.5 Documentación

La solicitud debe registrar:

- Versiones.
- Decisiones.
- Fuente.
- Evidencia.

## 28.6 No bypass

La solicitud manual seguirá las mismas reglas esenciales que la pública.

No se creará ningún alumno sin:

- Documentación.
- Consentimientos.
- Confirmación.
- Pago registrado y verificado.
- Aprobación manual de Leo.

Si falta:

> Solicitud pendiente

El registro permanecerá en Solicitudes y mostrará de forma concreta qué requisito falta.

## 28.7 Duplicados

Buscar mientras escribe.

Aviso.

## 28.8 Resultado

> Solicitud manual creada.

La creación del alumno será una operación posterior, independiente y auditada.

---

# 29. Edición completa

## 29.1 Editables

- Identidad.
- Contacto.
- Responsable.
- Cinturón.
- Estado.

## 29.2 No editables directamente

- Historial.
- Evidencia.
- Pago.
- Alta original.

## 29.3 Guardado

- Botón.
- Validación.
- Confirmación.

## 29.4 Motivo

Obligatorio para:

- Nacimiento.
- Responsable.
- Estado.
- Nombre legal.

## 29.5 Conflicto

> La ficha cambió mientras editabas.

Comparar.

No sobrescribir.

## 29.6 Resultado

> Datos actualizados.

---

# 30. Baja de alumnos

## 30.1 Tipos

- Temporal.
- Definitiva.

## 30.2 Acción

> Gestionar baja

No “Eliminar”.

## 30.3 Campos

- Tipo.
- Fecha.
- Motivo.
- Último día.
- Pago.
- Material.
- Seguimiento.

## 30.4 Temporal

- Fecha inicio.
- Fecha prevista.
- Grupo reservado o liberado.

## 30.5 Definitiva

- Cerrar pertenencia.
- Estado.
- Pagos.
- Retención.

## 30.6 Consentimientos

Baja no equivale a retirada.

Gestionar por separado.

## 30.7 Confirmación

> El alumno dejará de figurar como activo.

## 30.8 Resultado

> Baja registrada.

## 30.9 No borrar

Mantener:

- Historial.
- Pagos.
- Evidencias.

Según retención.

---

# 31. Reactivación

## 31.1 Acción

> Reactivar alumno

## 31.2 Revisión

- Datos.
- Documentos.
- Consentimientos.
- Grupo.
- Cuota.

## 31.3 Grupo

No reasignar automáticamente si:

- Cerrado.
- Completo.
- Incompatible.

## 31.4 Resultado

> Alumno reactivado.

Historial.

---

# 32. Gestión de grupos

## 32.1 Crear

Futuro.

## 32.2 Editar

- Nombre.
- Código.
- Categoría.
- Color.
- Capacidad.
- Instructor.
- Horario.
- Estado.
- Orden.

## 32.3 Estados

- Activo.
- Completo.
- Cerrado.
- Archivado.

## 32.4 Cerrar

No elimina.

Impide altas.

## 32.5 Archivar

Requiere:

- Sin pertenencias activas.
- Confirmación.

## 32.6 Cuatro actuales

La interfaz inicial prioriza cuatro.

La arquitectura no hardcodea cuatro.

---

# 33. Horarios

## 33.1 Grupo

- Días.
- Hora.
- Duración.
- Instructor.
- Espacio.

## 33.2 Cambios

- Fecha efectiva.
- Afectados.
- Notificación.

## 33.3 Conflictos

- Espacio.
- Instructor.
- Alumno.

## 33.4 Visual

Resumen en tarjeta.

Detalle calendario.

---

# 34. Capacidad y lista de espera

## 34.1 Capacidad

Configurada por grupo.

## 34.2 Forzar

Solo rol autorizado.

Motivo obligatorio.

## 34.3 Lista de espera

Futuro.

Campos:

- Persona.
- Fecha.
- Prioridad transparente.
- Estado.

## 34.4 Movimiento

No automático.

Leo confirma.

---

# 35. Experiencia de usuario

## 35.1 Reconocimiento

Grupos visuales.

## 35.2 Velocidad

Búsqueda inmediata.

## 35.3 Persistencia

Filtros y vista.

## 35.4 Acciones

Visibles.

## 35.5 Confirmación

Solo sensible.

## 35.6 Lenguaje

- Claro.
- No técnico.
- Verbos.

## 35.7 Volver

Mantener contexto.

---

# 36. Microinteracciones

## 36.1 Tarjeta grupo

- Hover.
- Focus.

## 36.2 Tarjeta alumno

- Fondo.
- Acciones.

## 36.3 Cambio grupo

- Selección.
- Resumen.
- Éxito.

## 36.4 Filtros

- Chips.
- Contador.

## 36.5 Búsqueda

- Resultados.
- Teclado.

## 36.6 Guardado

Toast:

> Cambios guardados.

## 36.7 Prohibido

- Animación larga.
- Rebote.
- Sonido.
- Confeti.

---

# 37. Estados vacíos

## 37.1 Grupo vacío

> Este grupo todavía no tiene alumnos.

Acción:

> Crear solicitud manual

## 37.2 Sin resultados

> No hay alumnos con estos filtros.

Acción:

> Limpiar filtros

## 37.3 Sin cumpleaños

> No hay cumpleaños este mes.

## 37.4 Sin avisos

> Todo al día.

## 37.5 Sin observaciones

> No hay observaciones privadas.

## 37.6 Sin historial

Solo nuevo.

> No hay cambios registrados.

---

# 38. Estados de carga

## 38.1 Grupos

Cuatro esqueletos estables.

## 38.2 Alumnos

Tarjetas esqueleto.

## 38.3 Ficha

Cabecera y secciones.

## 38.4 Búsqueda

Indicador discreto.

## 38.5 Guardado

Botón:

> Guardando...

## 38.6 Regla

No pantalla en blanco.

No saltos.

---

# 39. Estados de error

## 39.1 Grupos

> No hemos podido cargar los grupos.

> Reintentar

## 39.2 Alumno

> No hemos podido cargar la ficha.

## 39.3 Cambio

> No hemos podido cambiar el grupo. No se ha realizado ningún cambio.

## 39.4 Conflicto

> El grupo cambió mientras realizabas esta acción. Revisa la capacidad.

## 39.5 Permiso

> No tienes permiso.

## 39.6 Offline

> Sin conexión. Los cambios no pueden guardarse.

---

# 40. Confirmaciones

## 40.1 Cambio de grupo

Nombre, origen, destino, fecha.

## 40.2 Alta manual

Datos, grupo, documentación.

## 40.3 Baja

Tipo, fecha, efectos.

## 40.4 Reactivación

Grupo, documentos.

## 40.5 Edición sensible

Antes, después, motivo.

## 40.6 Reglas

- Botón acción específico.
- Cancelar seguro.
- No “Sí / No”.

---

# 41. Responsive

## 41.1 Móvil

Primer viewport:

- Título.
- Búsqueda.
- Cuatro grupos 2 por 2.

## 41.2 Tarjetas grupo

- Compactas.
- 2 columnas.
- Texto ajustado.

## 41.3 Grupo

- Cabecera apilada.
- Tarjetas lista.
- Filtros panel inferior.

## 41.4 Ficha

- Pestañas.
- Acciones fijas seguras.
- Sin desbordamiento.

## 41.5 Cambio

Pantalla completa.

No modal pequeño.

## 41.6 Tableta

- 2 por 2.
- Dos columnas de alumnos.

## 41.7 Escritorio

- 4 grupos.
- 3 o 4 tarjetas alumnos.
- Paneles laterales solo si útiles.

## 41.8 Ancho grande

No estirar.

Máximo 1440 px.

---

# 42. Accesibilidad

## 42.1 Nivel

WCAG 2.2 AA.

## 42.2 Tarjetas

- Enlace con nombre.
- Resumen accesible.
- Acciones independientes.

## 42.3 Color

No único indicador.

## 42.4 Teclado

- Buscar.
- Filtrar.
- Abrir.
- Cambiar.

## 42.5 Focus

Visible.

No tapado.

## 42.6 Drag and drop

Alternativa.

## 42.7 Mensajes

Anunciados.

## 42.8 Zoom

200 y 400 %.

---

# 43. Seguridad

## 43.1 Autenticación

Panel protegido.

MFA.

## 43.2 Autorización

Servidor.

Por alumno y acción.

## 43.3 Datos

- HTTPS.
- Cifrado.
- Sesión segura.

## 43.4 Modificaciones

- Actor.
- Fecha.
- Motivo.

## 43.5 Exportaciones

- Permiso.
- Auditoría.
- Caducidad.

## 43.6 Fotos

- Consentimiento.
- Acceso.
- URL segura.

## 43.7 Logs

Sin:

- Nombre completo.
- Teléfono.
- Correo.
- Fecha nacimiento.

## 43.8 Enumeración

IDs opacos.

No secuenciales públicos.

---

# 44. Protección de datos

## 44.1 Minimización

Tarjetas muestran mínimo.

## 44.2 Menores

Acceso restringido.

## 44.3 Fecha nacimiento

Lista muestra edad.

Ficha muestra fecha.

## 44.4 Fotos

No cargar por defecto.

## 44.5 Consentimientos

Separados.

## 44.6 Retención

Según política.

## 44.7 Derechos

Localizar toda información.

---

# 45. Arquitectura funcional

## 45.1 Módulos

- Directorio.
- Grupos.
- Pertenencias.
- Búsqueda.
- Filtros.
- Documentos.
- Consentimientos.
- Observaciones.
- Historial.
- Avisos.
- Cumpleaños.

## 45.2 Separación

Solicitudes y alumnos.

## 45.3 Fuente

Servidor.

## 45.4 Base relacional

Para:

- Integridad.
- Transacciones.
- Historia.

## 45.5 Eventos

- AlumnoCreado.
- AlumnoAsignado.
- AlumnoCambiado.
- AlumnoBaja.
- AlumnoReactivado.
- DocumentoPendiente.
- ConsentimientoCambiado.

## 45.6 Servicios

- Alumnos.
- Grupos.
- Documentos.
- Búsqueda.
- Notificaciones.
- Auditoría.

---

# 46. Modelo conceptual de datos

## 46.1 Alumno

- ID.
- Identidad.
- Nacimiento.
- Alta.
- Estado.
- Cinturón.

## 46.2 Grupo

- ID.
- Nombre.
- Código.
- Categoría.
- Color.
- Capacidad.
- Estado.
- Orden.

## 46.3 Pertenencia

- Alumno.
- Grupo.
- Inicio.
- Fin.
- Estado.
- Motivo.

## 46.4 Horario

- Grupo.
- Día.
- Hora.
- Instructor.

## 46.5 Responsable

- Identidad.
- Contacto.
- Relación.

## 46.6 Documento

- Tipo.
- Versión.
- Vigencia.

## 46.7 Evidencia

- Alumno.
- Documento.
- Decisión.
- Actor.
- Fecha.

## 46.8 Observación

- Tipo.
- Texto.
- Autor.
- Fecha.

## 46.9 Evento

- Actor.
- Acción.
- Antes.
- Después.
- Fecha.

---

# 47. Transacciones

## 47.1 Cambio grupo

Atómico.

## 47.2 Alta

Alumno, pertenencia, documentos.

## 47.3 Baja

Estado, pertenencia, historial.

## 47.4 Reactivación

Estado, nueva pertenencia.

## 47.5 Fallo

Nada parcial.

---

# 48. Concurrencia

## 48.1 Dos usuarios

Detectar versión.

## 48.2 Capacidad

Revalidar al confirmar.

## 48.3 Edición

Comparar cambios.

## 48.4 Conflicto

No sobrescribir.

---

# 49. Arquitectura de búsqueda

## 49.1 Índices

- Nombre normalizado.
- Apellidos.
- Responsable.
- Teléfono.
- Correo.
- Grupo.
- Estado.

## 49.2 Motor

Base de datos inicialmente.

## 49.3 Futuros

Motor dedicado solo por necesidad.

## 49.4 Privacidad

Permisos antes de resultados.

---

# 50. Rendimiento

## 50.1 Objetivos

- Grupos visibles en menos de 2 segundos.
- Búsqueda en menos de 200 ms.
- Abrir grupo menos de 500 ms cuando esté caliente.
- Feedback menos de 100 ms.

## 50.2 Cientos de alumnos

- Paginación.
- Carga progresiva.
- Índices.
- Miniaturas.

## 50.3 No cargar

- Fotos originales.
- Historial completo.
- Documentos completos.

Hasta abrir.

## 50.4 Cache

- Resumen grupos.
- Contadores.

No para:

- Consentimientos críticos.
- Capacidad al confirmar.

---

# 51. Escalabilidad

## 51.1 Cuatro ahora

Primera vista optimizada.

## 51.2 Más grupos

Arquitectura configurable.

Cuando haya más:

- Favoritos.
- Paginación.
- Buscar grupo.
- Categorías.

## 51.3 Cientos de alumnos

Objetivo inicial:

- 500 sin degradación.

Preparado para:

- Miles con paginación.

## 51.4 Sedes

Fuera del MVP:

- Sede.
- Espacio.
- Horarios.

La V1 gestionará una única sede y no incluirá selectores, permisos ni modelos operativos multi-sede.

## 51.5 Cursos

Futuro:

- Temporadas.
- Histórico.
- Renovación.

## 51.6 Multi-gimnasio

Fuera del MVP.

La V1 corresponde únicamente a SAM GUK. No se implementará aislamiento entre organizaciones, alta de gimnasios ni administración multiempresa.

---

# 52. Observabilidad

## 52.1 Métricas

- Tiempo búsqueda.
- Tiempo grupo.
- Cambios.
- Errores.
- Conflictos.

## 52.2 Analítica

Solo métricas operativas básicas y agregadas.

Sin PII.

La analítica avanzada queda fuera del MVP.

## 52.3 Alertas técnicas

- Búsqueda lenta.
- Cambio fallido.
- Grupo inconsistente.
- Contadores incorrectos.

---

# 53. Casos límite

## 53.1 Mismo nombre

Mostrar:

- Edad.
- Grupo.
- Responsable.

## 53.2 Hermanos

Mismo responsable.

Fichas separadas.

## 53.3 Sin grupo

Estado claro.

Aviso.

## 53.4 Grupo archivado

No destino.

## 53.5 Grupo lleno

Bloqueo.

## 53.6 Cambio futuro

Mostrar actual y próximo.

## 53.7 Cumpleaños

Edad recalculada.

## 53.8 Consentimiento retirado

Avisos fotos.

## 53.9 Baja con deuda

Mostrar.

No bloquear injustificadamente.

## 53.10 Alumno duplicado

Comparación.

No fusionar automática.

---

# 54. Pruebas funcionales

## Vista

- Cuatro grupos.
- Orden.
- Contadores.

## Grupo

- Tarjetas.
- Filtros.
- Capacidad.

## Búsqueda

- Tildes.
- Teléfono.
- Mismo nombre.

## Cambio

- Válido.
- Lleno.
- Incompatible.
- Concurrente.

## Alta

- Documentos.
- Duplicado.

## Baja

- Temporal.
- Definitiva.

## Consentimientos

- Pendiente.
- Retirada.

## Cumpleaños

- Mes.
- 29 febrero.

---

# 55. Pruebas de seguridad

- Roles.
- Acceso.
- IDs.
- Fotos.
- Historial.
- Exportación.
- Logs.
- Sesión.
- CSRF.
- XSS.
- Inyección.

---

# 56. Pruebas de accesibilidad

- Teclado.
- Focus.
- Tarjetas.
- Filtros.
- Búsqueda.
- Cambio manual de grupo.
- Confirmaciones.
- Zoom.
- Lector.

---

# 57. Datos pendientes de Leo

Antes de implementación:

- Nombre grupo 1.
- Nombre grupo 2.
- Nombre grupo 3.
- Nombre grupo 4.
- Orden.
- Categoría pública.
- Edades.
- Capacidad.
- Horarios.
- Instructores.
- Colores definitivos.
- Reglas compatibilidad.
- Cinturones.
- Criterio de baja.
- Lista de espera.

No publicar nombres provisionales.

---

# 58. Reglas no negociables

1. Cuatro grupos visibles.
2. Sin scroll inicial en escritorio.
3. Cuadrícula 2 por 2 en móvil.
4. Alumno en cinco segundos.
5. Cambio en tres clics.
6. Solicitudes separadas.
7. Tarjetas limpias.
8. Estados separados.
9. No color solo.
10. Búsqueda instantánea.
11. Filtros persistentes.
12. Grupo configurable.
13. Nombres no inventados.
14. Capacidad validada.
15. Historial inmutable.
16. Consentimiento no interruptor.
17. Imagen opcional.
18. No foto sin base.
19. Alta manual con documentos.
20. Baja no elimina.
21. Cambio transaccional.
22. Drag and drop fuera del MVP.
23. Móvil completo.
24. WCAG 2.2 AA.
25. PII protegida.
26. Permisos servidor.
27. Sin PII en analítica.
28. Escala a cientos.
29. Rendimiento medido.
30. Cada acción orientada a Leo.
31. Una solicitud manual no crea un alumno.
32. Solo la aprobación manual de Leo crea un alumno.
33. La V1 gestiona una única sede y un único gimnasio.
34. La analítica avanzada queda fuera del MVP.

---

# 59. Criterios de aceptación

## Grupos

- Cuatro visibles.
- Nombres reales.
- Contadores correctos.
- Ocupación.

## Alumno

- Tarjeta clara.
- Ficha completa.
- Estados.
- Documentos.
- Consentimientos.
- Historial.

## Velocidad

- Encontrar menos de cinco segundos.
- Cambiar menos de tres clics.

## Gestión

- Alta.
- Edición.
- Baja.
- Reactivación.
- Cambio.

## Responsive

- Móvil.
- Tableta.
- Escritorio.

## Seguridad

- Roles.
- Auditoría.
- Protección.

## Escala

- 500 alumnos.
- Búsqueda 200 ms.

---

# 60. Principio final

Leo debe poder entrar en Alumnos y reconocer el estado del club de un vistazo.

Debe ver:

- Los cuatro grupos.
- Cuántas personas hay.
- Qué requiere atención.
- Dónde está cada alumno.

La herramienta no debe convertir una gestión sencilla en burocracia digital.

La pregunta para validar cada decisión será:

> ¿Esto ayuda a Leo a encontrar al alumno antes y realizar el cambio con menos esfuerzo y menos riesgo?

Si la respuesta es no, no debe formar parte del sistema.
