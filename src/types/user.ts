/* =====================
   ENUMS
===================== */

export enum UserRole {
  user = "user",
  admin = "admin",
}

export enum ColorThemeKey {
  default = "default",
  blue = "blue",
  green = "green",
  purple = "purple",
  orange = "orange",
}

export enum AccountType {
  credentials = "credentials",
  oauth = "oauth",
}

/* =====================
   MODELS
===================== */

export type User = {
  id: string
  email: string
  name?: string | null
  avatarUrl?: string | null
  passwordHash?: string | null
  emailVerified?: Date | null
  isActive: boolean
  role: UserRole
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null

  account?: Account | null
  session?: Session | null
}

export type Account = {
  id: string
  userId: string
  type: AccountType
  themeMode: string
  colorThemes: ColorThemeKey

  user: User
}

export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date

  user: User
}

export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}


