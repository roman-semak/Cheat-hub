import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto'

const AUTH_SECRET = process.env.AUTH_SECRET ?? ''

export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const hash = scryptSync(password, salt, 64)
  return `${salt.toString('hex')}:${hash.toString('hex')}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(':')
  if (!saltHex || !hashHex) return false
  const salt = Buffer.from(saltHex, 'hex')
  const expected = Buffer.from(hashHex, 'hex')
  const actual = scryptSync(password, salt, 64)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function signSession(username: string): string {
  const payload = Buffer.from(username, 'utf8').toString('base64url')
  const sig = createHmac('sha256', AUTH_SECRET).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifySession(token: string | undefined): string | null {
  if (!token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  const expected = createHmac('sha256', AUTH_SECRET).update(payload).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return Buffer.from(payload, 'base64url').toString('utf8')
}
