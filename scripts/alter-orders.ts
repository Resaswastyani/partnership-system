import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function alter() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  const sql = neon(databaseUrl)

  console.log('🔄 Updating orders table...')
  try {
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS license_code VARCHAR(50) UNIQUE`
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS license_expires_at TIMESTAMP`
    console.log('✅ Added license_code and license_expires_at to orders table')
  } catch (error) {
    console.error('❌ Failed to update orders table:', error)
  }
}

alter().catch(console.error)
