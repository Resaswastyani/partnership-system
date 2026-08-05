import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

const DATABASE_URL = 'postgresql://neondb_owner:npg_qi4XZWP0oLNu@ep-fancy-mode-axvf9h92-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

async function seed() {
  const sql = neon(DATABASE_URL)

  console.log('🔄 Creating users table...')

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      role VARCHAR(20) DEFAULT 'user',
      referral_code VARCHAR(50) UNIQUE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `

  console.log('✅ Users table created!')

  // Check if admin already exists
  const existing = await sql`SELECT id FROM users WHERE email = 'admin@fbl.com'`
  
  if (existing.length === 0) {
    console.log('🔄 Seeding admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    await sql`
      INSERT INTO users (name, email, password, phone, role, referral_code)
      VALUES ('Admin FBL', 'admin@fbl.com', ${hashedPassword}, '+62 000 0000 0000', 'admin', 'ADMIN-FBL')
    `
    console.log('✅ Admin user seeded: admin@fbl.com / admin123')
  } else {
    console.log('ℹ️  Admin user already exists, skipping seed.')
  }

  console.log('🎉 Database seeding complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
