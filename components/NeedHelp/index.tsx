import {
  TelegramSvg
} from '@/components/Svg'

export const NeedHelp = () => {
  return (
      <div className="custom-need-help-shadow lg:rounded-[35px] rounded-[20px]">
          <div className='flex flex-col custom-need-help-gradient items-center justify-center w-full h-full lg:rounded-[35px] rounded-[20px] gap-[10px] lg:px-[150px] lg:py-[20px] p-[20px]'>
              <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75.43px] font-semibold whitespace-nowrap">
                  Need Help?
              </div>
              <div className="text-center w-full lg:text-[17px] font-medium rainbow-text ">
                  Contact technical support here
              </div>
              <TelegramSvg className="w-6 h-6 fill-white group-hover:fill-[#F5C341]" />
          </div>
      </div>
  )
}
