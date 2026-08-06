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
    const { productId, buyerId, name, email, phone, refCode } = await request.json()

    if (!productId) {
      return NextResponse.json({ success: false, error: 'productId is required' }, { status: 400 })
    }
    
    // We need either a buyerId OR (name and email)
    if (!buyerId && (!name || !email)) {
      return NextResponse.json({ success: false, error: 'Guest checkout requires name and email' }, { status: 400 })
    }

    const sql = getDb()

    // Get product
    const products = await sql`SELECT * FROM products WHERE id = ${productId}`
    if (products.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    const product = products[0]

    let finalBuyerId = buyerId
    let finalBuyer = null
    let affiliateId = null
    let commissionAmount = 0

    // Resolve affiliate ID from refCode if provided
    if (refCode) {
      const affiliates = await sql`SELECT id FROM users WHERE referral_code = ${refCode}`
      if (affiliates.length > 0) {
        affiliateId = affiliates[0].id
      }
    }

    if (buyerId) {
      // Logged-in user
      const buyers = await sql`SELECT * FROM users WHERE id = ${buyerId}`
      if (buyers.length === 0) return NextResponse.json({ success: false, error: 'Buyer not found' }, { status: 404 })
      finalBuyer = buyers[0]
      // Use existing referred_by_id if they have one and no direct refCode was provided
      if (!affiliateId && finalBuyer.referred_by_id) {
        affiliateId = finalBuyer.referred_by_id
      }
    } else {
      // Guest Checkout Flow
      const existingUsers = await sql`SELECT * FROM users WHERE email = ${email}`
      if (existingUsers.length > 0) {
        finalBuyerId = existingUsers[0].id
        finalBuyer = existingUsers[0]
        if (!affiliateId && finalBuyer.referred_by_id) {
          affiliateId = finalBuyer.referred_by_id
        }
      } else {
        // Create new guest user
        const newUsers = await sql`
          INSERT INTO users (name, email, password, phone, role, referred_by_id)
          VALUES (${name}, ${email}, 'guest', ${phone || null}, 'customer', ${affiliateId})
          RETURNING *
        `
        finalBuyerId = newUsers[0].id
        finalBuyer = newUsers[0]
      }
    }

    // Calculate commission
    if (affiliateId) {
      commissionAmount = Math.floor(product.price * (product.commission_rate / 100))
    }

    // Generate unique order_id
    const orderId = `FBL-${Date.now()}-${String(finalBuyerId).substring(0,8)}`

    // Create order in DB
    await sql`
      INSERT INTO orders (order_id, buyer_id, product_id, amount, status, affiliate_id, commission_amount)
      VALUES (${orderId}, ${finalBuyerId}, ${productId}, ${product.price}, 'pending', ${affiliateId}, ${commissionAmount})
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
        first_name: finalBuyer.name,
        email: finalBuyer.email,
        phone: finalBuyer.phone || ''
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
