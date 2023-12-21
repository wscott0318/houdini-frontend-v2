import dayjs from 'dayjs'
import Link from 'next/link'

import {
  GitBookSvg,
  MediumSvg,
  TelegramSvg,
  XSvg,
  YouTubeSvg,
} from '@/components/Svg'

export const FooterNavBar = () => {
  const today = dayjs()

  return (
    <div className="flex flex-col justify-center items-center gap-[50px] pb-10">
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
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
      <div className="z-[1] flex flex-row justify-start items-center gap-[20px]">
        <Link className="group" href="https://twitter.com/HoudiniSwap">
          <XSvg className="w-6 h-6 fill-white group-hover:fill-[#F5C341]" />
        </Link>
        <Link className="group" href="https://t.me/houdiniswap">
          <TelegramSvg className="w-6 h-6 fill-white group-hover:fill-[#F5C341]" />
        </Link>
        <Link
          className="group"
          href="https://houdiniswap.gitbook.io/product-docs/"
        >
          <GitBookSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
        </Link>
        <Link className="group" href="https://www.youtube.com/@houdiniswap">
          <YouTubeSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
        </Link>
        <Link className="group" href="https://houdiniswap.medium.com/">
          <MediumSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
        </Link>
      </div>
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[38px] font-medium text-base leading-[25px]">
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
      <div className="z-[1] text-xs font-light gradient-text">
        © {today.year()} Houdini Swap, All rights reserved.
      </div>
    </div>
  )
}
