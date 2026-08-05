'use client'

import { Activity } from '@/lib/mock-data'

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
}

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems)

  const getIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return '👤'
      case 'referral':
        return '🔗'
      case 'commission':
        return '💰'
      case 'payout':
        return '📤'
      case 'approval':
        return '✅'
      case 'product-sale':
        return '🛒'
      default:
        return '📌'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Baru saja'
    if (minutes < 60) return `${minutes}m yang lalu`
    if (hours < 24) return `${hours}h yang lalu`
    return `${days}d yang lalu`
  }

  return (
    <div className="space-y-4">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
          <div className="text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {getIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm text-foreground truncate">{activity.title}</p>
              {activity.status && (
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-500/20 text-green-300' :
                  activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {activity.status === 'success' ? '✓' : activity.status === 'pending' ? '◐' : '✕'}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
            {activity.amount && (
              <p className="text-xs font-semibold text-cyan-400 mt-1">
                Rp {activity.amount.toLocaleString('id-ID')}
              </p>
            )}
            <p className="text-xs text-muted-foreground/60 mt-1">{formatTime(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
