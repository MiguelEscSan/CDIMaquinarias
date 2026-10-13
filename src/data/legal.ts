import type { LegalDocument, PageId } from "../types";
import { pages } from "./pages";
import { legalInfo } from "./siteInfo";

// Ported from the original site's legal pages. Inline links use "[label](href)".
// Adaptations to the new site are listed in odd/tasks/cdi-website-rebuild.md (T9).

const L = legalInfo.legalName;
const privacyLink = `[política de privacidad](${pages.privacy.path})`;
const cookiesLink = `[política de cookies](${pages.cookies.path})`;
const privacyMail = `[${legalInfo.privacyEmail}](mailto:${legalInfo.privacyEmail})`;

export const LEGAL_UPDATED = "2026-10-13";

const legalNotice: LegalDocument = {
  pageId: "legalNotice",
  updated: LEGAL_UPDATED,
  sections: [
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
  ],
};

const privacy: LegalDocument = {
  pageId: "privacy",
  updated: LEGAL_UPDATED,
  sections: [
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
            "El proveedor de alojamiento del sitio web (Vercel Inc.), que procesa técnicamente las solicitudes que realiza al visitar la web y al enviar el formulario.",
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
  ],
};

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

const cookies: LegalDocument = {
  pageId: "cookies",
  updated: LEGAL_UPDATED,
  sections: [
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
          text: "Este sitio web no instala cookies propias, publicitarias ni de análisis al navegar por él, y no utiliza herramientas de medición de visitas.",
        },
        {
          type: "p",
          text: "Mapa de Google: en la página de contacto, el mapa de Google Maps no se carga automáticamente. Solo se carga si usted pulsa el botón «Cargar mapa». A partir de ese momento, Google puede instalar cookies en su dispositivo y tratar datos sobre su actividad conforme a su propia [política de privacidad](https://policies.google.com/privacy). El enlace «Abrir en Google Maps» le lleva al sitio web de Google.",
        },
        {
          type: "p",
          text: `Si ${L} cambia el uso de las cookies en este sitio web, actualizará esta política y, cuando sea necesario, se lo notificará con un mensaje.`,
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
  ],
};

export const legalDocuments: Record<LegalDocument["pageId"], LegalDocument> = {
  legalNotice,
  privacy,
  cookies,
};

export function getLegalDocument(id: Extract<PageId, LegalDocument["pageId"]>): LegalDocument {
  return legalDocuments[id];
}

export const legalCopy = {
  updatedLabel: "Última actualización",
};
