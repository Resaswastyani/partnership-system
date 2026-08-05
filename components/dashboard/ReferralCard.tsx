'use client'

import { useState } from 'react'
import { CURRENT_USER } from '@/lib/mock-data'

export function ReferralCard() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(CURRENT_USER.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-br from-[#1a2847] to-[#0f172a] border border-[#00d9ff]/30 rounded-xl p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-white font-bold text-lg mb-2">Kode Referral Anda</h3>
          <p className="text-gray-400 text-sm">Bagikan link ini untuk menghasilkan komisi</p>
        </div>

        {/* Referral Code */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">Kode Unik:</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                readOnly
                value={CURRENT_USER.referralCode}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(CURRENT_USER.referralCode)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="px-4 py-3 bg-[#00d9ff]/20 border border-[#00d9ff]/50 text-[#00d9ff] font-semibold rounded-lg hover:bg-[#00d9ff]/30 transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">Link Referral:</p>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                readOnly
                value={CURRENT_USER.referralLink}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none overflow-hidden text-ellipsis"
              />
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-3 bg-[#00d9ff]/20 border border-[#00d9ff]/50 text-[#00d9ff] font-semibold rounded-lg hover:bg-[#00d9ff]/30 transition-colors"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">Bagikan ke:</p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`https://wa.me/?text=Dapatkan produk trading premium FBL: ${CURRENT_USER.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-semibold"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Cek produk trading FBL: ${CURRENT_USER.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-semibold"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${CURRENT_USER.referralLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700/20 text-blue-300 border border-blue-600/30 rounded-lg hover:bg-blue-700/30 transition-colors text-sm font-semibold"
            >
              Facebook
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'FBL Partnership',
                    text: 'Bergabunglah dengan program afiliasi FBL',
                    url: CURRENT_USER.referralLink
                  })
                }
              }}
              className="px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors text-sm font-semibold"
            >
              Bagikan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
