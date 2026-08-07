'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [buyer, setBuyer] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('buyer_user')
    if (stored) {
      setBuyer(JSON.parse(stored))
    }
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('buyer_user')
    router.push('/buyer/login')
  }

  // Don't show header on login/register pages
  const isAuthPage = pathname === '/buyer/login' || pathname === '/buyer/register'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {!isAuthPage && (
        <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/products" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-black text-black text-sm group-hover:scale-110 transition-transform">
                F
              </div>
              <span className="font-bold text-white text-sm">FBL <span className="text-primary">Member</span></span>
            </Link>

            {/* Nav */}
            <nav className="hidden sm:flex items-center gap-1">
              <Link href="/buyer/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === '/buyer/dashboard'
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                🏠 Dashboard
              </Link>
              <Link href="/products"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                🛍️ Produk
              </Link>
            </nav>

            {/* User */}
            {buyer ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold">
                    {buyer.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-white text-xs font-medium">{buyer.name?.split(' ')[0]}</span>
                </div>
                <button onClick={handleLogout}
                  className="px-3 py-1.5 text-xs text-gray-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl transition-all font-medium"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/buyer/login"
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  Masuk
                </Link>
                <Link href="/buyer/register"
                  className="px-4 py-2 text-xs font-bold text-black bg-primary hover:bg-primary/90 rounded-xl transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Content */}
      <main className={isAuthPage ? '' : 'max-w-6xl mx-auto px-4 sm:px-6 py-8'}>
        {children}
      </main>
    </div>
  )
}
