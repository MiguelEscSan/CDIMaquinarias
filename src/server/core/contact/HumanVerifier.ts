/** Confirms the visitor passed the human check for one submission. */
export interface HumanVerifier {
  /** Resolves false for a missing, invalid, or unverifiable token. */
  verify(token: string | undefined): Promise<boolean>;
}
