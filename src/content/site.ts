export const siteContent = {
  meta: {
    title: 'Luis David Mag | Data Engineer & AI Automation Specialist',
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

  contact: {
    title: 'Contacto',
    subtitle: '¿Tienes un proyecto en mente?',
    description: 'Estoy disponible para proyectos freelance, consultoría o colaboraciones. ¡Hablemos sobre cómo puedo ayudarte!',
    email: 'contacto@luisdavidmag.com',
    ctaLabel: 'Enviar email',
  },

  social: {
    linkedin: 'https://linkedin.com/in/luisdavidmag',
    github: 'https://github.com/luisdavidmag',
    email: 'mailto:contacto@luisdavidmag.com',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Luis David Mag. Todos los derechos reservados.`,
  },
};

export type SiteContent = typeof siteContent;
