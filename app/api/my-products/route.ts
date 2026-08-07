import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 })
    }

    const sql = getDb()

    // Fetch all completed orders for this user
    // Join with products table to get product details
    const orders = await sql`
      SELECT 
        o.order_id, 
        o.status, 
        o.license_code, 
        o.license_expires_at, 
        o.created_at as purchase_date,
        p.id as product_id,
        p.name as product_name,
        p.type as product_type,
        p.image as product_image,
        p.description as product_description
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.buyer_id = ${userId} AND o.status = 'completed'
      ORDER BY o.created_at DESC
    `

    return NextResponse.json({
      success: true,
      orders
    })
  } catch (error) {
    console.error('Error fetching my products:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}
