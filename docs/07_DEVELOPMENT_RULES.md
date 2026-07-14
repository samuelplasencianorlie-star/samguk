# SAM GUK CLUB TAEKWONDO
## Constitución técnica y reglas de desarrollo

**Documento:** `07_DEVELOPMENT_RULES.md`  
**Versión:** 1.0  
**Estado:** Norma técnica vinculante previa al desarrollo  
**Responsable del producto:** LUMEN Studio  
**Proyecto:** SAM GUK  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito

Este documento establece las reglas técnicas obligatorias para construir, revisar, probar, desplegar y mantener el proyecto SAM GUK.

Su objetivo es asegurar que todo el desarrollo:

- Respete el producto documentado.
- Sea comprensible para otras personas desarrolladoras.
- Mantenga una arquitectura coherente.
- Evite duplicidad y complejidad accidental.
- Proteja los datos de alumnos, familias y personal.
- Sea accesible y responsive desde el inicio.
- Pueda crecer sin anticipar funcionalidades innecesarias.
- Permita comprobar objetivamente cuándo una fase está terminada.

Estas reglas constituyen la referencia técnica principal del proyecto.

No son sugerencias estilísticas. Cualquier excepción deberá justificarse y documentarse antes de aplicarse.

---

# 2. Autoridad y relación con otros documentos

El desarrollo deberá respetar conjuntamente:

1. `00_PRODUCT_BOOK.md`.
2. `01_PUBLIC_WEBSITE.md`.
3. `02_REGISTRATION_FLOW.md`.
4. `03_ADMIN_PANEL.md`.
5. `04_STUDENTS_GROUPS.md`.
6. `05_PAYMENTS_RECEIPTS.md`.
7. `06_BUILD_PLAN.md`.
8. El presente documento.

## 2.1 Orden de decisión

Ante una duda:

1. Se comprobará el alcance del Product Book.
2. Se consultará el documento funcional propietario del módulo.
3. Se comprobará la fase correspondiente del plan de construcción.
4. Se aplicarán las reglas técnicas de este documento.
5. Si la respuesta sigue sin estar definida, se documentará una decisión antes de programar.

## 2.2 Prohibición de decisiones ocultas

El código no deberá decidir por sí solo:

- Estados de negocio.
- Requisitos de aprobación.
- Métodos de pago.
- Política de menores.
- Permisos.
- Plazos de conservación.
- Contenido legal.
- Reglas fiscales.
- Funcionalidades futuras.

Toda decisión relevante deberá existir primero en la documentación.

---

# 3. Reglas de producto no negociables

## 3.1 Solicitudes y alumnos

- El formulario público crea una solicitud.
- Una solicitud no es un alumno.
- Registrar un contacto no crea un alumno.
- Registrar una confirmación presencial no crea un alumno.
- Registrar un pago no crea un alumno.
- Solo la aprobación manual de Leo crea un alumno.
- La creación del alumno deberá ser atómica e idempotente.

## 3.2 Acceso privado

- La V1 solo ofrece acceso privado a Leo y personal autorizado.
- No existen cuentas de alumnos.
- No existen cuentas de familias.
- No existe portal de responsables.
- No existe registro público de usuarios.

## 3.3 Pagos de la V1

- Efectivo.
- Transferencia verificada manualmente, si se habilita.

No se implementarán:

- Pasarela online.
- Tarjeta online.
- Bizum automático.
- Domiciliación.
- Suscripciones.
- Conciliación bancaria.

## 3.4 Fuera del MVP

- Multi-sede.
- Multi-gimnasio.
- Drag and drop.
- Analítica avanzada.
- Pasarela de pago.
- Roles complejos.
- Automatizaciones avanzadas.

No se crearán tablas, servicios, componentes, rutas, permisos, adaptadores ni banderas para anticipar estas funcionalidades.

---

# 4. Base tecnológica

## 4.1 Tecnologías principales

El proyecto utilizará:

- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- Base de datos relacional.
- Despliegue compatible con Vercel.

## 4.2 Versiones

Antes de iniciar el desarrollo se fijarán versiones concretas.

Reglas:

- No depender de versiones flotantes.
- Mantener un archivo de bloqueo de dependencias.
- Actualizar de forma deliberada.
- Revisar cambios incompatibles antes de actualizar.
- No mezclar una actualización grande de framework con una fase funcional.

## 4.3 TypeScript

TypeScript se utilizará en modo estricto.

Queda prohibido:

- Desactivar comprobaciones globalmente.
- Utilizar tipos genéricos como sustituto de un modelo real.
- Introducir valores sin tipo en límites de seguridad.
- Confiar en aserciones para evitar validación.
- Duplicar manualmente tipos que puedan derivarse de una fuente canónica.

Una excepción deberá:

- Ser local.
- Incluir motivo.
- Tener alcance mínimo.
- No ocultar un riesgo de ejecución.

## 4.4 Renderizado

Se utilizará un enfoque server first.

Por defecto:

- Las páginas obtendrán datos en servidor.
- Los permisos se comprobarán en servidor.
- Los secretos permanecerán en servidor.
- Los componentes serán de servidor cuando no necesiten interacción del navegador.
- Los componentes cliente se limitarán a interacción, estado visual o APIs exclusivas del navegador.

No se convertirá una pantalla completa en cliente por comodidad.

---

# 5. Arquitectura general

## 5.1 Estilo arquitectónico

La aplicación se organizará como un monolito modular.

Esto significa:

- Una sola aplicación desplegable durante el MVP.
- Módulos separados por dominio.
- Contratos claros entre módulos.
- Base de datos relacional compartida con propiedad lógica definida.
- Ausencia de microservicios prematuros.

## 5.2 Capas

Cada módulo podrá contener las siguientes responsabilidades:

### Presentación

- Páginas.
- Componentes.
- Formularios.
- Mensajes.
- Estados visuales.

### Aplicación

- Casos de uso.
- Orquestación.
- Comandos.
- Consultas.
- Coordinación de transacciones.

### Dominio

- Entidades.
- Estados.
- Reglas.
- Transiciones.
- Invariantes.
- Errores de negocio.

### Infraestructura

- Base de datos.
- Autenticación.
- Correo.
- Almacenamiento.
- Observabilidad.
- Servicios externos aprobados.

## 5.3 Dirección de dependencias

Las dependencias deberán apuntar hacia reglas más estables:

- La presentación puede utilizar casos de uso.
- Los casos de uso pueden utilizar dominio e interfaces.
- La infraestructura implementa interfaces.
- El dominio no depende de componentes, rutas, Tailwind ni proveedores.

Queda prohibido:

- Importar componentes desde el dominio.
- Ejecutar consultas de base de datos dentro de componentes visuales.
- Colocar reglas de aprobación dentro de botones.
- Duplicar una regla de negocio entre interfaz y servidor.
- Acoplar una entidad de dominio a un proveedor concreto.

## 5.4 Límites de dominio

Los módulos principales serán:

- Sitio público.
- Inscripción.
- Autenticación.
- Solicitudes.
- Alumnos.
- Responsables.
- Grupos.
- Horarios.
- Documentos legales.
- Consentimientos.
- Pagos.
- Mensualidades.
- Recibos.
- Notificaciones transaccionales.
- Auditoría.

Cada dato tendrá un módulo propietario.

Ejemplos:

- Solicitudes controla el estado de admisión.
- Alumnos controla la ficha definitiva.
- Grupos controla pertenencias y capacidad.
- Pagos controla registros económicos.
- Legal controla versiones y evidencias.
- Autenticación controla sesiones, no permisos de negocio.

## 5.5 Frontera pública y privada

La web pública y el panel administrativo compartirán:

- Tokens visuales.
- Componentes básicos.
- Utilidades accesibles.
- Validaciones que no contengan secretos.

No compartirán indiscriminadamente:

- Navegación.
- Diseño de página.
- Densidad.
- Consultas.
- Permisos.
- Datos.

El panel no deberá parecer una landing y la web pública no deberá parecer un dashboard.

---

# 6. Organización de carpetas

La estructura deberá expresar el dominio y evitar carpetas genéricas sin propietario.

## 6.1 Raíz del proyecto

La raíz contendrá únicamente:

- Configuración del proyecto.
- Gestión de dependencias.
- Documentación.
- Código fuente.
- Archivos públicos.
- Pruebas.
- Automatización técnica aprobada.

No se almacenarán en la raíz:

- Scripts temporales.
- Copias manuales.
- Exportaciones.
- Capturas sin finalidad.
- Credenciales.
- Datos reales.
- Archivos personales.

## 6.2 Documentación

`docs` contendrá:

- Producto.
- Flujos.
- Reglas.
- Plan.
- Decisiones de arquitectura.
- Procedimientos operativos.

Los documentos no se duplicarán dentro del código.

## 6.3 Código fuente

`src` será la raíz del código de aplicación.

Sus áreas principales serán:

- `app`: rutas, layouts y puntos de entrada.
- `components`: componentes compartidos.
- `features`: módulos funcionales.
- `lib`: utilidades transversales aprobadas.
- `server`: infraestructura exclusiva de servidor.
- `styles`: estilos globales y tokens.
- `types`: tipos realmente transversales.
- `config`: configuración validada y no secreta.

## 6.4 Rutas

`app` se organizará por experiencia:

- Rutas públicas.
- Ruta de inscripción.
- Rutas legales.
- Ruta administrativa.
- Puntos de entrada del servidor cuando sean necesarios.

Reglas:

- Los nombres de URL visibles para usuarios serán claros y en español.
- Las rutas internas no expondrán estados sensibles.
- No se incluirán datos personales en la URL.
- Los segmentos dinámicos utilizarán identificadores opacos.
- Las rutas administrativas estarán protegidas en servidor.

## 6.5 Componentes

`components` se dividirá en:

- Primitivas de interfaz.
- Elementos de layout.
- Patrones compartidos.
- Componentes accesibles reutilizables.

No contendrá:

- Reglas de negocio.
- Consultas de base de datos.
- Casos de uso.
- Componentes exclusivos de una única función si pertenecen claramente a un módulo.

## 6.6 Funcionalidades

`features` se organizará por dominio, no por tipo técnico.

Cada funcionalidad podrá contener:

- Componentes propios.
- Casos de uso.
- Validaciones.
- Consultas.
- Mutaciones.
- Modelos.
- Tipos locales.
- Pruebas.

Un módulo no deberá acceder a archivos internos de otro. Utilizará su interfaz pública.

## 6.7 Servidor

`server` contendrá infraestructura transversal:

- Conexión de base de datos.
- Configuración de autenticación.
- Correo.
- Almacenamiento.
- Colas, si llegan a ser necesarias.
- Logs.
- Métricas.
- Gestión de secretos.

Todo archivo de esta zona deberá impedir su inclusión en el navegador.

## 6.8 Archivos públicos

`public` contendrá únicamente recursos que puedan ser accesibles sin autenticación:

- Logotipo público.
- Iconos públicos.
- Imágenes públicas autorizadas.
- Archivos legales destinados a descarga pública.

No contendrá:

- Fotografías internas.
- Recibos.
- Documentos personales.
- Exportaciones.
- Evidencias legales.
- Imágenes privadas de alumnos.

## 6.9 Pruebas

Las pruebas se colocarán:

- Cerca del módulo cuando validen una unidad.
- En un área específica cuando validen flujos completos.

Las fixtures no contendrán información real.

---

# 7. Convenciones de nombres

## 7.1 Idioma

El código utilizará inglés para identificadores técnicos.

La interfaz utilizará español.

Las rutas públicas utilizarán español comprensible.

Los estados persistidos:

- Serán estables.
- Utilizarán ASCII.
- No contendrán tildes.
- No se utilizarán directamente como texto visible.
- Se traducirán mediante un catálogo central.

## 7.2 Archivos y carpetas

- Carpetas: minúsculas y guiones.
- Archivos de componentes: minúsculas y guiones.
- Utilidades: minúsculas y guiones.
- Pruebas: mismo nombre del elemento probado más sufijo de prueba.
- No utilizar nombres como `misc`, `helpers2`, `new`, `final` o `utils-old`.

## 7.3 Componentes

- Nombre PascalCase.
- Nombre basado en responsabilidad.
- Un componente principal por archivo.
- Evitar nombres visuales vagos como `BlueBox`.
- Preferir nombres semánticos como `PendingRequestSummary`.

## 7.4 Funciones y variables

- camelCase.
- Verbos para funciones.
- Sustantivos para valores.
- Booleanos con prefijos comprensibles como `is`, `has`, `can` o `should`.
- No utilizar abreviaturas ambiguas.
- No utilizar una sola letra salvo índices locales evidentes.

## 7.5 Tipos

- PascalCase.
- Sin prefijos técnicos innecesarios.
- Los tipos describirán conceptos, no su mecanismo de almacenamiento.
- No se añadirá el sufijo `Data` si no aporta significado.

## 7.6 Constantes

- Constantes globales inmutables en mayúsculas con guion bajo.
- Catálogos centralizados.
- No repetir cadenas de estado en múltiples módulos.

## 7.7 Base de datos

- Tablas y columnas en minúsculas con guion bajo.
- Claves primarias consistentes.
- Claves foráneas identificables.
- Fechas con nombres explícitos.
- Importes con unidad indicada.
- Estados con catálogo o restricción.

## 7.8 Eventos

Los eventos se nombrarán en pasado porque describen algo ocurrido.

Deberán indicar:

- Dominio.
- Acción.
- Versión cuando el contrato pueda evolucionar.

No se crearán eventos para anticipar integraciones inexistentes.

---

# 8. Componentes y reutilización

## 8.1 Principio

Se reutilizará comportamiento estable, no similitud accidental.

Un componente compartido deberá:

- Tener una responsabilidad clara.
- Ser utilizado realmente en más de un contexto o pertenecer al sistema base.
- Mantener una API pequeña.
- Incluir estados accesibles.
- Evitar conocimiento del dominio cuando sea una primitiva.

## 8.2 Jerarquía

### Primitivas

- Botón.
- Enlace.
- Campo.
- Selección.
- Casilla.
- Radio.
- Diálogo.
- Menú.
- Tabla.
- Etiqueta de estado.
- Toast.
- Esqueleto.

### Patrones

- Cabecera de página.
- Barra de acciones.
- Resumen estadístico.
- Lista vacía.
- Panel de filtros.
- Confirmación sensible.
- Historial.

### Componentes de dominio

- Tarjeta de alumno.
- Tarjeta de grupo.
- Resumen de solicitud.
- Estado de pago.
- Recibo.
- Evidencia documental.

## 8.3 Reglas

- No crear un componente para una sola línea sin beneficio.
- No duplicar una primitiva ya existente.
- No crear variantes mediante grandes bloques condicionales.
- No utilizar propiedades booleanas en exceso.
- No convertir una tarjeta completa en botón si contiene acciones internas.
- No anidar tarjetas.
- No esconder acciones frecuentes en menús innecesarios.

## 8.4 Composición

Se preferirá composición frente a componentes gigantes.

Una página:

- Coordina.
- Compone.
- Define contexto.

No deberá contener:

- Toda la validación.
- Toda la lógica de negocio.
- Consultas directas dispersas.
- Decenas de estados locales no relacionados.

## 8.5 Iconos

- Utilizar una librería de iconos coherente.
- Mantener tamaño y grosor consistentes.
- Añadir etiqueta accesible cuando el icono sea la única representación.
- Utilizar tooltip en controles iconográficos no evidentes.
- No crear SVG manual si ya existe un icono adecuado.

---

# 9. Tailwind CSS y sistema de estilos

## 9.1 Principio

Tailwind será una herramienta de aplicación del sistema de diseño, no un sustituto de él.

## 9.2 Tokens

Los valores compartidos se definirán como tokens:

- Colores.
- Tipografía.
- Espaciado.
- Radios.
- Sombras.
- Duraciones.
- Capas.
- Anchuras.

## 9.3 Valores arbitrarios

Los valores arbitrarios solo se permitirán cuando:

- Exista una necesidad de layout real.
- El valor no pertenezca al sistema compartido.
- No se repita.
- Quede claro por qué es necesario.

No se utilizarán para ajustar visualmente cada pantalla sin criterio común.

## 9.4 Clases

- Mantener orden coherente.
- Evitar cadenas duplicadas extensas.
- Extraer variantes compartidas cuando haya repetición real.
- No construir nombres de clase dinámicos que el proceso de estilos no pueda detectar.
- No utilizar estilos inline salvo valores verdaderamente dinámicos y controlados.

## 9.5 CSS global

El CSS global se limitará a:

- Reset.
- Tokens.
- Tipografía base.
- Foco.
- Selección.
- Impresión.
- Utilidades globales justificadas.

No se utilizará para corregir componentes concretos mediante selectores frágiles.

---

# 10. Diseño responsive

## 10.1 Enfoque

Todo se diseñará mobile first.

La versión móvil no será una reducción posterior de escritorio.

## 10.2 Rangos de referencia

- Móvil pequeño: 320 a 389 px.
- Móvil estándar: 390 a 639 px.
- Tableta: 640 a 1023 px.
- Escritorio: 1024 a 1439 px.
- Escritorio amplio: 1440 px o más.

Los puntos de cambio responderán al contenido, no a modelos concretos de dispositivo.

## 10.3 Reglas obligatorias

- No habrá scroll horizontal de página.
- Ningún texto quedará cortado.
- Ningún botón quedará fuera del viewport.
- Los controles táctiles tendrán tamaño suficiente.
- Las imágenes mantendrán proporción estable.
- Las cabeceras fijas no ocultarán contenido.
- Los teclados móviles no taparán la acción principal.
- Las áreas seguras del dispositivo se respetarán.
- La orientación horizontal seguirá siendo utilizable.

## 10.4 Tablas

En escritorio se utilizarán tablas cuando faciliten comparación.

En móvil:

- No se comprimirá todo el contenido.
- Se priorizarán columnas.
- Se transformará en lista o tarjetas cuando sea más comprensible.
- Se conservarán las mismas acciones esenciales.
- No se perderá acceso a información importante.

## 10.5 Contenedores

- El texto tendrá anchura legible.
- El panel tendrá anchura máxima estable.
- Las pantallas muy anchas no estirarán formularios.
- Los fondos podrán ocupar todo el ancho.
- El contenido principal mantendrá alineación consistente.

## 10.6 Verificación

Cada fase se probará como mínimo en:

- 320 px.
- 390 px.
- Tableta vertical.
- Portátil.
- Escritorio amplio.

No bastará con redimensionar una única vez al final.

---

# 11. Accesibilidad

## 11.1 Nivel

El objetivo obligatorio será WCAG 2.2 AA.

## 11.2 Semántica

- Utilizar elementos HTML con significado correcto.
- Un único encabezado principal por página.
- Jerarquía de encabezados lógica.
- Regiones identificables.
- Etiquetas reales en formularios.
- Botones para acciones.
- Enlaces para navegación.
- Tablas para datos tabulares.

No se sustituirá semántica por atributos añadidos a elementos genéricos salvo necesidad real.

## 11.3 Teclado

Toda acción deberá funcionar mediante teclado:

- Navegar.
- Abrir.
- Cerrar.
- Seleccionar.
- Filtrar.
- Enviar.
- Confirmar.
- Cancelar.

No existirán trampas de foco.

## 11.4 Foco

- Siempre visible.
- Contraste suficiente.
- No oculto por cabeceras.
- Devuelto al origen al cerrar un diálogo.
- Situado en el título o error adecuado al cambiar de contexto.

## 11.5 Formularios

- Etiquetas permanentes.
- Instrucciones vinculadas.
- Autocompletado correcto.
- Errores junto al campo.
- Resumen cuando existan varios errores.
- Mensajes anunciados.
- Datos conservados tras un fallo.
- Ningún significado dependerá del placeholder.

## 11.6 Diálogos

- Título accesible.
- Descripción cuando sea necesaria.
- Foco inicial deliberado.
- Foco contenido.
- Cierre mediante Escape cuando sea seguro.
- Retorno del foco.
- Acción destructiva claramente identificada.

## 11.7 Color

- El color nunca será el único indicador.
- Texto normal con contraste mínimo 4,5:1.
- Texto grande con contraste mínimo 3:1.
- Controles e indicadores con contraste mínimo 3:1.
- Los estados incluirán texto o icono comprensible.

## 11.8 Movimiento

Se respetará `prefers-reduced-motion`.

La reducción de movimiento:

- Eliminará desplazamientos decorativos.
- Evitará escalado.
- Hará inmediato el scroll suave.
- Mantendrá toda la información.

## 11.9 Zoom y reflow

La aplicación deberá funcionar:

- A 200 %.
- A 400 % cuando corresponda.
- Sin pérdida de contenido.
- Sin solapamiento.
- Sin necesidad de scroll en dos dimensiones para el contenido general.

## 11.10 Pruebas

La validación combinará:

- Herramientas automáticas.
- Navegación manual por teclado.
- Comprobación con lector de pantalla.
- Revisión de contraste.
- Pruebas de zoom.

Una herramienta automática no certifica por sí sola la accesibilidad.

---

# 12. Tipografía

## 12.1 Familia

Se utilizará una sola familia tipográfica principal:

- Inter, si se aprueba y se integra correctamente.
- Fuente de sistema como fallback.

## 12.2 Pesos

Solo se cargarán los pesos necesarios.

Referencia:

- Regular.
- Medium.
- Semibold.
- Bold únicamente donde la jerarquía lo requiera.

## 12.3 Escala

La escala será limitada y consistente.

Referencia:

- 12 px para metadatos excepcionales.
- 14 px para información secundaria y tablas compactas.
- 16 px como base.
- 18 px para texto destacado.
- 20 a 24 px para títulos de bloque.
- 28 a 32 px para títulos de panel.
- 36 a 48 px para titulares públicos principales.

## 12.4 Reglas

- No reducir texto importante para hacerlo caber.
- Permitir salto de línea antes de reducir.
- No utilizar tamaños ligados continuamente al viewport.
- No utilizar espaciado negativo entre letras.
- Evitar líneas demasiado largas.
- Mantener altura de línea cómoda.
- No usar tipografías decorativas de estética marcial.

## 12.5 Carga

- Precargar solo la fuente crítica.
- Utilizar formatos modernos.
- Definir fallback compatible.
- Evitar saltos de layout.
- No cargar familias que no se utilicen.

---

# 13. Sistema de espaciado

## 13.1 Unidad base

La unidad base será 4 px.

## 13.2 Escala recomendada

- 4 px.
- 8 px.
- 12 px.
- 16 px.
- 20 px.
- 24 px.
- 32 px.
- 40 px.
- 48 px.
- 64 px.
- 80 px.
- 96 px.

## 13.3 Uso

- 4 a 8 px para relaciones muy próximas.
- 12 a 16 px dentro de controles.
- 16 a 24 px entre elementos relacionados.
- 24 a 40 px entre bloques de panel.
- 48 a 96 px entre secciones públicas.

## 13.4 Reglas

- El espacio expresará jerarquía.
- Elementos relacionados estarán más cerca.
- Las excepciones no crearán nuevas escalas.
- No utilizar márgenes negativos para corregir arquitectura.
- No añadir espacio vacío para simular lujo.
- El panel será más denso que la web pública.
- Los formularios mantendrán ritmo vertical consistente.

---

# 14. Colores

## 14.1 Paleta principal

### Azul marino

`#0A2540`

Uso:

- Navegación.
- Fondos institucionales.
- Texto destacado.

### Azul de acción

`#174EA6`

Uso:

- Acciones normales.
- Enlaces.
- Foco complementario.

### Rojo SAM GUK

`#C8102E`

Uso público:

- CTA principal.

Uso administrativo:

- Destructivo.
- Error.
- Atención crítica.

### Blanco

`#FFFFFF`

Uso:

- Superficies.
- Texto sobre fondos oscuros.

### Fondo claro

`#F5F7FA`

Uso:

- Fondo del panel.
- Separación de superficies.

### Texto principal

`#111318`

### Texto secundario

`#5F6B7A`

### Éxito

`#137A5B`

### Advertencia

`#9A6700`

## 14.2 Tokens semánticos

Los componentes utilizarán nombres semánticos:

- Fondo.
- Superficie.
- Texto.
- Texto secundario.
- Borde.
- Acción.
- Acción hover.
- Destructivo.
- Éxito.
- Advertencia.
- Información.
- Foco.

No utilizarán directamente el nombre visual del color como decisión de negocio.

## 14.3 Estados

- El verde representa éxito.
- El ámbar representa advertencia.
- El rojo representa error, peligro o acción destructiva en el panel.
- Los estados informativos utilizarán azul o gris según contexto.

Los colores de grupos:

- No reutilizarán sin distinción los colores semánticos.
- Tendrán nombre, código y posición además de color.
- Se validarán con la paleta definitiva.

## 14.4 Prohibiciones

- Gradientes decorativos.
- Neones.
- Morados como identidad principal.
- Dorados.
- Beige.
- Fondos negros dominantes.
- Contraste insuficiente.
- Colores arbitrarios por pantalla.
- Verde para importes por decoración.

---

# 15. Radios, bordes y sombras

## 15.1 Radios

- Radio estándar: 8 px.
- Controles pequeños: 6 u 8 px.
- No utilizar cápsulas como lenguaje general.
- No utilizar radios grandes en paneles completos.

## 15.2 Bordes

- Sutiles.
- Consistentes.
- Con contraste suficiente para separar controles.
- Preferidos frente a sombras fuertes.

## 15.3 Sombras

- Mínimas.
- Reservadas para capas temporales o elevación funcional.
- Nunca como decoración dominante.
- No combinar varias sombras intensas.

## 15.4 Tarjetas

Solo se utilizarán para:

- Elementos repetidos.
- Herramientas enmarcadas.
- Modales.
- Unidades de información que necesiten separación.

No se colocarán:

- Tarjetas dentro de tarjetas.
- Secciones completas en tarjetas sin motivo.
- Cada párrafo en una superficie distinta.

---

# 16. Animaciones y microinteracciones

## 16.1 Objetivo

El movimiento explicará cambios y reforzará la calidad percibida.

No deberá entretener ni retrasar.

## 16.2 Duraciones

- Hover y botones: 120 a 180 ms.
- Menús y acordeones: 180 a 260 ms.
- Aparición de contenido: 300 a 450 ms.
- Transiciones de cabecera: 180 a 240 ms.

## 16.3 Permitido

- Opacidad.
- Desplazamiento vertical máximo de 16 px.
- Cambio sutil de color.
- Elevación máxima de 2 px.
- Escala de imagen máxima de 1,02.
- Transición de estado.
- Esqueleto estable.

## 16.4 Prohibido

- Rebotes.
- Confeti.
- Sonidos.
- Texto escrito letra a letra.
- Contadores animados largos.
- Animación infinita.
- Cursor personalizado.
- Rotación decorativa.
- Scroll secuestrado.
- Parallax intenso.
- Transiciones que retrasen navegación o guardado.

## 16.5 Estados interactivos

Todo control tendrá:

- Normal.
- Hover cuando exista puntero.
- Active.
- Focus.
- Disabled cuando corresponda.
- Loading cuando exista espera.
- Error cuando falle.

Disabled deberá explicar el motivo cuando no sea evidente.

---

# 17. Imágenes y recursos visuales

## 17.1 Fuente

Las fotografías públicas serán reales y pertenecerán a SAM GUK.

Queda prohibido:

- Stock.
- Imágenes genéricas de taekwondo.
- Representaciones falsas de instalaciones.
- Imágenes obtenidas sin autorización.
- Imágenes generadas que aparenten ser alumnos reales.

## 17.2 Menores

Antes de publicar una imagen:

- Verificar autorización vigente.
- Verificar canal permitido.
- Verificar finalidad.
- Verificar alumnos identificables.
- Verificar que no exista retirada.

Una fotografía grupal no elimina la obligación de comprobar a todas las personas identificables.

## 17.3 Optimización

- Utilizar el componente de imagen optimizada del framework.
- Declarar anchura, altura o proporción.
- Generar tamaños adecuados.
- Servir formato moderno.
- Mantener fallback cuando sea necesario.
- Evitar cargar el original en listados.
- Utilizar miniaturas.
- Aplicar carga diferida fuera del primer viewport.
- Priorizar únicamente la imagen crítica.

## 17.4 Hero

- Imagen específica para escritorio.
- Recorte móvil controlado.
- Sujeto relevante siempre visible.
- Espacio suficiente para texto.
- Contraste probado con la imagen definitiva.
- Sin vídeo pesado por defecto.

## 17.5 Nombres y metadatos

- Nombres de archivo descriptivos.
- Sin nombres completos de menores.
- Sin identificadores personales.
- Eliminar metadatos innecesarios antes de publicar.
- Texto alternativo gestionado como contenido.

## 17.6 Presupuesto

Cada imagen deberá justificar:

- Dimensión.
- Peso.
- Prioridad.
- Formato.
- Uso.

No se aprobará una imagen de gran tamaño solo porque visualmente parezca correcta en conexión rápida.

---

# 18. Gestión de estado

## 18.1 Tipos de estado

El estado se clasificará antes de elegir herramienta.

### Estado del servidor

Datos persistidos:

- Solicitudes.
- Alumnos.
- Grupos.
- Pagos.
- Documentos.

La fuente de verdad será el servidor y la base de datos.

### Estado de URL

Se utilizará para:

- Búsquedas.
- Filtros no sensibles.
- Orden.
- Página.
- Pestañas compartibles cuando sea apropiado.

Nunca incluirá datos personales.

### Estado de formulario

Se limitará al formulario actual:

- Valores.
- Errores.
- Progreso.
- Cambios no guardados.

### Estado local de interfaz

Se utilizará para:

- Menús.
- Diálogos.
- Acordeones.
- Selección temporal.
- Visibilidad.

### Estado global

Solo se introducirá cuando varias zonas independientes necesiten el mismo estado cliente y no exista una fuente mejor.

No se añadirá una librería global por defecto.

## 18.2 Máquinas de estados

Los procesos de negocio utilizarán transiciones explícitas.

Aplicable a:

- Solicitudes.
- Alumnos.
- Documentación.
- Consentimientos.
- Mensualidades.
- Pagos.
- Recibos.

Los estados:

- No serán texto libre.
- Tendrán transiciones permitidas.
- Se validarán en servidor.
- Se representarán mediante etiquetas centralizadas.
- Guardarán historial cuando corresponda.

## 18.3 Estado optimista

Podrá utilizarse para acciones reversibles y de bajo riesgo.

No se utilizará de forma que confirme antes de tiempo:

- Aprobaciones.
- Pagos.
- Anulaciones.
- Bajas.
- Consentimientos.
- Cambios legales.
- Emisión de recibos.

## 18.4 Sincronización

- No duplicar la misma verdad en varios almacenes.
- Invalidar o actualizar datos después de mutaciones.
- Detectar conflictos de edición.
- No sobrescribir silenciosamente.
- Mostrar cuándo un dato agregado puede estar desactualizado.

---

# 19. Datos, validación y transacciones

## 19.1 Validación

Se validará:

- En interfaz para ayudar.
- En servidor para proteger.
- En base de datos para garantizar invariantes.

La validación de interfaz nunca será suficiente por sí sola.

## 19.2 Esquemas

- Cada entrada externa tendrá un esquema.
- Los esquemas tendrán propietario.
- Se reutilizarán entre cliente y servidor cuando sea seguro.
- Los mensajes visibles se adaptarán al usuario.
- Los errores técnicos no se expondrán directamente.

## 19.3 Normalización

- Eliminar espacios accidentales.
- Conservar caracteres legítimos.
- Normalizar teléfonos para búsqueda.
- Normalizar correos sin alterar indebidamente la parte local.
- No cambiar nombres automáticamente a mayúsculas.
- No realizar correcciones silenciosas ambiguas.

## 19.4 Dinero

- Almacenar en céntimos.
- Moneda explícita.
- No usar números de coma flotante.
- Formatear según configuración regional.
- Definir una única regla de redondeo.

## 19.5 Fechas

- Guardar instantes en UTC cuando representen un momento.
- Mostrar en `Atlantic/Canary`.
- Distinguir fecha local de instante.
- No calcular edad mediante aproximaciones.
- Mantener fecha de operación y fecha de registro cuando sean distintas.

## 19.6 Transacciones obligatorias

Se utilizarán transacciones para:

- Enviar solicitud y evidencias.
- Aprobar y crear alumno.
- Cambiar de grupo.
- Registrar pago y aplicación.
- Anular pago.
- Emitir número de recibo.
- Cambiar consentimiento con efectos relacionados.

Una operación crítica no podrá dejar estados parciales.

## 19.7 Idempotencia

Será obligatoria en:

- Envío de solicitud.
- Aprobación.
- Registro de pago.
- Emisión o reintento de recibo.
- Notificaciones susceptibles de reintento.

## 19.8 Concurrencia

- Revalidar antes de confirmar.
- Detectar versión modificada.
- Impedir doble aprobación.
- Impedir duplicidad de mensualidad.
- Impedir números de recibo repetidos.
- No confiar en datos cargados varios minutos antes para una acción crítica.

---

# 20. Obtención y modificación de datos

## 20.1 Consultas

- Seleccionar solo campos necesarios.
- Aplicar permisos antes de devolver resultados.
- Paginar listados.
- Indexar campos de búsqueda.
- Evitar consultas repetidas por elemento.
- No cargar historiales completos en resúmenes.
- No cargar imágenes originales en tarjetas.

## 20.2 Mutaciones

Cada mutación deberá:

- Autenticar.
- Autorizar.
- Validar.
- Comprobar estado actual.
- Ejecutar transacción cuando corresponda.
- Registrar auditoría.
- Devolver un resultado comprensible.

## 20.3 Separación

- Las consultas no modificarán datos.
- Las mutaciones no dependerán de valores no validados del navegador.
- Los componentes no construirán consultas SQL.
- Los formularios no conocerán credenciales de infraestructura.

## 20.4 Caché

Podrá utilizarse para:

- Contenido público.
- Catálogos.
- Resúmenes.
- Estadísticas agregadas.

No se confiará en caché desactualizada para:

- Autorizar.
- Aprobar.
- Confirmar pago.
- Comprobar consentimiento.
- Validar capacidad.
- Emitir recibo.

---

# 21. Manejo de errores

## 21.1 Principio

Los errores son estados previstos del producto.

No deberán producir:

- Pantalla blanca.
- Pérdida de datos.
- Confirmación falsa.
- Duplicado.
- Mensaje técnico incomprensible.
- Exposición de información sensible.

## 21.2 Categorías

- Validación.
- Autenticación.
- Autorización.
- Regla de negocio.
- Conflicto.
- Recurso no encontrado.
- Dependencia externa.
- Error temporal.
- Error inesperado.

## 21.3 Mensaje al usuario

Todo mensaje deberá indicar:

- Qué no pudo completarse.
- Si se guardó algo.
- Qué puede hacer ahora.
- Si puede reintentar.

No mostrará:

- Trazas.
- Consultas.
- Identificadores internos sensibles.
- Nombres de infraestructura.
- Secretos.

## 21.4 Registro técnico

Los errores inesperados tendrán:

- Identificador de correlación.
- Contexto técnico mínimo.
- Severidad.
- Fecha.
- Operación.
- Usuario técnico cuando sea necesario y lícito.

No incluirán:

- Contraseñas.
- Tokens.
- Cookies.
- Nombres completos.
- Correos.
- Teléfonos.
- Fechas de nacimiento.
- Observaciones.
- Documentos.

## 21.5 Reintentos

Solo se reintentará cuando:

- La operación sea idempotente.
- El error sea temporal.
- Exista límite.
- Se evite una tormenta de peticiones.

No se reintentará automáticamente una validación o denegación de permisos.

## 21.6 Fronteras de error

Las rutas principales tendrán recuperación localizada.

Un fallo en:

- Un gráfico no bloqueará el dashboard.
- Un correo no invalidará una solicitud guardada.
- Un recibo no duplicará un pago.
- Una imagen no romperá una ficha.

---

# 22. Seguridad

## 22.1 Principio

La seguridad se incorporará en cada fase y se verificará del lado servidor.

## 22.2 Autenticación

- Cuentas individuales.
- Contraseñas seguras o método equivalente.
- MFA administrativo.
- Recuperación de un solo uso.
- Notificación de eventos sensibles.
- Sin credenciales demo en producción.

## 22.3 Sesiones

- Cookies HttpOnly.
- Secure.
- SameSite adecuado.
- Rotación.
- Expiración por inactividad.
- Duración máxima.
- Invalidación al cerrar sesión.
- Reautenticación para acciones sensibles.

## 22.4 Autorización

- Denegar por defecto.
- Comprobar en servidor.
- Comprobar por recurso.
- Comprobar por acción.
- No confiar en ocultar botones.
- Probar acceso directo.
- Evitar referencias inseguras a objetos.

## 22.5 Entradas y salidas

- Validar todas las entradas.
- Codificar salidas.
- Utilizar APIs estructuradas.
- Evitar construcción manual de consultas.
- Limitar longitudes.
- Rechazar contenido malicioso.
- No interpretar texto de usuario como HTML.

## 22.6 Protección de acciones

- CSRF.
- XSS.
- Inyección.
- Clickjacking.
- Fuerza bruta.
- Enumeración.
- Automatización abusiva.
- Denegación de servicio razonablemente mitigada.

## 22.7 Secretos

- Solo variables seguras.
- Nunca en repositorio.
- Nunca en navegador.
- Nunca en logs.
- Diferentes por entorno.
- Rotación cuando exista exposición.
- Validación al iniciar.

## 22.8 Cabeceras

Se configurarán:

- HTTPS.
- HSTS cuando corresponda.
- Política de contenido.
- Protección de framing.
- Política de referrer.
- Permisos del navegador mínimos.

## 22.9 Dependencias

- Número mínimo.
- Procedencia conocida.
- Mantenimiento activo.
- Licencia compatible.
- Revisión de vulnerabilidades.
- Actualización controlada.

No se instalará una librería para una operación trivial.

## 22.10 Auditoría

Se auditarán:

- Accesos sensibles.
- Cambios de estado.
- Aprobaciones.
- Pagos.
- Anulaciones.
- Consentimientos.
- Exportaciones.
- Cambios de grupo.
- Bajas.

La auditoría:

- Será inmutable.
- Tendrá acceso limitado.
- No almacenará secretos.
- Mantendrá contexto suficiente.

## 22.11 Copias y recuperación

- Copias automáticas.
- Cifradas.
- Retención definida.
- Restauración probada.
- Acceso restringido.
- Procedimiento documentado.

Una copia no se considerará válida hasta haber probado su restauración.

---

# 23. Privacidad y datos personales

## 23.1 Minimización

Solo se recogerán datos necesarios para una finalidad documentada.

No se añadirá un campo:

- Porque podría ser útil.
- Para una funcionalidad futura.
- Para analítica.
- Para evitar preguntar a Leo después.

## 23.2 Menores

- Acceso restringido.
- Información adaptada.
- No exposición en notificaciones.
- No publicación por defecto.
- No perfiles de comportamiento.
- No reconocimiento facial.

## 23.3 Datos de salud

No se almacenarán en observaciones generales.

Si se aprueba un proceso de salud o emergencia:

- Tendrá finalidad.
- Base jurídica.
- Acceso restringido.
- Modelo separado.
- Conservación específica.
- Revisión legal.

## 23.4 Consentimientos

- Separados por finalidad.
- No premarcados.
- Versionados.
- Con fecha y actor.
- Retirables.
- Vinculados al texto exacto.
- No editables mediante interruptor.

## 23.5 Fotografías

- Canales separados.
- Consentimiento comprobado antes de uso.
- Retirada con efectos operativos.
- URLs privadas cuando no sean públicas.
- No almacenar en `public`.
- No enviar a herramientas no autorizadas.

## 23.6 Retención

Cada categoría tendrá:

- Finalidad.
- Plazo.
- Acción al vencer.
- Excepción legal.
- Responsable.

No se utilizará “guardar para siempre”.

## 23.7 Analítica

- Básica.
- Agregada.
- Sin PII.
- Sin contenido de formularios.
- Sin grabación de sesiones.
- Sin perfiles individuales.

---

# 24. Rendimiento

## 24.1 Objetivos públicos

- LCP inferior a 2,5 segundos.
- INP inferior a 200 ms.
- CLS inferior a 0,1.

Los objetivos se medirán en condiciones representativas.

## 24.2 Objetivos administrativos

- Inicio útil inferior a 2 segundos.
- Respuesta visual inferior a 100 ms.
- Búsqueda habitual inferior a 200 ms.
- Guardado habitual inferior a 1 segundo cuando la operación lo permita.

## 24.3 Presupuestos

Antes de añadir una dependencia o recurso se evaluará:

- Tamaño transferido.
- JavaScript enviado.
- Coste de ejecución.
- Número de peticiones.
- Impacto en interacción.
- Necesidad real.

## 24.4 JavaScript

- Servidor por defecto.
- Cargar interacción solo donde exista.
- Dividir módulos pesados.
- Evitar librerías duplicadas.
- Evitar dependencias para animaciones simples.
- No cargar código administrativo en rutas públicas.

## 24.5 Datos

- Paginación de servidor.
- Índices.
- Selección mínima.
- Evitar N+1.
- Carga progresiva.
- Historial bajo demanda.
- Agregados calculados de forma controlada.

## 24.6 Fuentes e imágenes

- Una familia.
- Pesos mínimos.
- Imágenes responsive.
- Dimensiones declaradas.
- Lazy loading.
- Formatos modernos.
- Sin recursos invisibles cargados por adelantado.

## 24.7 Medición

Toda cifra de rendimiento deberá indicar:

- Entorno.
- Dispositivo.
- Red.
- Volumen de datos.
- Percentil.
- Herramienta.

No se aceptarán métricas tomadas solo en un ordenador de desarrollo rápido.

---

# 25. Código limpio

## 25.1 Principios

- Claridad antes que ingenio.
- Funciones con una responsabilidad.
- Nombres explícitos.
- Flujo fácil de seguir.
- Dependencias visibles.
- Reglas centralizadas.
- Cambios pequeños.
- Eliminación de código muerto.

## 25.2 Complejidad

Antes de crear una abstracción se comprobará:

- Si existe duplicidad real.
- Si reduce complejidad.
- Si tiene una responsabilidad estable.
- Si facilita pruebas.
- Si encaja con el dominio.

No se crearán:

- Repositorios genéricos universales.
- Servicios base sin significado.
- Fábricas sin necesidad.
- Capas que solo reenvían parámetros.
- Sistemas de plugins para el MVP.
- Configuración para escenarios inexistentes.

## 25.3 Funciones

- Cortas cuando ayude a comprender.
- Entradas explícitas.
- Salidas predecibles.
- Efectos secundarios identificables.
- Errores controlados.
- Sin parámetros booleanos ambiguos.

## 25.4 Condicionales

- Evitar anidación profunda.
- Utilizar retornos tempranos cuando mejoren claridad.
- Nombrar condiciones complejas.
- Centralizar reglas de estado.
- No repetir permisos en cada componente.

## 25.5 Duplicación

No toda repetición exige abstracción.

Se extraerá cuando:

- Exprese la misma regla.
- Cambiarla en un lugar y no en otro provoque errores.
- La abstracción tenga un nombre claro.

## 25.6 Código muerto

Queda prohibido mantener:

- Funciones no utilizadas.
- Componentes alternativos abandonados.
- Comentarios con código antiguo.
- Banderas sin plan.
- Integraciones futuras vacías.
- Dependencias sin uso.

## 25.7 Formato

- Formateador automático.
- Linter.
- Orden de importaciones consistente.
- Sin advertencias ignoradas.
- Sin estilos personales por archivo.

---

# 26. Comentarios y documentación del código

## 26.1 Principio

Los comentarios explicarán por qué, no repetirán qué hace una línea evidente.

## 26.2 Comentarios útiles

- Regla de negocio no obvia.
- Decisión de seguridad.
- Restricción legal.
- Motivo de una transacción.
- Compatibilidad excepcional.
- Optimización medida.

## 26.3 Comentarios prohibidos

- Narrar asignaciones simples.
- Explicar sintaxis.
- Dejar código comentado.
- Justificar una solución que ya no existe.
- Ocultar una función demasiado compleja.

## 26.4 Tareas pendientes

Una tarea pendiente deberá incluir:

- Motivo.
- Referencia rastreable.
- Alcance.

No se utilizarán tareas pendientes indefinidas para posponer seguridad, legalidad o integridad.

## 26.5 Contratos

Las funciones públicas complejas documentarán:

- Propósito.
- Entradas relevantes.
- Resultado.
- Errores esperados.
- Efectos secundarios.

No se documentará de forma redundante lo que el tipo ya expresa.

---

# 27. Pruebas

## 27.1 Estrategia

Las pruebas se distribuirán según riesgo.

### Unitarias

Para:

- Reglas.
- Cálculos.
- Transiciones.
- Normalización.
- Formato.

### Integración

Para:

- Base de datos.
- Transacciones.
- Permisos.
- Consultas.
- Mutaciones.
- Notificaciones.

### Extremo a extremo

Para:

- Inscripción.
- Login.
- Revisión.
- Pago inicial.
- Aprobación.
- Búsqueda.
- Cambio de grupo.
- Pago.
- Recibo.

### Visuales

Para:

- Páginas principales.
- Responsive.
- Estados.
- Impresión.

### Accesibilidad

Para:

- Semántica.
- Teclado.
- Foco.
- Contraste.
- Lectores.

### Seguridad

Para:

- Autenticación.
- Autorización.
- Acceso directo.
- Validación.
- Abuso.
- Sesión.

## 27.2 Prioridad

Tendrán cobertura reforzada:

- Aprobación.
- Pagos.
- Recibos.
- Consentimientos.
- Menores.
- Permisos.
- Transacciones.

## 27.3 Datos de prueba

- Ficticios.
- Claramente identificables.
- Sin copiar datos reales.
- Con casos límite.
- Con nombres similares.
- Con diferentes edades y estados.

## 27.4 Estabilidad

Las pruebas:

- No dependerán del orden.
- No dependerán de la hora sin control.
- No dependerán de servicios externos reales.
- Limpiarán sus datos.
- No utilizarán esperas arbitrarias.
- Informarán de fallos comprensibles.

## 27.5 Cobertura

La cobertura numérica será un indicador, no el objetivo.

Una fase no estará suficientemente probada si:

- Las líneas están cubiertas pero no las reglas.
- No se prueban errores.
- No se prueban permisos.
- No se prueban transacciones.
- No se prueban casos límite.

---

# 28. Dependencias externas

## 28.1 Selección

Antes de añadir una dependencia se comprobará:

- Problema real.
- Alternativa nativa.
- Tamaño.
- Mantenimiento.
- Seguridad.
- Licencia.
- Compatibilidad.
- Coste.
- Política de datos.

## 28.2 Preferencias

Se preferirán:

- APIs del framework.
- Estándares web.
- Librerías consolidadas.
- Dependencias ya utilizadas.

## 28.3 Prohibiciones

- Dos librerías para el mismo problema.
- Paquetes abandonados.
- Paquetes con permisos excesivos.
- SDKs de analítica que capturen formularios.
- Librerías que obliguen a exponer secretos.
- Dependencias de pasarela en el MVP.
- Infraestructura multi-tenant en el MVP.

## 28.4 Sustitución

Una integración deberá quedar detrás de un límite cuando:

- Sea externa.
- Pueda cambiar.
- Maneje datos sensibles.
- Tenga coste.
- Pueda fallar independientemente.

No se creará un adaptador para un proveedor que todavía no existe en el alcance.

---

# 29. Escalabilidad y mantenibilidad

## 29.1 Objetivo real

La V1 deberá funcionar correctamente con:

- Cuatro grupos.
- Cientos de alumnos.
- Miles de mensualidades.
- Años de historial.

## 29.2 Escalabilidad permitida

- Índices adecuados.
- Paginación.
- Identificadores estables.
- Migraciones versionadas.
- Módulos claros.
- Consultas eficientes.
- Procesos idempotentes.
- Almacenamiento separado de archivos.

## 29.3 Escalabilidad prohibida

No se implementarán por anticipado:

- Microservicios.
- Multi-gimnasio.
- Multi-sede.
- Sharding.
- Bus de eventos externo.
- Motor de búsqueda dedicado.
- Sistema de plugins.
- Pasarela.
- Matriz compleja de permisos.

## 29.4 Criterio de evolución

Una solución se sustituirá cuando exista evidencia:

- Volumen.
- Latencia.
- Coste.
- Riesgo.
- Nueva necesidad aprobada.

No por una posibilidad hipotética.

## 29.5 Migraciones

- Versionadas.
- Reversibles cuando sea razonable.
- Probadas con datos representativos.
- Compatibles con despliegue.
- Sin pérdida silenciosa.
- Con copia previa cuando exista riesgo.

---

# 30. Reglas para funcionalidades futuras

## 30.1 Entrada al producto

Antes de desarrollar una función futura deberá existir:

- Problema definido.
- Usuario.
- Resultado esperado.
- Prioridad.
- Documento propietario.
- Criterios de aceptación.
- Impacto legal.
- Impacto de seguridad.
- Impacto en datos.
- Fase aprobada.

## 30.2 Actualización documental

La documentación se actualizará antes del código cuando cambie:

- Un estado.
- Un permiso.
- Un flujo.
- Una entidad.
- Un método de pago.
- Un documento legal.
- Una regla de aprobación.
- Un dato recogido.

## 30.3 Funcionalidades expresamente aplazadas

Para incorporar en el futuro:

- Multi-sede.
- Multi-gimnasio.
- Drag and drop.
- Analítica avanzada.
- Pasarela.
- Roles complejos.
- Automatizaciones avanzadas.

Se requerirá una nueva fase formal.

## 30.4 Sin preparación especulativa

Queda prohibido:

- Crear interfaces vacías.
- Crear tablas sin uso.
- Añadir campos “por si acaso”.
- Instalar SDKs inactivos.
- Añadir rutas ocultas.
- Crear banderas permanentes.
- Mantener componentes sin acceso.

Preparar el producto para crecer significa mantener límites claros, no construir el futuro antes de necesitarlo.

---

# 31. Entornos y configuración

## 31.1 Entornos

Como mínimo:

- Local.
- Preview o pruebas.
- Producción.

## 31.2 Separación

- Bases de datos separadas.
- Secretos separados.
- Almacenamiento separado.
- Correo controlado en pruebas.
- Datos reales solo en producción autorizada.

## 31.3 Configuración

- Validada al iniciar.
- Sin valores secretos en cliente.
- Sin valores de producción como fallback.
- Documentada.
- Con nombres consistentes.

## 31.4 Datos de demostración

- Solo local o preview.
- Nunca mezclados con producción.
- Eliminables de forma segura.
- Marcados claramente.

## 31.5 Banderas

Solo se utilizarán para:

- Despliegue controlado.
- Función aprobada.
- Periodo de retirada definido.

No se utilizarán como almacén permanente de alcance futuro.

---

# 32. Control de versiones y revisión

## 32.1 Cambios

Cada cambio deberá ser:

- Pequeño.
- Comprensible.
- Relacionado con una tarea.
- Revisable.
- Probado.

## 32.2 Commits

- Mensaje claro.
- Una intención principal.
- Sin secretos.
- Sin archivos generados innecesarios.
- Sin mezclar refactor no relacionado.

## 32.3 Revisión

Toda revisión comprobará:

- Comportamiento.
- Regresiones.
- Seguridad.
- Accesibilidad.
- Datos.
- Errores.
- Pruebas.
- Alcance.

La revisión no se limitará al estilo.

## 32.4 Cambios de base de datos

Deberán incluir:

- Migración.
- Prueba.
- Impacto.
- Plan de despliegue.
- Plan de recuperación cuando exista riesgo.

## 32.5 Dependencias

Un cambio de dependencias se revisará separadamente cuando tenga impacto amplio.

---

# 33. Observabilidad

## 33.1 Objetivo

Detectar fallos y comprender el funcionamiento sin invadir la privacidad.

## 33.2 Logs

- Estructurados.
- Con nivel.
- Con correlación.
- Sin PII.
- Sin secretos.
- Con retención definida.

## 33.3 Métricas

MVP:

- Disponibilidad.
- Latencia.
- Errores.
- Envíos de solicitud.
- Fallos de notificación.
- Aprobaciones fallidas.
- Pagos fallidos.
- Recibos fallidos.

No se crearán perfiles de usuarios.

## 33.4 Alertas

Solo alertas accionables:

- Servicio caído.
- Error repetido.
- Cola detenida.
- Notificación agotada.
- Copia fallida.
- Inconsistencia crítica.

No se generarán alertas por eventos normales.

## 33.5 Salud

El sistema deberá poder comprobar:

- Aplicación.
- Base de datos.
- Dependencias críticas.
- Capacidad de notificación cuando corresponda.

La comprobación no expondrá información interna.

---

# 34. Reglas específicas de interfaz pública

## 34.1 Conversión

- “Inscribirse” visible en menos de tres segundos.
- CTA en cabecera.
- CTA en hero.
- Destino `/inscripcion`.
- Texto consistente.

## 34.2 Contenido

- Real.
- Validado.
- Sin testimonios inventados.
- Sin precios de demo.
- Sin horarios ficticios.
- Sin stock.

## 34.3 Experiencia

- Scroll natural.
- Navegación por anclas.
- Header sin ocultar contenido.
- WhatsApp secundario.
- Acceso privado discreto.
- Sin promesa de portal para alumnos.

## 34.4 SEO

- Metadatos únicos.
- Canónica.
- Sitemap.
- Datos locales coherentes.
- Páginas administrativas no indexables.
- Información estructurada coincidente con contenido visible.

---

# 35. Reglas específicas del panel

## 35.1 Prioridad

El panel mostrará:

1. Acciones.
2. Alertas.
3. Resumen.
4. Datos secundarios.

## 35.2 Tres clics

Las tareas frecuentes buscarán un máximo de tres activaciones deliberadas desde su contexto.

No se eliminarán por ello:

- Confirmaciones sensibles.
- MFA.
- Reautenticación.
- Selección necesaria.
- Revisión legal.

Seguridad y claridad tienen prioridad sobre la métrica.

## 35.3 Búsqueda

- Instantánea.
- Con debounce.
- Permisos antes de resultados.
- Sin PII en URL.
- Sin términos en analítica.
- Con teclado.

## 35.4 Acciones sensibles

Deberán mostrar:

- Recurso afectado.
- Estado actual.
- Cambio.
- Consecuencias.
- Acción específica.
- Cancelación segura.

## 35.5 Densidad

- Compacta.
- Legible.
- Sin espacio de landing.
- Sin saturación.
- Con jerarquía.

---

# 36. Gestión de estados visuales

Cada pantalla deberá definir antes de considerarse terminada:

- Estado inicial.
- Carga.
- Éxito.
- Vacío.
- Sin resultados.
- Error recuperable.
- Error no recuperable.
- Sin permisos.
- Sin conexión cuando aplique.
- Conflicto.
- Sesión caducada.

## 36.1 Carga

- Esqueletos con dimensiones estables.
- Indicador dentro de acciones.
- Prevención de doble envío.
- Mensaje si la espera es anormal.

## 36.2 Vacío

Un estado vacío explicará:

- Qué significa.
- Si es normal.
- Qué acción puede realizarse.

No utilizará grandes ilustraciones decorativas.

## 36.3 Éxito

- Mensaje específico.
- No ambiguo.
- Visible tiempo suficiente.
- No depender solo de toast si el resultado es importante.

## 36.4 Conflicto

- No sobrescribir.
- Mostrar que los datos cambiaron.
- Permitir revisar.
- Repetir validación crítica.

---

# 37. Criterios de calidad por fase

Ninguna fase del plan de construcción se considerará terminada hasta superar todos los apartados aplicables.

## 37.1 Producto

- El alcance coincide con la fase.
- No se han añadido funciones futuras.
- Los textos coinciden con la documentación.
- Las reglas no se han reinterpretado.
- Leo puede comprender la tarea.

## 37.2 Funcionalidad

- El recorrido principal funciona.
- Los recorridos alternativos funcionan.
- Los estados límite están contemplados.
- No existen acciones sin resultado.
- No existen confirmaciones falsas.
- No se crean duplicados.

## 37.3 Arquitectura

- El código pertenece al módulo correcto.
- Las dependencias respetan capas.
- No existen consultas en componentes.
- Las reglas están centralizadas.
- No hay abstracciones especulativas.
- No hay código muerto.

## 37.4 Datos

- Entrada validada.
- Restricciones de base de datos.
- Transacciones correctas.
- Idempotencia donde corresponde.
- Migraciones probadas.
- Datos personales minimizados.

## 37.5 Seguridad

- Autenticación correcta.
- Autorización de servidor.
- Acceso directo probado.
- Secretos protegidos.
- Logs revisados.
- Acciones sensibles auditadas.
- Dependencias revisadas.

## 37.6 Accesibilidad

- Teclado.
- Foco.
- Semántica.
- Contraste.
- Formularios.
- Errores.
- Zoom.
- Movimiento reducido.
- Herramienta automática sin fallos críticos.
- Revisión manual realizada.

## 37.7 Responsive

- 320 px.
- 390 px.
- Tableta.
- Portátil.
- Escritorio amplio.
- Sin scroll horizontal.
- Sin controles cortados.
- Sin contenido oculto.

## 37.8 Rendimiento

- Objetivos medidos.
- Imágenes optimizadas.
- Sin JavaScript innecesario.
- Consultas revisadas.
- Listados paginados.
- Sin saltos de layout.

## 37.9 Errores

- Carga.
- Vacío.
- Error.
- Reintento.
- Conflicto.
- Sesión.
- Sin permisos.
- Sin pérdida de datos.

## 37.10 Pruebas

- Unitarias aplicables.
- Integración aplicable.
- Flujo principal extremo a extremo.
- Casos límite.
- Regresión.
- Pruebas estables.

## 37.11 Documentación

- Documento funcional actualizado.
- Decisiones registradas.
- Configuración documentada.
- Migraciones explicadas.
- Procedimiento operativo actualizado.

## 37.12 Revisión

- Revisión técnica completada.
- Hallazgos críticos resueltos.
- Sin advertencias ignoradas.
- Sin cambios no relacionados.
- Validación de la persona responsable.

---

# 38. Bloqueadores de cierre

Una fase no podrá cerrarse si existe:

- Error que provoca pérdida de datos.
- Alta automática de alumno.
- Acceso no autorizado.
- Pago duplicado.
- Aprobación duplicada.
- Evidencia legal inconsistente.
- Fotografía publicada sin autorización.
- Vulnerabilidad crítica o alta.
- Flujo principal inaccesible.
- Regresión conocida sin decisión.
- Contenido ficticio destinado a producción.
- Dependencia futura introducida fuera de alcance.
- Prueba crítica inestable.
- Migración no verificada.
- Ausencia de recuperación ante una operación sensible.

---

# 39. Excepciones a estas reglas

Una excepción deberá documentar:

- Regla afectada.
- Motivo.
- Alternativas estudiadas.
- Riesgo.
- Duración.
- Responsable.
- Fecha de revisión.

No se admitirán excepciones permanentes basadas únicamente en:

- Rapidez.
- Preferencia personal.
- Comodidad.
- “Después se corrige”.
- “Solo ocurre una vez”.

Las excepciones de seguridad, privacidad, legalidad o integridad requerirán aprobación expresa antes de desarrollar.

---

# 40. Principio final

El código de SAM GUK deberá ser más sencillo de entender que el problema que resuelve.

Toda decisión técnica deberá responder afirmativamente a estas preguntas:

1. ¿Respeta el producto documentado?
2. ¿Reduce el riesgo para Leo, alumnos y familias?
3. ¿Puede otra persona comprenderla y mantenerla?
4. ¿Funciona en móvil, con teclado y con tecnologías de asistencia?
5. ¿Evita construir algo que todavía no pertenece al MVP?
6. ¿Puede probarse de forma objetiva?

Si alguna respuesta es no, la solución no está lista para formar parte del proyecto.
