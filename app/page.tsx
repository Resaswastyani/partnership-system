'use client'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { HowItWorks } from '@/components/HowItWorks'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full overflow-x-hidden bg-[#080b14]"
    >
      <Header />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </motion.main>
  )
}
