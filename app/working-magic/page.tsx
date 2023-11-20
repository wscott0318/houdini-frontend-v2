'use client'

import { NextStep as NextStepComponent } from '@/components/NextStep'
import { ResponsivePage } from '@/components/ResponsivePage'
import { WorkingMagic as WorkingMagicComponent } from '@/components/WorkingMagic'

export default function NextStep() {
  return (
    <ResponsivePage>
      <WorkingMagicComponent />
    </ResponsivePage>
  )
}
