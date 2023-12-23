'use client'

import dayjs from 'dayjs'
import { Logo } from '@/components/Footer/Logo'
import { FooterNavBar } from './FooterNavBar'

export function Footer() {
  const today = dayjs()
  
  return (
    <div className="footer-gradient col-span-1 grid grid-cols-1 place-content-center place-items-center gap-[35px] md:gap-[35px] pb-10">
      <Logo />
      <FooterNavBar />
      <div className="z-[1] text-xs font-light gradient-text">
        © {today.year()} Houdini Swap, All rights reserved.
      </div>
    </div>
  )
}
