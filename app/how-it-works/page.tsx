'use client'

import { Faq } from '@/components/Faq'
import { HowItWorks as HowItWorksComponent } from '@/components/HowItWorks'
import { ResponsivePage } from '@/components/ResponsivePage'

export default function HowItWorks() {
  return (
    <ResponsivePage>
      <HowItWorksComponent />
      <Faq />
    </ResponsivePage>
  )
}
