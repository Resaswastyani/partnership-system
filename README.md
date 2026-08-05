# FBL Partnership - Affiliate Referral System

Sistem afiliasi modern untuk **Forex for Better Living (FBL)** yang memungkinkan member menghasilkan komisi dari penjualan produk trading premium.

## 🎯 Fitur Utama

### 1. Landing Page (Public)
- ✅ Hero section dengan animasi menarik
- ✅ Product showcase dengan 4 produk unggulan
- ✅ Cara kerja sistem yang mudah dipahami
- ✅ Call-to-action untuk registrasi
- ✅ Footer dengan informasi perusahaan

### 2. Member Dashboard
- 📊 **Dashboard Overview**: Total earnings, pending commissions, total referrals, conversion rate
- 🔗 **Referral Management**: Generate & copy referral links, share ke social media (WhatsApp, Twitter, Facebook)
- 💰 **Commission Tracker**: Monitor komisi per bulan dengan breakdown per produk
- 📈 **Activity Feed**: Tracking real-time referral activity

### 3. Admin Dashboard (Dark Theme - ACRU Style)
- 📊 **System Metrics**: Total members, referrals, pending commissions, revenue
- 📈 **Revenue Charts**: Visualisasi revenue trend bulanan dan commission breakdown
- 👥 **Member Management**: Kelola users dan affiliates
- 📦 **Product Management**: Update harga, komisi, info produk
- 💳 **Payout Management**: Proses pembayaran komisi ke members

### 4. Products Showcase
- 📋 **Product Listing**: Semua 4 produk dengan detail lengkap
- 💡 **Commission Info**: Komisi per produk yang jelas
- ⚖️ **Comparison Table**: Perbandingan fitur antar produk
- ❓ **FAQ Section**: Jawaban umum tentang produk

### 5. Authentication
- ✅ Login page dengan demo credentials
- ✅ Register page dengan validasi
- ✅ Session management menggunakan localStorage

## 🚀 Produk Yang Dijual

1. **Materi Profesional Trading** - Rp 299K (3% komisi)
   - Video tutorial 40+ jam
   - E-book strategi trading
   - Lifetime access

2. **EA Robot Trading FBL** - Rp 599K (5% komisi) ⭐ Top seller
   - Algoritma AI advanced
   - Backtesting lengkap
   - Support 24/7

3. **Jurnal Trading** - Rp 199K (3% komisi)
   - Platform tracking trades
   - Analytics mendalam
   - Cloud sync

4. **Position Size Calculator** - Rp 149K (2% komisi)
   - Risk calculator
   - Multi currency support
   - Mobile responsive

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React hooks + localStorage (mock)
- **Data**: Mock data system ready for database integration

## 🎨 Design System

### Color Palette (Dark Theme)
- **Primary Accent**: Cyan (#00d9ff)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Highlight**: Pink (#ec4899)
- **Background**: Dark Navy (#0f172a)
- **Surface**: #1a2847

### Typography
- **Headings**: Bold sans-serif
- **Body**: Regular sans-serif
- **Mono**: For referral codes and technical info

## 📁 Project Structure

```
/app
  /page.tsx                  # Landing page
  /login/page.tsx           # Login page
  /register/page.tsx        # Registration
  /products/page.tsx        # Product listing
  /dashboard/               # Member dashboard
    /page.tsx              # Dashboard home
    /referrals/page.tsx    # Referral management
    /commissions/page.tsx  # Commission tracking
  /admin/                   # Admin dashboard
    /page.tsx              # Admin home
    /members/page.tsx      # Member management
    /products/page.tsx     # Product management
    /analytics/page.tsx    # Analytics
    /payouts/page.tsx      # Payout management

/components
  /Header.tsx              # Navigation bar
  /Footer.tsx             # Footer section
  /HeroSection.tsx        # Landing hero
  /ProductShowcase.tsx    # Product cards
  /HowItWorks.tsx        # How it works section
  /dashboard/
    /StatsCard.tsx       # Stats metric card
    /ReferralCard.tsx    # Referral code display
    /ReferralTable.tsx   # Referral list

/lib
  /mock-data.ts          # Mock data & interfaces
  /utils.ts              # Helper functions

/public
  /fbl-logo.png         # Brand logo
```

## 🔐 Demo Credentials

```
Email: affiliate@forexforbetterliving.com
Password: demo123
```

## 📊 Mock Data

Sistem ini dilengkapi dengan mock data lengkap untuk testing:
- 3 user accounts (1 admin, 2 affiliates)
- 5 referral records dengan berbagai status
- 12 bulan revenue data
- Product commission breakdown

## 🎯 Next Steps - Database Integration

Untuk production, integrasikan dengan database:

### Recommended Stack
- **Database**: Neon (PostgreSQL)
- **ORM**: Drizzle ORM
- **Auth**: Better Auth

### Tables Needed
- `users` - Member accounts
- `products` - Product catalog
- `referrals` - Referral tracking
- `commissions` - Commission records
- `orders` - Transaction history

## 🌐 Features Ready for Integration

1. **Payment Gateway**: Bentuk checkout siap untuk Midtrans/GCash
2. **Referral Tracking**: System capture `?ref=` parameter
3. **Commission Calculation**: Logic ready untuk automation
4. **Email Notifications**: Struktur siap untuk nodemailer
5. **Export Function**: CSV export untuk reporting

## ⚡ Performance Optimizations

- ✅ Image optimization dengan Next.js Image component
- ✅ Lazy loading untuk dashboard components
- ✅ Code splitting per route
- ✅ CSS-in-JS untuk animations
- ✅ Mobile-first responsive design

## 🔒 Security Notes

- Referral codes generated dengan timestamp + random string
- LocalStorage untuk demo (ganti dengan secure session untuk production)
- CORS headers ready untuk backend API
- Input validation pada form submissions

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layout
- ✅ Touch-friendly interactive elements

## 🎬 Animations & Interactions

- ✅ Smooth page transitions
- ✅ Hover effects on cards
- ✅ Loading states
- ✅ Toast notifications ready
- ✅ Modal/dialog structure

## 📝 License

PT Akademi Keuangan Nusantara - FBL Partnership System

---

## 🤝 Support

Untuk pertanyaan atau support:
- Email: support@forexforbetterliving.com
- WhatsApp: +62 XXX XXXX XXXX
- Website: www.forexforbetterliving.com
