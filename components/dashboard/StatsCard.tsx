interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: string
  color: 'cyan' | 'green' | 'orange' | 'pink'
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

const colorClasses = {
  cyan: 'from-[#00d9ff]/20 to-transparent border-[#00d9ff]/30 bg-[#00d9ff]/5',
  green: 'from-[#10b981]/20 to-transparent border-[#10b981]/30 bg-[#10b981]/5',
  orange: 'from-[#f59e0b]/20 to-transparent border-[#f59e0b]/30 bg-[#f59e0b]/5',
  pink: 'from-[#ec4899]/20 to-transparent border-[#ec4899]/30 bg-[#ec4899]/5'
}

const iconColors = {
  cyan: 'text-[#00d9ff]',
  green: 'text-[#10b981]',
  orange: 'text-[#f59e0b]',
  pink: 'text-[#ec4899]'
}

export function StatsCard({ title, value, subtitle, icon, color, trend }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 hover:border-opacity-100 transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {trend && (
              <span className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-[#10b981]' : 'text-red-400'}`}>
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`text-3xl ${iconColors[color]} opacity-80`}>{icon}</div>
      </div>
    </div>
  )
}
