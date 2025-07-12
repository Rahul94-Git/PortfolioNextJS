import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key')

export async function createSession(userId: number, username: string) {
  const payload = { userId, username }
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(key)
  
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  })
}

export async function getSession() {
  const token = cookies().get('session')?.value
  if (!token) return null
  
  try {
    const { payload } = await jwtVerify(token, key)
    return payload as { userId: number; username: string }
  } catch {
    return null
  }
}

export async function deleteSession() {
  cookies().delete('session')
}