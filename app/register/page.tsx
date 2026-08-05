'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Harap isi semua field')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok')
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }

    if (!formData.agreeTerms) {
      setError('Anda harus menyetujui syarat dan ketentuan')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Pendaftaran gagal')
        setLoading(false)
        return
      }

      // Save user info to localStorage for UI
      localStorage.setItem('auth_user', JSON.stringify(data.user))
      
      router.push('/dashboard')
    } catch (err) {
      setError('Gagal terhubung ke server. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden py-12">
      {/* Animated Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px]" 
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
            <h1 className="text-3xl font-bold text-white mb-2">Daftar Sekarang</h1>
            <p className="text-gray-400 mb-8 text-sm">Mulai hasilkan komisi dari hari ini dan kembangkan sayap Anda.</p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl"
              >
                <p className="text-destructive text-sm text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5 text-xs ml-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmad Trader"
                  className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5 text-xs ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5 text-xs ml-1">No. WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 812 xxxx xxxx"
                  className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5 text-xs ml-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] text-sm"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5 text-xs ml-1">Konfirmasi</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white/10 transition-all focus:shadow-[0_0_15px_rgba(139,92,246,0.3)] text-sm"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-3 group">
                <div className="relative w-5 h-5 mt-0.5 rounded border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="opacity-0 absolute w-full h-full cursor-pointer peer"
                  />
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  Saya setuju dengan{' '}
                  <a href="#" className="text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-white">
                    syarat dan ketentuan
                  </a>
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Sedang mendaftar...' : 'Buat Akun Sekarang'}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-400 mt-8 text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-primary hover:text-white font-semibold transition-colors">
                Masuk di sini
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
