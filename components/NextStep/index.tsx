import { useTranslation } from 'react-i18next'

import { NeedHelp } from '@/components/NeedHelp'

import { OrderDetailModal } from './NextStepModal'

export const NextStep = ({ order }: { order: any }) => {
  const { t } = useTranslation()

  return (
    <div
      id="nextstep"
      className="flex flex-col items-center py-[50px] gap-[50px]"
    >
      <div className="flex flex-col gap-[30px] py-[50px]">
        <div className="lg:text-[81px] text-[50px] text-center font-extrabold text-[#FFFFFF] lg:leading-[102px] leading-[50px]">
          {t('nextStepPage')}
        </div>
        <div className="lg:text-[19px] font-normal lg:leading-[30px] leading-[20px] text-[#B8CAFC] text-center">
          {t('nextStepContent')}
        </div>
      </div>
      <div className="flex flex-col last:pb-[165px]">
        <div className="flex flex-col items-center gap-[10px]">
          <OrderDetailModal
            orderID={order?.houdiniId}
            creationTime={new Date(order?.created)}
            sendAmount={order?.inAmount}
            receiveAddress={order?.receiverAddress}
            deliveryTime="26 : 34"
            recipientAddress={order?.senderAddress}
            receiveAmount={order?.outAmount}
            tokenType={order?.outSymbol}
          />
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
    </div>
  )
}
