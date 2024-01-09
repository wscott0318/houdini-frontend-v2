import { useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/Loading'
import { NeedHelp } from '@/components/NeedHelp'
import { OrderDetailModalCollapsible } from '@/components/NextStep/NextStepModalCollapsible'
import { MULTI_STATUS_QUERY } from '@/lib/apollo/query'

export const MultipleOrders = ({ t }: { t: any }) => {
  const searchParams = useSearchParams()

  const [orders, setOrders] = useState([])

  const { loading: loadingMulti, data: dataMulti } = useQuery(
    MULTI_STATUS_QUERY,
    {
      variables: {
        multiId: searchParams.get('multiId'),
      },
      fetchPolicy: 'no-cache',
      pollInterval: 3000,
    },
  )

  useEffect(() => {
    if (!loadingMulti && dataMulti) {
      setOrders(dataMulti?.multiStatus)
    }
  }, [dataMulti, loadingMulti])

  return (
    <>
      <div
        id="multiorder"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px] w-full"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102px] capitalize tracking-[-0px] w-full">
          {t('multiOrderPage')}
        </div>
        <div className="flex flex-col font-normal lg:text-[19px] w-full leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          {t('nextStepContent')}
        </div>
      </div>

      <div className="flex flex-col last:pb-[165px] w-full">
        <div className="flex flex-col items-center justify-center gap-[100px] w-full">
          {loadingMulti ? (
            <Loading />
          ) : (
            orders?.map((order: any, index: number) => {
              return (
                <div
                  key={order?.houdiniId}
                  className="w-full flex flex-row justify-center items-center"
                >
                  <OrderDetailModalCollapsible
                    order={order}
                    status={order?.status}
                    orderID={order?.houdiniId}
                    creationTime={new Date(order?.created)}
                    sendAmount={order?.inAmount}
                    receiveAddress={order?.receiverAddress}
                    deliveryTime="26 : 34"
                    recipientAddress={order?.senderAddress}
                    receiveAmount={order?.outAmount}
                    tokenType={order?.outSymbol}
                    swapTime={order?.eta}
                  />
                </div>
              )
            })
          )}
          <div className="flex flex-col lg:px-[100px] lg:pt-[30px] pt-[30px]">
            <div className="lg:text-[17px] text-center font-medium leading-[21px] rainbow-text text-[#FFFFFF]">
              {t('nextStepReceive')}
            </div>
          </div>
          <div className="flex justify-center lg:px-[100px] lg:py-[20px] py-[20px] items-center">
            <NeedHelp />
          </div>
        </div>
      </div>
    </>
  )
}
