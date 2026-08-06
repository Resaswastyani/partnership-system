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

    // Get balance directly from user record
    const userResult = await sql`SELECT balance FROM users WHERE id = ${userId}`
    const balance = userResult.length > 0 ? (parseInt(userResult[0].balance) || 0) : 0

    // Get total referrals (users where referred_by_id = userId)
    const referralsResult = await sql`
      SELECT COUNT(*) as count FROM users WHERE referred_by_id = ${userId}
    `
    const totalReferrals = parseInt(referralsResult[0].count)

    // Get total commissions earned (sum from transactions - historical)
    const commissionsResult = await sql`
      SELECT SUM(commission_amount) as total FROM transactions WHERE affiliate_id = ${userId}
    `
    const totalEarnings = parseInt(commissionsResult[0].total) || 0

    return NextResponse.json({
      success: true,
      stats: {
        totalReferrals,
        totalEarnings,
        balance
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 })
  }
}
