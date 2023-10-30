'use client'

import img from '@/assets/Black_Swan_Logo.png'
import { ResponsivePage } from '@/components/ResponsivePage'
import { TranslatedContent } from '@/components/TranslatedContent'
import { useTranslation } from 'react-i18next'

export default function Compliance() {
  const { t } = useTranslation()

  const complianceContentKeys = [
    { text: 'complianceP1' },
    { text: 'complianceP2' },
    { text: 'complianceP3' },
    { text: 'complianceP4' },
    { text: 'complianceP5' },
    { text: 'complianceP6' },
    { text: 'complianceP7' },
    { text: 'complianceP8' },
    { text: 'complianceP9' },
    { text: 'complianceP10' },
    { text: 'complianceP11' },
    { text: 'complianceP12' },
    {
      text: [
        'complianceP13',
        <a href="#" key="compliance" target="_blank">
          {' '}
          link
        </a>,
      ],
    },
    { text: 'complianceP14' },
    { text: 'complianceP15' },
  ]

  return (
    <ResponsivePage>
      <h1 className="text-3xl leading-12 font-semibold mx-auto text-center">
        {t('houdiniLLC')}
      </h1>
      <h1 className="text-3xl leading-12 mx-auto text-center">
        {t('complianceH1')}
      </h1>
      <TranslatedContent contentKeys={complianceContentKeys} />

      <img className="center mb-12" src={img.src} alt="black-swan" />
      <div className="mt-4 leading-normal text-base opacity-50 font-normal no-underline">
        {t('complianceP17')}
        <a href="https://www.blackswandiagnostics.com" target="_blank">
          {''} www.blackswandiagnostics.com
        </a>
      </div>
    </ResponsivePage>
  )
}
