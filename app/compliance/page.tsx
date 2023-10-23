'use client'

import img from '@/assets/Black_Swan_Logo.png'
import { ResponsivePage } from '@/components/ResponsivePage'
import { useTranslation } from 'react-i18next'

export default function Compliance() {
  const { t } = useTranslation()
  return (
    <ResponsivePage>
      <h1 className="head center bold">{t('houdiniLLC')}</h1>
      <h1 className="head center">{t('complianceH1')}</h1>

      <div>{t('complianceP1')}</div>
      <div>{t('complianceP2')}</div>
      <div>{t('complianceP3')}</div>
      <div>{t('complianceP4')}</div>
      <div>{t('complianceP5')}</div>
      <div>{t('complianceP6')}</div>
      <div>{t('complianceP7')}</div>
      <div>{t('complianceP8')}</div>
      <div>{t('complianceP9')}</div>
      <div>t{t('complianceP10')}</div>
      <div>{t('complianceP11')}</div>
      <div>{t('complianceP12')}</div>
      <div>
        t{t('complianceP13')}
        <a href="#" target="_blank">
          {t('link')}
        </a>
      </div>
      <div>({t('complianceP14')})</div>
      <div>{t('complianceP15')}</div>
      <div className="mb-12">{t('complianceP16')} </div>

      <img className="center mb-12" src={img.src} alt="black-swan" />
      <div>
        {t('complianceP17')}
        <a href="https://www.blackswandiagnostics.com" target="_blank">
          www.blackswandiagnostics.com
        </a>
      </div>
    </ResponsivePage>
  )
}
