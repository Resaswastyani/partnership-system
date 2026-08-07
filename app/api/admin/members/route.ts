import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

function getSql() {
  return neon(process.env.DATABASE_URL || '')
}

export async function GET() {
  try {
    const sql = getSql()

    const members = await sql`
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.phone,
        u.status, 
        u.balance as "pendingCommissions",
        (SELECT COUNT(*) FROM users r WHERE r.referred_by_id = u.id) as "totalReferrals",
        (SELECT COALESCE(SUM(commission_amount), 0) FROM transactions t WHERE t.affiliate_id = u.id AND t.status = 'completed') as "totalEarnings"
      FROM users u
      WHERE u.role = 'user' AND u.status != 'deleted'
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

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, status } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'Name, email, and password required' }, { status: 400 })
    }

    const sql = getSql()
    
    // Check if email already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newReferralCode = `FBL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    await sql`
      INSERT INTO users (name, email, phone, password, role, status, referral_code)
      VALUES (${name}, ${email}, ${phone || null}, ${hashedPassword}, 'user', ${status || 'active'}, ${newReferralCode})
    `

    return NextResponse.json({ success: true, message: 'Member created successfully' })

  } catch (error: any) {
    console.error('Error creating member:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, email, phone, status, password } = await request.json()

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const sql = getSql()

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12)
      await sql`
        UPDATE users SET 
          name = COALESCE(${name}, name),
          email = COALESCE(${email}, email),
          phone = COALESCE(${phone}, phone),
          status = COALESCE(${status}, status),
          password = ${hashedPassword}
        WHERE id = ${id}
      `
    } else {
      await sql`
        UPDATE users SET 
          name = COALESCE(${name}, name),
          email = COALESCE(${email}, email),
          phone = COALESCE(${phone}, phone),
          status = COALESCE(${status}, status)
        WHERE id = ${id}
      `
    }

    return NextResponse.json({ success: true, message: 'Member updated successfully' })

  } catch (error: any) {
    console.error('Error updating member:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const sql = getSql()

    // Soft Delete: just change status to 'deleted'
    await sql`UPDATE users SET status = 'deleted' WHERE id = ${id}`

    return NextResponse.json({ success: true, message: 'Member deleted (soft delete)' })

  } catch (error: any) {
    console.error('Error deleting member:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
