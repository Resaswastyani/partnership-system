'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [buyerState, setBuyerState] = useState<any>(null)
  const [authState, setAuthState] = useState<any>(null)

  useEffect(() => {
    const buyerStr = localStorage.getItem('buyer_user')
    const authStr = localStorage.getItem('auth_user')
    if (buyerStr) setBuyerState(JSON.parse(buyerStr))
    if (authStr) setAuthState(JSON.parse(authStr))
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 bg-[#080b14]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-100 transition-opacity group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative p-1 rounded-xl flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/fbl-logo.png"
                alt="FBL Partnership"
                width={40}
                height={40}
                className="w-auto h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-all duration-300"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="text-white font-black text-base tracking-[0.2em] leading-none mb-1">FBL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-[10px] font-bold tracking-[0.3em] uppercase leading-none">
                PARTNERSHIP
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            <Link
              href="/products"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Produk & Harga
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Cara Kerja
            </Link>
            <Link
              href="/#faq"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
            
            {/* Demo Admin Button inside Desktop Nav */}
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full hover:bg-amber-500/20 transition-all group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:animate-ping" />
              Demo Admin
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex gap-4 items-center">
            {buyerState ? (
              <Link href="/buyer/dashboard" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full border border-white/20 transition-all flex items-center gap-2">
                <span>👤</span> Akun Member
              </Link>
            ) : authState ? (
              <Link href={authState.role === 'admin' ? '/admin' : '/dashboard'} className="px-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-sm font-bold rounded-full transition-all">
                Partner Area
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 text-gray-300 text-sm font-medium hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  Login Partner
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                >
                  Daftar Partner
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t border-white/5">
            <Link href="/products" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
              Produk & Harga
            </Link>
            <Link href="/#how-it-works" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
              Cara Kerja
            </Link>
            <Link href="/#faq" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
              FAQ
            </Link>
            
            <div className="px-4 py-2">
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 w-full py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold rounded-xl hover:bg-amber-500/20 transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Lihat Demo Admin
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2 px-4">
              {buyerState ? (
                <Link href="/buyer/dashboard" className="w-full py-2.5 text-center bg-white/10 text-white text-sm font-bold border border-white/20 rounded-xl hover:bg-white/20 transition-colors">
                  👤 Akun Member
                </Link>
              ) : authState ? (
                <Link href={authState.role === 'admin' ? '/admin' : '/dashboard'} className="w-full py-2.5 text-center bg-primary/20 text-primary text-sm font-bold border border-primary/30 rounded-xl hover:bg-primary/30 transition-colors">
                  Partner Area
                </Link>
              ) : (
                <>
                  <Link href="/login" className="w-full py-2.5 text-center text-white text-sm font-medium border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                    Login Partner
                  </Link>
                  <Link href="/register" className="w-full py-2.5 text-center bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">
                    Daftar Partner
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
