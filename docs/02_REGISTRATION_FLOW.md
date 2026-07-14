# SAM GUK CLUB TAEKWONDO
## Especificación profesional del flujo de inscripción

**Documento:** `02_REGISTRATION_FLOW.md`  
**Versión:** 1.1  
**Estado:** Especificación funcional, legal, técnica y de experiencia de usuario  
**Responsable del producto:** LUMEN Studio  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito del documento

Este documento define de forma completa cómo debe funcionar el proceso de inscripción de SAM GUK Club Taekwondo.

La especificación cubre:

- La experiencia del visitante.
- La experiencia de una familia que inscribe a un menor.
- La experiencia de un adulto que se inscribe a sí mismo.
- La lectura obligatoria de documentos legales.
- La recogida y prueba de consentimientos.
- La gestión interna de la solicitud.
- El contacto personal realizado por Leo.
- La confirmación presencial y el pago manualmente verificado.
- La aprobación manual del alumno.
- La creación definitiva del alumno en el sistema.
- La seguridad, privacidad, accesibilidad y arquitectura técnica necesarias.

Este documento no define código ni componentes concretos. Define comportamiento, reglas de negocio, estados, mensajes, responsabilidades y criterios de aceptación.

La implementación futura no deberá reinterpretar el flujo. Cualquier cambio en el orden de pasos, en la obligatoriedad de los documentos o en la aprobación manual deberá considerarse un cambio de producto y documentarse antes de desarrollarse.

---

# 2. Alcance y resultado real del proceso

El formulario público no completa automáticamente una matrícula.

El resultado del envío es:

> **Una solicitud de inscripción pendiente de revisión.**

No es:

- Una plaza confirmada.
- Un alumno activo.
- Una matrícula definitiva.
- Un pago.
- Una aceptación automática por parte del club.
- Una reserva garantizada.

La inscripción solo se considerará finalizada cuando:

1. Leo haya revisado la solicitud.
2. Leo haya contactado personalmente con la familia o persona interesada.
3. Se haya realizado la confirmación presencial.
4. Se haya registrado y verificado el pago.
5. Leo haya aprobado manualmente la solicitud.
6. El sistema haya creado el alumno definitivo.

Hasta que se complete el último paso, la persona continuará siendo una solicitud y no un alumno activo.

## 2.1 Regla de existencia del alumno

En la V1 solo existen dos situaciones:

- Solicitud pendiente, mientras Leo no haya aprobado.
- Alumno, después de la aprobación manual de Leo.

El formulario público, la lectura de documentos, el contacto, la confirmación presencial y el registro de un pago no crean por sí solos un alumno.

No se utilizarán alumnos provisionales, alumnos preactivos ni alumnos pendientes de documentación para representar solicitudes incompletas.

---

# 3. Flujo obligatorio e inalterable

El flujo deberá respetar exactamente este orden:

1. Un visitante pulsa “Inscribirse”.
2. Completa un formulario simple con los datos necesarios.
3. Lee obligatoriamente todos los documentos legales.
4. No puede marcar la aceptación o registrar una decisión hasta llegar al final de cada documento mediante scroll.
5. Revisa los datos y envía la solicitud.
6. Leo recibe una notificación de nueva solicitud.
7. La solicitud aparece en el panel privado pendiente de revisión.
8. Leo revisa la solicitud.
9. Leo contacta personalmente con la familia o persona interesada.
10. La confirmación se realiza presencialmente y el pago se registra mediante un método habilitado en la V1.
11. Leo registra la confirmación y el pago en el sistema.
12. Leo aprueba manualmente al alumno.
13. Solo después de esa aprobación se crea el alumno definitivo.
14. El alumno pasa a formar parte del sistema de gestión de SAM GUK.

Quedan expresamente prohibidas las siguientes variantes:

- Aprobación automática después de enviar el formulario.
- Aprobación automática después de registrar un pago.
- Pago online dentro de este flujo.
- Alta automática basada únicamente en una casilla legal.
- Creación del alumno antes de la aprobación de Leo.
- Envío directo del formulario a una hoja de cálculo sin estado ni auditoría.
- Uso de WhatsApp como sustituto del formulario.
- Considerar la solicitud enviada como matrícula definitiva.

---

# 4. Principios del flujo

## 4.1 Simplicidad para el visitante

El formulario debe pedir únicamente la información necesaria para:

- Identificar a la persona interesada.
- Identificar al alumno.
- Saber qué grupo interesa.
- Poder contactar.
- Verificar si se trata de un menor.
- Gestionar correctamente los documentos legales.

No se pedirán en esta fase datos que puedan recogerse presencialmente.

## 4.2 Control humano

Leo mantiene la decisión final.

El sistema ayuda a:

- Ordenar.
- Notificar.
- Registrar.
- Evitar olvidos.
- Conservar evidencias.

El sistema no sustituye el criterio de Leo.

## 4.3 Transparencia

En todo momento el visitante debe saber:

- En qué paso está.
- Qué información se le solicita.
- Para qué se utilizará.
- Qué documentos debe leer.
- Qué decisiones son obligatorias.
- Qué consentimientos son opcionales.
- Qué ocurrirá después del envío.
- Que la plaza todavía no está confirmada.

## 4.4 Privacidad desde el diseño

El flujo se diseñará con:

- Minimización de datos.
- Acceso limitado.
- Plazos de conservación definidos.
- Consentimientos separados.
- Ausencia de casillas premarcadas.
- Protección reforzada cuando haya menores.
- Registro de evidencias sin recopilar datos innecesarios.

## 4.5 Ausencia de presión comercial

No se utilizarán:

- Contadores de plazas.
- Urgencia falsa.
- Mensajes de miedo.
- Casillas premarcadas.
- Consentimientos agrupados.
- Botones engañosos.
- Redacción que haga parecer obligatoria la autorización de imagen.

---

# 5. Marco legal y criterio de cumplimiento

## 5.1 Referencias

La especificación se apoya en los principios del:

- [Reglamento General de Protección de Datos, Reglamento (UE) 2016/679](https://eur-lex.europa.eu/legal-content/ES/TXT/?qid=1527065154040&uri=CELEX%3A32016R0679).
- [Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales](https://boe.es/buscar/act.php?id=BOE-A-2018-16673).
- [Criterio de la AEPD sobre protección de datos por defecto](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/proteccion-de-datos-por-defecto).
- [Criterio de la AEPD sobre prueba y recibo del consentimiento](https://www.aepd.es/prensa-y-comunicacion/blog/recibo-del-consentimiento-una-herramienta-de-transparencia-y).
- [Información de la AEPD sobre datos personales de menores](https://www.aepd.es/preguntas-frecuentes/10-menores-y-educacion/FAQ-1002-se-puede-recabar-y-tratar-datos-personales-de-menores).
- [Información de la AEPD sobre captación y publicación de imágenes](https://www.aepd.es/preguntas-frecuentes/10-menores-y-educacion/FAQ-1004-se-pueden-tomar-imagenes-o-grabar-videos-en-eventos-escolares).
- [Información de la AEPD sobre supresión de imágenes en internet](https://www.aepd.es/areas-de-actuacion/internet-y-redes-sociales/eliminar-fotos-y-videos-de-internet).

## 5.2 Revisión jurídica obligatoria

Este documento define requisitos de producto y cumplimiento, pero no sustituye el asesoramiento jurídico.

Antes de publicar el flujo deberán revisarse por una persona profesional:

- La identidad exacta del responsable del tratamiento.
- Las bases jurídicas aplicables a cada finalidad.
- Los textos completos de privacidad.
- Las condiciones de inscripción.
- Las normas del club.
- El consentimiento de imagen.
- Los plazos de conservación.
- La gestión de menores.
- Los encargados y subencargados del tratamiento.
- Las posibles transferencias internacionales.

## 5.3 Llegar al final no equivale a comprender

El sistema debe demostrar que el usuario llegó al final del documento y realizó una acción afirmativa.

No debe afirmar que:

- El usuario leyó cada palabra.
- El usuario comprendió jurídicamente todo el contenido.
- El scroll sustituye una redacción clara.

La obligación de scroll es una evidencia de interacción y un requisito de producto. La validez legal depende también de:

- Lenguaje claro.
- Información suficiente.
- Finalidades específicas.
- Libertad real para aceptar o rechazar.
- Separación entre consentimientos.
- Posibilidad de retirar los consentimientos opcionales.
- Conservación de una evidencia verificable.

---

# 6. Personas y roles

## 6.1 Visitante

Persona que llega desde la web pública y todavía no ha iniciado el formulario.

## 6.2 Solicitante adulto

Persona de 18 años o más que solicita su propia inscripción.

Actúa como:

- Alumno potencial.
- Persona de contacto.
- Interesado respecto a sus datos.

## 6.3 Responsable de un menor

Progenitor, tutor o representante que solicita la inscripción de una persona menor de 18 años.

Actúa como:

- Persona de contacto.
- Responsable de la solicitud.
- Declarante de su relación con el menor.
- Persona que toma las decisiones exigidas por la política de admisión del club.

## 6.4 Alumno menor

Persona menor de 18 años cuyos datos se incluyen en la solicitud.

La interfaz y los textos deberán proteger especialmente:

- Su identidad.
- Su fecha de nacimiento.
- Su imagen.
- Cualquier información relacionada con su salud.

## 6.5 Leo

Administrador principal de SAM GUK.

Puede:

- Recibir notificaciones.
- Revisar solicitudes.
- Registrar contactos.
- Registrar una cita o confirmación presencial.
- Registrar y verificar el pago.
- Aprobar o rechazar.
- Convertir una solicitud en alumno.

## 6.6 Personal autorizado

La V1 tendrá a Leo como usuario principal y podrá admitir únicamente personal expresamente autorizado con un esquema sencillo de permisos administrativos.

Los roles complejos quedan fuera del MVP.

Si en una fase posterior el sistema admite perfiles especializados:

- Cada cuenta será individual.
- No se compartirán credenciales.
- Los permisos serán mínimos.
- Toda acción quedará asociada a una identidad.

---

# 7. Modelo general de estados

Los estados deberán estar controlados por una máquina de estados. No serán etiquetas libres.

## 7.1 Estados antes del envío

### BORRADOR

El usuario ha empezado a introducir datos.

Características:

- No existe todavía una solicitud enviada.
- No aparece en el panel de Leo.
- No genera una notificación.

### DOCUMENTACIÓN_PENDIENTE

Los datos mínimos son válidos, pero falta leer o decidir uno o varios documentos.

### LISTO_PARA_ENVIAR

Los datos son válidos y todos los documentos tienen la evidencia y decisión requeridas.

### ENVIANDO

El sistema está procesando el envío final.

No deberá permitirse un segundo envío simultáneo.

## 7.2 Estados después del envío

### PENDIENTE_DE_REVISIÓN

Estado inicial de toda nueva solicitud.

Significa:

- La solicitud fue recibida.
- Leo todavía no la ha revisado.
- No hay plaza confirmada.

### EN_REVISIÓN

Leo ha abierto la solicitud y ha iniciado su análisis.

### CONTACTO_PENDIENTE

Leo ha revisado los datos y debe contactar con la familia.

### CONTACTADO

Existe al menos un contacto registrado con fecha, canal y resultado.

### CONFIRMACIÓN_PRESENCIAL_PENDIENTE

La familia ha sido contactada y se espera la visita o confirmación presencial.

### PAGO_PRESENCIAL_PENDIENTE

La confirmación presencial se realizó, pero todavía falta registrar el pago.

### LISTO_PARA_APROBAR

Se cumplen todas las condiciones previas:

- Datos revisados.
- Contacto registrado.
- Confirmación presencial registrada.
- Pago registrado y verificado.
- Documentos legales completos.
- Identidad del responsable revisada cuando corresponda.
- Sin conflictos de duplicidad.

### APROBADO

Leo ha aprobado manualmente la solicitud y el alumno definitivo ha sido creado.

### RECHAZADO

Leo ha decidido no aprobar la solicitud y existe un motivo interno registrado.

### CANCELADO

La persona interesada ha retirado la solicitud o ha informado que no continuará.

### DUPLICADO

La solicitud corresponde a otra ya existente y ha sido vinculada o archivada.

### CADUCADO

La solicitud no ha podido completarse después del plazo operativo definido.

## 7.3 Reglas de transición

- Solo una solicitud enviada puede pasar a PENDIENTE_DE_REVISIÓN.
- Solo Leo o una persona autorizada puede cambiar estados administrativos.
- Un pago registrado no cambia automáticamente a APROBADO.
- APROBADO siempre requiere una acción manual independiente.
- Una solicitud APROBADA no podrá volver a pendiente sin un procedimiento de corrección auditado.
- RECHAZADO, CANCELADO y DUPLICADO no crean alumnos.
- Todo cambio de estado guardará fecha, hora, identidad del actor y origen.

---

# 8. Entrada al flujo

## 8.1 Origen

El usuario podrá entrar desde:

- Cabecera pública.
- Hero.
- Tarjeta de clase.
- Horarios.
- Tarifas.
- Sección de proceso.
- CTA final.

Todos los botones utilizarán el texto “Inscribirse” o “Iniciar inscripción” cuando el contexto lo requiera.

## 8.2 Destino

La ruta principal será:

> `/inscripcion`

## 8.3 Contexto de grupo

Si el usuario pulsa desde una clase o tarifa, podrá conservarse el grupo:

- Infantil.
- Jóvenes.
- Adultos.

El grupo podrá transmitirse mediante un parámetro no sensible.

No se incluirán en la URL:

- Nombre.
- Teléfono.
- Correo.
- Fecha de nacimiento.
- Identificadores personales.

## 8.4 Primera impresión

Al llegar, el usuario verá directamente el formulario. No habrá una pantalla comercial adicional.

La parte superior mostrará:

- Logotipo SAM GUK.
- Título “Solicitud de inscripción”.
- Texto breve.
- Indicador de progreso.
- Enlace “Volver a la web”.

Texto recomendado:

> Completa los datos básicos. Leo revisará personalmente la solicitud y se pondrá en contacto contigo. La plaza se confirmará presencialmente y el pago será verificado por Leo.

---

# 9. Arquitectura de pantallas del solicitante

El flujo tendrá cinco pantallas principales:

1. Datos.
2. Documentos legales.
3. Revisión.
4. Envío.
5. Confirmación.

La lectura de cada documento utilizará una pantalla de detalle dentro del paso 2.

## 9.1 Indicador de progreso

Texto:

- Paso 1 de 3: Datos.
- Paso 2 de 3: Documentos.
- Paso 3 de 3: Revisar y enviar.

La pantalla de éxito no contará como paso.

El indicador:

- Será visible en todas las pantallas.
- No será una barra animada continua.
- Mostrará texto además de color.
- Permitirá comprender cuánto falta.
- No permitirá saltar a un paso no completado.

---

# 10. Pantalla 1: datos

## 10.1 Objetivo

Recoger la información mínima para que Leo pueda entender la solicitud y contactar.

## 10.2 Estructura

La pantalla tendrá:

1. Datos del alumno.
2. Datos de contacto.
3. Preferencias.
4. Aviso breve de privacidad.
5. Acciones.

## 10.3 Datos del alumno

### Nombre

Obligatorio.

Etiqueta:

> Nombre del alumno

Reglas:

- Entre 2 y 80 caracteres.
- Permitir letras, espacios, guiones y apóstrofes.
- Conservar tildes y caracteres propios del nombre.
- Eliminar espacios accidentales al inicio y al final.
- No transformar automáticamente a mayúsculas.

### Apellidos

Obligatorio.

Etiqueta:

> Apellidos del alumno

Reglas:

- Entre 2 y 120 caracteres.
- Mismas reglas de caracteres que el nombre.

### Fecha de nacimiento

Obligatoria.

Etiqueta:

> Fecha de nacimiento

Uso:

- Determinar si es menor.
- Sugerir grupo.
- Aplicar el flujo de responsable legal.

Reglas:

- No admitir fechas futuras.
- No admitir edades imposibles.
- La edad se calculará con la fecha local del club.
- No exponer la fecha en URLs o registros de analítica.

### Grupo de interés

Obligatorio.

Opciones:

- Infantil.
- Jóvenes.
- Adultos.
- No estoy seguro.

Comportamiento:

- Preseleccionar el grupo de origen si venía desde la web.
- Permitir cambiarlo.
- Avisar si la edad y el grupo parecen incompatibles.
- No impedir el envío si el usuario elige “No estoy seguro”.
- La asignación final corresponde a Leo.

### Experiencia previa

Opcional.

Opciones:

- Ninguna.
- He practicado taekwondo.
- He practicado otra disciplina.

No se pedirá grado, club anterior o historial detallado en la primera pantalla.

## 10.4 Datos de contacto para un adulto

Si el alumno tiene 18 años o más:

### Teléfono

Obligatorio.

Etiqueta:

> Teléfono de contacto

Reglas:

- Aceptar formato nacional e internacional.
- Normalizar para almacenamiento.
- No modificar visualmente mientras se escribe de forma confusa.
- Validar longitud y prefijo.

### Correo electrónico

Obligatorio.

Etiqueta:

> Correo electrónico

Reglas:

- Validación sintáctica.
- Conversión de dominio a formato normalizado.
- No alterar la parte local.
- Pedir confirmación solo si las pruebas muestran errores frecuentes.

### Canal de contacto preferido

Obligatorio.

Opciones:

- Llamada.
- WhatsApp.
- Correo electrónico.

La preferencia orienta a Leo, pero no obliga al club a utilizar exclusivamente ese canal.

## 10.5 Datos del responsable para un menor

Si el alumno tiene menos de 18 años, aparecerá una sección específica.

### Nombre del responsable

Obligatorio.

### Apellidos del responsable

Obligatorio.

### Relación con el alumno

Obligatoria.

Opciones:

- Madre.
- Padre.
- Tutor legal.
- Otro representante autorizado.

Si se elige otro:

- Mostrar un campo breve.
- No solicitar documentación online.
- Leo verificará presencialmente la representación.

### Teléfono del responsable

Obligatorio.

### Correo del responsable

Obligatorio.

### Canal de contacto preferido

Obligatorio.

### Declaración de capacidad

Se mostrará en la pantalla final, no como documento separado:

> Declaro que tengo capacidad para presentar esta solicitud en nombre del menor y que los datos facilitados son correctos.

Esta declaración será obligatoria antes del envío.

La verificación documental, si fuera necesaria, se realizará presencialmente.

## 10.6 Observaciones

Campo opcional.

Etiqueta:

> ¿Hay algo que quieras contarnos?

Ayuda:

> No incluyas datos médicos, bancarios ni documentación personal. Podrás hablar directamente con Leo.

Reglas:

- Máximo 500 caracteres.
- Texto plano.
- Sin archivos.
- Sin enlaces activos automáticos.

## 10.7 Datos que no se pedirán

No se solicitarán online en esta fase:

- DNI o NIE.
- Fotografía de documento.
- Dirección completa.
- Número de cuenta.
- Tarjeta bancaria.
- Información médica.
- Diagnósticos.
- Medicación.
- Informes.
- Datos de emergencia.
- Fotografía del alumno.
- Copias de libro de familia.
- Archivos adjuntos.

Estos datos solo se incorporarán en fases posteriores si son necesarios, existe una base jurídica adecuada y se documenta el tratamiento.

## 10.8 Aviso de privacidad de primera capa

Antes de continuar, la pantalla mostrará un resumen visible.

Deberá incluir:

- Identidad del responsable.
- Finalidad: gestionar la solicitud y contactar.
- Base jurídica validada.
- Destinatarios o ausencia de cesiones.
- Plazo o criterio de conservación.
- Derechos.
- Enlace a información completa.

El usuario leerá después la política completa en el paso legal.

Este aviso es necesario porque los datos empiezan a tratarse desde el momento en que se guardan o transmiten, no únicamente al final.

## 10.9 Botones

### Volver a la web

- Estilo secundario.
- Pide confirmación si hay datos introducidos.

Mensaje:

> Si vuelves a la web, perderás los datos que todavía no se hayan guardado. ¿Quieres salir?

Acciones:

- Seguir con la solicitud.
- Salir de la inscripción.

### Continuar con documentos

- Botón principal.
- Solo avanza si todos los campos obligatorios son válidos.
- Al pulsar, muestra validaciones y lleva el foco al primer error.

---

# 11. Validación del formulario

## 11.1 Momento de validación

La validación se realizará:

- Al abandonar un campo cuando sea útil.
- Al pulsar “Continuar con documentos”.
- En el servidor antes del envío final.

No se mostrarán errores agresivos mientras el usuario todavía está escribiendo.

## 11.2 Presentación de errores

Cada error:

- Aparecerá junto al campo.
- Utilizará texto claro.
- Incluirá un icono solo como apoyo.
- No dependerá únicamente del color.
- Estará asociado semánticamente al campo.

En la parte superior aparecerá un resumen si hay varios errores.

## 11.3 Mensajes exactos

### Campo vacío

> Completa este campo para continuar.

### Nombre demasiado corto

> Revisa el nombre del alumno.

### Apellidos demasiado cortos

> Revisa los apellidos del alumno.

### Fecha futura

> La fecha de nacimiento no puede ser futura.

### Fecha no válida

> Introduce una fecha de nacimiento válida.

### Correo no válido

> Introduce un correo electrónico válido.

### Teléfono no válido

> Introduce un teléfono válido, incluyendo el prefijo si es internacional.

### Responsable obligatorio

> Para inscribir a un menor necesitamos los datos de su responsable.

### Relación no indicada

> Indica tu relación con el alumno.

### Canal no seleccionado

> Elige cómo prefieres que Leo contacte contigo.

### Observaciones demasiado largas

> El mensaje no puede superar los 500 caracteres.

### Grupo posiblemente incorrecto

No será un error bloqueante.

> Por la edad indicada, quizá corresponda otro grupo. Puedes continuar y Leo lo confirmará contigo.

## 11.4 Preservación de datos

Si existe un error:

- Ningún campo válido se borrará.
- La fecha no se reseteará.
- El grupo seleccionado se mantendrá.
- La posición de scroll se dirigirá de forma accesible al resumen o primer error.

---

# 12. Gestión del borrador

## 12.1 Objetivo

Evitar pérdida accidental sin conservar datos más tiempo del necesario.

## 12.2 Estrategia recomendada

El sistema podrá crear un borrador temporal protegido después de que el usuario pulse “Continuar con documentos”.

Características:

- Identificador aleatorio no predecible.
- Asociado a una sesión segura.
- Sin identificador personal en la URL.
- Cifrado en tránsito y en reposo.
- Caducidad corta.
- No visible en el panel de Leo.
- No genera notificación.
- Se elimina si no se envía dentro del plazo definido.

Plazo de referencia:

> 24 horas.

El plazo definitivo deberá validarse en la política de conservación.

## 12.3 Datos en navegador

- No guardar datos personales en almacenamiento local permanente.
- No incluir datos en parámetros de URL.
- No enviar datos a herramientas de analítica.
- No registrar valores de campos en logs de frontend.

## 12.4 Sesión caducada

Mensaje:

> La sesión de inscripción ha caducado para proteger tus datos.

Acciones:

- Empezar de nuevo.
- Volver a la web.

Si es posible recuperar un borrador seguro y vigente, se ofrecerá:

> Continuar mi solicitud.

---

# 13. Pantalla 2: centro de documentos legales

## 13.1 Objetivo

Conseguir que el usuario lea todos los documentos aplicables y registre cada aceptación o decisión de forma separada.

## 13.2 Cabecera

Título:

> Documentos y consentimientos

Texto:

> Debes abrir cada documento y llegar hasta el final para poder registrar tu decisión.

Indicador:

> 0 de 4 completados

## 13.3 Documentos obligatorios

El centro mostrará cuatro documentos:

1. Información sobre protección de datos.
2. Condiciones de la solicitud y admisión.
3. Normas básicas del club.
4. Autorización de imagen y vídeo.

El número definitivo podrá cambiar si la revisión jurídica lo exige, pero ningún documento podrá ocultarse dentro de otro para reducir pasos artificialmente.

## 13.4 Estado visual de cada documento

Cada documento mostrará uno de estos estados:

- Pendiente de leer.
- Lectura iniciada.
- Llegaste al final.
- Aceptado.
- Decisión registrada.
- Rechazado, solo para decisiones opcionales.
- Actualizado, debes leerlo de nuevo.

El estado no dependerá únicamente del color.

## 13.5 Tarjeta de documento

Cada elemento tendrá:

- Nombre.
- Descripción de una línea.
- Versión.
- Fecha de vigencia.
- Estado.
- Botón.

Botones posibles:

- Leer documento.
- Continuar leyendo.
- Revisar documento.
- Cambiar decisión.

## 13.6 Botón de continuación

Texto:

> Revisar solicitud

Permanecerá desactivado hasta que:

- Todos los documentos obligatorios hayan llegado al final.
- Todas las aceptaciones obligatorias estén marcadas.
- La autorización de imagen tenga una decisión explícita.

Mensaje al intentar continuar:

> Completa todos los documentos antes de continuar.

---

# 14. Documento 1: información sobre protección de datos

## 14.1 Objetivo

Informar de forma completa sobre el tratamiento de datos personales.

## 14.2 Contenido mínimo

- Identidad y contacto del responsable.
- Datos de contacto del delegado de protección de datos, si existe.
- Datos recogidos.
- Finalidades.
- Base jurídica de cada finalidad.
- Destinatarios.
- Encargados relevantes.
- Transferencias internacionales, si existen.
- Plazos o criterios de conservación.
- Derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad cuando correspondan.
- Derecho a retirar consentimientos.
- Derecho a reclamar ante la AEPD.
- Consecuencias de no facilitar datos obligatorios.
- Existencia o ausencia de decisiones automatizadas.
- Tratamiento específico de menores.
- Medidas de contacto para ejercer derechos.

## 14.3 Acción final

La acción no se redactará como:

> Acepto el RGPD.

El RGPD no es un consentimiento genérico.

Texto recomendado:

> He leído y entiendo la información sobre el tratamiento de datos para gestionar esta solicitud.

Esta confirmación:

- Será obligatoria.
- No estará marcada por defecto.
- Solo se habilitará al llegar al final.

## 14.4 Base jurídica

La base jurídica para gestionar la solicitud deberá ser definida por asesoramiento legal.

No se utilizará el consentimiento como base universal para todo.

El sistema deberá permitir distinguir:

- Gestión de la solicitud.
- Relación contractual futura.
- Obligaciones legales.
- Uso de imagen.
- Comunicaciones opcionales.

---

# 15. Documento 2: condiciones de solicitud y admisión

## 15.1 Objetivo

Explicar qué significa enviar la solicitud.

## 15.2 Contenido mínimo

- El envío no confirma una plaza.
- Leo revisará manualmente.
- El club podrá contactar para aclarar datos.
- La asignación de grupo es provisional.
- La admisión depende de disponibilidad y validación.
- El pago se realiza en efectivo o mediante transferencia verificada, si este segundo método está habilitado.
- El pago no se procesa online.
- La aprobación final es manual.
- La solicitud puede cancelarse.
- Los datos deben ser correctos.
- La persona solicitante debe comunicar cambios relevantes.
- El club podrá rechazar solicitudes por motivos legítimos y no discriminatorios.
- El régimen de devolución, si hubiera pagos posteriores, pertenecerá a la documentación económica.

## 15.3 Acción final

Texto:

> He leído y acepto las condiciones de solicitud y admisión.

Reglas:

- Obligatoria.
- No premarcada.
- Habilitada solo al llegar al final.

---

# 16. Documento 3: normas básicas del club

## 16.1 Objetivo

Informar sobre los principios de convivencia y funcionamiento antes de la confirmación presencial.

## 16.2 Contenido mínimo

- Respeto a instructores y compañeros.
- Puntualidad.
- Uso adecuado de instalaciones.
- Normas básicas de higiene.
- Equipación requerida.
- Seguridad durante la práctica.
- Seguimiento de instrucciones.
- Conducta de acompañantes.
- Comunicación de ausencias cuando corresponda.
- Procedimiento de incidencias.
- Consecuencias de incumplimientos graves.

Las normas deben ser:

- Proporcionales.
- Comprensibles.
- Aplicables.
- No discriminatorias.
- Coherentes con la edad.

## 16.3 Acción final

Texto:

> He leído y acepto las normas básicas de SAM GUK.

Reglas:

- Obligatoria.
- No premarcada.
- Disponible solo al llegar al final.

---

# 17. Documento 4: autorización de imagen y vídeo

## 17.1 Principio

La autorización de imagen es independiente de la inscripción.

Negarse:

- No bloqueará el envío.
- No reducirá la prioridad de la solicitud.
- No impedirá ser alumno.
- No generará mensajes de advertencia comercial.

## 17.2 Lectura obligatoria

El documento debe abrirse y recorrerse hasta el final.

Solo después se habilitarán las decisiones.

## 17.3 Contenido mínimo

- Qué imágenes pueden captarse.
- En qué actividades.
- Con qué finalidad.
- En qué canales.
- Si habrá publicaciones abiertas.
- Si podrán aparecer grupos.
- Si se asociará el nombre.
- Durante cuánto tiempo.
- Cómo retirar la autorización.
- Qué ocurre con publicaciones ya realizadas.
- Contacto para solicitar retirada.
- Tratamiento específico de menores.

## 17.4 Decisiones

No habrá una única casilla obligatoria de autorización.

El usuario elegirá:

### No autorizo

Texto:

> No autorizo el uso de imagen o vídeo con fines de comunicación pública.

### Autorizo de forma seleccionada

El usuario podrá seleccionar canales:

- Web oficial de SAM GUK.
- Redes sociales oficiales.
- Material impreso del club.
- Comunicaciones privadas a familias del club.

Ningún canal estará seleccionado por defecto.

## 17.5 Publicación con nombre

La publicación del nombre junto a una imagen requerirá una decisión específica si se contempla.

Por defecto:

- No publicar apellidos.
- No identificar individualmente a menores.
- No inferir autorización de nombre a partir de la autorización de imagen.

## 17.6 Menores

La política operativa de SAM GUK exigirá intervención del responsable para cualquier alumno menor de 18 años.

En alumnos de 14 a 17 años deberá valorarse, además, una información adaptada y la participación del menor en la decisión.

La redacción final deberá revisarse jurídicamente según:

- Edad.
- Tipo de publicación.
- Relación con el club.
- Canales.
- Alcance de la difusión.

## 17.7 Retirada

El documento explicará:

- Cómo retirar la autorización.
- Que retirarla será tan sencillo como concederla.
- Que la retirada afectará a usos futuros.
- Que se gestionará la retirada de publicaciones controladas por el club.
- Que pueden existir límites prácticos en materiales ya impresos o redistribuidos, que deberán explicarse legalmente.

## 17.8 Evidencia

El sistema guardará por canal:

- Autorizado.
- No autorizado.
- Fecha.
- Versión del documento.
- Persona que decide.
- Relación con el menor.

---

# 18. Comportamiento obligatorio de scroll

## 18.1 Regla principal

El usuario no podrá marcar una aceptación ni registrar una decisión hasta que haya llegado al final del documento mediante scroll.

## 18.2 Pantalla de lectura

Cada documento se abrirá en una pantalla dedicada.

La pantalla tendrá:

- Cabecera con nombre del documento.
- Número de documento.
- Versión.
- Fecha de vigencia.
- Área de lectura.
- Indicador de progreso.
- Zona de decisión al final.
- Acción para volver al centro legal.

## 18.3 Scroll en móvil

En móvil se utilizará scroll natural de página.

No se introducirá un contenedor pequeño con doble scroll.

La cabecera podrá permanecer fija mostrando:

- Documento 1 de 4.
- Progreso de lectura.
- Volver.

La zona de decisión estará después del contenido.

## 18.4 Scroll en escritorio

En escritorio:

- El documento se presentará en una columna de lectura de 680 a 780 px.
- Podrá existir un índice lateral.
- El scroll principal seguirá siendo natural.
- No se obligará a leer dentro de una ventana modal pequeña.

## 18.5 Detección de final

El sistema considerará alcanzado el final cuando:

- El marcador final del documento entra en la zona visible.
- El contenido ha terminado de cargar.
- La versión mostrada coincide con la versión activa.

No se utilizará únicamente una comparación frágil de píxeles.

## 18.6 Formas válidas de llegar al final

Se admitirán:

- Desplazamiento táctil.
- Rueda del ratón.
- Barra de scroll.
- Teclas de dirección.
- Page Down.
- Fin o End.
- Navegación de lector de pantalla.

No se impondrá un tiempo mínimo de lectura.

Un tiempo mínimo:

- No demuestra comprensión.
- Penaliza a lectores rápidos.
- Puede crear barreras de accesibilidad.

## 18.7 Estado bloqueado

Antes de llegar al final:

- La casilla o decisión estará desactivada.
- Se mostrará un candado o indicador secundario.
- El texto explicará el motivo.

Mensaje:

> Llega al final del documento para habilitar esta opción.

## 18.8 Estado habilitado

Al llegar al final:

- La opción se habilitará.
- Se anunciará a tecnologías de asistencia.
- No se marcará automáticamente.

Mensaje accesible:

> Has llegado al final. Ya puedes registrar tu decisión.

## 18.9 No aceptación automática

Llegar al final nunca implicará:

- Aceptación.
- Autorización de imagen.
- Avance automático.
- Cierre del documento.

El usuario deberá realizar una acción explícita.

## 18.10 Documento corto

Incluso si el contenido cabe visualmente:

- La zona final deberá ser alcanzada.
- El usuario deberá llegar al marcador final.
- La decisión seguirá requiriendo una acción.

No se añadirá relleno artificial para simular longitud.

## 18.11 Cambio de versión

Si un documento cambia después de haber sido leído y antes del envío:

- La aceptación anterior se invalidará.
- El estado pasará a “Actualizado”.
- El usuario deberá leer la nueva versión.

Mensaje:

> Este documento se ha actualizado. Revísalo de nuevo antes de enviar la solicitud.

## 18.12 Salida accidental

Si el usuario vuelve al centro legal:

- Se conservará el punto de lectura.
- Se conservará una decisión ya guardada.
- Podrá revisar y cambiar una decisión.

## 18.13 Apertura externa

Se podrá ofrecer:

- Descargar.
- Imprimir.
- Abrir una copia accesible.

Sin embargo, abrir el documento fuera del lector no sustituirá el registro de llegada al final dentro del flujo.

---

# 19. Evidencia de lectura y consentimiento

## 19.1 Datos mínimos de evidencia

Por cada documento se guardará:

- Tipo de documento.
- Identificador interno.
- Versión.
- Huella o referencia de integridad.
- Fecha de publicación.
- Fecha y hora de apertura.
- Fecha y hora de llegada al final.
- Fecha y hora de aceptación o decisión.
- Texto exacto de la acción.
- Identidad del solicitante o responsable.
- Relación con el menor cuando aplique.
- Canal o finalidades autorizadas.
- Identificador de solicitud.

## 19.2 Datos que no se recogerán por defecto

No se guardarán sin justificación:

- Grabaciones de pantalla.
- Movimientos exactos del cursor.
- Velocidad de lectura.
- Cada posición de scroll.
- Historial completo de navegación.
- Datos biométricos.

## 19.3 Dirección IP

La IP es un dato personal.

Solo se guardará como evidencia si:

- La revisión jurídica lo considera necesario.
- Existe un plazo de conservación definido.
- Se informa de ello.
- Se limita el acceso.

Si no es necesaria, se preferirá:

- Identificador de sesión.
- Marca temporal.
- Versión documental.
- Registro de acción.

## 19.4 Recibo de consentimiento

El sistema deberá poder generar una evidencia legible que muestre:

- Qué se informó.
- Qué se aceptó.
- Qué se rechazó.
- En qué momento.
- Bajo qué versión.

Esta evidencia será accesible solo para personal autorizado y para atender derechos o incidencias.

---

# 20. Pantalla 3: revisar y enviar

## 20.1 Objetivo

Permitir detectar errores antes de crear la solicitud definitiva.

## 20.2 Resumen de datos

Se mostrarán:

- Alumno.
- Fecha de nacimiento.
- Grupo de interés.
- Datos de contacto.
- Responsable, si existe.
- Canal preferido.
- Observaciones.

Los datos no deberán ocultarse parcialmente al propio solicitante salvo información especialmente sensible, que no debería existir en este formulario.

## 20.3 Resumen legal

Se mostrará una fila por documento:

- Nombre.
- Versión.
- Estado.
- Acción “Revisar”.

Ejemplo:

- Protección de datos: leído y confirmado.
- Condiciones: aceptadas.
- Normas: aceptadas.
- Imagen: no autorizada.

La decisión de imagen no se presentará con lenguaje negativo o de advertencia.

## 20.4 Declaraciones finales

### Exactitud

Obligatoria:

> Confirmo que los datos facilitados son correctos.

### Representación de menor

Obligatoria cuando corresponda:

> Declaro que tengo capacidad para presentar esta solicitud en nombre del menor.

### Naturaleza de la solicitud

Texto informativo visible:

> Enviar esta solicitud no confirma una plaza. Leo se pondrá en contacto contigo y la inscripción se completará presencialmente.

## 20.5 Botones

### Editar datos

- Regresa a pantalla 1.
- Conserva documentos y decisiones si siguen siendo aplicables.
- Si cambia la fecha y cambia la condición de menor, invalida documentos dependientes.

### Revisar documentos

- Regresa al centro legal.

### Enviar solicitud

- Botón principal.
- Texto exacto.
- No utilizar “Completar inscripción”.
- No utilizar “Confirmar plaza”.

Solo estará habilitado si:

- Datos válidos.
- Documentos completos.
- Declaraciones finales marcadas.
- Sesión vigente.

---

# 21. Proceso técnico de envío

## 21.1 Prevención de doble envío

Al pulsar:

- El botón se deshabilitará.
- El texto cambiará a “Enviando solicitud...”.
- Aparecerá un indicador de progreso.
- No se recargará la página.

La solicitud utilizará una clave de idempotencia.

Pulsar dos veces o repetir por mala conexión no deberá crear duplicados.

## 21.2 Validación de servidor

El servidor volverá a validar:

- Campos obligatorios.
- Formatos.
- Edad.
- Responsable de menor.
- Estado de documentos.
- Versiones legales.
- Declaraciones.
- Coherencia del grupo.
- Integridad de la sesión.
- Límites antiabuso.

Nunca se confiará únicamente en la validación del navegador.

## 21.3 Transacción

El envío definitivo deberá registrar de forma atómica:

1. Solicitud.
2. Datos del alumno potencial.
3. Datos del responsable.
4. Decisiones legales.
5. Evidencias de documentos.
6. Estado PENDIENTE_DE_REVISIÓN.
7. Primer evento de historial.
8. Evento de notificación.

Si una parte falla:

- No se creará una solicitud incompleta.
- Se revertirá la operación.
- El usuario podrá reintentar.

## 21.4 Identificador

Se generará una referencia no predecible.

Formato visual de ejemplo:

> SG-2026-8F3K2

La referencia:

- No expondrá el número total de solicitudes.
- No servirá por sí sola para consultar datos personales.
- Se mostrará al usuario.
- Se incluirá en comunicaciones.

## 21.5 Detección de duplicados

El sistema podrá detectar coincidencias por:

- Nombre normalizado.
- Fecha de nacimiento.
- Teléfono.
- Correo.

La detección:

- No bloqueará automáticamente.
- Marcará para revisión.
- No revelará al usuario si otra persona ya existe.

Mensaje público:

> Hemos recibido la solicitud. Leo revisará los datos y se pondrá en contacto contigo.

---

# 22. Errores durante el envío

## 22.1 Error temporal

Mensaje:

> No hemos podido enviar la solicitud en este momento. Tus datos siguen aquí. Inténtalo de nuevo.

Botones:

- Reintentar.
- Volver a revisar.

## 22.2 Sin conexión

Mensaje:

> Parece que no tienes conexión. Comprueba internet y vuelve a intentarlo.

No se borrarán datos.

## 22.3 Sesión caducada

Mensaje:

> La sesión ha caducado para proteger tus datos. Debes revisar de nuevo la información antes de enviar.

Si el borrador es recuperable:

- Recuperar datos.
- Volver a documentos actualizados.

## 22.4 Documento actualizado

Mensaje:

> Uno de los documentos legales ha cambiado. Revísalo antes de enviar.

Acción:

> Revisar documento.

## 22.5 Error de validación del servidor

Mensaje general:

> Revisa los campos indicados.

El sistema volverá al paso correspondiente y conservará el resto.

## 22.6 Servicio no disponible

Mensaje:

> La inscripción online está temporalmente no disponible. Puedes volver a intentarlo más tarde o contactar con SAM GUK.

El contacto no sustituirá silenciosamente el proceso. Leo deberá poder crear después una solicitud interna con la evidencia adecuada si se continúa por otra vía.

---

# 23. Pantalla 4: solicitud recibida

## 23.1 Título

> Solicitud recibida

## 23.2 Mensaje principal

> Hemos enviado tu solicitud a SAM GUK. Leo la revisará y se pondrá en contacto contigo personalmente.

## 23.3 Aviso obligatorio

> La plaza todavía no está confirmada. Leo confirmará personalmente el alta y verificará el pago antes de aprobarla.

## 23.4 Información mostrada

- Número de referencia.
- Nombre de pila del alumno.
- Grupo solicitado.
- Canal de contacto elegido.
- Próximo paso.

No se mostrará toda la información personal.

## 23.5 Próximos pasos

1. Leo revisará la solicitud.
2. Contactará personalmente.
3. Se acordará la confirmación presencial.
4. El pago se realizará en el club.
5. Leo confirmará el alta definitiva.

## 23.6 Botones

### Volver a SAM GUK

Destino:

> `/`

### Consultar por WhatsApp

Secundario.

Solo aparecerá si existe un número oficial y atendido.

El mensaje predefinido incluirá únicamente la referencia, no datos del menor.

## 23.7 Lenguaje prohibido

No se mostrará:

- Inscripción completada.
- Ya eres alumno.
- Plaza reservada.
- Pago pendiente online.
- Bienvenido oficialmente.

---

# 24. Confirmación por correo al solicitante

## 24.1 Momento

Se enviará después de registrar correctamente la solicitud.

## 24.2 Asunto

> SAM GUK ha recibido tu solicitud

No incluirá:

- Nombre completo del menor.
- Fecha de nacimiento.
- Grupo si pudiera revelar información innecesaria.

## 24.3 Contenido

- Confirmación de recepción.
- Referencia.
- Explicación del siguiente paso.
- Aviso de que no hay plaza confirmada.
- Información de que el pago será manualmente verificado.
- Datos de contacto.
- Resumen de privacidad.
- Mecanismo para solicitar rectificación o retirada.

## 24.4 Adjuntos

No se adjuntarán documentos con datos personales por defecto.

Se podrá incluir un recibo de consentimientos mediante enlace seguro si la revisión jurídica y técnica lo aprueba.

## 24.5 Fallo de correo

Un fallo de correo:

- No invalidará la solicitud.
- Se registrará para reintento.
- Se mostrará la confirmación en pantalla.
- Se marcará internamente.

---

# 25. Notificación a Leo

## 25.1 Canales

Canales mínimos:

- Notificación dentro del panel.
- Correo administrativo.

Canales futuros:

- Notificación móvil.
- Mensajería empresarial autorizada.

No se utilizará una cuenta personal no controlada para enviar datos sensibles.

## 25.2 Asunto del correo

> Nueva solicitud de inscripción en SAM GUK

## 25.3 Contenido

- Referencia.
- Fecha y hora.
- Grupo solicitado.
- Enlace seguro al panel.

No incluirá en el correo:

- Fecha de nacimiento.
- Datos completos del menor.
- Observaciones.
- Consentimientos.
- Información médica.

Leo deberá autenticarse para consultar el detalle.

## 25.4 Notificación dentro del panel

Mostrará:

- Icono.
- Texto “Nueva solicitud”.
- Referencia.
- Hora.
- Estado.
- Acción “Ver solicitud”.

## 25.5 Garantía de entrega

El envío de notificaciones utilizará un mecanismo de cola o salida transaccional.

Si falla:

- La solicitud seguirá guardada.
- Se reintentará.
- El panel seguirá mostrando la solicitud.
- Se generará una alerta operativa si se agotan reintentos.

---

# 26. Experiencia administrativa: lista de solicitudes

## 26.1 Ubicación

El panel tendrá una sección:

> Solicitudes

No se mezclarán solicitudes pendientes con alumnos activos.

## 26.2 Contador

La navegación mostrará:

- Número de solicitudes nuevas.
- Solo las no revisadas.

## 26.3 Columnas

- Fecha.
- Referencia.
- Alumno.
- Edad.
- Grupo.
- Responsable o contacto.
- Estado.
- Última actividad.
- Acción.

## 26.4 Filtros

- Nuevas.
- En revisión.
- Contacto pendiente.
- Contactadas.
- Confirmación presencial pendiente.
- Pago pendiente.
- Listas para aprobar.
- Aprobadas.
- Cerradas.

## 26.5 Orden

Por defecto:

- Más recientes primero.
- Las pendientes antiguas deberán señalarse.

## 26.6 Búsqueda

Podrá buscar por:

- Nombre.
- Referencia.
- Teléfono.
- Correo.

La búsqueda:

- Requerirá acceso autorizado.
- No enviará términos a analítica.
- No registrará consultas en logs innecesarios.

## 26.7 Acciones de fila

Botón principal:

> Ver solicitud

No habrá acciones destructivas directas en la tabla.

---

# 27. Experiencia administrativa: detalle de solicitud

## 27.1 Cabecera

Mostrará:

- Estado.
- Referencia.
- Fecha.
- Nombre del alumno.
- Grupo solicitado.
- Próxima acción recomendada.

## 27.2 Bloques

1. Datos del alumno.
2. Responsable o contacto.
3. Preferencias.
4. Documentos y consentimientos.
5. Historial.
6. Contactos.
7. Confirmación presencial.
8. Pago.
9. Decisión.

## 27.3 Datos del alumno

- Nombre.
- Apellidos.
- Fecha de nacimiento.
- Edad calculada.
- Grupo solicitado.
- Grupo sugerido.
- Experiencia previa.
- Observaciones.

## 27.4 Responsable

Cuando exista:

- Nombre.
- Apellidos.
- Relación.
- Teléfono.
- Correo.
- Canal preferido.
- Estado de verificación presencial.

## 27.5 Documentos

Por documento:

- Nombre.
- Versión.
- Fecha de aceptación.
- Decisión.
- Evidencia.

Para imagen:

- Canales autorizados.
- Canales no autorizados.
- Persona que consintió.
- Estado de retirada.

## 27.6 Historial

Orden cronológico.

Eventos:

- Solicitud recibida.
- Abierta por Leo.
- Estado cambiado.
- Contacto registrado.
- Cita registrada.
- Confirmación presencial.
- Pago registrado.
- Consentimiento actualizado.
- Aprobación.
- Rechazo.
- Cancelación.

El historial no podrá editarse silenciosamente.

---

# 28. Revisión inicial de Leo

## 28.1 Apertura

Al abrir una solicitud nueva:

- Se registra la apertura.
- Puede pasar a EN_REVISIÓN.
- La insignia de nueva desaparece.

## 28.2 Comprobaciones

Leo revisará:

- Datos completos.
- Edad.
- Grupo.
- Datos de contacto.
- Responsable.
- Duplicados.
- Documentos.
- Decisión de imagen.
- Observaciones.

## 28.3 Posibles acciones

- Marcar contacto pendiente.
- Registrar contacto.
- Solicitar aclaración.
- Marcar posible duplicado.
- Rechazar.
- Cancelar a petición.

## 28.4 Corrección de datos

Si Leo corrige un dato:

- Se registrará el valor anterior.
- Se registrará el valor nuevo.
- Se registrará quién lo cambió.
- Se añadirá el motivo.

Los cambios relevantes deberán confirmarse con la persona.

---

# 29. Contacto personal

## 29.1 Regla

Leo debe contactar personalmente antes de la confirmación.

## 29.2 Botón

> Registrar contacto

## 29.3 Datos del contacto

- Fecha y hora.
- Canal.
- Resultado.
- Notas breves.
- Próximo paso.

Canales:

- Llamada.
- WhatsApp.
- Correo.
- Presencial.

Resultados:

- Contactado.
- Sin respuesta.
- Volver a llamar.
- Datos incorrectos.
- No interesado.
- Cita acordada.

## 29.4 Notas

Las notas:

- Serán objetivas.
- No incluirán juicios personales.
- No incluirán datos médicos salvo procedimiento autorizado.
- No copiarán conversaciones completas.

## 29.5 Intento sin respuesta

No pasará a CONTACTADO.

Se mantendrá:

> CONTACTO_PENDIENTE

Se podrá programar seguimiento.

## 29.6 Contacto exitoso

Al registrar un contacto exitoso:

- Estado CONTACTADO.
- Se habilita la preparación de confirmación presencial.

---

# 30. Confirmación presencial

## 30.1 Objetivo

Confirmar personalmente:

- Interés.
- Grupo.
- Horario.
- Condiciones.
- Identidad del responsable cuando corresponda.
- Información adicional necesaria.
- Forma de pago.

## 30.2 Botón

> Registrar confirmación presencial

## 30.3 Campos

- Fecha.
- Persona atendida.
- Responsable verificado.
- Grupo definitivo.
- Horario.
- Observaciones operativas.
- Confirmación de condiciones.

## 30.4 Datos adicionales

Los datos que deban recogerse presencialmente se gestionarán en un proceso separado y seguro.

No deberán añadirse a las observaciones de forma improvisada.

## 30.5 Resultado

Opciones:

- Confirmado, pendiente de pago.
- Necesita seguimiento.
- No continúa.
- Requiere revisión.

Solo “Confirmado, pendiente de pago” habilita el registro de pago como siguiente paso.

---

# 31. Pago manualmente verificado

## 31.1 Regla

El flujo no incluye pago online.

El pago se registra y verifica manualmente por Leo.

En la V1 podrá realizarse mediante:

- Efectivo.
- Transferencia, únicamente si Leo decide habilitarla y después de verificar que el importe fue recibido.

La transferencia podrá realizarse antes o durante la confirmación presencial, pero nunca se considerará pagada hasta que Leo la verifique.

No se implementarán:

- Pasarela online.
- Pago con tarjeta online.
- Bizum automático.
- Domiciliación.
- Confirmación automática por proveedor externo.

## 31.2 Botón

> Registrar pago

## 31.3 Campos

- Solicitud y futuro alumno.
- Concepto.
- Importe.
- Moneda.
- Fecha.
- Método.
- Referencia opcional.
- Persona que recibe.
- Recibo emitido.

Métodos:

- Efectivo.
- Transferencia verificada, si está habilitada.

El pago quedará vinculado a la solicitud mientras no exista un alumno.

Cuando Leo apruebe:

- El alumno se creará.
- El pago existente se vinculará al nuevo alumno dentro de la misma operación.
- No se duplicará el pago.

## 31.4 Validaciones

- Importe mayor que cero.
- Moneda definida.
- Fecha no futura, salvo registro programado no confirmado.
- Método obligatorio.
- Concepto obligatorio.
- Una transferencia requiere fecha de verificación.
- No guardar credenciales bancarias.

## 31.5 Recibo

La gestión detallada pertenecerá a `05_PAYMENTS_RECEIPTS.md`.

El pago podrá generar un recibo, pero:

- El recibo no aprueba al alumno.
- El pago no cambia automáticamente a APROBADO.

## 31.6 Estado

Cuando el pago sea válido:

- Se registra.
- La solicitud pasa a LISTO_PARA_APROBAR si cumple el resto.

---

# 32. Aprobación manual

## 32.1 Regla principal

Solo Leo o una persona con permiso específico podrá aprobar.

## 32.2 Botón

> Aprobar alumno

Será la acción administrativa más sensible del flujo.

## 32.3 Condiciones de habilitación

El botón permanecerá deshabilitado hasta que:

- La solicitud esté revisada.
- Exista contacto exitoso.
- Exista confirmación presencial.
- Exista pago registrado.
- Los documentos sean válidos.
- La decisión de imagen esté registrada.
- No exista duplicidad pendiente.
- El grupo definitivo esté seleccionado.
- El responsable esté validado cuando aplique.

## 32.4 Mensaje de bloqueo

> Completa los pasos pendientes antes de aprobar al alumno.

Se mostrará una lista concreta.

## 32.5 Confirmación

Al pulsar se abrirá una confirmación con:

- Nombre.
- Grupo.
- Horario.
- Pago.
- Responsable.
- Estado legal.

Texto:

> Esta acción creará un alumno activo y cerrará la solicitud. Revisa los datos antes de continuar.

Botones:

- Volver.
- Confirmar aprobación.

## 32.6 Autenticación reforzada

Según el nivel de riesgo, podrá requerirse:

- Contraseña reciente.
- Segundo factor.
- Reautenticación.

## 32.7 Transacción de aprobación

La aprobación deberá realizar atómicamente:

1. Validar condiciones.
2. Crear alumno.
3. Vincular responsable.
4. Copiar datos necesarios.
5. Vincular consentimientos vigentes.
6. Vincular pago.
7. Cambiar solicitud a APROBADO.
8. Registrar auditoría.
9. Generar notificación de confirmación.

Si falla cualquier parte:

- No se creará un alumno parcial.
- La solicitud seguirá lista para aprobar.
- Leo verá un error recuperable.

## 32.8 Resultado

Mensaje:

> Alumno aprobado correctamente.

Información:

- Número de alumno.
- Grupo.
- Fecha de alta.
- Acceso al perfil.

Botón:

> Ver perfil del alumno

---

# 33. Creación del alumno definitivo

## 33.1 Momento

Solo después de APROBADO.

## 33.2 Datos transferidos

- Identidad.
- Fecha de nacimiento.
- Grupo definitivo.
- Contacto.
- Responsable.
- Fecha de alta.
- Consentimientos vigentes.
- Referencia de solicitud.
- Pago inicial.

## 33.3 Datos que no se copian automáticamente

- Notas internas irrelevantes.
- Intentos de contacto sin valor operativo.
- Metadatos técnicos.
- Datos temporales.
- Información caducada.

## 33.4 Vinculación

La solicitud permanecerá vinculada para:

- Auditoría.
- Trazabilidad.
- Atención de derechos.
- Verificación de consentimientos.

No aparecerá como solicitud pendiente.

---

# 34. Confirmación definitiva a la familia

## 34.1 Momento

Después de aprobación.

## 34.2 Asunto

> Inscripción confirmada en SAM GUK

## 34.3 Contenido

- Confirmación real.
- Nombre de pila.
- Grupo.
- Horario.
- Fecha de alta.
- Información práctica.
- Contacto.
- Recordatorio de privacidad.

## 34.4 Diferencia con el primer correo

Primer correo:

> Solicitud recibida.

Correo final:

> Inscripción confirmada.

Estos mensajes nunca se confundirán.

---

# 35. Rechazo, cancelación y duplicidad

## 35.1 Rechazo

Botón:

> No aprobar solicitud

Requiere:

- Motivo interno.
- Confirmación.
- Decisión sobre comunicación.

El motivo interno deberá ser:

- Objetivo.
- Legítimo.
- No discriminatorio.

Mensaje administrativo:

> La solicitud se cerrará sin crear un alumno.

## 35.2 Cancelación

Se utiliza cuando:

- La familia retira la solicitud.
- El adulto decide no continuar.

Debe registrar:

- Fecha.
- Canal.
- Motivo opcional.

## 35.3 Duplicidad

El sistema mostrará posibles coincidencias.

Leo podrá:

- Confirmar que es distinta.
- Vincular a solicitud existente.
- Archivar como duplicado.

Nunca se fusionarán automáticamente datos de menores.

## 35.4 Caducidad

Una solicitud inactiva podrá caducar.

Antes:

- Se intentará el contacto definido.
- Se registrarán intentos.
- Se aplicará la política de conservación.

---

# 36. Catálogo de mensajes para el usuario

## 36.1 Inicio

> Completa los datos básicos. Leo revisará personalmente tu solicitud.

## 36.2 Menor

> Como el alumno es menor, necesitamos los datos de su responsable.

## 36.3 Documentos

> Debes leer todos los documentos antes de enviar la solicitud.

## 36.4 Scroll pendiente

> Llega al final del documento para habilitar esta opción.

## 36.5 Documento completado

> Documento completado.

## 36.6 Imagen no autorizada

> Decisión guardada. No autorizar imágenes no afecta a la solicitud.

## 36.7 Datos pendientes

> Revisa los campos indicados.

## 36.8 Envío

> Enviando solicitud...

## 36.9 Éxito

> Solicitud recibida.

## 36.10 Próximo paso

> Leo se pondrá en contacto contigo personalmente.

## 36.11 Aviso de plaza

> La plaza todavía no está confirmada.

## 36.12 Error

> No hemos podido enviar la solicitud. Tus datos siguen aquí.

---

# 37. Experiencia móvil

## 37.1 Principio

La inscripción deberá poder completarse íntegramente con una mano y sin zoom.

## 37.2 Disposición

- Una columna.
- Márgenes de 20 px.
- Campos de ancho completo.
- Botones principales de ancho completo.
- Etiquetas visibles.
- Teclado adecuado por campo.
- Espaciado suficiente.

## 37.3 Cabecera

- Logotipo compacto.
- “Paso 1 de 3”.
- Acción volver.
- Sin navegación pública completa.

## 37.4 Formulario

- Agrupaciones claras.
- No más de seis campos visibles sin separación.
- Fecha con control accesible.
- Selecciones grandes.
- No usar desplegables pequeños para decisiones importantes.

## 37.5 Documentos

- Pantalla completa.
- Scroll natural.
- Sin modal.
- Título fijo compacto.
- Progreso visible.
- Decisión al final.

## 37.6 Barra de acción

La acción principal puede permanecer al final de la pantalla, pero:

- No tapará contenido.
- Respetará área segura.
- No ocultará mensajes de error.
- No permitirá saltar lectura.

## 37.7 Teclado

- El teclado no tapará el campo activo.
- Continuar no quedará oculto.
- Enter no enviará el formulario final accidentalmente.

## 37.8 Interrupciones

Si el usuario cambia de aplicación:

- La sesión permanecerá durante un tiempo razonable.
- Los datos no se expondrán en notificaciones.
- Al volver se mantendrá el paso.

## 37.9 Rendimiento

- Carga inicial ligera.
- Documentos en HTML.
- No descargar PDFs pesados para poder leer.
- Respuesta inmediata.

---

# 38. Experiencia de escritorio

## 38.1 Contenedor

- Anchura de formulario: 640 a 760 px.
- Centrado.
- Espacio suficiente.
- Sin paneles laterales decorativos.

## 38.2 Progreso

Podrá mostrarse en la parte superior.

No se utilizará una barra lateral que distraiga.

## 38.3 Formulario

Se podrán colocar dos campos relacionados en una fila:

- Nombre y apellidos.
- Teléfono y correo.

No se colocarán campos largos en columnas estrechas.

## 38.4 Documentos

- Columna de lectura legible.
- Índice lateral opcional.
- Progreso de lectura.
- Acciones al final.

## 38.5 Panel administrativo

En escritorio:

- Lista y detalle podrán convivir.
- El detalle mantendrá una columna clara.
- Las acciones sensibles estarán agrupadas.
- La aprobación no permanecerá fija si puede pulsarse por error.

---

# 39. Accesibilidad

El flujo cumplirá WCAG 2.2 AA.

## 39.1 Navegación

- Todo operable por teclado.
- Orden lógico.
- Foco visible.
- Saltar al contenido.
- Escape cierra diálogos.

## 39.2 Campos

- Etiquetas reales.
- Instrucciones asociadas.
- Errores anunciados.
- Autocompletado adecuado.
- No depender del placeholder.

## 39.3 Progreso

- Texto además de color.
- Paso actual anunciado.
- Cambios de pantalla comunicados.

## 39.4 Scroll legal

- Compatible con teclado.
- Compatible con lector de pantalla.
- El desbloqueo se anunciará.
- No imponer tiempo.
- No usar scroll interno en móvil.

## 39.5 Casillas y decisiones

- Etiqueta completa pulsable.
- Estado desactivado explicado.
- Área mínima 44 por 44 px.
- Ninguna premarcada.

## 39.6 Errores

- Resumen al principio.
- Enlaces al campo.
- Mensaje junto al campo.
- No depender solo del rojo.

## 39.7 Movimiento

- Respetar `prefers-reduced-motion`.
- Sin transiciones necesarias para entender.

## 39.8 Lenguaje

- Claro.
- Adecuado para familias.
- Sin términos jurídicos sin explicación.
- Resumen inicial y texto completo.

---

# 40. Seguridad

## 40.1 Transporte

- HTTPS obligatorio.
- Redirección desde HTTP.
- Cookies seguras.
- HSTS cuando proceda.

## 40.2 Sesión

- Identificador aleatorio.
- Cookie HttpOnly.
- SameSite adecuado.
- Caducidad.
- Rotación tras acciones sensibles.

## 40.3 Validación

- Cliente y servidor.
- Longitudes máximas.
- Normalización controlada.
- Rechazo de contenido malicioso.
- Codificación de salida.

## 40.4 Protección de ataques

- CSRF.
- XSS.
- Inyección.
- Fuerza bruta.
- Automatización.
- Denegación de servicio.
- Enumeración de solicitudes.

## 40.5 Antiabuso

- Límites por sesión.
- Límites temporales.
- Detección de patrones.
- Reto anti-bot respetuoso con privacidad solo cuando sea necesario.

No se utilizarán captchas inaccesibles.

## 40.6 Panel administrativo

- Autenticación individual.
- Contraseña robusta.
- Segundo factor recomendado.
- Expiración de sesión.
- Reautenticación para aprobación.
- Registro de accesos.
- Bloqueo tras intentos.

## 40.7 Autorización

- El visitante solo accede a su sesión temporal.
- No existe consulta pública por referencia.
- Leo accede a solicitudes.
- Roles futuros con mínimo privilegio.

## 40.8 Datos en logs

No registrar:

- Nombres completos.
- Correos.
- Teléfonos.
- Fechas de nacimiento.
- Contenido de observaciones.
- Consentimientos completos.

Los errores utilizarán identificadores técnicos.

## 40.9 Cifrado y almacenamiento

- Cifrado en tránsito.
- Cifrado en reposo.
- Copias cifradas.
- Gestión segura de secretos.
- Separación de entornos.

## 40.10 Archivos

No habrá subida de archivos en esta fase.

Esta decisión reduce:

- Malware.
- Fugas.
- Complejidad.
- Datos excesivos.

---

# 41. Protección de datos

## 41.1 Minimización

Solo se recogerá lo necesario para:

- Gestionar la solicitud.
- Contactar.
- Aplicar protección de menores.
- Registrar decisiones legales.

## 41.2 Finalidad

Los datos no se utilizarán para:

- Publicidad no autorizada.
- Venta.
- Perfiles comerciales.
- Cesión no informada.
- Entrenamiento de modelos.

## 41.3 Consentimiento separado

Se separarán:

- Gestión de solicitud.
- Condiciones.
- Normas.
- Imagen por canal.
- Comunicaciones comerciales futuras, si existieran.

## 41.4 Menores

Para menores:

- Responsable obligatorio por política del club.
- Información adaptada.
- Acceso limitado.
- No publicación por defecto.
- No analítica individual.
- No datos médicos en el formulario.

## 41.5 Datos de salud

Los datos de salud son especialmente sensibles.

No se recogerán en el formulario inicial.

Si se necesitan:

- Proceso separado.
- Finalidad concreta.
- Base jurídica.
- Acceso más restringido.
- Conservación específica.
- Revisión jurídica.

## 41.6 Derechos

La persona podrá solicitar:

- Acceso.
- Rectificación.
- Supresión.
- Oposición.
- Limitación.
- Portabilidad cuando proceda.
- Retirada de consentimiento.

El sistema deberá permitir localizar:

- Solicitud.
- Consentimientos.
- Alumno.
- Publicaciones vinculadas cuando sea viable.

## 41.7 Retención

Debe existir una política diferenciada:

### Borradores

Referencia:

> 24 horas.

### Solicitudes no aprobadas

Referencia inicial:

> 90 días después del cierre.

El plazo definitivo deberá revisarse jurídicamente.

### Solicitudes aprobadas

Los datos necesarios pasan al expediente del alumno.

### Evidencias legales

Se conservarán durante el periodo necesario para demostrar cumplimiento y atender responsabilidades.

### Logs técnicos

Plazo breve y minimizado.

## 41.8 Supresión

La supresión:

- Eliminará datos no necesarios.
- Mantendrá únicamente aquello exigido legalmente.
- Quedará auditada.
- Incluirá borradores y copias según política.

## 41.9 Encargados

Todo proveedor con acceso a datos deberá:

- Ofrecer garantías.
- Firmar acuerdo de encargo.
- Informar subencargados.
- Definir ubicación.
- Facilitar borrado.
- Notificar incidencias.

---

# 42. Arquitectura técnica

## 42.1 Enfoque

La arquitectura será modular y no dependerá de una simulación en frontend.

Componentes lógicos:

1. Interfaz pública.
2. Servicio de borradores.
3. Servicio de solicitudes.
4. Servicio de documentos legales.
5. Servicio de consentimientos.
6. Servicio de notificaciones.
7. Panel administrativo.
8. Servicio de pagos manualmente verificados.
9. Servicio de alumnos.
10. Auditoría.
11. Base de datos.

## 42.2 Interfaz pública

Responsabilidades:

- Renderizar pantallas.
- Validación inmediata.
- Accesibilidad.
- Estado de progreso.
- Lectura legal.
- Confirmación.

No será fuente final de verdad.

## 42.3 Servicio de documentos

Responsabilidades:

- Publicar versiones.
- Mantener fecha.
- Mantener contenido.
- Calcular integridad.
- Invalidar decisiones antiguas.
- Recuperar versión aceptada.

## 42.4 Servicio de solicitudes

Responsabilidades:

- Validar.
- Crear solicitud.
- Controlar estados.
- Evitar duplicados técnicos.
- Coordinar aprobación.

## 42.5 Servicio de notificaciones

Responsabilidades:

- Enviar confirmación.
- Avisar a Leo.
- Reintentar.
- Registrar entrega.
- Evitar PII innecesaria.

## 42.6 Servicio administrativo

Responsabilidades:

- Autorización.
- Listado.
- Historial.
- Contacto.
- Confirmación presencial.
- Pago.
- Aprobación.

## 42.7 Servicio de alumnos

Responsabilidades:

- Crear alumno solo tras aprobación.
- Evitar creación duplicada.
- Vincular responsable.
- Vincular consentimientos.

## 42.8 Base tecnológica

La implementación podrá utilizar Next.js para interfaz y servidor, con una base relacional y servicios gestionados.

La elección final de proveedor no deberá cambiar:

- Estados.
- Evidencias.
- Reglas legales.
- Transacciones.
- Auditoría.

La arquitectura deberá poder migrar entre proveedores razonablemente.

---

# 43. Modelo conceptual de datos

## 43.1 Solicitud

Campos conceptuales:

- ID interno.
- Referencia.
- Estado.
- Fecha.
- Grupo solicitado.
- Grupo definitivo.
- Origen del CTA.
- Motivo de cierre.
- Indicador de duplicado.

## 43.2 Persona solicitante

- Nombre.
- Apellidos.
- Teléfono.
- Correo.
- Canal.
- Relación con menor.

## 43.3 Alumno potencial

- Nombre.
- Apellidos.
- Fecha de nacimiento.
- Experiencia.
- Observaciones.

## 43.4 Documento legal

- ID.
- Tipo.
- Título.
- Versión.
- Fecha.
- Contenido.
- Huella.
- Estado activo.

## 43.5 Evidencia legal

- Solicitud.
- Documento.
- Versión.
- Apertura.
- Final alcanzado.
- Decisión.
- Fecha.
- Actor.
- Finalidades.

## 43.6 Historial

- Solicitud.
- Estado anterior.
- Estado nuevo.
- Fecha.
- Actor.
- Motivo.

## 43.7 Contacto

- Solicitud.
- Fecha.
- Canal.
- Resultado.
- Próximo paso.
- Nota.

## 43.8 Confirmación presencial

- Solicitud.
- Fecha.
- Responsable verificado.
- Grupo.
- Horario.
- Resultado.

## 43.9 Pago

- Solicitud.
- Concepto.
- Importe.
- Método.
- Fecha.
- Recibo.
- Persona registradora.

## 43.10 Alumno

Se crea después de aprobación.

- ID.
- Datos necesarios.
- Estado activo.
- Fecha de alta.
- Grupo.
- Responsable.
- Solicitud origen.

## 43.11 Notificación

- Tipo.
- Canal.
- Destino.
- Estado.
- Intentos.
- Fecha.
- Error técnico.

## 43.12 Auditoría

- Actor.
- Acción.
- Recurso.
- Fecha.
- Resultado.
- Contexto mínimo.

---

# 44. Operaciones técnicas conceptuales

## 44.1 Borrador

- Crear.
- Recuperar.
- Actualizar.
- Eliminar.

## 44.2 Documentos

- Listar activos.
- Obtener versión.
- Registrar llegada al final.
- Registrar decisión.

## 44.3 Solicitud

- Validar.
- Enviar.
- Consultar internamente.
- Cambiar estado.

## 44.4 Contacto

- Registrar intento.
- Registrar éxito.
- Programar seguimiento.

## 44.5 Pago

- Registrar.
- Anular con motivo.
- Emitir recibo.

## 44.6 Aprobación

- Validar requisitos.
- Aprobar.
- Crear alumno.
- Notificar.

Estas operaciones deberán estar protegidas por permisos, validaciones y auditoría.

---

# 45. Consistencia y transacciones

## 45.1 Envío

Solicitud, evidencias, estado y notificación deberán quedar coordinados.

## 45.2 Aprobación

Alumno y estado APROBADO deberán crearse juntos.

## 45.3 Idempotencia

Aplicable a:

- Envío.
- Notificación.
- Registro de pago.
- Aprobación.

## 45.4 Concurrencia

Si dos administradores abren la misma solicitud:

- El sistema detectará cambios.
- No sobrescribirá silenciosamente.
- La aprobación solo ocurrirá una vez.

## 45.5 Integridad legal

Una evidencia siempre apuntará a la versión exacta.

Modificar un documento no modificará el contenido histórico aceptado.

---

# 46. Auditoría

## 46.1 Acciones auditadas

- Envío.
- Apertura administrativa.
- Cambio de estado.
- Lectura legal.
- Consentimiento.
- Cambio de consentimiento.
- Contacto.
- Modificación de datos.
- Pago.
- Aprobación.
- Rechazo.
- Supresión.
- Exportación.

## 46.2 Inmutabilidad

Los eventos no se editarán.

Las correcciones crearán un nuevo evento.

## 46.3 Acceso

La auditoría:

- No será visible para cualquier usuario.
- Estará disponible para responsables autorizados.
- Tendrá filtros.
- No expondrá secretos.

---

# 47. Observabilidad y operación

La observabilidad de la V1 será exclusivamente operativa. La analítica avanzada queda fuera del MVP.

## 47.1 Métricas

- Formularios iniciados.
- Paso 1 completado.
- Documentos iniciados.
- Documentos completados.
- Solicitudes enviadas.
- Errores.
- Tiempo hasta revisión.
- Tiempo hasta contacto.
- Tiempo hasta aprobación.

## 47.2 Privacidad de analítica

No enviar:

- Nombres.
- Correos.
- Teléfonos.
- Fecha de nacimiento.
- Texto de observaciones.
- Decisión de imagen asociada a identidad.

## 47.3 Alertas

- Fallo de notificación.
- Solicitud pendiente demasiado tiempo.
- Error de aprobación.
- Documento legal sin versión activa.
- Cola bloqueada.

## 47.4 Panel operativo

Leo debe poder identificar:

- Nuevas.
- Atrasadas.
- Con contacto pendiente.
- Con pago pendiente.
- Listas para aprobar.

---

# 48. Casos límite

## 48.1 Usuario vuelve atrás

Conservar datos y decisiones aplicables.

## 48.2 Cambia la fecha de nacimiento

Recalcular edad.

Si cambia a menor:

- Pedir responsable.
- Invalidar decisiones dependientes.

## 48.3 Cambia el responsable

Invalidar declaraciones asociadas al anterior.

## 48.4 Cambia el grupo

Mantener documentos salvo que existan condiciones específicas por grupo.

## 48.5 Recarga

Recuperar borrador vigente.

## 48.6 Dos pestañas

Detectar versión de borrador.

Evitar decisiones cruzadas.

## 48.7 Doble clic

Una sola solicitud.

## 48.8 Correo ya usado

No revelar existencia.

Permitir revisión interna.

## 48.9 Menor cumple años durante el flujo

Calcular en envío.

Aplicar política vigente.

## 48.10 Documento cambia

Relectura obligatoria.

## 48.11 Leo registra pago equivocado

No editar silenciosamente.

Anular y crear corrección.

## 48.12 Leo aprueba por error

Procedimiento específico auditado.

No borrar alumno directamente.

---

# 49. Pruebas funcionales

## 49.1 Adulto

- Formulario.
- Documentos.
- No imagen.
- Envío.
- Notificación.
- Contacto.
- Pago.
- Aprobación.

## 49.2 Menor

- Responsable obligatorio.
- Declaración.
- Imagen por canales.
- Aprobación.

## 49.3 Errores

- Campo vacío.
- Correo incorrecto.
- Teléfono incorrecto.
- Fecha futura.
- Sesión caducada.
- Sin conexión.
- Doble envío.

## 49.4 Documentos

- Casilla bloqueada.
- Desbloqueo al final.
- Teclado.
- Lector de pantalla.
- Cambio de versión.
- Decisión de no autorizar.

## 49.5 Administración

- Notificación.
- Filtros.
- Contacto.
- Pago.
- Bloqueo de aprobación.
- Aprobación única.
- Creación de alumno.

---

# 50. Pruebas de seguridad

- Autorización.
- Enumeración.
- CSRF.
- XSS.
- Inyección.
- Rate limit.
- Sesión.
- Cookies.
- Doble envío.
- Aprobación concurrente.
- Logs sin PII.
- Acceso a evidencias.
- Copias.
- Restauración.

---

# 51. Pruebas de accesibilidad

- Teclado completo.
- Foco.
- Lector de pantalla.
- Zoom 200 y 400 %.
- Contraste.
- Errores.
- Scroll legal.
- Controles desactivados explicados.
- Movimiento reducido.
- Móvil.
- Orientación horizontal y vertical.

---

# 52. Contenido pendiente de validación

Antes del desarrollo final deberán confirmarse:

- Responsable del tratamiento.
- Contacto de privacidad.
- Bases jurídicas.
- Documentos definitivos.
- Versiones.
- Edad y política de menores.
- Canales de imagen.
- Retención.
- Datos del formulario.
- Grupos.
- Métodos de contacto.
- Métodos de pago.
- Condiciones de admisión.
- Normas del club.
- Canal de notificación a Leo.
- Segundo factor.
- Proveedor de correo.
- Proveedor de base de datos.

---

# 53. Reglas no negociables

1. Enviar el formulario crea una solicitud, no un alumno.
2. Todos los documentos deben abrirse.
3. Hay que llegar al final mediante scroll.
4. La aceptación no se habilita antes.
5. Ninguna casilla estará premarcada.
6. La imagen es opcional.
7. No autorizar imagen no bloquea.
8. Los consentimientos estarán separados.
9. Leo recibe notificación.
10. La solicitud aparece pendiente.
11. Leo contacta personalmente.
12. El pago se realiza en efectivo o mediante transferencia verificada si está habilitada.
13. La confirmación es presencial.
14. El pago no aprueba.
15. Leo aprueba manualmente.
16. El alumno se crea después.
17. No se recogen datos bancarios.
18. No se recogen datos médicos en el formulario.
19. Los menores requieren responsable según política.
20. Las evidencias apuntan a versiones.
21. Los documentos actualizados se releen.
22. No se expone PII en URLs.
23. No se expone PII en analítica.
24. No se expone PII en notificaciones.
25. No se puede enumerar solicitudes.
26. La aprobación es transaccional.
27. Toda acción administrativa se audita.
28. No hay aprobación automática.
29. No hay pago online.
30. No se modifica este flujo sin documentación.
31. Los métodos de la V1 son efectivo y transferencia manualmente verificada si se habilita.
32. Un pago vinculado a una solicitud no crea un alumno.
33. No existe acceso privado para alumnos o familias en la V1.
34. Los roles complejos y las automatizaciones avanzadas quedan fuera del MVP.

---

# 54. Criterios de aceptación

El flujo se considerará terminado cuando:

## Solicitante

- Puede completar datos en móvil y escritorio.
- Comprende que es una solicitud.
- Lee todos los documentos.
- No acepta antes del final.
- Puede rechazar imagen.
- Revisa datos.
- Envía una sola vez.
- Recibe referencia.
- Ve próximos pasos.

## Leo

- Recibe notificación.
- Ve la solicitud.
- Ve documentos.
- Registra contacto.
- Registra confirmación.
- Registra pago.
- No puede aprobar antes.
- Aprueba manualmente.
- Se crea el alumno.

## Legal

- Información completa.
- Consentimientos separados.
- Versiones.
- Evidencia.
- Retirada.
- Menores.
- Retención.

## Seguridad

- Validación de servidor.
- Autorización.
- Cifrado.
- Antiabuso.
- Sin PII en logs.
- Auditoría.

## Calidad

- Sin pérdida de datos.
- Sin duplicados.
- Sin estados imposibles.
- Sin mensajes ambiguos.
- Sin confirmación falsa de plaza.
- Sin alta antes de aprobación.

---

# 55. Principio final

El flujo debe combinar dos cualidades:

1. Ser sencillo para la familia.
2. Ser riguroso para el club.

La familia debe poder completar la solicitud sin sentirse dentro de un proceso burocrático.

Leo debe recibir información suficiente, ordenada y verificable.

La tecnología debe reducir trabajo administrativo, pero nunca eliminar el contacto humano ni la aprobación personal.

La frase que resume el sistema es:

> La web recoge la solicitud. Leo confirma a la persona. El sistema crea al alumno solo después.
