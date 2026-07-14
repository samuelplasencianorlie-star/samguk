# SAM GUK CLUB TAEKWONDO
## Especificación profesional del panel privado de administración

**Documento:** `03_ADMIN_PANEL.md`  
**Versión:** 1.1  
**Estado:** Especificación funcional, visual, técnica y operativa  
**Responsable del producto:** LUMEN Studio  
**Usuario principal:** Leo  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito del documento

Este documento define por completo el panel privado de administración de SAM GUK Club Taekwondo.

El panel será el centro operativo del club.

Desde él, Leo deberá poder:

- Revisar nuevas solicitudes.
- Contactar con familias.
- Aprobar alumnos.
- Consultar y actualizar fichas.
- Gestionar grupos y horarios.
- Controlar pagos y recibos.
- Revisar documentación y consentimientos.
- Gestionar fotografías.
- Consultar cumpleaños.
- Registrar observaciones.
- Revisar el historial de cambios.
- Recibir notificaciones.
- Encontrar cualquier información con rapidez.

El panel no será una versión privada de la web pública. Será una herramienta de trabajo diaria.

La calidad del panel se medirá por:

- Claridad.
- Rapidez.
- Seguridad.
- Facilidad de aprendizaje.
- Reducción de trabajo administrativo.
- Ausencia de errores.
- Trazabilidad de acciones.

Este documento no contiene código. Define comportamiento, arquitectura, jerarquía, estados, textos, reglas y criterios de aceptación.

---

# 2. Objetivo principal

El panel debe permitir que Leo gestione el club sin conocimientos técnicos y sin depender de hojas de cálculo, notas dispersas, conversaciones antiguas o procesos manuales difíciles de recordar.

Cada pantalla deberá responder a una pregunta concreta:

- ¿Qué requiere mi atención?
- ¿Quién es este alumno?
- ¿Qué se ha pagado?
- ¿Qué consentimiento está vigente?
- ¿A qué grupo pertenece?
- ¿Qué cambió y quién lo cambió?
- ¿Qué tengo que hacer a continuación?

El panel deberá presentar primero las tareas que requieren acción, no los datos que simplemente existen.

---

# 3. Regla absoluta: acciones importantes en menos de tres clics

Toda acción frecuente o importante deberá poder completarse en un máximo de tres clics desde una pantalla relevante.

## 3.1 Qué se considera una acción importante

- Abrir una nueva solicitud.
- Registrar contacto.
- Aprobar una solicitud lista.
- Buscar un alumno.
- Abrir una ficha.
- Registrar un pago.
- Consultar un consentimiento.
- Cambiar de grupo.
- Ver horarios.
- Añadir una observación.
- Consultar cumpleaños.
- Revisar una notificación.
- Comprobar el historial.

## 3.2 Cómo se cuentan los clics

Se cuenta cada activación deliberada:

- Pulsar un botón.
- Seleccionar un resultado.
- Confirmar una acción.

Escribir texto o elegir una opción dentro de un control no se considera un clic adicional para esta métrica, aunque la interfaz debe reducir también esas interacciones.

## 3.3 Ejemplos obligatorios

### Abrir una solicitud pendiente

1. Pulsar la solicitud desde Inicio.

Resultado:

- Detalle abierto en un clic.

### Registrar contacto

1. Abrir solicitud.
2. Pulsar “Registrar contacto”.
3. Guardar.

### Aprobar alumno

1. Abrir solicitud lista para aprobar.
2. Pulsar “Aprobar alumno”.
3. Confirmar aprobación.

### Buscar alumno y abrir ficha

1. Activar buscador.
2. Pulsar resultado.

### Cambiar grupo desde la ficha

1. Pulsar “Cambiar grupo”.
2. Elegir grupo.
3. Confirmar.

### Registrar pago desde cualquier pantalla

1. Pulsar acción global “Registrar pago”.
2. Seleccionar alumno y completar.
3. Guardar pago.

## 3.4 Consecuencias de diseño

- Las acciones frecuentes serán visibles.
- No se esconderán dentro de varios menús.
- No habrá menús dentro de menús.
- No habrá modales anidados.
- Las confirmaciones se reservarán para acciones sensibles.
- La navegación conservará filtros y posición.
- El buscador será global.
- El panel Inicio mostrará accesos directos a tareas pendientes.

---

# 4. Principios de producto

## 4.1 Sencillez

Leo no deberá memorizar rutas, estados ni códigos.

La interfaz utilizará:

- Lenguaje cotidiano.
- Estados comprensibles.
- Acciones explícitas.
- Formularios cortos.
- Valores predeterminados seguros.

## 4.2 Prioridad

El panel mostrará primero:

1. Solicitudes nuevas.
2. Contactos pendientes.
3. Pagos o cuotas pendientes.
4. Consentimientos que requieren atención.
5. Cambios de horario.
6. Cumpleaños próximos.

## 4.3 Control humano

Las decisiones sensibles seguirán dependiendo de Leo:

- Aprobación.
- Rechazo.
- Cambio de grupo.
- Corrección de pagos.
- Actualización de consentimientos.
- Gestión de fotografías.

## 4.4 Trazabilidad

El sistema deberá poder responder:

- Qué ocurrió.
- Cuándo.
- Quién lo hizo.
- Qué valor había antes.
- Qué valor quedó después.
- Por qué se cambió.

## 4.5 Privacidad por defecto

El panel mostrará únicamente la información necesaria para cada tarea.

Por defecto:

- No se mostrarán fechas de nacimiento completas en listados.
- No se mostrarán datos de menores en notificaciones externas.
- No se cargarán fotografías donde no sean necesarias.
- No se permitirá exportar todo sin permiso y confirmación.
- No se utilizarán datos personales en analítica.

## 4.6 Consistencia

Una misma acción tendrá:

- Mismo nombre.
- Mismo color.
- Mismo icono.
- Mismo comportamiento.
- Mismo tipo de confirmación.

## 4.7 Prevención de errores

El sistema debe evitar errores antes de que ocurran.

Ejemplos:

- No permitir aprobar si falta pago.
- Avisar de grupo completo.
- Bloquear publicación de fotografía sin consentimiento.
- Detectar posibles duplicados.
- Pedir motivo para cambios sensibles.

---

# 5. Referencias de cumplimiento

La seguridad y accesibilidad del panel deberán verificarse con referencias actuales:

- [OWASP Application Security Verification Standard 5.0](https://github.com/OWASP/ASVS).
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [Protección de datos por defecto de la AEPD](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/proteccion-de-datos-por-defecto).

El diseño deberá respetar además las decisiones de:

- `00_PRODUCT_BOOK.md`.
- `01_PUBLIC_WEBSITE.md`.
- `02_REGISTRATION_FLOW.md`.
- `04_STUDENTS_GROUPS.md`.
- `05_PAYMENTS_RECEIPTS.md`.

En caso de contradicción:

1. La protección de datos y seguridad tienen prioridad.
2. El flujo de inscripción conserva sus estados obligatorios.
3. La decisión se documentará antes de desarrollarse.

---

# 6. Usuarios y permisos

## 6.1 Leo

Rol:

> Propietario administrador

Acceso completo a:

- Solicitudes.
- Alumnos.
- Responsables.
- Pagos.
- Recibos.
- Consentimientos.
- Fotografías.
- Grupos.
- Horarios.
- Historial.
- Configuración.

## 6.2 Roles complejos fuera del MVP

La V1 utilizará un esquema sencillo:

- Leo como propietario administrador.
- Personal expresamente autorizado, solo si es necesario.

No se implementarán en el MVP matrices avanzadas de permisos, flujos de invitación complejos ni perfiles especializados.

Los siguientes roles pertenecen a una fase posterior y se conservan únicamente como referencia de evolución:

### Administrador

Puede gestionar casi todo, excepto propiedad y seguridad crítica.

### Instructor

Puede:

- Ver alumnos de sus grupos.
- Consultar datos operativos mínimos.
- Registrar asistencia.
- Añadir observaciones de entrenamiento.

No puede:

- Ver pagos completos.
- Exportar contactos.
- Aprobar solicitudes.
- Cambiar consentimientos.
- Publicar fotografías.

### Administración económica

Puede:

- Ver cuotas.
- Registrar pagos.
- Emitir recibos.

No puede:

- Ver observaciones privadas de entrenamiento.
- Gestionar fotografías.
- Modificar consentimientos.

### Solo lectura

Puede consultar áreas autorizadas sin modificar.

## 6.3 Reglas

- Cuentas individuales.
- Nunca compartir credenciales.
- Permisos del lado servidor.
- Menor privilegio.
- Acciones auditadas.
- Revocación inmediata.

---

# 7. Acceso al panel

## 7.1 Ruta

> `/admin`

Esta ruta es exclusiva para Leo y personal autorizado. La V1 no incluye cuentas, sesiones ni área privada para alumnos, familias o responsables.

## 7.2 Pantalla de acceso

Contenido:

- Logotipo.
- Título “Acceso privado”.
- Correo.
- Contraseña o método seguro.
- Continuar.
- Recuperar acceso.

No mostrará:

- Credenciales demo.
- Datos de alumnos.
- Información operativa.
- Confirmación de existencia de cuentas.

## 7.3 Mensajes

Error genérico:

> No hemos podido iniciar sesión con esos datos.

No se distinguirá:

- Correo inexistente.
- Contraseña incorrecta.
- Cuenta desactivada.

## 7.4 Segundo factor

Será obligatorio para cuentas administrativas.

Métodos preferentes:

- Aplicación autenticadora.
- Passkey.
- Llave de seguridad.

SMS solo como alternativa revisada.

## 7.5 Recuperación

- Enlace temporal.
- Caducidad corta.
- Un solo uso.
- Notificación.
- Invalidación de sesiones.

## 7.6 Primer acceso

Obligará a:

- Configurar segundo factor.
- Revisar datos.
- Aceptar política interna.
- Cerrar sesiones desconocidas.

## 7.7 Cierre de sesión

Visible en menú de cuenta.

Al cerrar:

- Invalidar sesión.
- Limpiar datos sensibles.
- Volver a acceso.

---

# 8. Inicio del panel

## 8.1 Objetivo

Responder en segundos:

- Qué está pasando.
- Qué necesita atención.
- Qué debe hacer Leo hoy.

## 8.2 Primera carga

Tras acceder, Leo llegará a:

> Inicio

No deberá elegir módulo.

## 8.3 Orden visual

1. Saludo y fecha.
2. Acciones rápidas.
3. Alertas prioritarias.
4. Resumen numérico.
5. Tareas pendientes.
6. Solicitudes recientes.
7. Clases de hoy.
8. Cumpleaños próximos.
9. Actividad reciente.

## 8.4 Saludo

Ejemplo:

> Buenos días, Leo

Debajo:

> Jueves, 2 de julio

Sin mensajes promocionales.

## 8.5 Acciones rápidas

- Registrar pago.
- Crear solicitud manual.
- Registrar asistencia.
- Ver solicitudes.

Máximo cuatro.

## 8.6 Prioridad

Si existe una alerta crítica:

- Aparece antes de estadísticas.
- Explica acción.
- Incluye botón.

Ejemplos:

- 3 solicitudes llevan más de 48 horas sin revisar.
- Un consentimiento de imagen fue retirado.
- Un grupo supera capacidad.
- Falló la notificación de una solicitud.

---

# 9. Dashboard principal

## 9.1 Filosofía

El dashboard no será una colección de gráficos.

Cada dato deberá:

- Ayudar a decidir.
- Tener definición.
- Mostrar periodo.
- Permitir abrir detalle.

## 9.2 Estadísticas principales

### Alumnos activos

Definición:

- Alumnos con estado ACTIVO.

Muestra:

- Total.
- Variación mensual.

Acción:

- Ver alumnos activos.

### Solicitudes pendientes

Definición:

- PENDIENTE_DE_REVISIÓN.
- EN_REVISIÓN.
- CONTACTO_PENDIENTE.

Muestra:

- Total.
- Antiguas.

Acción:

- Ver pendientes.

### Pagos del mes

Definición:

- Suma de pagos confirmados.

Muestra:

- Total.
- Número de pagos.
- Periodo.

Acción:

- Ver pagos.

### Cuotas pendientes

Definición:

- Cuotas vencidas y no pagadas.

Muestra:

- Número.
- Importe.

Acción:

- Ver pendientes.

### Recibos emitidos

Definición:

- Recibos válidos del periodo.

Acción:

- Ver recibos.

### Ocupación de grupos

Muestra:

- Capacidad.
- Ocupación.
- Disponibilidad.

Acción:

- Ver grupos.

## 9.3 Estadísticas secundarias

Las estadísticas secundarias y comparativas avanzadas quedan fuera del MVP salvo que una de ellas sea necesaria para una decisión operativa diaria.

- Altas del mes.
- Bajas del mes.
- Asistencia media.
- Solicitudes convertidas.
- Cumpleaños del mes.
- Consentimientos incompletos.
- Fotografías pendientes de revisión.

## 9.4 Periodos

Opciones:

- Hoy.
- Esta semana.
- Este mes.
- Mes anterior.
- Curso actual.
- Personalizado.

El periodo visible siempre.

## 9.5 Gráficos

Los gráficos y la analítica avanzada quedan fuera del MVP.

La V1 priorizará cifras, listas y enlaces operativos. Los siguientes gráficos se consideran una posible evolución posterior y solo se incorporarán cuando mejoren realmente la comprensión.

Permitidos:

- Línea de alumnos.
- Barras de ingresos mensuales.
- Ocupación.

Obligatorio:

- Resumen textual.
- Valores accesibles.
- Tabla alternativa.

Prohibido:

- Donuts decorativos.
- 3D.
- Animaciones largas.
- Colores sin etiquetas.

---

# 10. Tareas pendientes

## 10.1 Objetivo

Convertir estados en acciones.

## 10.2 Categorías

- Revisar solicitud.
- Contactar familia.
- Confirmar visita.
- Registrar pago.
- Aprobar alumno.
- Revisar consentimiento.
- Retirar fotografía.
- Resolver duplicado.
- Actualizar horario.

## 10.3 Orden

1. Riesgo legal.
2. Solicitud nueva.
3. Tarea vencida.
4. Pago.
5. Operación.

## 10.4 Elemento

- Título.
- Persona.
- Fecha.
- Antigüedad.
- Prioridad.
- Acción.

## 10.5 Finalización

No habrá casilla genérica si la tarea requiere una acción real.

Ejemplo:

Una tarea “Registrar pago” se completa registrando pago.

---

# 11. Notificaciones

## 11.1 Tipos

### Acción

Requiere intervención.

### Información

Confirma un evento.

### Advertencia

Puede generar problema.

### Seguridad

Acceso, sesión o cambio sensible.

## 11.2 Eventos

- Nueva solicitud.
- Solicitud sin revisar.
- Contacto vencido.
- Pago pendiente.
- Pago registrado.
- Consentimiento retirado.
- Documento legal actualizado.
- Fotografía afectada.
- Cumpleaños próximo.
- Grupo lleno.
- Cambio de horario.
- Error de integración.
- Inicio de sesión nuevo.

## 11.3 Centro de notificaciones

Acceso desde cabecera.

Cada notificación:

- Tipo.
- Texto.
- Hora.
- Estado.
- Enlace.

## 11.4 Leída

Abrir la notificación la marca como leída.

Podrá:

- Marcar como no leída.
- Archivar.

## 11.5 Badge

Mostrará pendientes de acción, no todas las no leídas.

## 11.6 Agrupación

Eventos repetidos se agruparán.

Ejemplo:

> 4 pagos registrados hoy

## 11.7 Preferencias

Leo podrá configurar:

- Panel.
- Correo.
- Resumen diario.
- Alertas críticas.

Seguridad no podrá desactivarse por completo.

## 11.8 Privacidad

Correos externos no incluirán datos completos de menores.

---

# 12. Navegación principal

## 12.1 Orden

1. Inicio.
2. Solicitudes.
3. Alumnos.
4. Grupos y horarios.
5. Pagos y recibos.
6. Asistencia.
7. Documentos.
8. Configuración.

## 12.2 Escritorio

- Barra lateral fija.
- Ancho 240 a 264 px.
- Logotipo.
- Navegación.
- Cuenta abajo.

## 12.3 Móvil

- Cabecera compacta.
- Menú.
- Accesos inferiores:
  - Inicio.
  - Solicitudes.
  - Alumnos.
  - Más.

## 12.4 Estado activo

- Fondo.
- Indicador.
- Texto.

No solo color.

## 12.5 Contadores

Solo:

- Solicitudes nuevas.
- Tareas urgentes.

---

# 13. Buscador global

## 13.1 Objetivo

Encontrar información al instante.

## 13.2 Ubicación

- Cabecera en escritorio.
- Acción visible en móvil.

Placeholder:

> Buscar alumno, familia o solicitud

## 13.3 Datos buscables

- Nombre.
- Apellidos.
- Teléfono.
- Correo.
- Responsable.
- Referencia.
- Número de alumno.
- Grupo.

## 13.4 Búsqueda instantánea

- Resultados desde los primeros caracteres.
- Espera breve para evitar consultas.
- Objetivo inferior a 200 ms.
- No requiere Enter.

## 13.5 Normalización

- Ignorar mayúsculas.
- Ignorar tildes.
- Tolerar espacios.
- Tolerar formato de teléfono.

## 13.6 Resultados

Agrupados:

- Solicitudes.
- Alumnos.
- Responsables.
- Grupos.

Cada resultado:

- Nombre.
- Tipo.
- Estado.
- Grupo.
- Coincidencia.

## 13.7 Teclado

- Flechas.
- Enter.
- Escape.
- Atajo opcional `/` o Comando K.

No será necesario conocer el atajo.

## 13.8 Sin resultados

> No encontramos resultados para “{búsqueda}”.

Acciones:

- Revisar texto.
- Ver todos.
- Crear solicitud manual, si procede.

## 13.9 Privacidad

- No enviar a terceros.
- No guardar en analítica.
- No autocompletar con datos no autorizados.
- No mostrar resultados tras cerrar sesión.

---

# 14. Solicitudes pendientes

## 14.1 Coherencia

Seguirá `02_REGISTRATION_FLOW.md`.

## 14.2 Vista

Tabla en escritorio.

Tarjetas compactas en móvil.

## 14.3 Columnas

- Referencia.
- Fecha.
- Alumno.
- Edad.
- Grupo.
- Contacto.
- Estado.
- Próxima acción.

## 14.4 Filtros

- Nuevas.
- En revisión.
- Contacto pendiente.
- Contactadas.
- Confirmación pendiente.
- Pago pendiente.
- Listas para aprobar.
- Cerradas.

## 14.5 Acciones

- Ver solicitud.
- Registrar contacto.
- Aprobar, solo si lista.

## 14.6 Detalle

Incluye:

- Datos.
- Responsable.
- Documentos.
- Consentimientos.
- Historial.
- Contactos.
- Confirmación.
- Pago.

## 14.7 Aprobación

Nunca automática.

Máximo:

1. Abrir.
2. Aprobar.
3. Confirmar.

---

# 15. Gestión de alumnos

## 15.1 Objetivo

Directorio único de alumnos aprobados.

## 15.2 Estados

- Activo.
- Inactivo.
- Baja temporal.
- Baja definitiva.

Las solicitudes no aprobadas no aparecen como alumnos.

La documentación pendiente no será un estado de alta inicial. Si faltan documentos obligatorios, el registro permanece como solicitud y no puede convertirse en alumno.

## 15.3 Vista principal

Tabla:

- Alumno.
- Edad.
- Grupo.
- Cinturón.
- Responsable.
- Teléfono.
- Pago.
- Asistencia.
- Estado.
- Consentimiento de imagen.

## 15.4 Densidad

Dos modos:

- Cómodo.
- Compacto.

Predeterminado cómodo.

## 15.5 Orden

Por apellido.

Opciones:

- Nombre.
- Alta.
- Grupo.
- Próximo cumpleaños.
- Pago.

## 15.6 Paginación

- Lado servidor.
- 25 por defecto.
- 50 opcional.

Mantener filtros al volver.

## 15.7 Crear solicitud manual

Solo para casos excepcionales.

Botón:

> Crear solicitud manual

Esta acción no crea un alumno.

Debe crear una solicitud interna pendiente y respetar:

- Datos.
- Responsable.
- Documentos.
- Consentimientos.
- Pago.
- Revisión.
- Aprobación manual de Leo.
- Auditoría.

No será un atajo para omitir el flujo legal.

El alumno solo se creará después de que Leo pulse “Aprobar alumno” y se completen todas las validaciones.

---

# 16. Filtros de alumnos

## 16.1 Filtros

- Estado.
- Grupo.
- Cinturón.
- Edad.
- Responsable.
- Pago.
- Asistencia.
- Alta.
- Cumpleaños.
- Consentimiento.
- Documentación.

## 16.2 Comportamiento

- Aplicación inmediata.
- Chips visibles.
- Limpiar individualmente.
- Limpiar todos.
- Contador.

## 16.3 Presets

- Activos.
- Cuotas pendientes.
- Cumpleaños del mes.
- Sin consentimiento de imagen.
- Documentación pendiente.
- Asistencia baja.

## 16.4 URL

Los filtros podrán conservarse sin incluir datos sensibles.

## 16.5 Guardados

Leo podrá guardar:

- Nombre.
- Filtros.
- Orden.

No se compartirán públicamente.

---

# 17. Ficha completa del alumno

## 17.1 Objetivo

Reunir toda la información sin saturar.

## 17.2 Cabecera

- Nombre.
- Estado.
- Edad.
- Grupo.
- Cinturón.
- Pago.
- Fotografía interna autorizada, si existe.

## 17.3 Acciones rápidas

- Registrar pago.
- Cambiar grupo.
- Añadir observación.
- Registrar asistencia.
- Editar datos.

Máximo cinco visibles.

## 17.4 Pestañas

1. Resumen.
2. Datos.
3. Grupo y horario.
4. Pagos.
5. Asistencia.
6. Documentos y consentimientos.
7. Fotografías.
8. Historial.

## 17.5 Resumen

- Datos principales.
- Responsable.
- Próxima clase.
- Último pago.
- Asistencia.
- Consentimientos.
- Observaciones fijadas.
- Actividad reciente.

## 17.6 Datos personales

- Nombre.
- Apellidos.
- Fecha de nacimiento.
- Edad.
- Fecha de alta.
- Estado.
- Contacto.
- Responsable.
- Relación.
- Emergencia si existe proceso autorizado.

## 17.7 Edición

- Campos editables agrupados.
- Guardar explícito.
- Cancelar.
- Motivo para cambios sensibles.

## 17.8 Baja

No usar “Eliminar alumno”.

Acción:

> Gestionar baja

Requiere:

- Tipo.
- Fecha.
- Motivo.
- Impacto en pagos.
- Confirmación.

---

# 18. Responsable y familia

## 18.1 Relación

Un responsable podrá estar vinculado a varios alumnos.

## 18.2 Datos

- Nombre.
- Relación.
- Teléfono.
- Correo.
- Canal.
- Alumnos vinculados.

## 18.3 Cambio

Cambiar responsable requiere:

- Validación.
- Motivo.
- Auditoría.
- Revisión de consentimientos.

## 18.4 Contacto rápido

Botones:

- Llamar.
- WhatsApp.
- Correo.

No mostrar en escritorio compartido sin protección.

## 18.5 Comunicación

El historial registra:

- Fecha.
- Canal.
- Resumen.
- Autor.

No guarda conversaciones completas.

---

# 19. Documentación aceptada

## 19.1 Objetivo

Consultar qué documento, versión y decisión están vigentes.

## 19.2 Vista

Por documento:

- Título.
- Versión.
- Vigencia.
- Estado.
- Fecha.
- Persona.
- Evidencia.

## 19.3 Estados

- Vigente.
- Sustituido.
- Pendiente.
- Requiere nueva aceptación.
- Retirado.
- No aplicable.

## 19.4 Acciones

- Ver documento.
- Ver evidencia.
- Descargar recibo.
- Solicitar actualización.

## 19.5 Inmutabilidad

Leo no podrá cambiar una aceptación con un interruptor.

Todo cambio requiere:

- Nueva decisión.
- Fuente.
- Fecha.
- Actor.
- Motivo.

## 19.6 Nueva versión

Al publicar una versión:

- No modifica evidencia antigua.
- Marca quién debe aceptar.
- Genera tarea.
- Registra fecha.

---

# 20. Estado de consentimientos

## 20.1 Resumen

- Protección de datos informada.
- Condiciones.
- Normas.
- Imagen.
- Comunicaciones opcionales.

## 20.2 Etiquetas

- Aceptado.
- No autorizado.
- Parcial.
- Retirado.
- Pendiente.
- Revisión necesaria.

## 20.3 Imagen

Mostrar por canal:

- Web.
- Redes.
- Impreso.
- Familias.

## 20.4 Cambio

Botón:

> Registrar nueva decisión

Campos:

- Persona.
- Canal.
- Decisión.
- Fecha.
- Forma.
- Evidencia.

## 20.5 Retirada

Al retirar:

- Estado RETIRADO.
- Crear tarea fotográfica.
- Impedir nuevos usos.
- Revisar publicaciones.
- Auditar.

## 20.6 Menores

Mostrar:

- Quién decidió.
- Relación.
- Edad.
- Participación del menor si aplica.

---

# 21. Gestión de fotografías

## 21.1 Objetivo

Controlar archivo y uso de imágenes conforme a consentimiento.

## 21.2 Acceso

- Desde alumno.
- Desde módulo Documentos.
- Desde alertas.

## 21.3 Vista de alumno

Galería con:

- Miniatura.
- Fecha.
- Actividad.
- Estado.
- Canales.
- Consentimiento.

## 21.4 Subida

Botón:

> Añadir fotografías

Antes:

- Comprobar consentimiento.
- Mostrar canales permitidos.

Si no:

> No hay autorización vigente para gestionar esta imagen con fines de comunicación.

## 21.5 Metadatos

- Fecha.
- Actividad.
- Alumnos.
- Autor.
- Finalidad.
- Canales.
- Texto alternativo.
- Estado.

## 21.6 Estados

- Borrador.
- Pendiente de revisión.
- Aprobada.
- Publicada.
- Restringida.
- Retirada.
- Archivada.

## 21.7 Publicación

Antes:

- Todos autorizados.
- Canal permitido.
- Vigencia.
- Revisión.

## 21.8 Varios alumnos

La autorización deberá ser válida para todos.

Si uno no:

- No publicar.
- Recortar si seguro y legítimo.
- Elegir otra imagen.

No usar técnicas de ocultación que permitan reconstrucción.

## 21.9 Retirada

Genera:

- Bloqueo.
- Lista de publicaciones.
- Responsable.
- Fecha límite.
- Confirmación de retirada.

## 21.10 Prohibiciones

- Reconocimiento facial.
- Etiquetado automático.
- Entrenar IA.
- Subir a herramientas externas no autorizadas.
- Publicar apellidos de menores.

## 21.11 Eliminación

Acción:

> Archivar fotografía

La eliminación definitiva:

- Permiso.
- Motivo.
- Confirmación.
- Auditoría.

---

# 22. Cumpleaños del mes

## 22.1 Dashboard

Widget:

> Cumpleaños próximos

Muestra:

- Próximos 7 días.
- Total del mes.

## 22.2 Vista

- Nombre.
- Día.
- Edad que cumple.
- Grupo.
- Responsable si menor.

## 22.3 Privacidad

- Solo en panel.
- No en notificación externa con fecha completa.
- No enviar mensaje automático.

## 22.4 Acción

Podrá:

- Ver ficha.
- Preparar felicitación.

La comunicación dependerá de:

- Canal válido.
- Política.
- Edad.

## 22.5 Filtro

> Cumpleaños este mes

Disponible en alumnos.

---

# 23. Grupos

## 23.1 Vista

Tarjetas o tabla:

- Nombre.
- Edad.
- Instructor.
- Días.
- Horario.
- Capacidad.
- Activos.
- Disponibilidad.

## 23.2 Detalle

- Descripción.
- Horario.
- Lista.
- Capacidad.
- Altas.
- Bajas.
- Asistencia.
- Cuota.

## 23.3 Capacidad

Estados:

- Disponible.
- Casi completo.
- Completo.
- Cerrado.

Umbrales configurables.

## 23.4 Alumno

Desde grupo:

- Abrir ficha.
- Registrar asistencia.
- Cambiar grupo.

---

# 24. Horarios

## 24.1 Vista semanal

- Lunes a domingo.
- Bloques.
- Hora.
- Grupo.
- Instructor.
- Ubicación.

## 24.2 Vista lista

Alternativa accesible.

## 24.3 Acciones

- Crear horario.
- Editar.
- Cancelar sesión.
- Cambiar instructor.

## 24.4 Conflictos

Detectar:

- Mismo instructor.
- Mismo espacio.
- Solapamiento.
- Grupo duplicado.

## 24.5 Cambios

Requieren:

- Fecha de efecto.
- Motivo.
- Alumnos afectados.
- Notificación.

## 24.6 Publicación

Cambios públicos:

- Borrador.
- Revisado.
- Publicado.

No actualizar web sin confirmación.

---

# 25. Cambio de grupo

## 25.1 Inicio

Desde ficha:

> Cambiar grupo

## 25.2 Pantalla

- Grupo actual.
- Grupos compatibles.
- Horarios.
- Capacidad.
- Cuota.
- Fecha efectiva.

## 25.3 Validaciones

- Edad.
- Capacidad.
- Conflicto.
- Estado.
- Cuota.
- Pago.

## 25.4 Confirmación

Texto:

> {Alumno} pasará de {grupo actual} a {grupo nuevo} el {fecha}.

Botones:

- Volver.
- Confirmar cambio.

## 25.5 Resultado

> Grupo actualizado correctamente.

## 25.6 Efectos

- Actualizar membresía.
- Horario.
- Listados.
- Cuota futura si aplica.
- Historial.
- Notificación.

No modificar recibos anteriores.

---

# 26. Pagos y recibos

## 26.1 Integración

Seguirá `05_PAYMENTS_RECEIPTS.md`.

## 26.2 Resumen

- Pagos del mes.
- Pendientes.
- Últimos pagos.
- Recibos.

## 26.3 Registrar pago

Acción global.

Campos:

- Alumno.
- Concepto.
- Importe.
- Método.
- Fecha.
- Observación.

## 26.4 Seguridad

- No guardar tarjeta.
- No guardar credenciales.
- Correcciones auditadas.

## 26.5 Ficha

Historial:

- Fecha.
- Concepto.
- Importe.
- Método.
- Recibo.
- Estado.

---

# 27. Asistencia

## 27.1 Objetivo

Registro rápido por clase.

## 27.2 Flujo

1. Elegir clase.
2. Marcar.
3. Guardar.

## 27.3 Estados

- Presente.
- Ausente.
- Justificada.
- Llegó tarde.

## 27.4 Interacción

- Lista táctil.
- Marcar todos presentes.
- Ajustar excepciones.

## 27.5 Historial

- Alumno.
- Grupo.
- Fecha.
- Estado.
- Registrador.

## 27.6 Alertas

Ausencias repetidas:

- Señal.
- Sin diagnóstico.
- Revisión humana.

---

# 28. Observaciones privadas

## 28.1 Objetivo

Registrar contexto útil.

## 28.2 Tipos

- Administración.
- Contacto.
- Entrenamiento.
- Seguimiento.

## 28.3 Campos

- Texto.
- Categoría.
- Autor.
- Fecha.
- Fijada.

## 28.4 Reglas

- Objetivas.
- Breves.
- Respetuosas.
- Necesarias.

## 28.5 Prohibido

- Insultos.
- Diagnósticos informales.
- Rumores.
- Información excesiva.
- Credenciales.
- Tarjetas.

## 28.6 Edición

No borrar silenciosamente.

Corrección:

- Motivo.
- Versión anterior.
- Nueva.

## 28.7 Visibilidad

No visible para familias.

Acceso por rol.

---

# 29. Historial de modificaciones

## 29.1 Objetivo

Auditoría comprensible.

## 29.2 Eventos

- Creación.
- Datos.
- Grupo.
- Estado.
- Pago.
- Consentimiento.
- Fotografía.
- Observación.
- Baja.
- Acceso sensible.

## 29.3 Fila

- Fecha.
- Actor.
- Acción.
- Antes.
- Después.
- Motivo.

## 29.4 Filtros

- Tipo.
- Fecha.
- Actor.

## 29.5 Inmutabilidad

No editar ni borrar.

## 29.6 Exportación

Solo permiso.

Auditar.

---

# 30. Acciones globales

## 30.1 Ubicación

Cabecera:

> Nueva acción

## 30.2 Opciones

- Registrar pago.
- Crear solicitud manual.
- Registrar asistencia.

Crear grupos queda fuera de las acciones globales del MVP.

## 30.3 Regla

Máximo tres acciones frecuentes en el MVP.

No convertir en menú infinito.

---

# 31. Diseño visual

## 31.1 Estilo

- Profesional.
- Claro.
- Sobrio.
- Operativo.
- Ligero.

## 31.2 Paleta

### Fondo

`#F5F7FA`

### Superficie

`#FFFFFF`

### Navegación

`#0A2540`

### Acción

`#174EA6`

### Destructivo

`#C8102E`

### Éxito

`#137A5B`

### Advertencia

`#9A6700`

### Texto

`#111318`

### Secundario

`#5F6B7A`

## 31.3 Uso del rojo

En panel:

- Error.
- Destructivo.
- Atención crítica.

No será el color normal de guardar.

## 31.4 Tipografía

Inter o sistema.

- Base 16 px.
- Tablas 14 a 15 px.
- Título 28 a 32 px.
- Números 28 a 36 px.

## 31.5 Tarjetas

- Radio 8 px.
- Borde sutil.
- Sombra mínima.
- Sin anidación.

## 31.6 Tablas

- Encabezado claro.
- Filas 48 a 56 px.
- Hover.
- Selección.
- Acciones a la derecha.

## 31.7 Densidad

No usar espacio de landing.

Contenido compacto y respirado.

---

# 32. UX

## 32.1 Una acción principal

Cada pantalla tendrá una.

## 32.2 Guardado

- Explícito en datos sensibles.
- Confirmación de éxito.
- No ocultar fallo.

## 32.3 Navegación

Volver conserva:

- Filtro.
- Página.
- Scroll.
- Búsqueda.

## 32.4 Cambios sin guardar

Mensaje:

> Tienes cambios sin guardar. ¿Quieres salir?

Acciones:

- Seguir editando.
- Salir sin guardar.

## 32.5 Confirmaciones

Solo para:

- Aprobar.
- Rechazar.
- Baja.
- Pago.
- Consentimiento.
- Foto.
- Exportar.

## 32.6 Ayuda

- Etiquetas claras.
- Texto breve.
- Tooltips solo en iconos.
- No manual obligatorio.

---

# 33. Microinteracciones

## 33.1 Botón

- Hover de tono.
- Active.
- Focus.
- Carga.

## 33.2 Fila

- Fondo sutil.
- No mover contenido.

## 33.3 Guardado

Toast:

> Cambios guardados.

Duración suficiente.

## 33.4 Copiar

Para referencia:

- Copiar.
- Confirmar “Copiado”.

## 33.5 Filtros

- Chip inmediato.
- Contador.

## 33.6 Notificación

- Badge actualizado sin animación intrusiva.

## 33.7 Prohibido

- Confeti.
- Rebotes.
- Contadores animados.
- Sonidos.
- Transiciones largas.

---

# 34. Estados vacíos

## 34.1 Inicio sin datos

> Todavía no hay actividad.

Acción:

- Ver solicitudes.

## 34.2 Sin solicitudes

> No hay solicitudes pendientes.

## 34.3 Sin alumnos

> Todavía no hay alumnos activos.

Acción:

- Revisar solicitudes.
- Crear solicitud manual.

## 34.4 Sin pagos

> No hay pagos en este periodo.

## 34.5 Sin fotografías

> No hay fotografías asociadas.

## 34.6 Sin cumpleaños

> No hay cumpleaños este mes.

## 34.7 Sin resultados

> No hay resultados con estos filtros.

Acción:

- Limpiar filtros.

## 34.8 Regla

No usar ilustraciones grandes.

El vacío debe explicar y orientar.

---

# 35. Estados de carga

## 35.1 Inicial

- Esqueleto.
- Dimensiones estables.

## 35.2 Acción

- Indicador dentro de botón.
- Texto.

Ejemplo:

> Guardando...

## 35.3 Tabla

- Filas esqueleto.
- No spinner aislado.

## 35.4 Más de 3 segundos

Mostrar:

> Está tardando más de lo habitual.

## 35.5 Evitar

- Pantalla blanca.
- Layout saltando.
- Acción duplicada.

---

# 36. Estados de error

## 36.1 Recuperable

> No hemos podido cargar esta información.

Botón:

> Reintentar

## 36.2 Sin permisos

> No tienes permiso para realizar esta acción.

## 36.3 Registro actualizado

> Esta ficha cambió mientras la estabas editando. Revisa los datos antes de guardar.

## 36.4 Sesión caducada

> Tu sesión ha caducado. Vuelve a iniciar sesión.

## 36.5 Sin conexión

Banner:

> Sin conexión. Algunos cambios no pueden guardarse.

## 36.6 Error crítico

- Referencia técnica.
- Sin detalles sensibles.
- Contacto soporte.

---

# 37. Mensajes de confirmación

## 37.1 Pago

> Pago registrado correctamente.

## 37.2 Grupo

> Grupo actualizado correctamente.

## 37.3 Solicitud

> Solicitud actualizada.

## 37.4 Aprobación

> Alumno aprobado correctamente.

## 37.5 Observación

> Observación añadida.

## 37.6 Consentimiento

> Decisión registrada.

## 37.7 Fotografía

> Fotografía archivada.

## 37.8 Baja

> Baja registrada.

## 37.9 Regla

Los mensajes:

- Específicos.
- Breves.
- No desaparecen antes de leerse.
- No interrumpen.

---

# 38. Responsive

## 38.1 Mobile first

Toda tarea esencial disponible en móvil.

## 38.2 Móvil

- Cabecera.
- Menú.
- Búsqueda.
- Tarjetas.
- Acciones inferiores.

## 38.3 Tablas

No comprimir.

Transformar en:

- Tarjetas.
- Lista.
- Columnas prioritarias.

## 38.4 Ficha

- Cabecera apilada.
- Pestañas desplazables.
- Acciones esenciales visibles.

## 38.5 Formularios

- Una columna.
- Botón amplio.
- Teclado adecuado.

## 38.6 Fotos

- Cámara.
- Vista previa.
- Consentimiento antes.

## 38.7 Aprobación móvil

Permitida.

Requiere:

- Resumen.
- Confirmación.
- Reautenticación si aplica.

## 38.8 Escritorio

- Sidebar.
- Contenido 1200 a 1440 px.
- Tablas.
- Paneles paralelos solo si ayudan.

## 38.9 No horizontal

No scroll de página horizontal.

Contenedores controlados cuando sea inevitable.

---

# 39. Accesibilidad

## 39.1 Nivel

WCAG 2.2 AA.

## 39.2 Teclado

- Todo operable.
- Foco lógico.
- Atajos no obligatorios.

## 39.3 Foco

- Visible.
- No tapado.
- 2 px mínimo.

## 39.4 Objetivos

- 44 por 44 px recomendados.
- Separación.

## 39.5 Tablas

- Caption.
- Encabezados.
- Orden anunciado.
- Alternativa móvil.

## 39.6 Estados

- Texto e icono.
- No solo color.

## 39.7 Gráficos

- Texto.
- Tabla.

## 39.8 Formularios

- Etiquetas.
- Errores.
- Resumen.

## 39.9 Diálogos

- Foco atrapado.
- Escape.
- Retorno de foco.

## 39.10 Tiempo

- Aviso de sesión.
- Ampliar.

## 39.11 Zoom

Funcionar a 200 y 400 %.

---

# 40. Seguridad

## 40.1 Estándar

OWASP ASVS 5.0 como referencia.

## 40.2 Autenticación

- MFA.
- Rate limit.
- Recuperación.
- Alertas.

## 40.3 Sesión

- HttpOnly.
- Secure.
- SameSite.
- Rotación.
- Inactividad.
- Máximo absoluto.

Referencia inicial:

- Inactividad: 30 minutos.
- Aviso antes.
- Reautenticación sensible.

## 40.4 Autorización

- Servidor.
- Por recurso.
- Por acción.
- Denegar por defecto.

## 40.5 Acciones sensibles

Reautenticar:

- Aprobar.
- Exportar.
- Cambiar usuario.
- Cambiar consentimiento.
- Borrar.

## 40.6 Protección

- CSRF.
- XSS.
- Inyección.
- IDOR.
- Clickjacking.
- Fuerza bruta.

## 40.7 Logs

Registrar:

- Login.
- Fallo.
- Permiso denegado.
- Acción sensible.
- Sesión.

No registrar:

- Contraseña.
- Token.
- Sesión.
- PII completa.

## 40.8 Dispositivo

Leo podrá ver:

- Sesiones.
- Fecha.
- Dispositivo.
- Cerrar sesión.

## 40.9 Exportaciones

- Permiso.
- Confirmación.
- Caducidad.
- Auditoría.
- Cifrado.

## 40.10 Copias

- Automáticas.
- Cifradas.
- Probadas.
- Restauración.

---

# 41. Protección de datos

## 41.1 Minimización

Cada rol ve lo necesario.

## 41.2 Menores

- Acceso reforzado.
- Fotos restringidas.
- No datos en notificaciones.

## 41.3 Pantallas compartidas

- Ocultar al inactividad.
- No previsualizar PII.
- Cerrar sesión.

## 41.4 Derechos

Herramientas para:

- Localizar.
- Exportar.
- Rectificar.
- Suprimir.
- Restringir.

## 41.5 Retención

Políticas por:

- Solicitudes.
- Alumnos.
- Pagos.
- Consentimientos.
- Fotos.
- Notas.
- Logs.

## 41.6 Analítica

- Básica y agregada.
- Sin PII.
- Limitada a rendimiento, errores y uso operativo imprescindible.
- Sin segmentaciones avanzadas, perfiles, grabaciones ni análisis predictivo.
- Sin contenido.

---

# 42. Arquitectura

## 42.1 Módulos

- Autenticación.
- Inicio.
- Solicitudes.
- Alumnos.
- Responsables.
- Grupos.
- Horarios.
- Pagos.
- Recibos.
- Asistencia.
- Documentos.
- Consentimientos.
- Fotografías.
- Notificaciones.
- Búsqueda.
- Auditoría.
- Configuración.

## 42.2 Capas

1. Interfaz.
2. Aplicación.
3. Dominio.
4. Datos.
5. Integraciones.

## 42.3 Fuente de verdad

Servidor y base de datos.

No confiar en interfaz.

## 42.4 Base relacional

Para:

- Integridad.
- Relaciones.
- Transacciones.
- Historial.

## 42.5 Servicios

- Solicitudes.
- Alumnos.
- Grupos.
- Pagos.
- Legal.
- Fotos.
- Notificaciones.
- Búsqueda.
- Auditoría.

## 42.6 Eventos

Ejemplos:

- SolicitudCreada.
- AlumnoAprobado.
- PagoRegistrado.
- ConsentimientoRetirado.
- GrupoCambiado.

## 42.7 Cola

Para:

- Correos.
- Notificaciones.
- Procesado de fotos.
- Exportaciones.

## 42.8 Transacciones

Obligatorias:

- Aprobar.
- Pago.
- Cambio de grupo.
- Consentimiento.

## 42.9 Concurrencia

- Versionado.
- Conflictos.
- No sobrescribir.

---

# 43. Modelo conceptual

## 43.1 Usuarios

- Cuenta.
- Rol.
- MFA.
- Estado.

## 43.2 Solicitudes

Según documento 02.

## 43.3 Alumnos

- Identidad.
- Estado.
- Alta.
- Grupo.
- Cinturón.

## 43.4 Responsables

- Contacto.
- Relación.
- Vínculos.

## 43.5 Grupos

- Nombre.
- Edad.
- Capacidad.
- Cuota.

## 43.6 Horarios

- Grupo.
- Día.
- Hora.
- Instructor.

## 43.7 Pagos

- Concepto.
- Importe.
- Estado.

## 43.8 Documentos

- Tipo.
- Versión.
- Vigencia.

## 43.9 Consentimientos

- Finalidad.
- Canal.
- Decisión.
- Evidencia.

## 43.10 Fotografías

- Archivo.
- Alumnos.
- Estado.
- Canales.

## 43.11 Observaciones

- Alumno.
- Tipo.
- Texto.
- Autor.

## 43.12 Auditoría

- Actor.
- Acción.
- Recurso.
- Fecha.

---

# 44. Búsqueda técnica

## 44.1 Inicial

Base de datos.

No motor externo.

## 44.2 Índice

- Nombre.
- Apellidos.
- Contacto normalizado.
- Referencia.
- Grupo.

## 44.3 Permisos

Resultados filtrados antes de devolver.

## 44.4 Rendimiento

Menos de 200 ms objetivo.

## 44.5 Escalabilidad

Motor dedicado solo si volumen lo exige.

Con contrato y privacidad.

---

# 45. Rendimiento

## 45.1 Objetivos

- Inicio útil menor de 2 segundos.
- Respuesta visual menor de 100 ms.
- Búsqueda menor de 200 ms.
- Guardado menor de 1 segundo cuando sea posible.

## 45.2 Carga

Primero:

- Navegación.
- Tareas.
- Estadísticas principales.

Después:

- Gráficos.
- Actividad.

## 45.3 Listados

- Paginación.
- Índices.
- Consultas.
- No cargar todo.

## 45.4 Fotos

- Miniaturas.
- Lazy load.
- Original solo al abrir.

## 45.5 Caché

Permitida:

- Estadísticas.
- Catálogos.

No usar datos viejos para:

- Consentimiento.
- Pago.
- Aprobación.

## 45.6 Indicador de antigüedad

Datos agregados mostrarán actualización.

---

# 46. Configuración

## 46.1 Club

- Nombre.
- Contacto.
- Dirección.
- Logo.

## 46.2 Grupos

- Rangos.
- Capacidad.
- Cuotas.

## 46.3 Notificaciones

- Canales.
- Resumen.

## 46.4 Usuarios

La gestión avanzada de usuarios y roles queda fuera del MVP.

La V1 no incluirá:

- Invitaciones desde el panel.
- Constructor de roles.
- Permisos personalizados.
- Equipos o departamentos.

Las cuentas autorizadas se gestionarán mediante un procedimiento administrativo sencillo y seguro definido durante el despliegue.

## 46.5 Seguridad

- MFA.
- Sesiones.
- Accesos.

## 46.6 Documentos

- Versiones.
- Publicación.

## 46.7 Regla

Cambios sensibles:

- Confirmación.
- Motivo.
- Auditoría.

---

# 47. Estados críticos y confirmaciones

## 47.1 Aprobar

> Esta acción creará un alumno activo.

## 47.2 Rechazar

> La solicitud se cerrará sin crear un alumno.

## 47.3 Baja

> El alumno dejará de figurar como activo.

## 47.4 Consentimiento

> Este cambio puede afectar al uso de fotografías.

## 47.5 Fotografía

> La fotografía dejará de estar disponible para publicación.

## 47.6 Pago

> Revisa importe, método y fecha.

## 47.7 Grupo

> El cambio actualizará horario y cuota futura.

## 47.8 Salir

> Tienes cambios sin guardar.

---

# 48. Casos límite

## 48.1 Alumno duplicado

- Advertir.
- Comparar.
- Vincular.
- No fusionar automático.

## 48.2 Hermanos

- Mismo responsable.
- Fichas separadas.
- Consentimientos por alumno.

## 48.3 Dos administradores

- Conflicto.
- Versión.
- Revisión.

## 48.4 Consentimiento retirado con fotos

- Bloquear.
- Tareas.
- Historial.

## 48.5 Grupo completo

- No cambiar.
- Lista espera si se define.

## 48.6 Pago duplicado

- Detectar.
- Advertir.
- Confirmar.

## 48.7 Sesión caduca editando

- Avisar.
- Guardar borrador no sensible.
- Reautenticar.

## 48.8 Alumno inactivo

- Historial.
- No aparecer por defecto.
- Buscar.

## 48.9 Cumpleaños 29 de febrero

- Regla definida.
- No calcular incorrecto.

---

# 49. Pruebas funcionales

## Inicio

- Estadísticas.
- Tareas.
- Acciones.

## Solicitudes

- Filtros.
- Contacto.
- Pago.
- Aprobación.

## Alumnos

- Buscar.
- Filtrar.
- Editar.
- Grupo.

## Consentimientos

- Ver.
- Retirar.
- Evidencia.

## Fotos

- Subir.
- Bloquear.
- Publicar.
- Retirar.

## Pagos

- Registrar.
- Recibo.
- Corregir.

## Historial

- Eventos.
- Filtros.

---

# 50. Pruebas de seguridad

- MFA.
- Sesión.
- Roles.
- Acceso directo.
- IDOR.
- CSRF.
- XSS.
- Inyección.
- Rate limit.
- Exportación.
- Fotos.
- Logs.
- Copias.
- Restauración.

---

# 51. Pruebas de accesibilidad

- Teclado.
- Lector.
- Foco.
- Zoom.
- Contraste.
- Tablas.
- Gráficos.
- Diálogos.
- Errores.
- Estados.
- Móvil.

---

# 52. Criterios de aceptación

## Leo

- Comprende Inicio.
- Encuentra pendientes.
- Busca alumno.
- Registra pago.
- Cambia grupo.
- Consulta consentimiento.
- Aprueba.

## Tres clics

- Acciones importantes cumplen.
- Confirmaciones incluidas.

## Datos

- No hay duplicados.
- Historial completo.
- Versiones legales.

## Seguridad

- MFA.
- Permisos servidor.
- Sesiones.
- Auditoría.

## Responsive

- Funciona móvil.
- Funciona escritorio.
- Sin horizontal.

## Accesibilidad

- WCAG 2.2 AA.

## Rendimiento

- Inicio menor 2 segundos.
- Búsqueda menor 200 ms.

---

# 53. Reglas no negociables

1. El panel será sencillo.
2. Inicio muestra prioridades.
3. Tres clics máximo.
4. Búsqueda global.
5. Solicitudes separadas de alumnos.
6. Aprobación manual.
7. Pago no aprueba.
8. Consentimientos no se editan con interruptor.
9. Imagen opcional.
10. Sin foto sin consentimiento.
11. Retirada genera tarea.
12. Historial inmutable.
13. Observaciones objetivas.
14. MFA obligatorio.
15. Permisos servidor.
16. Menor privilegio.
17. Sin PII en logs.
18. Sin PII en analítica.
19. No exportar sin permiso.
20. No eliminar alumnos directamente.
21. Confirmar acciones sensibles.
22. Preservar filtros.
23. Estados vacíos útiles.
24. Cargas estables.
25. Errores recuperables.
26. WCAG 2.2 AA.
27. Responsive completo.
28. Rendimiento medido.
29. No estética de landing.
30. Cada pantalla responde a una tarea.
31. La V1 no ofrece acceso privado a alumnos o familias.
32. Crear una solicitud manual no crea un alumno.
33. Solo la aprobación manual de Leo crea un alumno.
34. Los roles complejos quedan fuera del MVP.
35. La analítica avanzada y las automatizaciones avanzadas quedan fuera del MVP.

---

# 54. Principio final

El panel debe sentirse como una herramienta construida específicamente para Leo.

No debe obligarle a:

- Recordar procesos.
- Buscar en varias pantallas.
- Repetir datos.
- Interpretar estados técnicos.
- Dudar si una acción se guardó.

Cada jornada debe comenzar con una respuesta clara:

> Esto es lo que necesita tu atención hoy.

La pregunta para validar cada decisión será:

> ¿Esto permite a Leo gestionar SAM GUK de forma más rápida, clara y segura?

Si la respuesta es no, el elemento no debe formar parte del panel.
