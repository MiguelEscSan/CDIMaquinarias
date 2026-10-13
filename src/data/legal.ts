import type { LegalDocument, LegalPageId } from "../types";
import { getDictionary, type Locale } from "../i18n";

/** Date shown as "last updated" on every legal page (ISO). */
export const LEGAL_UPDATED = "2026-10-13";

export function getLegalDocument(pageId: LegalPageId, locale: Locale): LegalDocument {
  return { pageId, updated: LEGAL_UPDATED, sections: getDictionary(locale).legal.documents[pageId] };
}
