import { ChevronSvg, SearchSvg } from '@/components/Svg'
import { useWindowSize } from '@/utils/hooks/useWindowSize'
import Link from 'next/link'
import { useState } from 'react'

const Links = () => {
  return (
    <>
      <Link className="hover:gradient-text" href="/">
        <span>Swap</span>
      </Link>
      <Link className="hover:gradient-text" href="/dashboard">
        <span>Dashboard</span>
      </Link>
      <Link className="hover:gradient-text" href="/how-it-works">
        <span>How it works</span>
      </Link>
      <Link className="hover:gradient-text" href="/faq">
        <span>Faq</span>
      </Link>
    </>
  )
}

const CommonNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false)

  return (
    <>
      <div className="w-[170px] h-[44px] rounded-full relative">
        <input
          placeholder="Search a Tx"
          className="w-full h-full rounded-full text-sm pl-5 pr-12 bg-gray-100 text-gray-500 font-normal"
        />
        <SearchSvg className="absolute right-6 top-3 fill-gray-500" />
      </div>
      <Links />
      <button
        onClick={() => {
          setOpenDropdown(!openDropdown)
        }}
        className="flex group flex-row justify-center items-center gap-3 hover:gradient-text"
      >
        <span>$POOF</span>
        <ChevronSvg className="fill-white mt-0.5 group-hover:fill-[#F5C341]" />
        {openDropdown ? (
          <div className="absolute top-full right-0 w-[200px] h-[200px] bg-gray-500"></div>
        ) : null}
      </button>
    </>
  )
}

export const Navbar = () => {
  const desktopClassName = 'lg:flex hidden flex-row'
  const mobileClassName = 'flex w-full h-full flex-col'

  const [width] = useWindowSize()

  return (
    <div
      className={`${
        width < 1024 ? mobileClassName : desktopClassName
      } justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal`}
    >
      <CommonNavbar />
    </div>
  )
}
