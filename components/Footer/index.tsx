'use client'

import dayjs from 'dayjs'
import NextLink from 'next/link'
import { useState } from 'react'

import { Logo } from '@/components/Footer/Logo'
import {
  GitBookSvg,
  MediumSvg,
  MinusIcon,
  PlusIcon,
  TelegramSvg,
  YouTubeSvg,
} from '@/components/Svg'
import { useMediaQuery } from '@/hooks'

const Link = ({
  children,
  href,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
  href ? (
    <NextLink
      className={`${
        className || ''
      } z-[1] hover:gradient-text font-light text-gray-400`}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  ) : (
    children
  )

const LinkCategory = ({
  children,
  name,
  isSmallScreen,
}: {
  children: JSX.Element[] | JSX.Element
  name: string
  isSmallScreen: boolean
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className={`flex flex-col gap-2`}>
      <div className="flex justify-between">
        <h3 className="fond-medium text-lg">{name}</h3>
        {isSmallScreen && (
          <button onClick={() => setDrawerOpen((prev) => !prev)}>
            {drawerOpen ? <MinusIcon /> : <PlusIcon />}
          </button>
        )}
      </div>
      {(!isSmallScreen || drawerOpen) && children}
    </div>
  )
}

export const Footer = () => {
  const today = dayjs()
  const isMediumScreen = useMediaQuery('(max-width: 768px)')
  const isSmallScreen = useMediaQuery('(max-width: 500px)')

  return (
    <footer className="relative z-[1]">
      <div className="custom-footer-border h-[3px] mb-[-0.6px]" />
      <div className="col-span-1 grid grid-cols-1 place-content-center place-items-center gap-[35px] pb-10 custom-footer-shadow px-2">
        <div
          className={`flex flex-wrap justify-evenly gap-10 w-full max-w-screen-xl mt-[80px] ${
            isMediumScreen ? 'flex-col' : ''
          }`}
        >
          <div className="flex flex-col gap-6">
            <Logo />

            <div className="z-[1] flex flex-row justify-center items-center gap-[20px]">
              <Link className="group" href="https://t.me/houdiniswap">
                <TelegramSvg className="w-6 h-6 fill-white group-hover:fill-[#F5C341]" />
              </Link>
              <Link
                className="group"
                href="https://houdiniswap.gitbook.io/product-docs/"
              >
                <GitBookSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
              </Link>
              <Link
                className="group"
                href="https://www.youtube.com/@houdiniswap"
              >
                <YouTubeSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
              </Link>
              <Link className="group" href="https://houdiniswap.medium.com/">
                <MediumSvg className="w-7 h-7 fill-white group-hover:fill-[#F5C341]" />
              </Link>
            </div>
          </div>

          <div
            className={`flex ${
              isMediumScreen ? 'justify-center' : 'w-[60%] justify-between'
            } ${isSmallScreen ? 'flex-col p-2 min-h-[224px]' : ''} gap-8 m-6`}
          >
            <LinkCategory isSmallScreen={isSmallScreen} name="Resources">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/contact-us"
              >
                Contact Us
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/"
              >
                Documentation
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/whitepaper"
              >
                Whitepaper
              </Link>
              <Link href="/get-api-access">Integrations</Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/bug-bounty-program"
              >
                Bug Bounty
              </Link>
            </LinkCategory>

            <LinkCategory isSmallScreen={isSmallScreen} name="Help">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/get-started/how-it-works"
              >
                How it Works
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/faqs"
              >
                FAQs
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/HoudiniSwapSupport_bot"
              >
                Support
              </Link>
            </LinkCategory>
            <LinkCategory isSmallScreen={isSmallScreen} name="Notices">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/policies/privacy-policy"
              >
                Privacy Notice
              </Link>
              {/* <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/policies/user-data-policy"
              >
                User Data Policy
              </Link> */}
              <Link href="/terms-of-use">Terms of Service</Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/policies/compliance-and-risk-policy"
              >
                Compliance Policy
              </Link>
            </LinkCategory>

            <LinkCategory isSmallScreen={isSmallScreen} name="Staking">
              <Link href="/dashboard">Stake</Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/tokenomics/usdlock-staking-progam"
              >
                Staking Program
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/notices-and-policies/staking-terms-of-service"
              >
                Staking Terms
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.houdiniswap.com/houdini-swap/tokenomics"
              >
                Tokenomics
              </Link>
            </LinkCategory>
          </div>
        </div>
        <div className="z-[1] text-xs font-light gradient-text rainbow-text">
          © {today.year()} Houdini Swap, All rights reserved.
        </div>
      </div>
    </footer>
  )
}
