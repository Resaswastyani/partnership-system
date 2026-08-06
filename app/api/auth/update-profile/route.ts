import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { userId, bankName, accountNumber, accountName } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 })
    }

    const sql = getDb()

    await sql`
      UPDATE users
      SET 
        bank_name = ${bankName || null},
        account_number = ${accountNumber || null},
        account_name = ${accountName || null}
      WHERE id = ${userId}
    `

    // Fetch updated user
    const users = await sql`
      SELECT id, name, email, role, referral_code, balance, bank_name, account_number, account_name
      FROM users WHERE id = ${userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const user = users[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referral_code,
        balance: user.balance,
        bankName: user.bank_name,
        accountNumber: user.account_number,
        accountName: user.account_name
      }
    })
  } catch (error: any) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 })
  }
}
