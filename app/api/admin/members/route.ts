import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || '')

    const members = await sql`
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.status, 
        u.balance as "pendingCommissions",
        (SELECT COUNT(*) FROM users r WHERE r.referred_by_id = u.id) as "totalReferrals",
        (SELECT COALESCE(SUM(commission_amount), 0) FROM transactions t WHERE t.affiliate_id = u.id AND t.status = 'completed') as "totalEarnings"
      FROM users u
      WHERE u.role = 'user'
      ORDER BY u.created_at DESC
    `

    // Convert string counts to integers
    const formattedMembers = members.map(m => ({
      ...m,
      totalReferrals: parseInt(m.totalReferrals),
      totalEarnings: parseInt(m.totalEarnings)
    }))

    return NextResponse.json({ success: true, members: formattedMembers })

  } catch (error: any) {
    console.error('Error fetching admin members:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status required' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL || '')
    await sql`UPDATE users SET status = ${status} WHERE id = ${id}`

    return NextResponse.json({ success: true, message: 'Status updated' })

  } catch (error: any) {
    console.error('Error updating member status:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
