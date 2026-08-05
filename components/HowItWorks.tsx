'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Daftar Gratis',
      description: 'Buat akun FBL Partnership dalam hitungan menit. Tidak ada biaya pendaftaran atau komitmen jangka panjang.',
      icon: '📝'
    },
    {
      number: '2',
      title: 'Dapatkan Kode',
      description: 'Sistem kami otomatis membuat kode unik Anda. Copy dan bagikan link referral ke audience Anda.',
      icon: '🔗'
    },
    {
      number: '3',
      title: 'Orang Membeli',
      description: 'Ketika orang menggunakan link Anda dan membeli produk FBL, Anda mendapat credit di sistem kami.',
      icon: '🛍️'
    },
    {
      number: '4',
      title: 'Terima Komisi',
      description: 'Dapatkan komisi hingga 5% tergantung produk yang terjual. Tracking real-time di dashboard Anda.',
      icon: '💰'
    }
  ]

  const features = [
    {
      title: 'Referral Link Otomatis',
      description: 'Sistem kami generate link unik untuk setiap member dengan tracking akurat',
      icon: '⚡'
    },
    {
      title: 'Real-time Dashboard',
      description: 'Pantau semua referral, conversion, dan earnings Anda secara live',
      icon: '📊'
    },
    {
      title: 'Komisi Kompetitif',
      description: 'Komisi hingga 5% per penjualan dengan berbagai tingkat komisi per produk',
      icon: '💎'
    },
    {
      title: 'Pembayaran Tepat Waktu',
      description: 'Terima pembayaran komisi Anda setiap bulan via transfer bank',
      icon: '🏦'
    },
    {
      title: 'Support 24/7',
      description: 'Tim support kami siap membantu Anda kapan saja melalui chat dan email',
      icon: '🤝'
    },
    {
      title: 'Materi Marketing',
      description: 'Akses ke banner, template, dan content marketing untuk mempromosikan produk',
      icon: '📢'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 relative bg-background">
      {/* Background ambient light */}
      <div className="absolute top-[20%] left-0 w-full h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto mb-32 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <p className="text-accent text-sm font-semibold tracking-wider">CARA KERJA</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Langkah Mudah Mulai <span className="text-gradient">Earning</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Sistem kami dirancang untuk semudah mungkin. Ikuti 4 langkah sederhana dan mulai hasilkan komisi.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div variants={itemVariants} key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
              )}

              {/* Card */}
              <div className="glass-card glass-card-hover rounded-2xl p-8 h-full flex flex-col glow-effect">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                    {/* Step Number Badge */}
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto relative z-10 mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <p className="text-emerald-400 text-sm font-semibold tracking-wider">KEUNGGULAN KAMI</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Fitur-Fitur <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">Unggulan</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group glass-card rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-emerald-500/20">{feature.icon}</div>
              <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-1 md:p-[2px] bg-gradient-to-r from-primary via-accent to-primary background-animate overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-30 blur-2xl" />
          <div className="relative bg-background rounded-[22px] p-10 md:p-16 text-center z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Siap untuk Mulai Earning?
            </h3>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan affiliate partner FBL dan mulai hasilkan komisi nyata hari ini. Proses mudah, gratis, dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-105"
              >
                Daftar Sekarang - Gratis!
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                Sudah Punya Akun? Login
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      
      <style>{`
        .background-animate {
          background-size: 400%;
          animation: gradient 5s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
