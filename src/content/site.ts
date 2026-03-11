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
      { label: 'Proyectos', href: '/projects' },
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
    description: 'Recibe insights sobre Data Engineering, Automatización e IA directamente en tu bandeja de entrada.',
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
    tags: 'Ingeniero de Datos • Inteligencia Artificial • Automatización • Negocios Digitales',
    photo: '/images/photos/originales/KParadoSonriendo.jpg',
    paragraphs: [
      'Soy ingeniero de datos y trabajo en la intersección entre tecnología y negocios.',
      'Mi trabajo consiste en ayudar a personas y empresas a entender y aplicar herramientas como inteligencia artificial, automatización y análisis de datos para construir sistemas que mejoren la forma en que funcionan los negocios.',
      'Más allá de la tecnología, mi enfoque es simple: convertir herramientas complejas en soluciones prácticas que generen resultados reales.',
    ],
  },

  aboutWhy: {
    title: 'Por qué hago esto',
    paragraphs: [
      'Estamos viviendo uno de los cambios tecnológicos más importantes de nuestra generación.',
      'La inteligencia artificial, la automatización y los datos están transformando la forma en que se crean empresas, se toman decisiones y se construyen oportunidades.',
      'Sin embargo, la mayoría de las personas y negocios todavía no sabe cómo utilizar esta tecnología de forma práctica.',
      'Muchos escuchan hablar de inteligencia artificial, pero no saben cómo aplicarla en su negocio.',
      'Otros quieren emprender en internet, pero no tienen la infraestructura tecnológica para hacerlo.',
      'Por eso decidí enfocar mi trabajo en cerrar esa brecha.',
      'Mi objetivo es acercar herramientas como la inteligencia artificial y la automatización a quienes quieren aprender, construir o mejorar sus negocios.',
    ],
  },

  aboutWhat: {
    title: 'Qué hago',
    subtitle: 'Mi trabajo se centra en tres áreas principales.',
    areas: [
      {
        title: 'Formación en inteligencia artificial',
        description: 'Creo contenido y programas educativos donde enseño a utilizar herramientas de inteligencia artificial, automatización y tecnología moderna. El objetivo es ayudar a las personas a desarrollar habilidades que serán clave para el futuro del trabajo.',
      },
      {
        title: 'Arquitectura de negocios digitales',
        description: 'Ayudo a emprendedores a diseñar la infraestructura tecnológica que necesitan para construir negocios digitales. Esto incluye sistemas de captación de clientes, automatización de procesos y organización de datos.',
      },
      {
        title: 'Implementación de tecnología en empresas',
        description: 'Trabajo con negocios que quieren mejorar sus procesos utilizando inteligencia artificial, automatización y análisis de datos. Diseño e implemento sistemas que permiten atraer clientes, automatizar operaciones y tomar decisiones basadas en información.',
      },
    ],
  },

  aboutApproach: {
    title: 'Mi enfoque',
    paragraphs: [
      'Creo que la tecnología solo tiene valor cuando se aplica a resolver problemas reales.',
      'Por eso mi enfoque consiste en construir sistemas que ayuden a los negocios a:',
    ],
    bullets: [
      'atraer clientes',
      'automatizar procesos',
      'organizar sus datos',
      'tomar mejores decisiones',
    ],
    conclusion: 'No se trata solo de usar inteligencia artificial, sino de integrarla dentro del funcionamiento del negocio.',
  },

  aboutVision: {
    title: 'Mi visión',
    paragraphs: [
      'Creo que los negocios del futuro serán construidos por personas que entiendan cómo utilizar tecnología para crear soluciones.',
      'La inteligencia artificial, la automatización y los datos serán herramientas fundamentales para quienes quieran emprender, trabajar o liderar empresas.',
      'Mi objetivo es contribuir a esa transición ayudando a formar personas que entiendan estas herramientas y a construir negocios que puedan utilizarlas para crecer.',
    ],
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
  },

  // =============================================
  // OTHER PAGES (Existing)
  // =============================================

  projects: {
    title: 'Proyectos',
    subtitle: 'Algunos trabajos destacados',
    items: [
      {
        title: 'Pipeline de Datos en la Nube',
        description: 'Arquitectura de datos en AWS para procesar millones de registros diarios con alta disponibilidad.',
        tags: ['AWS', 'Python', 'Airflow', 'PostgreSQL'],
        link: '#',
      },
      {
        title: 'CRM con IA Integrada',
        description: 'Sistema de gestión de clientes con asistente de IA para automatizar respuestas y análisis.',
        tags: ['Next.js', 'n8n', 'OpenAI', 'MongoDB'],
        link: '#',
      },
      {
        title: 'Automatización de Marketing',
        description: 'Flujos automatizados en n8n para campañas de email, leads scoring y seguimiento.',
        tags: ['n8n', 'Mailchimp', 'Google Sheets', 'Webhooks'],
        link: '#',
      },
      {
        title: 'Dashboard de Analytics',
        description: 'Panel de visualización de datos en tiempo real con métricas clave de negocio.',
        tags: ['React', 'D3.js', 'Node.js', 'ClickHouse'],
        link: '#',
      },
      {
        title: 'Chatbot de Atención al Cliente',
        description: 'Bot conversacional con IA para resolver consultas frecuentes 24/7.',
        tags: ['OpenAI', 'LangChain', 'Python', 'FastAPI'],
        link: '#',
      },
      {
        title: 'ETL para E-commerce',
        description: 'Pipeline de extracción y transformación de datos de múltiples marketplaces.',
        tags: ['Python', 'dbt', 'Snowflake', 'Dagster'],
        link: '#',
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
    subtitle: 'Recursos Gratis',
    title: 'Aprende con Materiales Gratuitos',
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
