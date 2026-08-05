import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json()

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate unique referral code
    const referralCode = `FBL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Insert user
    const result = await sql`
      INSERT INTO users (name, email, password, phone, role, referral_code)
      VALUES (${name}, ${email}, ${hashedPassword}, ${phone}, 'user', ${referralCode})
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
