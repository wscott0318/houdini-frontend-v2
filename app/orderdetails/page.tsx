'use client'

import { OrderDetails as OrderDetailsComponent } from '@/components/OrderDetails'
import { ResponsivePage } from '@/components/ResponsivePage'

export default function NextStep() {
  return (
    <ResponsivePage>
      <OrderDetailsComponent />
    </ResponsivePage>
  )
}
