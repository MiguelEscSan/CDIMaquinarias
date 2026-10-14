// Spanish (default locale): the reference shape every other locale must match.

import { CONSENT_COOKIE } from "../data/cookieConsent";
import { address, contactInfo, googlePolicyUrl, legalInfo, primaryPhone, siteHost, siteMeta, stillBrand } from "../data/siteInfo";
import { cookies as cookieCopy } from "./consent/es";
import { routes } from "./routes";
import type { RentingSlug } from "../data/renting";
import type {
  AboutContent,
  LegalPageId,
  LegalSection,
  PageCopy,
  PageId,
  ProductsContent,
  ServiceCopy,
  ServiceDetailId,
  ServiceId,
  ServicePageCopy,
} from "@shared/types";

const common = {
  skipToContent: "Saltar al contenido",
  business: {
    positioning: `Distribuidores de ${stillBrand.name} en Las Palmas de Gran Canaria.`,
    valueProposition:
      "Soluciones integrales para empresas que incluyen venta, alquiler y reparación de carretillas elevadoras, retráctiles, apiladores, transpaletas y maquinaria pesada. Además, especialistas en instalación y mantenimiento de sistemas de aire acondicionado y climatización industrial/comercial.",
    areaServed: "Gran Canaria, Islas Canarias",
    /** Name of the service catalogue in the LocalBusiness JSON-LD. */
    catalogName: "Servicios",
  },
  /** Machine categories covered by the STILL range. */
  stillCategories: [
    "Carretillas elevadoras",
    "Retráctiles",
    "Apiladores",
    "Transpaletas",
    "Maquinaria pesada",
  ],
  countryName: address.country,
  phoneLabels: { landline: "Teléfono fijo", mobile: "Teléfono móvil" },
  hours: { weekdays: "Lunes a Viernes", weekend: "Sábado y Domingo", closed: "Cerrado" },
  nav: {
    main: "Principal",
    mobile: "Menú móvil",
    toggle: "Abrir o cerrar menú",
    legal: "Legal",
    breadcrumb: "Breadcrumb",
    quickContact: "Contacto rápido",
  },
  language: {
    switcherLabel: "Cambiar idioma",
    current: "Idioma actual",
  },
  cta: {
    call: { label: "Llamar ahora", ariaLabel: `Llamar ahora al ${primaryPhone.display}` },
    quote: {
      label: "Solicitar presupuesto",
      ariaLabel: "Solicitar presupuesto mediante el formulario de contacto",
    },
  },
  floatingContact: {
    phoneLabel: `Llamar al ${primaryPhone.display}`,
    emailLabel: `Enviar un correo a ${contactInfo.email}`,
  },
  footer: {
    contactHeading: "Contacto",
    hoursHeading: "Horario",
    copyright: (year: number, legalName: string) =>
      `© ${year} ${legalName}. Todos los derechos reservados.`,
  },
};

const home = {
  hero: {
    tagline: "Profesionales en el sector",
    trustChips: [`Distribuidor oficial ${stillBrand.name}`, "Servicio multimarca", "Gran Canaria"],
    keyPointsLabel: "Puntos clave",
  },
  services: {
    eyebrow: "Nuestros servicios",
    title: "La excelencia en servicios de maquinaria",
    subtitle:
      "Nuestro compromiso es brindarle productos de calidad, atención personalizada y un excelente servicio de postventa.",
    moreLabel: "Saber más",
    allServicesLabel: "Ver todos los servicios",
  },
  brand: {
    eyebrow: `Distribuidor oficial ${stillBrand.name}`,
    title: `Distribuidores de ${stillBrand.name} en Las Palmas de Gran Canaria`,
    subtitle: "Asesoramiento comercial y servicio técnico para la gama STILL y maquinaria industrial.",
    body: "Como distribuidores de STILL en Las Palmas de Gran Canaria, le ayudamos a elegir la maquinaria adecuada a las necesidades de su negocio y le acompañamos con venta, alquiler, reparación y mantenimiento.",
    categoriesTitle: "Maquinaria con la que trabajamos",
    productsCtaLabel: "Ver productos STILL",
    logoAlt: "Logotipo de STILL, marca de la que somos distribuidores oficiales",
  },
};

const about: AboutContent = {
  imageAlt: "Exposición de CDI Maquinarias con transpaletas y carretillas eléctricas STILL",
  sections: [
    {
      title: "Más de una década de experiencia",
      paragraphs: [
        "Somos CDI Maquinarias y nos enorgullece ofrecer una amplia gama de servicios especializados para satisfacer todas sus necesidades relacionadas con maquinaria industrial. Con más de una década de experiencia en el mercado, hemos consolidado nuestra posición como líderes en la reparación, alquiler y venta de máquinas, brindando soluciones confiables y eficientes a nuestros clientes.",
        "Nuestro equipo de expertos está altamente capacitado en la reparación de una amplia variedad de máquinas, incluidos equipos de marcas reconocidas como STILL. Si necesita una reparación rápida y precisa o busca alquilar o adquirir una nueva máquina, estamos aquí para ayudarle.",
      ],
    },
    {
      title: "Expertos en aire acondicionado",
      paragraphs: [
        "Además de nuestra sólida experiencia en reparaciones de maquinaria industrial, en CDI Maquinarias nos destacamos por ser expertos en el mantenimiento, reparación y venta de sistemas de aire acondicionado. Sabemos lo importante que es un entorno de trabajo cómodo para maximizar la productividad, por lo que nos aseguramos de que sus sistemas de climatización funcionen de manera óptima en todo momento.",
        "Confíe en CDI Maquinarias para todas sus necesidades de maquinaria industrial. Nuestro equipo de profesionales está aquí para servirle con dedicación, profesionalidad y excelencia en cada paso del proceso. ¡Estamos listos para ser su aliado de confianza en el mantenimiento de su maquinaria y sistemas de aire acondicionado!",
      ],
    },
  ],
  highlight:
    "En CDI Maquinarias entendemos la importancia de ofrecer un servicio integral a nuestros clientes. Por eso también proporcionamos presupuestos detallados y transparentes, para que pueda tomar decisiones informadas y planificar su proyecto con confianza.",
};

const services: { items: Record<ServiceId, ServiceCopy> } = {
  items: {
    "reparacion-mantenimiento": {
      title: "Reparación y mantenimiento",
      description:
        "Equipo técnico altamente especializado en resolución de averías multimarca, mantenimiento preventivo y correctivo en taller o in situ.",
      detail:
        "Nuestro servicio de reparación y mantenimiento de máquinas es fundamental para garantizar la durabilidad y el rendimiento de los equipos. Con técnicos altamente capacitados y utilizando las últimas tecnologías, nos comprometemos a mantener la maquinaria de nuestros clientes en condiciones óptimas de funcionamiento, desde inspecciones preventivas hasta reparaciones especializadas. Nuestro equipo está dedicado a mantener la productividad y la seguridad en cada operación.",
      features: [
        "Resolución de averías multimarca",
        "Mantenimiento preventivo y correctivo",
        "Servicio en taller o in situ",
      ],
    },
    "venta-maquinaria": {
      title: "Ventas",
      description:
        "Especialistas en asesoramiento comercial para suministrar la maquinaria adecuada a las necesidades del cliente (gama STILL y maquinaria industrial).",
      detail:
        "La división de ventas de nuestra empresa se especializa en ofrecer una amplia gama de máquinas de alta calidad de marcas reconocidas como STILL. Nuestro compromiso radica en proporcionar soluciones eficientes y personalizadas para las necesidades de nuestros clientes. Desde equipos de manipulación de materiales hasta maquinaria de construcción, trabajamos para garantizar la satisfacción y el éxito de quienes confían en nosotros para sus proyectos y operaciones.",
      features: [
        "Asesoramiento comercial especializado",
        "Gama STILL y maquinaria industrial",
        "Maquinaria adecuada a cada necesidad",
      ],
    },
    "alquiler-flota": {
      title: "Alquiler",
      description:
        "Flota versátil y flexible para proyectos a corto, medio o largo plazo y puntas de trabajo.",
      detail:
        "Nuestra opción de alquiler y renting ofrece una solución flexible y rentable para quienes buscan acceso a equipos de primera clase sin comprometerse con una compra a largo plazo. Con una variedad de modelos de STILL disponibles, adaptamos nuestros planes a las necesidades específicas de cada cliente. Ya sea a corto o largo plazo, nuestro servicio de alquiler garantiza una operación sin complicaciones.",
      features: [
        "Proyectos a corto, medio o largo plazo",
        "Cobertura de puntas de trabajo",
        "Flota versátil y flexible",
      ],
    },
    "asesoramiento-especializado": {
      title: "Asesoramiento",
      description:
        "Consultoría técnica continua para dimensionar almacenes y optimizar la intralogística.",
      detail:
        "Nuestro servicio de asesoramiento está diseñado para brindar orientación experta a nuestros clientes en la selección, adquisición y optimización de sus equipos. Nuestros asesores, altamente capacitados, trabajan estrechamente con cada cliente para comprender sus necesidades específicas y ofrecer soluciones personalizadas que impulsen la eficiencia y la rentabilidad. Desde la evaluación inicial hasta la implementación, nos comprometemos a orientar y aconsejar a nuestros clientes para que logren el éxito en sus proyectos y operaciones.",
      features: [
        "Consultoría técnica continua",
        "Dimensionamiento de almacenes",
        "Optimización de la intralogística",
      ],
    },
    climatizacion: {
      title: "Climatización y aire acondicionado",
      description:
        "Montaje, reparación y mantenimiento de equipos de climatización para oficinas, naves y locales comerciales.",
      detail:
        "Montaje, reparación y mantenimiento de equipos de climatización para oficinas, naves y locales comerciales. Sabemos lo importante que es un entorno de trabajo cómodo para maximizar la productividad, por lo que nos aseguramos de que sus sistemas de climatización funcionen de manera óptima en todo momento.",
      features: ["Montaje, reparación y mantenimiento", "Oficinas, naves y locales comerciales"],
    },
  },
};

const products: ProductsContent = {
  logoAlt: "Logotipo de STILL",
  company: {
    title: "Gran empresa en maquinaria",
    paragraphs: [
      "STILL es una empresa alemana reconocida a nivel mundial, especializada en la fabricación y comercialización de equipos de manejo de materiales, como carretillas elevadoras, transpaletas, apiladores y otros equipos de almacenamiento y logística. STILL ofrece soluciones innovadoras para el manejo eficiente de mercancías en almacenes y centros de distribución, con un enfoque en la sostenibilidad, la tecnología avanzada y la eficiencia energética.",
    ],
  },
  distributor: {
    title: "Catálogos de maquinaria STILL",
    paragraphs: [
      "En STILL podrá encontrar una gran variedad de carretillas, transpaletas, trenes de remolque, apiladores, recogepedidos e incluso tractores. Entre en el catálogo y descubra lo mejor en maquinaria.",
    ],
  },
  catalog: {
    label: "Ver catálogo STILL",
    ariaLabel: "Ver el catálogo de maquinaria STILL (se abre en una pestaña nueva)",
  },
  catalogNote: "El catálogo se abre en la web oficial de STILL.",
};

const rental: {
  intro: { title: string; paragraphs: string[] };
  categories: Record<RentingSlug, string>;
  moreInfoLabel: string;
  moreInfoAriaLabel: (name: string) => string;
  faqTitle: string;
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  ctaLabel: string;
} = {
  intro: {
    title: "Alquile la maquinaria que necesita",
    paragraphs: [
      "En CDI Maquinarias disponemos de una flota de carretillas y maquinaria industrial para alquiler a corto, medio y largo plazo. Trabajamos principalmente con equipos STILL, adaptados a cada tipo de almacén y de carga.",
      "Elija el tipo de equipo que necesita en el listado y le informaremos de disponibilidad, tarifas y condiciones.",
    ],
  },
  categories: {
    "carretillas-retractiles": "Carretillas retráctiles",
    "carretillas-contrapesadas-electricas": "Carretillas contrapesadas eléctricas",
    "carretillas-contrapesadas-diesel-gas": "Carretillas contrapesadas diésel y de gas",
    recogepedidos: "Recogepedidos",
    "tractores-con-plataforma": "Tractores con plataforma",
    "apiladoras-electricas": "Apiladoras eléctricas",
    "transpaleta-electrica": "Transpaleta eléctrica",
  },
  moreInfoLabel: "Más información",
  moreInfoAriaLabel: (name) => `Solicitar más información sobre ${name}`,
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      question: "¿Qué plazos de alquiler ofrecen?",
      answer: "Alquilamos a corto, medio y largo plazo, según las necesidades de su proyecto.",
    },
    {
      question: "¿Qué necesito para alquilar un equipo?",
      answer: "Nos indica el tipo de equipo y el plazo, y le confirmamos disponibilidad y condiciones.",
    },
    {
      question: "¿Puedo alquilar sin comprometerme a comprar?",
      answer: "Sí, el alquiler es independiente de la compra. Consúltenos las condiciones.",
    },
  ],
  ctaTitle: "¿Necesita alquilar un equipo?",
  ctaLabel: "Contactar para alquilar",
};

const contact = {
  location: {
    eyebrow: "Ubicación",
    title: "Dónde encontrarnos",
    subtitle: `Atendemos a empresas de ${common.business.areaServed}.`,
    directionsLabel: "Abrir en Google Maps",
    directionsAriaLabel: "Abrir la ubicación en Google Maps (se abre en una pestaña nueva)",
    mapTitle: `Mapa de la ubicación de ${siteMeta.name}`,
    consent: {
      title: "Mapa de Google",
      body: "El mapa se carga desde Google Maps, un servicio de terceros que puede instalar cookies y recopilar datos sobre su actividad. Al pulsar «Cargar mapa» acepta este servicio; puede cambiar su elección en cualquier momento con «Configurar cookies», en el pie de página.",
      loadLabel: "Cargar mapa",
      cookiesLinkLabel: "Más información en la política de cookies",
    },
  },
  form: {
    title: "Envíenos un mensaje",
    intro: "Le responderemos lo antes posible.",
    requiredNote: "Los campos marcados con * son obligatorios.",
    fields: {
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
    },
    privacy: {
      before: "He leído y acepto la",
      linkLabel: "política de privacidad",
    },
    honeypotLabel: "Deje este campo vacío",
    submitLabel: "Enviar",
    success: "¡Gracias! Nos pondremos en contacto con usted lo antes posible.",
    failure: "Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo o llámenos.",
    deliveryUnconfirmed: `No hemos podido confirmar el envío. Es posible que su mensaje haya llegado; si no recibe respuesta en 24 horas, llámenos al ${primaryPhone.display}.`,
    rateLimited: `Ha enviado varios mensajes en poco tiempo. Inténtelo de nuevo en unos minutos o llámenos al ${primaryPhone.display}.`,
    equipmentPrefill: (name: string) => `Me interesa recibir más información sobre: ${name}.`,
    /** Field validation messages, keyed by the codes the action schema emits. */
    errors: {
      nameRequired: "Indique su nombre.",
      nameLength: "El nombre debe tener entre 2 y 100 caracteres.",
      emailInvalid: "La dirección de correo electrónico no es válida.",
      messageRequired: "Escriba su mensaje.",
      messageLength: "El mensaje debe tener entre 10 y 5000 caracteres.",
      privacyRequired: "Debe aceptar la política de privacidad.",
    },
  },
};

// Ported from the original site's legal pages. Inline links use "[label](href)".
// Adaptations to the new site are listed in odd/tasks/cdi-website-rebuild.md (T9).

const L = legalInfo.legalName;
const privacyLink = `[política de privacidad](${routes.privacy.es})`;
const cookiesLink = `[política de cookies](${routes.cookies.es})`;
const privacyMail = `[${legalInfo.privacyEmail}](mailto:${legalInfo.privacyEmail})`;
const cookieLabels = cookieCopy.labels;

const legalNotice: LegalSection[] = [
  {
    heading: "1. Objeto y aceptación",
    blocks: [
      {
        type: "p",
        text: `El presente aviso legal regula el uso de nuestro sitio web, del que es titular ${L} La navegación por el sitio web de ${L} atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso legal, que pueden sufrir modificaciones. Usted se obliga a hacer un uso correcto del sitio web de conformidad con las leyes, la buena fe, el orden público, los usos del tráfico y el presente aviso legal. Usted responderá frente a ${L} o frente a terceros de cualesquiera daños y perjuicios que pudieran causarse como consecuencia del incumplimiento de dicha obligación.`,
      },
    ],
  },
  {
    heading: "2. Identificación y comunicaciones",
    blocks: [
      {
        type: "p",
        text: `${L}, en cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, le informa de que:`,
      },
      {
        type: "ul",
        items: [
          `Su denominación social es: ${L}`,
          `Su CIF es: ${legalInfo.taxId}`,
          `Su domicilio social está en: ${legalInfo.registeredAddress}`,
        ],
      },
      {
        type: "p",
        text: `Para comunicarse con nosotros, ponemos a su disposición diferentes medios de contacto especificados en la ${privacyLink}.`,
      },
      {
        type: "p",
        text: `Todas las notificaciones y comunicaciones que realice con ${L} se considerarán eficaces, a todos los efectos, siempre y cuando se realicen por los medios especificados anteriormente.`,
      },
    ],
  },
  {
    heading: "3. Condiciones de acceso y utilización",
    blocks: [
      {
        type: "p",
        text: `El sitio web y sus servicios son de acceso libre; no obstante, ${L} condiciona la utilización de algunos de los servicios ofrecidos en su web a la previa cumplimentación del correspondiente formulario.`,
      },
      {
        type: "p",
        text: `Usted garantiza la autenticidad y actualidad de todos aquellos datos que comunique a ${L} y será el único responsable de las manifestaciones falsas o inexactas que realice.`,
      },
      {
        type: "p",
        text: `Usted se compromete expresamente a hacer un uso adecuado de los contenidos y servicios de ${L} y a no emplearlos para, entre otros:`,
      },
      {
        type: "ul",
        items: [
          "Difundir contenidos delictivos, violentos, pornográficos, racistas, xenófobos, ofensivos, de apología del terrorismo o, en general, contrarios a la ley o al orden público.",
          `Introducir en la red virus informáticos o realizar actuaciones susceptibles de alterar, estropear, interrumpir o generar errores o daños en los documentos electrónicos, datos o sistemas físicos y lógicos de ${L} o de terceras personas; así como obstaculizar el acceso de otros usuarios al sitio web y a sus servicios mediante el consumo masivo de los recursos informáticos a través de los cuales ${L} presta sus servicios.`,
          `Intentar acceder a datos de otras personas o a áreas restringidas de los sistemas informáticos de ${L} o de terceros y, en su caso, extraer información.`,
          `Vulnerar los derechos de propiedad intelectual o industrial, así como violar la confidencialidad de la información de ${L} o de terceros.`,
          "Suplantar la identidad de otro usuario, de las administraciones públicas o de un tercero.",
          "Reproducir, copiar, distribuir, poner a disposición o de cualquier otra forma comunicar públicamente, transformar o modificar los contenidos, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido.",
          "Recabar datos con finalidad publicitaria y remitir publicidad de cualquier clase y comunicaciones con fines de venta u otras de naturaleza comercial sin que medie su previa solicitud o consentimiento.",
        ],
      },
      {
        type: "p",
        text: `Todos los contenidos del sitio web, como textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a ${L}, sin que puedan entenderse como cedidos ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso de la web.`,
      },
      {
        type: "p",
        text: "En definitiva, usted, que accede a este sitio web, puede visualizar los contenidos y efectuar, en su caso, copias privadas autorizadas siempre que los elementos reproducidos no sean cedidos posteriormente a terceros, ni se instalen en servidores conectados a redes, ni sean objeto de ningún tipo de explotación.",
      },
      {
        type: "p",
        text: `Asimismo, todas las marcas, nombres comerciales o signos distintivos de cualquier clase que aparecen en el sitio web son propiedad de ${L}, sin que pueda entenderse que el uso o acceso al mismo le atribuya derecho alguno sobre los mismos.`,
      },
      {
        type: "p",
        text: "La distribución, modificación, cesión o comunicación pública de los contenidos y cualquier otro acto que no haya sido expresamente autorizado por el titular de los derechos de explotación quedan prohibidos.",
      },
      {
        type: "p",
        text: `El establecimiento de un hiperenlace no implica en ningún caso la existencia de relaciones entre ${L} y el propietario del sitio web en el que se establezca, ni la aceptación y aprobación por parte de ${L} de sus contenidos o servicios. Aquellas personas que se propongan establecer un hiperenlace deberán solicitar previamente autorización por escrito a ${L} En todo caso, el hiperenlace únicamente permitirá el acceso a la página de inicio de nuestro sitio web; asimismo, deberá abstenerse de realizar manifestaciones o indicaciones falsas, inexactas o incorrectas sobre ${L}, o incluir contenidos ilícitos, contrarios a las buenas costumbres y al orden público.`,
      },
      {
        type: "p",
        text: `${L} no se responsabiliza del uso que cada usuario le dé a los materiales puestos a disposición en este sitio web ni de las actuaciones que realice en base a los mismos.`,
      },
    ],
  },
  {
    heading: "4. Exclusión de garantías y de responsabilidad",
    blocks: [
      {
        type: "p",
        text: `${L} excluye, hasta donde permite el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios de toda naturaleza derivados de:`,
      },
      {
        type: "ul",
        items: [
          "La imposibilidad de acceso al sitio web o la falta de veracidad, exactitud, exhaustividad y/o actualidad de los contenidos, así como la existencia de vicios y defectos de toda clase de los contenidos transmitidos, difundidos, almacenados o puestos a disposición a los que se haya accedido a través del sitio web o de los servicios que se ofrecen.",
          "La presencia de virus o de otros elementos en los contenidos que puedan producir alteraciones en los sistemas informáticos, documentos electrónicos o datos de los usuarios.",
          `El incumplimiento de las leyes, la buena fe, el orden público, los usos del tráfico y el presente aviso legal como consecuencia del uso incorrecto del sitio web. En particular, y a modo ejemplificativo, ${L} no se hace responsable de las actuaciones de terceros que vulneren derechos de propiedad intelectual e industrial, secretos empresariales, derechos al honor, a la intimidad personal y familiar y a la propia imagen, así como la normativa en materia de competencia desleal y publicidad ilícita.`,
        ],
      },
      {
        type: "p",
        text: `Asimismo, ${L} declina cualquier responsabilidad respecto a la información que se halle fuera de esta web y no sea gestionada directamente por nuestro webmaster. La función de los enlaces que aparecen en esta web es exclusivamente la de informar al usuario sobre la existencia de otras fuentes susceptibles de ampliar los contenidos que ofrece este sitio web. ${L} no garantiza ni se responsabiliza del funcionamiento o accesibilidad de los sitios enlazados, ni sugiere, invita o recomienda la visita a los mismos, por lo que tampoco será responsable del resultado obtenido. ${L} no se responsabiliza del establecimiento de hipervínculos por parte de terceros.`,
      },
    ],
  },
  {
    heading: "5. Procedimiento en caso de realización de actividades de carácter ilícito",
    blocks: [
      {
        type: "p",
        text: `En el caso de que usted o un tercero considere que existen hechos o circunstancias que revelen el carácter ilícito de la utilización de cualquier contenido y/o de la realización de cualquier actividad en las páginas web incluidas o accesibles a través del sitio web, deberá ponerse en contacto con ${L} identificándose debidamente, especificando las supuestas infracciones y declarando expresamente y bajo su responsabilidad que la información proporcionada en la notificación es exacta.`,
      },
      {
        type: "p",
        text: `Para toda cuestión litigiosa que incumba al sitio web de ${L} será de aplicación la legislación española, siendo competentes los Juzgados y Tribunales más cercanos a su sede (España).`,
      },
    ],
  },
  {
    heading: "6. Publicaciones",
    blocks: [
      {
        type: "p",
        text: "La información administrativa facilitada a través del sitio web no sustituye la publicidad legal de las leyes, normativas, planes, disposiciones generales y actos que tengan que ser publicados formalmente en los diarios oficiales de las administraciones públicas, que constituyen el único instrumento que da fe de su autenticidad y contenido. La información disponible en este sitio web debe entenderse como una guía sin propósito de validez legal.",
      },
    ],
  },
];

const privacy: LegalSection[] = [
  {
    heading: "1. Datos relativos al responsable",
    blocks: [
      {
        type: "ul",
        items: [
          `Entidad: ${L}`,
          `CIF de la entidad: ${legalInfo.taxId}`,
          `Dirección de la entidad: ${legalInfo.registeredAddress}`,
          `Email de la entidad: ${privacyMail}`,
          `Responsable del tratamiento: ${legalInfo.controllerName}`,
          `Teléfono del responsable del tratamiento: ${legalInfo.controllerPhone}`,
          `Dirección de email del responsable del tratamiento: ${privacyMail}`,
        ],
      },
    ],
  },
  {
    heading: "2. Finalidades",
    blocks: [
      {
        type: "p",
        text: `En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679, General de Protección de Datos, y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales, le informamos de que, dependiendo de la relación que tenga con nosotros, en ${L} tratamos los datos que nos facilita para alguna, o todas, las siguientes finalidades:`,
      },
      {
        type: "ul",
        items: [
          "Atender las consultas y solicitudes de presupuesto que nos envíe a través del formulario de contacto.",
          "Envío de información comercial de la entidad mediante correo postal, correo electrónico u otros medios.",
        ],
      },
    ],
  },
  {
    heading: "3. Plazo de conservación de los datos",
    blocks: [
      {
        type: "p",
        text: "Sus datos serán conservados por un plazo de 1 año. En el caso de que requiera su eliminación de forma anticipada, solicítelo mediante el ejercicio del derecho de supresión. Asimismo, los datos que por motivos legales deban ser almacenados durante un tiempo necesario para cumplir normas específicas serán bloqueados y únicamente estarán a disposición de la autoridad pública correspondiente.",
      },
    ],
  },
  {
    heading: "4. Legitimación",
    blocks: [
      { type: "p", text: "La base legal para el tratamiento de sus datos es:" },
      { type: "ul", items: ["Consentimiento inequívoco."] },
      {
        type: "p",
        text: "Además, sobre la base de nuestro interés legítimo en evitar el uso abusivo del formulario de contacto, tratamos de forma temporal un identificador de conexión anonimizado, obtenido a partir de su dirección IP, que se elimina automáticamente en un plazo máximo de 1 hora.",
      },
    ],
  },
  {
    heading: "5. Destinatarios",
    blocks: [
      {
        type: "p",
        text: "No cedemos sus datos a terceros, salvo obligación legal. Para prestar el servicio intervienen, como encargados del tratamiento, los siguientes proveedores:",
      },
      {
        type: "ul",
        items: [
          "El proveedor de alojamiento e infraestructura del sitio web (Cloudflare, Inc.), que procesa técnicamente las solicitudes que realiza al visitar la web y al enviar el formulario. Este proveedor puede tratar datos fuera del Espacio Económico Europeo; en ese caso, la transferencia se ampara en las garantías previstas en el RGPD, como las cláusulas contractuales tipo aprobadas por la Comisión Europea.",
          "El proveedor de correo electrónico de la empresa, a través de cuyo servidor SMTP se nos remiten por correo electrónico los datos que introduce en el formulario de contacto.",
        ],
      },
    ],
  },
  {
    heading: "6. Derechos",
    blocks: [
      {
        type: "p",
        text: `Tiene derecho a obtener confirmación sobre si en ${L} estamos tratando datos personales que le conciernan, o no.`,
      },
      {
        type: "p",
        text: "Asimismo, tiene derecho de acceso a sus datos personales, así como a solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando, entre otros motivos, los datos ya no sean necesarios para los fines para los que fueron recogidos.",
      },
      {
        type: "p",
        text: "En determinadas circunstancias, podrá solicitar la limitación del tratamiento de sus datos, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.",
      },
      {
        type: "p",
        text: `Adicionalmente, en determinadas circunstancias y por motivos relacionados con su situación particular, podrá ejercer el derecho de oposición al tratamiento de sus datos. ${L} dejará de tratar los datos, salvo por motivos legítimos imperiosos o el ejercicio o la defensa de posibles reclamaciones.`,
      },
      {
        type: "p",
        text: "Asimismo, puede ejercer el derecho a la portabilidad de los datos, así como retirar los consentimientos facilitados en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.",
      },
      {
        type: "p",
        text: `Si desea ejercer cualquiera de sus derechos (acceso, rectificación, supresión u olvido, limitación del tratamiento, oposición o portabilidad), escríbanos a ${privacyMail} indicando el derecho que desea ejercer.`,
      },
      {
        type: "p",
        text: `Alternativamente, también puede dirigirse a nosotros mediante correo postal a la siguiente dirección: ${legalInfo.registeredAddress}, adjuntando una fotocopia del DNI para acreditar su identidad. Recuerde facilitar la mayor información posible sobre su solicitud: nombre y apellidos y dirección de correo electrónico relacionada con su solicitud.`,
      },
      {
        type: "p",
        text: "Por último, le informamos de que puede dirigirse a la Agencia Española de Protección de Datos y demás organismos públicos competentes para cualquier reclamación derivada del tratamiento de sus datos personales.",
      },
    ],
  },
  {
    heading: "7. Política de cookies",
    blocks: [
      {
        type: "p",
        text: `Para conocer el uso de cookies en nuestra página, puede acceder a nuestra ${cookiesLink}.`,
      },
    ],
  },
];

const browserGuides: { browser: string; remove: string[]; block: string[] }[] = [
  {
    browser: "Google Chrome",
    remove: [
      "Vaya a Configuración en el menú de su navegador.",
      "Haga clic en Mostrar configuración avanzada.",
      "Haga clic en Eliminar datos de navegación.",
      "Seleccione el período de tiempo para el que desea eliminar la información en el menú de la parte superior. Si desea eliminar todas las cookies del navegador, haga clic en Desde el origen de los tiempos.",
      "Marque Cookies y otros datos de sitios y complementos.",
      "Haga clic en Borrar datos de navegación.",
      "Cierre la ventana.",
    ],
    block: [
      "Vaya a Configuración en el menú de su navegador.",
      "Haga clic en Mostrar configuración avanzada y después en Configuración de contenido.",
      "En Cookies, seleccione su opción preferida. Si desea evitar que se almacenen todas las cookies, haga clic en No permitir que se guarden datos de los sitios.",
      "Haga clic en Hecho.",
      "Cierre la ventana.",
    ],
  },
  {
    browser: "Safari",
    remove: [
      "Vaya a Preferencias en el menú de su navegador.",
      "Haga clic en la pestaña Privacidad.",
      "Haga clic en Eliminar todos los datos de los sitios web y después en Eliminar para eliminar todas las cookies.",
      "Cierre la ventana.",
    ],
    block: [
      "Vaya a Preferencias en el menú de su navegador.",
      "Haga clic en la pestaña Privacidad.",
      "En Cookies y datos de sitios web, seleccione su opción preferida. Si desea evitar que se almacenen todas las cookies, haga clic en Bloquear siempre.",
      "Cierre la ventana.",
    ],
  },
  {
    browser: "Mozilla Firefox",
    remove: [
      "Vaya a Opciones en el menú de su navegador.",
      "Haga clic en la pestaña Privacidad.",
      "Haga clic en Mostrar cookies.",
      "Seleccione las cookies que desea eliminar y haga clic en Eliminar seleccionadas. Haga clic en Eliminar todas si desea eliminar todas las cookies de su navegador.",
      "Cierre la ventana. Los cambios que haya hecho se guardarán automáticamente.",
    ],
    block: [
      "Vaya a Configuración en el menú de su navegador.",
      "Seleccione la pestaña Privacidad.",
      "En Historial, haga clic en Usar una configuración personalizada para el historial.",
      "Seleccione sus opciones preferidas en Permitir cookies de sitios web. Si desea evitar que se almacenen todas las cookies, desactive la casilla Aceptar cookies de sitios web.",
      "Cierre la ventana. Los cambios que haya hecho se guardarán automáticamente.",
    ],
  },
  {
    browser: "Internet Explorer",
    remove: [
      "Vaya a Herramientas (icono de rueda dentada) en el menú de su navegador.",
      "Haga clic en Propiedades de Internet.",
      "En la pestaña General, dentro de Historial de navegación, haga clic en Eliminar.",
      "Asegúrese de marcar la opción Cookies y datos de sitios web.",
      "Haga clic en Eliminar.",
      "Haga clic en Aceptar.",
    ],
    block: [
      "Vaya a Herramientas (icono de rueda dentada) en el menú de su navegador.",
      "Haga clic en Opciones de Internet y después en la pestaña Privacidad.",
      "Mueva la barra deslizante al nivel deseado. Si desea evitar que se almacenen todas las cookies, seleccione el nivel Bloquear todas las cookies.",
      "Haga clic en Aceptar.",
    ],
  },
  {
    browser: "Opera",
    remove: [
      "Vaya a Configuración en el menú de su navegador.",
      "Seleccione la pestaña Privacidad y seguridad.",
      "Haga clic en Cookies y después en Todas las cookies y datos de sitios web.",
      "Seleccione las cookies que desea eliminar y haga clic en Eliminar. Haga clic en Eliminar todas si desea eliminar todas las cookies de su navegador.",
      "Haga clic en Hecho.",
      "Cierre la ventana.",
    ],
    block: [
      "Vaya a Configuración en el menú de su navegador.",
      "Seleccione la pestaña Privacidad y seguridad.",
      "En Cookies, seleccione su opción preferida. Si desea evitar que se almacenen todas las cookies, haga clic en No permitir que se guarden datos de los sitios.",
      "Cierre la ventana.",
    ],
  },
];

const cookies: LegalSection[] = [
  {
    heading: "Información general sobre las cookies",
    blocks: [
      {
        type: "p",
        text: `La confianza del usuario es importante para nosotros y, por consiguiente, en ${L} nos preocupa proteger su privacidad. Un aspecto importante de ello es proporcionarle toda la información posible sobre cómo utilizamos sus datos de carácter personal, incluido el almacenamiento local de datos y tecnologías similares.`,
      },
      {
        type: "p",
        text: "El almacenamiento local de datos implica almacenar diferentes tipos de datos localmente en su dispositivo a través de su navegador web. Los datos almacenados localmente pueden, por ejemplo, contener la configuración del usuario o información sobre cómo navega por un sitio web y qué navegador utiliza.",
      },
      {
        type: "p",
        text: "Un método de almacenamiento local de datos son las cookies. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, teléfono móvil o tableta) y que permiten reconocer su navegador web. Las cookies contienen información principalmente sobre su navegador web y sobre la actividad que se ha producido en él.",
      },
    ],
  },
  {
    heading: "Cookies que utiliza este sitio web",
    blocks: [
      {
        type: "p",
        text: "Este sitio web no instala cookies publicitarias ni de análisis y no utiliza herramientas de medición de visitas. Las cookies que pueden instalarse en su dispositivo son las siguientes:",
      },
      {
        type: "table",
        caption: "Cookies de este sitio web",
        headers: ["Cookie", "Titular", "Tipo y finalidad", "Duración"],
        rows: [
          [
            CONSENT_COOKIE.name,
            `Propia (${siteHost})`,
            "Técnica, necesaria. Guarda su elección sobre las cookies (servicios de terceros aceptados o rechazados).",
            `${CONSENT_COOKIE.expiresAfterDays} días`,
          ],
          [
            "__cf_bm",
            "Cloudflare, Inc. (proveedor de alojamiento)",
            "Técnica de seguridad. Solo se instala si la protección contra bots de Cloudflare está activa; sirve para distinguir a las personas de los programas automatizados.",
            "30 minutos de inactividad",
          ],
          [
            "NID y otras similares",
            "Google (en sus propios dominios)",
            "De terceros. Solo si usted acepta los servicios de terceros y se carga el mapa de Google Maps en la página de contacto.",
            `Según la [política de cookies de Google](${googlePolicyUrl("cookies", "es")})`,
          ],
        ],
      },
      {
        type: "p",
        text: `Cookies técnicas: la cookie ${CONSENT_COOKIE.name} es estrictamente necesaria para recordar su elección y no requiere consentimiento. Además, si nuestro proveedor de alojamiento, Cloudflare, tiene activa su protección contra bots, puede instalar la cookie técnica __cf_bm, necesaria para la seguridad del sitio web, que tampoco requiere consentimiento.`,
      },
      {
        type: "p",
        text: `Mapa de Google: en la página de contacto, el mapa de Google Maps no se carga hasta que usted acepta los servicios de terceros, ya sea en el aviso de cookies o pulsando el botón «Cargar mapa». A partir de ese momento, Google puede instalar cookies en su propio dominio y tratar datos sobre su actividad conforme a su [política de cookies](${googlePolicyUrl("cookies", "es")}) y su [política de privacidad](${googlePolicyUrl("privacy", "es")}). El enlace «Abrir en Google Maps» le lleva al sitio web de Google.`,
      },
      {
        type: "p",
        text: `El formulario de contacto no utiliza cookies. Los datos que introduce en él se tratan conforme a nuestra ${privacyLink}.`,
      },
      {
        type: "p",
        text: `Si ${L} cambia el uso de las cookies en este sitio web, actualizará esta política y, cuando sea necesario, se lo notificará con un mensaje.`,
      },
    ],
  },
  {
    heading: "Cómo aceptar, rechazar o retirar su consentimiento",
    blocks: [
      {
        type: "p",
        text: `La primera vez que visita el sitio web se le muestra un aviso en el que puede pulsar «${cookieLabels.acceptAll}» o «${cookieLabels.rejectAll}», o bien «${cookieLabels.configure}» para elegir qué servicios de terceros permite. Rechazar es tan sencillo como aceptar, y seguir navegando o desplazarse por la página no se considera aceptación.`,
      },
      {
        type: "p",
        text: `Puede cambiar o retirar su consentimiento en cualquier momento con el botón «${cookieLabels.settings}» del pie de página. Si lo retira, el mapa de Google deja de mostrarse. Las cookies que Google ya haya instalado en su propio dominio no pueden eliminarse desde este sitio web; puede borrarlas desde la configuración de su navegador, como se explica más abajo.`,
      },
      {
        type: "p",
        text: `Su elección se conserva durante ${CONSENT_COOKIE.expiresAfterDays} días. Pasado ese plazo, o si modificamos esta política, se le volverá a preguntar.`,
      },
    ],
  },
  {
    heading: "Gestión de las cookies",
    blocks: [
      {
        type: "p",
        text: "Puede desactivar las cookies o configurar su navegador para que le avise cuando se le envíe una cookie.",
      },
      {
        type: "p",
        text: "La configuración de su navegador web normalmente muestra una lista de todas las cookies almacenadas para proporcionarle una visión general y, si lo desea, eliminar las cookies no deseadas. Normalmente, puede indicar si acepta el almacenamiento de cookies de los sitios web que visita o de terceros afiliados a dichos sitios. También puede elegir ser notificado cada vez que se almacena una nueva cookie. Su navegador web almacena normalmente las cookies en una carpeta específica de su disco duro, de forma que también puede examinar su contenido con más detalle.",
      },
      {
        type: "p",
        text: "Asimismo, hay disponibles servicios desarrollados especialmente para proporcionar a los usuarios una lista actualizada de cookies y otros mecanismos de seguimiento.",
      },
      {
        type: "p",
        text: "Tenga en cuenta que, si desactiva las cookies, es posible que no pueda disfrutar de todas las funcionalidades de algunos sitios web.",
      },
      {
        type: "p",
        text: "A continuación se presenta un resumen de cómo gestionar los datos almacenados localmente en diferentes navegadores web. Tenga en cuenta que este proceso puede cambiar y que las descripciones pueden no estar actualizadas.",
      },
    ],
  },
  ...browserGuides.map((guide) => ({
    heading: `Gestión de cookies en ${guide.browser}`,
    level: 3 as const,
    blocks: [
      { type: "p" as const, text: "Cómo eliminar cookies:" },
      { type: "ol" as const, items: guide.remove },
      { type: "p" as const, text: "Cómo evitar que las cookies se almacenen en el navegador web:" },
      { type: "ol" as const, items: guide.block },
    ],
  })),
  {
    heading: "Información de contacto",
    blocks: [
      {
        type: "p",
        text: `Si tiene alguna pregunta relativa al uso del almacenamiento local en nuestro sitio web, póngase en contacto con nosotros en ${privacyMail}, indicando en el asunto «Política de cookies».`,
      },
    ],
  },
];

const legal: {
  updatedLabel: string;
  /** Shown above translated legal texts; null for the authoritative (Spanish) version. */
  courtesyNotice: string | null;
  documents: Record<LegalPageId, LegalSection[]>;
} = {
  updatedLabel: "Última actualización",
  courtesyNotice: null,
  documents: { legalNotice, privacy, cookies },
};

const seo: { pages: Record<PageId, PageCopy> } = {
  pages: {
    home: {
      title: "CDI Maquinarias | Carretillas STILL en Las Palmas",
      description:
        "Venta, alquiler y reparación de carretillas STILL y maquinaria industrial en Las Palmas de Gran Canaria. Solicite su presupuesto.",
      label: "Inicio",
      heading: "Venta, Alquiler y Reparación de Maquinaria Industrial en Las Palmas",
    },
    about: {
      title: "Quiénes somos | CDI Maquinarias en Gran Canaria",
      description:
        "Más de una década de experiencia en reparación, alquiler y venta de maquinaria industrial y aire acondicionado en Las Palmas de Gran Canaria.",
      label: "Quiénes somos",
      heading: "Quiénes somos",
    },
    services: {
      title: "Servicios de maquinaria industrial en Las Palmas | CDI",
      description:
        "Reparación y mantenimiento, venta, alquiler, renting y asesoramiento en carretillas y maquinaria industrial, y climatización en Gran Canaria.",
      label: "Servicios",
      heading: "Servicios",
    },
    products: {
      title: "Productos STILL | Distribuidor oficial en Las Palmas",
      description:
        "Distribuidores oficiales de STILL en Las Palmas: carretillas, transpaletas, apiladores, recogepedidos y tractores. Consulte el catálogo.",
      label: "Productos",
      heading: "Distribuidores oficiales de STILL",
    },
    renting: {
      title: "Renting de carretillas en Gran Canaria | CDI Maquinarias",
      description:
        "Renting y alquiler de carretillas retráctiles, contrapesadas, recogepedidos, apiladoras y transpaletas eléctricas en Gran Canaria.",
      label: "Renting",
      heading: "Renting",
      intro: "Elija el tipo de equipo que necesita y le informaremos sobre disponibilidad y condiciones.",
    },
    contact: {
      title: "Contacto | CDI Maquinarias en Las Palmas de Gran Canaria",
      description:
        "Contacte con CDI Maquinarias en Playa del Hombre, Las Palmas: teléfono, correo, horario, ubicación y formulario para solicitar presupuesto.",
      label: "Contacto",
      heading: "Contacto",
    },
    legalNotice: {
      title: "Aviso legal | CDI Maquinarias",
      description:
        "Aviso legal del sitio web de CDI Maquinarias S.L.: titularidad, condiciones de acceso y uso, propiedad intelectual y responsabilidad.",
      label: "Aviso legal",
      heading: "Aviso legal",
    },
    privacy: {
      title: "Política de privacidad | CDI Maquinarias",
      description:
        "Información sobre protección de datos de CDI Maquinarias S.L.: responsable, finalidades, conservación, legitimación, destinatarios y derechos.",
      label: "Política de privacidad",
      heading: "Política de privacidad",
      intro: "Información sobre protección de datos.",
    },
    cookies: {
      title: "Política de cookies | CDI Maquinarias",
      description:
        "Política de cookies del sitio web de CDI Maquinarias: qué almacenamiento local se utiliza, el mapa de Google y cómo gestionar las cookies.",
      label: "Política de cookies",
      heading: "Política de cookies",
    },
    "reparacion-mantenimiento": {
      title: "Reparación de carretillas en Las Palmas | CDI",
      description:
        "Reparación y mantenimiento de carretillas y maquinaria industrial en Gran Canaria, en taller o in situ, con técnicos especializados.",
      label: "Reparación y mantenimiento",
      heading: "Reparación y mantenimiento",
      intro: "Mantenga su maquinaria operativa y segura con un servicio técnico cercano.",
    },
    "asesoramiento-especializado": {
      title: "Asesoramiento en maquinaria industrial | CDI",
      description:
        "Asesoramiento especializado para elegir, gestionar y mantener maquinaria industrial en Gran Canaria, con criterio técnico.",
      label: "Asesoramiento",
      heading: "Asesoramiento especializado",
      intro: "Criterio técnico para decidir sobre su maquinaria con información clara.",
    },
    climatizacion: {
      title: "Aire acondicionado y climatización | CDI",
      description:
        "Mantenimiento, reparación y venta de sistemas de aire acondicionado y climatización en Las Palmas de Gran Canaria.",
      label: "Climatización",
      heading: "Climatización y aire acondicionado",
      intro: "Entornos de trabajo cómodos para que su equipo rinda al máximo.",
    },
  },
};

const servicePages: Record<ServiceDetailId, ServicePageCopy> = {
  "reparacion-mantenimiento": {
    processTitle: "Cómo trabajamos",
    process: [
      { title: "Diagnóstico", text: "Revisamos la avería o el estado del equipo, en taller o en sus instalaciones." },
      { title: "Presupuesto", text: "Le indicamos qué hace falta reparar y cuánto costará, antes de empezar." },
      { title: "Reparación", text: "Ejecutamos el trabajo y le devolvemos el equipo en condiciones óptimas." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { question: "¿Reparan maquinaria de otras marcas?", answer: "Sí. Trabajamos con equipos multimarca, además de la gama STILL." },
      { question: "¿Pueden acudir a mis instalaciones?", answer: "Sí, ofrecemos servicio in situ además del trabajo en taller." },
    ],
    ctaLabel: "Solicitar revisión",
  },
  "asesoramiento-especializado": {
    processTitle: "Cómo trabajamos",
    process: [
      { title: "Consulta inicial", text: "Entendemos su situación, su flota actual y sus objetivos." },
      { title: "Análisis", text: "Revisamos las opciones técnicas y económicas con datos concretos." },
      { title: "Recomendación", text: "Le entregamos una propuesta clara y le acompañamos en la puesta en marcha." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { question: "¿Es un servicio de pago?", answer: "Le informamos de las condiciones en la primera consulta." },
      { question: "¿Solo asesoran sobre equipos STILL?", answer: "Asesoramos sobre la maquinaria que mejor se adapte a su necesidad." },
    ],
    ctaLabel: "Concertar una consulta",
  },
  climatizacion: {
    processTitle: "Cómo trabajamos",
    process: [
      { title: "Revisión", text: "Comprobamos el estado del sistema y localizamos el problema." },
      { title: "Presupuesto", text: "Le detallamos la reparación o el mantenimiento necesario antes de actuar." },
      { title: "Puesta a punto", text: "Dejamos el sistema funcionando y le indicamos el mantenimiento recomendado." },
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      { question: "¿Hacen mantenimiento preventivo?", answer: "Sí, planificamos revisiones periódicas para evitar averías." },
      { question: "¿Venden equipos nuevos?", answer: "Sí, le asesoramos en la elección del equipo según el espacio disponible." },
    ],
    ctaLabel: "Solicitar revisión",
  },
};

export const es = {
  common, home, about, services, servicePages, products, rental, contact, legal, cookies: cookieCopy, seo,
};

export type Dictionary = typeof es;
