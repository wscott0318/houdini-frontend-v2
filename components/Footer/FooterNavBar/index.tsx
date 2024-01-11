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
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/contact-us">
          <span>Contact Us</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/whitepaper">
          <span>Whitepaper</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://docs.houdiniswap.com/houdini-swap/" >
          <span>Documentation</span>
        </Link>
        <a className="hover:gradient-text" href="/get-api-access" >
          <span>Integrations</span>
        </a>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/bug-bounty-program" >
          <span>Big Bounty</span>
        </Link>
      </div>
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/get-started/how-it-works">
          <span>How it Works</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/faqs">
          <span>FAQs</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://t.me/HoudiniSwapSupport_bot">
          <span>Support</span>
        </Link>
      </div>
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[30px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/policies/privacy-policy">
          <span>Privacy Policy</span>
        </Link>
        <Link className="hover:gradient-text" href="/terms-of-use">
          <span>Terms of use</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/policies/user-data-policy">
          <span>User Data Policy</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/policies/compliance-and-risk-policy">
          <span>Compliance and Risk Policy</span>
        </Link>
      </div>
      <div className="z-[1] flex flex-col md:flex-row justify-center md:justify-start items-center gap-[10px] md:gap-[38px] font-medium text-base leading-[25px]">
        <Link className="hover:gradient-text" href="/dashboard">
          <span>Staking</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/tokenomics">
          <span>Tokenomics</span>
        </Link>
        <Link className="hover:gradient-text" target='_blank' rel='noopener noreferrer' href="https://app.gitbook.com/o/M2Ytsk4f1xPDdmEhUc0Q/s/kUVqOh8SwvsL5KWOPTJX/tokenomics/usdlock-staking-progam">
          <span>$LOCK Staking Program</span>
        </Link>
      </div>
    </div>
  )
}
