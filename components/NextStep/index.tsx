import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { NeedHelp } from '@/components/NeedHelp'
import { OrderStep } from '@/utils/constants'

import { OrderDetailModal } from './NextStepModal'

export const NextStep = ({
  order,
  setCurrentStep,
  currentStep,
}: {
  order: any
  setCurrentStep: Function
  currentStep: OrderStep
}) => {
  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

  const { t } = useTranslation()

  return (
    <div
      id="nextstep"
      className="flex flex-col items-center"
    >
      <div
        className={`flex flex-col relative z-30 ${!widgetMode ? 'gap-[30px] pb-[50px]' : 'mb-10'}`}
      >
        <div className="lg:text-[81px] text-[50px] text-center font-extrabold text-[#FFFFFF] lg:leading-[102px] leading-[50px]">
          {t('nextStepPage')}
        </div>
        <div className="lg:text-[19px] font-normal lg:leading-[30px] leading-[20px] text-[#B8CAFC] text-center">
          {t('nextStepContent')}
        </div>
      </div>
      <div className={`flex flex-col ${!widgetMode ? 'last:pb-[165px]' : ''}`}>
        <div className="flex flex-col items-center gap-[10px]">
          <OrderDetailModal
            order={order}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          {!widgetMode ? (
            <>
              <div className="flex flex-col lg:px-[100px] lg:pt-[30px] pt-[30px]">
                <div className="lg:text-[17px] text-center font-medium leading-[21px] rainbow-text text-[#FFFFFF]">
                  {t('nextStepReceive')}
                </div>
              </div>
              <div className="flex justify-center lg:px-[100px] lg:py-[20px] py-[20px] items-center">
                <NeedHelp />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
