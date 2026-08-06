import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || '')

    const products = await sql`
      SELECT id, name, type, price, commission_rate as "commissionRate", description, image, features
      FROM products
      ORDER BY created_at ASC
    `

    // Products table doesn't have an active status currently, we'll just add active: true to all
    const formattedProducts = products.map(p => ({
      ...p,
      active: true,
      price: parseInt(p.price),
      commissionRate: parseInt(p.commissionRate)
    }))

    return NextResponse.json({ success: true, products: formattedProducts })

  } catch (error: any) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, price, commissionRate } = await request.json()

    if (!id || price === undefined || commissionRate === undefined) {
      return NextResponse.json({ success: false, error: 'ID, price, and commissionRate required' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL || '')
    await sql`UPDATE products SET price = ${price}, commission_rate = ${commissionRate} WHERE id = ${id}`

    return NextResponse.json({ success: true, message: 'Product updated' })

  } catch (error: any) {
    console.error('Error updating product:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
