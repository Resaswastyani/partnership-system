'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PRODUCTS } from '@/lib/mock-data'
import { formatRupiah } from '@/lib/utils'

export function ProductShowcase() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <p className="text-accent text-sm font-semibold tracking-wider">PRODUK UNGGULAN</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Produk Trading <span className="text-gradient">Terbaik</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Dapatkan komisi dari penjualan produk premium kami dengan nilai konversi tinggi dan terbukti menghasilkan profit bagi member.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Card */}
              <div className="h-full glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col glow-effect">
                <div className="relative z-10 flex-1 flex flex-col space-y-5">
                  {/* Product Image Placeholder (since actual image might be missing, using a stylized box) */}
                  <div className="relative h-48 rounded-xl overflow-hidden bg-white/5 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Badge */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                      {product.type === 'download' ? '📥 Download' : '🔑 Akses Web'}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 pt-4 border-t border-white/5 flex-1">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Commission */}
                  <div className="space-y-3 pt-4 border-t border-white/5 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs uppercase tracking-wider">Harga</span>
                      <span className="text-white font-bold">{formatRupiah(product.price)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-primary/10 rounded-xl p-3 border border-primary/20">
                      <span className="text-primary font-bold text-sm">Komisi</span>
                      <span className="text-primary font-bold text-lg">{product.commissionRate}%</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/products"
                    className="w-full text-center mt-4 px-4 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/btn border border-white/10 hover:border-primary"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 text-lg mb-6">
            Ingin melihat semua produk dan cara memulai?
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300 transform hover:scale-105"
          >
            Jelajahi Semua Produk <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
