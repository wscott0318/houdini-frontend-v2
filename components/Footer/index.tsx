'use client'

import { Logo } from '@/components/Footer/Logo'

import { FooterNavBar } from './FooterNavBar'

export function Footer() {
  return (
    <div className="footer-gradient col-span-1 grid grid-cols-1 place-content-center place-items-center gap-[50px] md:gap-[110px]">
      <Logo />
      <FooterNavBar />
    </div>
  )
}
