import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const affiliateId = searchParams.get('affiliateId')

    if (!affiliateId) {
      return NextResponse.json({ success: false, error: 'affiliateId is required' }, { status: 400 })
    }

    const sql = getDb()
    const payouts = await sql`
      SELECT * FROM payouts WHERE affiliate_id = ${affiliateId}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ success: true, payouts })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
