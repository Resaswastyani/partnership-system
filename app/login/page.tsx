'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Login gagal')
        setLoading(false)
        return
      }

      // Save user info to localStorage for UI
      localStorage.setItem('auth_user', JSON.stringify(data.user))

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Animated Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px]" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/fbl-logo.png"
              alt="FBL Partnership"
              width={48}
              height={48}
              className="w-auto h-12 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base tracking-widest">FBL</span>
              <span className="text-accent text-xs font-semibold tracking-wider">PARTNERSHIP</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden glow-effect">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang</h1>
            <p className="text-gray-400 mb-8 text-sm">Masuk ke akun affiliate Anda dan mulai hasilkan magis.</p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl"
              >
                <p className="text-destructive text-sm text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 text-sm ml-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 font-medium mb-2 text-sm ml-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative w-5 h-5 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-primary transition-colors">
                    <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer peer" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-primary hover:text-white transition-colors">
                  Lupa password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Memproses...' : 'Masuk Dashboard'}
              </button>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">🔑 Demo Credentials</p>
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">👤 Member</p>
                  <p className="text-primary text-xs font-mono">affiliate@fbl.com</p>
                  <p className="text-primary text-xs font-mono">demo123</p>
                </div>
                <div className="h-px bg-white/5" />
                <div className="space-y-1">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">⚙️ Admin FBL</p>
                  <p className="text-amber-400 text-xs font-mono">admin@fbl.com</p>
                  <p className="text-amber-400 text-xs font-mono">admin123</p>
                </div>
              </div>
            </form>

            {/* Divider */}
            <div className="relative mt-10 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#141029] text-gray-500 rounded-full">atau</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm">
              Belum punya akun?{' '}
              <Link href="/register" className="text-primary hover:text-white font-semibold transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
            <span>←</span> Kembali ke beranda
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
