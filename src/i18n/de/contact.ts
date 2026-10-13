import { primaryPhone, siteMeta } from "../../data/siteInfo";
import type { Dictionary } from "../es";
import { common } from "./common";

export const contact: Dictionary["contact"] = {
  details: {
    eyebrow: "Kontakt aufnehmen",
    title: "Sprechen Sie mit unserem Team",
    subtitle:
      "Rufen Sie uns an, schreiben Sie uns oder füllen Sie das Formular aus, und wir helfen Ihnen bei Ihrem Angebot.",
    labels: {
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      hours: "Öffnungszeiten",
    },
  },
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
