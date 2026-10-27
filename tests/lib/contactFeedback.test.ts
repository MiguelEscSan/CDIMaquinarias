import { describe, expect, it } from "vitest";
import {
  ContactDeliveryError,
  ContactDeliveryTimeoutError,
  ContactHumanCheckFailedError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "../../src/server/core/contact/errors";
import {
  contactErrorFeedback,
  contactFailureFor,
  localizeFieldErrors,
} from "../../src/presentation/views/contactFeedback";
import { getDictionary } from "../../src/content/i18n";
import { primaryPhone } from "../../src/content/data/siteInfo";

const es = getDictionary("es").contact.form;

describe("contactFailureFor", () => {
  it("maps rate limiting to TOO_MANY_REQUESTS with the rate-limit copy", () => {
    expect(contactFailureFor(new ContactRateLimitedError(60), "es")).toEqual({
      code: "TOO_MANY_REQUESTS",
      message: es.rateLimited,
    });
  });

  it("maps a failed human check to FORBIDDEN with the human-check copy", () => {
    expect(contactFailureFor(new ContactHumanCheckFailedError(), "es")).toEqual({
      code: "FORBIDDEN",
      message: es.humanCheckFailed,
    });
  });

  it("maps an unconfirmed delivery to GATEWAY_TIMEOUT with the unconfirmed copy", () => {
    expect(contactFailureFor(new ContactDeliveryTimeoutError(8000), "es")).toEqual({
      code: "GATEWAY_TIMEOUT",
      message: es.deliveryUnconfirmed,
    });
  });

  it("maps configuration and delivery failures to the generic failure", () => {
    const generic = { code: "INTERNAL_SERVER_ERROR", message: es.failure };
    expect(contactFailureFor(new ContactMailNotConfiguredError(), "es")).toEqual(generic);
    expect(contactFailureFor(new ContactDeliveryError(new Error("535")), "es")).toEqual(generic);
    expect(contactFailureFor(new Error("unexpected"), "es")).toEqual(generic);
  });
});

describe("contactErrorFeedback", () => {
  it("returns HTTP 429 and the rate-limit message for TOO_MANY_REQUESTS", () => {
    expect(contactErrorFeedback("TOO_MANY_REQUESTS", "es")).toEqual({
      status: 429,
      message: es.rateLimited,
    });
  });

  it("returns HTTP 403 and the human-check message for FORBIDDEN", () => {
    expect(contactErrorFeedback("FORBIDDEN", "es")).toEqual({
      status: 403,
      message: es.humanCheckFailed,
    });
  });

  it("returns HTTP 504 and the unconfirmed-delivery message for GATEWAY_TIMEOUT", () => {
    expect(contactErrorFeedback("GATEWAY_TIMEOUT", "es")).toEqual({
      status: 504,
      message: es.deliveryUnconfirmed,
    });
  });

  it("returns HTTP 500 and the generic failure for anything else", () => {
    expect(contactErrorFeedback("INTERNAL_SERVER_ERROR", "es")).toEqual({
      status: 500,
      message: es.failure,
    });
    expect(contactErrorFeedback(undefined, "es").status).toBe(500);
  });

  it("includes the phone number from site data in the rate-limit and unconfirmed messages", () => {
    expect(es.rateLimited).toContain(primaryPhone.display);
    expect(es.deliveryUnconfirmed).toContain(primaryPhone.display);
  });
});

describe("localizeFieldErrors", () => {
  it("replaces validation codes with the locale's messages", () => {
    expect(localizeFieldErrors({ name: ["nameLength"], privacy: ["privacyRequired"] }, "es")).toEqual({
      name: [es.errors.nameLength],
      privacy: [es.errors.privacyRequired],
    });
  });

  it("passes unknown entries through and skips empty fields", () => {
    expect(localizeFieldErrors({ email: ["Invalid input"], message: undefined }, "es")).toEqual({
      email: ["Invalid input"],
    });
  });

  it("does not treat prototype keys as codes", () => {
    expect(localizeFieldErrors({ name: ["constructor"] }, "es")).toEqual({ name: ["constructor"] });
  });
});

describe("contact feedback in English", () => {
  const en = getDictionary("en").contact.form;

  it("maps failures to the English copy", () => {
    expect(contactFailureFor(new ContactRateLimitedError(60), "en")).toEqual({
      code: "TOO_MANY_REQUESTS",
      message: en.rateLimited,
    });
    expect(contactErrorFeedback("GATEWAY_TIMEOUT", "en")).toEqual({
      status: 504,
      message: en.deliveryUnconfirmed,
    });
    expect(contactErrorFeedback(undefined, "en")).toEqual({ status: 500, message: en.failure });
    expect(en.rateLimited).not.toBe(es.rateLimited);
  });

  it("renders validation codes in English", () => {
    expect(localizeFieldErrors({ email: ["emailInvalid"] }, "en")).toEqual({
      email: [en.errors.emailInvalid],
    });
    expect(en.errors.emailInvalid).not.toBe(es.errors.emailInvalid);
  });
});
