'use client'

import { Logo } from '@/components/Footer/Logo'
import React from 'react'

export function Header() {
  return (
    <nav className="col-span-1 flex flex-row justify-between w-full items-center">
      <Logo isHeader={true} />
      <div className="flex flex-row justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal">
        <div>Swap</div>
        <div>Dashboard</div>
        <div>How it works</div>
        <div>Faq</div>
        <div>$POOF</div>
      </div>
    </nav>
  )
}
