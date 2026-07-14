# SAM GUK CLUB TAEKWONDO
## Especificación profesional de la web pública

**Documento:** `01_PUBLIC_WEBSITE.md`  
**Versión:** 1.1  
**Estado:** Especificación funcional, visual y de experiencia de usuario  
**Responsable del producto:** LUMEN Studio  
**Última actualización:** 2 de julio de 2026

---

# 1. Propósito del documento

Este documento define con precisión cómo debe diseñarse, estructurarse y comportarse la web pública de SAM GUK Club Taekwondo.

No es un boceto, una colección de ideas ni una referencia estética genérica. Es la especificación de producto que deberá utilizarse durante diseño, redacción, desarrollo, validación y control de calidad.

Toda decisión futura sobre la web pública deberá comprobarse contra este documento. Si una propuesta contradice una regla aquí definida, deberá descartarse o documentarse formalmente como un cambio de producto.

La web pública debe ser una experiencia completa de captación y confianza. No debe limitarse a presentar información institucional. Su función principal es conseguir que una persona interesada entienda rápidamente qué ofrece SAM GUK, encuentre la clase adecuada y pueda iniciar una inscripción sin esfuerzo.

---

# 2. Objetivo de la web

La web pública tiene cinco objetivos principales, ordenados por prioridad:

1. Conseguir nuevas inscripciones.
2. Transmitir que SAM GUK es un club profesional, moderno, seguro y bien organizado.
3. Ayudar a padres, jóvenes y adultos a identificar rápidamente qué clase les corresponde.
4. Resolver las dudas esenciales sobre metodología, horarios, tarifas, ubicación y contacto.
5. Conectar la presencia pública del club con el futuro sistema privado de gestión.

La web debe reducir la distancia entre el interés inicial y la inscripción. El usuario no debe tener que buscar, interpretar estructuras complejas ni leer grandes bloques de texto para saber qué hacer.

La acción principal de toda la experiencia es:

> **Inscribirse**

Todas las decisiones de jerarquía, navegación, contenido, contraste y responsive deben proteger esta acción.

---

# 3. Prioridad absoluta: inscripción visible en menos de tres segundos

La regla más importante de la web es la siguiente:

> Nada más entrar en la página, cualquier usuario debe poder localizar el botón **“Inscribirse”** en menos de tres segundos.

Esta regla es obligatoria y debe cumplirse tanto en escritorio como en móvil.

## 3.1 Aplicación práctica

El botón “Inscribirse” deberá aparecer simultáneamente en:

- La cabecera principal.
- El hero de la página de inicio.

Ambos botones deberán ser visibles sin hacer scroll en los tamaños de pantalla habituales.

El texto del botón será siempre **“Inscribirse”**. No se sustituirá por expresiones ambiguas como:

- Empezar.
- Saber más.
- Descubrir.
- Únete.
- Más información.
- Reserva ahora.

El botón llevará directamente al inicio del flujo de inscripción en `/inscripcion`. No abrirá un modal comercial, no obligará a pasar antes por WhatsApp y no enviará al usuario a una sección intermedia.

## 3.2 Criterios de aceptación

La regla de tres segundos se considerará cumplida únicamente si:

- El CTA está visible al cargar la web, sin scroll.
- El CTA tiene contraste suficiente respecto al fondo.
- El texto completo “Inscribirse” se lee sin truncamiento.
- El CTA no está escondido dentro de un menú móvil.
- El CTA no queda tapado por banners, avisos de cookies o elementos flotantes.
- El CTA puede activarse con teclado.
- El CTA tiene un área táctil mínima de 44 por 44 píxeles.
- Un clic lleva directamente a `/inscripcion`.
- La cabecera mantiene el CTA visible mientras el usuario recorre la página.

En móvil, la cabecera deberá mostrar siempre el logotipo, el botón “Inscribirse” y el control de menú. La navegación secundaria podrá ocultarse en un menú, pero el CTA principal nunca.

---

# 4. Público objetivo

La web debe poder ser entendida y utilizada sin aprendizaje previo por los siguientes perfiles:

## 4.1 Padres y madres

Buscan una actividad segura, educativa y bien organizada para sus hijos. Sus principales preguntas son:

- ¿A partir de qué edad puede empezar?
- ¿Qué beneficios tendrá?
- ¿Quién dirige las clases?
- ¿Qué días y a qué hora se entrena?
- ¿Cuánto cuesta?
- ¿Dónde está el club?
- ¿Cómo inscribo a mi hijo?

Este perfil necesita claridad, confianza, fotografías reales y ausencia de fricción.

## 4.2 Adolescentes

Buscan una actividad dinámica, un entorno social, mejora física, progresión y objetivos. La experiencia debe sentirse actual, deportiva y auténtica, sin resultar infantil.

## 4.3 Adultos

Buscan condición física, disciplina, aprendizaje técnico, desconexión y una actividad compatible con su horario. No deben percibir que el club está dirigido únicamente a niños.

## 4.4 Competidores y alumnos avanzados

Buscan nivel técnico, cultura de entrenamiento, progresión y pertenencia a un club serio. Solo deberán mostrarse mensajes de competición, resultados o preparación avanzada cuando sean reales y verificables.

## 4.5 Familias que comparan varias opciones

La web debe permitir comparar rápidamente:

- Tipo de clases.
- Edades.
- Horarios.
- Tarifas.
- Ubicación.
- Forma de inscripción.

La información esencial no deberá esconderse detrás de formularios de contacto.

---

# 5. Posicionamiento de marca

SAM GUK debe presentarse como un club de taekwondo con tradición marcial y una forma moderna de enseñar, comunicar y organizarse.

La marca debe transmitir:

- Disciplina.
- Respeto.
- Seguridad.
- Progreso.
- Confianza.
- Comunidad.
- Profesionalidad.
- Energía contenida.
- Modernidad.

La web no debe transmitir:

- Agresividad.
- Violencia.
- Improvisación.
- Estética de gimnasio antiguo.
- Saturación visual.
- Exceso de elementos orientales decorativos.
- Apariencia de plantilla genérica.
- Sensación de oferta comercial de bajo coste.

La tradición marcial debe percibirse a través de la actitud, los gestos, la fotografía, la disciplina visual y la redacción. No deberá representarse mediante dragones, pinceles japoneses, texturas de pergamino, tipografías de imitación asiática o decoración temática.

---

# 6. Filosofía del diseño

La web debe sentirse premium, moderna, limpia y minimalista.

Las referencias conceptuales son:

- Apple, por la claridad, la jerarquía y el uso del espacio.
- Stripe, por la organización de la información y la precisión de la interfaz.
- Nike, por la fuerza de la fotografía y la seguridad de la marca.

Estas referencias no deben copiarse de forma literal. Deben utilizarse como criterio de calidad.

## 6.1 Principios visuales

1. **Una acción principal por contexto.**  
   Cada pantalla debe dejar claro cuál es la siguiente acción.

2. **Mucho espacio útil.**  
   El espacio en blanco debe mejorar la lectura, separar ideas y elevar la percepción de calidad.

3. **Fotografía protagonista.**  
   La imagen real del club debe tener más peso que la decoración.

4. **Jerarquía antes que ornamento.**  
   Tamaño, alineación, contraste y ritmo deben resolver el diseño antes de añadir efectos.

5. **Contenido breve y específico.**  
   Cada párrafo debe responder una pregunta real del usuario.

6. **Consistencia extrema.**  
   Botones, radios, espacios, tipografía, iconos y colores deben seguir un sistema único.

7. **Movimiento con propósito.**  
   Las animaciones deben explicar, orientar o aportar continuidad. Nunca deben distraer.

8. **Diseño ligero.**  
   La web no debe parecer un panel de tarjetas ni una colección de cajas flotantes.

## 6.2 Sensación general

La experiencia debe sentirse:

- Luminosa.
- Ordenada.
- Rápida.
- Segura.
- Deportiva.
- Humana.
- Contemporánea.

La web utilizará principalmente fondos blancos y grises muy claros. El azul aportará identidad y estructura. El rojo se reservará para acciones clave, especialmente la inscripción.

---

# 7. Identidad visual

## 7.1 Uso del logotipo

El logotipo oficial de SAM GUK deberá utilizarse siempre desde un archivo maestro aprobado.

Deberán existir, como mínimo:

- Versión principal para fondo claro.
- Versión invertida para fotografía o fondo azul.
- Isotipo reducido para favicon y usos compactos.

Reglas:

- No deformar el logotipo.
- No alterar sus proporciones.
- No añadir sombras, contornos o brillos.
- No recolorearlo de forma arbitraria.
- No colocarlo sobre zonas de fotografía con poco contraste.
- Mantener un área de seguridad alrededor equivalente, como mínimo, a la altura de una letra del nombre.
- No utilizar una recreación tipográfica como sustituto si existe el archivo oficial.

La denominación pública preferente será:

> **SAM GUK Club Taekwondo**

En titulares de gran tamaño podrá utilizarse “SAM GUK” y dejar “Club Taekwondo” como descriptor.

## 7.2 Paleta de colores

La paleta debe ser reducida y estable.

### Azul principal

**SAM GUK Navy**  
Valor de referencia: `#0A2540`

Uso:

- Cabecera sobre fondo claro.
- Footer.
- Bloques de énfasis.
- Texto destacado.
- Fondos de alto contraste.
- Superposición sobre fotografía cuando sea necesaria.

Debe transmitir confianza, tradición y profesionalidad.

### Azul interactivo

**SAM GUK Blue**  
Valor de referencia: `#174EA6`

Uso:

- Enlaces.
- Estados de foco.
- Controles activos secundarios.
- Elementos informativos.

No debe competir con el rojo del CTA principal.

### Rojo corporativo

**SAM GUK Red**  
Valor de referencia: `#C8102E`

Uso:

- Botón principal “Inscribirse”.
- Indicadores de acción prioritaria.
- Acentos puntuales.
- Estados activos muy concretos.

El rojo no se utilizará como fondo de grandes secciones ni como color decorativo repetido. Su escasez es lo que debe darle fuerza.

### Blanco

**White**  
Valor: `#FFFFFF`

Uso:

- Fondo principal.
- Texto sobre azul o rojo.
- Superficies limpias.

### Gris de fondo

**Cloud**  
Valor de referencia: `#F5F7FA`

Uso:

- Alternancia de secciones.
- Fondos de tablas o agrupaciones.
- Separación de áreas sin recurrir a bordes excesivos.

### Gris de borde

**Mist**  
Valor de referencia: `#DDE3EA`

Uso:

- Divisores.
- Bordes de controles.
- Límites discretos.

### Texto principal

**Ink**  
Valor de referencia: `#111318`

Uso:

- Titulares.
- Texto principal.
- Información de máxima importancia.

El negro o casi negro se utilizará únicamente para texto, nunca como gran superficie decorativa.

### Texto secundario

**Slate**  
Valor de referencia: `#5F6B7A`

Uso:

- Descripciones.
- Metadatos.
- Información secundaria.

## 7.3 Proporción cromática

Como referencia visual:

- 65 a 75 % blanco.
- 15 a 20 % grises muy claros.
- 8 a 12 % azul.
- 3 a 5 % rojo.

Esta proporción no es matemática, pero define la intención: el rojo debe llamar a la acción, no colorear toda la web.

## 7.4 Colores prohibidos

No se utilizarán:

- Dorados decorativos.
- Morados.
- Naranjas.
- Tonos beige o marrones como base.
- Colores neón.
- Gradientes multicolor.
- Fondos negros como recurso estético.

Tampoco se utilizarán degradados para sustituir la falta de fotografía o jerarquía. Si se aplica una superposición sobre una imagen, deberá ser azul uniforme o un degradado azul muy discreto destinado exclusivamente a garantizar legibilidad.

---

# 8. Tipografía

## 8.1 Familia tipográfica

La web utilizará una única familia sans serif contemporánea.

La recomendación principal es:

> **Inter Variable**

Alternativas válidas, si la identidad final lo requiere:

- Geist Sans.
- Helvetica Neue.
- Arial como último fallback.
- Fuente de sistema de Apple, Windows y Android.

No se utilizarán tipografías caligráficas, orientales, brush, stencil, display agresivas ni fuentes asociadas a cartelería de combate.

## 8.2 Jerarquía tipográfica

### Titular principal

- Escritorio: 64 a 72 px.
- Tableta: 52 a 60 px.
- Móvil: 42 a 48 px.
- Peso: 750 u 800.
- Interlineado: compacto pero legible.
- Longitud máxima: dos líneas.

### Titulares de sección

- Escritorio: 44 a 52 px.
- Móvil: 32 a 38 px.
- Peso: 700 u 750.
- Longitud recomendada: una o dos líneas.

### Titulares secundarios

- Escritorio: 24 a 30 px.
- Móvil: 22 a 26 px.
- Peso: 650 a 700.

### Texto de cuerpo

- Escritorio: 18 px.
- Móvil: 17 px.
- Interlineado: entre 1,55 y 1,7.
- Peso: 400.
- Anchura máxima: entre 60 y 72 caracteres por línea.

### Texto de interfaz

- Botones: 15 o 16 px.
- Navegación: 15 o 16 px.
- Etiquetas: 13 o 14 px.
- Peso: entre 550 y 700 según importancia.

## 8.3 Reglas tipográficas

- El espaciado entre letras será neutro por defecto.
- Las mayúsculas se reservarán para etiquetas cortas.
- No se escribirán párrafos completos en mayúsculas.
- No se reducirá el tamaño del texto para encajarlo en un espacio.
- Los títulos deberán envolver correctamente antes de considerar cambios de tamaño.
- Las cifras de horarios y tarifas deberán utilizar números tabulares cuando sea posible.
- No se usarán más de tres pesos tipográficos en una misma página.
- No se usarán efectos de texto, contornos, sombras fuertes ni rellenos degradados.

---

# 9. Estilo de interfaz

## 9.1 Sistema de composición

La página se organizará mediante bandas de ancho completo con contenido interior limitado.

- Anchura máxima del contenido: 1200 a 1280 px.
- Margen lateral en escritorio: mínimo 32 px.
- Margen lateral en móvil: 20 px.
- Rejilla de escritorio: 12 columnas.
- Rejilla móvil: 4 columnas.
- Separación vertical estándar entre secciones: 96 a 144 px en escritorio.
- Separación vertical estándar en móvil: 64 a 88 px.

No deberán colocarse todas las secciones dentro de tarjetas. Las tarjetas se reservarán para elementos repetidos, como clases o tarifas.

## 9.2 Radios y bordes

- Radio estándar de tarjetas: 8 px.
- Radio de botones: 6 u 8 px.
- Radio de imágenes: 8 px o imagen a sangre.
- Bordes: 1 px y color gris claro.

No se utilizarán tarjetas excesivamente redondeadas ni botones con forma de cápsula como estilo general.

## 9.3 Sombras

Las sombras serán mínimas.

Se utilizarán únicamente para:

- Separar una cabecera fija del contenido.
- Elevar un menú móvil.
- Diferenciar un control flotante imprescindible.

Las tarjetas normales deberán apoyarse principalmente en fondo, borde y espacio. No deberán parecer elementos flotando sobre la página.

## 9.4 Iconografía

La iconografía será lineal, sencilla y consistente.

- Tamaño habitual: 20 o 24 px.
- Grosor visual uniforme.
- Sin iconos 3D.
- Sin ilustraciones emoji.
- Sin iconos decorativos innecesarios.
- Los iconos desconocidos deberán incluir etiqueta de texto.

Los iconos nunca sustituirán palabras esenciales como “Inscribirse”, “Horarios” o “Contacto”.

---

# 10. Dirección fotográfica

## 10.1 Regla principal

Toda la fotografía deberá ser real y pertenecer al club SAM GUK.

No se utilizarán fotografías de stock, imágenes genéricas de taekwondo, fotografías descargadas de redes sociales sin autorización ni imágenes generadas para representar falsamente las instalaciones, alumnos o equipo.

## 10.2 Estilo fotográfico

Las fotografías deben sentirse:

- Naturales.
- Cinematográficas.
- Luminosas.
- Nítidas.
- Humanas.
- Deportivas.
- Respetuosas.

La dirección de arte deberá buscar:

- Luz natural o iluminación limpia del dojang.
- Movimiento congelado con calidad.
- Expresiones auténticas.
- Interacción entre instructor y alumno.
- Gestos de saludo, escucha y concentración.
- Detalles de cinturones, dobok y tatami.
- Diversidad de edades.
- Espacios ordenados.

## 10.3 Fotografías que deben evitarse

- Poses agresivas hacia cámara.
- Golpes presentados como violencia.
- Imágenes oscuras donde no se reconocen personas o instalaciones.
- Fotos excesivamente editadas.
- Filtros de color intensos.
- Fondos desordenados.
- Collages.
- Montajes con texto incrustado.
- Fotografías con baja resolución.
- Imágenes donde un menor aparezca sin el consentimiento correspondiente.

## 10.4 Protección de menores

Antes de publicar fotografías de menores deberá existir autorización expresa y documentada.

Si no existe consentimiento suficiente:

- Se utilizarán planos de grupo autorizados.
- Se priorizarán encuadres donde no se identifique claramente el rostro.
- Se fotografiarán detalles de la actividad.
- No se publicarán nombres completos asociados a fotografías.

## 10.5 Tratamiento técnico

- Hero en formato horizontal y con espacio negativo para texto.
- Formatos preferentes: AVIF y WebP.
- JPEG como fallback cuando sea necesario.
- No incrustar texto dentro de las imágenes.
- Definir dimensiones para evitar saltos de layout.
- Cargar de forma prioritaria solo la imagen principal.
- Aplicar carga diferida al contenido situado fuera del primer viewport.
- Mantener una versión móvil con recorte específico cuando la composición lo requiera.

---

# 11. Arquitectura de navegación

## 11.1 Estructura principal

La web pública tendrá una página de inicio de recorrido vertical, con navegación por anclas para los contenidos principales.

Rutas previstas:

- `/` - Página pública principal.
- `/inscripcion` - Inicio del flujo de inscripción.
- `/legal/aviso-legal` - Aviso legal.
- `/legal/privacidad` - Política de privacidad.
- `/legal/cookies` - Política de cookies.
- `/admin` - Acceso privado exclusivo para Leo y personal autorizado, visible únicamente desde el footer.

No se crearán páginas separadas para contenidos que puedan resolverse claramente dentro de la página principal. La navegación debe ser corta.

## 11.2 Navegación de escritorio

Orden exacto:

1. Logotipo SAM GUK.
2. El club.
3. Clases.
4. Horarios.
5. Tarifas.
6. Contacto.
7. Botón principal “Inscribirse”.

El logotipo llevará al inicio de la página.

Los enlaces centrales realizarán scroll a su sección correspondiente.

El botón “Inscribirse” será visualmente distinto de los enlaces y permanecerá visible en todo momento.

## 11.3 Navegación móvil

La cabecera móvil tendrá:

1. Logotipo compacto.
2. Botón “Inscribirse”.
3. Botón de menú.

El menú desplegable incluirá:

- El club.
- Clases.
- Horarios.
- Tarifas.
- Contacto.

El acceso privado no aparecerá en el menú principal.

El menú deberá:

- Abrirse sin desplazar el contenido.
- Bloquear el scroll del fondo.
- Poder cerrarse con un botón visible.
- Poder cerrarse con la tecla Escape.
- Mantener el foco dentro mientras está abierto.
- Devolver el foco al botón de menú al cerrarse.

---

# 12. Orden exacto de la página

La página de inicio deberá respetar el siguiente orden:

1. Cabecera global.
2. Hero principal.
3. Franja de confianza rápida.
4. Presentación del club.
5. Clases por etapa.
6. Método SAM GUK y beneficios.
7. Experiencia y comunidad.
8. Horarios.
9. Tarifas.
10. Explicación breve del proceso de inscripción.
11. Ubicación e instalaciones.
12. Preguntas frecuentes y contacto.
13. CTA final.
14. Footer.

Este orden responde al recorrido mental del usuario:

1. Identificar la marca.
2. Entender la propuesta.
3. Confirmar que es relevante para su edad o familia.
4. Obtener confianza.
5. Consultar disponibilidad y precio.
6. Inscribirse.

Las secciones no deberán reordenarse por motivos puramente estéticos.

---

# 13. Especificación detallada de cada sección

## 13.1 Cabecera global

### Objetivo

Permitir orientación inmediata y mantener siempre disponible la inscripción.

### Comportamiento

- Será fija durante el scroll.
- En la parte superior del hero podrá utilizar una versión transparente si el contraste es perfecto.
- Tras los primeros 24 a 48 px de scroll pasará a fondo blanco con una transición breve.
- Al cambiar a fondo blanco añadirá un borde inferior o sombra muy sutil.
- Mantendrá una altura estable para evitar saltos.
- No crecerá ni se reducirá de manera brusca.

### CTA

El botón “Inscribirse” deberá:

- Tener fondo rojo corporativo.
- Tener texto blanco.
- Mantener el mismo texto en todas las resoluciones.
- Ser visible sin abrir el menú móvil.
- Llevar a `/inscripcion`.

### Fotografía

No aplica.

### Restricciones

- No incluir redes sociales en la cabecera.
- No incluir teléfono, WhatsApp, selector de idioma o acceso privado en la navegación principal.
- No incluir dos CTA principales.
- No usar una barra superior promocional salvo necesidad real y documentada.

---

## 13.2 Hero principal

### Objetivo

Comunicar en segundos qué es SAM GUK, para quién es y cuál es la acción principal.

### Contenido obligatorio

**Etiqueta corta:**

> Club de Taekwondo

**Titular principal:**

> SAM GUK

**Propuesta de valor:**

> Taekwondo, disciplina y crecimiento para todas las edades.

**CTA principal:**

> Inscribirse

**CTA secundario:**

> Ver horarios

### Jerarquía

El nombre SAM GUK será el elemento tipográfico principal.

La propuesta de valor deberá poder leerse de un vistazo y no superar dos líneas en escritorio ni tres en móvil.

El botón “Inscribirse” aparecerá antes que “Ver horarios” y tendrá mayor contraste.

### Composición

- Hero de gran formato.
- Altura recomendada: entre 78 y 90 % del viewport.
- El inicio de la siguiente sección deberá insinuarse en pantallas de altura estándar.
- El texto estará alineado a la izquierda.
- La fotografía ocupará el fondo completo o una banda visual dominante.
- No se utilizará un hero partido en dos columnas con texto a un lado y una tarjeta de imagen al otro.
- El texto no estará dentro de una tarjeta flotante.

### Fotografía

Utilizar una fotografía horizontal real del club.

La imagen ideal mostrará:

- Una clase real en el dojang.
- Un alumno o instructor ejecutando técnica con control.
- Profundidad de campo.
- Espacio visual limpio en el lado donde se colocará el texto.
- Elementos reconocibles del club.
- Actitud de concentración, no agresividad.

En móvil deberá existir un recorte específico que mantenga visible el sujeto principal y deje espacio suficiente para el texto.

### Tratamiento

Cuando sea necesario, se aplicará una superposición azul marino para garantizar contraste. No se aplicará una capa negra.

### Restricciones

- No utilizar carrusel.
- No utilizar vídeo con reproducción automática como primera versión.
- No incluir testimonios, horarios completos ni tarifas en el hero.
- No incluir más de dos botones.
- No incluir efectos de partículas, letras animadas o fondos abstractos.

---

## 13.3 Franja de confianza rápida

### Objetivo

Confirmar en pocos segundos que el club es adecuado para una audiencia amplia.

### Contenido

La franja mostrará tres mensajes breves:

- Clases para todas las edades.
- Progresión por niveles y cinturones.
- Entrenamiento basado en respeto y disciplina.

Si se incorporan cifras, años de experiencia, resultados o número de alumnos, deberán ser reales, actuales y verificables.

### Diseño

- Fondo blanco o gris muy claro.
- Tres columnas en escritorio.
- Una columna o scroll no horizontal en móvil.
- Separadores discretos.
- Iconos sencillos y no decorativos.
- Sin tarjetas individuales flotantes.

### Fotografía

No necesaria. Esta sección debe ser rápida y ligera.

---

## 13.4 Presentación del club

### Ancla

`#club`

### Objetivo

Explicar qué hace diferente a SAM GUK y generar confianza humana.

### Contenido

La sección deberá incluir:

- Un titular directo.
- Un texto breve sobre la filosofía del club.
- La relación entre taekwondo, disciplina y crecimiento personal.
- La importancia del respeto, la constancia y la progresión.
- Una referencia clara a que el club acompaña a niños, jóvenes y adultos.

Propuesta de titular:

> Mucho más que aprender una técnica.

El cuerpo de texto no deberá superar dos párrafos breves.

### Composición

- Diseño en dos columnas en escritorio.
- Fotografía dominante en una columna.
- Texto en la otra.
- En móvil, fotografía primero y texto después.

### Fotografía

Utilizar una fotografía real de:

- Leo o el responsable técnico interactuando con alumnos.
- Un momento de corrección técnica.
- El saludo al inicio o final de una clase.
- Una escena donde se perciban atención y respeto.

No se publicarán titulaciones, grados, premios o biografías que no hayan sido validados.

### CTA

En esta sección podrá aparecer un enlace secundario:

> Conocer las clases

Este enlace llevará a `#clases`. No competirá visualmente con “Inscribirse”.

---

## 13.5 Clases por etapa

### Ancla

`#clases`

### Objetivo

Permitir que cada visitante identifique rápidamente qué programa le corresponde.

### Estructura

Se presentarán tres bloques principales:

1. Infantil.
2. Jóvenes.
3. Adultos.

Las franjas de edad actuales de referencia son:

- Infantil: 4 a 11 años.
- Jóvenes: 12 a 17 años.
- Adultos: 18 años o más.

Estas edades deberán ser confirmadas por Leo antes de la publicación definitiva.

### Contenido de cada bloque

Cada clase deberá incluir:

- Nombre del grupo.
- Rango de edad.
- Beneficio principal.
- Descripción máxima de tres líneas.
- Enlace a horarios filtrados.
- CTA de inscripción contextual.

Ejemplo de enfoque:

**Infantil**  
Coordinación, confianza, respeto y autocontrol en un entorno seguro.

**Jóvenes**  
Técnica, condición física, disciplina y objetivos claros de progresión.

**Adultos**  
Entrenamiento completo para mejorar fuerza, movilidad, técnica y equilibrio mental.

### CTA

Cada bloque tendrá:

- Acción secundaria: “Ver horarios”.
- Acción principal contextual: “Inscribirse”.

Cuando sea posible, el CTA deberá conservar la selección:

- `/inscripcion?grupo=infantil`
- `/inscripcion?grupo=jovenes`
- `/inscripcion?grupo=adultos`

### Fotografía

Cada bloque utilizará una fotografía real y diferente:

- Infantil: clase guiada, ambiente seguro y activo.
- Jóvenes: entrenamiento técnico o trabajo en pareja controlado.
- Adultos: práctica real, evitando fotografías que parezcan una clase infantil ampliada.

Las fotografías deberán mostrar el grupo correspondiente. Nunca se utilizará la misma imagen para las tres etapas.

### Responsive

- Tres columnas en escritorio amplio.
- Dos más una en tableta si el contenido mantiene equilibrio.
- Una columna en móvil.
- El texto y los botones no deberán quedar superpuestos sobre zonas complejas de fotografía.

---

## 13.6 Método SAM GUK y beneficios

### Objetivo

Explicar el valor del entrenamiento sin recurrir a mensajes genéricos de gimnasio.

### Contenido

La sección se organizará en cuatro principios:

1. Disciplina.
2. Respeto.
3. Progresión.
4. Confianza.

Cada principio tendrá:

- Un título.
- Una descripción de una o dos frases.
- Un apoyo visual o fotográfico real.

La redacción deberá explicar consecuencias concretas:

- Aprender a mantener la constancia.
- Entender y respetar normas.
- Avanzar mediante objetivos alcanzables.
- Ganar seguridad personal.

No se harán promesas médicas, psicológicas o educativas que no puedan sostenerse.

### Diseño

La sección no debe parecer una cuadrícula de beneficios de una aplicación tecnológica.

La composición preferida será:

- Una fotografía grande.
- Una lista editorial de principios.
- Separadores claros.
- Numeración o iconos mínimos.

### Fotografía

Utilizar detalles reales:

- Cinturones.
- Saludo.
- Corrección de postura.
- Preparación antes de clase.
- Trabajo coordinado.

---

## 13.7 Experiencia y comunidad

### Objetivo

Mostrar que SAM GUK es un entorno humano, activo y auténtico.

### Contenido

La sección podrá incluir:

- Momentos de entrenamiento.
- Actividades de grupo.
- Cambios de cinturón.
- Participación en eventos.
- Competición, únicamente si forma parte real de la actividad.

No se publicarán resultados, medallas ni cifras sin verificación.

### Diseño

Se utilizará una composición editorial de dos o tres fotografías grandes. No se utilizará un carrusel automático.

En móvil las imágenes se apilarán manteniendo un orden narrativo.

### Fotografía

Fotografías reales de:

- Grupo completo.
- Celebración o ceremonia.
- Entrenamiento en parejas.
- Instructor acompañando al grupo.

La selección debe equilibrar técnica, comunidad y emoción.

### Testimonios

Solo se incluirán testimonios si:

- Son reales.
- Existe permiso para publicarlos.
- Incluyen nombre de pila o formato autorizado.
- No contienen promesas exageradas.

Si no existen testimonios validados, la sección funcionará únicamente con fotografía y texto institucional. Nunca se inventarán reseñas.

---

## 13.8 Horarios

### Ancla

`#horarios`

### Objetivo

Permitir que el usuario compruebe rápidamente si el club encaja en su disponibilidad.

### Contenido

La sección mostrará:

- Días de entrenamiento.
- Hora de inicio.
- Hora de finalización, si aplica.
- Grupo.
- Rango de edad.
- Nivel, si existen grupos diferenciados.
- Estado especial, como festivo o cambio temporal, solo cuando sea necesario.

Los horarios deberán proceder de una fuente única y validada. No se introducirán horarios ficticios en producción.

### Diseño de escritorio

- Tabla clara o rejilla semanal.
- Columnas legibles.
- Encabezados persistentes si la lista es larga.
- Filtros simples por grupo cuando aporten valor.
- Alto contraste y separación suficiente entre filas.

### Diseño móvil

La tabla no deberá comprimirse hasta volverse ilegible.

Se transformará en:

- Pestañas por grupo, o
- Tarjetas por día.

El usuario no deberá realizar zoom ni desplazamiento horizontal para leer los horarios.

### CTA

Después de los horarios aparecerá:

> ¿Has encontrado tu grupo?

Botón:

> Inscribirse

Cuando el usuario haya filtrado un grupo, la inscripción deberá conservar esa selección.

### Fotografía

No es necesaria dentro del bloque de horarios. La legibilidad tiene prioridad.

---

## 13.9 Tarifas

### Ancla

`#tarifas`

### Objetivo

Evitar incertidumbre y permitir una decisión informada.

### Estructura

Se mostrará una opción por grupo:

- Infantil.
- Jóvenes.
- Adultos.

Cada tarifa deberá incluir:

- Nombre.
- Cuota.
- Periodicidad.
- Número de clases incluidas.
- Matrícula, si existe.
- Seguro o licencia, si aplica.
- Material incluido o no incluido.
- Condiciones relevantes.

Los importes utilizados en la demo previa, 40 €, 45 € y 50 €, eran valores de ejemplo. No deberán publicarse como precios definitivos hasta que Leo los valide.

### Diseño

- Máximo tres tarjetas.
- Una jerarquía sencilla.
- Precio claramente visible.
- Sin precios tachados.
- Sin etiquetas falsas como “Más popular”.
- Sin contadores de urgencia.
- Sin comparativas artificiales.

### CTA

Cada tarifa tendrá un botón “Inscribirse”.

La selección de tarifa y grupo se enviará al flujo de inscripción cuando sea posible.

### Fotografía

No necesaria. La sección debe ser limpia y centrada en información.

### Si el club decide no publicar precios

Solo podrá sustituirse el importe por “Consultar cuota” si existe una decisión expresa del producto. En ese caso se mantendrán visibles las condiciones y el CTA de inscripción.

---

## 13.10 Proceso de inscripción

### Objetivo

Reducir la incertidumbre antes de que el usuario abandone la página pública.

### Contenido

La sección explicará el proceso en tres pasos:

1. Selecciona el alumno y el grupo.
2. Completa los datos básicos.
3. Recibe la confirmación del club.

El texto debe dejar claro que:

- La inscripción se inicia online.
- El proceso es sencillo.
- Leo o el club podrán confirmar los detalles necesarios.

La definición completa del proceso pertenecerá a `02_REGISTRATION_FLOW.md`.

### Diseño

- Tres pasos en línea en escritorio.
- Tres pasos apilados en móvil.
- Números grandes y claros.
- Sin ilustraciones complejas.

### CTA

Botón principal:

> Iniciar inscripción

Este botón también llevará a `/inscripcion`.

### Fotografía

No necesaria. Puede utilizarse una fotografía lateral de bienvenida si existe una imagen real adecuada, pero la claridad del proceso tendrá prioridad.

---

## 13.11 Ubicación e instalaciones

### Objetivo

Eliminar dudas sobre dónde está el club y cómo llegar.

### Contenido

- Nombre completo del club.
- Dirección real.
- Municipio.
- Código postal.
- Referencia de acceso cuando sea útil.
- Horario de atención, si existe.
- Enlace “Cómo llegar”.
- Datos de transporte o aparcamiento únicamente si están verificados.

No se publicarán direcciones de ejemplo.

### Mapa

La primera carga podrá mostrar una vista estática optimizada del mapa para proteger rendimiento y privacidad.

El usuario podrá abrir:

- Google Maps.
- Apple Maps cuando corresponda.

El mapa tendrá una alternativa textual accesible con la dirección completa.

### Fotografía

Utilizar:

- Fotografía exterior para reconocer la entrada.
- Fotografía interior amplia del dojang.
- Imagen ordenada, bien iluminada y actual.

No se utilizarán renders ni imágenes de otras instalaciones.

### CTA

- Cómo llegar.
- Contactar.

“Inscribirse” podrá repetirse de forma secundaria, pero no será necesario añadir tres acciones con la misma jerarquía.

---

## 13.12 Preguntas frecuentes y contacto

### Ancla

`#contacto`

### Objetivo

Resolver objeciones finales y ofrecer ayuda sin desviar el foco de la inscripción.

### Preguntas frecuentes mínimas

1. ¿A qué edad se puede empezar?
2. ¿Hace falta experiencia previa?
3. ¿Qué ropa se necesita para la primera clase?
4. ¿Cómo se asigna el grupo?
5. ¿Se puede probar una clase?
6. ¿Cómo se realiza el pago?
7. ¿Qué ocurre después de inscribirse?

Las respuestas deberán ser breves, concretas y validadas por Leo.

### Comportamiento del acordeón

- Solo el título de cada pregunta estará visible inicialmente.
- Podrán abrirse varias preguntas si mejora la comparación.
- El estado será accesible mediante `aria-expanded`.
- Se podrá operar con teclado.
- La apertura utilizará una transición breve de altura y opacidad.
- Con movimiento reducido, el contenido aparecerá sin animación.

### Contacto

Se mostrarán únicamente canales atendidos realmente:

- Teléfono.
- WhatsApp.
- Correo electrónico.

El CTA de WhatsApp será:

> Consultar por WhatsApp

WhatsApp será una opción de ayuda, no el camino principal de inscripción.

No habrá un botón flotante de WhatsApp en el primer viewport, ya que competiría con “Inscribirse”. Si en el futuro se incorpora un acceso flotante, deberá aparecer después de abandonar el hero y nunca ocultar contenido o controles.

### Formulario de contacto

Si se incluye, deberá pedir únicamente:

- Nombre.
- Correo o teléfono.
- Mensaje.
- Consentimiento de privacidad.

No se pedirá información extensa que ya pertenezca al flujo de inscripción.

### Fotografía

No necesaria.

---

## 13.13 CTA final

### Objetivo

Cerrar la página con una decisión clara.

### Contenido

Titular recomendado:

> Tu próximo paso empieza aquí.

Texto de apoyo:

> Encuentra tu grupo y empieza a formar parte de SAM GUK.

Botón principal:

> Inscribirse

Enlace secundario:

> Consultar horarios

### Diseño

- Banda de fondo azul marino.
- Texto blanco.
- Sin tarjeta interior.
- Mucho espacio.
- Botón rojo claramente visible.
- Sin degradados decorativos.

### Fotografía

La banda puede utilizar una fotografía real de grupo como fondo si mantiene excelente legibilidad. Si no existe una imagen adecuada, se utilizará fondo azul sólido.

---

## 13.14 Footer

### Objetivo

Cerrar la experiencia, ofrecer navegación secundaria y alojar enlaces legales y privados sin distraer la conversión principal.

### Contenido

El footer incluirá:

1. Logotipo SAM GUK.
2. Descripción breve del club.
3. Navegación:
   - El club.
   - Clases.
   - Horarios.
   - Tarifas.
   - Contacto.
4. Datos de contacto.
5. Dirección.
6. Enlaces legales:
   - Aviso legal.
   - Privacidad.
   - Cookies.
7. Enlace discreto:
   - Acceso privado.
8. Copyright.
9. Crédito de LUMEN Studio si forma parte del acuerdo final.

### Acceso privado

El texto será:

> Acceso privado

Llevará a `/admin`.

Será visible, pero no tendrá apariencia de CTA principal.

En la V1 este enlace no ofrece acceso a alumnos, familias o responsables. No se utilizarán textos como “Área de alumnos”, “Portal de familias” o “Mi cuenta”.

### Diseño

- Fondo azul marino.
- Texto blanco y azul muy claro.
- Columnas amplias en escritorio.
- Secciones apiladas en móvil.
- Separadores discretos.
- Sin fondos negros.
- Sin formularios de newsletter salvo que exista una necesidad real.

---

# 14. Experiencia de usuario completa

## 14.1 Recorrido principal

El recorrido ideal será:

1. El usuario entra en `/`.
2. Identifica SAM GUK y ve “Inscribirse”.
3. Puede iniciar la inscripción inmediatamente.
4. Si necesita más información, revisa clases, horarios y tarifas.
5. Vuelve a encontrar un CTA contextual.
6. Entra en `/inscripcion` con el grupo seleccionado cuando sea posible.

## 14.2 Recorrido de un padre o madre

1. Hero.
2. Clase infantil.
3. Método y beneficios.
4. Horario infantil.
5. Tarifa infantil.
6. Inscripción.

El usuario no debe volver manualmente al inicio para inscribirse.

## 14.3 Recorrido de un adolescente

1. Hero.
2. Clase de jóvenes.
3. Experiencia y comunidad.
4. Horario.
5. Inscripción.

La fotografía y el tono no deberán parecer infantiles.

## 14.4 Recorrido de un adulto

1. Hero.
2. Clase de adultos.
3. Beneficios y metodología.
4. Horario de adultos.
5. Tarifa.
6. Inscripción.

La sección de adultos deberá tener suficiente presencia visual y no quedar relegada.

## 14.5 Recorrido de Leo o personal autorizado

Leo o una persona autorizada podrá encontrar “Acceso privado” en el footer y acceder al inicio de sesión administrativo.

Los alumnos, familias y responsables no dispondrán de acceso privado en la V1. No se añadirá ninguna navegación ni expectativa de autoservicio para estos perfiles.

## 14.6 Estados y errores

Si horarios o tarifas no pueden cargarse:

- Se mostrará un mensaje comprensible.
- Se ofrecerá contacto.
- Se mantendrá el CTA de inscripción.
- No se mostrará una sección vacía o un error técnico.

Los enlaces externos deberán abrir de forma predecible. No se abrirán nuevas pestañas salvo mapas, WhatsApp o servicios externos donde tenga sentido.

---

# 15. Comportamiento del scroll

## 15.1 Scroll natural

La web utilizará scroll vertical estándar.

Quedan prohibidos:

- Scroll secuestrado.
- Avance automático entre secciones.
- Efectos de scroll horizontal.
- Secciones que bloquean la rueda o el gesto táctil.
- Parallax intenso.

## 15.2 Navegación por anclas

Los enlaces de navegación realizarán desplazamiento suave.

Reglas:

- Respetar la preferencia `prefers-reduced-motion`.
- Compensar la altura de la cabecera fija.
- Colocar el título de la sección en una posición visible tras el desplazamiento.
- Actualizar el estado activo de navegación solo cuando sea útil y estable.

## 15.3 Cabecera durante el scroll

- Permanecerá visible.
- Cambiará de transparente a blanca de forma suave.
- No desaparecerá al hacer scroll hacia abajo.
- El CTA “Inscribirse” permanecerá accesible.

## 15.4 Retorno al inicio

No será necesario un botón flotante de retorno al inicio en páginas de longitud normal. El logotipo de la cabecera llevará al inicio.

---

# 16. Animaciones

## 16.1 Principio

El movimiento debe reforzar la sensación premium y la comprensión de la interfaz.

Las animaciones serán suaves, breves y poco frecuentes.

## 16.2 Duraciones

- Hover y botones: 120 a 180 ms.
- Menús y acordeones: 180 a 260 ms.
- Aparición de contenido: 300 a 450 ms.
- Transición de cabecera: 180 a 240 ms.

## 16.3 Animaciones permitidas

- Aparición mediante opacidad.
- Desplazamiento vertical máximo de 12 a 16 px.
- Cambio sutil de color.
- Ligera elevación de botón, máximo 1 o 2 px.
- Escala de fotografía muy contenida en hover, máximo 1,02.
- Subrayado o indicador de navegación.

## 16.4 Animaciones prohibidas

- Rebotes.
- Rotaciones decorativas.
- Texto escrito letra a letra.
- Contadores sin información real.
- Elementos flotantes continuos.
- Vídeo automático con sonido.
- Animaciones infinitas.
- Efectos de cursor personalizados.
- Transiciones que retrasen la navegación.

## 16.5 Movimiento reducido

Con `prefers-reduced-motion: reduce`:

- El scroll será inmediato.
- Las apariciones no tendrán desplazamiento.
- Los acordeones abrirán sin transición compleja.
- No habrá escalado de imágenes.

---

# 17. Microinteracciones

## 17.1 Botones

Estado normal:

- Contraste alto.
- Texto claro.
- Área táctil amplia.

Hover:

- Ligero cambio de tono.
- Elevación máxima de 1 px.

Active:

- Sensación de presión.
- Sin reducir el área.

Focus:

- Anillo visible de al menos 2 px.
- No depender únicamente del cambio de color.

Disabled:

- Solo cuando sea necesario.
- Mantener texto legible.
- Explicar por qué la acción no está disponible.

## 17.2 Enlaces

- El hover deberá ser visible.
- Los enlaces dentro de párrafos estarán subrayados o claramente identificados.
- El foco de teclado será siempre visible.

## 17.3 Tarjetas de clases

- La imagen podrá escalar ligeramente.
- El título y el CTA mantendrán su posición.
- Toda la tarjeta no será clicable si contiene más de una acción.
- Los botones deberán seguir siendo controles independientes.

## 17.4 Horarios

- El grupo seleccionado tendrá estado visual y semántico.
- Cambiar de grupo no provocará salto de página.
- Se mantendrá la posición de scroll.

## 17.5 Acordeones

- El icono de apertura cambiará de forma sencilla.
- La pregunta permanecerá visible.
- La respuesta aparecerá sin parpadeos ni cambios bruscos.

## 17.6 Formularios

- Validación junto al campo correspondiente.
- Mensajes concretos.
- No borrar datos tras un error.
- Confirmación clara al enviar.
- Etiquetas permanentes, no solo placeholders.

---

# 18. Responsive

La web se diseñará mobile first.

## 18.1 Rangos de referencia

- Móvil pequeño: 320 a 389 px.
- Móvil estándar: 390 a 639 px.
- Tableta: 640 a 1023 px.
- Escritorio: 1024 a 1439 px.
- Escritorio amplio: 1440 px o más.

Los rangos son orientativos. El contenido deberá determinar el punto exacto de adaptación.

## 18.2 Móvil

- CTA “Inscribirse” visible en la cabecera.
- Hero legible sin scroll horizontal.
- Botones a ancho completo cuando mejore la pulsación.
- Secciones en una columna.
- Fotografías con recorte específico.
- Horarios transformados en tarjetas o pestañas.
- Tarifas apiladas.
- Footer apilado.
- Menú accesible y fácil de cerrar.
- Márgenes laterales de 20 px.

## 18.3 Tableta

- Mantener una o dos columnas según la longitud real del contenido.
- Evitar tres tarjetas demasiado estrechas.
- Conservar el CTA de cabecera.
- No utilizar la disposición de escritorio si obliga a comprimir texto.

## 18.4 Escritorio

- Contenido centrado con anchura máxima.
- Hero amplio.
- Rejillas de dos o tres columnas.
- Navegación completa.
- Fotografías grandes y nítidas.

## 18.5 Pantallas muy anchas

- No estirar textos más allá de su anchura legible.
- No aumentar tipografía de forma proporcional al viewport.
- Mantener el contenido en un contenedor.
- Permitir que fondos y fotografías a sangre ocupen el ancho completo cuando corresponda.

## 18.6 Reglas obligatorias

- No debe existir scroll horizontal.
- Ningún texto debe desbordar.
- Ningún botón debe quedar cortado.
- Las áreas táctiles tendrán mínimo 44 px.
- La cabecera no tapará títulos al navegar por anclas.
- Las imágenes conservarán una proporción estable.
- El contenido no cambiará de posición al terminar de cargar.

---

# 19. Accesibilidad

La web deberá cumplir como mínimo WCAG 2.2 nivel AA.

## 19.1 Estructura

- Un único `h1` por página.
- Jerarquía de encabezados lógica.
- Regiones semánticas para cabecera, navegación, contenido y footer.
- Enlace “Saltar al contenido”.
- Orden del DOM coherente con el orden visual.

## 19.2 Teclado

Todas las acciones deberán poder realizarse sin ratón:

- Abrir y cerrar menú.
- Navegar por enlaces.
- Activar CTA.
- Cambiar filtros de horarios.
- Abrir preguntas frecuentes.
- Completar formularios.

No deberán existir trampas de foco.

## 19.3 Foco

- Foco visible y consistente.
- Contraste mínimo adecuado.
- No eliminar el contorno sin sustitución.
- Foco situado en el contenido correcto tras navegación o apertura de diálogo.

## 19.4 Contraste

- Texto normal: mínimo 4,5:1.
- Texto grande: mínimo 3:1.
- Controles e indicadores: mínimo 3:1.
- El texto sobre fotografía deberá probarse con la imagen definitiva.

El color no será el único medio para comunicar estado.

## 19.5 Imágenes

- Alt descriptivo cuando la imagen aporta información.
- Alt vacío cuando es puramente decorativa.
- No repetir en el alt el texto visible contiguo.
- Describir actividad y contexto, no rasgos personales irrelevantes.

## 19.6 Formularios

- Etiquetas visibles.
- Instrucciones claras.
- Errores vinculados al campo.
- Resumen de errores cuando proceda.
- No depender del placeholder.
- Consentimientos explícitos.

## 19.7 Vídeo y audio

Si se incorporan en el futuro:

- Controles de reproducción.
- Subtítulos.
- Transcripción cuando sea necesaria.
- Sin sonido automático.
- Sin reproducción obligatoria.

## 19.8 Lenguaje

- Documento configurado en español.
- Lenguaje sencillo.
- Evitar tecnicismos innecesarios.
- Evitar frases excesivamente largas.

---

# 20. Sistema de CTA

## 20.1 CTA principal

Texto:

> Inscribirse

Destino:

> `/inscripcion`

Estilo:

- Fondo rojo.
- Texto blanco.
- Peso semibold o bold.
- Radio de 6 u 8 px.
- Altura mínima de 48 px.

Ubicaciones:

- Cabecera.
- Hero.
- Clases.
- Horarios.
- Tarifas.
- Proceso.
- Cierre final.

La repetición deberá ser contextual. No se colocarán botones cada pocos párrafos.

## 20.2 CTA secundario

Ejemplos:

- Ver horarios.
- Conocer las clases.
- Cómo llegar.
- Consultar horarios.

Estilo:

- Fondo transparente o blanco.
- Borde azul o gris.
- Texto azul marino.

## 20.3 CTA de contacto

Ejemplos:

- Consultar por WhatsApp.
- Llamar al club.
- Enviar una consulta.

Nunca tendrá más jerarquía que “Inscribirse”.

## 20.4 Reglas de redacción

- Usar verbos concretos.
- No usar “Haz clic aquí”.
- No usar etiquetas vagas.
- No cambiar el nombre de la acción principal entre secciones.
- No añadir urgencia falsa.
- No utilizar mensajes de escasez inventados.

---

# 21. Tono y redacción

La voz de SAM GUK deberá ser:

- Clara.
- Serena.
- Directa.
- Cercana.
- Segura.
- Respetuosa.
- Motivadora sin exageración.

## 21.1 Reglas

- Frases cortas.
- Párrafos de dos a cuatro líneas.
- Beneficios concretos.
- Evitar clichés de lucha.
- Evitar lenguaje militar.
- Evitar superlativos no demostrables.
- Evitar promesas como “transformará tu vida”.
- Evitar exceso de signos de exclamación.
- Tratar al usuario de tú de manera respetuosa y consistente.

## 21.2 Vocabulario recomendado

- Progreso.
- Disciplina.
- Respeto.
- Confianza.
- Constancia.
- Técnica.
- Comunidad.
- Crecimiento.
- Entrenamiento.
- Acompañamiento.

## 21.3 Vocabulario a evitar

- Guerrero.
- Destruir límites.
- Combate extremo.
- Sin dolor no hay progreso.
- Conviértete en una máquina.
- Oferta irrepetible.
- Plazas volando.

---

# 22. Rendimiento

La percepción premium depende de la velocidad.

## 22.1 Objetivos

- LCP menor de 2,5 segundos.
- INP menor de 200 ms.
- CLS menor de 0,1.
- Respuesta visual inmediata al pulsar controles.

## 22.2 Imágenes

- Hero optimizado por dispositivo.
- Imagen móvil específica cuando sea necesario.
- Carga diferida bajo el primer viewport.
- Dimensiones declaradas.
- Compresión sin pérdida visible.
- No cargar galerías completas al inicio.

## 22.3 Fuentes

- Una sola familia.
- Solo pesos necesarios.
- Formato moderno.
- Precarga únicamente de la fuente crítica.
- Fallback métrico compatible para evitar saltos.

## 22.4 Scripts

- No cargar librerías pesadas para efectos simples.
- No añadir widgets externos sin necesidad.
- Retrasar mapas, analítica y recursos no críticos.
- Evitar vídeos pesados en el hero.

---

# 23. SEO y presencia local

## 23.1 Metadatos

La página tendrá:

- Título único.
- Descripción clara.
- URL canónica.
- Imagen Open Graph real del club.
- Metadatos para compartir en redes.

Ejemplo de título:

> SAM GUK Club Taekwondo | Clases para niños, jóvenes y adultos

La localidad deberá añadirse cuando esté confirmada.

## 23.2 Contenido local

La dirección, teléfono y nombre del club deberán ser idénticos en:

- Web.
- Google Business Profile.
- Redes sociales.
- Directorios.

## 23.3 Datos estructurados

Se incorporarán datos estructurados apropiados para:

- Organización.
- Actividad deportiva.
- Ubicación.
- Horarios.
- Datos de contacto.

La información estructurada deberá coincidir con el contenido visible.

## 23.4 Indexación

- Sitemap.
- Robots correctamente configurado.
- Páginas legales accesibles.
- `/admin` fuera de resultados públicos.
- No indexar páginas internas del flujo cuando no aporten valor de búsqueda.

---

# 24. Analítica y medición

La analítica deberá medir el recorrido sin invadir la privacidad.

En el MVP solo se utilizará medición básica, agregada y orientada a comprobar el funcionamiento de la conversión. La analítica avanzada queda fuera de alcance.

No se implementarán en la V1:

- Perfiles individuales de comportamiento.
- Segmentaciones avanzadas.
- Embudos complejos.
- Mapas de calor.
- Grabaciones de sesión.
- Atribución publicitaria avanzada.
- Herramientas que capturen el contenido de formularios.

Eventos mínimos:

- Visita a la página principal.
- Clic en “Inscribirse” desde cabecera.
- Clic en “Inscribirse” desde hero.
- Clic en “Inscribirse” desde clases.
- Clic en “Inscribirse” desde horarios.
- Clic en “Inscribirse” desde tarifas.
- Clic en “Inscribirse” desde CTA final.
- Inicio del flujo de inscripción.
- Clic en WhatsApp.
- Clic en cómo llegar.
- Uso de filtros de horarios.

Los nombres de evento deberán permitir distinguir el origen del CTA sin cambiar el texto visible.

No se utilizarán patrones oscuros, grabación de datos sensibles ni herramientas que capturen formularios de inscripción sin autorización explícita.

---

# 25. Contenido pendiente de validación

Antes del lanzamiento deberán confirmarse:

- Logotipo oficial y variantes.
- Azul y rojo corporativos definitivos.
- Dirección completa.
- Teléfono.
- WhatsApp.
- Correo electrónico.
- Horarios reales.
- Tarifas reales.
- Matrícula, licencia y condiciones.
- Edades exactas por grupo.
- Disponibilidad de clase de prueba.
- Nombre y perfil profesional del equipo técnico.
- Fotografías autorizadas.
- Autorizaciones de menores.
- Testimonios reales.
- Política de pagos.
- Textos legales.
- Enlaces sociales oficiales.

La web no deberá publicarse con:

- Direcciones de ejemplo.
- Teléfonos ficticios.
- Precios de demostración.
- Horarios inventados.
- Testimonios creados para rellenar.
- Fotografías de stock.

---

# 26. Reglas de diseño no negociables

Estas reglas deberán respetarse durante todo el desarrollo:

1. “Inscribirse” será visible en menos de tres segundos.
2. “Inscribirse” permanecerá visible en la cabecera.
3. La inscripción estará a un clic desde la página principal.
4. El diseño será principalmente blanco, azul y rojo.
5. El negro se utilizará únicamente para texto.
6. No se utilizarán dorados, morados, neones ni fondos beige.
7. No se utilizarán fotografías de stock.
8. No se inventarán datos, testimonios, horarios o tarifas.
9. No se utilizarán carruseles automáticos.
10. No se utilizará scroll secuestrado.
11. No se abusará de tarjetas.
12. No se crearán tarjetas dentro de tarjetas.
13. No se utilizarán radios excesivos.
14. No se utilizarán sombras fuertes.
15. No se utilizarán gradientes decorativos.
16. No se ocultará información esencial detrás de formularios.
17. WhatsApp no sustituirá al flujo de inscripción.
18. El acceso privado permanecerá discreto en el footer.
19. Toda interacción será operable con teclado.
20. Toda fotografía de menores requerirá autorización.
21. La web deberá cumplir WCAG 2.2 AA.
22. El diseño será mobile first.
23. No existirá scroll horizontal.
24. El contenido deberá cargar sin saltos de layout.
25. Las animaciones deberán respetar movimiento reducido.
26. Cada sección tendrá un objetivo claro.
27. Cada CTA utilizará una etiqueta comprensible.
28. La estética nunca parecerá una web clásica de gimnasio.
29. La web deberá sentirse como una marca, no como una plantilla.
30. Toda decisión deberá simplificar la experiencia del usuario.
31. La inscripción pública crea una solicitud pendiente, nunca un alumno.
32. El acceso privado de la V1 es exclusivo para Leo y personal autorizado.
33. No existirá portal privado para alumnos o familias en la V1.
34. La analítica del MVP será básica, agregada y respetuosa con la privacidad.

---

# 27. Criterios de aceptación y definición de terminado

La web pública se considerará correctamente construida cuando:

## Conversión

- “Inscribirse” es identificable en menos de tres segundos.
- El CTA funciona desde todas sus ubicaciones.
- El destino es `/inscripcion`.
- Los CTA contextuales conservan el grupo cuando corresponda.

## Contenido

- Todas las secciones definidas están presentes y en el orden especificado.
- Los textos son breves, claros y validados.
- No queda contenido ficticio.
- Las tarifas y horarios son reales.

## Diseño

- La identidad utiliza blanco, azul, rojo y grises claros.
- La fotografía es real y de calidad.
- La jerarquía visual es consistente.
- No hay recursos estéticos prohibidos.
- La experiencia se siente premium y minimalista.

## Responsive

- La web funciona desde 320 px.
- No existe scroll horizontal.
- El CTA sigue visible en móvil.
- Horarios y tarifas son legibles.
- Las fotografías conservan el sujeto relevante.

## Accesibilidad

- Navegación completa por teclado.
- Foco visible.
- Contraste AA.
- Jerarquía semántica correcta.
- Menú y acordeones accesibles.
- Imágenes con textos alternativos apropiados.
- Movimiento reducido respetado.

## Rendimiento

- Cumple los objetivos de Core Web Vitals.
- El hero no bloquea innecesariamente.
- Las imágenes bajo el primer viewport son diferidas.
- No existen saltos de layout perceptibles.

## Calidad

- Chrome, Safari, Firefox y Edge actuales.
- iOS Safari y Chrome Android.
- Enlaces legales correctos.
- Enlaces externos correctos.
- No aparecen errores técnicos al usuario.
- No se modifica la experiencia según datos no confirmados.

---

# 28. Principio final

La web pública de SAM GUK debe permitir dos comportamientos igualmente válidos:

1. Un usuario decidido puede inscribirse inmediatamente.
2. Un usuario que necesita confianza puede recorrer la página, resolver sus dudas y encontrar siempre una inscripción clara al final de su recorrido.

La página no debe obligar a nadie a leerla completa.

La calidad de la experiencia se medirá por su claridad, no por la cantidad de contenido o efectos.

La pregunta que deberá cerrar cada decisión de diseño es:

> ¿Esto ayuda al usuario a confiar en SAM GUK y a inscribirse con menos esfuerzo?

Si la respuesta es no, el elemento no debe formar parte de la web.
