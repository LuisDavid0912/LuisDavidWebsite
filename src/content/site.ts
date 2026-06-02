export const siteContent = {
  meta: {
    title: 'Luis David | Data Engineer & AI Automation Specialist',
    description: 'Especialista en Data Engineering, Automatización con n8n e Inteligencia Artificial. Transformando datos en soluciones inteligentes.',
    siteUrl: 'https://luisdavidmag.com',
    ogImage: '/og-image.png',
  },

  navbar: {
    logo: 'LUIS DAVID',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Sobre mí', href: '/about' },
      { label: 'Mini Apps', href: '/miniapps' },
      { label: 'Aprende IA', href: '/talento' },
      { label: 'Recursos', href: '/resources' },
      { label: 'Contacto', href: '/contact' },
    ],
  },
  
  hero: {
    preHeadline: 'Soy Ingeniero de Datos, y',
    headline: 'Ayudo a implementar Inteligencia Artificial en tu negocio.',
    subheadline: 'Construyo la infraestructura tecnológica que permite a los negocios atraer clientes, automatizar sus procesos de ventas y tomar decisiones basadas en datos.',
    ctaPrimary: {
      label: 'Quiero implementar IA en mi negocio',
      href: '/diagnostico',
    },
    ctaSecondary: {
      label: 'Quiero aprender IA',
      href: 'https://skool.com/@luis-david-7838',
    },
  },

  // =============================================
  // HOME PAGE SECTIONS
  // =============================================
  
  homeContext: {
    title: 'Los negocios del futuro se construyen con sistemas, no solo con esfuerzo.',
    paragraphs: [
      'La inteligencia artificial y los datos están cambiando la forma en que se construyen los negocios.',
      'Hoy las empresas más eficientes no trabajan más horas: utilizan tecnología para automatizar procesos, entender a sus clientes y tomar mejores decisiones.',
      'Sin embargo, muchos negocios todavía operan con procesos manuales, herramientas desconectadas y sin aprovechar la información que generan.',
      'Implementar Inteligencia Artificial no significa reemplazar personas, sino construir sistemas que permitan trabajar de forma más inteligente.',
    ],
    blocks: [
      {
        title: 'Automatización de procesos',
        description: 'La IA permite automatizar tareas repetitivas como seguimiento de clientes, generación de contenido o reportes.',
      },
      {
        title: 'Captación y conversión de clientes',
        description: 'Los negocios modernos utilizan sistemas que atraen prospectos, capturan sus datos y automatizan el seguimiento comercial.',
      },
      {
        title: 'Decisiones basadas en datos',
        description: 'Cuando los datos del negocio están organizados, es posible entender qué funciona, qué no y dónde crecer.',
      },
    ],
  },

  homeWhatIDo: {
    title: 'Cómo ayudo a aplicar inteligencia artificial en los negocios.',
    paragraphs: [
      'Mi trabajo consiste en traducir tecnología compleja en sistemas prácticos que ayudan a los negocios a crecer.',
      'Lo hago a través de tres áreas principales.',
    ],
    areas: [
      {
        title: 'Formación en inteligencia artificial',
        description: 'Creo contenido educativo y programas donde enseño a usar herramientas de inteligencia artificial y automatización.',
      },
      {
        title: 'Arquitectura de negocios digitales',
        description: 'Ayudo a emprendedores a construir la infraestructura tecnológica que necesitan para crear su negocio digital.',
      },
      {
        title: 'Implementación en empresas',
        description: 'Diseño e implemento sistemas de inteligencia artificial, automatización y análisis de datos dentro de negocios que quieren escalar.',
      },
    ],
  },

  homeMethodology: {
    title: 'Un proceso simple para implementar tecnología.',
    steps: [
      {
        step: 'Paso 1',
        title: 'Diagnóstico',
        description: 'Analizamos cómo funciona actualmente el negocio y detectamos oportunidades de automatización.',
      },
      {
        step: 'Paso 2',
        title: 'Diseño del sistema',
        description: 'Diseñamos la arquitectura tecnológica adecuada para el negocio.',
      },
      {
        step: 'Paso 3',
        title: 'Implementación',
        description: 'Construimos e integramos las automatizaciones y sistemas necesarios.',
      },
      {
        step: 'Paso 4',
        title: 'Optimización',
        description: 'Medimos resultados y ajustamos el sistema para mejorar su rendimiento.',
      },
    ],
    cta: {
      label: 'Agendar diagnóstico',
      href: '/diagnostico',
    },
  },

  homeExamples: {
    title: 'Ejemplos de lo que se puede construir con inteligencia artificial.',
    examples: [
      {
        title: 'Automatización de captación de clientes',
        description: 'Sistema que atrae prospectos, captura sus datos y organiza la base de clientes.',
      },
      {
        title: 'Automatización de marketing',
        description: 'Generación de contenido y seguimiento automático de prospectos.',
      },
      {
        title: 'Dashboards de negocio',
        description: 'Paneles de control que muestran ventas, clientes y métricas clave.',
      },
      {
        title: 'Automatización de procesos internos',
        description: 'Integración de herramientas para eliminar tareas manuales.',
      },
    ],
  },

  homeCta: {
    subtitle: '¿Listo para empezar?',
    title: 'Llevemos Tu Proyecto al Siguiente Nivel',
    description: 'Estoy aquí para ayudarte a transformar tus ideas en soluciones tecnológicas. Ya sea que necesites automatizar procesos, construir pipelines de datos o implementar inteligencia artificial, hablemos sobre cómo puedo aportar valor a tu proyecto.',
    buttonLabel: 'Contactar Ahora',
    buttonHref: '/contact',
  },

  newsletter: {
    subtitle: 'Newsletter',
    title: 'Mantente al Día con las Últimas Tendencias',
    headline: {
      before: 'Mantente al día con las últimas ',
      em: 'tendencias',
      after: '.',
    },
    description: 'Recibe insights sobre Data Engineering, Automatización e IA directamente en tu bandeja de entrada.',
    fine: 'Sin spam · darse de baja cuando quieras',
    namePlaceholder: 'Tu nombre',
    nameLabel: 'Nombre',
    emailPlaceholder: 'tu@email.com',
    emailLabel: 'Correo electrónico',
    buttonLabel: 'Recibir novedades',
    disclaimer: 'Sin spam. Puedes darte de baja cuando quieras.',
    successMessage: '¡Gracias por suscribirte! Pronto recibirás novedades.',
    errorMessage: 'Hubo un problema al registrarte. Por favor, inténtalo de nuevo.',
    validation: {
      nameMin: 'El nombre debe tener al menos 2 caracteres.',
      emailInvalid: 'Por favor, introduce un correo electrónico válido.',
      nameRequired: 'El nombre es obligatorio.',
      emailRequired: 'El correo electrónico es obligatorio.',
    },
  },

  // =============================================
  // ABOUT PAGE SECTIONS
  // =============================================

  aboutHero: {
    subtitle: 'Ingeniería de datos aplicada a negocios',
    title: 'Sobre mí',
    tags: 'Ingeniero de Datos · Inteligencia Artificial · Automatización · Sistemas de Negocio',
    photo: '/images/photos/originales/NParadoSonriendo.jpg',
    paragraphs: [
      'Creo sistemas donde los datos, la automatización y la inteligencia artificial ayudan a los negocios a crecer de forma más inteligente.',
      'Mi trabajo se centra en transformar información dispersa en infraestructura útil para tomar mejores decisiones, automatizar operaciones y construir ventajas competitivas reales.',
      'Hoy, la mayoría de las empresas ya genera enormes cantidades de datos: clientes, ventas, marketing, comportamiento, operaciones.',
      'El problema no es la falta de información. El problema es que casi nadie sabe cómo convertir esos datos en decisiones.',
      'Ahí es donde entro yo.',
      'Diseño sistemas que permiten entender qué está funcionando, detectar oportunidades y construir negocios más eficientes utilizando datos, automatización e inteligencia artificial.',
      'Porque la tecnología por sí sola no crea valor. Los datos bien utilizados sí.',
      'Y en los próximos años, los datos serán uno de los activos más importantes para cualquier negocio.',
    ],
    kicker: 'Sobre mí',
    headline: {
      before: 'Ingeniería de datos aplicada a ',
      em: 'negocios',
      after: '.',
    },
    meta: [
      'Luis David',
      'Ingeniero de Datos',
      'Inteligencia Artificial',
      'Automatización',
      'Sistemas de Negocio',
    ],
    lead: 'Creo sistemas donde los datos, la automatización y la inteligencia artificial ayudan a los negocios a crecer de forma más inteligente.',
    // Frase destacada: "Los datos son el oro del futuro"
    goldStatement: 'Los datos son el oro del futuro.',
  },

  aboutWhy: {
    title: 'Por qué hago esto',
    paragraphs: [
      'Estamos entrando en una nueva etapa de internet.',
      'Durante años, las empresas compitieron por productos, diseño o distribución. La próxima generación de negocios competirá por qué tan bien utiliza sus datos.',
      'La inteligencia artificial está cambiando la forma en que trabajamos. La automatización está cambiando cómo operan las empresas. Pero los datos son la infraestructura que hace posible todo lo demás.',
    ],
    kicker: 'Por qué hago esto',
    headline: {
      before: 'Estamos entrando en una nueva etapa de ',
      em: 'internet',
      after: '.',
    },
    body: [
      'Durante años, las empresas compitieron por productos, diseño o distribución. La próxima generación de negocios competirá por qué tan bien utiliza sus datos.',
      'La inteligencia artificial está cambiando la forma en que trabajamos. La automatización está cambiando cómo operan las empresas. Pero los datos son la infraestructura que hace posible todo lo demás.',
    ],
    bullets: [
      'No hay personalización,',
      'No hay automatización inteligente,',
      'No hay optimización,',
      'No hay decisiones precisas.',
    ],
    bulletIntro: 'Sin datos:',
    bodyAfterBullets: [
      'Los datos son el sistema operativo invisible de los negocios modernos.',
      'Y conforme la inteligencia artificial avance, los negocios con mejores datos tendrán una ventaja enorme sobre quienes solo utilicen herramientas sin entender la información detrás de ellas.',
      'Porque la IA puede generar contenido. Pero los datos generan contexto, decisiones y ventaja competitiva.',
      'Sin embargo, la mayoría de las personas y empresas todavía no sabe cómo construir sistemas que realmente aprovechen esa información.',
    ],
    accent:
      'Por eso decidí enfocar mi trabajo en cerrar esa brecha: ayudar a personas y negocios a utilizar tecnología moderna de forma práctica, entendible y enfocada en resultados reales.',
  },

  aboutWhat: {
    title: 'Qué hago',
    subtitle: 'Trabajo principalmente en tres áreas.',
    kicker: 'Qué hago',
    headline: {
      before: 'Trabajo principalmente en tres ',
      em: 'áreas',
      after: '.',
    },
    description:
      'Distintas formas de aplicar lo mismo: convertir datos, automatización e inteligencia artificial en sistemas que generan valor real para personas y empresas.',
    areas: [
      {
        title: 'Sistemas de datos e inteligencia de negocio',
        description: 'Diseño infraestructura para capturar, organizar y analizar información de negocio. Desde eventos de usuario y métricas de crecimiento hasta dashboards y reportes automatizados, el objetivo es convertir datos en claridad para tomar decisiones.',
      },
      {
        title: 'Automatización e inteligencia artificial',
        description: 'Construyo sistemas que utilizan IA y automatización para reducir trabajo manual, optimizar procesos y escalar operaciones. La inteligencia artificial no reemplaza un negocio. Potencia un negocio cuando está conectada a buenos sistemas y buenos datos.',
      },
      {
        title: 'Arquitectura de negocios digitales',
        description: 'Ayudo a emprendedores y empresas a construir la infraestructura tecnológica necesaria para operar y crecer en internet. Esto incluye automatización, sistemas de adquisición, organización de datos, operaciones, analytics y flujos de trabajo escalables.',
      },
    ],
  },

  aboutApproach: {
    title: 'Mi enfoque',
    paragraphs: [
      'La tecnología solo tiene valor cuando resuelve problemas reales.',
      'Por eso mi enfoque no consiste simplemente en "usar IA", sino en construir sistemas completos donde los datos permitan operar mejor, automatizar decisiones y detectar oportunidades antes.',
    ],
    bullets: [
      'atraer clientes',
      'automatizar operaciones',
      'centralizar datos',
      'tomar mejores decisiones',
    ],
    conclusion: 'Porque al final, los negocios que mejor entiendan sus datos serán los que construyan mayores ventajas competitivas.',
    kicker: 'Mi enfoque',
    headline: {
      before: 'La tecnología solo tiene valor cuando resuelve ',
      em: 'problemas reales',
      after: '.',
    },
    description:
      'Por eso mi enfoque no consiste simplemente en "usar IA", sino en construir sistemas completos donde los datos permitan operar mejor, automatizar decisiones y detectar oportunidades antes.',
    pillars: [
      {
        title: 'Atraer clientes',
        description: 'Sistemas que generan demanda y permiten entender qué canales realmente funcionan.',
      },
      {
        title: 'Automatizar operaciones',
        description: 'Eliminar tareas repetitivas y construir procesos escalables.',
      },
      {
        title: 'Centralizar datos',
        description: 'Convertir información dispersa en una fuente confiable de verdad.',
      },
      {
        title: 'Tomar mejores decisiones',
        description: 'Transformar datos en insights claros y accionables.',
      },
    ],
  },

  aboutVision: {
    title: 'Mi visión',
    paragraphs: [
      'Los negocios del futuro no competirán únicamente por productos o atención.',
      'Competirán por qué tan bien utilizan sus datos.',
      'La inteligencia artificial y la automatización cambiarán la forma de operar empresas, pero los datos serán el activo más valioso detrás de todo.',
      'Los datos son el oro del futuro.',
      'Mi objetivo es ayudar a construir esa nueva generación de negocios.',
    ],
    kicker: 'Mi visión',
    quote: {
      before:
        'Los negocios del futuro no competirán únicamente por productos o atención. Competirán por qué tan bien utilizan sus datos. La inteligencia artificial y la automatización cambiarán la forma de operar empresas, pero los datos serán el activo más valioso detrás de todo.',
      em: 'Los datos son el oro del futuro.',
      after: '',
    },
    closing: 'Mi objetivo es ayudar a construir esa nueva generación de negocios.',
    signatureName: 'Luis David',
    signatureRole: 'Ingeniero de Datos',
    signatureInitials: 'LD',
  },

  aboutCta: {
    title: 'Construyendo el futuro digital',
    description: 'Si quieres aprender inteligencia artificial o explorar cómo implementar tecnología en tu negocio, puedes empezar aquí.',
    button1: {
      label: 'Aprender IA',
      href: 'https://skool.com/@luis-david-7838',
    },
    button2: {
      label: 'Agendar diagnóstico',
      href: '/diagnostico',
    },
    kicker: 'Oportunidades',
    headline: {
      before: 'Construyendo el ',
      em: 'futuro digital',
      after: '.',
    },
  },

  // =============================================
  // OTHER PAGES (Existing)
  // =============================================

  projects: {
    title: 'Mini Apps de IA',
    subtitle: 'Herramientas interactivas y gratuitas para automatizar y mejorar tus contenidos de negocio.',
    security: {
      title: 'Tu Privacidad y Seguridad es Primero',
      description: 'Esta plataforma está diseñada para ser 100% segura para ti. Aquí te explicamos cómo funciona la seguridad de tus datos y claves:',
      points: [
        {
          title: 'Almacenamiento Local o de Sesión',
          text: 'Tus claves de API se guardan exclusivamente en tu propio navegador. Tienes el control total para guardarlas permanentemente (localStorage) o hacer que se eliminen automáticamente al cerrar la pestaña (sessionStorage) para mitigar accesos no autorizados.',
        },
        {
          title: 'Sin Servidores Intermedios',
          text: 'Las llamadas a las inteligencias artificiales se realizan directamente desde tu navegador a los servidores oficiales de OpenAI y Google. Tus datos no se almacenan en ninguna base de datos externa ni pasan por ningún proxy.',
        },
        {
          title: 'Código 100% Auditable',
          text: 'Al ser un sitio web estático, puedes abrir la consola de red (F12) en cualquier momento y auditar el tráfico. Verás que las conexiones se realizan única y directamente hacia los endpoints seguros de OpenAI y Google.',
        },
        {
          title: 'Control Absoluto',
          text: 'Puedes borrar, cambiar o desactivar tus claves en cualquier momento con un solo clic en el botón "Borrar Claves" en la pestaña de configuración.',
        }
      ]
    },
    items: [
      {
        id: 'youtube-thumbnail-pro',
        title: 'Miniaturas de tu Contenido',
        category: 'Diseño',
        description: 'Crea miniaturas profesionales de alto impacto para YouTube, Instagram, LinkedIn y más. Genera imágenes con IA optimizadas para captar la atención de tu audiencia.',
        image: '/images/apps/youtube_thumbnail_pro.png',
        tags: ['OpenAI', 'gpt-image-2', 'Diseño', 'Marketing'],
      },
      {
        id: 'seo-audit',
        title: 'Auditor SEO Express',
        category: 'Consultoría',
        description: 'Evalúa cualquier landing page en segundos. Analiza conversión, copywriting, propuesta de valor y SEO con IA para generar un reporte ejecutivo vendible.',
        image: '/images/apps/seo_audit.png',
        tags: ['SEO', 'Conversión', 'Gemini', 'Consultoría'],
      },
    ],
  },

  // =============================================
  // TALENTO (PARA ESTUDIANTES) PAGE
  // =============================================

  talento: {
    hero: {
      subtitle: 'Para Estudiantes',
      title: 'Acelera tu carrera en Datos e Inteligencia Artificial',
      description: 'Programas de formación, mentoría y recursos diseñados exclusivamente para estudiantes y profesionales que buscan destacar en el ecosistema tecnológico actual.',
      ctaPrimary: {
        label: 'Ver programas',
        href: '#programas',
      },
      ctaSecondary: {
        label: 'Únete a la comunidad',
        href: 'https://skool.com/@luis-david-7838',
      },
    },
    benefits: {
      title: '¿Por qué capacitarte conmigo?',
      items: [
        {
          title: 'Aprendizaje Práctico',
          description: 'No más teoría sin aplicación. Construirás proyectos reales que enriquecerán tu portafolio desde el primer día.',
        },
        {
          title: 'Mentoría Directa',
          description: 'Recibe feedback sobre tu código y decisiones para evitar los errores más comunes de la industria.',
        },
        {
          title: 'Hardware de Oportunidades',
          description: 'Conéctate con otros estudiantes y profesionales apasionados. Comparte dudas y colabora en grupo.',
        },
      ],
    },
    programs: {
      title: 'Rutas de Aprendizaje',
      items: [
        {
          title: 'Fundamentos de Inteligencia Artificial',
          description: 'Comprende los conceptos clave y cómo implementar modelos en aplicaciones reales usando herramientas modernas.',
          duration: 'Próximamente',
          level: 'Principiantes',
        },
        {
          title: 'Ingeniería de Datos Básica',
          description: 'Aprende a diseñar tu primer pipeline de datos, automatizando extracciones, transformaciones y cargas (ETL).',
          duration: 'Próximamente',
          level: 'Intermedio',
        },
      ],
    },
  },

  // =============================================
  // RESOURCES PAGE
  // =============================================

  resources: {
    subtitle: 'Recursos',
    title: 'Aprende con Materiales Gratuitos',
    headline: {
      before: 'Guías, plantillas y herramientas ',
      em: 'gratuitas',
      after: '.',
    },
    lead: 'Material práctico para empezar a implementar IA y automatización en tu negocio sin costo — el mismo que uso en mis consultorías.',
    description: 'Guías, plantillas y recursos prácticos sobre Data Engineering, Automatización e IA. Solo necesitas tu nombre y correo para descargarlos.',
    emptyMessage: 'Próximamente habrá recursos disponibles. ¡Vuelve pronto!',
    form: {
      viewButtonLabel: 'Ver recurso',
      buttonLabel: 'Descargar gratis',
      successMessage: '¡Listo! Tu descarga está disponible.',
      dialogTitle: 'Accede al recurso gratis',
      dialogDescription: 'Ingresa tu nombre y correo para descargar este recurso. Sin spam, lo prometemos.',
      downloadButtonLabel: 'Descargar ahora',
    },
    backLabel: '← Volver a Recursos',
    items: [
      {
        slug: 'guia-data-engineering',
        title: 'Guía de Data Engineering',
        description: 'Aprende los fundamentos del Data Engineering moderno: pipelines, ETL/ELT, herramientas y mejores prácticas para construir arquitecturas de datos escalables.',
        longDescription: 'Esta guía completa te llevará paso a paso por los conceptos esenciales del Data Engineering moderno. Desde entender qué es un pipeline de datos hasta diseñar arquitecturas escalables en la nube, cada sección está pensada para que puedas aplicar lo aprendido directamente en tus proyectos. Ideal tanto para quienes comienzan en el mundo de los datos como para profesionales que buscan actualizar sus conocimientos con las mejores prácticas de la industria.',
        highlights: [
          'Fundamentos de pipelines ETL y ELT',
          'Comparativa de herramientas: Airflow, dbt, Dagster',
          'Arquitecturas de data lakes y data warehouses',
          'Mejores prácticas de calidad y gobernanza de datos',
          'Casos de uso reales con ejemplos de código',
        ],
        ctaText: '¿Listo para dominar Data Engineering? Descarga la guía gratuita y empieza a construir pipelines profesionales hoy mismo.',
        type: 'pdf',
        tags: ['Data Engineering', 'ETL', 'Pipelines'],
        downloadUrl: 'https://supabase.luisdavidmag.com/storage/v1/object/public/resources//CV_LuisDavid.pdf',
      },
      {
        slug: 'plantilla-automatizacion-n8n',
        title: 'Plantilla de Automatización con n8n',
        description: 'Template listo para usar con los flujos de automatización más comunes: captación de leads, notificaciones y sincronización de datos entre plataformas.',
        longDescription: 'Ahorra horas de configuración con esta colección de plantillas de n8n listas para importar y usar. Cada flujo está documentado con instrucciones claras de configuración, variables de entorno necesarias y casos de uso recomendados. Incluye flujos para captación y seguimiento de leads, notificaciones automáticas por email y Slack, sincronización de datos entre CRM y hojas de cálculo, y mucho más.',
        highlights: [
          'Flujo de captación de leads con formulario web',
          'Notificaciones automáticas por email y Slack',
          'Sincronización de datos entre Google Sheets y CRM',
          'Webhook para conectar con cualquier plataforma',
          'Documentación paso a paso para cada plantilla',
        ],
        ctaText: 'Automatiza tus procesos hoy. Descarga las plantillas y tendrás flujos funcionales en minutos.',
        type: 'pdf',
        tags: ['n8n', 'Automatización', 'Templates'],
        downloadUrl: '#',
      },
      {
        slug: 'checklist-ia-negocio',
        title: 'Checklist: IA para tu Negocio',
        description: 'Una checklist práctica para evaluar dónde y cómo implementar inteligencia artificial en tu empresa. Incluye criterios de decisión y casos de uso reales.',
        longDescription: 'La inteligencia artificial no es solo para grandes corporaciones. Esta checklist te ayuda a identificar las oportunidades más rentables de IA dentro de tu negocio, sin importar su tamaño. Incluye un framework de evaluación para cada área de tu empresa, criterios claros para decidir cuándo vale la pena implementar IA vs. soluciones tradicionales, y ejemplos reales de ROI que puedes esperar.',
        highlights: [
          'Framework de evaluación de oportunidades de IA',
          'Criterios de decisión: IA vs. automatización tradicional',
          'Casos de uso por industria y área funcional',
          'Estimación de ROI y tiempos de implementación',
          'Checklist de preparación de datos para IA',
        ],
        ctaText: 'Descubre cómo la IA puede transformar tu negocio. Descarga la checklist y evalúa tus oportunidades.',
        type: 'pdf',
        tags: ['IA', 'Negocio', 'Estrategia'],
        downloadUrl: '#',
      },
    ],
  },

  contact: {
    title: 'Contacto',
    subtitle: '¿Tienes un proyecto en mente?',
    description: 'Estoy disponible para proyectos freelance, consultoría o colaboraciones. ¡Hablemos sobre cómo puedo ayudarte!',
    email: 'yosoy@luisdavidmag.com',
    ctaLabel: 'Enviar email',

    hero: {
      title: '¿Cómo puedo ayudarte?',
      subtitle: 'Cuéntame sobre tu proyecto o idea. Respondo en menos de 24 horas con una propuesta clara y sin compromiso.',
      ctaLabel: 'Ir al formulario',
    },

    qualification: {
      title: 'Contacta conmigo si:',
      items: [
        'Quieres automatizar procesos con n8n y APIs',
        'Necesitas integrar tu web con Supabase, CRM o herramientas externas',
        'Quieres mejorar la captación de leads y seguimiento automático',
        'Buscas construir pipelines de datos o reporting avanzado',
        'Necesitas soluciones de IA aplicadas a tu negocio',
      ],
    },

    form: {
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntame brevemente sobre tu proyecto o necesidad...',
      buttonLabel: 'Enviar mensaje',
      successMessage: '¡Mensaje enviado! Te respondo en menos de 24 horas.',
      errorMessage: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.',
      disclaimer: 'Tu información es privada. Nunca compartiré tus datos con terceros.',
      validation: {
        nameRequired: 'El nombre es obligatorio.',
        nameMin: 'El nombre debe tener al menos 2 caracteres.',
        emailRequired: 'El correo electrónico es obligatorio.',
        emailInvalid: 'Por favor, introduce un correo electrónico válido.',
      },
    },
  },

  // =============================================
  // DIAGNOSTIC PAGE (Hidden — no navbar link)
  // =============================================

  diagnostic: {
    hero: {
      subtitle: 'Diagnóstico Gratuito',
      title: 'Descubre los Puntos Débiles de tu Negocio Digital',
      description: 'Responde 6 preguntas rápidas y obtén un diagnóstico personalizado sobre el estado de tu transformación digital. Identifica oportunidades de mejora en datos, automatización e inteligencia artificial.',
      ctaLabel: 'Comenzar Diagnóstico',
    },

    progress: {
      label: 'Pregunta',
      of: 'de',
    },

    questions: [
      {
        id: 'data-management',
        question: '¿Cómo gestionas los datos de tu negocio?',
        options: [
          { label: 'Hojas de cálculo (Excel, Google Sheets)', value: 1 },
          { label: 'Base de datos básica (Access, MySQL simple)', value: 2 },
          { label: 'Base de datos estructurada con consultas regulares', value: 3 },
          { label: 'Data warehouse o data lake en la nube', value: 4 },
        ],
      },
      {
        id: 'manual-processes',
        question: '¿Cuántos procesos manuales repetitivos tiene tu equipo?',
        options: [
          { label: 'Muchos — la mayoría son manuales', value: 1 },
          { label: 'Varios — algunos están semi-automatizados', value: 2 },
          { label: 'Pocos — casi todo está automatizado', value: 3 },
          { label: 'Casi ninguno — tenemos flujos automatizados', value: 4 },
        ],
      },
      {
        id: 'ai-usage',
        question: '¿Usas inteligencia artificial en tus procesos de negocio?',
        options: [
          { label: 'No, y no sé cómo aplicarla', value: 1 },
          { label: 'He explorado herramientas de IA genéricas (ChatGPT, etc.)', value: 2 },
          { label: 'Uso IA en algunos procesos puntuales', value: 3 },
          { label: 'Tengo IA integrada en producción (chatbots, predicciones, etc.)', value: 4 },
        ],
      },
      {
        id: 'integrations',
        question: '¿Cómo conectas tus herramientas y plataformas?',
        options: [
          { label: 'Todo manual — copio datos de una herramienta a otra', value: 1 },
          { label: 'Uso Zapier o Make para algunas conexiones', value: 2 },
          { label: 'Tengo integraciones con APIs y webhooks', value: 3 },
          { label: 'Stack completamente integrado con orquestación centralizada', value: 4 },
        ],
      },
      {
        id: 'metrics',
        question: '¿Tienes métricas claras de tu negocio?',
        options: [
          { label: 'No tengo métricas definidas', value: 1 },
          { label: 'Reviso reportes manualmente de vez en cuando', value: 2 },
          { label: 'Tengo dashboards pero no siempre están actualizados', value: 3 },
          { label: 'Dashboards en tiempo real con KPIs automatizados', value: 4 },
        ],
      },
      {
        id: 'time-waste',
        question: '¿Cuánto tiempo dedicas a tareas que podrían automatizarse?',
        options: [
          { label: 'Más de 20 horas por semana', value: 1 },
          { label: 'Entre 10 y 20 horas por semana', value: 2 },
          { label: 'Entre 5 y 10 horas por semana', value: 3 },
          { label: 'Menos de 5 horas por semana', value: 4 },
        ],
      },
    ],

    results: [
      {
        minScore: 6,
        maxScore: 10,
        level: 'critical',
        emoji: '🔴',
        title: 'Estado Crítico — Urgencia de Transformación',
        description: 'Tu negocio depende casi por completo de procesos manuales y no aprovecha el potencial de los datos ni la automatización. Hay una gran oportunidad de mejora que puede impactar directamente en tu productividad y rentabilidad.',
        recommendation: 'Te recomiendo comenzar con una consultoría estratégica para identificar los quick wins que pueden ahorrarte horas de trabajo inmediatamente.',
      },
      {
        minScore: 11,
        maxScore: 15,
        level: 'developing',
        emoji: '🟡',
        title: 'En Desarrollo — Fundamentos por Construir',
        description: 'Has dado algunos pasos, pero tu infraestructura de datos y automatización todavía tiene brechas importantes. Con las bases correctas, puedes acelerar significativamente el crecimiento.',
        recommendation: 'Necesitas establecer una base sólida de datos y comenzar a automatizar los procesos más repetitivos. Un plan de acción enfocado puede hacer la diferencia.',
      },
      {
        minScore: 16,
        maxScore: 20,
        level: 'intermediate',
        emoji: '🟢',
        title: 'Intermedio — Buena Base, Mucho Potencial',
        description: 'Tienes una base tecnológica respetable. Ahora es momento de optimizar, integrar IA y llevar tu stack al siguiente nivel para diferenciarte de la competencia.',
        recommendation: 'Enfócate en integrar inteligencia artificial y crear pipelines de datos más sofisticados para tomar decisiones basadas en datos en tiempo real.',
      },
      {
        minScore: 21,
        maxScore: 24,
        level: 'advanced',
        emoji: '🚀',
        title: 'Avanzado — Listo para Escalar',
        description: '¡Excelente! Tu negocio está bien posicionado tecnológicamente. Las oportunidades ahora están en la optimización avanzada, IA predictiva y escalabilidad.',
        recommendation: 'Podemos explorar IA avanzada, modelos predictivos y arquitecturas de datos de próxima generación para mantener tu ventaja competitiva.',
      },
    ],

    form: {
      title: 'Recibe tu Diagnóstico Completo',
      description: 'Déjame tu nombre y correo para enviarte un análisis detallado con recomendaciones personalizadas.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      buttonLabel: 'Recibir mi diagnóstico',
      successMessage: '¡Listo! Recibirás tu diagnóstico personalizado en tu correo.',
      errorMessage: 'Hubo un problema. Por favor, inténtalo de nuevo.',
      disclaimer: 'Tu información es privada. Nunca compartiré tus datos con terceros.',
      validation: {
        nameRequired: 'El nombre es obligatorio.',
        nameMin: 'El nombre debe tener al menos 2 caracteres.',
        emailRequired: 'El correo electrónico es obligatorio.',
        emailInvalid: 'Por favor, introduce un correo electrónico válido.',
      },
    },

    cta: {
      title: '¿Quieres mejorar tu puntuación?',
      description: 'Hablemos sobre cómo puedo ayudarte a transformar tu negocio con datos, automatización e inteligencia artificial.',
      buttonLabel: 'Agendar una Consulta',
      buttonHref: '/contact',
    },

    navigation: {
      previous: 'Anterior',
      next: 'Siguiente',
      restart: 'Repetir Diagnóstico',
      seeResults: 'Ver Resultados',
    },
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/luisdavidmag/',
    github: 'https://github.com/LuisDavid0912',
    email: 'mailto:yosoy@luisdavidmag.com',
    instagram: 'https://www.instagram.com/luisdavid.mag/',
    youtube: 'https://www.youtube.com/channel/UCbIGQZdHSaTeZqt3ZvV1s4A',
    tiktok: 'https://www.tiktok.com/@luisdavidmag?lang=es-419',
    x: 'https://x.com/LuisDavidMag',
    skool: 'https://skool.com/@luis-david-7838',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Luis David Mag. Todos los derechos reservados.`,
  },
};

export type SiteContent = typeof siteContent;
