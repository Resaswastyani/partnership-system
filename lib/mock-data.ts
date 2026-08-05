// Mock Data for FBL Partnership System

export interface Product {
  id: string
  name: string
  type: 'download' | 'credentials'
  price: number
  commissionRate: number
  description: string
  image: string
  features: string[]
}

export interface User {
  id: string
  email: string
  name: string
  referralCode: string
  referralLink: string
  role: 'user' | 'admin'
  createdAt: Date
  totalEarnings: number
  pendingCommissions: number
  totalReferrals: number
}

export interface Referral {
  id: string
  referrerId: string
  refereeEmail: string
  refereeName: string
  status: 'pending' | 'converted' | 'cancelled'
  productId: string
  productName: string
  commission: number
  amount: number
  createdAt: Date
  conversionDate?: Date
}

export interface Order {
  id: string
  userId: string
  productId: string
  referralCode?: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
}

// Products Data
export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Materi Profesional Trading',
    type: 'download',
    price: 299000,
    commissionRate: 3,
    description: 'Panduan lengkap menjadi trader profesional dengan strategi terbukti menguntungkan',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    features: [
      'Video tutorial 40+ jam',
      'E-book strategi trading',
      'Analisis pasar harian',
      'Community forum eksklusif',
      'Lifetime access'
    ]
  },
  {
    id: 'prod-002',
    name: 'EA Robot Trading FBL',
    type: 'download',
    price: 599000,
    commissionRate: 5,
    description: 'Expert Advisor otomatis untuk trading 24/7 dengan AI tercanggih',
    image: 'https://images.unsplash.com/photo-1518186285789-2155db3693a7?w=500&h=300&fit=crop',
    features: [
      'Algoritma AI advanced',
      'Backtesting lengkap',
      'Risk management otomatis',
      'Multi timeframe analysis',
      'Dashboard real-time',
      'Support 24/7'
    ]
  },
  {
    id: 'prod-003',
    name: 'Jurnal Trading',
    type: 'credentials',
    price: 199000,
    commissionRate: 3,
    description: 'Platform jurnal trading untuk tracking dan analisis performa trading Anda',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    features: [
      'Track semua trades',
      'Analytics mendalam',
      'Performance metrics',
      'Export reports',
      'Cloud sync',
      'Mobile app access'
    ]
  },
  {
    id: 'prod-004',
    name: 'Position Size Calculator',
    type: 'credentials',
    price: 149000,
    commissionRate: 2,
    description: 'Kalkulator canggih untuk menghitung position size yang aman dan optimal',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500&h=300&fit=crop',
    features: [
      'Risk calculator',
      'Multi currency support',
      'Forex, Crypto, Stocks',
      'Saved configurations',
      'Mobile responsive',
      'Real-time rates'
    ]
  }
]

// Generate referral code
export function generateReferralCode(userId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `FBL-${userId.substring(0, 3).toUpperCase()}-${timestamp}-${random}`
}

// Mock current user (simulating logged in user)
export const CURRENT_USER: User = {
  id: 'user-001',
  email: 'affiliate@forexforbetterliving.com',
  name: 'Ahmad Traders',
  referralCode: 'FBL-USR-ZXWVUT',
  referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-ZXWVUT',
  role: 'user',
  createdAt: new Date('2024-01-15'),
  totalEarnings: 8_950_000,
  pendingCommissions: 2_450_000,
  totalReferrals: 47
}

// Mock admin user
export const ADMIN_USER: User = {
  id: 'admin-001',
  email: 'admin@forexforbetterliving.com',
  name: 'Admin FBL',
  referralCode: 'FBL-ADMIN-001',
  referralLink: '',
  role: 'admin',
  createdAt: new Date('2023-01-01'),
  totalEarnings: 0,
  pendingCommissions: 0,
  totalReferrals: 0
}

// Mock referrals data
export const MOCK_REFERRALS: Referral[] = [
  {
    id: 'ref-001',
    referrerId: 'user-001',
    refereeEmail: 'buyer1@example.com',
    refereeName: 'Budi Santoso',
    status: 'converted',
    productId: 'prod-001',
    productName: 'Materi Profesional Trading',
    commission: 8_970,
    amount: 299_000,
    createdAt: new Date('2024-11-15'),
    conversionDate: new Date('2024-11-16')
  },
  {
    id: 'ref-002',
    referrerId: 'user-001',
    refereeEmail: 'buyer2@example.com',
    refereeName: 'Siti Nurhaliza',
    status: 'converted',
    productId: 'prod-002',
    productName: 'EA Robot Trading FBL',
    commission: 29_950,
    amount: 599_000,
    createdAt: new Date('2024-11-10'),
    conversionDate: new Date('2024-11-12')
  },
  {
    id: 'ref-003',
    referrerId: 'user-001',
    refereeEmail: 'buyer3@example.com',
    refereeName: 'Roni Sulistyo',
    status: 'converted',
    productId: 'prod-003',
    productName: 'Jurnal Trading',
    commission: 5_970,
    amount: 199_000,
    createdAt: new Date('2024-11-08'),
    conversionDate: new Date('2024-11-09')
  },
  {
    id: 'ref-004',
    referrerId: 'user-001',
    refereeEmail: 'buyer4@example.com',
    refereeName: 'Dina Kusuma',
    status: 'pending',
    productId: 'prod-004',
    productName: 'Position Size Calculator',
    commission: 0,
    amount: 149_000,
    createdAt: new Date('2024-11-20')
  },
  {
    id: 'ref-005',
    referrerId: 'user-001',
    refereeEmail: 'buyer5@example.com',
    refereeName: 'Eka Prasetya',
    status: 'converted',
    productId: 'prod-001',
    productName: 'Materi Profesional Trading',
    commission: 8_970,
    amount: 299_000,
    createdAt: new Date('2024-11-05'),
    conversionDate: new Date('2024-11-06')
  }
]

// Mock users for admin
export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'user-002',
    email: 'trader2@example.com',
    name: 'Joko Wahyono',
    referralCode: 'FBL-USR-ABCDEF',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-ABCDEF',
    role: 'user',
    createdAt: new Date('2024-02-20'),
    totalEarnings: 5_430_000,
    pendingCommissions: 1_200_000,
    totalReferrals: 28
  },
  {
    id: 'user-003',
    email: 'trader3@example.com',
    name: 'Maya Fitriana',
    referralCode: 'FBL-USR-GHIJKL',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-GHIJKL',
    role: 'user',
    createdAt: new Date('2024-03-10'),
    totalEarnings: 2_890_000,
    pendingCommissions: 650_000,
    totalReferrals: 15
  }
]

// Dashboard stats
export const MOCK_DASHBOARD_STATS = {
  totalUsers: 347,
  totalMembers: 127,
  totalReferrals: 3_245,
  totalCommissionsPending: 125_450_000,
  totalRevenueMonth: 450_750_000,
  conversionRate: 34.5,
  topProduct: 'EA Robot Trading FBL',
  topAffiliate: 'Ahmad Traders'
}

// Monthly revenue chart data
export const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 120_000_000, commissions: 15_000_000 },
  { month: 'Feb', revenue: 145_000_000, commissions: 18_500_000 },
  { month: 'Mar', revenue: 128_000_000, commissions: 16_200_000 },
  { month: 'Apr', revenue: 167_000_000, commissions: 21_300_000 },
  { month: 'May', revenue: 189_000_000, commissions: 24_100_000 },
  { month: 'Jun', revenue: 156_000_000, commissions: 19_800_000 },
  { month: 'Jul', revenue: 198_000_000, commissions: 25_200_000 },
  { month: 'Aug', revenue: 203_000_000, commissions: 25_900_000 },
  { month: 'Sep', revenue: 187_000_000, commissions: 23_800_000 },
  { month: 'Oct', revenue: 215_000_000, commissions: 27_300_000 },
  { month: 'Nov', revenue: 234_000_000, commissions: 29_700_000 },
  { month: 'Dec', revenue: 245_000_000, commissions: 31_100_000 }
]

// Extended affiliate members for admin
export const MOCK_ALL_MEMBERS: (User & { status: 'active' | 'pending' | 'suspended'; joinDate: string; commissionThisMonth: number })[] = [
  {
    id: 'user-001',
    email: 'ahmad.traders@email.com',
    name: 'Ahmad Traders',
    referralCode: 'FBL-USR-ZXWVUT',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-ZXWVUT',
    role: 'user',
    createdAt: new Date('2024-01-15'),
    totalEarnings: 8_950_000,
    pendingCommissions: 2_450_000,
    totalReferrals: 47,
    status: 'active',
    joinDate: '2024-01-15',
    commissionThisMonth: 2_450_000
  },
  {
    id: 'user-002',
    email: 'joko.wahyono@email.com',
    name: 'Joko Wahyono',
    referralCode: 'FBL-USR-ABCDEF',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-ABCDEF',
    role: 'user',
    createdAt: new Date('2024-02-20'),
    totalEarnings: 5_430_000,
    pendingCommissions: 1_200_000,
    totalReferrals: 28,
    status: 'active',
    joinDate: '2024-02-20',
    commissionThisMonth: 1_200_000
  },
  {
    id: 'user-003',
    email: 'maya.fitriana@email.com',
    name: 'Maya Fitriana',
    referralCode: 'FBL-USR-GHIJKL',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-GHIJKL',
    role: 'user',
    createdAt: new Date('2024-03-10'),
    totalEarnings: 2_890_000,
    pendingCommissions: 650_000,
    totalReferrals: 15,
    status: 'active',
    joinDate: '2024-03-10',
    commissionThisMonth: 650_000
  },
  {
    id: 'user-004',
    email: 'budi.santoso@email.com',
    name: 'Budi Santoso',
    referralCode: 'FBL-USR-MNOPQR',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-MNOPQR',
    role: 'user',
    createdAt: new Date('2024-04-05'),
    totalEarnings: 1_200_000,
    pendingCommissions: 300_000,
    totalReferrals: 8,
    status: 'pending',
    joinDate: '2024-04-05',
    commissionThisMonth: 300_000
  },
  {
    id: 'user-005',
    email: 'siti.nur@email.com',
    name: 'Siti Nurhaliza',
    referralCode: 'FBL-USR-STUVWX',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-STUVWX',
    role: 'user',
    createdAt: new Date('2024-05-12'),
    totalEarnings: 3_560_000,
    pendingCommissions: 890_000,
    totalReferrals: 19,
    status: 'active',
    joinDate: '2024-05-12',
    commissionThisMonth: 890_000
  },
  {
    id: 'user-006',
    email: 'roni.sulistyo@email.com',
    name: 'Roni Sulistyo',
    referralCode: 'FBL-USR-YZABCD',
    referralLink: 'https://forexforbetterliving.com/?ref=FBL-USR-YZABCD',
    role: 'user',
    createdAt: new Date('2024-06-01'),
    totalEarnings: 890_000,
    pendingCommissions: 220_000,
    totalReferrals: 5,
    status: 'suspended',
    joinDate: '2024-06-01',
    commissionThisMonth: 0
  }
]

// Activity feed for real-time monitoring
export interface Activity {
  id: string
  type: 'signup' | 'referral' | 'commission' | 'payout' | 'approval' | 'product-sale'
  title: string
  description: string
  amount?: number
  timestamp: Date
  icon?: string
  status?: 'success' | 'pending' | 'warning'
}

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-001',
    type: 'signup',
    title: 'New Affiliate Signup',
    description: 'Eka Prasetya joined as affiliate',
    timestamp: new Date(Date.now() - 5 * 60000),
    icon: 'user-plus',
    status: 'success'
  },
  {
    id: 'act-002',
    type: 'product-sale',
    title: 'Product Sale',
    description: 'EA Robot Trading FBL purchased via Ahmad Traders referral',
    amount: 599_000,
    timestamp: new Date(Date.now() - 15 * 60000),
    icon: 'shopping-cart',
    status: 'success'
  },
  {
    id: 'act-003',
    type: 'commission',
    title: 'Commission Generated',
    description: '5% commission credited to Ahmad Traders',
    amount: 29_950,
    timestamp: new Date(Date.now() - 20 * 60000),
    icon: 'dollar-sign',
    status: 'success'
  },
  {
    id: 'act-004',
    type: 'approval',
    title: 'Affiliate Approval Pending',
    description: 'Budi Santoso awaiting approval',
    timestamp: new Date(Date.now() - 45 * 60000),
    icon: 'clock',
    status: 'pending'
  },
  {
    id: 'act-005',
    type: 'payout',
    title: 'Payout Processed',
    description: 'Rp 5.43M paid to Joko Wahyono',
    amount: 5_430_000,
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    icon: 'send',
    status: 'success'
  }
]

// Payout records
export interface Payout {
  id: string
  affiliateId: string
  affiliateName: string
  amount: number
  commissions: number
  status: 'pending' | 'approved' | 'processed' | 'failed'
  bankName: string
  accountNumber: string
  createdAt: Date
  processedAt?: Date
}

export const MOCK_PAYOUTS: Payout[] = [
  {
    id: 'payout-001',
    affiliateId: 'user-001',
    affiliateName: 'Ahmad Traders',
    amount: 2_450_000,
    commissions: 8,
    status: 'pending',
    bankName: 'BCA',
    accountNumber: '****1234',
    createdAt: new Date('2024-11-20')
  },
  {
    id: 'payout-002',
    affiliateId: 'user-002',
    affiliateName: 'Joko Wahyono',
    amount: 1_200_000,
    commissions: 5,
    status: 'approved',
    bankName: 'Mandiri',
    accountNumber: '****5678',
    createdAt: new Date('2024-11-20')
  },
  {
    id: 'payout-003',
    affiliateId: 'user-003',
    affiliateName: 'Maya Fitriana',
    amount: 650_000,
    commissions: 3,
    status: 'processed',
    bankName: 'BNI',
    accountNumber: '****9012',
    createdAt: new Date('2024-11-15'),
    processedAt: new Date('2024-11-18')
  }
]
