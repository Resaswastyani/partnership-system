'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function DashboardLayout({
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
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Referral', href: '/dashboard/referrals', icon: '🔗' },
    { label: 'Komisi', href: '/dashboard/commissions', icon: '💰' },
    { label: 'Withdraw', href: '/dashboard/withdraw', icon: '🏦' },
  ]

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#1a2847] to-[#0f172a] border-r border-white/10 transition-all duration-300 flex flex-col fixed h-screen left-0 top-0 z-40`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image src="/fbl-logo.png" alt="FBL" width={32} height={32} className="w-8 h-8" />
              <div className="hidden lg:block">
                <p className="text-white font-bold text-sm">FBL</p>
                <p className="text-[#00d9ff] text-xs">Partner</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {sidebarOpen && user && (
            <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <p className="text-gray-400 text-xs">Logged in as</p>
              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors font-medium text-sm"
          >
            {sidebarOpen ? 'Logout' : '🚪'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-gradient-to-b from-[#1a2847] to-transparent border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-30 backdrop-blur-sm">
          <div>
            <h1 className="text-white font-bold text-xl">FBL Partnership</h1>
            <p className="text-gray-400 text-sm">Member Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#00d9ff]/20 border border-[#00d9ff]/50 flex items-center justify-center text-[#00d9ff] font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto h-[calc(100vh-76px)]">
          {children}
        </main>
      </div>
    </div>
  )
}
