'use client'

import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { motion, AnimatePresence } from 'framer-motion'
import { formatRupiah } from '@/lib/utils'

interface Member {
  id: string
  name: string
  email: string
  phone?: string
  status: string
  totalReferrals: number
  totalEarnings: number
  pendingCommissions: number
}

interface ActionModal {
  visible: boolean
  type: 'create' | 'edit' | 'approve' | 'suspend' | 'delete' | null
  member: Member | null
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  password: '',
  status: 'active'
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ActionModal>({ visible: false, type: null, member: null })
  const [formData, setFormData] = useState({ ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchMembers = () => {
    setLoading(true)
    fetch('/api/admin/members')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMembers(data.members)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    pending: members.filter(m => m.status === 'pending').length,
    suspended: members.filter(m => m.status === 'suspended').length,
    totalEarnings: members.reduce((sum, m) => sum + m.totalEarnings, 0),
    totalCommissions: members.reduce((sum, m) => sum + m.pendingCommissions, 0)
  }

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM })
    setModal({ visible: true, type: 'create', member: null })
  }

  const openEdit = (member: Member) => {
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone || '',
      password: '', // blank intentionally for edit
      status: member.status
    })
    setModal({ visible: true, type: 'edit', member })
  }

  const closeModal = () => setModal({ visible: false, type: null, member: null })

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      showToast('Nama dan Email harus diisi', 'error')
      return
    }

    if (modal.type === 'create' && (!formData.password || formData.password.length < 6)) {
      showToast('Password minimal 6 karakter', 'error')
      return
    }

    setSaving(true)

    try {
      const isCreate = modal.type === 'create'
      const payload = isCreate 
        ? formData 
        : { id: modal.member?.id, ...formData }

      // If editing and password is empty, don't send it to preserve old password
      if (!isCreate && !payload.password) {
        delete payload.password
      }

      const res = await fetch('/api/admin/members', {
        method: isCreate ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json()
      
      if (data.success) {
        showToast(isCreate ? 'Member berhasil ditambahkan' : 'Member berhasil diperbarui')
        fetchMembers()
        closeModal()
      } else {
        showToast(data.error || 'Gagal menyimpan', 'error')
      }
    } catch (error) {
      showToast('Gagal terhubung ke server', 'error')
    }

    setSaving(false)
  }

  const handleDelete = async () => {
    if (!modal.member) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/members?id=${modal.member.id}`, { method: 'DELETE' })
      const data = await res.json()
      
      if (data.success) {
        showToast('Member berhasil dihapus (Soft Delete)')
        fetchMembers()
        closeModal()
      } else {
        showToast(data.error || 'Gagal menghapus', 'error')
      }
    } catch (error) {
      showToast('Gagal terhubung ke server', 'error')
    }
    setSaving(false)
  }

  const handleUpdateStatus = async (newStatus: string) => {
    if (!modal.member) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/members', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: modal.member.id, status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Status berhasil diubah menjadi ${newStatus}`)
        fetchMembers()
        closeModal()
      } else {
        showToast(data.error || 'Gagal update status', 'error')
      }
    } catch (error) {
      showToast('Gagal update status', 'error')
    }
    setSaving(false)
  }

  const columns = [
    {
      key: 'name',
      label: 'Nama Affiliate',
      render: (val: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {val.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{val}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'totalReferrals',
      label: 'Total Referral',
      sortable: true
    },
    {
      key: 'totalEarnings',
      label: 'Total Earnings',
      render: (val: number) => (
        <span className="text-emerald-400 font-semibold">{formatRupiah(val)}</span>
      ),
      sortable: true
    },
    {
      key: 'pendingCommissions',
      label: 'Pending Commission',
      render: (val: number) => (
        <span className="text-amber-400 font-semibold">{formatRupiah(val)}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val: string) => <StatusBadge status={val} />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  const statCards = [
    { label: 'Total Affiliate', value: stats.total, color: 'text-primary', icon: '👥' },
    { label: 'Aktif', value: stats.active, color: 'text-emerald-400', icon: '✅' },
    { label: 'Menunggu Approval', value: stats.pending, color: 'text-amber-400', icon: '⏳' },
    { label: 'Ditangguhkan', value: stats.suspended, color: 'text-red-400', icon: '🚫' },
    { label: 'Total Komisi Pending', value: formatRupiah(stats.totalCommissions), color: 'text-sky-400', icon: '💳' },
    { label: 'Total Earnings', value: formatRupiah(stats.totalEarnings), color: 'text-emerald-400', icon: '💰' },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className={`fixed top-6 right-6 z-[999] px-6 py-3 rounded-2xl font-semibold text-sm shadow-2xl border backdrop-blur-xl flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}
          >
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Kelola Members</h1>
          <p className="text-gray-400">Lihat dan kelola semua affiliate member aktif</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]">
          <span className="text-lg">➕</span> Tambah Member
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <motion.div key={idx} variants={itemVariants} className="glass-card rounded-2xl p-5 hover:border-white/15 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-full blur-[20px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{card.icon}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{card.label}</p>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-[20%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-primary">👥</span> Daftar Affiliate Member
          </h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-all">
              Export CSV
            </button>
          </div>
        </div>
        <div className="relative z-10">
          <DataTable
            columns={columns}
            data={members}
            actions={[
              { label: 'Edit', onClick: (m) => openEdit(m) },
              { label: 'Approve', onClick: (m) => setModal({ visible: true, type: 'approve', member: m }) },
              { label: 'Suspend', onClick: (m) => setModal({ visible: true, type: 'suspend', member: m }) },
              { label: 'Hapus', onClick: (m) => setModal({ visible: true, type: 'delete', member: m }) }
            ]}
          />
        </div>
      </motion.div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {(modal.type === 'create' || modal.type === 'edit') && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card rounded-2xl w-full max-w-md overflow-hidden"
            >
              <div className="bg-[#0f0a1e]/90 p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-primary">{modal.type === 'create' ? '➕' : '✏️'}</span>
                  {modal.type === 'create' ? 'Tambah Member' : 'Edit Member'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-white text-2xl leading-none">×</button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Nama Lengkap *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Email *</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">No. WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                    Password {modal.type === 'edit' && <span className="text-gray-500 normal-case">(Opsional - isi untuk reset)</span>}
                  </label>
                  <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder={modal.type === 'edit' ? 'Biarkan kosong jika tidak ingin ganti' : 'Minimal 6 karakter'}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold block mb-2">Status</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  >
                    <option value="active" className="bg-[#1a0f3c]">✅ Active</option>
                    <option value="pending" className="bg-[#1a0f3c]">⏳ Pending</option>
                    <option value="suspended" className="bg-[#1a0f3c]">🚫 Suspended</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#0f0a1e]/90 p-6 border-t border-white/10 flex gap-3">
                <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium">Batal</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-black font-bold transition-all text-sm disabled:opacity-50 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                  {saving ? '⏳ Menyimpan...' : '💾 Simpan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action / Delete Modals */}
      <AnimatePresence>
        {(modal.type === 'approve' || modal.type === 'suspend' || modal.type === 'delete') && modal.member && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className={`glass-card rounded-2xl p-8 max-w-sm w-full text-center ${modal.type === 'delete' ? 'border-red-500/30' : ''}`}
            >
              <div className="text-5xl mb-4">
                {modal.type === 'approve' && '✅'}
                {modal.type === 'suspend' && '🚫'}
                {modal.type === 'delete' && '🗑️'}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {modal.type === 'approve' && 'Setujui Member?'}
                {modal.type === 'suspend' && 'Suspend Member?'}
                {modal.type === 'delete' && 'Hapus Member?'}
              </h3>
              
              <p className="text-white font-semibold mb-2">"{modal.member.name}"</p>
              
              <p className="text-gray-400 text-xs mb-8">
                {modal.type === 'approve' && 'Member akan diaktifkan dan dapat menggunakan semua fitur.'}
                {modal.type === 'suspend' && 'Member ini tidak akan bisa login ke dashboard.'}
                {modal.type === 'delete' && 'Tindakan ini menggunakan Soft Delete. Member tidak dapat login, tapi riwayat datanya tetap tersimpan.'}
              </p>
              
              <div className="flex gap-3">
                <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all text-sm font-medium">Batal</button>
                <button 
                  onClick={() => {
                    if (modal.type === 'delete') handleDelete()
                    else handleUpdateStatus(modal.type === 'approve' ? 'active' : 'suspended')
                  }} 
                  disabled={saving} 
                  className={`flex-1 px-4 py-3 rounded-xl border font-bold transition-all text-sm disabled:opacity-50 ${
                    modal.type === 'delete' 
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30' 
                      : 'bg-primary/20 border-primary/30 text-primary hover:bg-primary/30'
                  }`}
                >
                  {saving ? '⏳ Memproses...' : 'Ya, Lanjutkan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
