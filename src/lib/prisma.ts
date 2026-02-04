import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Create a single Prisma client instance and reuse it across module reloads
// (prevents exhausting DB connections during hot reload in development).
const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// Configure the Postgres adapter with the connection string from env
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

// Reuse existing client if present, otherwise instantiate a new one.
const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
})

// Save to global in non-production so the instance survives module reloads
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma