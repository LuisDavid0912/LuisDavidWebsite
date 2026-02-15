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
      { label: 'Recursos', href: '/resources' },
      { label: 'Contacto', href: '/contact' },
    ],
  },
  
  hero: {
    headline: 'Data Engineer & AI Automation Specialist',
    subheadline: 'Transformo datos en insights y procesos manuales en flujos automatizados. Especializado en Data Engineering, n8n y soluciones de Inteligencia Artificial.',
    ctaPrimary: {
      label: 'Hablemos',
      href: '/contact',
    },
    ctaSecondary: {
      label: 'Ver proyectos',
      href: '/projects',
    },
  },

  // =============================================
  // HOME PAGE SECTIONS
  // =============================================
  
  homeIntro: {
    subtitle: 'Bienvenido',
    title: 'Construyendo el Futuro con Datos e Inteligencia Artificial',
    paragraphs: [
      'En un mundo donde los datos son el nuevo petróleo, mi misión es ayudar a empresas y emprendedores a extraer el máximo valor de su información. Desde pipelines de datos hasta automatizaciones inteligentes, cada solución está diseñada para escalar.',
      'Con más de años de experiencia en el ecosistema tecnológico, he tenido el privilegio de trabajar con startups innovadoras y empresas establecidas, siempre con un objetivo común: transformar la complejidad en simplicidad.',
      'Mi enfoque combina la rigurosidad técnica con una visión estratégica del negocio. No se trata solo de escribir código, sino de entender el problema de fondo y diseñar soluciones que generen impacto real.',
    ],
  },

  homeServices: {
    subtitle: 'Servicios',
    title: '¿Cómo Puedo Ayudarte?',
    items: [
      {
        title: 'Data Engineering',
        description: 'Diseño y construcción de arquitecturas de datos modernas. Desde la ingesta hasta la transformación, creo pipelines robustos que escalan con tu negocio. ETL/ELT, data lakes, y orquestación con herramientas como Airflow y dbt.',
        icon: 'data',
      },
      {
        title: 'Automatización Inteligente',
        description: 'Implementación de flujos de trabajo automatizados con n8n y herramientas low-code. Conecto aplicaciones, elimino tareas repetitivas y optimizo procesos operativos para que tu equipo se enfoque en lo que importa.',
        icon: 'automation',
      },
      {
        title: 'Soluciones de IA',
        description: 'Desarrollo de aplicaciones con inteligencia artificial generativa. Chatbots inteligentes, procesamiento de lenguaje natural, y modelos predictivos que transforman la forma en que interactúas con tus clientes.',
        icon: 'ai',
      },
      {
        title: 'Consultoría Técnica',
        description: 'Asesoría estratégica para la adopción de tecnologías de datos. Te ayudo a definir la arquitectura correcta, seleccionar las herramientas adecuadas y formar a tu equipo para el éxito a largo plazo.',
        icon: 'consulting',
      },
      {
        title: 'Desarrollo Full-Stack',
        description: 'Creación de aplicaciones web modernas con React, Next.js y Node.js. Desde MVPs hasta productos completos, desarrollo soluciones que combinan excelente UX con backends escalables.',
        icon: 'fullstack',
      },
      {
        title: 'Integración de Sistemas',
        description: 'Conexión de plataformas y servicios mediante APIs y webhooks. Rompo los silos de información para crear flujos de datos unificados que potencian la toma de decisiones.',
        icon: 'integration',
      },
    ],
  },

  homeStats: {
    subtitle: 'Impacto',
    title: 'Números que Hablan',
    items: [
      { value: '50+', label: 'Proyectos Completados' },
      { value: '1M+', label: 'Registros Procesados Diariamente' },
      { value: '100+', label: 'Automatizaciones Creadas' },
      { value: '30+', label: 'Clientes Satisfechos' },
    ],
  },

  homeProjects: {
    subtitle: 'Portfolio',
    title: 'Proyectos Destacados',
    description: 'Una selección de trabajos que demuestran mi experiencia en diferentes áreas tecnológicas. Cada proyecto representa un desafío único y una solución a medida.',
  },

  homeTestimonials: {
    subtitle: 'Testimonios',
    title: 'Lo Que Dicen Mis Clientes',
    items: [
      {
        quote: 'Luis David transformó completamente nuestra infraestructura de datos. Lo que antes tardaba horas, ahora se ejecuta automáticamente en minutos. Su enfoque técnico y visión de negocio son excepcionales.',
        author: 'María González',
        role: 'CTO, TechStartup',
      },
      {
        quote: 'La automatización que implementó nos ha ahorrado más de 20 horas semanales en tareas manuales. Su conocimiento de n8n y su capacidad para entender nuestros procesos fueron clave.',
        author: 'Carlos Rodríguez',
        role: 'Director de Operaciones, E-commerce',
      },
      {
        quote: 'Trabajar con Luis David fue una experiencia excelente. Entendió rápidamente nuestras necesidades y entregó una solución de IA que superó nuestras expectativas.',
        author: 'Ana Martínez',
        role: 'Fundadora, Startup IA',
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

  about: {
    title: 'Sobre mí',
    subtitle: '¿Quién soy y qué hago?',
    description: 'Soy un apasionado por la tecnología con experiencia en el diseño e implementación de pipelines de datos, automatización de procesos empresariales y desarrollo de soluciones con inteligencia artificial.',
    highlights: [
      {
        title: 'Data Engineering',
        description: 'Diseño y construcción de pipelines de datos escalables, ETL/ELT, y arquitecturas de datos modernas.',
      },
      {
        title: 'Automatización con n8n',
        description: 'Creación de flujos de trabajo automatizados que conectan aplicaciones y optimizan procesos.',
      },
      {
        title: 'Inteligencia Artificial',
        description: 'Implementación de soluciones de IA generativa, chatbots y modelos de machine learning.',
      },
      {
        title: 'Desarrollo Full-Stack',
        description: 'Aplicaciones web modernas con React, Next.js, Node.js y bases de datos SQL/NoSQL.',
      },
    ],
  },

  aboutHero: {
    subtitle: 'Sobre Mí',
    title: 'Transformando Datos en Oportunidades',
    intro: 'Soy Luis David, un ingeniero de datos y especialista en automatización con una pasión por resolver problemas complejos a través de la tecnología. Mi misión es ayudar a empresas a navegar la era digital construyendo soluciones que escalen.',
  },

  aboutStory: {
    subtitle: 'Mi Historia',
    title: 'El Camino Hacia la Tecnología',
    paragraphs: [
      'Mi viaje en el mundo de la tecnología comenzó hace más de una década, cuando descubrí el poder de la programación para resolver problemas del mundo real. Lo que empezó como curiosidad se transformó en una pasión que ha definido mi carrera profesional.',
      'A lo largo de los años, he tenido el privilegio de trabajar en proyectos diversos: desde startups en etapa temprana hasta empresas consolidadas. Cada experiencia me ha enseñado algo nuevo y ha fortalecido mi convicción de que la tecnología, bien aplicada, puede transformar negocios.',
      'Hoy, mi enfoque se centra en tres pilares: Data Engineering, Automatización Inteligente e Inteligencia Artificial. Creo firmemente que la intersección de estas disciplinas es donde ocurre la verdadera innovación.',
      'Más allá del código, disfruto compartir conocimiento, mentorear a nuevos talentos y explorar las últimas tendencias tecnológicas. Cada día es una oportunidad para aprender algo nuevo y aplicarlo para crear valor.',
    ],
  },

  aboutSkills: {
    subtitle: 'Habilidades',
    title: 'Stack Tecnológico',
    categories: [
      {
        name: 'Data Engineering',
        skills: ['Python', 'SQL', 'Apache Airflow', 'dbt', 'Spark', 'Kafka', 'PostgreSQL', 'MongoDB', 'Snowflake', 'AWS Redshift', 'Google BigQuery', 'ClickHouse'],
      },
      {
        name: 'Automatización',
        skills: ['n8n', 'Zapier', 'Make (Integromat)', 'APIs REST', 'Webhooks', 'Cron Jobs', 'Serverless Functions', 'Docker', 'Kubernetes'],
      },
      {
        name: 'Inteligencia Artificial',
        skills: ['OpenAI GPT', 'LangChain', 'Vector Databases', 'Embeddings', 'RAG Systems', 'Prompt Engineering', 'Fine-tuning', 'Hugging Face'],
      },
      {
        name: 'Desarrollo Web',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'GraphQL', 'Material UI', 'Tailwind CSS', 'Git', 'CI/CD'],
      },
    ],
  },

  aboutExperience: {
    subtitle: 'Experiencia',
    title: 'Trayectoria Profesional',
    items: [
      {
        period: '2022 - Presente',
        title: 'Data Engineer & AI Specialist',
        company: 'Freelance / Consultor Independiente',
        description: 'Diseño e implementación de arquitecturas de datos end-to-end. Desarrollo de soluciones de IA generativa y automatizaciones con n8n para clientes de diversos sectores.',
      },
      {
        period: '2020 - 2022',
        title: 'Senior Data Engineer',
        company: 'Tech Company',
        description: 'Lideré la modernización de la infraestructura de datos, migrando de procesos batch a streaming en tiempo real. Implementé pipelines que procesan millones de eventos diarios.',
      },
      {
        period: '2018 - 2020',
        title: 'Full-Stack Developer',
        company: 'Startup',
        description: 'Desarrollo de aplicaciones web con React y Node.js. Participé en el diseño de la arquitectura inicial y la implementación de features core del producto.',
      },
      {
        period: '2016 - 2018',
        title: 'Junior Developer',
        company: 'Agencia Digital',
        description: 'Primeros pasos profesionales desarrollando sitios web y aplicaciones para diversos clientes. Aprendizaje intensivo de tecnologías web y metodologías ágiles.',
      },
    ],
  },

  aboutValues: {
    subtitle: 'Filosofía',
    title: 'Valores que Guían Mi Trabajo',
    items: [
      {
        title: 'Excelencia Técnica',
        description: 'Creo en escribir código limpio, documentado y mantenible. La calidad no es negociable; cada solución debe estar diseñada para perdurar.',
      },
      {
        title: 'Aprendizaje Continuo',
        description: 'La tecnología evoluciona constantemente. Me comprometo a mantenerme actualizado y a explorar nuevas herramientas que puedan aportar valor.',
      },
      {
        title: 'Comunicación Clara',
        description: 'La tecnología debe servir al negocio. Me esfuerzo por traducir conceptos técnicos en términos que cualquier stakeholder pueda entender.',
      },
      {
        title: 'Enfoque en Resultados',
        description: 'Más allá del código, lo que importa es el impacto. Cada proyecto debe generar valor medible para el cliente o la organización.',
      },
    ],
  },

  aboutEducation: {
    subtitle: 'Formación',
    title: 'Educación y Certificaciones',
    items: [
      {
        title: 'Ingeniería en Sistemas Computacionales',
        institution: 'Universidad Tecnológica',
        year: '2016',
        type: 'degree',
      },
      {
        title: 'AWS Certified Data Analytics',
        institution: 'Amazon Web Services',
        year: '2023',
        type: 'certification',
      },
      {
        title: 'Google Cloud Professional Data Engineer',
        institution: 'Google Cloud',
        year: '2022',
        type: 'certification',
      },
      {
        title: 'dbt Analytics Engineering',
        institution: 'dbt Labs',
        year: '2022',
        type: 'certification',
      },
    ],
  },

  aboutInterests: {
    subtitle: 'Más Allá del Código',
    title: 'Intereses Personales',
    description: 'Cuando no estoy frente a la computadora, disfruto explorar otras pasiones que complementan mi vida profesional y me mantienen equilibrado.',
    items: [
      {
        title: 'Música',
        description: 'La música es parte fundamental de mi vida. Ya sea escuchando mientras trabajo o explorando nuevos géneros, siempre hay una playlist de fondo.',
      },
      {
        title: 'Lectura',
        description: 'Desde libros técnicos hasta novelas de ciencia ficción, la lectura expande mi perspectiva y alimenta mi curiosidad natural.',
      },
      {
        title: 'Comunidad Tech',
        description: 'Participo activamente en meetups y comunidades de desarrolladores. Compartir conocimiento y aprender de otros es enriquecedor.',
      },
      {
        title: 'Viajes',
        description: 'Explorar nuevos lugares y culturas me inspira y ofrece perspectivas frescas que aplico en mi trabajo creativo.',
      },
    ],
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
  // RESOURCES PAGE
  // =============================================

  resources: {
    subtitle: 'Recursos Gratis',
    title: 'Aprende con Materiales Gratuitos',
    description: 'Guías, plantillas y recursos prácticos sobre Data Engineering, Automatización e IA. Solo necesitas tu nombre y correo para descargarlos.',
    emptyMessage: 'Próximamente habrá recursos disponibles. ¡Vuelve pronto!',
    form: {
      buttonLabel: 'Descargar gratis',
      successMessage: '¡Listo! Tu descarga está disponible.',
      dialogTitle: 'Accede al recurso gratis',
      dialogDescription: 'Ingresa tu nombre y correo para descargar este recurso. Sin spam, lo prometemos.',
      downloadButtonLabel: 'Descargar ahora',
    },
    items: [
      {
        slug: 'guia-data-engineering',
        title: 'Guía de Data Engineering',
        description: 'Aprende los fundamentos del Data Engineering moderno: pipelines, ETL/ELT, herramientas y mejores prácticas para construir arquitecturas de datos escalables.',
        type: 'pdf',
        tags: ['Data Engineering', 'ETL', 'Pipelines'],
        downloadUrl: 'https://supabase.luisdavidmag.com/storage/v1/object/public/resources//CV_LuisDavid.pdf',
      },
      {
        slug: 'plantilla-automatizacion-n8n',
        title: 'Plantilla de Automatización con n8n',
        description: 'Template listo para usar con los flujos de automatización más comunes: captación de leads, notificaciones y sincronización de datos entre plataformas.',
        type: 'pdf',
        tags: ['n8n', 'Automatización', 'Templates'],
        downloadUrl: '#',
      },
      {
        slug: 'checklist-ia-negocio',
        title: 'Checklist: IA para tu Negocio',
        description: 'Una checklist práctica para evaluar dónde y cómo implementar inteligencia artificial en tu empresa. Incluye criterios de decisión y casos de uso reales.',
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
