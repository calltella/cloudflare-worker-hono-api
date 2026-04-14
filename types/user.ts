// /types/user.ts

import type { ColorThemeKey } from "@/types/colorTheme";

export type UserRole = "admin" | "user";
export type ThemeMode = "light" | "dark" | "system";

// KV形式で保存するための型
export interface UserSettings {
  themeMode: ThemeMode;
  colorThemes: ColorThemeKey;
  avatarPath: string;
  notifications: boolean;
  defaultView: string;
  createdAt: string;
}

// KV形式(session)
export interface SessionSettings {
  userId: string;
  hashedToken: string;
  expiresAt: Date;
}

/**
 * KV用 ユーザー設定
*/
export const DEFAULT_SETTINGS: UserSettings = {
  themeMode: 'light',
  colorThemes: 'default',
  avatarPath: 'default.png',
  notifications: true,
  defaultView: 'dashboard',
  createdAt: new Date().toISOString(),
};