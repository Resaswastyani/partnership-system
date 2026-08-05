'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-transparent backdrop-blur-sm border-b border-white/10">
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
              <span className="text-white font-bold text-sm">FBL</span>
              <span className="text-[#00d9ff] text-xs font-semibold">Partnership</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
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
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-[#00d9ff] text-[#0f172a] text-sm font-bold rounded-lg hover:bg-[#00bfff] transition-colors"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <Link href="/#features" className="block text-gray-300 hover:text-white text-sm font-medium">
              Produk
            </Link>
            <Link href="/#pricing" className="block text-gray-300 hover:text-white text-sm font-medium">
              Harga
            </Link>
            <Link href="/#how-it-works" className="block text-gray-300 hover:text-white text-sm font-medium">
              Cara Kerja
            </Link>
            <Link href="/#faq" className="block text-gray-300 hover:text-white text-sm font-medium">
              FAQ
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" className="px-4 py-2 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-colors">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-[#00d9ff] text-[#0f172a] text-sm font-bold rounded-lg hover:bg-[#00bfff] transition-colors">
                Daftar Sekarang
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
