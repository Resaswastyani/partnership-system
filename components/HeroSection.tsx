'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00d9ff]/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8b5cf6]/20 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg">
                <p className="text-[#00d9ff] text-sm font-semibold">🚀 Sistem Afiliasi Terdepan</p>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Hasilkan Komisi dari
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] via-[#10b981] to-[#f59e0b]"> Produk Trading</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl max-w-lg">
                Bergabunglah dengan ribuan affiliate partner FBL. Dapatkan referral link otomatis, track earnings real-time, dan terima komisi hingga 5% untuk setiap penjualan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/register"
                className="px-8 py-4 bg-[#00d9ff] text-[#0f172a] font-bold rounded-lg hover:bg-[#00bfff] transition-all duration-300 transform hover:scale-105 text-center"
              >
                Mulai Gratis Sekarang
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 border-2 border-[#00d9ff] text-white font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-colors text-center"
              >
                Pelajari Cara Kerja
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-[#00d9ff]">347+</div>
                <p className="text-gray-400 text-sm mt-1">Member Aktif</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#10b981]">3.2M+</div>
                <p className="text-gray-400 text-sm mt-1">Total Komisi Dibayar</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#f59e0b]">34.5%</div>
                <p className="text-gray-400 text-sm mt-1">Conversion Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Floating cards */}
              <div className="space-y-4">
                {/* Card 1 */}
                <div className="transform hover:scale-105 transition-transform duration-300 animate-bounce" style={{ animationDelay: '0s' }}>
                  <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/20 rounded-xl p-4 backdrop-blur-xl hover:border-[#00d9ff]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#00d9ff]/20 flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">Materi Trading</p>
                        <p className="text-[#00d9ff] text-sm font-semibold">Komisi 3%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="transform hover:scale-105 transition-transform duration-300 animate-bounce ml-8" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#10b981]/20 rounded-xl p-4 backdrop-blur-xl hover:border-[#10b981]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#10b981]/20 flex items-center justify-center">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">EA Robot</p>
                        <p className="text-[#10b981] text-sm font-semibold">Komisi 5%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="transform hover:scale-105 transition-transform duration-300 animate-bounce ml-16" style={{ animationDelay: '0.4s' }}>
                  <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#f59e0b]/20 rounded-xl p-4 backdrop-blur-xl hover:border-[#f59e0b]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center">
                        <span className="text-xl">📈</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">Jurnal Trading</p>
                        <p className="text-[#f59e0b] text-sm font-semibold">Komisi 3%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="transform hover:scale-105 transition-transform duration-300 animate-bounce ml-24" style={{ animationDelay: '0.6s' }}>
                  <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#ec4899]/20 rounded-xl p-4 backdrop-blur-xl hover:border-[#ec4899]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#ec4899]/20 flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <p className="text-white font-bold">Position Calc</p>
                        <p className="text-[#ec4899] text-sm font-semibold">Komisi 2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
