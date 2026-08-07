import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'orderId is required' }, { status: 400 })
    }

    const sql = getDb()

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
        p.description as product_description,
        u.name as buyer_name,
        u.email as buyer_email
      FROM orders o
      JOIN products p ON o.product_id = p.id
      JOIN users u ON o.buyer_id = u.id
      WHERE o.order_id = ${orderId}
    `

    if (orders.length === 0) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    const order = orders[0]

    // We only return success if order is completed
    if (order.status !== 'completed') {
      return NextResponse.json({ success: false, error: 'Pesanan belum selesai diproses' }, { status: 403 })
    }

    return NextResponse.json({
      success: true,
      order
    })
  } catch (error) {
    console.error('Error fetching order details:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch order details' }, { status: 500 })
  }
}
