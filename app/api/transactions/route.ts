import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { buyerId, productId } = await request.json()

    if (!buyerId || !productId) {
      return NextResponse.json({ success: false, error: 'buyerId and productId are required' }, { status: 400 })
    }

    const sql = getDb()

    // 1. Get product details to know the price and commission rate
    const products = await sql`SELECT * FROM products WHERE id = ${productId}`
    if (products.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    const product = products[0]

    // 2. Get buyer to check if they were referred by someone
    const buyers = await sql`SELECT id, referred_by_id FROM users WHERE id = ${buyerId}`
    if (buyers.length === 0) {
      return NextResponse.json({ success: false, error: 'Buyer not found' }, { status: 404 })
    }
    const buyer = buyers[0]

    // 3. Calculate commission
    let affiliateId = null
    let commissionAmount = 0
    if (buyer.referred_by_id) {
      affiliateId = buyer.referred_by_id
      commissionAmount = Math.floor(product.price * (product.commission_rate / 100))
    }

    // 4. Insert transaction
    const result = await sql`
      INSERT INTO transactions (buyer_id, product_id, amount, commission_amount, affiliate_id, status)
      VALUES (${buyerId}, ${productId}, ${product.price}, ${commissionAmount}, ${affiliateId}, 'completed')
      RETURNING id, amount, commission_amount, affiliate_id, created_at
    `

    return NextResponse.json({
      success: true,
      transaction: result[0],
      message: 'Transaksi berhasil. Komisi telah dibagikan jika memiliki referrer.'
    })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ success: false, error: 'Failed to process transaction' }, { status: 500 })
  }
}
