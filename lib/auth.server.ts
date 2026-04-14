// lib/auth.server.ts
import { headers } from "next/headers";
import { saveAuthLoginHistory } from "@/lib/utils/auth";
import type { User } from "@/db/schema/users";
import { initializeUserSettings } from "@/src/service/settings.service";

export async function getRequestMeta(user: User) {
  try {
    const headerList = await headers();
    await saveAuthLoginHistory({
      userId: user.id,
      ipAddress: headerList.get("cf-connecting-ip"),
      country: headerList.get("cf-ipcountry"),
      userAgent: headerList.get("user-agent"),
    });

    // ユーザー設定の初期化
    const setting = await initializeUserSettings(user.id);
    console.log(`settings initialized for user ${user.id}:`, setting);

  } catch (error) {
    // ログイン自体は失敗させない
    console.error("Failed to save login history:", error);
  }
}

