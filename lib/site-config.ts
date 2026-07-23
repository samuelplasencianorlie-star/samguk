export const siteConfig = {
  clubName: "SAMGUK",
  fullName: "Samguk Cabo Blanco",
  tagline: "HORARIOS DE ENTRENOS de Samguk Cabo Blanco.",
  description:
    "Club de taekwondo con entrenos organizados por cursos.",
  assets: {
    logo: "/images/samguk-logo-transparent.png",
    photos: {
      trainingStudents: "/images/samguk/entreno-alumnos-tatami.jpg",
      historyReception: "/images/samguk/historia-recepcion-samguk.jpg",
      trainingTechnique: "/images/samguk/entrenamiento-tecnica.jpg",
      clubSpace: "/images/samguk/espacio-club-tatami.jpg",
      teacherHistorical: "/images/samguk/profesor-leopoldo-historica.jpg"
    }
  },
  contact: {
    phone: "617 697 771",
    whatsapp: "617 697 771",
    email: "tkdsamguk@hotmail.com",
    address: "C/ Obispo Antonio Tariva 16, Cabo Blanco - Arona, Tenerife Sur",
    social: {
      instagram: "Tkd Samguk Tenerife",
      facebook: "Leopoldo García Borges"
    },
    links: {
      instagram: "https://www.instagram.com/tkdsamguk/",
      facebook: "https://www.facebook.com/leopoldo.garciaborges/?locale=es_ES"
    }
  },
  trainingSchedule: [
    {
      days: "Lunes · Miércoles · Viernes",
      items: [
        { time: "17:15 — 18:15", label: "Curso 1" },
        { time: "18:20 — 19:20", label: "Curso 2" },
        { time: "19:25 — 20:25", label: "Curso 3" },
        { time: "20:30 — 21:00", label: "Curso 4" }
      ]
    },
    {
      days: "Martes · Jueves",
      items: [
        {
          time: "17:30 — 21:00",
          label: "Programa de Tecnificación de competiciones de combate"
        }
      ]
    }
  ],
  enrollment: {
    monthlyFee: "",
    federationLicense: "",
    familyDiscounts: ""
  },
  registration: {
    legalText:
      "Al inscribirse en el club, el alumnado manifiesta haber leído, comprendido y aceptado las políticas y normativas establecidas por el club. Estas políticas incluyen derecho de imagen, protección de datos personales, participación de menores de edad, responsabilidad y seguridad, derecho de admisión y permanencia, derecho de modificación y uso responsable de instalaciones y equipamiento."
  },
  history: {
    title: "Historia del club",
    intro:
      "Nuestro club nace en septiembre de 1999, fundado por Leopoldo García, actual presidente, maestro nacional y practicante de Taekwondo y Judo desde muy pequeño.",
    paragraphs: [
      "Nuestro club nace en septiembre de 1999, fundado por Leopoldo García, actual presidente, maestro nacional y practicante de Taekwondo y Judo desde muy pequeño.",
      "Los comienzos del club fueron en el maletero de un Citroën Xsara, que desplazaba el material deportivo necesario para realizar los entrenos y gestionar el club. Durante este tiempo la actividad se desarrolló en distintos gimnasios del municipio: Noelia Gym en Playa de las Américas, MultiGym en Los Cristianos y Febles Gym en Cabo Blanco.",
      "En el año 2001, y viendo la gran afluencia de gente que entrenaba con nosotros, se decidió alquilar un local en Valle San Lorenzo. Este espacio ayudó a afianzar un sistema de enseñanza. Con el tiempo, el local se quedó pequeño y el club fue alquilando locales cada vez mayores. Actualmente dispone de un local de grandes dimensiones en C/ Obispo Tariva 16, en Cabo Blanco.",
      "En 2010 comenzamos a realizar la inclusión de nuestras sedes por el municipio y los municipios colindantes, llevadas por alumnos y alumnas de Leopoldo García y por entrenadores titulados y formados por la RFET.",
      "En el año 2004 nace el Programa de Tecnificación de Competiciones de Combate, donde se ofrece la opción de formar parte de un equipo de competición que entrena los martes, jueves y sábados para especializar a quienes lo deseen y salir a competir en la modalidad de combate. A día de hoy, este programa sigue funcionando y se ha ampliado hasta tres sedes distintas.",
      "Este programa ha cosechado más de 150 medallas en campeonatos de España y open internacionales. También ha integrado en las distintas selecciones de Canarias a más de 100 deportistas que han representado a nuestra autonomía a nivel nacional y, en varias ocasiones, a nuestro país con la selección nacional."
    ],
    highlights: [
      { label: "Fundación", value: "Septiembre de 1999" },
      { label: "Programa de competición", value: "Desde 2004" },
      { label: "Medallas", value: "Más de 150" },
      { label: "Selecciones de Canarias", value: "Más de 100 deportistas" }
    ],
    confirmedItems: [
      { label: "Fundador", value: "Leopoldo García" }
    ],
    venues: [
      "Cabo Blanco",
      "La Camella",
      "Valle San Lorenzo",
      "La Estrella",
      "Parque La Reina",
      "Fañabé",
      "San Miguel",
      "Arona"
    ]
  },
  teacher: {
    name: "Leopoldo García",
    role: "Maestro de SAMGUK",
    credentials: [
      "Maestro Nacional 3057N",
      "Cinturón Negro 5º Dan",
      "Fundador del club"
    ]
  },
  legal: {
    privacy:
      "El club se compromete a cumplir con la legislación vigente en materia de protección de datos personales. Los datos proporcionados, incluidos nombre, fecha de nacimiento, dirección, código postal, DNI/NIE, teléfonos, email y datos del padre, madre, tutor legal o persona responsable, serán tratados de manera confidencial y utilizados con fines relacionados con la gestión y desarrollo de las actividades del club. Para consultas sobre protección de datos, puede contactarse con el club a través de sus canales oficiales.",
    cookies:
      "Información sobre el uso de cookies y tecnologías similares en el sitio web de SAMGUK.",
    legalNotice:
      "Club Deportivo SAMGUK Taekwondo. C/ Obispo Antonio Tariva 16, Cabo Blanco - Arona, Tenerife Sur."
  }
} as const;

export type SiteConfig = typeof siteConfig;
