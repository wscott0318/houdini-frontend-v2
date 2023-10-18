import {
  GitBookSvg,
  MediumSvg,
  TelegramSvg,
  XSvg,
  YouTubeSvg,
} from '@/components/Svg'
import dayjs from 'dayjs'
import Link from 'next/link'

export const FooterNavBar = () => {
  const today = dayjs()

  return (
    <div className="flex flex-col justify-center items-center gap-[50px] pb-10">
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" href="/dashboard">
          <span>Dashboard</span>
        </Link>
        <Link className="hover:gradient-text" href="/how-it-works">
          <span>How it works</span>
        </Link>
        <Link className="hover:gradient-text" href="/">
          <span>Buy $POOF</span>
        </Link>
        <Link
          className="hover:gradient-text"
          href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x888ceA2BBDD5D47a4032cf63668D7525C74af57A"
        >
          <span>Buy $POOF on Uniswap</span>
        </Link>
        <Link className="hover:gradient-text" href="/">
          <span>Whitepaper</span>
        </Link>
      </div>
      <div className="flex flex-row justify-start items-center gap-[20px]">
        <XSvg className="w-7 h-7 fill-white" />
        <TelegramSvg className="w-7 h-7 fill-white" />
        <GitBookSvg className="w-7 h-7 fill-white" />
        <YouTubeSvg className="w-7 h-7 fill-white" />
        <MediumSvg className="w-7 h-7 fill-white" />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[38px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" href="/bug-bounty-program">
          <span>Bug Bounty Program</span>
        </Link>
        <Link className="hover:gradient-text" href="/compliance">
          <span>Compliance</span>
        </Link>
        <Link className="hover:gradient-text" href="/privacy-policy">
          <span>Privacy policy</span>
        </Link>
        <Link className="hover:gradient-text" href="/terms-of-use">
          <span>Terms of use</span>
        </Link>
        <Link className="hover:gradient-text" href="/get-api-access">
          <span>Get API access</span>
        </Link>
        <Link className="hover:gradient-text" href="/partnership">
          <span>Partnership</span>
        </Link>
      </div>
      <div className="text-xs font-light gradient-text">
        © {today.year()} Houdini Swap, All rights reserved.
      </div>
    </div>
  )
}
