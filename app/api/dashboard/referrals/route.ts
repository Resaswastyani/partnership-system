import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL || '')

    // Get referrals (orders where this user is the affiliate)
    const referrals = await sql`
      SELECT 
        o.id,
        u.name as "refereeName",
        u.email as "refereeEmail",
        p.name as "productName",
        o.commission_amount as "commission",
        o.amount,
        o.status,
        o.created_at as "createdAt"
      FROM orders o
      JOIN users u ON o.buyer_id = u.id
      JOIN products p ON o.product_id = p.id
      WHERE o.affiliate_id = ${userId}
      ORDER BY o.created_at DESC
    `

    // Map order status to mock status mapping
    // orders: pending, settlement, capture, cancel
    // mock expects: pending, converted, cancelled
    const formattedReferrals = referrals.map(r => {
      let status = 'pending'
      if (['settlement', 'capture', 'settled'].includes(r.status)) status = 'converted'
      if (['cancel', 'deny', 'expire', 'failed'].includes(r.status)) status = 'cancelled'

      return {
        ...r,
        status,
        commission: parseInt(r.commission),
        amount: parseInt(r.amount)
      }
    })

    return NextResponse.json({ success: true, referrals: formattedReferrals })
  } catch (error: any) {
    console.error('Error fetching dashboard referrals:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
