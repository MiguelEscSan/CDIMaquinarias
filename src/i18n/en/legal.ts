import type { LegalSection } from "../../types";
import { CONSENT_COOKIE } from "../../data/cookieConsent";
import { googlePolicyUrl, legalInfo, siteHost } from "../../data/siteInfo";
import type { Dictionary } from "../es";
import { routes } from "../routes";
import { cookies as cookieCopy } from "./cookies";

// Courtesy translation of src/i18n/es/legal.ts (the Spanish text prevails).
// Pending review by the legal advisor; keep the structure aligned with the Spanish file.

const L = legalInfo.legalName;
const privacyLink = `[privacy policy](${routes.privacy.en})`;
const cookiesLink = `[cookie policy](${routes.cookies.en})`;
const privacyMail = `[${legalInfo.privacyEmail}](mailto:${legalInfo.privacyEmail})`;
const cookieLabels = cookieCopy.labels;

const legalNotice: LegalSection[] = [
  {
    heading: "1. Purpose and acceptance",
    blocks: [
      {
        type: "p",
        text: `This legal notice governs the use of our website, which is owned by ${L} Browsing the ${L} website makes you a user of it and implies full and unreserved acceptance of each and every provision of this legal notice, which may be amended. You undertake to use the website correctly in accordance with the law, good faith, public order, accepted practice and this legal notice. You will be liable to ${L} or to third parties for any damage or loss caused as a result of a breach of this obligation.`,
      },
    ],
  },
  {
    heading: "2. Identification and communications",
    blocks: [
      {
        type: "p",
        text: `In compliance with Spanish Law 34/2002 of 11 July on information society services and electronic commerce, ${L} informs you that:`,
      },
      {
        type: "ul",
        items: [
          `Its company name is: ${L}`,
          `Its tax identification number (CIF) is: ${legalInfo.taxId}`,
          `Its registered office is at: ${legalInfo.registeredAddress}`,
        ],
      },
      {
        type: "p",
        text: `To contact us, you can use the various means of contact set out in the ${privacyLink}.`,
      },
      {
        type: "p",
        text: `All notifications and communications you make with ${L} will be deemed effective for all purposes provided they are made through the means specified above.`,
      },
    ],
  },
  {
    heading: "3. Terms of access and use",
    blocks: [
      {
        type: "p",
        text: `The website and its services are freely accessible; however, ${L} makes the use of some of the services offered on its website conditional on first completing the corresponding form.`,
      },
      {
        type: "p",
        text: `You guarantee that all the data you provide to ${L} is authentic and up to date, and you will be solely responsible for any false or inaccurate statements you make.`,
      },
      {
        type: "p",
        text: `You expressly undertake to make appropriate use of the contents and services of ${L} and not to use them to, among other things:`,
      },
      {
        type: "ul",
        items: [
          "Disseminate content that is criminal, violent, pornographic, racist, xenophobic, offensive, that glorifies terrorism or that is, in general, contrary to the law or public order.",
          `Introduce computer viruses into the network or carry out actions likely to alter, damage, interrupt or cause errors or damage to the electronic documents, data or physical and logical systems of ${L} or of third parties; or hinder other users' access to the website and its services through the massive consumption of the IT resources through which ${L} provides its services.`,
          `Attempt to access other people's data or restricted areas of the computer systems of ${L} or of third parties and, where applicable, extract information.`,
          `Infringe intellectual or industrial property rights or breach the confidentiality of the information of ${L} or of third parties.`,
          "Impersonate another user, a public authority or a third party.",
          "Reproduce, copy, distribute, make available or otherwise communicate to the public, transform or modify the contents, unless authorised by the holder of the corresponding rights or legally permitted.",
          "Collect data for advertising purposes or send advertising of any kind or communications for sales or other commercial purposes without the recipient's prior request or consent.",
        ],
      },
      {
        type: "p",
        text: `All the contents of the website, such as texts, photographs, graphics, images, icons, technology and software, as well as its graphic design and source code, constitute a work owned by ${L}, and none of the exploitation rights over them shall be deemed to be assigned beyond what is strictly necessary for the correct use of the website.`,
      },
      {
        type: "p",
        text: "In short, as a user accessing this website, you may view the contents and, where applicable, make authorised private copies, provided that the reproduced elements are not subsequently passed on to third parties, installed on servers connected to networks or subject to any kind of exploitation.",
      },
      {
        type: "p",
        text: `Likewise, all trade marks, trade names or distinctive signs of any kind appearing on the website are the property of ${L}, and their use or access shall not be understood as granting you any right over them.`,
      },
      {
        type: "p",
        text: "The distribution, modification, assignment or public communication of the contents and any other act not expressly authorised by the holder of the exploitation rights are prohibited.",
      },
      {
        type: "p",
        text: `Establishing a hyperlink does not in any case imply the existence of a relationship between ${L} and the owner of the website on which it is placed, nor the acceptance or approval by ${L} of its contents or services. Anyone intending to establish a hyperlink must first request written authorisation from ${L} In any case, the hyperlink may only give access to the home page of our website, and you must refrain from making false, inaccurate or incorrect statements or indications about ${L} or including unlawful content or content contrary to accepted morals and public order.`,
      },
      {
        type: "p",
        text: `${L} is not responsible for the use that each user makes of the materials made available on this website or for the actions they take on the basis of them.`,
      },
    ],
  },
  {
    heading: "4. Exclusion of warranties and liability",
    blocks: [
      {
        type: "p",
        text: `To the extent permitted by law, ${L} excludes any liability for damage or loss of any kind arising from:`,
      },
      {
        type: "ul",
        items: [
          "The impossibility of accessing the website or the lack of truthfulness, accuracy, completeness and/or timeliness of the contents, as well as the existence of defects of any kind in the contents transmitted, disseminated, stored or made available that have been accessed through the website or the services offered.",
          "The presence of viruses or other elements in the contents that may cause alterations to users' computer systems, electronic documents or data.",
          `Failure to comply with the law, good faith, public order, accepted practice and this legal notice as a result of incorrect use of the website. In particular, and by way of example, ${L} is not responsible for the actions of third parties that infringe intellectual and industrial property rights, trade secrets, the rights to honour, personal and family privacy and self-image, or the rules on unfair competition and unlawful advertising.`,
        ],
      },
      {
        type: "p",
        text: `Likewise, ${L} disclaims any liability for information found outside this website that is not managed directly by our webmaster. The links on this website are provided solely to inform users of other sources that may expand on the contents offered by this website. ${L} does not guarantee and is not responsible for the operation or accessibility of the linked sites, nor does it suggest, invite or recommend visiting them, and it will therefore not be responsible for the result obtained. ${L} is not responsible for hyperlinks established by third parties.`,
      },
    ],
  },
  {
    heading: "5. Procedure in the event of unlawful activities",
    blocks: [
      {
        type: "p",
        text: `If you or a third party consider that there are facts or circumstances revealing the unlawful nature of the use of any content and/or of any activity on the web pages included in or accessible through the website, you must contact ${L}, identifying yourself properly, specifying the alleged infringements and expressly declaring, under your own responsibility, that the information provided in the notification is accurate.`,
      },
      {
        type: "p",
        text: `Any dispute relating to the ${L} website shall be governed by Spanish law, and the Courts and Tribunals closest to its registered office (Spain) shall have jurisdiction.`,
      },
    ],
  },
  {
    heading: "6. Publications",
    blocks: [
      {
        type: "p",
        text: "Administrative information provided through the website does not replace the legal publication of laws, regulations, plans, general provisions and acts that must be formally published in the official journals of the public authorities, which are the only instrument that attests to their authenticity and content. The information available on this website should be understood as a guide with no legal validity.",
      },
    ],
  },
];

const privacy: LegalSection[] = [
  {
    heading: "1. Data controller",
    blocks: [
      {
        type: "ul",
        items: [
          `Entity: ${L}`,
          `Tax identification number (CIF): ${legalInfo.taxId}`,
          `Address: ${legalInfo.registeredAddress}`,
          `Email: ${privacyMail}`,
          `Data controller: ${legalInfo.controllerName}`,
          `Data controller's phone number: ${legalInfo.controllerPhone}`,
          `Data controller's email address: ${privacyMail}`,
        ],
      },
    ],
  },
  {
    heading: "2. Purposes",
    blocks: [
      {
        type: "p",
        text: `In accordance with Regulation (EU) 2016/679, the General Data Protection Regulation, and Spanish Organic Law 3/2018 on the Protection of Personal Data and the Guarantee of Digital Rights, we inform you that, depending on your relationship with us, ${L} processes the data you provide for some or all of the following purposes:`,
      },
      {
        type: "ul",
        items: [
          "Answering the enquiries and quote requests you send us through the contact form.",
          "Sending commercial information about the company by post, email or other means.",
        ],
      },
    ],
  },
  {
    heading: "3. Data retention period",
    blocks: [
      {
        type: "p",
        text: "Your data will be kept for a period of 1 year. If you require earlier deletion, please request it by exercising your right to erasure. Data that must be stored for legal reasons for the time needed to comply with specific regulations will be blocked and made available only to the relevant public authority.",
      },
    ],
  },
  {
    heading: "4. Legal basis",
    blocks: [
      { type: "p", text: "The legal basis for processing your data is:" },
      { type: "ul", items: ["Unambiguous consent."] },
      {
        type: "p",
        text: "In addition, on the basis of our legitimate interest in preventing abuse of the contact form, we temporarily process an anonymised connection identifier derived from your IP address, which is deleted automatically within 1 hour at the latest.",
      },
    ],
  },
  {
    heading: "5. Recipients",
    blocks: [
      {
        type: "p",
        text: "We do not share your data with third parties unless required by law. The following providers are involved in delivering the service as data processors:",
      },
      {
        type: "ul",
        items: [
          "The website's hosting and infrastructure provider (Cloudflare, Inc.), which technically processes the requests you make when visiting the website and submitting the form. This provider may process data outside the European Economic Area; in that case, the transfer is covered by the safeguards provided for in the GDPR, such as the standard contractual clauses approved by the European Commission.",
          "The company's email provider, whose SMTP server forwards to us by email the data you enter in the contact form.",
        ],
      },
    ],
  },
  {
    heading: "6. Rights",
    blocks: [
      {
        type: "p",
        text: `You have the right to obtain confirmation as to whether or not ${L} is processing personal data concerning you.`,
      },
      {
        type: "p",
        text: "You also have the right to access your personal data and to request the rectification of inaccurate data or, where appropriate, request its erasure when, among other reasons, the data is no longer necessary for the purposes for which it was collected.",
      },
      {
        type: "p",
        text: "In certain circumstances, you may request the restriction of the processing of your data, in which case we will only keep it for the exercise or defence of claims.",
      },
      {
        type: "p",
        text: `In addition, in certain circumstances and for reasons related to your particular situation, you may object to the processing of your data. ${L} will stop processing the data, except for compelling legitimate grounds or the exercise or defence of possible claims.`,
      },
      {
        type: "p",
        text: "You may also exercise the right to data portability and withdraw the consents you have given at any time, without affecting the lawfulness of processing based on consent before its withdrawal.",
      },
      {
        type: "p",
        text: `If you wish to exercise any of your rights (access, rectification, erasure or right to be forgotten, restriction of processing, objection or portability), write to us at ${privacyMail} stating the right you wish to exercise.`,
      },
      {
        type: "p",
        text: `Alternatively, you can also contact us by post at the following address: ${legalInfo.registeredAddress}, enclosing a photocopy of your national identity document (DNI) or equivalent to prove your identity. Please provide as much information as possible about your request: first name, surname and the email address related to your request.`,
      },
      {
        type: "p",
        text: "Finally, we inform you that you may contact the Spanish Data Protection Agency (Agencia Española de Protección de Datos) and other competent public bodies with any complaint arising from the processing of your personal data.",
      },
    ],
  },
  {
    heading: "7. Cookie policy",
    blocks: [
      {
        type: "p",
        text: `To find out how cookies are used on our website, please see our ${cookiesLink}.`,
      },
    ],
  },
];

const browserGuides: { browser: string; remove: string[]; block: string[] }[] = [
  {
    browser: "Google Chrome",
    remove: [
      "Go to Settings in your browser menu.",
      "Click Show advanced settings.",
      "Click Clear browsing data.",
      "Select the time period for which you want to delete information in the menu at the top. To delete all cookies from the browser, click the beginning of time.",
      "Tick Cookies and other site and plugin data.",
      "Click Clear browsing data.",
      "Close the window.",
    ],
    block: [
      "Go to Settings in your browser menu.",
      "Click Show advanced settings and then Content settings.",
      "Under Cookies, select your preferred option. To prevent all cookies from being stored, click Block sites from setting any data.",
      "Click Done.",
      "Close the window.",
    ],
  },
  {
    browser: "Safari",
    remove: [
      "Go to Preferences in your browser menu.",
      "Click the Privacy tab.",
      "Click Remove All Website Data and then Remove Now to delete all cookies.",
      "Close the window.",
    ],
    block: [
      "Go to Preferences in your browser menu.",
      "Click the Privacy tab.",
      "Under Cookies and website data, select your preferred option. To prevent all cookies from being stored, click Always block.",
      "Close the window.",
    ],
  },
  {
    browser: "Mozilla Firefox",
    remove: [
      "Go to Options in your browser menu.",
      "Click the Privacy tab.",
      "Click Show Cookies.",
      "Select the cookies you want to delete and click Remove Selected. Click Remove All to delete all cookies from your browser.",
      "Close the window. Any changes you have made are saved automatically.",
    ],
    block: [
      "Go to Settings in your browser menu.",
      "Select the Privacy tab.",
      "Under History, click Use custom settings for history.",
      "Select your preferred options under Accept cookies from sites. To prevent all cookies from being stored, untick Accept cookies from sites.",
      "Close the window. Any changes you have made are saved automatically.",
    ],
  },
  {
    browser: "Internet Explorer",
    remove: [
      "Go to Tools (gear icon) in your browser menu.",
      "Click Internet properties.",
      "On the General tab, under Browsing history, click Delete.",
      "Make sure the Cookies and website data option is ticked.",
      "Click Delete.",
      "Click OK.",
    ],
    block: [
      "Go to Tools (gear icon) in your browser menu.",
      "Click Internet options and then the Privacy tab.",
      "Move the slider to the level you want. To prevent all cookies from being stored, select Block all cookies.",
      "Click OK.",
    ],
  },
  {
    browser: "Opera",
    remove: [
      "Go to Settings in your browser menu.",
      "Select the Privacy and security tab.",
      "Click Cookies and then All cookies and site data.",
      "Select the cookies you want to delete and click Remove. Click Remove all to delete all cookies from your browser.",
      "Click Done.",
      "Close the window.",
    ],
    block: [
      "Go to Settings in your browser menu.",
      "Select the Privacy and security tab.",
      "Under Cookies, select your preferred option. To prevent all cookies from being stored, click Block sites from setting any data.",
      "Close the window.",
    ],
  },
];

const cookies: LegalSection[] = [
  {
    heading: "General information about cookies",
    blocks: [
      {
        type: "p",
        text: `Our users' trust is important to us and, accordingly, ${L} cares about protecting your privacy. An important part of this is giving you as much information as possible about how we use your personal data, including local data storage and similar technologies.`,
      },
      {
        type: "p",
        text: "Local data storage means storing different types of data locally on your device through your web browser. Locally stored data may, for example, contain user settings or information about how you browse a website and which browser you use.",
      },
      {
        type: "p",
        text: "Cookies are one method of local data storage. Cookies are small text files that are stored on your device (computer, mobile phone or tablet) and allow your web browser to be recognised. Cookies mainly contain information about your web browser and the activity that has taken place in it.",
      },
    ],
  },
  {
    heading: "Cookies used by this website",
    blocks: [
      {
        type: "p",
        text: "This website does not set advertising or analytics cookies and does not use visitor measurement tools. The cookies that may be stored on your device are the following:",
      },
      {
        type: "table",
        caption: "Cookies on this website",
        headers: ["Cookie", "Owner", "Type and purpose", "Duration"],
        rows: [
          [
            CONSENT_COOKIE.name,
            `First party (${siteHost})`,
            "Technical, strictly necessary. Stores your cookie choice (third-party services accepted or rejected).",
            `${CONSENT_COOKIE.expiresAfterDays} days`,
          ],
          [
            "__cf_bm",
            "Cloudflare, Inc. (hosting provider)",
            "Technical, for security. Only set if Cloudflare's bot protection is active; it is used to distinguish people from automated programs.",
            "30 minutes of inactivity",
          ],
          [
            "NID and similar",
            "Google (on its own domains)",
            "Third party. Only if you accept third-party services and the Google Maps map is loaded on the contact page.",
            `As set out in [Google's cookie policy](${googlePolicyUrl("cookies", "en")})`,
          ],
        ],
      },
      {
        type: "p",
        text: `Technical cookies: the ${CONSENT_COOKIE.name} cookie is strictly necessary to remember your choice and does not require consent. In addition, if our hosting provider, Cloudflare, has its bot protection active, it may set the technical cookie __cf_bm, which is necessary for the security of the website and does not require consent either.`,
      },
      {
        type: "p",
        text: `Google map: on the contact page, the Google Maps map is not loaded until you accept third-party services, either in the cookie notice or by pressing the “Load map” button. From that moment, Google may set cookies on its own domain and process data about your activity in accordance with its [cookie policy](${googlePolicyUrl("cookies", "en")}) and its [privacy policy](${googlePolicyUrl("privacy", "en")}). The “Open in Google Maps” link takes you to Google's website.`,
      },
      {
        type: "p",
        text: `The contact form does not use cookies. The data you enter in it is processed in accordance with our ${privacyLink}.`,
      },
      {
        type: "p",
        text: `If ${L} changes the use of cookies on this website, it will update this policy and, where necessary, notify you with a message.`,
      },
    ],
  },
  {
    heading: "How to accept, reject or withdraw your consent",
    blocks: [
      {
        type: "p",
        text: `The first time you visit the website, a notice is shown in which you can press “${cookieLabels.acceptAll}” or “${cookieLabels.rejectAll}”, or “${cookieLabels.configure}” to choose which third-party services you allow. Rejecting is as easy as accepting, and continuing to browse or scrolling the page is not considered acceptance.`,
      },
      {
        type: "p",
        text: `You can change or withdraw your consent at any time with the “${cookieLabels.settings}” button in the footer. If you withdraw it, the Google map is no longer shown. Cookies that Google has already set on its own domain cannot be deleted from this website; you can delete them in your browser settings, as explained below.`,
      },
      {
        type: "p",
        text: `Your choice is kept for ${CONSENT_COOKIE.expiresAfterDays} days. After that period, or if we change this policy, you will be asked again.`,
      },
    ],
  },
  {
    heading: "Managing cookies",
    blocks: [
      {
        type: "p",
        text: "You can disable cookies or set your browser to alert you when a cookie is sent to you.",
      },
      {
        type: "p",
        text: "Your web browser settings usually show a list of all stored cookies so that you get an overview and can delete unwanted cookies if you wish. You can usually choose whether to accept cookies from the websites you visit or from third parties affiliated with those sites. You can also choose to be notified each time a new cookie is stored. Your web browser normally stores cookies in a specific folder on your hard drive, so you can also examine their contents in more detail.",
      },
      {
        type: "p",
        text: "There are also services designed specifically to give users an up-to-date list of cookies and other tracking mechanisms.",
      },
      {
        type: "p",
        text: "Please note that if you disable cookies, you may not be able to use all the features of some websites.",
      },
      {
        type: "p",
        text: "Below is a summary of how to manage locally stored data in different web browsers. Please note that this process may change and that the descriptions may not be up to date.",
      },
    ],
  },
  ...browserGuides.map((guide) => ({
    heading: `Managing cookies in ${guide.browser}`,
    level: 3 as const,
    blocks: [
      { type: "p" as const, text: "How to delete cookies:" },
      { type: "ol" as const, items: guide.remove },
      { type: "p" as const, text: "How to prevent cookies from being stored in your web browser:" },
      { type: "ol" as const, items: guide.block },
    ],
  })),
  {
    heading: "Contact information",
    blocks: [
      {
        type: "p",
        text: `If you have any questions about the use of local storage on our website, please contact us at ${privacyMail}, writing “Cookie policy” in the subject line.`,
      },
    ],
  },
];

export const legal: Dictionary["legal"] = {
  updatedLabel: "Last updated",
  courtesyNotice: "This is a courtesy translation. In case of discrepancy, the Spanish version prevails.",
  documents: { legalNotice, privacy, cookies },
};
