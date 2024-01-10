import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { NeedHelp } from '@/components/NeedHelp'
import { OrderDetailsModal } from '@/components/OrderDetailsComponents/OrderDetailsModal'

export const OrderDetails = ({ order }: { order: any }) => {
  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

  const { t } = useTranslation()

  return (
    <>
      <div
        id="orderdetails"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px] w-full"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102px] capitalize tracking-[-0px] w-full">
          {t('orderDetailsPageTitle')}
        </div>
        <div className="flex flex-col font-normal lg:text-[19px] w-full leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          {t('orderDetailsContent')}
        </div>
      </div>

      <div className="flex flex-col last:pb-[165px] w-full">
        <div className="flex flex-col items-center gap-[10px] w-full">
          <OrderDetailsModal
            receiveAmount={order?.outAmount}
            recipientWallet={order?.receiverAddress}
            creationTime={new Date(order?.created)}
            orderId={order?.houdiniId}
            tokenType={order?.outSymbol}
            swapTime={order?.eta}
            order={order}
          />

          {!widgetMode ? (
            <div className="flex py-[10px] md:px-[100px] md:py-[50px] items-center w-full">
              <div className="flex py-[10px] md:px-[100px] md:py-[20px] items-center w-full justify-center">
                <NeedHelp />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
