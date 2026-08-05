'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock authentication - redirect to dashboard
        localStorage.setItem('auth_user', JSON.stringify({ email, role: 'user' }))
        router.push('/dashboard')
      } else {
        setError('Please fill in all fields')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0f172a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00d9ff]/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8b5cf6]/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/fbl-logo.png"
              alt="FBL Partnership"
              width={40}
              height={40}
              className="w-auto h-10"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">FBL</span>
              <span className="text-[#00d9ff] text-xs font-semibold">Partnership</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang</h1>
          <p className="text-gray-400 mb-8">Masuk ke akun FBL Partnership Anda</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d9ff] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d9ff] transition-colors"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#00d9ff]" />
                <span className="text-gray-400">Ingat saya</span>
              </label>
              <a href="#" className="text-[#00d9ff] hover:text-[#00bfff] transition-colors">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00d9ff] text-[#0f172a] font-bold rounded-lg hover:bg-[#00bfff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sedang masuk...' : 'Masuk'}
            </button>

            {/* Demo Credentials */}
            <div className="p-3 bg-[#00d9ff]/5 border border-[#00d9ff]/20 rounded-lg">
              <p className="text-gray-400 text-xs mb-2">Demo Credentials:</p>
              <p className="text-white text-xs font-mono">Email: affiliate@forexforbetterliving.com</p>
              <p className="text-white text-xs font-mono">Password: demo123</p>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1a2847] text-gray-400">atau</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#00d9ff] hover:text-[#00bfff] font-semibold transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
