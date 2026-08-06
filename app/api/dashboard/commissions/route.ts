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

    // 1. Get Monthly Data from transactions (status = 'completed')
    const monthlyDataRaw = await sql`
      SELECT 
        TO_CHAR(created_at, 'Mon') as month,
        EXTRACT(MONTH FROM created_at) as month_num,
        SUM(commission_amount) as amount
      FROM transactions
      WHERE affiliate_id = ${userId} AND status = 'completed'
      GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at)
      ORDER BY month_num ASC
    `

    // 2. Get Pending Commissions from payouts
    const pendingRes = await sql`
      SELECT COALESCE(SUM(amount), 0) as pending
      FROM payouts
      WHERE affiliate_id = ${userId} AND status IN ('pending', 'approved')
    `
    const pendingCommissions = parseInt(pendingRes[0].pending)

    // 3. Get Commissions per Product
    const productCommissionsRaw = await sql`
      SELECT 
        p.name as product_name,
        COUNT(t.id) as sales_count,
        SUM(t.commission_amount) as total_commission
      FROM transactions t
      JOIN orders o ON t.order_id = o.id
      JOIN products p ON o.product_id = p.id
      WHERE t.affiliate_id = ${userId} AND t.status = 'completed'
      GROUP BY p.name
      ORDER BY total_commission DESC
    `

    // 4. Get Total Earnings
    const totalEarningsRes = await sql`
      SELECT COALESCE(SUM(commission_amount), 0) as total
      FROM transactions
      WHERE affiliate_id = ${userId} AND status = 'completed'
    `
    const totalEarnings = parseInt(totalEarningsRes[0].total)

    // 5. Get Total Referrals
    const totalReferralsRes = await sql`
      SELECT COUNT(*) as count FROM users WHERE referred_by_id = ${userId}
    `
    const totalReferrals = parseInt(totalReferralsRes[0].count)

    return NextResponse.json({
      success: true,
      stats: {
        totalEarnings,
        pendingCommissions,
        averageCommission: totalReferrals > 0 ? Math.round(totalEarnings / totalReferrals) : 0
      },
      monthlyData: monthlyDataRaw.map(m => ({
        month: m.month,
        amount: parseInt(m.amount),
        status: 'Paid' // For simplicity
      })),
      productCommissions: productCommissionsRaw.map(p => ({
        name: p.product_name,
        salesCount: parseInt(p.sales_count),
        totalCommission: parseInt(p.total_commission)
      }))
    })

  } catch (error: any) {
    console.error('Error fetching dashboard commissions:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
