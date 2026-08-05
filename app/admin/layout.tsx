'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const authUser = localStorage.getItem('auth_user')
    if (!authUser) {
      router.push('/login')
    } else {
      setUser(JSON.parse(authUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_user')
    router.push('/')
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Members', href: '/admin/members', icon: '👥' },
    { label: 'Produk', href: '/admin/products', icon: '📦' },
    { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
    { label: 'Payouts', href: '/admin/payouts', icon: '💳' },
  ]

  return (
    <div 
      className="min-h-screen bg-background flex relative overflow-hidden admin-theme"
      style={{
        '--primary': '#fbbf24', // Amber/Gold
        '--accent': '#10b981', // Emerald
      } as React.CSSProperties}
    >
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} glass-card rounded-none border-t-0 border-b-0 border-l-0 transition-all duration-300 flex flex-col fixed h-screen left-0 top-0 z-40`}>
        {/* Logo */}
        <div className="p-4 h-20 border-b border-white/5 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/fbl-logo.png" alt="FBL" width={32} height={32} className="w-8 h-8 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              <div className="hidden lg:block">
                <p className="text-white font-bold text-sm tracking-widest">FBL ADMIN</p>
                <p className="text-accent text-xs font-semibold tracking-wider">SYSTEM</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/20 to-primary/5 text-white border border-primary/30 shadow-[0_0_15px_rgba(251,191,36,0.15)] glow-effect'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                {sidebarOpen && <span className={`font-medium ${isActive ? 'text-white' : ''}`}>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/5 space-y-3 pb-6">
          {sidebarOpen && user && (
            <div className="px-4 py-3 bg-white/[0.02] rounded-xl border border-white/5">
              <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Role</p>
              <p className="text-white text-sm font-semibold truncate">System Admin</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl hover:bg-destructive/20 transition-all font-medium text-sm group"
          >
            <span className="group-hover:scale-110 transition-transform">🚪</span>
            {sidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300 relative z-10`}>
        {/* Top Bar */}
        <div className="bg-background/80 backdrop-blur-md border-b border-white/5 px-8 h-20 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-white font-bold text-xl tracking-wide">FBL Partnership Admin</h1>
            <p className="text-gray-400 text-sm mt-1">System Dashboard</p>
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors relative group">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors relative group">
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(251,191,36,1)]" />
              <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              A
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-8 overflow-y-auto h-[calc(100vh-80px)] scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  )
}
