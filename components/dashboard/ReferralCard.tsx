'use client'

import { useState, useEffect } from 'react'

export function ReferralCard() {
  const [copied, setCopied] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [user, setUser] = useState<{ referralCode: string, referralLink: string } | null>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      const parsed = JSON.parse(userStr)
      const link = `${window.location.origin}/products?ref=${parsed.referralCode}`
      setUser({
        referralCode: parsed.referralCode,
        referralLink: link
      })
    }
  }, [])

  const handleCopyLink = () => {
    if (user) {
      navigator.clipboard.writeText(user.referralLink)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleCopyCode = () => {
    if (user) {
      navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!user) return null

  return (
    <div className="glass-card rounded-2xl p-8 h-full glow-effect relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
      <div className="space-y-8 relative z-10">
        {/* Header */}
        <div>
          <h3 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
            <span className="text-primary">🔗</span> Kode Referral Anda
          </h3>
          <p className="text-gray-400 text-sm">Bagikan link ini ke audience Anda untuk menghasilkan komisi</p>
        </div>

        {/* Referral Code */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-medium">Kode Unik:</p>
          <div className="flex gap-3">
            <div className="flex-1 relative group">
              <input
                type="text"
                readOnly
                value={user.referralCode}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-primary transition-colors group-hover:border-white/20"
              />
            </div>
            <button
              onClick={handleCopyCode}
              className={`px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                copied 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]'
              }`}
            >
              {copied ? '✓ Tersalin' : 'Salin Kode'}
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm font-medium">Link Referral:</p>
          <div className="flex gap-3">
            <div className="flex-1 relative group">
              <input
                type="text"
                readOnly
                value={user.referralLink}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-accent transition-colors overflow-hidden text-ellipsis group-hover:border-white/20"
              />
            </div>
            <button
              onClick={handleCopyLink}
              className={`px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                copiedLink
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-accent/20 text-accent border border-accent/50 hover:bg-accent/30 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]'
              }`}
            >
              {copiedLink ? '✓ Tersalin' : 'Salin Link'}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4 font-medium">Bagikan langsung ke:</p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`https://wa.me/?text=Dapatkan produk trading premium FBL: ${user.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] text-center px-4 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-colors text-sm font-semibold"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Cek produk trading FBL: ${user.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] text-center px-4 py-3 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-xl hover:bg-sky-500/20 hover:border-sky-500/40 transition-colors text-sm font-semibold"
            >
              X / Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${user.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] text-center px-4 py-3 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl hover:bg-blue-600/20 hover:border-blue-600/40 transition-colors text-sm font-semibold"
            >
              Facebook
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'FBL Partnership',
                    text: 'Bergabunglah dengan program afiliasi FBL',
                    url: user.referralLink
                  })
                }
              }}
              className="flex-1 min-w-[120px] text-center px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary/20 hover:border-primary/40 transition-colors text-sm font-semibold"
            >
              Lainnya...
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
