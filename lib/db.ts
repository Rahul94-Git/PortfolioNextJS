import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@shared/schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set')
}

const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql, { schema })

export { db }