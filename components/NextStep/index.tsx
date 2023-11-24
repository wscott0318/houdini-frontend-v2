import { NeedHelp } from '@/components/NeedHelp'
import { MainModal } from './MainModal'

export const NextStep = () => {
  return (
    <div
      id="nextstep"
      className="flex flex-col items-center py-[50px] gap-[50px]"
    >
      <div className="flex flex-col gap-[30px] py-[50px]">
        <div className="lg:text-[81px] text-center font-extrabold text-[#FFFFFF] leading-[102.06px]">
          Next Step
        </div>
        <div className="lg:text-[19px] font-normal leading-[30px] text-[#B8CAFC] text-center">
          To initiate your transaction send the required funds to the wallet address in the order below
        </div>
      </div>
      <div className="flex flex-col pb-[165px]">
        <div className="flex flex-col items-center gap-[10px]">
          <MainModal/>
          <div className="flex flex-col lg:px-[100px] lg:pt-[30px]">
            <div className="lg:text-[17px] text-center font-medium leading-[21.42px] rainbow-text text-[#FFFFFF]">
              When funds are received this page will auto refresh to display your transaction progress
            </div>
          </div>
          <div className="flex justify-center lg:px-[100px] lg:py-[20px] items-center">
            <NeedHelp/>
          </div>
        </div>
      </div>
    </div>
  )
}
