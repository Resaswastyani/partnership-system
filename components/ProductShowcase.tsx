'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/mock-data'

export function ProductShowcase() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f172a] to-[#1a2847]/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg">
            <p className="text-[#00d9ff] text-sm font-semibold">PRODUK UNGGULAN</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Produk Trading Terbaik
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dapatkan komisi dari penjualan 4 produk premium kami dengan nilai tinggi dan conversion rate yang terbukti.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6 hover:border-[#00d9ff]/50 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-[#00d9ff]/20">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/0 via-[#00d9ff]/0 to-[#00d9ff]/0 group-hover:from-[#00d9ff]/10 group-hover:via-[#00d9ff]/5 group-hover:to-[#00d9ff]/0 transition-all duration-300"></div>

                <div className="relative z-10 space-y-4">
                  {/* Product Image */}
                  <div className="relative h-40 rounded-lg overflow-hidden bg-gradient-to-br from-[#00d9ff]/10 to-[#8b5cf6]/10 border border-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30">
                      {product.type === 'download' ? '📥 Download' : '🔑 Akses Web'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg">{product.name}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                        <span className="text-[#00d9ff] mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Commission */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Harga Produk:</span>
                      <span className="text-white font-bold">{(product.price / 1000).toLocaleString()}K</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#00d9ff]/10 rounded-lg p-3">
                      <span className="text-[#00d9ff] font-bold text-sm">Komisi Anda:</span>
                      <span className="text-[#00d9ff] font-bold">{product.commissionRate}%</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/products"
                    className="w-full block text-center mt-4 px-4 py-3 bg-[#00d9ff] text-[#0f172a] font-bold rounded-lg hover:bg-[#00bfff] transition-colors group/btn"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-300 text-lg">
            Ingin melihat semua produk dan cara memulai?
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00bfff] text-[#0f172a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00d9ff]/50 transition-all duration-300 transform hover:scale-105"
          >
            Jelajahi Semua Produk →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
