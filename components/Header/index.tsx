'use client'

import { Logo } from '@/components/Footer/Logo'
import useLockScroll from '@/utils/hooks/useLockScroll'
import { useWindowSize } from '@/utils/hooks/useWindowSize'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { Drawer } from '../Drawer'
import { Portal } from '../Portal'
import { HamburgerSvg, SmokeSvg } from '../Svg'
import { Navbar } from './Navbar'

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [width] = useWindowSize()

  useEffect(() => {
    if (width >= 1024) {
      setDrawerOpen(false)
    }
  }, [width])

  useLockScroll(drawerOpen)

  return (
    <>
      <div className="relative">
        <div className="w-full relative p-2">
          <div className="bg-gray-500 rounded-[10px] p-0.5 w-[50px] h-[25px] flex flex-row justify-start items-center absolute right-0">
            <div className="bg-gray-700 w-5 h-5 rounded-[6px]">
              <SmokeSvg className="fill-white w-full h-full p-0.5" />
            </div>
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
              {drawerOpen ? null : (
                <HamburgerSvg className="fill-white h-[40px] w-[40px]" />
              )}
            </button>
            {width >= 1024 ? <Navbar /> : null}
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {drawerOpen && width < 1024 ? (
          <Portal>
            <Drawer setIsOpen={setDrawerOpen} isOpen={drawerOpen}>
              <Navbar setIsOpen={setDrawerOpen} />
            </Drawer>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  )
}
