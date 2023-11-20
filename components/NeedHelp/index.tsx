import Tg from '@/assets/Tg.png'
import Image from 'next/image'

export const NeedHelp = () => {
  return (
    <>
      <div className="custom-need-help-shadow rounded-[35px]">
        <div className="flex flex-col custom-need-help-gradient items-center justify-center w-full h-full rounded-[35px] gap-[10px] px-[150px] py-[20px]">
          <div className="text-center w-full lg:text-[46px] lg:leading-[75.43px] font-semibold whitespace-nowrap">
            Need Help?
          </div>
          <div className="text-center w-full text-[17px] font-medium rainbow-text whitespace-nowrap">
            Contact technical support here
          </div>
          <Image src={Tg} width={35} height={35} alt="Telegram" />
        </div>
      </div>
    </>
  )
}
