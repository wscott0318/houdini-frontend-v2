import { useTranslation } from 'react-i18next'

import { NeedHelp } from '@/components/NeedHelp'
import { OrderDetailsModal } from '@/components/OrderDetailsComponents/OrderDetailsModal'

export const OrderDetails = ({ order }: { order: any }) => {
  const { t } = useTranslation()
  return (
    <>
      <div
        id="orderdetails"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px] w-full"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102.06px] capitalize tracking-[-0.85px] w-full">
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
            swapTime={30}
          />
          <div className="flex py-[10px] md:px-[100px] md:py-[50px] items-center w-full">
            <div className="flex py-[10px] md:px-[100px] md:py-[20px] items-center w-full justify-center">
              <NeedHelp />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
