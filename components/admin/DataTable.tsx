'use client'

import { useState } from 'react'

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
  actions?: {
    label: string
    onClick: (row: any) => void
  }[]
}

export function DataTable({ columns, data, onRowClick, actions }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')

  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
        />
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer hover:text-white hover:bg-white/5 transition-colors' : ''
                  } ${col.width || ''}`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <span className={`text-xs transition-colors ${sortKey === col.key ? 'text-primary' : 'text-gray-600'}`}>
                        {sortKey === col.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sortedData.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {actions.map(action => (
                        <button
                          key={action.label}
                          onClick={(e) => {
                            e.stopPropagation()
                            action.onClick(row)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 text-xs font-bold transition-all"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p className="font-medium">Tidak ada data yang ditemukan</p>
          <p className="text-sm mt-1">Coba ubah kata kunci pencarian</p>
        </div>
      )}

      {sortedData.length > 0 && (
        <div className="flex justify-between items-center pt-2">
          <p className="text-xs text-gray-500">
            Menampilkan <span className="text-white font-semibold">{sortedData.length}</span> dari <span className="text-white font-semibold">{data.length}</span> data
          </p>
        </div>
      )}
    </div>
  )
}
