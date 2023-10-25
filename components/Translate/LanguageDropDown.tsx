import i18n from '@/app/i18n'
import languages from '@/lib/locales/languages'
import { get, map } from 'lodash'
import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next'

const LanguageDropdown = ({
  open,
  selectedLang,
  setSelectedLang,
}: {
  open: boolean
  selectedLang: any
  setSelectedLang: any
}) => {
  useEffect(() => {
    const currentLanguage: any = localStorage.getItem('I18N_LANGUAGE')
    setSelectedLang(currentLanguage)
  }, [])

  const changeLanguageAction = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('I18N_LANGUAGE', lang)
    setSelectedLang(lang)
  }

  return (
    <div className="absolute right-0 top-[120%] z-50">
      {open ? (
        <div className="relative flex w-[150px] flex-col rounded bg-[#202020] p-2">
          <div className="language-switch dropdown-menu-end">
            {map(Object.keys(languages), (key: any) => {
              const flagSrc = get(languages, `${key}.flag`) // Provide a default flag source

              return (
                <div
                  key={key}
                  onClick={() => changeLanguageAction(key)}
                  className={`flex flex-row items-center justify-start gap-2 px-1 py-0.5 hover:rounded hover:bg-[#404040] ${
                    selectedLang === key ? 'rounded bg-[#404040]' : 'none'
                  }`}
                >
                  <img src={flagSrc.src} alt="Language" className="h-5 w-7" />
                  <span className="text-white">
                    {get(languages, `${key}.label`)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default withTranslation()(LanguageDropdown)
