import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

function getSql() {
  return neon(process.env.DATABASE_URL || '')
}

export async function GET() {
  try {
    const sql = getSql()

    // Ensure columns exist
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Lainnya'`
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE`

    const products = await sql`
      SELECT 
        id, name, type, price,
        commission_rate as "commissionRate",
        description, image, features,
        COALESCE(category, 'Lainnya') as category,
        COALESCE(active, true) as active
      FROM products
      ORDER BY created_at ASC
    `

    const formattedProducts = products.map(p => ({
      ...p,
      price: parseInt(p.price),
      commissionRate: parseInt(p.commissionRate),
      features: Array.isArray(p.features) ? p.features : (p.features ? JSON.parse(p.features) : []),
      active: p.active === true || p.active === 'true',
    }))

    return NextResponse.json({ success: true, products: formattedProducts })

  } catch (error: any) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { id, name, type, price, commissionRate, description, image, features, category, active } = await request.json()

    if (!name || !type || price === undefined || commissionRate === undefined) {
      return NextResponse.json({ success: false, error: 'Nama, tipe, harga, dan komisi harus diisi' }, { status: 400 })
    }

    const sql = getSql()

    // Ensure columns exist
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'Lainnya'`
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE`

    const productId = id || `prod-${Date.now()}`
    const featuresJson = JSON.stringify(features || [])

    await sql`
      INSERT INTO products (id, name, type, price, commission_rate, description, image, features, category, active)
      VALUES (
        ${productId}, ${name}, ${type}, ${price}, ${commissionRate},
        ${description || ''}, ${image || ''}, ${featuresJson}::jsonb,
        ${category || 'Lainnya'}, ${active !== false}
      )
    `

    return NextResponse.json({ success: true, message: 'Produk berhasil ditambahkan', id: productId })

  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, type, price, commissionRate, description, image, features, category, active } = await request.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID produk diperlukan' }, { status: 400 })
    }

    const sql = getSql()
    const featuresJson = features ? JSON.stringify(features) : null

    if (featuresJson !== null) {
      await sql`
        UPDATE products SET
          name = COALESCE(${name}, name),
          type = COALESCE(${type}, type),
          price = COALESCE(${price}, price),
          commission_rate = COALESCE(${commissionRate}, commission_rate),
          description = COALESCE(${description}, description),
          image = COALESCE(${image}, image),
          features = ${featuresJson}::jsonb,
          category = COALESCE(${category}, category),
          active = COALESCE(${active}, active)
        WHERE id = ${id}
      `
    } else {
      await sql`
        UPDATE products SET
          name = COALESCE(${name}, name),
          type = COALESCE(${type}, type),
          price = COALESCE(${price}, price),
          commission_rate = COALESCE(${commissionRate}, commission_rate),
          description = COALESCE(${description}, description),
          image = COALESCE(${image}, image),
          category = COALESCE(${category}, category),
          active = COALESCE(${active}, active)
        WHERE id = ${id}
      `
    }

    return NextResponse.json({ success: true, message: 'Produk berhasil diperbarui' })

  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID produk diperlukan' }, { status: 400 })
    }

    const sql = getSql()

    // Check if product has orders
    const orders = await sql`SELECT id FROM orders WHERE product_id = ${id} LIMIT 1`
    if (orders.length > 0) {
      // Soft delete: just set active = false
      await sql`UPDATE products SET active = false WHERE id = ${id}`
      return NextResponse.json({ success: true, message: 'Produk dinonaktifkan (ada transaksi terkait)', softDeleted: true })
    }

    await sql`DELETE FROM products WHERE id = ${id}`
    return NextResponse.json({ success: true, message: 'Produk berhasil dihapus' })

  } catch (error: any) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
