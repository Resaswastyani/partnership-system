import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ProductShowcase } from '@/components/ProductShowcase'
import { HowItWorks } from '@/components/HowItWorks'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <ProductShowcase />
      <HowItWorks />
      <Footer />
    </main>
  )
}
