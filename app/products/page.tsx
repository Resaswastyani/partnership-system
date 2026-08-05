'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/mock-data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function ProductsPage() {
  return (
    <main className="w-full min-h-screen bg-[#0f172a]">
      <Header />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg">
              <p className="text-[#00d9ff] text-sm font-semibold">PRODUK FBL</p>
            </div>
            <h1 className="text-5xl font-bold text-white">
              Semua Produk Trading FBL
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Jelajahi koleksi lengkap produk trading premium kami dengan harga kompetitif dan komisi menarik untuk affiliates.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl overflow-hidden hover:border-[#00d9ff]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00d9ff]/20 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#00d9ff]/10 to-[#8b5cf6]/10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30">
                      {product.type === 'download' ? '📥 Download' : '🔑 Web Access'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>

                  {/* Features */}
                  <div className="space-y-1 mb-4 pb-4 border-b border-white/10">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <p key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                        <span className="text-[#00d9ff] mt-1">✓</span>
                        <span>{feature}</span>
                      </p>
                    ))}
                  </div>

                  {/* Price & Commission */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Harga:</span>
                      <span className="text-white font-bold">{(product.price / 1000).toLocaleString()}K</span>
                    </div>
                    <div className="px-3 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg flex justify-between items-center">
                      <span className="text-[#00d9ff] font-bold text-sm">Komisi Affiliate:</span>
                      <span className="text-[#00d9ff] font-bold">{product.commissionRate}%</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      href="/register"
                      className="flex-1 px-4 py-2 bg-[#00d9ff] text-[#0f172a] font-bold rounded-lg hover:bg-[#00bfff] transition-colors text-center text-sm"
                    >
                      Jual Produk Ini
                    </Link>
                    <button className="px-3 py-2 border border-[#00d9ff]/50 text-[#00d9ff] rounded-lg hover:bg-[#00d9ff]/10 transition-colors text-sm">
                      ℹ️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Comparison */}
          <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Perbandingan Produk</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-gray-400 font-semibold">Fitur</th>
                    {PRODUCTS.map(p => (
                      <th key={p.id} className="text-center py-4 px-4 text-gray-400 font-semibold text-sm">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-gray-300 font-medium">Harga</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="text-center py-4 px-4 text-white font-bold">
                        {(p.price / 1000).toLocaleString()}K
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-gray-300 font-medium">Komisi Affiliate</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="text-center py-4 px-4 text-[#00d9ff] font-bold">
                        {p.commissionRate}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-gray-300 font-medium">Tipe Produk</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="text-center py-4 px-4 text-white">
                        {p.type === 'download' ? 'Download' : 'Web Access'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-300 font-medium"># Fitur</td>
                    {PRODUCTS.map(p => (
                      <td key={p.id} className="text-center py-4 px-4 text-white font-bold">
                        {p.features.length}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Pertanyaan Umum</h2>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <details className="group">
                <summary className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors font-semibold text-white">
                  <span className="group-open:rotate-45 transition-transform">+</span>
                  Bagaimana cara mendapatkan akses produk setelah membeli?
                </summary>
                <div className="px-4 py-3 text-gray-300 text-sm">
                  Untuk produk tipe download, Anda akan mendapat link download langsung setelah checkout. Untuk produk tipe web access, Anda akan menerima login credentials via email.
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors font-semibold text-white">
                  <span className="group-open:rotate-45 transition-transform">+</span>
                  Apakah produk ini mendapat update gratis?
                </summary>
                <div className="px-4 py-3 text-gray-300 text-sm">
                  Ya! Semua produk FBL mendapatkan update gratis seumur hidup (lifetime access) tanpa biaya tambahan.
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors font-semibold text-white">
                  <span className="group-open:rotate-45 transition-transform">+</span>
                  Bagaimana jika saya tidak puas dengan produknya?
                </summary>
                <div className="px-4 py-3 text-gray-300 text-sm">
                  Kami menawarkan garansi uang kembali 100% selama 30 hari jika Anda tidak puas dengan produk kami.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
