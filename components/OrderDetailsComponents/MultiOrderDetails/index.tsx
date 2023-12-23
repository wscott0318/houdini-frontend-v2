import { NeedHelp } from '@/components/NeedHelp'
import { OrderDetailModalCollapsible } from '@/components/NextStep/NextStepModalCollapsible';

export const MultipleOrders = ({ orders, t }: { orders: any; t: any }) => {
  return (
    <>
      <div
        id="multiorder"
        className="flex flex-col justify-center items-center gap-[30px] lg:gap-[10px] w-full"
      >
        <div className="lg:text-[81px] text-center font-bold leading-[102.06px] capitalize tracking-[-0.85px] w-full">
          {t('multiOrderPage')}
        </div>
        <div className="flex flex-col font-normal lg:text-[19px] w-full leading-[30px] items-center justify-center text-[#B8CAFC] text-center">
          {t('nextStepContent')}
        </div>
      </div>

      <div className="flex flex-col last:pb-[165px] w-full">
        <div className="flex flex-col items-center justify-center gap-[100px] w-full">
          {orders.map((order: any, index: number) => {
            return (
              <div key={order?.houdiniId}>
                <OrderDetailModalCollapsible
                  orderID={order?.houdiniId}
                  creationTime={new Date(order?.created)}
                  sendAmount={order?.inAmount}
                  receiveAddress={order?.receiverAddress}
                  deliveryTime="26 : 34"
                  recipientAddress={order?.senderAddress}
                  receiveAmount={order?.outAmount}
                  tokenType={order?.outSymbol}
                />
              </div>
            )
          })}
          <div className="flex flex-col lg:px-[100px] lg:pt-[30px] pt-[30px]">
            <div className="lg:text-[17px] text-center font-medium leading-[21.42px] rainbow-text text-[#FFFFFF]">
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
