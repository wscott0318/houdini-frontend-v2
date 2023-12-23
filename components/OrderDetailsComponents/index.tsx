import { MultipleOrders } from '@/components/OrderDetailsComponents/MultiOrderDetails'
import { SingleOrder } from '@/components/OrderDetailsComponents/SingleOrderDetails'

export const OrderContent = ({
  loading,
  orders,
  t,
}: {
  loading: boolean
  orders: any
  t: any
}) => {
  if (loading) return <div>Loading...</div>
  if (orders.length === 0) return <div>No orders found.</div>

  if (orders.length === 1) {
    return <SingleOrder order={orders[0]} />
  }

  if (orders.length > 1) {
    return <MultipleOrders orders={orders} t={t} />
  }
}
