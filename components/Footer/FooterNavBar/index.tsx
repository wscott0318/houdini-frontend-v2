import {
  GitBookSvg,
  MediumSvg,
  TelegramSvg,
  XSvg,
  YouTubeSvg,
} from '@/components/Svg'

export const FooterNavBar = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[50px] pb-10">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
        <div>Dashboard</div>
        <div>How it works</div>
        <div>Buy $POOF</div>
        <div>Buy $POOF on Uniswap</div>
        <div>Whitepaper</div>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <XSvg className="w-7 h-7 fill-white" />
        <TelegramSvg className="w-7 h-7 fill-white" />
        <GitBookSvg className="w-7 h-7 fill-white" />
        <YouTubeSvg className="w-7 h-7 fill-white" />
        <MediumSvg className="w-7 h-7 fill-white" />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[38px] font-medium text-base leading-[25px]">
        <div>Bug Bounty Program</div>
        <div>Compliance</div>
        <div>Privacy policy</div>
        <div>Terms of use</div>
        <div>Get API access</div>
        <div>Partnership</div>
      </div>
      <div className="text-xs font-light gradient-text">
        © 2023 Houdini Swap, All rights reserved.
      </div>
    </div>
  )
}
