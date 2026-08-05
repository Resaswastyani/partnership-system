import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    const sql = getDb()

    // Find user by email
    const users = await sql`SELECT * FROM users WHERE email = ${email}`
    
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email tidak ditemukan. Silakan daftar terlebih dahulu.' },
        { status: 401 }
      )
    }

    const user = users[0]

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Password salah. Coba lagi.' },
        { status: 401 }
      )
    }

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
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server. Coba lagi nanti.' },
      { status: 500 }
    )
  }
}
