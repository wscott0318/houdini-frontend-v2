import { CardComponent, SearchInput } from 'houdini-react-sdk'
import Link from 'next/link'
import { useState } from 'react'

import { ChevronSvg } from '@/components/Svg'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

const Links = ({ setIsOpen }: { setIsOpen?: any }) => {
  return (
    <>
      <Link
        onClick={() => {
          setIsOpen(false)
        }}
        className="hover:gradient-text"
        href="/"
      >
        <span>Swap</span>
      </Link>
      <Link
        onClick={() => {
          setIsOpen(false)
        }}
        className="hover:gradient-text"
        href="/dashboard"
      >
        <span>Dashboard</span>
      </Link>
      <Link
        onClick={() => {
          setIsOpen(false)
        }}
        className="hover:gradient-text"
        href="/how-it-works#howItWorks"
      >
        <span>How it works</span>
      </Link>
      <Link
        onClick={() => {
          setIsOpen(false)
        }}
        className="hover:gradient-text"
        href="/how-it-works#faq"
      >
        <span>Faq</span>
      </Link>
    </>
  )
}

const CommonNavbar = ({ setIsOpen }: { setIsOpen?: any }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value: string) => {
    console.log(value)
  }

  return (
    <>
      <SearchInput
        onChange={handleSearch}
        name="searchTx"
        placeholder="Search a Tx"
        placeholderExpanded="Enter your Houdini ID"
      />
      <Links setIsOpen={setIsOpen} />
      <button
        onClick={() => {
          setOpenDropdown(!openDropdown)
        }}
        className="flex relative group flex-row justify-center items-center gap-3"
      >
        <span className="group-hover:gradient-text">$POOF</span>
        <ChevronSvg
          className={`${
            openDropdown ? 'rotate-180' : 'rotate-0'
          } fill-white mt-0.5 group-hover:fill-[#F5C341]`}
        />
        {openDropdown ? (
          <div className="absolute top-full lg:right-0 mt-2 flex flex-col justify-between items-center p-1">
            <CardComponent widthClass="w-[210px]" heightClass="h-[80px]">
              <div className="flex flex-col justify-start items-start">
                <Link
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="hover:gradient-text text-white"
                  href="/"
                >
                  <span className="text-sm">Buy $POOF</span>
                </Link>
                <Link
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="hover:gradient-text text-white"
                  href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x888ceA2BBDD5D47a4032cf63668D7525C74af57A"
                >
                  <span className="text-sm">Buy $POOF on Uniswap</span>
                </Link>
              </div>
            </CardComponent>
          </div>
        ) : null}
      </button>
    </>
  )
}

export const Navbar = ({ setIsOpen }: { setIsOpen?: any }) => {
  const desktopClassName = 'lg:flex hidden flex-row'
  const mobileClassName = 'flex w-full h-full flex-col'

  const [width] = useWindowSize()

  return (
    <div
      className={`${
        width < 1024 ? mobileClassName : desktopClassName
      } justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal`}
    >
      <CommonNavbar setIsOpen={setIsOpen} />
    </div>
  )
}
