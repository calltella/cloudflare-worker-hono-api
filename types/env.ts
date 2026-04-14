// src/types/env.ts

import type { R2Bucket, D1Database, KVNamespace } from "@cloudflare/workers-types";

export type CloudflareBindings = {
  DB: D1Database;
  VERCEL_APLINE: R2Bucket;
  PRIVATE_APLINE: R2Bucket;
  VERCEL_KV: KVNamespace;
};
