// lib/jwt.ts
import { SignJWT, jwtVerify, JWTPayload } from "jose";


const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function signAccessToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // 短命
    .sign(secret)
}

export async function signRefreshToken() {
  // ランダムトークン（JWTじゃなくてOK）
  return crypto.randomUUID();
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}