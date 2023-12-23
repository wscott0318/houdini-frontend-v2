import { NeedHelp } from '@/components/NeedHelp'

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
        <div className="flex flex-col items-center gap-[10px] w-full">
          Modal Here
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