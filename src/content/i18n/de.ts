// German (de-DE). Typed against the Spanish dictionary so missing or extra keys fail `astro check`.

import { CONSENT_COOKIE } from "../data/cookieConsent";
import { contactInfo, googlePolicyUrl, legalInfo, primaryPhone, siteHost, siteMeta, stillBrand } from "../data/siteInfo";
import { cookies as cookieCopy } from "./consent/de";
import { routes } from "./routes";
import type { LegalSection } from "@shared/types";
import type { Dictionary } from "./es";

const common: Dictionary["common"] = {
  skipToContent: "Zum Inhalt springen",
  business: {
    positioning: `${stillBrand.name}-Händler in Las Palmas de Gran Canaria.`,
    valueProposition:
      "Komplettlösungen für Unternehmen: Verkauf, Vermietung und Reparatur von Gabelstaplern, Schubmaststaplern, Staplern, Hubwagen und Schwerlastmaschinen. Außerdem sind wir Spezialisten für Installation und Wartung von industriellen und gewerblichen Klimaanlagen und Klimatisierungssystemen.",
    areaServed: "Gran Canaria, Kanarische Inseln",
    catalogName: "Dienstleistungen",
  },
  stillCategories: ["Gabelstapler", "Schubmaststapler", "Stapler", "Hubwagen", "Schwerlastmaschinen"],
  countryName: "Spanien",
  phoneLabels: { landline: "Festnetz", mobile: "Mobil" },
  hours: { weekdays: "Montag bis Freitag", weekend: "Samstag und Sonntag", closed: "Geschlossen" },
  nav: {
    main: "Hauptnavigation",
    mobile: "Mobiles Menü",
    toggle: "Menü öffnen oder schließen",
    legal: "Rechtliches",
    breadcrumb: "Navigationspfad",
    quickContact: "Schnellkontakt",
  },
  language: {
    switcherLabel: "Sprache ändern",
    current: "Aktuelle Sprache",
  },
  cta: {
    call: { label: "Jetzt anrufen", ariaLabel: `Jetzt anrufen: ${primaryPhone.display}` },
    quote: {
      label: "Angebot anfordern",
      ariaLabel: "Angebot über das Kontaktformular anfordern",
    },
  },
  floatingContact: {
    phoneLabel: `Anrufen: ${primaryPhone.display}`,
    emailLabel: `E-Mail senden an ${contactInfo.email}`,
  },
  footer: {
    contactHeading: "Kontakt",
    hoursHeading: "Öffnungszeiten",
    copyright: (year: number, legalName: string) => `© ${year} ${legalName}. Alle Rechte vorbehalten.`,
  },
};

const home: Dictionary["home"] = {
  hero: {
    tagline: "Fachleute der Branche",
    trustChips: [`Offizieller ${stillBrand.name}-Händler`, "Markenübergreifender Service", "Gran Canaria"],
    keyPointsLabel: "Wichtigste Punkte",
  },
  services: {
    eyebrow: "Unsere Dienstleistungen",
    title: "Exzellenz im Maschinenservice",
    subtitle:
      "Wir verpflichten uns zu hochwertigen Produkten, persönlicher Betreuung und exzellentem Kundendienst.",
    moreLabel: "Mehr erfahren",
    allServicesLabel: "Alle Dienstleistungen ansehen",
  },
  brand: {
    eyebrow: `Offizieller ${stillBrand.name}-Händler`,
    title: `${stillBrand.name}-Händler in Las Palmas de Gran Canaria`,
    subtitle: "Verkaufsberatung und technischer Service für das STILL-Sortiment und Industriemaschinen.",
    body: "Als STILL-Händler in Las Palmas de Gran Canaria helfen wir Ihnen, die richtige Maschine für die Anforderungen Ihres Unternehmens zu finden, und unterstützen Sie bei Verkauf, Vermietung, Reparatur und Wartung.",
    categoriesTitle: "Maschinen, mit denen wir arbeiten",
    productsCtaLabel: "STILL-Produkte ansehen",
  },
  contactBand: {
    eyebrow: "Kontakt",
    title: "Sprechen Sie mit unserem Team",
    subtitle: "Rufen Sie uns an oder schreiben Sie uns, und wir helfen Ihnen bei Ihrem Angebot.",
  },
};

const about: Dictionary["about"] = {
  sections: [
    {
      title: "Mehr als zehn Jahre Erfahrung",
      paragraphs: [
        "Wir sind CDI Maquinarias und bieten mit Stolz ein breites Spektrum an Spezialdienstleistungen für all Ihre Anforderungen an Industriemaschinen. Mit mehr als zehn Jahren Erfahrung am Markt haben wir uns als führend in Reparatur, Vermietung und Verkauf von Maschinen etabliert und bieten unseren Kunden zuverlässige und effiziente Lösungen.",
        "Unser Expertenteam ist bestens geschult in der Reparatur einer großen Vielfalt von Maschinen, auch von Geräten bekannter Marken wie STILL. Ob Sie eine schnelle, präzise Reparatur benötigen oder eine neue Maschine mieten oder kaufen möchten: Wir helfen Ihnen gern.",
      ],
    },
    {
      title: "Experten für Klimaanlagen",
      paragraphs: [
        "Neben unserer soliden Erfahrung in der Reparatur von Industriemaschinen zeichnet sich CDI Maquinarias durch Fachwissen in Wartung, Reparatur und Verkauf von Klimaanlagen aus. Wir wissen, wie wichtig ein angenehmes Arbeitsumfeld für die Produktivität ist, und sorgen dafür, dass Ihre Klimasysteme jederzeit optimal arbeiten.",
        "Vertrauen Sie CDI Maquinarias bei all Ihren Anforderungen an Industriemaschinen. Unser Team aus Fachleuten steht Ihnen mit Engagement, Professionalität und Exzellenz in jedem Schritt des Prozesses zur Seite. Wir sind bereit, Ihr verlässlicher Partner bei der Wartung Ihrer Maschinen und Klimaanlagen zu sein!",
      ],
    },
  ],
  highlight:
    "Bei CDI Maquinarias wissen wir, wie wichtig es ist, unseren Kunden einen vollständigen Service zu bieten. Deshalb erstellen wir auch detaillierte, transparente Angebote, damit Sie fundierte Entscheidungen treffen und Ihr Projekt mit Vertrauen planen können.",
};

const services: Dictionary["services"] = {
  items: {
    "reparacion-mantenimiento": {
      title: "Reparatur und Wartung",
      description:
        "Ein hochspezialisiertes Technikerteam für markenübergreifende Störungsreparaturen sowie präventive und korrektive Wartung in unserer Werkstatt oder vor Ort.",
      detail:
        "Unser Service für Reparatur und Wartung von Maschinen ist entscheidend für Langlebigkeit und Leistung Ihrer Geräte. Mit hochqualifizierten Technikern und modernster Technologie sorgen wir dafür, dass die Maschinen unserer Kunden in optimalem Zustand bleiben, von präventiven Inspektionen bis zu Spezialreparaturen. Unser Team sorgt in jedem Arbeitsschritt für Produktivität und Sicherheit.",
      features: [
        "Markenübergreifende Störungsreparaturen",
        "Präventive und korrektive Wartung",
        "Service in der Werkstatt oder vor Ort",
      ],
    },
    "venta-maquinaria": {
      title: "Verkauf",
      description:
        "Spezialisten für Verkaufsberatung, die für jeden Kundenbedarf die passende Maschine bereitstellen (STILL-Sortiment und Industriemaschinen).",
      detail:
        "Unsere Verkaufsabteilung bietet eine breite Auswahl hochwertiger Maschinen bekannter Marken wie STILL. Unser Anspruch ist es, effiziente, maßgeschneiderte Lösungen für die Bedürfnisse unserer Kunden zu liefern. Von Flurfördertechnik bis zu Baumaschinen arbeiten wir daran, dass alle, die uns ihre Projekte und Abläufe anvertrauen, zufrieden sind und Erfolg haben.",
      features: [
        "Fachkundige Verkaufsberatung",
        "STILL-Sortiment und Industriemaschinen",
        "Die richtige Maschine für jeden Bedarf",
      ],
      link: { label: "Mehr erfahren", ariaLabel: "Mehr über STILL-Produkte erfahren" },
    },
    "alquiler-flota": {
      title: "Vermietung",
      description:
        "Eine vielseitige, flexible Flotte für kurz-, mittel- oder langfristige Projekte und Auftragsspitzen.",
      detail:
        "Unsere Miet- und Leasingoption bietet eine flexible, wirtschaftliche Lösung für alle, die erstklassige Geräte benötigen, ohne sich langfristig zu einem Kauf zu verpflichten. Mit einer Vielzahl verfügbarer STILL-Modelle passen wir unsere Angebote an die spezifischen Bedürfnisse jedes Kunden an. Ob kurz- oder langfristig: Unser Mietservice garantiert einen unkomplizierten Betrieb.",
      features: [
        "Kurz-, mittel- oder langfristige Projekte",
        "Abdeckung von Auftragsspitzen",
        "Eine vielseitige, flexible Flotte",
      ],
      link: { label: "Mehr erfahren", ariaLabel: "Mehr über Gerätevermietung und Leasing erfahren" },
    },
    "asesoramiento-especializado": {
      title: "Beratung",
      description:
        "Laufende technische Beratung zur Dimensionierung von Lagern und zur Optimierung der Intralogistik.",
      detail:
        "Unser Beratungsservice bietet unseren Kunden fachkundige Unterstützung bei Auswahl, Anschaffung und Optimierung ihrer Geräte. Unsere hochqualifizierten Berater arbeiten eng mit jedem Kunden zusammen, um dessen spezifische Bedürfnisse zu verstehen und maßgeschneiderte Lösungen anzubieten, die Effizienz und Rentabilität steigern. Von der ersten Analyse bis zur Umsetzung begleiten wir unsere Kunden, damit ihre Projekte und Abläufe erfolgreich sind.",
      features: ["Laufende technische Beratung", "Dimensionierung von Lagern", "Optimierung der Intralogistik"],
    },
    climatizacion: {
      title: "Klimatisierung und Klimaanlagen",
      description:
        "Installation, Reparatur und Wartung von Klimatisierungsanlagen für Büros, Industriegebäude und Gewerbeflächen.",
      detail:
        "Installation, Reparatur und Wartung von Klimatisierungsanlagen für Büros, Industriegebäude und Gewerbeflächen. Wir wissen, wie wichtig ein angenehmes Arbeitsumfeld für die Produktivität ist, und sorgen dafür, dass Ihre Klimasysteme jederzeit optimal arbeiten.",
      features: [
        "Installation, Reparatur und Wartung",
        "Büros, Industriegebäude und Gewerbeflächen",
      ],
    },
  },
};

const products: Dictionary["products"] = {
  company: {
    title: "Ein führender Maschinenhersteller",
    paragraphs: [
      "STILL ist ein weltweit bekanntes deutsches Unternehmen, das auf Herstellung und Verkauf von Flurförderzeugen spezialisiert ist, darunter Gabelstapler, Hubwagen, Stapler und weitere Lager- und Logistiktechnik. STILL bietet innovative Lösungen für den effizienten Warenumschlag in Lagern und Distributionszentren, mit Schwerpunkt auf Nachhaltigkeit, moderner Technik und Energieeffizienz.",
    ],
  },
  distributor: {
    title: "STILL-Maschinenkataloge",
    paragraphs: [
      "STILL bietet eine breite Auswahl an Gabelstaplern, Hubwagen, Schleppzügen, Staplern, Kommissioniergeräten und sogar Schleppern. Stöbern Sie im Katalog und entdecken Sie die besten Maschinen.",
    ],
  },
  catalog: {
    label: "Zum STILL-Katalog",
    ariaLabel: "Zum STILL-Maschinenkatalog (öffnet in einem neuen Tab, auf Spanisch)",
  },
  catalogNote: "Der Katalog öffnet sich auf der offiziellen spanischsprachigen Website von STILL.",
};

const rental: Dictionary["rental"] = {
  categories: {
    "carretillas-retractiles": "Schubmaststapler",
    "carretillas-contrapesadas-electricas": "Elektrische Gegengewichtsstapler",
    "carretillas-contrapesadas-diesel-gas": "Diesel- und Gas-Gegengewichtsstapler",
    recogepedidos: "Kommissionierer",
    "tractores-con-plataforma": "Schlepper mit Plattform",
    "apiladoras-electricas": "Elektrische Stapler",
    "transpaleta-electrica": "Elektrische Transpaletten",
  },
  moreInfoLabel: "Weitere Informationen",
  moreInfoAriaLabel: (name) => `Weitere Informationen zu ${name} anfordern`,
};

const contact: Dictionary["contact"] = {
  location: {
    eyebrow: "Standort",
    title: "So finden Sie uns",
    subtitle: `Wir betreuen Unternehmen in ${common.business.areaServed}.`,
    directionsLabel: "In Google Maps öffnen",
    directionsAriaLabel: "Standort in Google Maps öffnen (öffnet in einem neuen Tab)",
    mapTitle: `Karte mit dem Standort von ${siteMeta.name}`,
    consent: {
      title: "Google-Karte",
      body: "Die Karte wird von Google Maps geladen, einem Drittanbieterdienst, der Cookies setzen und Daten über Ihre Aktivität erheben kann. Wenn Sie auf „Karte laden“ drücken, stimmen Sie diesem Dienst zu. Sie können Ihre Wahl jederzeit über „Cookie-Einstellungen“ in der Fußzeile ändern.",
      loadLabel: "Karte laden",
      cookiesLinkLabel: "Weitere Informationen in der Cookie-Richtlinie",
    },
  },
  form: {
    title: "Schreiben Sie uns",
    intro: "Wir antworten so schnell wie möglich.",
    requiredNote: "Mit * markierte Felder sind Pflichtfelder.",
    fields: {
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
    },
    privacy: {
      before: "Ich habe die",
      linkLabel: "Datenschutzerklärung gelesen und akzeptiere sie.",
    },
    honeypotLabel: "Dieses Feld leer lassen",
    submitLabel: "Senden",
    success: "Vielen Dank! Wir melden uns so schnell wie möglich bei Ihnen.",
    failure:
      "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
    deliveryUnconfirmed: `Wir konnten den Versand nicht bestätigen. Ihre Nachricht ist möglicherweise angekommen. Falls Sie innerhalb von 24 Stunden keine Antwort erhalten, rufen Sie uns bitte unter ${primaryPhone.display} an.`,
    rateLimited: `Sie haben in kurzer Zeit mehrere Nachrichten gesendet. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns unter ${primaryPhone.display} an.`,
    equipmentPrefill: (name: string) => `Ich möchte mehr Informationen zu: ${name}.`,
    errors: {
      nameRequired: "Bitte geben Sie Ihren Namen ein.",
      nameLength: "Ihr Name muss zwischen 2 und 100 Zeichen lang sein.",
      emailInvalid: "Die E-Mail-Adresse ist ungültig.",
      messageRequired: "Bitte schreiben Sie Ihre Nachricht.",
      messageLength: "Ihre Nachricht muss zwischen 10 und 5000 Zeichen lang sein.",
      privacyRequired: "Sie müssen die Datenschutzerklärung akzeptieren.",
    },
  },
};

// Courtesy translation of src/content/i18n/es.ts (the Spanish text prevails).
// Pending review by the legal advisor; keep the structure aligned with the Spanish file.

const L = legalInfo.legalName;
const privacyLink = `[Datenschutzerklärung](${routes.privacy.de})`;
const cookiesLink = `[Cookie-Richtlinie](${routes.cookies.de})`;
const privacyMail = `[${legalInfo.privacyEmail}](mailto:${legalInfo.privacyEmail})`;
const cookieLabels = cookieCopy.labels;

const legalNotice: LegalSection[] = [
  {
    heading: "1. Zweck und Zustimmung",
    blocks: [
      {
        type: "p",
        text: `Dieses Impressum regelt die Nutzung unserer Website, die im Eigentum von ${L} steht. Wer die Website von ${L} besucht, wird zum Nutzer und akzeptiert vollständig und ohne Vorbehalt alle Bestimmungen dieses Impressums, die geändert werden können. Sie verpflichten sich, die Website gemäß dem Gesetz, nach Treu und Glauben, der öffentlichen Ordnung, den Gepflogenheiten des Verkehrs und diesem Impressum ordnungsgemäß zu nutzen. Sie haften gegenüber ${L} oder Dritten für alle Schäden, die infolge einer Verletzung dieser Pflicht entstehen.`,
      },
    ],
  },
  {
    heading: "2. Identifizierung und Kommunikation",
    blocks: [
      {
        type: "p",
        text: `Gemäß dem spanischen Gesetz 34/2002 vom 11. Juli über Dienste der Informationsgesellschaft und den elektronischen Geschäftsverkehr informiert ${L} Sie darüber, dass:`,
      },
      {
        type: "ul",
        items: [
          `Die Firmenbezeichnung lautet: ${L}`,
          `Die Steueridentifikationsnummer (CIF) lautet: ${legalInfo.taxId}`,
          `Der Geschäftssitz befindet sich in: ${legalInfo.registeredAddress}`,
        ],
      },
      {
        type: "p",
        text: `Um mit uns Kontakt aufzunehmen, stehen Ihnen die verschiedenen Kontaktmöglichkeiten zur Verfügung, die in der ${privacyLink} aufgeführt sind.`,
      },
      {
        type: "p",
        text: `Alle Mitteilungen und Kommunikationen, die Sie an ${L} richten, gelten für alle Zwecke als wirksam, sofern sie über die oben genannten Wege erfolgen.`,
      },
    ],
  },
  {
    heading: "3. Zugang und Nutzungsbedingungen",
    blocks: [
      {
        type: "p",
        text: `Die Website und ihre Dienste sind frei zugänglich. ${L} macht die Nutzung einiger auf der Website angebotener Dienste jedoch davon abhängig, dass zuvor das entsprechende Formular ausgefüllt wird.`,
      },
      {
        type: "p",
        text: `Sie garantieren, dass alle Daten, die Sie ${L} übermitteln, authentisch und aktuell sind, und Sie sind allein für falsche oder unrichtige Angaben verantwortlich.`,
      },
      {
        type: "p",
        text: `Sie verpflichten sich ausdrücklich, die Inhalte und Dienste von ${L} ordnungsgemäß zu nutzen und sie nicht dazu zu verwenden, unter anderem:`,
      },
      {
        type: "ul",
        items: [
          "Inhalte zu verbreiten, die strafbar, gewalttätig, pornografisch, rassistisch, fremdenfeindlich, beleidigend sind, Terrorismus verherrlichen oder allgemein gegen das Gesetz oder die öffentliche Ordnung verstoßen.",
          `Computerviren in das Netz einzuschleusen oder Handlungen vorzunehmen, die geeignet sind, die elektronischen Dokumente, Daten oder physischen und logischen Systeme von ${L} oder Dritten zu verändern, zu beschädigen, zu unterbrechen oder Fehler zu verursachen, oder den Zugang anderer Nutzer zur Website und ihren Diensten durch übermäßigen Verbrauch der IT-Ressourcen zu behindern, über die ${L} seine Dienste erbringt.`,
          `Auf Daten anderer Personen oder auf gesicherte Bereiche der Computersysteme von ${L} oder Dritter zuzugreifen und gegebenenfalls Informationen zu extrahieren.`,
          `Rechte am geistigen oder gewerblichen Eigentum zu verletzen oder die Vertraulichkeit der Informationen von ${L} oder Dritten zu brechen.`,
          "Sich als anderer Nutzer, als Behörde oder als Dritter auszugeben.",
          "Die Inhalte zu vervielfältigen, zu kopieren, zu verbreiten, zugänglich zu machen oder anderweitig öffentlich zu kommunizieren, zu bearbeiten oder zu verändern, sofern dies nicht vom Inhaber der entsprechenden Rechte genehmigt oder gesetzlich erlaubt ist.",
          "Daten zu Werbezwecken zu sammeln oder Werbung jeglicher Art bzw. Mitteilungen zu Verkaufs- oder anderen gewerblichen Zwecken ohne vorherige Anfrage oder Einwilligung des Empfängers zu versenden.",
        ],
      },
      {
        type: "p",
        text: `Alle Inhalte der Website, wie Texte, Fotografien, Grafiken, Bilder, Symbole, Technik und Software sowie ihr grafisches Design und ihr Quellcode, sind ein Werk im Eigentum von ${L}. Über das für die korrekte Nutzung der Website unbedingt Notwendige hinaus gelten keine Verwertungsrechte an ihnen als übertragen.`,
      },
      {
        type: "p",
        text: "Kurz gesagt: Als Nutzer, der auf diese Website zugreift, dürfen Sie die Inhalte einsehen und gegebenenfalls zulässige private Kopien anfertigen, sofern die kopierten Elemente nicht anschließend an Dritte weitergegeben, auf mit Netzwerken verbundenen Servern installiert oder einer Verwertung jeglicher Art unterzogen werden.",
      },
      {
        type: "p",
        text: `Ebenso sind alle Marken, Handelsnamen oder Unterscheidungszeichen jeglicher Art, die auf der Website erscheinen, Eigentum von ${L}. Ihre Nutzung oder der Zugriff darauf begründet für Sie keinerlei Recht daran.`,
      },
      {
        type: "p",
        text: "Die Verbreitung, Veränderung, Übertragung oder öffentliche Wiedergabe der Inhalte sowie jede andere Handlung, die nicht ausdrücklich vom Inhaber der Verwertungsrechte genehmigt wurde, ist untersagt.",
      },
      {
        type: "p",
        text: `Die Einrichtung eines Hyperlinks bedeutet in keinem Fall, dass zwischen ${L} und dem Betreiber der Website, auf der er eingerichtet wird, eine Beziehung besteht, noch dass ${L} deren Inhalte oder Dienste akzeptiert oder billigt. Wer einen Hyperlink einrichten möchte, muss zuvor eine schriftliche Genehmigung von ${L} einholen. Der Hyperlink darf in jedem Fall nur den Zugriff auf die Startseite unserer Website ermöglichen; zudem ist zu unterlassen, falsche, unrichtige oder fehlerhafte Aussagen oder Hinweise über ${L} zu machen oder rechtswidrige Inhalte bzw. Inhalte, die den guten Sitten und der öffentlichen Ordnung widersprechen, einzubinden.`,
      },
      {
        type: "p",
        text: `${L} ist nicht verantwortlich für die Verwendung der auf dieser Website bereitgestellten Materialien durch die einzelnen Nutzer oder für die Handlungen, die sie auf Grundlage dieser Materialien vornehmen.`,
      },
    ],
  },
  {
    heading: "4. Haftungsausschluss",
    blocks: [
      {
        type: "p",
        text: `Soweit gesetzlich zulässig, schließt ${L} jede Haftung für Schäden jeglicher Art aus, die entstehen durch:`,
      },
      {
        type: "ul",
        items: [
          "Die Unmöglichkeit, auf die Website zuzugreifen, oder mangelnde Wahrhaftigkeit, Genauigkeit, Vollständigkeit und/oder Aktualität der Inhalte sowie das Vorhandensein von Mängeln jeglicher Art in den übermittelten, verbreiteten, gespeicherten oder zugänglich gemachten Inhalten, auf die über die Website oder die angebotenen Dienste zugegriffen wurde.",
          "Das Vorhandensein von Viren oder anderen Elementen in den Inhalten, die Veränderungen an den Computersystemen, elektronischen Dokumenten oder Daten der Nutzer verursachen können.",
          `Die Nichteinhaltung des Gesetzes, von Treu und Glauben, der öffentlichen Ordnung, der Gepflogenheiten des Verkehrs und dieses Impressums infolge einer unsachgemäßen Nutzung der Website. Insbesondere ist ${L} beispielhaft nicht verantwortlich für Handlungen Dritter, die Rechte am geistigen und gewerblichen Eigentum, Betriebsgeheimnisse, das Recht auf Ehre, auf Privat- und Familienleben sowie am eigenen Bild verletzen oder gegen die Vorschriften des unlauteren Wettbewerbs und der unzulässigen Werbung verstoßen.`,
        ],
      },
      {
        type: "p",
        text: `Ebenso lehnt ${L} jede Haftung für Informationen außerhalb dieser Website ab, die nicht unmittelbar von unserem Webmaster verwaltet werden. Die Links auf dieser Website dienen ausschließlich dazu, die Nutzer über weitere Quellen zu informieren, die die Inhalte dieser Website ergänzen können. ${L} garantiert nicht den Betrieb oder die Erreichbarkeit der verlinkten Websites und ist dafür nicht verantwortlich; ebenso wenig empfiehlt oder befürwortet ${L} deren Besuch, weshalb ${L} auch nicht für das dabei erzielte Ergebnis haftet. ${L} ist nicht verantwortlich für Hyperlinks, die von Dritten eingerichtet werden.`,
      },
    ],
  },
  {
    heading: "5. Verfahren bei rechtswidrigen Aktivitäten",
    blocks: [
      {
        type: "p",
        text: `Wenn Sie oder ein Dritter der Ansicht sind, dass Tatsachen oder Umstände vorliegen, die auf eine rechtswidrige Nutzung von Inhalten oder Aktivitäten auf den Webseiten hinweisen, die in der Website enthalten sind oder über sie zugänglich sind, müssen Sie sich mit ${L} in Verbindung setzen, sich ordnungsgemäß identifizieren, die behaupteten Verstöße angeben und ausdrücklich in eigener Verantwortung erklären, dass die in der Mitteilung enthaltenen Angaben richtig sind.`,
      },
      {
        type: "p",
        text: `Für alle Streitigkeiten im Zusammenhang mit der Website von ${L} gilt spanisches Recht; zuständig sind die Gerichte, die dem Geschäftssitz (Spanien) am nächsten liegen.`,
      },
    ],
  },
  {
    heading: "6. Veröffentlichungen",
    blocks: [
      {
        type: "p",
        text: "Verwaltungsinformationen, die über die Website bereitgestellt werden, ersetzen nicht die amtliche Veröffentlichung von Gesetzen, Verordnungen, Plänen, allgemeinen Bestimmungen und Verwaltungsakten, die in den amtlichen Blättern der öffentlichen Behörden förmlich veröffentlicht werden müssen; nur diese sind maßgeblich für ihre Echtheit und ihren Inhalt. Die auf dieser Website verfügbaren Informationen sind als unverbindlicher Leitfaden zu verstehen.",
      },
    ],
  },
];

const privacy: LegalSection[] = [
  {
    heading: "1. Verantwortlicher",
    blocks: [
      {
        type: "ul",
        items: [
          `Stelle: ${L}`,
          `Steueridentifikationsnummer (CIF): ${legalInfo.taxId}`,
          `Adresse: ${legalInfo.registeredAddress}`,
          `E-Mail: ${privacyMail}`,
          `Verantwortliche Person: ${legalInfo.controllerName}`,
          `Telefonnummer der verantwortlichen Person: ${legalInfo.controllerPhone}`,
          `E-Mail-Adresse der verantwortlichen Person: ${privacyMail}`,
        ],
      },
    ],
  },
  {
    heading: "2. Zwecke",
    blocks: [
      {
        type: "p",
        text: `Gemäß der Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung) und dem spanischen Organgesetz 3/2018 zum Schutz personenbezogener Daten und zur Gewährleistung digitaler Rechte informieren wir Sie darüber, dass ${L} die von Ihnen übermittelten Daten je nach Ihrer Beziehung zu uns für einige oder alle der folgenden Zwecke verarbeitet:`,
      },
      {
        type: "ul",
        items: [
          "Beantwortung der Anfragen und Angebotsanfragen, die Sie uns über das Kontaktformular senden.",
          "Zusendung von Werbeinformationen über das Unternehmen per Post, E-Mail oder auf anderem Wege.",
        ],
      },
    ],
  },
  {
    heading: "3. Speicherdauer",
    blocks: [
      {
        type: "p",
        text: "Ihre Daten werden für einen Zeitraum von einem Jahr aufbewahrt. Wenn Sie eine frühere Löschung wünschen, bitten Sie darum, indem Sie Ihr Recht auf Löschung ausüben. Daten, die aus gesetzlichen Gründen für die Dauer bestimmter Vorschriften aufbewahrt werden müssen, werden gesperrt und nur der jeweils zuständigen öffentlichen Behörde zugänglich gemacht.",
      },
    ],
  },
  {
    heading: "4. Rechtsgrundlage",
    blocks: [
      { type: "p", text: "Die Rechtsgrundlage für die Verarbeitung Ihrer Daten ist:" },
      { type: "ul", items: ["Eindeutige Einwilligung."] },
      {
        type: "p",
        text: "Darüber hinaus verarbeiten wir auf Grundlage unseres berechtigten Interesses, Missbrauch des Kontaktformulars zu verhindern, vorübergehend eine anonymisierte Verbindungskennung, die aus Ihrer IP-Adresse abgeleitet wird; diese wird spätestens nach einer Stunde automatisch gelöscht.",
      },
    ],
  },
  {
    heading: "5. Empfänger",
    blocks: [
      {
        type: "p",
        text: "Wir geben Ihre Daten nur dann an Dritte weiter, wenn dies gesetzlich vorgeschrieben ist. An der Erbringung des Dienstes als Auftragsverarbeiter sind folgende Dienstleister beteiligt:",
      },
      {
        type: "ul",
        items: [
          "Der Hosting- und Infrastrukturanbieter der Website (Cloudflare, Inc.), der die Anfragen verarbeitet, die Sie beim Besuch der Website und beim Absenden des Formulars stellen. Dieser Anbieter kann Daten außerhalb des Europäischen Wirtschaftsraums verarbeiten; in diesem Fall gelten die in der DSGVO vorgesehenen Garantien, etwa die von der Europäischen Kommission genehmigten Standardvertragsklauseln.",
          "Der E-Mail-Anbieter des Unternehmens, dessen SMTP-Server die im Kontaktformular eingegebenen Daten per E-Mail an uns weiterleitet.",
        ],
      },
    ],
  },
  {
    heading: "6. Rechte",
    blocks: [
      {
        type: "p",
        text: `Sie haben das Recht, eine Bestätigung darüber zu erhalten, ob ${L} personenbezogene Daten verarbeitet, die Sie betreffen.`,
      },
      {
        type: "p",
        text: "Sie haben außerdem das Recht auf Auskunft über Ihre personenbezogenen Daten sowie auf Berichtigung unrichtiger Daten oder gegebenenfalls auf Löschung, wenn die Daten unter anderem nicht mehr für die Zwecke notwendig sind, für die sie erhoben wurden.",
      },
      {
        type: "p",
        text: "Unter bestimmten Umständen können Sie die Einschränkung der Verarbeitung Ihrer Daten verlangen; in diesem Fall bewahren wir sie nur noch zur Geltendmachung oder Verteidigung von Ansprüchen auf.",
      },
      {
        type: "p",
        text: `Außerdem können Sie unter bestimmten Umständen und aus Gründen, die sich auf Ihre besondere Situation beziehen, der Verarbeitung Ihrer Daten widersprechen. ${L} stellt die Verarbeitung dann ein, es sei denn, es liegen zwingende schutzwürdige Gründe vor oder die Verarbeitung dient der Geltendmachung oder Verteidigung möglicher Ansprüche.`,
      },
      {
        type: "p",
        text: "Sie können außerdem das Recht auf Datenübertragbarkeit ausüben und erteilte Einwilligungen jederzeit widerrufen, ohne dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird.",
      },
      {
        type: "p",
        text: `Wenn Sie eines Ihrer Rechte ausüben möchten (Auskunft, Berichtigung, Löschung bzw. Recht auf Vergessenwerden, Einschränkung der Verarbeitung, Widerspruch oder Datenübertragbarkeit), schreiben Sie uns an ${privacyMail} und geben Sie an, welches Recht Sie ausüben möchten.`,
      },
      {
        type: "p",
        text: `Alternativ können Sie uns auch postalisch unter folgender Anschrift kontaktieren: ${legalInfo.registeredAddress}. Legen Sie zum Nachweis Ihrer Identität eine Kopie Ihres Personalausweises (DNI) oder eines gleichwertigen Dokuments bei. Bitte geben Sie so viele Informationen wie möglich zu Ihrem Anliegen an: Vorname, Nachname und die E-Mail-Adresse, die mit Ihrem Anliegen zusammenhängt.`,
      },
      {
        type: "p",
        text: "Schließlich informieren wir Sie, dass Sie sich mit Beschwerden im Zusammenhang mit der Verarbeitung Ihrer personenbezogenen Daten an die spanische Datenschutzbehörde (Agencia Española de Protección de Datos) und andere zuständige öffentliche Stellen wenden können.",
      },
    ],
  },
  {
    heading: "7. Cookie-Richtlinie",
    blocks: [
      {
        type: "p",
        text: `Informationen darüber, wie Cookies auf unserer Website verwendet werden, finden Sie in unserer ${cookiesLink}.`,
      },
    ],
  },
];

const browserGuides: { browser: string; remove: string[]; block: string[] }[] = [
  {
    browser: "Google Chrome",
    remove: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Klicken Sie auf Erweiterte Einstellungen anzeigen.",
      "Klicken Sie auf Browserdaten löschen.",
      "Wählen Sie im Menü oben den Zeitraum, für den Sie Informationen löschen möchten. Um alle Cookies aus dem Browser zu löschen, wählen Sie den Zeitraum Gesamter Zeitraum.",
      "Aktivieren Sie Cookies und andere Website- und Plug-in-Daten.",
      "Klicken Sie auf Browserdaten löschen.",
      "Schließen Sie das Fenster.",
    ],
    block: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Klicken Sie auf Erweiterte Einstellungen anzeigen und dann auf Inhaltseinstellungen.",
      "Wählen Sie unter Cookies Ihre bevorzugte Option. Um das Speichern aller Cookies zu verhindern, klicken Sie auf Websites das Speichern von Daten untersagen.",
      "Klicken Sie auf Fertig.",
      "Schließen Sie das Fenster.",
    ],
  },
  {
    browser: "Safari",
    remove: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Klicken Sie auf den Reiter Datenschutz.",
      "Klicken Sie auf Alle Websitedaten entfernen und dann auf Jetzt entfernen, um alle Cookies zu löschen.",
      "Schließen Sie das Fenster.",
    ],
    block: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Klicken Sie auf den Reiter Datenschutz.",
      "Wählen Sie unter Cookies und Websitedaten Ihre bevorzugte Option. Um das Speichern aller Cookies zu verhindern, klicken Sie auf Immer blockieren.",
      "Schließen Sie das Fenster.",
    ],
  },
  {
    browser: "Mozilla Firefox",
    remove: [
      "Öffnen Sie die Optionen im Menü Ihres Browsers.",
      "Klicken Sie auf den Reiter Datenschutz.",
      "Klicken Sie auf Cookies anzeigen.",
      "Wählen Sie die Cookies aus, die Sie löschen möchten, und klicken Sie auf Ausgewählte entfernen. Klicken Sie auf Alle entfernen, um alle Cookies aus Ihrem Browser zu löschen.",
      "Schließen Sie das Fenster. Vorgenommene Änderungen werden automatisch gespeichert.",
    ],
    block: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Wählen Sie den Reiter Datenschutz.",
      "Klicken Sie unter Chronik auf Benutzerdefinierte Einstellungen für Chronik verwenden.",
      "Wählen Sie unter Cookies von Websites akzeptieren Ihre bevorzugten Optionen. Um das Speichern aller Cookies zu verhindern, deaktivieren Sie Cookies von Websites akzeptieren.",
      "Schließen Sie das Fenster. Vorgenommene Änderungen werden automatisch gespeichert.",
    ],
  },
  {
    browser: "Internet Explorer",
    remove: [
      "Öffnen Sie Extras (Zahnradsymbol) im Menü Ihres Browsers.",
      "Klicken Sie auf Internetoptionen.",
      "Klicken Sie auf der Registerkarte Allgemein unter Browserverlauf auf Löschen.",
      "Stellen Sie sicher, dass die Option Cookies und Websitedaten aktiviert ist.",
      "Klicken Sie auf Löschen.",
      "Klicken Sie auf OK.",
    ],
    block: [
      "Öffnen Sie Extras (Zahnradsymbol) im Menü Ihres Browsers.",
      "Klicken Sie auf Internetoptionen und dann auf den Reiter Datenschutz.",
      "Stellen Sie den Schieber auf die gewünschte Stufe. Um das Speichern aller Cookies zu verhindern, wählen Sie Alle Cookies blockieren.",
      "Klicken Sie auf OK.",
    ],
  },
  {
    browser: "Opera",
    remove: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Wählen Sie den Reiter Datenschutz und Sicherheit.",
      "Klicken Sie auf Cookies und dann auf Alle Cookies und Websitedaten.",
      "Wählen Sie die Cookies aus, die Sie löschen möchten, und klicken Sie auf Entfernen. Klicken Sie auf Alle entfernen, um alle Cookies aus Ihrem Browser zu löschen.",
      "Klicken Sie auf Fertig.",
      "Schließen Sie das Fenster.",
    ],
    block: [
      "Öffnen Sie die Einstellungen im Menü Ihres Browsers.",
      "Wählen Sie den Reiter Datenschutz und Sicherheit.",
      "Wählen Sie unter Cookies Ihre bevorzugte Option. Um das Speichern aller Cookies zu verhindern, klicken Sie auf Websites das Speichern von Daten untersagen.",
      "Schließen Sie das Fenster.",
    ],
  },
];

const cookies: LegalSection[] = [
  {
    heading: "Allgemeine Informationen zu Cookies",
    blocks: [
      {
        type: "p",
        text: `Das Vertrauen unserer Nutzer ist uns wichtig, weshalb ${L} großen Wert auf den Schutz Ihrer Privatsphäre legt. Ein wichtiger Teil davon ist, Ihnen so umfassend wie möglich zu erläutern, wie wir Ihre personenbezogenen Daten verwenden, einschließlich lokaler Datenspeicherung und ähnlicher Technologien.`,
      },
      {
        type: "p",
        text: "Lokale Datenspeicherung bedeutet, dass verschiedene Arten von Daten über Ihren Webbrowser lokal auf Ihrem Gerät gespeichert werden. Lokal gespeicherte Daten können beispielsweise Benutzereinstellungen oder Informationen darüber enthalten, wie Sie eine Website nutzen und welchen Browser Sie verwenden.",
      },
      {
        type: "p",
        text: "Cookies sind eine Methode der lokalen Datenspeicherung. Cookies sind kleine Textdateien, die auf Ihrem Gerät (Computer, Mobiltelefon oder Tablet) gespeichert werden und die Ihren Webbrowser wiedererkennbar machen. Cookies enthalten vor allem Informationen über Ihren Webbrowser und die darin stattgefundenen Aktivitäten.",
      },
    ],
  },
  {
    heading: "Auf dieser Website verwendete Cookies",
    blocks: [
      {
        type: "p",
        text: "Diese Website setzt keine Werbe- oder Analyse-Cookies und verwendet keine Werkzeuge zur Besuchermessung. Folgende Cookies können auf Ihrem Gerät gespeichert werden:",
      },
      {
        type: "table",
        caption: "Cookies auf dieser Website",
        headers: ["Cookie", "Anbieter", "Art und Zweck", "Dauer"],
        rows: [
          [
            CONSENT_COOKIE.name,
            `Erstanbieter (${siteHost})`,
            "Technisch, unbedingt erforderlich. Speichert Ihre Cookie-Wahl (akzeptierte oder abgelehnte Drittanbieterdienste).",
            `${CONSENT_COOKIE.expiresAfterDays} Tage`,
          ],
          [
            "__cf_bm",
            "Cloudflare, Inc. (Hosting-Anbieter)",
            "Technisch, zur Sicherheit. Wird nur gesetzt, wenn der Bot-Schutz von Cloudflare aktiv ist; er dient dazu, Menschen von automatisierten Programmen zu unterscheiden.",
            "30 Minuten Inaktivität",
          ],
          [
            "NID und ähnliche",
            "Google (auf eigenen Domains)",
            "Drittanbieter. Nur wenn Sie Drittanbieterdienste akzeptieren und die Google-Maps-Karte auf der Kontaktseite geladen wird.",
            `Gemäß der [Cookie-Richtlinie von Google](${googlePolicyUrl("cookies", "de")})`,
          ],
        ],
      },
      {
        type: "p",
        text: `Technische Cookies: Das Cookie ${CONSENT_COOKIE.name} ist unbedingt erforderlich, um Ihre Wahl zu speichern, und bedarf keiner Einwilligung. Wenn unser Hosting-Anbieter Cloudflare seinen Bot-Schutz aktiviert hat, kann außerdem das technische Cookie __cf_bm gesetzt werden, das für die Sicherheit der Website notwendig ist und ebenfalls keiner Einwilligung bedarf.`,
      },
      {
        type: "p",
        text: `Google-Karte: Auf der Kontaktseite wird die Google-Maps-Karte erst geladen, wenn Sie Drittanbieterdienste akzeptieren, entweder im Cookie-Hinweis oder durch Drücken der Schaltfläche „Karte laden“. Ab diesem Moment kann Google Cookies auf seiner eigenen Domain setzen und Daten über Ihre Aktivität gemäß seiner [Cookie-Richtlinie](${googlePolicyUrl("cookies", "de")}) und seiner [Datenschutzerklärung](${googlePolicyUrl("privacy", "de")}) verarbeiten. Der Link „In Google Maps öffnen“ führt Sie auf die Website von Google.`,
      },
      {
        type: "p",
        text: `Das Kontaktformular verwendet keine Cookies. Die darin eingegebenen Daten werden gemäß unserer ${privacyLink} verarbeitet.`,
      },
      {
        type: "p",
        text: `Wenn ${L} die Verwendung von Cookies auf dieser Website ändert, wird diese Richtlinie aktualisiert und gegebenenfalls informieren wir Sie mit einer Nachricht.`,
      },
    ],
  },
  {
    heading: "Einwilligung erteilen, ablehnen oder widerrufen",
    blocks: [
      {
        type: "p",
        text: `Beim ersten Besuch der Website wird ein Hinweis angezeigt, in dem Sie auf „${cookieLabels.acceptAll}“ oder „${cookieLabels.rejectAll}“ klicken können oder auf „${cookieLabels.configure}“, um festzulegen, welche Drittanbieterdienste Sie zulassen. Das Ablehnen ist ebenso einfach wie das Akzeptieren; das Weitersurfen oder das Scrollen der Seite gilt nicht als Zustimmung.`,
      },
      {
        type: "p",
        text: `Sie können Ihre Einwilligung jederzeit über die Schaltfläche „${cookieLabels.settings}“ in der Fußzeile ändern oder widerrufen. Bei Widerruf wird die Google-Karte nicht mehr angezeigt. Cookies, die Google bereits auf seiner eigenen Domain gesetzt hat, können von dieser Website aus nicht gelöscht werden; Sie können sie in den Einstellungen Ihres Browsers löschen, wie unten erläutert.`,
      },
      {
        type: "p",
        text: `Ihre Wahl wird ${CONSENT_COOKIE.expiresAfterDays} Tage lang gespeichert. Nach diesem Zeitraum oder wenn wir diese Richtlinie ändern, werden Sie erneut gefragt.`,
      },
    ],
  },
  {
    heading: "Cookies verwalten",
    blocks: [
      {
        type: "p",
        text: "Sie können Cookies deaktivieren oder Ihren Browser so einstellen, dass Sie benachrichtigt werden, wenn ein Cookie gesendet wird.",
      },
      {
        type: "p",
        text: "Die Einstellungen Ihres Webbrowsers zeigen in der Regel eine Liste aller gespeicherten Cookies, sodass Sie einen Überblick erhalten und unerwünschte Cookies bei Bedarf löschen können. Meist können Sie auswählen, ob Sie Cookies von den besuchten Websites oder von mit diesen Websites verbundenen Dritten akzeptieren. Sie können auch festlegen, dass Sie bei jedem neuen Cookie benachrichtigt werden. Ihr Webbrowser speichert Cookies normalerweise in einem bestimmten Ordner auf Ihrer Festplatte, sodass Sie deren Inhalte auch genauer untersuchen können.",
      },
      {
        type: "p",
        text: "Es gibt außerdem Dienste, die Nutzern gezielt eine aktuelle Liste von Cookies und anderen Tracking-Mechanismen bereitstellen.",
      },
      {
        type: "p",
        text: "Bitte beachten Sie, dass Sie möglicherweise nicht alle Funktionen mancher Websites nutzen können, wenn Sie Cookies deaktivieren.",
      },
      {
        type: "p",
        text: "Nachfolgend finden Sie eine Zusammenfassung, wie lokal gespeicherte Daten in verschiedenen Webbrowsern verwaltet werden. Bitte beachten Sie, dass sich dieses Verfahren ändern kann und die Beschreibungen möglicherweise nicht aktuell sind.",
      },
    ],
  },
  ...browserGuides.map((guide) => ({
    heading: `Cookies verwalten in ${guide.browser}`,
    level: 3 as const,
    blocks: [
      { type: "p" as const, text: "So löschen Sie Cookies:" },
      { type: "ol" as const, items: guide.remove },
      { type: "p" as const, text: "So verhindern Sie, dass Cookies in Ihrem Webbrowser gespeichert werden:" },
      { type: "ol" as const, items: guide.block },
    ],
  })),
  {
    heading: "Kontaktinformationen",
    blocks: [
      {
        type: "p",
        text: `Wenn Sie Fragen zur Verwendung lokaler Datenspeicherung auf unserer Website haben, kontaktieren Sie uns unter ${privacyMail} und schreiben Sie „Cookie-Richtlinie“ in die Betreffzeile.`,
      },
    ],
  },
];

const legal: Dictionary["legal"] = {
  updatedLabel: "Zuletzt aktualisiert",
  courtesyNotice: "Dies ist eine Übersetzung zu Informationszwecken. Bei Abweichungen ist die spanische Fassung maßgeblich.",
  documents: { legalNotice, privacy, cookies },
};

const seo: Dictionary["seo"] = {
  pages: {
    home: {
      title: "CDI Maquinarias | STILL-Stapler in Las Palmas",
      description:
        "Verkauf, Vermietung und Reparatur von STILL-Staplern und Industriemaschinen in Las Palmas de Gran Canaria. Fordern Sie jetzt Ihr Angebot an.",
      label: "Startseite",
      heading: "Verkauf, Vermietung und Reparatur von Industriemaschinen in Las Palmas",
    },
    about: {
      title: "Über uns | CDI Maquinarias auf Gran Canaria",
      description:
        "Mehr als zehn Jahre Erfahrung in Reparatur, Vermietung und Verkauf von Industriemaschinen und Klimaanlagen in Las Palmas de Gran Canaria.",
      label: "Über uns",
      heading: "Über uns",
    },
    services: {
      title: "Industriemaschinen-Service in Las Palmas | CDI",
      description:
        "Reparatur und Wartung, Verkauf, Vermietung, Leasing und Beratung für Stapler und Industriemaschinen sowie Klimatisierung auf Gran Canaria.",
      label: "Dienstleistungen",
      heading: "Dienstleistungen",
    },
    products: {
      title: "STILL-Produkte | Offizieller Händler in Las Palmas",
      description:
        "Offizielle STILL-Händler in Las Palmas: Gabelstapler, Hubwagen, Stapler, Kommissionierer und Schlepper. Stöbern Sie im Katalog.",
      label: "Produkte",
      heading: "Offizielle STILL-Händler",
    },
    renting: {
      title: "Staplervermietung auf Gran Canaria | CDI Maquinarias",
      description:
        "Lang- und kurzfristige Vermietung von Schubmaststaplern, Gegengewichtsstaplern, Kommissionierern, Staplern und E-Transpaletten auf Gran Canaria.",
      label: "Vermietung",
      heading: "Vermietung",
      intro: "Wählen Sie die Art der benötigten Ausrüstung, und wir informieren Sie über Verfügbarkeit und Konditionen.",
    },
    contact: {
      title: "Kontakt | CDI Maquinarias in Las Palmas de Gran Canaria",
      description:
        "Kontaktieren Sie CDI Maquinarias in Playa del Hombre, Las Palmas: Telefon, E-Mail, Öffnungszeiten, Standort und Formular für Angebotsanfragen.",
      label: "Kontakt",
      heading: "Kontakt",
    },
    legalNotice: {
      title: "Impressum | CDI Maquinarias",
      description:
        "Impressum der Website von CDI Maquinarias S.L.: Betreiber, Nutzungsbedingungen, geistiges Eigentum und Haftung.",
      label: "Impressum",
      heading: "Impressum",
    },
    privacy: {
      title: "Datenschutzerklärung | CDI Maquinarias",
      description:
        "Datenschutzinformationen der CDI Maquinarias S.L.: Verantwortlicher, Zwecke, Speicherdauer, Rechtsgrundlage, Empfänger und Ihre Rechte.",
      label: "Datenschutz",
      heading: "Datenschutzerklärung",
      intro: "Informationen zum Datenschutz.",
    },
    cookies: {
      title: "Cookie-Richtlinie | CDI Maquinarias",
      description:
        "Cookie-Richtlinie der Website von CDI Maquinarias: verwendeter lokaler Speicher, die Google-Karte und wie Sie Cookies verwalten.",
      label: "Cookie-Richtlinie",
      heading: "Cookie-Richtlinie",
    },
  },
};

export const de: Dictionary = {
  common, home, about, services, products, rental, contact, legal, cookies: cookieCopy, seo,
};
