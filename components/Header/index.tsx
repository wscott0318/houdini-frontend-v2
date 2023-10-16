'use client'

import { Logo } from '@/components/Footer/Logo'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import { Drawer } from '../Drawer'
import { Portal } from '../Portal'
import { ChevronSvg, HamburgerSvg, SearchSvg, SmokeSvg } from '../Svg'

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <div className="w-full relative p-2">
          <div className="bg-gray-500 w-[50px] h-[25px] flex flex-row justify-start items-center absolute right-0">
            <SmokeSvg className="fill-white" />
          </div>
        </div>
        <div className="w-full">
          <nav className="col-span-1 flex flex-row justify-between w-full items-center">
            <Logo isHeader={true} />
            <button
              onClick={() => {
                setDrawerOpen(!drawerOpen)
              }}
              className="lg:hidden flex hover:cursor-pointer"
            >
              <HamburgerSvg className="fill-white h-[40px] w-[40px]" />
            </button>
            <div className="lg:flex hidden flex-row justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal">
              <div className="w-[170px] h-[44px] rounded-full relative">
                <input
                  placeholder="Search a Tx"
                  className="w-full h-full rounded-full text-sm pl-5 pr-12 bg-gray-100 text-gray-500 font-normal"
                />
                <SearchSvg className="absolute right-6 top-3 fill-gray-500" />
              </div>
              <div>Swap</div>
              <div>Dashboard</div>
              <div>How it works</div>
              <div>Faq</div>
              <div className="flex flex-row justify-center items-center gap-3">
                <span>$POOF</span>
                <ChevronSvg className="fill-white mt-0.5" />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {drawerOpen && (
          <Portal>
            <Drawer setIsOpen={setDrawerOpen} isOpen={drawerOpen}>
              <div className="flex w-full h-full flex-col justify-center items-center gap-[35px] text-[19px] leading-[25px] font-normal">
                <div className="w-[170px] h-[44px] rounded-full relative">
                  <input
                    placeholder="Search a Tx"
                    className="w-full h-full rounded-full text-sm pl-5 pr-12 bg-gray-100 text-gray-500 font-normal"
                  />
                  <SearchSvg className="absolute right-6 top-3 fill-gray-500" />
                </div>
                <div>Swap</div>
                <div>Dashboard</div>
                <div>How it works</div>
                <div>Faq</div>
                <div className="flex flex-row justify-center items-center gap-3">
                  <span>$POOF</span>
                  <ChevronSvg className="fill-white mt-0.5" />
                </div>
              </div>
            </Drawer>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
