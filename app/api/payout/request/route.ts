import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { affiliateId, amount, bankName, accountNumber, accountName } = await request.json()

    if (!affiliateId || !amount || !bankName || !accountNumber || !accountName) {
      return NextResponse.json({ success: false, error: 'Semua field harus diisi' }, { status: 400 })
    }

    if (amount < 50000) {
      return NextResponse.json({ success: false, error: 'Minimum penarikan Rp 50.000' }, { status: 400 })
    }

    const sql = getDb()

    // Check affiliate balance
    const users = await sql`SELECT balance FROM users WHERE id = ${affiliateId}`
    if (users.length === 0) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const balance = users[0].balance
    if (balance < amount) {
      return NextResponse.json({ 
        success: false, 
        error: `Saldo tidak mencukupi. Saldo Anda: Rp ${balance.toLocaleString()}` 
      }, { status: 400 })
    }

    // Deduct balance
    await sql`UPDATE users SET balance = balance - ${amount} WHERE id = ${affiliateId}`

    // Create payout request
    const result = await sql`
      INSERT INTO payouts (affiliate_id, amount, bank_name, account_number, account_name, status)
      VALUES (${affiliateId}, ${amount}, ${bankName}, ${accountNumber}, ${accountName}, 'pending')
      RETURNING id, amount, bank_name, account_number, status, created_at
    `

    return NextResponse.json({
      success: true,
      payout: result[0],
      message: 'Permintaan payout berhasil dikirim. Admin akan memproses dalam 1-3 hari kerja.'
    })
  } catch (error: any) {
    console.error('Payout request error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
