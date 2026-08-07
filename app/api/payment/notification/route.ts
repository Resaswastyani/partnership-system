import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      transaction_id
    } = body

    // ── Verify Signature ──────────────────────────────────────────────────────
    const serverKey = process.env.MIDTRANS_SERVER_KEY!
    const expectedSignature = crypto
      .createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest('hex')

    if (signature_key !== expectedSignature) {
      console.error('Invalid Midtrans signature')
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 403 })
    }

    // ── Determine payment success ─────────────────────────────────────────────
    const isSuccess =
      (transaction_status === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'

    const isFailed =
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'

    const sql = getDb()

    // Get the order
    const orders = await sql`SELECT * FROM orders WHERE order_id = ${order_id}`
    if (orders.length === 0) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }
    const order = orders[0]

    if (isSuccess && order.status !== 'completed') {
      // ── Mark order as completed ─────────────────────────────────────────────
      await sql`
        UPDATE orders 
        SET status = 'completed', midtrans_transaction_id = ${transaction_id}, updated_at = NOW()
        WHERE order_id = ${order_id}
      `

      // ── Record transaction ──────────────────────────────────────────────────
      await sql`
        INSERT INTO transactions (buyer_id, product_id, amount, commission_amount, affiliate_id, status)
        VALUES (${order.buyer_id}, ${order.product_id}, ${order.amount}, ${order.commission_amount}, ${order.affiliate_id}, 'completed')
      `

      // ── Generate License for EA ─────────────────────────────────────────────
      if (order.product_id === 'prod-002') {
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
        const licenseCode = `FBL-AO-${dateStr}-${randomStr}`
        
        // Expires in 30 days
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 30)

        await sql`
          UPDATE orders
          SET license_code = ${licenseCode}, license_expires_at = ${expiresAt}
          WHERE order_id = ${order_id}
        `
        console.log(`✅ Generated EA License ${licenseCode} for order ${order_id}`)
      }

      // ── Credit commission to affiliate balance ──────────────────────────────
      if (order.affiliate_id && order.commission_amount > 0) {
        await sql`
          UPDATE users 
          SET balance = balance + ${order.commission_amount}
          WHERE id = ${order.affiliate_id}
        `
        console.log(`✅ Commission Rp${order.commission_amount} credited to user #${order.affiliate_id}`)
      }

      console.log(`✅ Order ${order_id} completed`)
    } else if (isFailed) {
      await sql`
        UPDATE orders SET status = 'failed', updated_at = NOW()
        WHERE order_id = ${order_id}
      `
      console.log(`❌ Order ${order_id} failed: ${transaction_status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Notification webhook error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
