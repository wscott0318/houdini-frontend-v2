import { useSearchParams } from 'next/navigation'
import React from 'react'

import { MultipleOrders } from '@/components/OrderDetailsComponents/MultiOrderDetails'
import { SingleOrder } from '@/components/OrderDetailsComponents/SingleOrderDetails'

export const OrderContent = ({ t }: { t: any }) => {
  const searchParams = useSearchParams()
  const houdiniId = searchParams.get('houdiniId')
  const multiId = searchParams.get('multiId')

  if (houdiniId) {
    return <SingleOrder t={t} />
  } else if (multiId) {
    return <MultipleOrders t={t} />
  }
}

export default OrderContent
