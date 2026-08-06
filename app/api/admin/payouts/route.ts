import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

// GET: List all payouts (admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'

    const sql = getDb()
    const payouts = await sql`
      SELECT 
        p.*,
        u.name as affiliate_name,
        u.email as affiliate_email
      FROM payouts p
      JOIN users u ON p.affiliate_id = u.id
      ${status !== 'all' ? sql`WHERE p.status = ${status}` : sql``}
      ORDER BY p.created_at DESC
    `

    return NextResponse.json({ success: true, payouts })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST: Approve or reject payout (admin)
export async function POST(request: Request) {
  try {
    const { payoutId, action, notes } = await request.json()

    if (!payoutId || !action) {
      return NextResponse.json({ success: false, error: 'payoutId and action are required' }, { status: 400 })
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: 'action must be approve or reject' }, { status: 400 })
    }

    const sql = getDb()

    // Get payout
    const payouts = await sql`SELECT * FROM payouts WHERE id = ${payoutId}`
    if (payouts.length === 0) {
      return NextResponse.json({ success: false, error: 'Payout not found' }, { status: 404 })
    }
    const payout = payouts[0]

    if (action === 'approve') {
      await sql`
        UPDATE payouts 
        SET status = 'processed', notes = ${notes || null}, processed_at = NOW()
        WHERE id = ${payoutId}
      `
    } else if (action === 'reject') {
      // Refund balance if rejected
      await sql`UPDATE users SET balance = balance + ${payout.amount} WHERE id = ${payout.affiliate_id}`
      await sql`
        UPDATE payouts 
        SET status = 'rejected', notes = ${notes || 'Ditolak oleh admin'}, processed_at = NOW()
        WHERE id = ${payoutId}
      `
    }

    return NextResponse.json({ success: true, message: `Payout ${action === 'approve' ? 'disetujui' : 'ditolak'}` })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
