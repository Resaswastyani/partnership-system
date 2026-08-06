'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  // On desktop default open, on mobile default closed. 
  // We'll manage this with standard classes but track state for mobile offcanvas.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const authUser = localStorage.getItem('auth_user')
    if (!authUser) {
      router.push('/login')
    } else {
      try {
        setUser(JSON.parse(authUser))
      } catch (e) {
        console.error('Failed to parse auth_user from localStorage', e)
        localStorage.removeItem('auth_user')
        router.push('/login')
      }
    }
  }, [router])

  // Close mobile menu on route change
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
      href: '/admin', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      label: 'Members', 
      href: '/admin/members', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      label: 'Produk', 
      href: '/admin/products', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      label: 'Analytics', 
      href: '/admin/analytics', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    { 
      label: 'Payouts', 
      href: '/admin/payouts', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#080b14]/95 backdrop-blur-xl border-r border-white/5 relative">
      {/* Background ambient light for sidebar */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Logo */}
      <div className="p-6 h-20 flex items-center justify-between z-10">
        <Link href="/admin" className={`flex items-center gap-3 transition-opacity hover:opacity-80 ${sidebarCollapsed ? 'mx-auto' : ''}`}>
          <div className="bg-white p-1 rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.3)] shrink-0">
            <Image src="/fbl-logo.png" alt="FBL" width={32} height={32} className="w-6 h-6 object-contain" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-white font-black text-sm tracking-[0.2em] leading-none mb-0.5">FBL ADMIN</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-[9px] font-bold tracking-[0.3em] uppercase leading-none">
                SYSTEM
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
              {/* Active Background Glow */}
              {isActive && (
                <motion.div
                  layoutId="admin-active-nav"
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-2xl shadow-[0_0_15px_rgba(251,191,36,0.15)]"
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
            <p className="text-gray-500 text-[10px] mb-1 uppercase tracking-widest font-bold">Role</p>
            <p className="text-white text-sm font-semibold truncate flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              System Admin
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
    <div 
      className="min-h-screen bg-[#080b14] flex relative overflow-hidden admin-theme text-gray-100"
      style={{
        '--primary': '#fbbf24', // Amber/Gold
        '--accent': '#10b981', // Emerald
      } as React.CSSProperties}
    >
      {/* Ambient background glow for the whole layout */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Mobile Overlay & Sidebar ── */}
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

      {/* ── Desktop Sidebar ── */}
      <div 
        className={`hidden lg:block fixed inset-y-0 left-0 z-40 transition-all duration-300 ${
          sidebarCollapsed ? 'w-24' : 'w-72'
        }`}
      >
        <SidebarContent />
      </div>

      {/* ── Main Content Area ── */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        
        {/* Top Bar */}
        <header className="h-20 bg-[#080b14]/50 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            
            {/* Desktop sidebar toggle */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h8m-8 6h16"} />
              </svg>
            </button>

            <div>
              <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide leading-none mb-1">FBL Admin</h1>
              <p className="text-gray-500 text-xs sm:text-sm">System Control Panel</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors relative group">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors relative group">
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(251,191,36,1)] animate-pulse" />
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)] ml-2">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
