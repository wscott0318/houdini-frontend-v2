'use client'

import { Logo } from '@/components/Footer/Logo'
import { FooterNavBar } from './FooterNavBar'

export function Footer() {
  return (
    <div className="col-span-1 grid grid-cols-1 place-content-center place-items-center gap-[110px]">
      <Logo />
      <FooterNavBar />
    </div>
  )
}
