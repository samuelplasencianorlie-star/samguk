export type PublicLanguage = "es" | "en";

export const publicTranslations = {
  es: {
    languageLabel: "Cambiar idioma",
    navigation: {
      space: "Espacio",
      training: "Entrenos",
      schedule: "Horarios",
      registration: "Inscripción",
      teacher: "Maestro",
      contact: "Contacto",
      homeAria: "SAMGUK, volver al inicio",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      mobileMenu: "Menú de navegación",
      cta: "Inscribirse",
      ctaRegistration: "Volver a la web",
      mobileCta: "Iniciar inscripción"
    },
    site: {
      description: "Club de taekwondo con entrenos organizados por cursos.",
      officialContact: "Contacto oficial de Samguk Cabo Blanco."
    },
    home: {
      quick: ["Espacio", "Entrenos", "Horarios", "Inscripción"],
      hero: {
        label: "Samguk Cabo Blanco",
        primary: "Quiero inscribirme",
        secondary: "Ver horarios",
        scroll: "Desplazar"
      },
      space: {
        eyebrow: "Espacio",
        title: "El espacio del club.",
        club: "Club",
        address: "Dirección"
      },
      training: {
        eyebrow: "Entrenos",
        title: "Entrenos.",
        intro:
          "Entrenos organizados por cursos y programa de tecnificación de competiciones de combate."
      },
      schedule: {
        eyebrow: "Horarios",
        intro: "Entrenos organizados por días y cursos.",
        block: "Bloque"
      },
      teacher: {
        eyebrow: "Maestro"
      },
      history: {
        eyebrow: "Historia",
        title: "Historia del club",
        intro:
          "Nuestro club nace en septiembre de 1999, fundado por Leopoldo García, actual presidente, maestro nacional y practicante de Taekwondo y Judo desde muy pequeño.",
        cta: "Conocer la historia del club",
        highlights: [
          { label: "Fundación", value: "Septiembre de 1999" },
          { label: "Programa de competición", value: "Desde 2004" }
        ]
      },
      contact: {
        title: "Contacto",
        primary: "Solicitar inscripción",
        cards: [
          {
            label: "Teléfono / WhatsApp",
            action: "Escribir por WhatsApp",
            ariaLabel: "Escribir a SAMGUK por WhatsApp"
          },
          {
            label: "Email",
            action: "Enviar email",
            ariaLabel: "Enviar email a SAMGUK"
          },
          {
            label: "Dirección",
            action: "Abrir en Google Maps",
            ariaLabel: "Abrir dirección de SAMGUK en Google Maps"
          },
          {
            label: "Redes sociales",
            action: "Ver Instagram",
            ariaLabel: "Abrir Instagram de SAMGUK"
          },
          {
            label: "Facebook",
            action: "Ver Facebook",
            ariaLabel: "Abrir Facebook de Leopoldo García Borges"
          }
        ]
      },
      footer: {
        access: "Acceso club",
        information: "Información",
        club: "Club",
        history: "Historia",
        privacy: "Privacidad",
        legal: "Aviso legal"
      }
    },
    registration: {
      page: {
        eyebrow: "Solicitud inicial",
        title: "Solicitud de inscripción para Samguk Cabo Blanco.",
        intro:
          "Rellena tus datos para preparar una solicitud inicial y contactar con el club.",
        note:
          "La solicitud no confirma la incorporación automáticamente. El club revisará disponibilidad y siguientes pasos antes de formalizar cualquier alta.",
        steps: [
          "Preparas tus datos",
          "Contactas con el club",
          "El club revisa disponibilidad"
        ]
      },
      form: {
        eyebrow: "Formulario",
        title: "Datos de la solicitud",
        helper: "Prepara tus datos para compartirlos con el club.",
        studentLegend: "Datos del alumno/a",
        contactLegend: "Responsable legal y contacto",
        fields: {
          fullName: "Nombre y apellidos",
          age: "Edad",
          birthDate: "Fecha de nacimiento",
          dniNie: "DNI / NIE",
          address: "Dirección",
          postalCode: "Código postal",
          guardian: "Padre, madre, tutor legal o persona responsable",
          phone: "Teléfono principal",
          phone2: "Teléfono 2",
          email: "Email",
          message: "Mensaje adicional"
        },
        errors: {
          fullName: "Introduce el nombre y apellidos del alumno.",
          age: "Introduce una edad válida.",
          birthDate: "Introduce una fecha de nacimiento válida.",
          guardian: "Introduce el nombre de la persona responsable.",
          address: "Introduce una dirección válida.",
          postalCode: "Introduce un código postal de 5 cifras.",
          dniNie: "Introduce un DNI/NIE válido.",
          phone: "Introduce un teléfono principal válido.",
          phone2: "Introduce un segundo teléfono válido.",
          email: "Introduce un email válido.",
          legal:
            "Debes revisar y aceptar las condiciones necesarias antes de preparar la solicitud."
        },
        success:
          "Solicitud preparada. Para completar el proceso, contacta con el club y envía tus datos.",
        whatsapp: "Enviar por WhatsApp",
        email: "Enviar por email",
        legalTitle: "Información legal",
        legalVersion: "Versión legal",
        readToEnd:
          "Desplázate hasta el final del texto legal para activar las aceptaciones.",
        checks: {
          conditions: "He leído y acepto las condiciones generales del club.",
          data:
            "Autorizo el tratamiento de los datos para gestionar la solicitud.",
          guardian:
            "Confirmo que soy padre, madre, tutor legal o persona autorizada si el alumno es menor de edad.",
          responsibility:
            "Entiendo la responsabilidad asociada a la práctica deportiva."
        },
        imageRights: {
          title: "Derecho de imagen",
          helper: "Selecciona una de las dos opciones. No se pueden marcar ambas.",
          yes:
            "Autorizo el uso de imágenes y vídeos del alumno en actividades del club.",
          no: "No autorizo el uso de imágenes y vídeos del alumno."
        },
        prepared: "Solicitud preparada",
        submit: "Preparar solicitud"
      }
    },
    legal: {
      back: "Volver a SAMGUK",
      eyebrow: "Información legal",
      note:
        "Para cualquier consulta relacionada con este documento, utiliza los canales oficiales del club.",
      privacyTitle: "Política de privacidad",
      cookiesTitle: "Política de cookies",
      legalNoticeTitle: "Aviso legal",
      privacy:
        "El club se compromete a cumplir con la legislación vigente en materia de protección de datos personales. Los datos proporcionados, incluidos nombre, fecha de nacimiento, dirección, código postal, DNI/NIE, teléfonos, email y datos del padre, madre, tutor legal o persona responsable, serán tratados de manera confidencial y utilizados con fines relacionados con la gestión y desarrollo de las actividades del club. Para consultas sobre protección de datos, puede contactarse con el club a través de sus canales oficiales.",
      cookies:
        "Información sobre el uso de cookies y tecnologías similares en el sitio web de SAMGUK.",
      legalNotice:
        "Club Deportivo SAMGUK Taekwondo. C/ Obispo Antonio Tariva 16, Cabo Blanco - Arona, Tenerife Sur."
    }
  },
  en: {
    languageLabel: "Change language",
    navigation: {
      space: "Space",
      training: "Training",
      schedule: "Schedule",
      registration: "Registration",
      teacher: "Master",
      contact: "Contact",
      homeAria: "SAMGUK, back to home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileMenu: "Navigation menu",
      cta: "Register",
      ctaRegistration: "Back to website",
      mobileCta: "Start registration"
    },
    site: {
      description: "Taekwondo club with training sessions organized by course.",
      officialContact: "Official contact for Samguk Cabo Blanco."
    },
    home: {
      quick: ["Space", "Training", "Schedule", "Registration"],
      hero: {
        label: "Samguk Cabo Blanco",
        primary: "I want to register",
        secondary: "View schedule",
        scroll: "Scroll"
      },
      space: {
        eyebrow: "Space",
        title: "The club space.",
        club: "Club",
        address: "Address"
      },
      training: {
        eyebrow: "Training",
        title: "Training.",
        intro:
          "Training sessions organized by course and a combat competition technical program."
      },
      schedule: {
        eyebrow: "Schedule",
        intro: "Training sessions organized by days and courses.",
        block: "Block"
      },
      teacher: {
        eyebrow: "Master"
      },
      history: {
        eyebrow: "History",
        title: "Club history",
        intro:
          "The club was founded in September 1999 by Leopoldo García, current president, national master and practitioner of Taekwondo and Judo from a very young age.",
        cta: "Discover the club history",
        highlights: [
          { label: "Foundation", value: "September 1999" },
          { label: "Competition program", value: "Since 2004" }
        ]
      },
      contact: {
        title: "Contact",
        primary: "Request registration",
        cards: [
          {
            label: "Phone / WhatsApp",
            action: "Message on WhatsApp",
            ariaLabel: "Message SAMGUK on WhatsApp"
          },
          {
            label: "Email",
            action: "Send email",
            ariaLabel: "Send email to SAMGUK"
          },
          {
            label: "Address",
            action: "Open in Google Maps",
            ariaLabel: "Open SAMGUK address in Google Maps"
          },
          {
            label: "Social media",
            action: "View Instagram",
            ariaLabel: "Open SAMGUK Instagram"
          },
          {
            label: "Facebook",
            action: "View Facebook",
            ariaLabel: "Open Leopoldo García Borges Facebook"
          }
        ]
      },
      footer: {
        access: "Club access",
        information: "Information",
        club: "Club",
        history: "History",
        privacy: "Privacy",
        legal: "Legal notice"
      }
    },
    registration: {
      page: {
        eyebrow: "Initial request",
        title: "Registration request for Samguk Cabo Blanco.",
        intro:
          "Fill in your details to prepare an initial request and contact the club.",
        note:
          "The request does not automatically confirm a place. The club will review availability and next steps before any registration is formalized.",
        steps: [
          "Prepare your details",
          "Contact the club",
          "The club reviews availability"
        ]
      },
      form: {
        eyebrow: "Form",
        title: "Request details",
        helper: "Prepare your details to share them with the club.",
        studentLegend: "Student details",
        contactLegend: "Legal guardian and contact",
        fields: {
          fullName: "Full name",
          age: "Age",
          birthDate: "Date of birth",
          dniNie: "ID / NIE",
          address: "Address",
          postalCode: "Postal code",
          guardian: "Parent, legal guardian or responsible person",
          phone: "Main phone",
          phone2: "Phone 2",
          email: "Email",
          message: "Additional message"
        },
        errors: {
          fullName: "Enter the student's full name.",
          age: "Enter a valid age.",
          birthDate: "Enter a valid date of birth.",
          guardian: "Enter the responsible person's name.",
          address: "Enter a valid address.",
          postalCode: "Enter a 5-digit postal code.",
          dniNie: "Enter a valid ID/NIE.",
          phone: "Enter a valid main phone number.",
          phone2: "Enter a valid second phone number.",
          email: "Enter a valid email address.",
          legal:
            "You must review and accept the required conditions before preparing the request."
        },
        success:
          "Request prepared. To complete the process, contact the club and send your details.",
        whatsapp: "Send by WhatsApp",
        email: "Send by email",
        legalTitle: "Legal information",
        legalVersion: "Legal version",
        readToEnd:
          "Scroll to the end of the legal text to activate the acceptances.",
        checks: {
          conditions: "I have read and accept the club's general conditions.",
          data: "I authorize the processing of data to manage the request.",
          guardian:
            "I confirm I am the parent, legal guardian or authorized person if the student is under age.",
          responsibility:
            "I understand the responsibility associated with sports practice."
        },
        imageRights: {
          title: "Image rights",
          helper: "Select one of the two options. Both cannot be selected.",
          yes:
            "I authorize the use of the student's images and videos in club activities.",
          no: "I do not authorize the use of the student's images and videos."
        },
        prepared: "Request prepared",
        submit: "Prepare request"
      }
    },
    legal: {
      back: "Back to SAMGUK",
      eyebrow: "Legal information",
      note:
        "For any questions related to this document, use the club's official channels.",
      privacyTitle: "Privacy policy",
      cookiesTitle: "Cookie policy",
      legalNoticeTitle: "Legal notice",
      privacy:
        "The club undertakes to comply with current personal data protection legislation. The data provided, including name, date of birth, address, postal code, ID/NIE, phone numbers, email and details of the parent, legal guardian or responsible person, will be treated confidentially and used for purposes related to the management and development of club activities. For questions about data protection, the club can be contacted through its official channels.",
      cookies:
        "Information about the use of cookies and similar technologies on the SAMGUK website.",
      legalNotice:
        "SAMGUK Taekwondo Sports Club. C/ Obispo Antonio Tariva 16, Cabo Blanco - Arona, Tenerife Sur."
    }
  }
} as const;

export type PublicTranslations = typeof publicTranslations.es;

export const historyPageTranslations = {
  es: {
    back: "Volver a la web",
    eyebrow: "Historia",
    title: "Historia del club",
    contact: "Contacto",
    confirmedInfo: "Información confirmada",
    officialVenues: "Sedes oficiales",
    request: "Solicitar inscripción",
    intro:
      "Nuestro club nace en septiembre de 1999, fundado por Leopoldo García, actual presidente, maestro nacional y practicante de Taekwondo y Judo desde muy pequeño.",
    confirmedItems: [{ label: "Fundador", value: "Leopoldo García" }],
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
    ]
  },
  en: {
    back: "Back to website",
    eyebrow: "History",
    title: "Club history",
    contact: "Contact",
    confirmedInfo: "Confirmed information",
    officialVenues: "Official locations",
    request: "Request registration",
    intro:
      "The club was founded in September 1999 by Leopoldo García, current president, national master and practitioner of Taekwondo and Judo from a very young age.",
    confirmedItems: [{ label: "Founder", value: "Leopoldo García" }],
    paragraphs: [
      "The club was founded in September 1999 by Leopoldo García, current president, national master and practitioner of Taekwondo and Judo from a very young age.",
      "The club began in the boot of a Citroën Xsara, which carried the sports equipment needed to run training sessions and manage the club. During this time, activity took place in different gyms in the municipality: Noelia Gym in Playa de las Américas, MultiGym in Los Cristianos and Febles Gym in Cabo Blanco.",
      "In 2001, seeing the large number of people training with us, a premises was rented in Valle San Lorenzo. This space helped consolidate a teaching system. Over time, the premises became too small and the club rented increasingly larger spaces. It currently has a large premises at C/ Obispo Tariva 16, in Cabo Blanco.",
      "In 2010 we began the inclusion of our locations throughout the municipality and nearby municipalities, led by students of Leopoldo García and by coaches certified and trained by the RFET.",
      "In 2004 the Combat Competition Technical Program was created, offering the option to be part of a competition team that trains on Tuesdays, Thursdays and Saturdays to specialize those who wish to compete in combat modality. Today this program is still active and has expanded to three different locations.",
      "This program has achieved more than 150 medals in Spanish championships and international opens. It has also brought more than 100 athletes into different Canary Islands teams, representing our autonomous community nationally and, on several occasions, our country with the national team."
    ],
    highlights: [
      { label: "Foundation", value: "September 1999" },
      { label: "Competition program", value: "Since 2004" },
      { label: "Medals", value: "More than 150" },
      { label: "Canary Islands teams", value: "More than 100 athletes" }
    ]
  }
} as const;
