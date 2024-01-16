import i18n from '@/app/i18n'
import languages from '@/lib/locales/languages'
import useHandleClickAway from '@/utils/hooks/useHandleClickAway'
import { get, map } from 'lodash'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { withTranslation } from 'react-i18next'

const LanguageDropdown = ({
  open,
  selectedLang,
  setSelectedLang,
  setOpen,
}: {
  open: boolean
  selectedLang: any
  setSelectedLang: Dispatch<SetStateAction<string>>
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  useEffect(() => {
    const currentLanguage: any = localStorage.getItem('I18N_LANGUAGE')
    setSelectedLang(currentLanguage)
  }, [setSelectedLang])

  const changeLanguageAction = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('I18N_LANGUAGE', lang)
    setSelectedLang(lang)
  }

  const menuRef = useHandleClickAway(() => setOpen(false))

  return (
    <div className="absolute right-0 top-[120%] z-50">
      {open && (
        <div className="relative flex w-[150px] flex-col rounded bg-[#202020] p-2">
          <menu ref={menuRef} className="language-switch dropdown-menu-end">
            {map(Object.keys(languages), (key: any) => {
              const isDisabled = key !== 'en'
              return <li className={isDisabled ? 'cursor-not-allowed' : undefined} key={key}>
                <div
                  onClick={() => !isDisabled && changeLanguageAction(key)}
                  className={`flex flex-row items-center justify-start gap-2 px-2 py-0.5 ${selectedLang === key ? 'rounded bg-[#404040]' : 'none'
                    } ${isDisabled ? 'opacity-50 pointer-events-none' : 'hover:rounded hover:bg-[#404040]'}`}
                >
                  <span className="text-white ">
                    {get(languages, `${key}.label`)}
                  </span>
                </div></li>
            })}

          </menu>
        </div>
      )}
    </div >
  )
}

export default withTranslation()(LanguageDropdown)
