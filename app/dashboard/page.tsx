'use client'

import { useState, useEffect } from 'react'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ReferralCard } from '@/components/dashboard/ReferralCard'
import { ReferralTable } from '@/components/dashboard/ReferralTable'
import { MOCK_REFERRALS } from '@/lib/mock-data'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const convertedReferrals = MOCK_REFERRALS.filter(r => r.status === 'converted')
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ totalEarnings: 0, totalReferrals: 0, balance: 0 })

  useEffect(() => {
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setUser(parsed)

      // Fetch stats
      fetch(`/api/dashboard/stats?userId=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStats(data.stats)
          }
        })
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden glow-effect">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Selamat datang kembali, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Member'}! 👋</span>
            </h2>
            <p className="text-gray-400">Berikut ringkasan performa afiliasi Anda minggu ini</p>
          </div>
          <div className="text-left md:text-right bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Total Komisi</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Rp {(stats.totalEarnings / 1000).toLocaleString()}K
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Earnings"
            value={`Rp ${(stats.totalEarnings / 1000).toLocaleString()}K`}
            subtitle="Dari semua referral"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            color="cyan"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Saldo Tersedia"
            value={`Rp ${stats.balance.toLocaleString()}`}
            subtitle="Bisa ditarik ke rekening"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Referral"
            value={stats.totalReferrals}
            subtitle="Pendaftar sukses"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
            color="green"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Total Komisi"
            value={`Rp ${stats.totalEarnings.toLocaleString()}`}
            subtitle="Sepanjang waktu"
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            color="pink"
          />
        </motion.div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Referral Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ReferralCard />
        </motion.div>

        {/* Right Column - Quick Stats */}
        <motion.div variants={containerVariants} className="space-y-6">
          {/* Top Products */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
              Produk Terlaris
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-white text-sm font-semibold">EA Robot</p>
                  <p className="text-gray-400 text-xs mt-0.5">15 penjualan</p>
                </div>
                <p className="text-emerald-400 font-bold">Rp 4.5M</p>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-white text-sm font-semibold">Materi Trading</p>
                  <p className="text-gray-400 text-xs mt-0.5">12 penjualan</p>
                </div>
                <p className="text-primary font-bold">Rp 1.2M</p>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-white text-sm font-semibold">Jurnal Trading</p>
                  <p className="text-gray-400 text-xs mt-0.5">8 penjualan</p>
                </div>
                <p className="text-amber-400 font-bold">Rp 960K</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 pb-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Referral berhasil</p>
                  <p className="text-gray-400 text-xs mt-0.5">Eka Prasetya beli Materi Trading</p>
                  <p className="text-gray-500 text-[10px] mt-1.5 font-mono">2 JAM LALU</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 pb-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Komisi diterima</p>
                  <p className="text-gray-400 text-xs mt-0.5">Rp 8,970 dari referral</p>
                  <p className="text-gray-500 text-[10px] mt-1.5 font-mono">1 HARI LALU</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center border border-amber-500/20 text-amber-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">Milestone tercapai</p>
                  <p className="text-gray-400 text-xs mt-0.5">Anda mencapai 45 referral!</p>
                  <p className="text-gray-500 text-[10px] mt-1.5 font-mono">5 HARI LALU</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Referral Table */}
      <motion.div variants={itemVariants}>
        <ReferralTable />
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden p-[1px] bg-gradient-to-r from-primary to-accent">
        <div className="bg-background rounded-[15px] p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 z-0" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-white">Tingkatkan Earning Anda!</h3>
            <p className="text-gray-300">Bagikan referral link Anda ke lebih banyak orang dan raih komisi berlipat ganda.</p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 whitespace-nowrap group transform hover:scale-105">
            Share Sekarang <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
