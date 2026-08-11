import path from 'node:path'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// Prisma CLI resolves a relative sqlite `file:` URL relative to
// prisma/schema.prisma (i.e. prisma/dev.db). @libsql/client resolves it
// relative to process.cwd() instead — so the same relative string points at
// two different files. Use an absolute path so both tools agree locally.
function localDbUrl(): string {
  return `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`
}

function createPrismaClient() {
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL || localDbUrl(),
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  return new PrismaClient({ adapter: new PrismaLibSQL(libsql) })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
