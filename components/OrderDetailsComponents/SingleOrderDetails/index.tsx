import { useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NextStep } from '@/components/NextStep'
import { OrderDetails } from '@/components/OrderDetailsComponents/OrderDetails'
import { STATUS_QUERY } from '@/lib/apollo/query'

export const SingleOrder = ({ t }: { t: any }) => {
  const searchParams = useSearchParams()

  const [order, setOrder] = useState({
    houdiniId: '',
    created: new Date(),
    senderAddress: '',
    receiverAddress: '',
    status: 0,
    anonymous: false,
    expires: '',
    inAmount: 0,
    inSymbol: 'BTC',
    outAmount: 0,
    outSymbol: 'ETH',
    senderTag: null,
    hashUrl: 'https://etherscan.io/tx/',
    fixed: false,
    direction: 'from',
    transactionHash: null,
    notified: false,
    eta: 20,
    inAmountUsd: 0,
  })

  const { loading: loadingSingle, data: dataSingle } = useQuery(STATUS_QUERY, {
    variables: {
      id: searchParams.get('houdiniId'),
    },
    fetchPolicy: 'no-cache',
    pollInterval: 3000,
  })

  useEffect(() => {
    if (!loadingSingle && dataSingle) {
      setOrder(dataSingle?.status)
    }
  }, [dataSingle, loadingSingle])

  if (!loadingSingle && dataSingle) {
    if (order?.status === 0 || order?.status === -1) {
      return <NextStep order={order} />
    }
    return <OrderDetails order={order} />
  } else {
    return <div>loading...</div>
  }
}
