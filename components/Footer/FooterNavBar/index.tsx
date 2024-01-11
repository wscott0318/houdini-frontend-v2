import Link from 'next/link'

import {
  GitBookSvg,
  MediumSvg,
  TelegramSvg,
  XSvg,
  YouTubeSvg,
} from '@/components/Svg'

export const FooterNavBar = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[50px]">
      <div className="z-[1] flex flex-row justify-start items-center gap-[20px]">
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
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" href="/dashboard">
          <span>Dashboard</span>
        </Link>
        <Link className="hover:gradient-text" href="/how-it-works">
          <span>How it works</span>
        </Link>
        <Link className="hover:gradient-text" href="https://houdiniswap.com/whitepaper" target='_blank' rel='noopener noreferrer'>
          <span>Whitepaper</span>
        </Link>
      </div>
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[38px] font-medium text-base leading-[25px]">
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
          <span>API access</span>
        </Link>
        <Link className="hover:gradient-text" href="https://forms.monday.com/forms/9e469b4eca191951e784b45295532294?r=euc1">
          <span>Partnership</span>
        </Link>
        <Link className="hover:gradient-text" href="/bug-bounty-program">
          <span>Bug Bounty</span>
        </Link>
      </div>
    </div>
  )
}
