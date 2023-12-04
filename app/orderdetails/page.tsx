'use client'

import { OrderDetails as OrderDetailsComponent } from '@/components/OrderDetails'
import { ResponsivePage } from '@/components/ResponsivePage'

export default function OrderDetails() {
  return (
    <ResponsivePage>
      <OrderDetailsComponent />
    </ResponsivePage>
  )
}
