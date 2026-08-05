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

  console.log('🔄 Updating users table (adding referred_by_id)...')
  await sql`
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS referred_by_id INTEGER REFERENCES users(id)
  `

  console.log('🔄 Creating products table...')
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      price INTEGER NOT NULL,
      commission_rate INTEGER NOT NULL,
      description TEXT,
      image VARCHAR(255),
      features JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `

  console.log('🔄 Creating transactions table...')
  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      buyer_id INTEGER REFERENCES users(id) NOT NULL,
      product_id VARCHAR(50) REFERENCES products(id) NOT NULL,
      amount INTEGER NOT NULL,
      commission_amount INTEGER NOT NULL,
      affiliate_id INTEGER REFERENCES users(id),
      status VARCHAR(50) DEFAULT 'completed',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `

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

  console.log('🔄 Seeding products...')
  // Products from mock-data
  const products = [
    {
      id: 'prod-001',
      name: 'Materi Profesional Trading',
      type: 'download',
      price: 299000,
      commission_rate: 20,
      description: 'Panduan lengkap menjadi trader profesional dengan strategi terbukti menguntungkan',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      features: ['Video tutorial 40+ jam', 'E-book strategi trading', 'Analisis pasar harian', 'Community forum eksklusif', 'Lifetime access']
    },
    {
      id: 'prod-002',
      name: 'EA Robot Trading FBL',
      type: 'download',
      price: 599000,
      commission_rate: 20,
      description: 'Expert Advisor otomatis untuk trading 24/7 dengan AI tercanggih',
      image: 'https://images.unsplash.com/photo-1518186285789-2155db3693a7?w=500&h=300&fit=crop',
      features: ['Algoritma AI advanced', 'Backtesting lengkap', 'Risk management otomatis', 'Multi timeframe analysis', 'Dashboard real-time', 'Support 24/7']
    },
    {
      id: 'prod-003',
      name: 'Jurnal Trading',
      type: 'credentials',
      price: 199000,
      commission_rate: 15,
      description: 'Platform jurnal trading untuk tracking dan analisis performa trading Anda',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      features: ['Track semua trades', 'Analytics mendalam', 'Performance metrics', 'Export reports', 'Cloud sync', 'Mobile app access']
    },
    {
      id: 'prod-004',
      name: 'Position Size Calculator',
      type: 'credentials',
      price: 149000,
      commission_rate: 10,
      description: 'Kalkulator canggih untuk menghitung position size yang aman dan optimal',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500&h=300&fit=crop',
      features: ['Risk calculator', 'Multi currency support', 'Forex, Crypto, Stocks', 'Saved configurations', 'Mobile responsive', 'Real-time rates']
    }
  ]

  for (const p of products) {
    await sql`
      INSERT INTO products (id, name, type, price, commission_rate, description, image, features)
      VALUES (${p.id}, ${p.name}, ${p.type}, ${p.price}, ${p.commission_rate}, ${p.description}, ${p.image}, ${JSON.stringify(p.features)})
      ON CONFLICT (id) DO UPDATE SET
        price = EXCLUDED.price,
        commission_rate = EXCLUDED.commission_rate,
        features = EXCLUDED.features
    `
  }
  console.log('✅ Products seeded!')

  console.log('🎉 Database seeding complete!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
