import { NextStep } from '@/components/NextStep'
import { OrderDetails } from '@/components/OrderDetailsComponents/OrderDetails'

export const SingleOrder = ({ order }: { order: any }) => {
  if (order?.status === 0) {
    return <NextStep key={order.houdiniId} order={order} />
  }
  return <OrderDetails key={order.houdiniId} order={order} />
}
