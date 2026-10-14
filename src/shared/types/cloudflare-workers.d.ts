// Minimal typing for the Worker bindings this site reads (see wrangler.jsonc).
declare module "cloudflare:workers" {
  export const env: {
    CONTACT_RATE_LIMIT?: import("@server/infrastructure/rateLimit/KvRateLimiter").KvNamespaceLike;
  };
}
