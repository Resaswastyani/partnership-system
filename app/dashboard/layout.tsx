'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const authUser = localStorage.getItem('auth_user')
    if (!authUser) {
      router.push('/login')
    } else {
      setUser(JSON.parse(authUser))
    }
  }, [router])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      label: 'Referral', 
      href: '/dashboard/referrals', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    },
    { 
      label: 'Komisi', 
      href: '/dashboard/commissions', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: 'Penarikan', 
      href: '/dashboard/payout', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#080b14]/95 backdrop-blur-xl border-r border-white/5 relative">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Logo */}
      <div className="p-6 h-20 flex items-center justify-between z-10">
        <Link href="/dashboard" className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${sidebarCollapsed ? 'mx-auto' : ''}`}>
          <div className="bg-white p-1 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] shrink-0">
            <Image src="/fbl-logo.png" alt="FBL" width={32} height={32} className="w-6 h-6 object-contain" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-black text-sm tracking-[0.2em] leading-none mb-0.5">FBL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-[9px] font-bold tracking-[0.3em] uppercase leading-none">
                PARTNERSHIP
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-2 z-10 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl transition-all duration-300 group relative ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              } ${sidebarCollapsed ? 'p-3 justify-center' : 'px-4 py-3.5'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="member-active-nav"
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                />
              )}
              
              <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 text-primary' : 'group-hover:scale-110 group-hover:text-primary'}`}>
                {item.icon}
              </span>
              
              {!sidebarCollapsed && (
                <span className={`relative z-10 font-medium ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 z-10 border-t border-white/5">
        {!sidebarCollapsed && user && (
          <div className="px-4 py-3 mb-3 bg-white/[0.02] rounded-2xl border border-white/5">
            <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest font-bold">Akun Anda</p>
            <p className="text-white text-sm font-semibold truncate flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {user.name || 'Member Affiliate'}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-all font-medium text-sm group ${sidebarCollapsed ? 'justify-center' : 'justify-center'}`}
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!sidebarCollapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#080b14] flex relative overflow-hidden text-gray-100">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      <div 
        className={`hidden lg:block fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
          sidebarCollapsed ? 'w-24' : 'w-72'
        }`}
      >
        <SidebarContent />
      </div>

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        
        <header className="h-20 bg-[#080b14]/50 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h8m-8 6h16"} />
              </svg>
            </button>

            <div>
              <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide leading-none mb-1">Dashboard Member</h1>
              <p className="text-gray-500 text-xs sm:text-sm">Ringkasan performa affiliate Anda</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors relative group">
              <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(45,212,191,1)] animate-pulse" />
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(139,92,246,0.2)] ml-2">
              {user?.name?.charAt(0).toUpperCase() || 'M'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
