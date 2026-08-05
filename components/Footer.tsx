'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <footer className="border-t border-white/5 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-6 md:col-span-1">
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
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants} className="space-y-5">
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
          </motion.div>

          {/* Perusahaan */}
          <motion.div variants={itemVariants} className="space-y-5">
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
          </motion.div>

          {/* Kontak */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Hubungi Kami</h3>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://wa.me/62" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[#25D366]/20 border border-white/10 hover:border-[#25D366]/50 transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#25D366] mb-2 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors">WhatsApp</span>
              </a>
              <a href="#" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C]/50 transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#E1306C] mb-2 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors">Instagram</span>
              </a>
              <a href="#" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2]/50 transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-[#1877F2] mb-2 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors">Facebook</span>
              </a>
              <a href="#" className="group flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/50 transition-all">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-white mb-2 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.97 4.41-2.58 5.92-1.68 1.57-4.05 2.39-6.39 2.22-2.34-.14-4.5-1.26-5.88-3.05-1.39-1.77-1.86-4.14-1.33-6.36.48-2.07 1.84-3.86 3.69-4.79 1.88-.93 4.1-.98 6.01-.2v4.06c-1.09-.54-2.42-.51-3.47.04-1.07.56-1.78 1.67-1.85 2.86-.06 1.15.54 2.28 1.51 2.87.97.6 2.22.68 3.25.26 1.01-.41 1.7-1.31 1.83-2.38.02-.18.02-.37.03-.56V.02h.09z"/>
                </svg>
                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors">TikTok</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-6">
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
        </motion.div>
      </motion.div>
    </footer>
  )
}
