import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function GET() {
  try {
      const sql = getDb()
    const products = await sql`SELECT * FROM products ORDER BY price ASC`
    // Append Ultimate Trading Bundle (hardcoded)
    const bundle = {
      id: 'bundle-001',
      name: 'ULTIMATE TRADING BUNDLE',
      type: 'download',
      price: 199000,
      commissionRate: 5,
      description: 'Includes 23 Courses: Pengetahuan Dasar Mengenai Forex; Pendekatan Profesional Trading dan Technical Analysis; Waktu Perdagangan Forex; Technical Trading; Charting Support Resistance & Cara Tradingnya; Moving Average; Candle Stick & Candlestick Chart; Signal Pinbar; Signal Enguilfing; Signal Inside Bar; Signal fakey (false break); Tailed Bar; Psikologi Trading - Penguasaan Emosi Dalam Trading; Fenomena 50% pullback & Zig Zag; Trading menggunakan time frame H1 & H4; Trend Trading (Trade in the Direction Of Trend ); Cara ENTRY dengan Confluence, Mengendalikan Posisi; Risk Reward adalah holigraill di forex trading; Risk Reward adalah Holy Grail; Strategi Exit Trade; Trading Plan; Money Management; Jurnal Trading',
      image: '/bundle.jpg',
      features: [
        'Pengetahuan Dasar Mengenai Forex',
        'Pendekatan Profesional Trading dan Technical Analysis',
        'Waktu Perdagangan Forex',
        'Technical Trading',
        'Charting Support Resistance & Cara Tradingnya',
        'Moving Average',
        'Candle Stick & Candlestick Chart',
        'Signal Pinbar',
        'Signal Enguilfing',
        'Signal Inside Bar',
        'Signal fakey (false break)',
        'Tailed Bar',
        'Psikologi Trading - Penguasaan Emosi Dalam Trading',
        'Fenomena 50% pullback & Zig Zag',
        'Trading menggunakan time frame H1 & H4',
        'Trend Trading (Trade in the Direction Of Trend )',
        'Cara ENTRY dengan Confluence, Mengendalikan Posisi',
        'Risk Reward adalah holigraill di forex trading',
        'Risk Reward adalah Holy Grail',
        'Strategi Exit Trade',
        'Trading Plan',
        'Money Management',
        'Jurnal Trading'
      ]
    }
    products.push(bundle)
    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}
