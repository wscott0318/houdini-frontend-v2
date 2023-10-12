'use client'
import Image from 'next/image'

import logo from '@/assets/logo.png'

export function Header() {
  return (
    <nav className="flex w-full flex-row justify-between items-center">
      <Image src={logo} alt="Houdini Swap" className="w-[209px] h-[71px]" />
      <ul className="flex flex-row justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal">
        <li>Swap</li>
        <li>Dashboard</li>
        <li>How it works</li>
        <li>Faq</li>
        <li>$POOF</li>
      </ul>
    </nav>
  )
}
