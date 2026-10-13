import { describe, expect, it } from "vitest";
import {
  ContactDeliveryError,
  ContactDeliveryTimeoutError,
  ContactMailNotConfiguredError,
  ContactRateLimitedError,
} from "../../src/core/contact/errors";
import { contactErrorFeedback, contactFailureFor } from "../../src/lib/contactFeedback";
import { contactFormCopy } from "../../src/data/contactContent";
import { primaryPhone } from "../../src/data/siteInfo";

describe("contactFailureFor", () => {
  it("maps rate limiting to TOO_MANY_REQUESTS with the rate-limit copy", () => {
    expect(contactFailureFor(new ContactRateLimitedError(60))).toEqual({
      code: "TOO_MANY_REQUESTS",
      message: contactFormCopy.rateLimited,
    });
  });

  it("maps an unconfirmed delivery to GATEWAY_TIMEOUT with the unconfirmed copy", () => {
    expect(contactFailureFor(new ContactDeliveryTimeoutError(8000))).toEqual({
      code: "GATEWAY_TIMEOUT",
      message: contactFormCopy.deliveryUnconfirmed,
    });
  });

  it("maps configuration and delivery failures to the generic failure", () => {
    const generic = { code: "INTERNAL_SERVER_ERROR", message: contactFormCopy.failure };
    expect(contactFailureFor(new ContactMailNotConfiguredError())).toEqual(generic);
    expect(contactFailureFor(new ContactDeliveryError(new Error("535")))).toEqual(generic);
    expect(contactFailureFor(new Error("unexpected"))).toEqual(generic);
  });
});

describe("contactErrorFeedback", () => {
  it("returns HTTP 429 and the rate-limit message for TOO_MANY_REQUESTS", () => {
    expect(contactErrorFeedback("TOO_MANY_REQUESTS")).toEqual({
      status: 429,
      message: contactFormCopy.rateLimited,
    });
  });

  it("returns HTTP 504 and the unconfirmed-delivery message for GATEWAY_TIMEOUT", () => {
    expect(contactErrorFeedback("GATEWAY_TIMEOUT")).toEqual({
      status: 504,
      message: contactFormCopy.deliveryUnconfirmed,
    });
  });

  it("returns HTTP 500 and the generic failure for anything else", () => {
    expect(contactErrorFeedback("INTERNAL_SERVER_ERROR")).toEqual({
      status: 500,
      message: contactFormCopy.failure,
    });
    expect(contactErrorFeedback(undefined).status).toBe(500);
  });

  it("includes the phone number from site data in the rate-limit and unconfirmed messages", () => {
    expect(contactFormCopy.rateLimited).toContain(primaryPhone.display);
    expect(contactFormCopy.deliveryUnconfirmed).toContain(primaryPhone.display);
  });
});
