import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
// @ts-ignore
import midtransClient from 'midtrans-client'

const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
})

export async function POST(request: Request) {
  try {
    const { productId, buyerId } = await request.json()

    if (!productId || !buyerId) {
      return NextResponse.json({ success: false, error: 'productId and buyerId are required' }, { status: 400 })
    }

    const sql = getDb()

    // Get product
    const products = await sql`SELECT * FROM products WHERE id = ${productId}`
    if (products.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    const product = products[0]

    // Get buyer
    const buyers = await sql`SELECT * FROM users WHERE id = ${buyerId}`
    if (buyers.length === 0) {
      return NextResponse.json({ success: false, error: 'Buyer not found' }, { status: 404 })
    }
    const buyer = buyers[0]

    // Determine affiliate
    let affiliateId = null
    let commissionAmount = 0
    if (buyer.referred_by_id) {
      affiliateId = buyer.referred_by_id
      commissionAmount = Math.floor(product.price * (product.commission_rate / 100))
    }

    // Generate unique order_id
    const orderId = `FBL-${Date.now()}-${buyerId}`

    // Create order in DB
    await sql`
      INSERT INTO orders (order_id, buyer_id, product_id, amount, status, affiliate_id, commission_amount)
      VALUES (${orderId}, ${buyerId}, ${productId}, ${product.price}, 'pending', ${affiliateId}, ${commissionAmount})
    `

    // Create Midtrans Snap transaction
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: product.price
      },
      item_details: [{
        id: product.id,
        price: product.price,
        quantity: 1,
        name: product.name
      }],
      customer_details: {
        first_name: buyer.name,
        email: buyer.email,
        phone: buyer.phone || ''
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?payment=success`
      }
    }

    const snapToken = await snap.createTransaction(parameter)

    // Save snap_token to order
    await sql`UPDATE orders SET snap_token = ${snapToken.token} WHERE order_id = ${orderId}`

    return NextResponse.json({
      success: true,
      snapToken: snapToken.token,
      orderId
    })
  } catch (error: any) {
    console.error('Payment create error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Failed to create payment' }, { status: 500 })
  }
}
