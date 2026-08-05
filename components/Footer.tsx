'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/fbl-logo.png"
                alt="FBL Partnership"
                width={40}
                height={40}
                className="w-auto h-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]"
              />
              <div>
                <p className="text-white font-bold tracking-widest text-sm">FBL PARTNERSHIP</p>
                <p className="text-accent text-xs font-semibold tracking-wider">Forex For Better Living</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sistem afiliasi terpercaya untuk menghasilkan komisi dari produk trading premium. Bergabunglah dengan ribuan affiliate sukses.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                {
                  label: 'Twitter',
                  icon: <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                },
                {
                  label: 'Facebook',
                  icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                },
                {
                  label: 'LinkedIn',
                  icon: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                }
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all"
                >
                  <span className="sr-only">{label}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">{icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-5">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Produk</h3>
            <ul className="space-y-3">
              {['Materi Profesional Trading', 'EA Robot Trading FBL', 'Jurnal Trading', 'Position Size Calculator'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-primary rounded-full transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="space-y-5">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Perusahaan</h3>
            <ul className="space-y-3">
              {['Tentang Kami', 'Blog', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-accent rounded-full transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-5">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="glass-card rounded-xl p-4 hover:border-white/10 transition-all">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Email</p>
                <a href="mailto:support@forexforbetterliving.com" className="text-accent hover:text-white transition-colors text-sm font-medium">
                  support@fbl.com
                </a>
              </div>
              <div className="glass-card rounded-xl p-4 hover:border-white/10 transition-all">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">WhatsApp</p>
                <a href="https://wa.me/62" className="text-accent hover:text-white transition-colors text-sm font-medium">
                  +62 XXX XXXX XXXX
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2024 <span className="text-gray-400 font-medium">FBL Partnership</span>. PT Akademi Keuangan Nusantara. Semua hak dilindungi.
          </p>
          <div className="flex gap-6">
            {['Kebijakan Privasi', 'Syarat Layanan', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
