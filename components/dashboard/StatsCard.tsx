import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode | string
  color: 'cyan' | 'green' | 'orange' | 'pink'
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

const colorClasses = {
  cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]',
  green: 'from-emerald-500/10 to-transparent border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  orange: 'from-amber-500/10 to-transparent border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]',
  pink: 'from-pink-500/10 to-transparent border-pink-500/20 hover:border-pink-500/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]'
}

const iconColors = {
  cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  green: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  orange: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  pink: 'text-pink-400 bg-pink-400/10 border-pink-400/20'
}

import { formatRupiah } from '@/lib/utils'

export function StatsCard({ title, value, subtitle, icon, color, trend }: StatsCardProps) {
  // Helper to format the displayed value
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return formatRupiah(val)
    }
    // If already a formatted string, return as is
    return val
  }
  const displayValue = formatValue(value)

  return (
    <div className={`glass-card bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1 tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white tracking-tight">{displayValue}</h3>
            {trend && (
              <span className={`text-sm font-semibold flex items-center gap-0.5 ${trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {trend.direction === 'up' ? '↗' : '↘'} {trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-gray-500 text-xs mt-1.5 font-medium">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${iconColors[color]} transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
