'use client'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ProductShowcase } from '@/components/ProductShowcase'
import { HowItWorks } from '@/components/HowItWorks'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full overflow-x-hidden bg-background"
    >
      <Header />
      
      {/* Setiap section (Hero, Product, HowItWorks, Footer) di bawah ini sudah memiliki
          animasi "whileInView" (animasi pas scroll) di dalam komponen masing-masing. */}
      <HeroSection />
      <ProductShowcase />
      <HowItWorks />
      <Footer />
    </motion.main>
  )
}
