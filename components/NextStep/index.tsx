import { NeedHelp } from '@/components/NeedHelp'
import { OrderDetailModal } from './NextStepModal'
import { useTranslation } from 'react-i18next'
import { SwapVolume } from '@/components/SwapVolume'

export const NextStep = () => {
  const { t } = useTranslation();

  return (
    <div
      id="nextstep"
      className="flex flex-col items-center py-[50px] gap-[50px]"
    >
      {/* <div className="flex flex-col gap-[30px] py-[50px]">
        <div className="lg:text-[81px] text-center font-extrabold text-[#FFFFFF] leading-[102.06px]">
          { t("nextStepPage") }
        </div>
        <div className="lg:text-[19px] font-normal leading-[30px] text-[#B8CAFC] text-center">
          { t("nextStepContent") }
        </div>
      </div>
      <div className="flex flex-col pb-[165px]">
        <div className="flex flex-col items-center gap-[10px]">
          <OrderDetailModal
            orderID='pR7h3raq71otwFuCqvSpqf'
            creationTime={new Date("1/10/2023, 20:54:43")}
            sendAmount={1.0235}
            receiveAddress='0xeed9978234bdffswfd8dhfe372b0154'
            deliveryTime ='26 : 34'
            recipientAddress='0xferv3552mnjud953234sddn2323434bdffswfd8'
            receiveAmount={175.7936}
            tokenType='AVAX'
          />
          <div className="flex flex-col lg:px-[100px] lg:pt-[30px]">
            <div className="lg:text-[17px] text-center font-medium leading-[21.42px] rainbow-text text-[#FFFFFF]">
              { t("nextStepReceive") }
            </div>
          </div>
          <div className="flex justify-center lg:px-[100px] lg:py-[20px] items-center">
            <NeedHelp/>
          </div>
        </div>
      </div> */}
      
      {/* <div className="w-[386px] h-[207px]"> */}
        <SwapVolume value={824} />
      {/* </div> */}

    </div>
  )
}
