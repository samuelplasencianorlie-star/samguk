# SAM GUK CLUB TAEKWONDO
## Plan profesional de construcción del MVP

**Documento:** `06_BUILD_PLAN.md`  
**Versión:** 1.0  
**Estado:** Plan de ejecución previo al desarrollo  
**Responsable del producto:** LUMEN Studio  
**Usuario principal:** Leo  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito

Este documento define el orden obligatorio de construcción del MVP de SAM GUK.

Su función es convertir las especificaciones funcionales existentes en una secuencia de trabajo controlada, verificable y apta para desarrollo profesional.

El plan debe permitir:

- Construir una fase cada vez.
- Evitar dependencias ocultas.
- Validar el producto con Leo de forma progresiva.
- Impedir que funcionalidades futuras entren accidentalmente en el MVP.
- Mantener coherencia entre web pública, solicitudes, alumnos, grupos y pagos.
- Llegar a producción con seguridad, trazabilidad y criterios de aceptación claros.

Este documento no contiene código ni autoriza todavía el inicio del desarrollo.

---

# 2. Documentación de referencia

La construcción deberá respetar:

1. `00_PRODUCT_BOOK.md`.
2. `01_PUBLIC_WEBSITE.md`.
3. `02_REGISTRATION_FLOW.md`.
4. `03_ADMIN_PANEL.md`.
5. `04_STUDENTS_GROUPS.md`.
6. `05_PAYMENTS_RECEIPTS.md`.
7. El presente plan.

Si aparece una contradicción:

1. Se detendrá la parte afectada.
2. Se consultará la regla de alcance obligatorio del Product Book.
3. Se documentará la decisión.
4. Solo después se continuará.

El código nunca decidirá silenciosamente una regla de negocio que la documentación no haya resuelto.

---

# 3. Decisiones obligatorias de la V1

## 3.1 Inscripción

- La inscripción pública crea una solicitud pendiente.
- No crea un alumno.
- No reserva automáticamente una plaza.
- No aprueba automáticamente.
- No genera una pertenencia activa a un grupo.
- Leo debe revisar y aprobar manualmente.
- Solo la aprobación manual crea el alumno.

## 3.2 Acceso privado

- El acceso privado pertenece a Leo y personal autorizado.
- No existe portal de alumnos.
- No existe portal de familias.
- No existen credenciales para responsables.
- No se mostrará ninguna promesa de autoservicio privado en la web pública.

## 3.3 Pagos

Los únicos métodos de la V1 serán:

- Efectivo.
- Transferencia verificada manualmente, si Leo decide habilitarla.

No habrá:

- Pasarela online.
- Pago con tarjeta online.
- Bizum automático.
- Domiciliación.
- Suscripciones automáticas.
- Conciliación bancaria.

## 3.4 Fuera del MVP

- Multi-sede.
- Multi-gimnasio.
- Drag and drop.
- Analítica avanzada.
- Pasarela de pago.
- Roles complejos.
- Automatizaciones avanzadas.

Estas exclusiones son vinculantes para todas las fases.

---

# 4. Principios de ejecución

## 4.1 Una fase terminada antes de abrir la siguiente

Una fase solo se considerará terminada cuando:

- Sus entregables estén completos.
- Sus criterios de aceptación se hayan comprobado.
- No existan errores bloqueantes conocidos.
- La documentación afectada siga siendo coherente.
- Leo o la persona responsable haya validado el resultado cuando corresponda.

Podrán prepararse tareas técnicas de una fase posterior, pero no se dará por completada ni se mezclará su alcance con la fase actual.

## 4.2 Calidad continua

Testing, accesibilidad, seguridad y rendimiento no se aplazarán por completo hasta la Fase 11.

Cada fase deberá incluir:

- Validación funcional básica.
- Revisión responsive.
- Navegación por teclado.
- Gestión de carga, vacío y error.
- Comprobación de permisos cuando exista área privada.
- Revisión de datos sensibles.

La Fase 11 realizará la validación integral final.

## 4.3 Sin datos ficticios en producción

Los datos de demostración podrán utilizarse únicamente en entornos locales o de prueba.

Antes del despliegue:

- Se eliminarán alumnos ficticios.
- Se eliminarán pagos ficticios.
- Se eliminarán solicitudes ficticias.
- Se revisarán teléfonos, direcciones, horarios y precios.
- Se utilizarán documentos legales aprobados.
- Se utilizarán fotografías autorizadas.

## 4.4 Cambios de alcance

Cualquier nueva funcionalidad deberá indicar:

- Problema que resuelve.
- Usuario afectado.
- Fase propuesta.
- Impacto técnico.
- Impacto legal.
- Impacto en calendario.
- Motivo por el que no puede esperar.

No se aceptará una ampliación solo porque resulte fácil añadirla durante el desarrollo.

---

# 5. Preparación previa

Antes de iniciar la Fase 1 deberán estar disponibles o claramente identificados:

- Logotipo oficial.
- Nombre oficial del club.
- Dirección.
- Teléfono.
- WhatsApp.
- Correo.
- Fotografías reales autorizadas.
- Horarios reales o responsable de validarlos.
- Tarifas reales o decisión expresa de no publicarlas todavía.
- Nombre de los cuatro grupos.
- Categoría pública de cada grupo.
- Responsable del tratamiento.
- Persona que revisará los textos legales.

La ausencia de contenido no deberá resolverse inventando información.

---

# 6. Secuencia de construcción

El orden obligatorio será:

1. FASE 1 — Web pública.
2. FASE 2 — Formulario de inscripción.
3. FASE 3 — Base de datos y modelos.
4. FASE 4 — Login privado.
5. FASE 5 — Dashboard de Leo.
6. FASE 6 — Solicitudes pendientes.
7. FASE 7 — Alumnos activos.
8. FASE 8 — Grupos.
9. FASE 9 — Pagos y recibos.
10. FASE 10 — Pulido visual.
11. FASE 11 — Testing.
12. FASE 12 — Deploy.

No se alterará esta secuencia sin actualizar primero el presente documento.

---

# FASE 1 — Web pública

## Objetivo

Construir la presencia pública profesional de SAM GUK y hacer que “Inscribirse” sea localizable en menos de tres segundos.

## Dependencias

- Identidad visual aprobada.
- Contenido público validado.
- Fotografías autorizadas.
- Ruta futura `/inscripcion` definida.

## Alcance

- Cabecera responsive.
- CTA “Inscribirse”.
- Hero.
- Presentación del club.
- Clases.
- Método.
- Comunidad o testimonios únicamente si existen contenidos reales.
- Horarios.
- Tarifas.
- Proceso de inscripción.
- Ubicación.
- Preguntas frecuentes.
- Contacto.
- CTA final.
- Footer.
- Enlace discreto a `/admin`.
- Páginas legales públicas necesarias.
- SEO local básico.
- Analítica básica y agregada, si se aprueba.

## Reglas

- El CTA principal llevará a `/inscripcion`.
- El enlace `/admin` se identificará como acceso de gestión, no como área de alumnos.
- No habrá datos inventados.
- No habrá stock fotográfico.
- No habrá analítica avanzada.
- No habrá formularios que creen alumnos.

## Entregables

- Página pública completa.
- Navegación por anclas.
- Estados responsive.
- Metadatos.
- Enlaces de contacto.
- Footer legal y administrativo.

## Criterios de salida

- “Inscribirse” se encuentra en menos de tres segundos.
- La página funciona desde 320 px.
- No existe scroll horizontal.
- La navegación por teclado es completa.
- Los horarios y tarifas muestran datos validados.
- El acceso privado no promete acceso a familias.
- No quedan textos o imágenes de demostración destinados a producción.

---

# FASE 2 — Formulario de inscripción

## Objetivo

Construir la experiencia completa de solicitud sin conectar todavía la creación definitiva de alumnos.

## Dependencias

- Fase 1 terminada.
- Campos del formulario aprobados.
- Documentos legales redactados o versiones provisionales claramente identificadas para entorno de prueba.
- Reglas de menores confirmadas.

## Alcance

- Pantalla de datos.
- Diferenciación entre adulto y menor.
- Datos del responsable.
- Categoría pública o grupo de interés.
- Centro de documentos.
- Lectura obligatoria mediante scroll.
- Consentimientos separados.
- Consentimiento de imagen opcional.
- Pantalla de revisión.
- Mensajes de error.
- Pantalla de solicitud recibida.
- Recuperación segura de errores.
- Comportamiento móvil y escritorio.

## Límite técnico de esta fase

La Fase 2 construye y valida la experiencia y su contrato de datos.

Hasta completar la Fase 3:

- No se considerará un envío real de producción.
- No se almacenarán solicitudes definitivas.
- No se enviarán notificaciones reales.
- No se crearán alumnos.

## Entregables

- Flujo navegable de tres pasos.
- Validaciones de interfaz.
- Esquema funcional de datos.
- Estados de documentos.
- Pantalla final inequívoca.
- Inventario de mensajes.

## Criterios de salida

- El usuario comprende que envía una solicitud.
- No aparece ningún mensaje de plaza confirmada.
- No puede aceptar antes de llegar al final de cada documento.
- Puede no autorizar imagen sin quedar bloqueado.
- Los datos se conservan tras errores de validación.
- El flujo funciona con teclado y lector de pantalla.
- La pantalla final no afirma que exista un alumno.

---

# FASE 3 — Base de datos y modelos

## Objetivo

Crear la fuente de verdad relacional y las reglas que garanticen la integridad del sistema.

## Dependencias

- Contrato de datos de la Fase 2.
- Cuatro grupos identificados.
- Estados de solicitud aprobados.
- Decisión sobre proveedor de base de datos.
- Política inicial de conservación.

## Modelos mínimos

- Usuarios administrativos.
- Solicitudes.
- Alumno potencial.
- Solicitante o responsable.
- Documentos legales.
- Versiones documentales.
- Evidencias y decisiones.
- Contactos administrativos.
- Confirmaciones presenciales.
- Alumnos.
- Responsables vinculados.
- Grupos.
- Pertenencias a grupos.
- Horarios.
- Perfiles económicos.
- Mensualidades.
- Pagos.
- Aplicaciones de pagos.
- Recibos.
- Historial y auditoría.
- Notificaciones transaccionales.

## Reglas de integridad

- Una solicitud no es un alumno.
- Una solicitud enviada empieza pendiente.
- Un alumno requiere una solicitud aprobada o una solicitud manual equivalente.
- Solo puede existir una aprobación efectiva por solicitud.
- La aprobación crea alumno y pertenencia de forma atómica.
- Un pago inicial puede pertenecer a una solicitud.
- El pago inicial se vincula al alumno durante la aprobación.
- No se duplica el pago al crear el perfil económico.
- Los documentos aceptados apuntan a una versión inmutable.
- Los importes se almacenan en céntimos.
- Los registros históricos no se sobrescriben.

## Fuera de alcance

- Multi-sede.
- Multi-gimnasio.
- Tablas de pasarela online.
- Webhooks de pagos.
- Matriz compleja de roles.
- Datos para analítica avanzada.

## Entregables

- Modelo de datos aprobado.
- Migraciones versionadas.
- Restricciones.
- Índices.
- Datos mínimos de configuración.
- Política de borrado y retención implementable.
- Estrategia de copias y restauración.

## Criterios de salida

- No puede crearse un alumno mediante el formulario público.
- No puede aprobarse dos veces una solicitud.
- No puede existir una pertenencia activa sin alumno.
- No puede duplicarse una mensualidad por periodo.
- No puede duplicarse un número de recibo.
- Los datos sensibles no aparecen en logs.
- Las pruebas de transacción y concurrencia son satisfactorias.

---

# FASE 4 — Login privado

## Objetivo

Proteger el acceso de Leo y del personal expresamente autorizado.

## Dependencias

- Fase 3 terminada.
- Proveedor de autenticación aprobado.
- Cuenta administrativa inicial definida.
- Método MFA definido.

## Alcance

- Ruta `/admin`.
- Inicio de sesión.
- Cierre de sesión.
- Recuperación segura.
- MFA administrativo.
- Gestión de sesión.
- Protección de rutas.
- Reautenticación para acciones sensibles.
- Registro de accesos relevantes.

## Reglas

- No existen cuentas para alumnos.
- No existen cuentas para familias.
- No existe registro público de cuentas.
- No se mostrarán credenciales de demostración.
- Los permisos se comprobarán en servidor.
- La V1 no incluirá constructor de roles ni invitaciones complejas.

## Entregables

- Login administrativo.
- Sesión segura.
- Recuperación.
- MFA.
- Cierre de sesión.
- Pantallas de error y sesión caducada.

## Criterios de salida

- Una persona no autenticada no accede al panel.
- Un enlace directo no evita la autorización.
- Los errores no revelan si una cuenta existe.
- La sesión caduca de forma controlada.
- Leo puede recuperar el acceso mediante un procedimiento seguro.
- No existe ninguna ruta privada para alumnos o familias.

---

# FASE 5 — Dashboard de Leo

## Objetivo

Dar a Leo una visión inmediata de lo que necesita atención.

## Dependencias

- Login privado operativo.
- Modelos básicos disponibles.
- Definiciones de indicadores aprobadas.

## Alcance

- Saludo y fecha.
- Acciones rápidas.
- Solicitudes nuevas.
- Contactos pendientes.
- Pagos que requieren atención.
- Alumnos activos.
- Cuotas vencidas.
- Recibos emitidos.
- Clases del día.
- Cumpleaños próximos.
- Actividad reciente.

## Reglas

- Primero se mostrarán tareas, después estadísticas.
- Cada cifra tendrá definición y periodo.
- Los indicadores abrirán el listado correspondiente.
- No habrá gráficos decorativos.
- No habrá analítica avanzada.
- Las acciones rápidas no crearán alumnos directamente.

## Entregables

- Inicio del panel.
- Navegación principal.
- Resumen operativo.
- Estados de carga.
- Estados vacíos.
- Errores recuperables.

## Criterios de salida

- Leo identifica en segundos qué debe revisar.
- Una solicitud nueva se abre en un clic.
- Las cifras coinciden con sus listados.
- El dashboard funciona en móvil y escritorio.
- No se muestran datos sensibles innecesarios.
- No se incluyen métricas sin definición.

---

# FASE 6 — Solicitudes pendientes

## Objetivo

Permitir a Leo gestionar una solicitud desde su recepción hasta la aprobación manual.

## Dependencias

- Dashboard operativo.
- Estados de solicitud implementados.
- Documentos y evidencias disponibles.
- Modelo de pago inicial disponible.
- Notificaciones transaccionales configuradas.

## Alcance

- Lista de solicitudes.
- Contadores.
- Búsqueda.
- Filtros por estado.
- Detalle de solicitud.
- Datos del alumno potencial.
- Responsable.
- Documentos.
- Consentimientos.
- Historial.
- Registro de contacto.
- Registro de confirmación presencial.
- Registro mínimo del pago inicial.
- Efectivo.
- Transferencia verificada, si está habilitada.
- Aprobación manual.
- Rechazo.
- Cancelación.
- Duplicidad.
- Creación de solicitud manual.

## Regla de pago en esta fase

La Fase 6 solo incorporará la capacidad mínima necesaria para registrar el pago inicial de una solicitud.

La gestión económica completa, mensualidades, dashboard económico y recibos se construirá en la Fase 9.

## Regla de aprobación

Antes de habilitar “Aprobar alumno” deberán existir:

- Datos revisados.
- Contacto exitoso.
- Confirmación presencial.
- Pago registrado y verificado.
- Documentos obligatorios válidos.
- Decisión de imagen registrada.
- Grupo definitivo.
- Ausencia de duplicidad pendiente.

La aprobación deberá:

1. Revalidar todos los requisitos.
2. Crear el alumno.
3. Vincular el responsable.
4. Crear la pertenencia inicial.
5. Vincular documentos y consentimientos.
6. Vincular el pago inicial.
7. Crear el perfil económico mínimo.
8. Cerrar la solicitud como aprobada.
9. Registrar auditoría.

## Entregables

- Bandeja de solicitudes.
- Flujo de revisión.
- Registro de contactos.
- Confirmación presencial.
- Pago inicial.
- Aprobación manual transaccional.
- Solicitud manual sin alta directa.

## Criterios de salida

- Enviar el formulario crea una solicitud pendiente.
- La solicitud aparece en el panel.
- Leo recibe la notificación prevista.
- No puede aprobar si falta un requisito.
- Registrar un pago no aprueba automáticamente.
- Crear una solicitud manual no crea un alumno.
- Solo “Aprobar alumno” crea la ficha definitiva.
- Una aprobación repetida no crea duplicados.

---

# FASE 7 — Alumnos activos

## Objetivo

Construir el directorio y la ficha operativa de alumnos aprobados.

## Dependencias

- Aprobación manual funcionando.
- Alumnos y responsables persistidos.
- Documentos y consentimientos vinculados.

## Alcance

- Directorio de alumnos.
- Búsqueda instantánea.
- Filtros esenciales.
- Estados administrativos.
- Ficha completa.
- Datos personales.
- Responsable.
- Documentación.
- Consentimientos.
- Observaciones privadas.
- Historial.
- Cumpleaños.
- Baja temporal.
- Baja definitiva.
- Reactivación.

## Reglas

- Las solicitudes pendientes no aparecen como alumnos.
- No habrá botón de alta directa.
- “Crear solicitud manual” será la única entrada excepcional.
- La documentación inicial incompleta mantiene el registro como solicitud.
- Una renovación documental posterior se muestra como indicador, no como nueva alta.
- No se eliminarán alumnos para representar una baja.

## Entregables

- Listado.
- Búsqueda.
- Ficha.
- Edición controlada.
- Historial.
- Bajas y reactivación.
- Estados vacíos, carga y error.

## Criterios de salida

- Leo encuentra un alumno en menos de cinco segundos.
- La ficha distingue datos, documentos, consentimientos e historial.
- Los cambios sensibles requieren motivo.
- Una baja conserva pagos y evidencias.
- No existe ningún mecanismo de acceso del alumno a esta ficha.
- La búsqueda no expone datos fuera de permisos.

---

# FASE 8 — Grupos

## Objetivo

Permitir que Leo visualice los cuatro grupos y gestione pertenencias mediante un flujo manual sencillo.

## Dependencias

- Alumnos activos disponibles.
- Cuatro grupos configurados.
- Horarios y capacidades confirmados.

## Alcance

- Vista inmediata de cuatro grupos.
- Tarjetas de grupo.
- Ocupación.
- Capacidad.
- Horarios.
- Lista de alumnos por grupo.
- Búsqueda local.
- Filtros esenciales.
- Cambio manual de grupo.
- Fecha efectiva.
- Historial de pertenencias.
- Avisos de incompatibilidad o capacidad.

## Fuera de alcance

- Drag and drop.
- Multi-sede.
- Multi-gimnasio.
- Creación libre de estructuras organizativas.
- Automatización de movimientos.

## Entregables

- Vista general.
- Detalle de grupo.
- Tarjetas de alumno.
- Cambio manual.
- Validaciones.
- Historial.

## Criterios de salida

- Los cuatro grupos se reconocen inmediatamente.
- Leo abre un grupo en un clic.
- Un cambio normal se completa en un máximo de tres clics deliberados.
- La capacidad se revalida al confirmar.
- No se mueve automáticamente a ningún alumno.
- No se modifican pagos, recibos o asistencias anteriores.
- Existe una alternativa completa por teclado.

---

# FASE 9 — Pagos y recibos

## Objetivo

Completar el control económico operativo sin convertir el sistema en contabilidad ni facturación fiscal no validada.

## Dependencias

- Alumnos activos.
- Perfiles económicos mínimos.
- Planes y cuotas reales.
- Métodos V1 confirmados.
- Revisión fiscal sobre recibos y facturas.

## Alcance

- Configuración económica.
- Planes de cuota.
- Mensualidades.
- Vencimientos.
- Pagos pendientes.
- Pagos vencidos.
- Registro de efectivo.
- Registro de transferencia verificada, si se habilita.
- Aplicación del pago.
- Historial.
- Observaciones económicas.
- Recordatorios manuales.
- Dashboard económico básico.
- Recibo o justificante interno.
- Impresión.
- Anulación y corrección.

## Fuera de alcance

- Pasarela online.
- Tarjeta online.
- Bizum automático.
- Domiciliación.
- Suscripciones.
- Conciliación bancaria.
- Automatización de cobros.
- Facturación fiscal sin validación.
- Analítica económica avanzada.

## Reglas

- Mensualidad, pago y recibo son entidades distintas.
- Un pago confirmado no se edita silenciosamente.
- Las correcciones se realizan mediante anulación y nuevo registro.
- Los importes se almacenan en céntimos.
- Los anulados no cuentan como ingresos.
- Ingreso no significa beneficio.
- Un recibo interno no se llamará factura.

## Entregables

- Perfil económico.
- Mensualidades.
- Registro de pagos.
- Pendientes y vencidos.
- Dashboard básico.
- Recibos.
- Impresión.
- Correcciones auditadas.

## Criterios de salida

- Leo registra un pago habitual en un máximo de tres clics deliberados desde el contexto correcto.
- Solo aparecen efectivo y transferencia habilitada.
- Una transferencia exige verificación.
- No se almacenan datos de tarjeta ni credenciales bancarias.
- El recibo utiliza numeración única.
- Una reimpresión conserva el número.
- Una anulación conserva el original y el historial.
- Las cifras del dashboard coinciden con los pagos confirmados.

---

# FASE 10 — Pulido visual

## Objetivo

Unificar la experiencia y elevar la calidad percibida sin ampliar el alcance funcional.

## Dependencias

- Todos los flujos del MVP construidos.
- Contenido definitivo disponible.
- Datos de prueba representativos.

## Alcance

- Consistencia de tipografía.
- Espaciado.
- Colores.
- Estados.
- Iconografía.
- Tablas.
- Tarjetas.
- Formularios.
- Diálogos.
- Mensajes.
- Fotografías.
- Animaciones permitidas.
- Movimiento reducido.
- Responsive completo.
- Impresión de recibos.
- Revisión de textos.

## Regla

Esta fase no añade funcionalidades.

Todo hallazgo funcional se devolverá a la fase propietaria y se documentará.

## Entregables

- Sistema visual consistente.
- Experiencia móvil refinada.
- Experiencia de escritorio refinada.
- Estados de foco.
- Estados de carga, vacío, error y éxito.
- Plantilla de impresión.

## Criterios de salida

- La web pública se siente premium y propia.
- El panel se siente operativo, limpio y sencillo.
- No existen solapamientos ni saltos de layout.
- Los controles mantienen nombres y comportamientos consistentes.
- La información importante no depende solo del color.
- Las animaciones respetan movimiento reducido.

---

# FASE 11 — Testing

## Objetivo

Demostrar que el MVP completo funciona de forma correcta, segura, accesible y estable antes de producción.

## Dependencias

- Fases 1 a 10 terminadas.
- Entorno de pruebas estable.
- Casos representativos preparados.
- Textos legales revisados.

## Pruebas funcionales

- Navegación pública.
- CTA de inscripción.
- Adulto.
- Menor.
- Documentos y scroll.
- Consentimiento de imagen negativo y parcial.
- Envío único.
- Notificaciones.
- Login.
- Solicitudes.
- Contacto.
- Confirmación.
- Pago inicial.
- Aprobación.
- Creación única del alumno.
- Búsqueda.
- Baja y reactivación.
- Grupos.
- Cambio de grupo.
- Mensualidades.
- Efectivo.
- Transferencia.
- Recibos.
- Anulaciones.

## Pruebas de seguridad

- Autenticación.
- MFA.
- Autorización del servidor.
- Acceso directo a recursos.
- Sesiones.
- CSRF.
- XSS.
- Inyección.
- Rate limiting.
- Enumeración.
- Registros sin datos sensibles.
- Exportaciones.
- Copias.
- Restauración.

## Pruebas de accesibilidad

- WCAG 2.2 AA.
- Teclado.
- Lector de pantalla.
- Foco.
- Contraste.
- Zoom 200 % y 400 %.
- Movimiento reducido.
- Errores de formulario.
- Tablas.
- Diálogos.
- Scroll legal.

## Pruebas de rendimiento

- Web pública.
- Hero e imágenes.
- Dashboard.
- Búsqueda.
- Listados.
- Guardados.
- Consultas económicas.
- Generación de recibos.

Los objetivos se medirán con dispositivo, red, volumen de datos y percentil definidos.

## Validación con Leo

Leo deberá completar sin ayuda:

1. Revisar una solicitud.
2. Registrar un contacto.
3. Registrar un pago.
4. Aprobar un alumno.
5. Encontrar una ficha.
6. Cambiar un grupo.
7. Consultar una cuota.
8. Imprimir un recibo.

## Criterios de salida

- Cero errores críticos.
- Cero vulnerabilidades críticas o altas sin resolver.
- Todos los flujos obligatorios aprobados.
- Accesibilidad AA verificada.
- Copia y restauración probadas.
- Leo completa las tareas principales.
- La documentación coincide con el producto construido.

---

# FASE 12 — Deploy

## Objetivo

Publicar el MVP de forma controlada, reversible y operativamente segura.

## Dependencias

- Fase 11 aprobada.
- Dominio y DNS disponibles.
- Proveedores contratados.
- Textos legales aprobados.
- Cuenta de Leo preparada.
- Fotografías autorizadas.
- Datos reales validados.

## Preparación

- Entorno de producción.
- Variables y secretos.
- Base de datos.
- Migraciones.
- Almacenamiento.
- Correo transaccional.
- Dominio.
- HTTPS.
- Backups.
- Monitorización.
- Alertas.
- Política de logs.
- Cuenta administrativa.
- MFA.
- Contactos de soporte.
- Procedimiento de rollback.

## Migración inicial

Si existen alumnos actuales:

- Limpiar datos.
- Detectar duplicados.
- Validar responsables.
- Confirmar grupos.
- Confirmar estados.
- Confirmar cuotas.
- Registrar origen de la migración.
- No inventar consentimientos.
- No asumir autorizaciones de imagen.
- Realizar importación de prueba.
- Obtener validación de Leo antes de la definitiva.

## Publicación

1. Congelar cambios.
2. Crear copia.
3. Aplicar migraciones.
4. Configurar cuenta de Leo.
5. Verificar MFA.
6. Publicar aplicación.
7. Ejecutar pruebas de humo.
8. Verificar formulario.
9. Verificar notificación.
10. Verificar panel.
11. Verificar registro de pago.
12. Verificar recibo.

## Criterios de salida

- La web responde en el dominio final.
- HTTPS es obligatorio.
- El formulario crea solicitudes pendientes.
- Ninguna solicitud crea alumnos automáticamente.
- Solo Leo o personal autorizado accede al panel.
- No existe acceso de alumnos o familias.
- Los métodos visibles son efectivo y transferencia habilitada.
- No existe pasarela online.
- Las copias funcionan.
- Las alertas funcionan.
- El rollback está documentado.
- Leo puede iniciar su operativa.

---

# 7. Hitos de validación

## Hito A: Captación

Después de la Fase 2:

- La web convence.
- El CTA funciona.
- El formulario se entiende.
- La solicitud no se confunde con un alta.

## Hito B: Núcleo seguro

Después de la Fase 4:

- Los datos tienen modelo.
- Las reglas se validan en servidor.
- El acceso administrativo está protegido.

## Hito C: Operación de altas

Después de la Fase 7:

- Leo recibe solicitudes.
- Contacta.
- Confirma.
- Registra pago inicial.
- Aprueba manualmente.
- Gestiona alumnos activos.

## Hito D: Gestión diaria

Después de la Fase 9:

- Leo gestiona grupos.
- Controla cuotas.
- Registra pagos.
- Emite recibos.

## Hito E: Producción

Después de la Fase 12:

- El MVP está publicado.
- Los flujos han sido probados.
- La operación está monitorizada.
- Existe recuperación ante fallos.

---

# 8. Definición global de MVP terminado

El MVP estará terminado únicamente cuando:

- La web pública esté completa.
- “Inscribirse” sea visible inmediatamente.
- El formulario cree solicitudes pendientes.
- Leo reciba y gestione las solicitudes.
- Solo Leo pueda aprobar.
- La aprobación cree un único alumno.
- Los alumnos activos puedan buscarse y gestionarse.
- Los cuatro grupos sean visibles.
- El cambio de grupo sea manual.
- Los pagos sean efectivo o transferencia verificada.
- Los recibos internos puedan emitirse e imprimirse.
- No exista acceso privado para alumnos.
- No exista pasarela online.
- No existan funciones multi-sede o multi-gimnasio.
- No exista drag and drop.
- No existan roles complejos.
- No existan automatizaciones avanzadas.
- No exista analítica avanzada.
- La seguridad, accesibilidad y rendimiento hayan sido probados.
- El despliegue y la restauración hayan sido verificados.

---

# 9. Principio final

El proyecto se construirá desde la conversión pública hacia la operación interna, añadiendo complejidad únicamente cuando una fase anterior ya sea estable.

La pregunta para aceptar cada tarea será:

> ¿Es necesaria para que una familia solicite plaza o para que Leo gestione el club en la V1?

Si la respuesta es no, la tarea no pertenece al MVP.
