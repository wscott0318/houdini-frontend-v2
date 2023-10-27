'use client'

import { Logo } from '@/components/Footer/Logo'
import LanguageDropDown from '@/components/Translate/LanguageDropDown'
import languages from '@/lib/locales/languages'
import useLockScroll from '@/utils/hooks/useLockScroll'
import { useWindowSize } from '@/utils/hooks/useWindowSize'
import { AnimatePresence } from 'framer-motion'
import { CheckBox } from 'houdini-react-sdk'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'

import { Drawer } from '../Drawer'
import { Portal } from '../Portal'
import { HamburgerSvg, SmokeSvg } from '../Svg'
import { Navbar } from './Navbar'

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [smoke, setSmoke] = useState(false)
  const [width] = useWindowSize()
  const [openLanguage, setOpenLanguage] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')

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
          <div className="flex flex-row gap-2 justify-center items-center absolute right-0">
            <CheckBox
              checked={smoke}
              setChecked={setSmoke}
              name="smokeToggle"
              icon={<SmokeSvg className="h-5 w-5" />}
            />
            <button
              className="relative rounded-[4px] bg-[#81818140] px-[4px] py-[4px]"
              onClick={() => setOpenLanguage((prevState) => !prevState)}
            >
              <div className="btn header-item ">
                <img
                  src={get(languages, `${selectedLang}.flag`).src}
                  alt="Language"
                  className="h-5 w-7"
                />
              </div>
              <LanguageDropDown
                open={openLanguage}
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
              />
            </button>
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
