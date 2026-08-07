import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId diperlukan' }, { status: 400 })
    }

    const sql = getDb()

    const orders = await sql`
      SELECT 
        o.id,
        o.order_id,
        o.status,
        o.amount,
        o.created_at,
        p.id as product_id,
        p.name as product_name,
        p.type as product_type,
        p.description as product_description,
        p.image as product_image,
        COALESCE(p.category, 'Lainnya') as product_category,
        p.features as product_features
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.buyer_id = ${userId}
        AND o.status IN ('completed', 'success', 'paid', 'settlement', 'capture')
      ORDER BY o.created_at DESC
    `

    const products = orders.map(o => ({
      orderId: o.order_id,
      orderDbId: o.id,
      status: o.status,
      amount: parseInt(o.amount),
      purchasedAt: o.created_at,
      product: {
        id: o.product_id,
        name: o.product_name,
        type: o.product_type,
        description: o.product_description,
        image: o.product_image,
        category: o.product_category,
        features: Array.isArray(o.product_features) ? o.product_features : (o.product_features ? JSON.parse(o.product_features) : []),
      }
    }))

    return NextResponse.json({ success: true, products })

  } catch (error: any) {
    console.error('Error fetching buyer products:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
