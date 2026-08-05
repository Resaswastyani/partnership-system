import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password, phone, referralCode } = await request.json()

    // Validation
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    const sql = getDb()

    // Check if email already exists
    const existingUser = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Email sudah terdaftar. Silakan login.' },
        { status: 409 }
      )
    }

    // Resolve referrer if referralCode is provided
    let referredById = null
    if (referralCode) {
      const referrer = await sql`SELECT id FROM users WHERE referral_code = ${referralCode}`
      if (referrer.length > 0) {
        referredById = referrer[0].id
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate unique referral code
    const newReferralCode = `FBL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Insert user
    const result = await sql`
      INSERT INTO users (name, email, password, phone, role, referral_code, referred_by_id)
      VALUES (${name}, ${email}, ${hashedPassword}, ${phone}, 'user', ${newReferralCode}, ${referredById})
      RETURNING id, name, email, role, referral_code, created_at
    `

    const user = result[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referral_code,
      }
    })
  } catch (error: any) {
    console.error('Register error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server. Coba lagi nanti.' },
      { status: 500 }
    )
  }
}
