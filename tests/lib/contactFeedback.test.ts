import { describe, expect, it } from "vitest";
import {
  ContactDeliveryError,
  ContactDeliveryTimeoutError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "../../src/core/contact/errors";
import {
  contactErrorFeedback,
  contactFailureFor,
  localizeFieldErrors,
} from "../../src/lib/contactFeedback";
import { getDictionary } from "../../src/i18n";
import { primaryPhone } from "../../src/data/siteInfo";

const es = getDictionary("es").contact.form;

describe("contactFailureFor", () => {
  it("maps rate limiting to TOO_MANY_REQUESTS with the rate-limit copy", () => {
    expect(contactFailureFor(new ContactRateLimitedError(60), "es")).toEqual({
      code: "TOO_MANY_REQUESTS",
      message: es.rateLimited,
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
