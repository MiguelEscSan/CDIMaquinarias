import type { AstroGlobal } from "astro";
import { actions, isInputError } from "astro:actions";
import { findRentingCategory } from "@content/data/renting";
import { getDictionary, type Locale } from "@content/i18n";
import { contactErrorFeedback, localizeFieldErrors } from "./contactFeedback";

export type ContactField = "name" | "email" | "message" | "privacy";

export interface ContactFormState {
  success: boolean;
  formError?: string;
  fieldErrors: Partial<Record<ContactField, string[]>>;
  values: { name: string; email: string; message: string; privacy: boolean };
  /** Renting category slug carried through the submission. */
  equipo?: string;
}

/**
 * Form state for the contact page from the action result (no-JS form posts) and `?equipo=`.
 * `status` is the HTTP status the page must answer with, when not 200.
 */
export async function resolveContactPageState(
  astro: Pick<AstroGlobal, "getActionResult" | "request" | "url">,
  locale: Locale,
): Promise<{ state: ContactFormState; status?: number }> {
  const result = astro.getActionResult(actions.contact);
  const inputError = isInputError(result?.error) ? result.error : undefined;
  const failure =
    result?.error && !inputError ? contactErrorFeedback(result.error.code, locale) : undefined;

  const state: ContactFormState = {
    success: result?.data?.sent === true,
    formError: failure?.message,
    fieldErrors: inputError ? localizeFieldErrors<ContactField>(inputError.fields, locale) : {},
    values: { name: "", email: "", message: "", privacy: false },
  };

  let submittedEquipo: string | undefined;
  if (result?.error && astro.request.method === "POST") {
    try {
      const form = await astro.request.formData();
      const text = (key: string) => {
        const value = form.get(key);
        return typeof value === "string" ? value.slice(0, 5000) : "";
      };
      state.values = {
        name: text("name"),
        email: text("email"),
        message: text("message"),
        privacy: form.get("privacy") === "on",
      };
      submittedEquipo = text("equipo") || undefined;
    } catch {
      // Keep empty values if the body cannot be read again.
    }
  }

  const equipment = findRentingCategory(submittedEquipo ?? astro.url.searchParams.get("equipo"), locale);
  if (equipment) {
    state.equipo = equipment.slug;
    if (!state.values.message) {
      state.values.message = getDictionary(locale).contact.form.equipmentPrefill(equipment.name);
    }
  }

  const status = inputError ? 400 : failure?.status;
  return { state, status };
}
