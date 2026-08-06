'use client'

import { Activity } from '@/lib/mock-data'
import { motion } from 'framer-motion'

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
}

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  const getIcon = (type: string) => {
    switch (type) {
      case 'signup': return '👤'
      case 'referral': return '🔗'
      case 'commission': return '💰'
      case 'payout': return '📤'
      case 'approval': return '✅'
      case 'product-sale': return '🛒'
      default: return '📌'
    }
  }

  const getIconBg = (type: string) => {
    switch (type) {
      case 'signup': return 'bg-blue-500/15 border-blue-500/25'
      case 'referral': return 'bg-primary/15 border-primary/25'
      case 'commission': return 'bg-emerald-500/15 border-emerald-500/25'
      case 'payout': return 'bg-purple-500/15 border-purple-500/25'
      case 'approval': return 'bg-emerald-500/15 border-emerald-500/25'
      case 'product-sale': return 'bg-pink-500/15 border-pink-500/25'
      default: return 'bg-white/10 border-white/20'
    }
  }

  const formatTime = (date?: Date) => {
    if (!date || !(date instanceof Date)) {
      return ''
    }
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes}m yang lalu`
    if (hours < 24) return `${hours}j yang lalu`
    return `${days}h yang lalu`
  }

  return (
    <div className="space-y-3">
      {displayActivities.map((activity, idx) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="flex gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/5 transition-all border border-white/5 hover:border-white/10 group"
        >
          <div className={`text-xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl border ${getIconBg(activity.type)} group-hover:scale-110 transition-transform`}>
            {getIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-sm text-white group-hover:text-primary transition-colors truncate">{activity.title}</p>
              <div className="flex items-center gap-2 shrink-0">
                {activity.status && (
                  <span className={`text-xs px-2 py-1 rounded-full font-bold border ${
                    activity.status === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : activity.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {activity.status === 'success' ? '✓' : activity.status === 'pending' ? '⏳' : '✕'}
                  </span>
                )}
                <span className="text-xs text-gray-500 whitespace-nowrap">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
            {activity.amount && (
              <p className="text-xs font-bold text-primary mt-1.5">
                Rp {activity.amount.toLocaleString('id-ID')}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
