// lib/utils/r2.ts

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { CloudflareBindings } from "@/types/env";
import type { R2Bucket } from "@cloudflare/workers-types";

type BucketType = "public" | "private";

// Worker用
export async function getR2(type: BucketType = "private"): Promise<R2Bucket> {
  const context = await getCloudflareContext({ async: true });
  const env = context.env as unknown as CloudflareBindings;

  if (type === "private") {
    if (!env.PRIVATE_APLINE) {
      throw new Error("PRIVATE_APLINE binding not found");
    }
    return env.PRIVATE_APLINE;
  }

  if (type === "public") {
    if (!env.VERCEL_APLINE) {
      throw new Error("VERCEL_APLINE binding not found");
    }
    return env.VERCEL_APLINE;
  }

  throw new Error("Invalid bucket type");
}



