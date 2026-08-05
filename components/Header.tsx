'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/fbl-logo.png"
              alt="FBL Partnership"
              width={40}
              height={40}
              className="w-auto h-10"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-widest">FBL</span>
              <span className="text-accent text-xs font-semibold tracking-wider">PARTNERSHIP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            <Link
              href="/#features"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Produk
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Harga
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
            <Link
              href="/login"
              className="px-6 py-2 text-gray-300 text-sm font-medium hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              Daftar Sekarang
            </Link>
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
            <Link href="/#features" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
              Produk
            </Link>
            <Link href="/#pricing" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
              Harga
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
              <Link href="/login" className="w-full py-2.5 text-center text-white text-sm font-medium border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                Login
              </Link>
              <Link href="/register" className="w-full py-2.5 text-center bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-colors">
                Daftar Sekarang
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
