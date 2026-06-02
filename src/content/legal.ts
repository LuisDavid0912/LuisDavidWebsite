export const legalContent = {
  privacy: {
    title: 'Política de Privacidad',
    lastUpdated: '02 de junio de 2026',
    sections: [
      {
        heading: '1. Responsable del Tratamiento',
        content: [
          'El responsable del tratamiento de los datos personales recabados a través de este sitio web (luisdavidmag.com) es Luis David Mag.',
          'Puedes contactarme directamente a través del correo electrónico: yosoy@luisdavidmag.com para cualquier duda, aclaración o solicitud relacionada con tu privacidad y el tratamiento de tus datos.',
        ],
      },
      {
        heading: '2. Datos que Recabamos y Cómo los Obtenemos',
        content: [
          'Este sitio web recopila información bajo dos modalidades principales: de forma activa (cuando nos la proporcionas directamente) y de forma técnica/pasiva (para el funcionamiento técnico del sitio y el uso de las herramientas interactivas).',
          'A) Datos proporcionados voluntariamente por el usuario:',
          '• Formularios de Contacto y Diagnóstico: Nombre completo, dirección de correo electrónico, detalles sobre tu negocio, necesidades de automatización o inteligencia artificial, y cualquier mensaje adicional que decidas escribir.',
          '• Descarga de Recursos Gratuitos: Nombre y correo electrónico para la entrega de guías, plantillas u otros materiales interactivos.',
          'B) Datos técnicos y de uso de las Mini Apps de IA (OpenAI / Google Gemini):',
          '• Claves de API (API Keys): Para utilizar nuestras Mini Apps (como YouTube Thumbnail Pro, Auditor SEO Express, etc.), debes ingresar tus propias claves de API de OpenAI o Google. Estas claves se almacenan exclusivamente en tu propio navegador web (mediante localStorage o sessionStorage, según elijas) y nunca son enviadas, guardadas ni procesadas en nuestros servidores. La comunicación se realiza directamente desde tu navegador a los servidores oficiales de OpenAI y Google.',
          '• Entradas y Prompts de las Apps: Los textos, enlaces, imágenes o código HTML que ingreses en las Mini Apps para su procesamiento se envían directamente a las APIs correspondientes de OpenAI o Google. Este sitio no almacena tus prompts, código HTML ni los resultados de los análisis en ninguna base de datos propia.',
          '• Auditoría de URLs y Proxy CORS: Para la funcionalidad de análisis de landing pages mediante URL en el "Auditor SEO Express", el sitio realiza una petición a través del servicio proxy público "api.allorigins.win" para recuperar el HTML de la página objetivo y procesarlo en tu navegador. No debes auditar URLs que contengan información confidencial o credenciales de acceso privado.',
          'C) Datos de navegación estándar:',
          '• Información técnica básica (dirección IP, tipo de navegador, sistema operativo, páginas visitadas y tiempos de acceso) recopilada automáticamente por el servidor de alojamiento (logs estándar) con fines exclusivos de seguridad y prevención de abusos.',
        ],
      },
      {
        heading: '3. Finalidades del Tratamiento de Datos',
        content: [
          'Tus datos personales y la información técnica recopilada serán utilizados únicamente para:',
          '• Responder y dar seguimiento a tus mensajes de contacto, dudas o propuestas de colaboración.',
          '• Procesar y analizar tus respuestas en el formulario de Diagnóstico para ofrecerte una propuesta de consultoría personalizada y agendar una llamada de asesoramiento.',
          '• Enviar el recurso digital gratuito que hayas solicitado descargar.',
          '• Permitir el correcto funcionamiento de las Mini Apps de IA directamente en tu navegador, canalizando las consultas a los proveedores de inteligencia artificial oficiales.',
          '• Garantizar la seguridad técnica del sitio, detectar actividades fraudulentas o maliciosas, y cumplir con obligaciones legales.',
          'Bajo ninguna circunstancia utilizaremos tus datos para enviar publicidad no solicitada (spam) ni los venderemos a terceras partes.',
        ],
      },
      {
        heading: '4. Base Legal para el Tratamiento',
        content: [
          'La base jurídica que legitima el tratamiento de tus datos es tu consentimiento expreso y libre. Al completar y enviar cualquiera de nuestros formularios, aceptar la descarga de recursos, o ingresar tus datos para configurar las herramientas de IA, aceptas expresamente que tratemos tus datos de conformidad con lo establecido en esta Política de Privacidad.',
        ],
      },
      {
        heading: '5. Destinatarios de los Datos y Proveedores de Confianza',
        content: [
          'No compartimos, vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales. Sin embargo, para poder ofrecerte el sitio y sus funciones, nos apoyamos en proveedores de servicios tecnológicos que actúan como encargados del tratamiento bajo estrictas medidas de seguridad:',
          '• Hostinger: Proveedor de alojamiento web (almacena el sitio estático y genera logs estándar del servidor).',
          '• n8n: Plataforma de automatización alojada en un servidor privado (VPS) propio. Los formularios de contacto, descargas y diagnósticos envían la información a través de webhooks seguros gestionados por n8n.',
          '• Supabase: Base de datos segura e independiente utilizada exclusivamente por n8n para almacenar los leads de forma segura y estructurada. El frontend del sitio nunca tiene acceso directo ni credenciales de conexión a esta base de datos.',
          '• OpenAI y Google Gemini (Alphabet Inc.): Al usar las Mini Apps con tus propias claves, tus datos de entrada (prompts, imágenes, código de páginas) se transmiten de manera directa y cifrada a sus respectivos servidores. Su uso está sujeto a los términos de privacidad para desarrolladores de OpenAI y Google.',
          '• api.allorigins.win: Proxy CORS público e intermedio utilizado únicamente para descargar la estructura HTML pública de las URLs que decidas analizar en el Auditor SEO Express.',
        ],
      },
      {
        heading: '6. Conservación de tus Datos',
        content: [
          'Conservaremos tus datos de contacto y de diagnósticos únicamente durante el tiempo que sea necesario para cumplir con las finalidades descritas (por ejemplo, para resolver tu consulta o llevar a cabo la relación de consultoría) o hasta que solicites expresamente su supresión.',
          'Las claves de API de IA y los datos de sesión de las Mini Apps permanecen en tu dispositivo local y serán borrados inmediatamente cuando decidas hacer clic en "Borrar Claves" o, en el caso de sessionStorage, al cerrar la pestaña o el navegador.',
        ],
      },
      {
        heading: '7. Medidas de Seguridad',
        content: [
          'Implementamos medidas de seguridad técnicas, administrativas y organizativas para proteger tus datos personales contra pérdidas, usos no autorizados o accesos indebidos. Toda transmisión de datos en el sitio (incluyendo los formularios y las conexiones con las APIs de IA) se realiza bajo el protocolo seguro HTTPS con cifrado SSL.',
          'Adicionalmente, hemos diseñado un modelo de seguridad "privado por diseño" para las Mini Apps, de modo que tu información más sensible (claves de API) nunca toca nuestros servidores y se almacena localmente de forma controlada por ti.',
        ],
      },
      {
        heading: '8. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)',
        content: [
          'De acuerdo con la legislación aplicable en materia de protección de datos (como la Ley Federal de Protección de Datos Personales en Posesión de los Particulares en México, así como estándares internacionales equivalentes como el GDPR), tienes el derecho en todo momento de acceder a los datos personales que poseemos sobre ti, rectificarlos si son incorrectos, solicitar su cancelación/eliminación o oponerte a su tratamiento para fines específicos.',
          'Para ejercer cualquiera de tus derechos ARCO, simplemente envía una solicitud por escrito desde la dirección de correo electrónico asociada al correo: yosoy@luisdavidmag.com. Responderemos a tu solicitud con la mayor brevedad posible y a más tardar en los plazos marcados por la ley.',
        ],
      },
      {
        heading: '9. Cambios a esta Política de Privacidad',
        content: [
          'Nos reservamos el derecho de modificar o actualizar esta Política de Privacidad en cualquier momento para adaptarla a novedades legislativas, jurisprudenciales o por cambios en las funcionalidades técnicas y de las Mini Apps del sitio web. Te recomendamos revisar esta página periódicamente para mantenerte informado.',
        ],
      },
    ],
  },

  cookies: {
    title: 'Política de Cookies y Almacenamiento Local',
    lastUpdated: '02 de junio de 2026',
    intro: [
      'En luisdavidmag.com nos tomamos muy en serio tu privacidad. Esta política detalla de forma clara y transparente qué tecnologías de almacenamiento en el navegador utilizamos, qué datos guardamos y cómo puedes controlarlos.',
      'Queremos que navegues con total tranquilidad: este sitio web no utiliza cookies invasivas de rastreo publicitario, marketing de terceros (como el píxel de Facebook) ni herramientas de rastreo cruzado.',
    ],
    sections: [
      {
        heading: '1. ¿Qué son las cookies y el almacenamiento local?',
        content: [
          'Las cookies son pequeños archivos de texto que los sitios web guardan en tu navegador cuando los visitas. Facilitan funciones básicas como recordar tus preferencias.',
          'El almacenamiento local (localStorage y sessionStorage) es una tecnología moderna integrada en tu navegador que nos permite guardar datos técnicos con mayor capacidad y seguridad que las cookies tradicionales, sin enviar dicha información automáticamente al servidor en cada petición HTTP.',
        ],
      },
      {
        heading: '2. Tecnologías de Almacenamiento Utilizadas en este Sitio',
        content: [
          'Utilizamos almacenamiento local y de sesión estrictamente con fines técnicos y para posibilitar las herramientas interactivas (Mini Apps). Detallamos las variables que pueden guardarse en tu navegador:',
          'A) Almacenamiento de Preferencias:',
          '• theme-mode: Guarda tu preferencia estética del sitio (modo oscuro o modo claro) para que se aplique automáticamente en tus siguientes visitas.',
          'B) Almacenamiento de Mini Apps de IA (Configurable por el usuario):',
          '• Claves de API (openai_api_key, gemini_api_key): Si decides guardar tus claves de API de forma permanente para no tener que escribirlas cada vez, se guardan en el localStorage de tu navegador. Si seleccionas la opción de no recordarlas de forma permanente, se almacenan únicamente en el sessionStorage (se destruyen al cerrar la pestaña).',
          '• Opciones de Configuración de las Apps: Ajustes menores de las herramientas (como el modelo de IA seleccionado o la persistencia de claves).',
          'C) Seguridad y Prevención de Spam (sessionStorage):',
          '• Token de envío de leads: Al enviar de forma exitosa un formulario (de contacto, recurso o diagnóstico), guardamos una marca de sesión temporal en el sessionStorage para evitar envíos duplicados accidentales o repetitivos durante tu misma visita.',
        ],
      },
      {
        heading: '3. Cookies y Herramientas de Terceros',
        content: [
          'Para mantener un sitio web limpio y respetuoso con tu privacidad, hemos decidido prescindir por completo de cookies de analítica invasiva o de remarketing.',
          'Si interactúas con enlaces externos (como Skool, GitHub, LinkedIn, etc.), dichos sitios de terceros pueden implantar sus propias cookies cuando los visitas. Te sugerimos revisar las políticas de cookies de dichas plataformas al acceder a ellas.',
        ],
      },
      {
        heading: '4. Cómo Controlar, Limpiar o Desactivar el Almacenamiento',
        content: [
          'Tienes el control absoluto de tus datos en todo momento:',
          '• Dentro del Sitio: En la sección de configuración de las Mini Apps de IA, puedes hacer clic en el botón "Borrar Claves" para eliminar instantáneamente cualquier API Key guardada de tu localStorage.',
          '• Desde tu Navegador: Puedes borrar las cookies, el localStorage y el sessionStorage del sitio luisdavidmag.com en cualquier momento a través del panel de configuración de privacidad de tu navegador. Si deseas saber cómo hacerlo en tu navegador específico, consulta los siguientes enlaces oficiales:',
          '• Google Chrome (Borrar cookies y datos de sitios)',
          '• Mozilla Firefox (Limpiar cookies y datos de sitios)',
          '• Apple Safari (Gestionar cookies y datos de sitios web)',
          '• Microsoft Edge (Eliminar cookies y datos del explorador)',
          'Ten en cuenta que si deshabilitas por completo el almacenamiento local, es posible que no puedas hacer uso de las Mini Apps de IA de forma óptima (ya que requieren recordar las claves de API temporalmente para hacer las consultas) y que debas configurar el modo oscuro en cada visita.',
        ],
      },
    ],
  },

  legal: {
    title: 'Aviso Legal',
    lastUpdated: '02 de junio de 2026',
    sections: [
      {
        heading: '1. Datos Identificativos',
        content: [
          'En cumplimiento con el deber de información general, se hace constar que el titular de este sitio web (luisdavidmag.com) es Luis David Mag, profesional independiente con domicilio en México. Para cualquier consulta o comunicación, puedes contactar a través del correo electrónico: yosoy@luisdavidmag.com.',
        ],
      },
      {
        heading: '2. Objeto del Sitio',
        content: [
          'Este sitio web tiene un carácter profesional y formativo. Su finalidad es presentar el portafolio de proyectos, la experiencia en Ingeniería de Datos e Inteligencia Artificial de Luis David Mag, compartir recursos educativos útiles y ofrecer herramientas web interactivas (Mini Apps) de forma demostrativa.',
        ],
      },
      {
        heading: '3. Condiciones de Uso de las Mini Apps de IA',
        content: [
          'El acceso y uso de las Mini Apps de IA integradas en el sitio web (como el Auditor SEO Express y el creador de Miniaturas) están sujetos a las siguientes condiciones:',
          '• Responsabilidad sobre Claves de API: Estas herramientas requieren que el usuario ingrese sus propias credenciales (claves de API) provistas por OpenAI o Google. El usuario es el único responsable de la custodia, facturación y límites de consumo asociados a sus respectivas claves de API. Luis David Mag no asume ninguna responsabilidad por cargos económicos o bloqueos de cuenta que se deriven del uso de estas APIs en el sitio.',
          '• Carácter Orientativo y de Demostración: Los reportes de auditoría, textos generados, imágenes creadas y cualquier otro resultado devuelto por las Mini Apps son generados de manera automatizada mediante modelos de lenguaje e IA. Tienen un propósito educativo, orientativo y de prototipado rápido. No constituyen, bajo ningún concepto, una auditoría formal, asesoría jurídica, consejo de negocios ni un diagnóstico técnico vinculante. El usuario debe evaluar los resultados bajo su propio criterio profesional.',
          '• Dependencia de Proveedores de Terceros: El funcionamiento de las Mini Apps depende de la disponibilidad y correcto funcionamiento de los servicios externos de OpenAI y Google. Luis David Mag no se responsabiliza de interrupciones del servicio, cambios en sus políticas, deprecación de modelos o fallas técnicas en sus plataformas de API.',
          '• Uso de Proxies de Terceros: La funcionalidad de análisis por URL utiliza un CORS proxy público (api.allorigins.win) para recuperar el contenido HTML público de los sitios indicados. Queda estrictamente prohibido utilizar esta funcionalidad para intentar extraer o analizar contenido confidencial, privado o protegido por derechos de propiedad de terceros sin la debida autorización de los mismos.',
        ],
      },
      {
        heading: '4. Propiedad Intelectual e Industrial',
        content: [
          'Todos los textos, diseños de interfaz, logotipos, código de programación de las páginas, estructura de navegación y contenidos publicados en este sitio (salvo las aportaciones de recursos de terceros debidamente citados o el contenido HTML público de terceros analizado) son propiedad intelectual de Luis David Mag o cuentan con los derechos de uso correspondientes.',
          'Queda prohibida la reproducción, distribución, comunicación pública o transformación de cualquiera de los elementos de este sitio con fines comerciales sin el consentimiento expreso y por escrito de su titular.',
        ],
      },
      {
        heading: '5. Exclusión de Responsabilidad',
        content: [
          'El titular realiza los mayores esfuerzos para mantener la información del sitio web veraz, actualizada y libre de virus o elementos dañinos. Sin embargo, el contenido de este sitio se ofrece "tal cual".',
          'El titular no se hace responsable de daños o perjuicios directos o indirectos que puedan derivarse de interrupciones en el servicio, caídas de servidores, fallas en la red de telecomunicaciones, ataques informáticos o del uso e interpretación que los usuarios hagan de la información y herramientas aquí dispuestas.',
        ],
      },
      {
        heading: '6. Enlaces Externos (Links)',
        content: [
          'Este sitio contiene enlaces que dirigen a plataformas externas (como Skool, LinkedIn, GitHub, etc.). El titular no ejerce control alguno sobre dichos sitios web ni asume responsabilidad por sus políticas de privacidad, contenidos, veracidad de sus propuestas o el uso que el usuario haga de ellos.',
        ],
      },
      {
        heading: '7. Legislación y Jurisdicción Aplicable',
        content: [
          'Para la resolución de todas las controversias o cuestiones relacionadas con este sitio web o de las actividades en él desarrolladas, será de aplicación la legislación vigente en los Estados Unidos Mexicanos, sometiéndose las partes expresamente a la jurisdicción de los juzgados y tribunales competentes de México, renunciando a cualquier otro fuero que pudiera corresponderles.',
        ],
      },
    ],
  },
};
