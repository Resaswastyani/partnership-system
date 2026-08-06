import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || '')

    // Get total members (role = user)
    const membersRes = await sql`SELECT COUNT(*) as count FROM users WHERE role = 'user'`
    const totalMembers = parseInt(membersRes[0].count)

    // Get total referrals (users registered with a referred_by_id)
    const referralsRes = await sql`SELECT COUNT(*) as count FROM users WHERE referred_by_id IS NOT NULL`
    const totalReferrals = parseInt(referralsRes[0].count)

    // Get total pending payouts
    const payoutsRes = await sql`SELECT COALESCE(SUM(amount), 0) as total FROM payouts WHERE status = 'pending' OR status = 'approved'`
    const totalCommissionsPending = parseInt(payoutsRes[0].total)

    // Get total revenue (sum of amount from settled/capture orders)
    const revenueRes = await sql`SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status IN ('settlement', 'capture', 'settled')`
    const totalRevenue = parseInt(revenueRes[0].total)

    // Get recent activities (last 5 users and last 5 payouts)
    const recentUsers = await sql`SELECT id, name, created_at, 'user_joined' as type FROM users WHERE role = 'user' ORDER BY created_at DESC LIMIT 5`
    const recentPayouts = await sql`
      SELECT p.id, u.name, p.amount, p.created_at, 'payout_requested' as type 
      FROM payouts p 
      JOIN users u ON p.affiliate_id = u.id 
      ORDER BY p.created_at DESC LIMIT 5
    `
    
    // Recent transactions
    const recentTransactions = await sql`
      SELECT t.id, u.name, t.amount, t.created_at, 'transaction_completed' as type
      FROM transactions t
      JOIN users u ON t.buyer_id = u.id
      ORDER BY t.created_at DESC LIMIT 5
    `

    let activities = [...recentUsers, ...recentPayouts, ...recentTransactions]
    activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    activities = activities.slice(0, 8)

    return NextResponse.json({
      success: true,
      stats: {
        totalMembers,
        totalReferrals,
        totalCommissionsPending,
        totalRevenue
      },
      activities: activities.map(act => ({
        id: act.id,
        user: act.name,
        type: act.type,
        amount: act.amount,
        time: act.created_at
      }))
    })

  } catch (error: any) {
    console.error('Error fetching admin dashboard stats:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
