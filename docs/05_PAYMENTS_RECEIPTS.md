# SAM GUK CLUB TAEKWONDO
## Especificación profesional del sistema de pagos, mensualidades, recibos e ingresos

**Documento:** `05_PAYMENTS_RECEIPTS.md`  
**Versión:** 1.1  
**Estado:** Especificación funcional, visual, técnica y administrativa  
**Responsable del producto:** LUMEN Studio  
**Usuario principal:** Leo  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito del documento

Este documento define por completo el sistema económico de SAM GUK Club Taekwondo.

El sistema permitirá a Leo:

- Dar de alta la configuración económica de cada alumno.
- Generar mensualidades.
- Consultar qué está pagado.
- Detectar pagos pendientes.
- Detectar pagos atrasados.
- Registrar pagos presenciales.
- Registrar efectivo.
- Registrar transferencias.
- Consultar ingresos.
- Emitir recibos.
- Generar justificantes.
- Revisar modificaciones.
- Enviar recordatorios.
- Conservar una posible evolución online como decisión futura, sin implementarla en el MVP.

El objetivo es reducir trabajo administrativo y evitar:

- Listas manuales.
- Pagos sin identificar.
- Cuotas olvidadas.
- Recibos duplicados.
- Cálculos incoherentes.
- Correcciones sin historial.

Este documento no contiene código. Define estados, reglas, pantallas, datos, seguridad, arquitectura y criterios de aceptación.

---

# 2. Alcance del sistema

## 2.1 Incluido

- Configuración de cuota.
- Mensualidades.
- Vencimientos.
- Pagos.
- Recibos.
- Ingresos.
- Recordatorios.
- Observaciones económicas.
- Historial.
- Dashboard.

## 2.2 No incluido inicialmente

- Contabilidad completa.
- Gastos del club.
- Nóminas.
- Impuestos.
- Conciliación bancaria automática.
- Domiciliaciones.
- Tarjetas online.
- Suscripciones automáticas.
- Pasarela de pago.
- Facturación fiscal automática sin validación.

## 2.3 Principio

El panel es un sistema de control económico operativo.

No sustituye:

- Asesoría.
- Contabilidad.
- Obligaciones tributarias.
- Banco.

## 2.4 Métodos obligatorios de la V1

La V1 admitirá únicamente:

- Efectivo.
- Transferencia verificada manualmente, si Leo decide habilitarla.

No se implementarán en el MVP:

- Pasarela de pago.
- Pago con tarjeta online.
- Bizum automático.
- Domiciliación.
- Suscripciones automáticas.
- Conciliación bancaria automática.
- Confirmaciones automáticas procedentes de proveedores de pago.

El término “preparado para el futuro” no obliga a crear adaptadores, webhooks, tablas específicas ni pantallas para estos métodos.

---

# 3. Relación con otros documentos

Debe respetar:

- `00_PRODUCT_BOOK.md`.
- `02_REGISTRATION_FLOW.md`.
- `03_ADMIN_PANEL.md`.
- `04_STUDENTS_GROUPS.md`.

Reglas heredadas:

- El pago actual es presencial.
- Leo confirma manualmente.
- El pago no aprueba automáticamente.
- La aprobación del alumno es separada.
- Toda acción sensible se audita.
- Datos protegidos.
- Acciones frecuentes en tres clics.

---

# 4. Marco fiscal y documental

## 4.1 Revisión profesional obligatoria

Antes de emitir documentos con valor fiscal deberá confirmarse:

- Forma jurídica.
- Situación tributaria.
- Obligación de facturar.
- Tratamiento de IVA.
- Numeración.
- Series.
- Conservación.
- Rectificación.
- Aplicación de sistemas informáticos de facturación.

## 4.2 Referencias oficiales

- [Agencia Tributaria: tipos de factura](https://sede.agenciatributaria.gob.es/Sede/iva/facturacion-registro/facturacion-iva/tipos-factura.html).
- [Real Decreto 1619/2012 sobre obligaciones de facturación](https://www.boe.es/buscar/act.php?id=BOE-A-2012-14696).
- [Agencia Tributaria: sistemas informáticos de facturación y VERI*FACTU](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html).
- [Real Decreto 1007/2023 sobre sistemas informáticos de facturación](https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840).

## 4.3 Recibo interno

El documento inicial será:

> Justificante o recibo interno de pago.

Sirve para:

- Confirmar que Leo registró un pago.
- Entregar constancia a la familia.
- Vincular el pago al alumno.

No se llamará “factura” salvo que:

- Cumpla requisitos.
- Exista decisión contable.
- El sistema esté preparado.

## 4.4 Factura futura

Será un tipo documental separado.

No se convertirá un recibo en factura cambiando el título.

## 4.5 Integridad

Los registros confirmados:

- No se editarán silenciosamente.
- No se eliminarán.
- Se corregirán mediante anulación o rectificación.
- Mantendrán trazabilidad.

## 4.6 Normativa cambiante

Las fechas y requisitos de sistemas de facturación deberán revalidarse antes del lanzamiento.

No se hardcodearán criterios fiscales susceptibles de cambio.

---

# 5. Principios del sistema económico

## 5.1 Simplicidad

Leo debe saber en segundos:

- Quién pagó.
- Quién no pagó.
- Cuánto entró.
- Qué está vencido.
- Qué recibo existe.

## 5.2 Separación de conceptos

No mezclar:

- Mensualidad.
- Pago.
- Recibo.

## 5.3 Confirmación humana

Pago confirmado manualmente por Leo.

## 5.4 Inmutabilidad

Un pago confirmado se corrige, no se reescribe.

## 5.5 Exactitud

Importes en unidades monetarias exactas.

No usar cálculos imprecisos.

## 5.6 Transparencia

Cada cifra del dashboard debe tener definición.

## 5.7 Privacidad

Mostrar solo datos económicos necesarios.

## 5.8 Escalabilidad

Preparado para:

- Cientos de alumnos.
- Años de historial.
- Más conceptos.

---

# 6. Conceptos económicos

## 6.1 Perfil económico

Configuración del alumno.

## 6.2 Plan de cuota

Regla estándar.

## 6.3 Mensualidad

Obligación correspondiente a un periodo.

## 6.4 Vencimiento

Fecha límite.

## 6.5 Pago

Dinero recibido.

## 6.6 Aplicación

Relación entre pago y mensualidad.

## 6.7 Recibo

Justificante de pago.

## 6.8 Ingreso

Pago confirmado según fecha de recepción.

## 6.9 Pendiente

Mensualidad sin cubrir.

## 6.10 Atrasado

Pendiente después de vencimiento.

## 6.11 Anulación

Corrección de un registro.

---

# 7. Alta económica de un alumno

## 7.1 Momento

Después de aprobación.

## 7.2 Origen

La aprobación crea:

- Alumno.
- Perfil económico.
- Vinculación con pago inicial si existe.

Antes de la aprobación, el pago inicial pertenece a la solicitud y no a un alumno inexistente.

Durante la aprobación, una única operación deberá:

- Crear el alumno.
- Crear su perfil económico.
- Vincular el pago inicial existente.
- Evitar cualquier duplicado.

## 7.3 No duplicar

Si el pago se registró durante inscripción:

- Reutilizar.
- No crear otro.

## 7.4 Datos

- Alumno.
- Grupo.
- Plan.
- Importe mensual.
- Inicio.
- Día de vencimiento.
- Estado.

## 7.5 Plan predeterminado

Según grupo.

Leo puede confirmar o cambiar.

## 7.6 Excepción individual

Permitida con:

- Motivo.
- Fecha.
- Auditoría.

## 7.7 Primera mensualidad

Reglas:

- Periodo.
- Importe.
- Vencimiento.
- Pago asociado.

## 7.8 Confirmación

Texto:

> Revisa la cuota y el vencimiento antes de activar el perfil económico.

## 7.9 Resultado

> Configuración económica creada.

---

# 8. Perfil económico

## 8.1 Ubicación

Ficha del alumno, pestaña Pagos.

## 8.2 Resumen

- Cuota.
- Próximo vencimiento.
- Estado actual.
- Último pago.
- Pendiente total.
- Método habitual.

## 8.3 Campos

- Plan.
- Importe.
- Frecuencia.
- Día.
- Inicio.
- Fin.
- Estado.

## 8.4 Estados

- Activo.
- Suspendido.
- Cerrado.

## 8.5 Cambio

Con fecha de efecto.

No modifica mensualidades anteriores.

## 8.6 Cambio de grupo

Puede proponer nueva cuota.

Leo confirma.

## 8.7 Baja

Cerrar futuras mensualidades.

No borrar historial.

---

# 9. Planes de cuota

## 9.1 Objetivo

Evitar introducir importe repetidamente.

## 9.2 Datos

- Nombre.
- Importe.
- Periodicidad.
- Día.
- Grupo.
- Vigencia.
- Estado.

## 9.3 Cuatro grupos

Cada grupo puede tener plan.

No obligatorio que todos sean distintos.

## 9.4 Versionado

Cambiar precio crea nueva vigencia.

## 9.5 No retroactividad

No modificar periodos pasados.

## 9.6 Descuentos

No visibles inicialmente salvo necesidad real.

Arquitectura admite ajuste individual auditado.

## 9.7 Prorrateo

No automático inicialmente.

Leo define primera cuota.

---

# 10. Generación de mensualidades

## 10.1 Automática

El sistema generará cada mes.

## 10.2 Fuente

Perfiles activos.

## 10.3 Momento

Programado.

La fecha exacta será configurable.

## 10.4 Datos

- Alumno.
- Periodo.
- Concepto.
- Importe.
- Vencimiento.
- Estado.

## 10.5 Idempotencia

Una por alumno y periodo.

## 10.6 Exclusiones

- Perfil cerrado.
- Baja antes del periodo.
- Inicio posterior.

## 10.7 Vista previa

Antes de generación manual:

- Número.
- Importe total.
- Excepciones.
- Errores.

## 10.8 Manual

Solo reparación.

Botón:

> Generar mensualidades

## 10.9 Resultado

> Mensualidades generadas correctamente.

---

# 11. Estados de mensualidad

## 11.1 PRÓXIMA

Generada, no vencida.

## 11.2 PENDIENTE

Disponible para pago.

## 11.3 VENCE_PRONTO

Dentro del umbral.

## 11.4 VENCIDA

Superó vencimiento.

## 11.5 PAGADA

Cubierta completamente.

## 11.6 PARCIAL

Preparado para futuro.

No activo inicialmente sin necesidad.

## 11.7 EXENTA

Solo con autorización y motivo.

## 11.8 CANCELADA

Anulada con motivo.

## 11.9 Regla

Estado calculado por:

- Importe.
- Aplicaciones.
- Fecha.
- Exención.

No se editará a mano sin operación.

---

# 12. Fecha de vencimiento

## 12.1 Definición

Fecha límite de mensualidad.

## 12.2 Fuente

- Plan.
- Excepción.

## 12.3 Día no existente

Si día 31:

- Último día del mes.

## 12.4 Festivos

No mover automáticamente salvo regla definida.

## 12.5 Zona horaria

Atlantic/Canary.

## 12.6 Vencida

Desde el día siguiente, considerando gracia.

## 12.7 Gracia

Configurable.

Puede ser cero.

## 12.8 Sin recargos

No generar penalizaciones automáticas.

---

# 13. Registro de pago

## 13.1 Accesos

- Acción global.
- Ficha.
- Mensualidad.
- Solicitud.

## 13.2 Tres clics

1. Registrar pago.
2. Seleccionar alumno o mensualidad.
3. Confirmar.

## 13.3 Formulario

- Alumno o solicitud pendiente.
- Mensualidad.
- Concepto.
- Importe.
- Método.
- Fecha.
- Hora.
- Referencia.
- Observación.

## 13.4 Predeterminados

- Alumno o solicitud de origen.
- Mensualidad pendiente.
- Importe.
- Fecha actual.

## 13.5 Validaciones

- Importe positivo.
- Moneda EUR.
- Fecha válida.
- Método.
- Concepto.
- No duplicado.

## 13.6 Confirmador

Se registra:

- Usuario.
- Fecha.
- Hora.

Cuando el pago procede de una solicitud:

- Se almacena con la referencia de la solicitud.
- No crea un perfil económico activo.
- No genera mensualidades futuras.
- No convierte la solicitud en alumno.
- Queda disponible para vincularse durante la aprobación manual.

## 13.7 Confirmación

Resumen:

- Alumno.
- Periodo.
- Importe.
- Método.
- Fecha.

Botón:

> Confirmar pago

## 13.8 Resultado

> Pago registrado correctamente.

---

# 14. Pago en efectivo

## 14.1 Flujo

Leo recibe y registra.

## 14.2 Campos

- Importe.
- Fecha.
- Hora.
- Persona.
- Observación opcional.

## 14.3 Confirmación

El efectivo se considera recibido al confirmar.

## 14.4 Recibo

Disponible inmediatamente.

## 14.5 Control diario

Resumen:

- Efectivo registrado hoy.
- Número de pagos.

No será caja contable completa.

## 14.6 Corrección

Anular y registrar correcto.

---

# 15. Pago mediante transferencia

## 15.1 Flujo

La familia realiza transferencia.

Leo verifica.

Leo registra.

## 15.2 No automático

Sin conexión bancaria inicial.

## 15.3 Campos

- Fecha de transferencia.
- Fecha de verificación.
- Importe.
- Referencia.
- Ordenante opcional.

## 15.4 Privacidad

No guardar:

- IBAN completo del pagador.
- Captura bancaria innecesaria.
- Credenciales.

## 15.5 Estado

No marcar pagado por aviso verbal.

Solo tras verificación.

## 15.6 Mensaje

> Confirma que la transferencia aparece recibida antes de registrar el pago.

---

# 16. Métodos fuera del MVP

## 16.1 Exclusiones

- Tarjeta.
- Bizum automático.
- Pasarela online.
- Domiciliación.
- Suscripciones.

## 16.2 Regla

No aparecerán en formularios, filtros, configuración ni recibos de la V1.

No se desarrollarán integraciones, adaptadores, webhooks ni modelos específicos para estos métodos dentro del MVP.

Su posible incorporación requerirá una nueva decisión de producto, revisión legal y fiscal, y actualización previa de esta documentación.

## 16.3 Catálogo actual

- Efectivo.
- Transferencia verificada manualmente, si está habilitada.

---

# 17. Aplicación de pagos

## 17.1 Un pago, una mensualidad

Caso inicial.

## 17.2 Pago múltiple futuro

Puede cubrir varios periodos.

## 17.3 Importe distinto

Advertir:

- Menor.
- Mayor.

## 17.4 Parcial

Desactivado inicialmente.

## 17.5 Exceso

No saldo automático sin política.

Leo decide.

## 17.6 Integridad

La aplicación y pago se guardan juntos.

---

# 18. Estado de pago del alumno

## 18.1 AL_DÍA

Sin mensualidades vencidas.

## 18.2 PENDIENTE

Mensualidad abierta no vencida.

## 18.3 VENCE_PRONTO

Próxima al vencimiento.

## 18.4 ATRASADO

Al menos una vencida.

## 18.5 SIN_CONFIGURAR

Perfil incompleto.

## 18.6 EXENTO

Periodo exento.

## 18.7 Regla

El estado del alumno se deriva.

No es un interruptor manual.

---

# 19. Pagos pendientes

## 19.1 Vista

- Alumno.
- Grupo.
- Periodo.
- Importe.
- Vencimiento.
- Días.
- Contacto.

## 19.2 Filtros

- Grupo.
- Mes.
- Estado.
- Importe.
- Recordatorio.

## 19.3 Acción

- Registrar pago.
- Enviar recordatorio.
- Ver ficha.

## 19.4 Orden

Vencimiento más antiguo.

## 19.5 Total

- Número.
- Importe.

---

# 20. Pagos atrasados

## 20.1 Definición

Mensualidad vencida no cubierta.

## 20.2 Indicador

Rojo, icono y texto.

## 20.3 Antigüedad

- 1 a 7 días.
- 8 a 30.
- Más de 30.

Rangos configurables.

## 20.4 Acción

- Contactar.
- Registrar recordatorio.
- Registrar pago.
- Añadir observación.

## 20.5 No sanción automática

Sin recargos.

Sin baja automática.

## 20.6 Privacidad

No mostrar en pantallas públicas.

---

# 21. Pagos realizados

## 21.1 Vista

- Fecha.
- Alumno.
- Periodo.
- Importe.
- Método.
- Confirmador.
- Recibo.
- Estado.

## 21.2 Estados

- Confirmado.
- Anulado.
- Rectificado.

## 21.3 Filtros

- Fecha.
- Grupo.
- Método.
- Importe.
- Confirmador.

## 21.4 Orden

Más reciente.

## 21.5 Apertura

Detalle completo.

---

# 22. Historial completo de pagos

## 22.1 Ficha

Cronología.

## 22.2 Contenido

- Mensualidad.
- Pago.
- Recibo.
- Recordatorio.
- Corrección.
- Observación.

## 22.3 Separación

Pagos confirmados vs anulados.

## 22.4 Periodos

- Curso.
- Año.
- Personalizado.

## 22.5 Exportación

Futura y autorizada.

---

# 23. Observaciones económicas

## 23.1 Uso

- Acuerdo.
- Incidencia.
- Aclaración.
- Seguimiento.

## 23.2 No usar

- Datos bancarios.
- Tarjetas.
- Salud.
- Opiniones personales.

## 23.3 Campos

- Texto.
- Tipo.
- Autor.
- Fecha.
- Vinculación.

## 23.4 Privacidad

Solo roles económicos.

## 23.5 Edición

Corrección auditada.

---

# 24. Recordatorios

## 24.1 Objetivo

Ayudar a Leo, no automatizar presión.

## 24.2 Recordatorio interno

- Tarea.
- Fecha.
- Prioridad.

## 24.3 A familia

Inicialmente manual.

Canales:

- WhatsApp.
- Correo.
- Llamada.

## 24.4 Mensaje

Respetuoso.

Ejemplo:

> Hola. Te escribimos desde SAM GUK porque la mensualidad de {periodo} figura pendiente. Si ya la has abonado, puedes ignorar este mensaje o avisarnos para revisarlo.

## 24.5 Registro

- Fecha.
- Canal.
- Destinatario.
- Autor.
- Resultado.

## 24.6 Frecuencia

No enviar repetidamente.

## 24.7 Automatización futura

Fuera del MVP.

La V1 permitirá que Leo registre y envíe recordatorios manualmente. No se crearán reglas automáticas, secuencias, campañas ni envíos programados.

Una automatización futura requerirá una nueva definición funcional, base jurídica, límites de frecuencia, horario, pausa e historial.

## 24.8 Menores

Contactar responsable.

No al menor.

---

# 25. Recibos y justificantes

## 25.1 Objetivo

Acreditar pago registrado.

## 25.2 Generación

Después de confirmar pago.

## 25.3 Numeración

Única y ordenada.

Ejemplo visual:

> REC-2026-000123

La serie definitiva deberá validarse.

## 25.4 Contenido mínimo

- SAM GUK.
- Identificación del club.
- Número.
- Fecha de emisión.
- Alumno.
- Pagador si procede.
- Concepto.
- Periodo.
- Importe.
- Moneda.
- Método.
- Fecha de pago.
- Confirmado por.
- Texto de justificante.

## 25.5 Texto

> Justificante de pago

No:

> Factura

Hasta cumplir requisitos.

## 25.6 Diseño

- Limpio.
- Blanco.
- Azul.
- Logo.
- Legible.
- Impresión.

## 25.7 Privacidad

No incluir:

- Fecha de nacimiento.
- Teléfono.
- Correo.
- Consentimientos.
- Observaciones.

## 25.8 Estado

- Emitido.
- Anulado.
- Sustituido.

## 25.9 Duplicado

Reimpresión:

> Duplicado

Mismo número.

## 25.10 Corrección

No editar emitido.

Anular y emitir nuevo.

## 25.11 Entrega

- Imprimir.
- Descargar futuro.
- Enviar futuro.

---

# 26. Vista previa del recibo

## 26.1 Antes de emitir

Mostrar:

- Alumno.
- Periodo.
- Importe.
- Método.
- Fecha.

## 26.2 Acción

> Emitir recibo

## 26.3 Después

- Ver.
- Imprimir.
- Marcar entregado.

## 26.4 Error

> El pago se guardó, pero no pudimos generar el recibo.

Reintentar sin duplicar pago.

---

# 27. Descarga PDF futura

## 27.1 Objetivo

Documento estable.

## 27.2 Generación

Servidor.

## 27.3 Requisitos

- A4.
- Ticket opcional.
- Texto seleccionable.
- Etiquetas accesibles cuando sea posible.
- Fuentes embebidas.
- Integridad.

## 27.4 Nombre

> recibo-samguk-REC-2026-000123.pdf

Sin nombre completo en archivo.

## 27.5 Acceso

- Autenticado.
- Enlace temporal.
- Caducidad.

## 27.6 Almacenamiento

- Cifrado.
- Retención.
- No público.

---

# 28. Correcciones, anulaciones y devoluciones

## 28.1 No editar

Pago confirmado inmutable.

## 28.2 Anular

Requiere:

- Motivo.
- Confirmación.
- Permiso.

## 28.3 Registro

- Original.
- Anulación.
- Autor.
- Fecha.

## 28.4 Nuevo pago

Después.

## 28.5 Devolución

Preparado para futuro.

No activa inicialmente.

## 28.6 Dashboard

Excluir anulados.

Reflejar devoluciones futuras.

---

# 29. Registro de quién confirma

## 29.1 Obligatorio

Cada pago.

## 29.2 Datos

- Usuario.
- Fecha.
- Hora.
- Zona.
- Método.
- Origen.

## 29.3 No editable

Corrección crea evento.

## 29.4 Visual

> Confirmado por Leo el 02/07/2026 a las 18:42

---

# 30. Fecha y hora

## 30.1 Fechas distintas

- Fecha operación.
- Fecha registro.
- Fecha confirmación.
- Fecha emisión.

## 30.2 Transferencia

Operación y verificación pueden diferir.

## 30.3 Almacenamiento

UTC.

## 30.4 Visualización

Atlantic/Canary.

## 30.5 Cambios de horario

Preservar instante.

---

# 31. Historial de modificaciones

## 31.1 Eventos

- Mensualidad creada.
- Pago registrado.
- Pago confirmado.
- Recibo emitido.
- Recordatorio enviado.
- Pago anulado.
- Cuota cambiada.
- Vencimiento cambiado.

## 31.2 Fila

- Fecha.
- Actor.
- Acción.
- Antes.
- Después.
- Motivo.

## 31.3 Inmutabilidad

No borrar.

## 31.4 Acceso

Roles autorizados.

## 31.5 Exportación

Auditada.

---

# 32. Dashboard económico

## 32.1 Objetivo

Responder:

- Cuánto se ha cobrado.
- Qué falta.
- Qué está vencido.
- Qué debe revisar Leo.

## 32.2 Orden

1. Periodo.
2. Indicadores.
3. Alertas.
4. Cobros recientes.
5. Pendientes.
6. Distribución por método.

## 32.3 Periodo

- Mes actual.
- Mes anterior.
- Año.
- Personalizado.

## 32.4 Actualización

Visible:

> Actualizado hace un minuto

## 32.5 No confundir

Ingreso no es beneficio.

No mostrar “ganancia”.

---

# 33. Número total de alumnos activos

## 33.1 Definición

Alumnos activos en fecha.

## 33.2 Uso

Contexto de mensualidades.

## 33.3 No incluir

- Solicitudes.
- Bajas.
- Inactivos.

## 33.4 Acción

Ver alumnos activos.

---

# 34. Mensualidades cobradas

## 34.1 Definición

Mensualidades del periodo cubiertas.

## 34.2 Mostrar

- Número.
- Total esperado.
- Porcentaje.

## 34.3 No confundir

No es igual a pagos recibidos ese mes.

Una mensualidad anterior puede pagarse ahora.

## 34.4 Acción

Ver cobradas.

---

# 35. Mensualidades pendientes

## 35.1 Definición

Del periodo no cubiertas.

## 35.2 Mostrar

- Número.
- Importe.
- Próximas a vencer.

## 35.3 Acción

Ver pendientes.

---

# 36. Ingresos del mes

## 36.1 Definición

Suma de pagos confirmados cuya fecha de recepción pertenece al mes.

## 36.2 Excluir

- Anulados.
- Borradores.
- No confirmados.

## 36.3 Mostrar

- Importe.
- Efectivo.
- Transferencia.

## 36.4 Comparación

Con mes anterior.

Sin dramatización.

---

# 37. Ingresos del año

## 37.1 Definición

Suma de pagos confirmados del año.

## 37.2 Mostrar

- Total.
- Media mensual.
- Mes actual.

## 37.3 Gráfico

Barras mensuales.

Tabla accesible.

## 37.4 Excluir

Anulados.

---

# 38. Alertas de pagos vencidos

## 38.1 Resumen

- Alumnos.
- Importe.
- Antigüedad.

## 38.2 Prioridad

- 1 a 7 días.
- 8 a 30.
- Más de 30.

## 38.3 Acción

> Revisar pagos vencidos

## 38.4 No exponer

No nombres en inicio si pantalla visible a otros, según configuración.

---

# 39. Estadísticas rápidas

## 39.1 Tasa de cobro

Mensualidades pagadas / generadas.

## 39.2 Importe pendiente

Total abierto.

## 39.3 Método

Porcentaje efectivo y transferencia.

## 39.4 Tiempo medio

Días entre vencimiento y pago.

Solo si útil.

## 39.5 Recibos

Emitidos y pendientes.

## 39.6 No inventar

No métricas sin decisión.

---

# 40. Indicadores visuales

## 40.1 Pagado

Verde:

`#137A5B`

Texto:

> Pagado

## 40.2 Pendiente

Azul gris:

`#4D5F75`

## 40.3 Vence pronto

Ámbar:

`#9A6700`

## 40.4 Vencido

Rojo:

`#C8102E`

## 40.5 Anulado

Gris:

`#7A838F`

## 40.6 No solo color

- Texto.
- Icono.
- Color.

## 40.7 Importes

Negro.

No verde decorativo.

---

# 41. Vista de mensualidades

## 41.1 Tabla

- Alumno.
- Grupo.
- Periodo.
- Importe.
- Vencimiento.
- Estado.
- Recordatorio.
- Acción.

## 41.2 Filtros

- Periodo.
- Grupo.
- Estado.
- Método.

## 41.3 Búsqueda

Instantánea.

## 41.4 Acciones

- Registrar pago.
- Ver detalle.
- Recordar.

## 41.5 Móvil

Tarjetas.

---

# 42. Vista de pagos

## 42.1 Tabla

- Fecha.
- Alumno.
- Concepto.
- Importe.
- Método.
- Confirmador.
- Recibo.

## 42.2 Filtros

- Fecha.
- Método.
- Estado.
- Confirmador.
- Grupo.

## 42.3 Acciones

- Ver.
- Recibo.
- Anular.

## 42.4 No eliminación

No borrar.

---

# 43. Vista de recibos

## 43.1 Tabla

- Número.
- Emisión.
- Alumno.
- Concepto.
- Importe.
- Estado.
- Entrega.

## 43.2 Filtros

- Fecha.
- Estado.
- Alumno.

## 43.3 Acciones

- Ver.
- Imprimir.
- PDF futuro.
- Duplicado.

---

# 44. Acciones en menos de tres clics

## 44.1 Registrar pago

1. Registrar pago.
2. Seleccionar.
3. Confirmar.

## 44.2 Emitir recibo

1. Abrir pago.
2. Emitir recibo.
3. Confirmar.

## 44.3 Ver pendientes

1. Indicador.

## 44.4 Recordatorio

1. Abrir pendiente.
2. Recordar.
3. Confirmar canal.

## 44.5 Historial

1. Abrir alumno.
2. Pagos.

---

# 45. Experiencia de usuario

## 45.1 Acción principal

> Registrar pago

Visible.

## 45.2 Formularios

- Cortos.
- Predeterminados.
- Teclado.

## 45.3 Confirmaciones

Solo sensibles.

## 45.4 Contexto

Volver conserva:

- Periodo.
- Filtros.
- Scroll.

## 45.5 Lenguaje

- Cobrado.
- Pendiente.
- Vencido.
- Recibo.

No jerga contable innecesaria.

## 45.6 Feedback

Inmediato.

## 45.7 Prevención

Advertir duplicado.

---

# 46. Microinteracciones

## 46.1 Registro

Botón carga:

> Registrando...

## 46.2 Éxito

> Pago registrado correctamente.

## 46.3 Estado

Actualización sin salto.

## 46.4 Copiar referencia

> Copiado.

## 46.5 Filtro

Chip.

## 46.6 Recibo

Vista previa.

## 46.7 Prohibido

- Confeti.
- Sonido.
- Animación de dinero.
- Contadores largos.

---

# 47. Estados vacíos

## 47.1 Sin mensualidades

> No hay mensualidades en este periodo.

## 47.2 Sin pendientes

> Todo al día.

## 47.3 Sin pagos

> No hay pagos registrados.

## 47.4 Sin recibos

> No hay recibos emitidos.

## 47.5 Sin resultados

> No hay resultados con estos filtros.

Acción:

> Limpiar filtros

## 47.6 Perfil sin configurar

> Falta configurar la cuota.

Acción:

> Configurar cuota

---

# 48. Estados de carga

## 48.1 Dashboard

Esqueletos.

## 48.2 Tabla

Filas estables.

## 48.3 Guardado

Indicador en botón.

## 48.4 PDF

> Generando PDF...

## 48.5 Regla

No duplicar acción.

---

# 49. Estados de error

## 49.1 Carga

> No hemos podido cargar la información económica.

## 49.2 Pago

> No se ha registrado el pago.

## 49.3 Duplicado

> Puede existir un pago similar.

Mostrar comparación.

## 49.4 Recibo

> Pago guardado. Recibo pendiente de generar.

## 49.5 Sin permiso

> No tienes permiso para realizar esta acción.

## 49.6 Conflicto

> El registro cambió. Revisa antes de continuar.

---

# 50. Responsive

## 50.1 Móvil

- Dashboard apilado.
- Registrar pago visible.
- Tarjetas.
- Filtros panel inferior.

## 50.2 Formulario

- Una columna.
- Teclado numérico.
- Botón amplio.

## 50.3 Tablas

Tarjetas.

## 50.4 Recibo

- Vista ajustada.
- Imprimir.

## 50.5 Escritorio

- Estadísticas fila.
- Tablas.
- Detalle lateral cuando útil.

## 50.6 No scroll horizontal

Página.

Contenedor solo si necesario.

---

# 51. Accesibilidad

## 51.1 Nivel

WCAG 2.2 AA.

## 51.2 Estados

No solo color.

## 51.3 Tablas

- Encabezados.
- Caption.
- Orden.

## 51.4 Formularios

- Etiquetas.
- Errores.
- Resumen.

## 51.5 Confirmaciones

- Focus.
- Escape.

## 51.6 Gráficos

Tabla alternativa.

## 51.7 Dinero

Lectura clara:

> 40 euros

## 51.8 Teclado

Todas acciones.

---

# 52. Seguridad

## 52.1 Autenticación

MFA.

## 52.2 Permisos

Servidor.

## 52.3 Reautenticación

- Anular.
- Exportar.
- Configurar.

## 52.4 Datos bancarios

No almacenar credenciales.

## 52.5 Tarjetas

No almacenar.

## 52.6 Integridad

- Inmutabilidad.
- Auditoría.

## 52.7 Sesiones

Seguras.

## 52.8 Logs

No PII ni datos completos.

## 52.9 Exportaciones

- Cifradas.
- Caducidad.
- Auditoría.

## 52.10 Copias

- Cifradas.
- Restauración.

---

# 53. Permisos

En el MVP, Leo será el usuario económico principal. Si existe otra persona autorizada, utilizará un permiso administrativo sencillo definido fuera de una matriz compleja de roles.

Los perfiles especializados descritos a continuación quedan reservados para una fase posterior.

## 53.1 Leo

Todo.

## 53.2 Económico

- Ver.
- Registrar.
- Recibos.

## 53.3 Instructor

No ver importes.

Puede ver:

- Estado general si necesario.

## 53.4 Solo lectura

Sin cambios.

## 53.5 Exportar

Permiso separado.

## 53.6 Anular

Permiso separado.

---

# 54. Protección de datos

## 54.1 Datos económicos

Personales.

## 54.2 Minimización

Listas muestran mínimo.

## 54.3 Notificaciones

Sin nombre completo de menor.

## 54.4 Retención

Definida con asesoría.

## 54.5 Derechos

Localizar y exportar.

## 54.6 Analítica

Solo agregados.

---

# 55. Arquitectura funcional

## 55.1 Módulos

- Perfil económico.
- Planes.
- Mensualidades.
- Pagos.
- Aplicaciones.
- Recibos.
- Recordatorios.
- Dashboard.
- Auditoría.

## 55.2 Servicios

- Cuotas.
- Cobros.
- Recibos.
- Notificaciones.
- Informes.

## 55.3 Fuente

Base de datos.

## 55.4 Eventos

- MensualidadGenerada.
- PagoRegistrado.
- PagoConfirmado.
- ReciboEmitido.
- RecordatorioEnviado.
- PagoAnulado.

## 55.5 Cola

- Recordatorios.
- PDF.

---

# 56. Modelo conceptual

## 56.1 Perfil económico

- Alumno.
- Plan.
- Estado.
- Inicio.
- Vencimiento.

## 56.2 Plan

- Nombre.
- Importe.
- Periodicidad.
- Vigencia.

## 56.3 Mensualidad

- Alumno.
- Periodo.
- Importe.
- Vencimiento.
- Estado.

## 56.4 Pago

- Importe.
- Fecha.
- Método.
- Estado.
- Confirmador.

## 56.5 Aplicación

- Pago.
- Mensualidad.
- Importe.

## 56.6 Recibo

- Número.
- Pago.
- Emisión.
- Estado.

## 56.7 Recordatorio

- Mensualidad.
- Canal.
- Fecha.
- Resultado.

## 56.8 Evento

- Actor.
- Acción.
- Fecha.
- Datos mínimos.

---

# 57. Representación de dinero

## 57.1 Unidad

Céntimos.

## 57.2 No flotantes

Evitar errores.

## 57.3 Moneda

EUR.

## 57.4 Formato

40,00 €.

## 57.5 Redondeo

Regla única.

## 57.6 Futuras monedas

No necesarias.

---

# 58. Transacciones y concurrencia

## 58.1 Pago

Pago, aplicación y estado juntos.

## 58.2 Recibo

Número único.

## 58.3 Anulación

Evento y estado.

## 58.4 Dos usuarios

Detectar.

## 58.5 Idempotencia

- Registro.
- PDF.

---

# 59. Rendimiento

## 59.1 Objetivos

- Dashboard menos de 2 segundos.
- Búsqueda menos de 200 ms.
- Registro feedback 100 ms.
- Guardado menos de 1 segundo habitual.

## 59.2 Índices

- Alumno.
- Estado.
- Periodo.
- Vencimiento.
- Fecha pago.

## 59.3 Agregados

Dashboard precalculado.

## 59.4 Actualización

Tras pago.

## 59.5 Escala

500 alumnos:

- 6.000 mensualidades anuales.
- Historial multianual.

Preparado para decenas de miles.

---

# 60. Escalabilidad futura

## 60.1 Más conceptos

- Matrícula.
- Examen.
- Material.

Solo al necesitar.

## 60.2 Multi-sede

Fuera del MVP.

La V1 gestionará una única sede, una única operativa económica y la serie que determine la revisión fiscal.

## 60.3 Multi-gimnasio

Fuera del MVP.

No se implementarán organizaciones, aislamiento multiempresa ni configuración por gimnasio.

## 60.4 Integración contable

Exportación futura.

## 60.5 Banco

Conciliación futura.

## 60.6 Online

Fuera del MVP.

---

# 61. Pasarela de pago online

## 61.1 Estado

Fuera del MVP.

La V1 no incluirá:

- Proveedores de pago.
- Órdenes online.
- Formularios de tarjeta.
- Webhooks.
- Identificadores externos.
- Comisiones.
- Reembolsos automáticos.
- Confirmaciones automáticas.

No se implementará código preparatorio específico para una pasarela.

Si el producto incorpora pagos online en el futuro, se tratará como una fase independiente con nueva documentación funcional, técnica, fiscal, legal y de seguridad.

---

# 62. Observabilidad

## 62.1 Métricas

- Generación.
- Cobro.
- Error.
- PDF.
- Recordatorio.

## 62.2 Alertas

- Mensualidades no generadas.
- Recibo fallido.
- Descuadre.
- Webhook futuro.

## 62.3 Analítica

Agregada.

Sin PII.

---

# 63. Casos límite

## 63.1 Pago duplicado

Advertir.

Comparar.

## 63.2 Importe incorrecto

Anular.

Nuevo.

## 63.3 Transferencia no localizada

No confirmar.

Observación.

## 63.4 Baja mitad de mes

Leo decide.

No prorrateo automático.

## 63.5 Cambio cuota

Fecha futura.

No pasado.

## 63.6 Pago de hermano

Aplicaciones separadas.

## 63.7 Pago adelantado

Preparado.

Leo selecciona periodo.

## 63.8 Recibo duplicado

Mismo número.

Marcado.

## 63.9 Zona horaria

Canary.

## 63.10 Año nuevo

Serie y dashboard.

---

# 64. Pruebas funcionales

## Alta

- Perfil.
- Plan.
- Primera cuota.

## Generación

- Mes.
- Baja.
- Duplicado.

## Efectivo

- Registrar.
- Recibo.

## Transferencia

- Verificar.
- Referencia.

## Estados

- Pendiente.
- Vencido.
- Pagado.

## Corrección

- Anular.
- Nuevo.

## Dashboard

- Mes.
- Año.
- Fórmulas.

## Recordatorio

- Registrar.

## PDF

- Generar.
- Acceso.

---

# 65. Pruebas de seguridad

- Roles.
- MFA.
- Autorización.
- IDs.
- Importes.
- Doble envío.
- CSRF.
- XSS.
- Inyección.
- Logs.
- Exportación.
- PDF.
- Gateway futuro.

---

# 66. Pruebas de accesibilidad

- Teclado.
- Focus.
- Tablas.
- Estados.
- Dinero.
- Gráficos.
- Errores.
- Confirmaciones.
- Móvil.
- Zoom.

---

# 67. Datos pendientes de Leo y asesoría

- Cuotas reales.
- Día de vencimiento.
- Periodo de gracia.
- Métodos actuales.
- Cuenta de transferencia.
- Conceptos.
- Serie de recibos.
- Datos del club.
- IVA.
- Obligación de factura.
- Retención.
- Recordatorios.
- Permisos.
- Decisión futura sobre pasarela, sin implementación en el MVP.

No publicar valores de demo.

---

# 68. Reglas no negociables

1. Pago actual presencial.
2. Leo confirma.
3. Pago no aprueba.
4. Mensualidad distinta de pago.
5. Pago distinto de recibo.
6. Estados derivados.
7. Importes exactos.
8. Vencimientos claros.
9. Vencidos visibles.
10. Efectivo registrado.
11. Transferencia verificada.
12. Sin datos de tarjeta.
13. Sin credenciales bancarias.
14. Recibo no factura.
15. Factura futura separada.
16. Registros confirmados inmutables.
17. Corrección por anulación.
18. Confirmador registrado.
19. Fecha y hora registradas.
20. Historial completo.
21. Dashboard con definiciones.
22. Ingreso no beneficio.
23. Colores más texto.
24. Recordatorios respetuosos.
25. Tres clics.
26. MFA.
27. Permisos.
28. Sin PII en analítica.
29. Sin pasarela, tarjeta online ni Bizum automático en el MVP.
30. No funcionalidades innecesarias.
31. Los únicos métodos de la V1 son efectivo y transferencia verificada si se habilita.
32. Un pago de solicitud no crea un alumno ni un perfil económico activo.
33. Multi-sede, multi-gimnasio, roles complejos y automatizaciones avanzadas quedan fuera del MVP.

---

# 69. Criterios de aceptación

## Alta

- Perfil económico.
- Plan.
- Primera cuota.

## Gestión

- Generar mensualidades.
- Registrar efectivo.
- Registrar transferencia.
- Pendientes.
- Vencidos.
- Historial.

## Recibos

- Emitir.
- Imprimir.
- Anular.
- PDF preparado.

## Dashboard

- Activos.
- Cobradas.
- Pendientes.
- Mes.
- Año.
- Vencidos.
- Estadísticas.

## Seguridad

- Roles.
- Auditoría.
- Sin tarjeta.

## Rendimiento

- Cientos de alumnos.
- Respuesta rápida.

## Futuro

- No existe pasarela implementada.
- Cualquier pago online requerirá una fase posterior independiente.

---

# 70. Principio final

Leo debe abrir el dashboard económico y saber inmediatamente:

- Cuánto ha cobrado.
- Qué mensualidades faltan.
- Qué pagos están atrasados.
- Qué acción debe realizar.

Registrar un pago debe ser rápido.

Corregirlo debe ser seguro.

El historial debe ser confiable.

La pregunta para validar cada decisión será:

> ¿Esto ahorra tiempo a Leo sin comprometer la exactitud ni la trazabilidad económica?

Si la respuesta es no, no debe formar parte del sistema.
