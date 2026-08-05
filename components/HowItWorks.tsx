'use client'

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
      title: 'Dapatkan Kode Referral',
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
      description: 'Dapatkan komisi 2-5% tergantung produk yang terjual. Tracking real-time di dashboard Anda.',
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

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg">
            <p className="text-[#00d9ff] text-sm font-semibold">CARA KERJA</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Langkah Mudah Mulai Earning
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sistem kami dirancang untuk semudah mungkin. Ikuti 4 langkah sederhana dan mulai hasilkan komisi.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-4 w-8 h-1 bg-gradient-to-r from-[#00d9ff] to-transparent"></div>
              )}

              {/* Card */}
              <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/30 rounded-xl p-6 hover:border-[#00d9ff] transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#00bfff] flex items-center justify-center text-[#0f172a] font-bold text-xl mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg">
            <p className="text-[#10b981] text-sm font-semibold">KEUNGGULAN KAMI</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Fitur-Fitur Unggulan
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-white/10 rounded-xl p-6 hover:border-[#10b981]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#10b981]/20"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto mt-32 bg-gradient-to-r from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/30 rounded-2xl p-12 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap untuk Mulai Earning?
        </h3>
        <p className="text-gray-300 text-lg mb-8">
          Bergabunglah dengan ribuan affiliate partner FBL dan mulai hasilkan komisi hari ini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-8 py-4 bg-[#00d9ff] text-[#0f172a] font-bold rounded-lg hover:bg-[#00bfff] transition-colors inline-block"
          >
            Daftar Sekarang - Gratis!
          </a>
          <a
            href="/login"
            className="px-8 py-4 border-2 border-[#00d9ff] text-white font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-colors inline-block"
          >
            Sudah Punya Akun? Login
          </a>
        </div>
      </section>
    </div>
  )
}
