import { neon } from '@neondatabase/serverless'

const sql = neon('postgresql://neondb_owner:npg_qi4XZWP0oLNu@ep-fancy-mode-axvf9h92-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require')

async function migrate() {
  console.log('Adding bank columns to users table...')
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS bank_name VARCHAR(100)`
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS account_number VARCHAR(50)`
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS account_name VARCHAR(100)`
  console.log('✅ Migration complete!')
}

migrate().catch(console.error)
