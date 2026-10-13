import { primaryPhone, siteMeta } from "../../data/siteInfo";
import type { Dictionary } from "../es";
import { common } from "./common";

export const contact: Dictionary["contact"] = {
  details: {
    eyebrow: "Get in touch",
    title: "Talk to our team",
    subtitle: "Call us, email us or fill in the form and we will help you prepare your quote.",
    labels: {
      phone: "Phone",
      email: "Email",
      address: "Address",
      hours: "Opening hours",
    },
  },
  location: {
    eyebrow: "Location",
    title: "Where to find us",
    subtitle: `We serve businesses across ${common.business.areaServed}.`,
    directionsLabel: "Open in Google Maps",
    directionsAriaLabel: "Open the location in Google Maps (opens in a new tab)",
    mapTitle: `Map showing the location of ${siteMeta.name}`,
    consent: {
      title: "Google map",
      body: "The map is loaded from Google Maps, a third-party service that may set cookies and collect data about your activity. By pressing “Load map” you accept this service; you can change your choice at any time with “Cookie settings” in the footer.",
      loadLabel: "Load map",
      cookiesLinkLabel: "More information in the cookie policy",
    },
  },
  form: {
    title: "Send us a message",
    intro: "We will reply as soon as possible.",
    requiredNote: "Fields marked with * are required.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    privacy: {
      before: "I have read and accept the",
      linkLabel: "privacy policy",
    },
    honeypotLabel: "Leave this field empty",
    submitLabel: "Send",
    success: "Thank you! We will get back to you as soon as possible.",
    failure: "There was an error sending your message. Please try again or call us.",
    deliveryUnconfirmed: `We could not confirm that your message was sent. It may have arrived; if you do not hear from us within 24 hours, please call us on ${primaryPhone.display}.`,
    rateLimited: `You have sent several messages in a short time. Please try again in a few minutes or call us on ${primaryPhone.display}.`,
    equipmentPrefill: (name: string) => `I would like more information about: ${name}.`,
    errors: {
      nameRequired: "Please enter your name.",
      nameLength: "Your name must be between 2 and 100 characters.",
      emailInvalid: "The email address is not valid.",
      messageRequired: "Please write your message.",
      messageLength: "Your message must be between 10 and 5000 characters.",
      privacyRequired: "You must accept the privacy policy.",
    },
  },
};
