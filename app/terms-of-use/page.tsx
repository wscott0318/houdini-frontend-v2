'use client'

import { useTranslation } from 'react-i18next'

import { ResponsivePage } from '@/components/ResponsivePage'
import { TranslatedContent } from '@/components/TranslatedContent'

export default function TermsOfUse() {
  const { t } = useTranslation()

  const termsContentKeys = [
    { text: 'general', title: true },
    { text: 'termsP2' },
    { text: 'termsP3' },
    { text: 'termsP4', title: true },
    { text: 'termsP5' },
    {
      text: 'termsP6',
      indent: true,
    },
    {
      text: 'termsP7',
      indent: true,
    },
    {
      text: 'termsP8',
      indent: true,
    },
    {
      text: 'termsP9',
      indent: true,
    },
    {
      text: 'termsP10',
      indent: true,
    },
    { text: 'termsP11' },
    { text: 'termsP12', title: true },
    { text: 'termsP13' },
    { text: 'termsP14' },
    { text: 'termsP15', title: true },
    { text: 'termsP16' },
    { text: 'termsP17' },
    { text: 'termsP18', title: true },
    { text: 'termsP19' },
    { text: 'termsP20' },
    { text: 'termsP21' },
    { text: 'termsP22', title: true },
    { text: 'termsP23' },
    { text: 'termsP24' },
    { text: 'termsP25', title: true },
    { text: 'termsP26' },
    { text: 'termsP27', title: true },
    { text: 'termsP28', title: true },
    { text: 'termsP29' },
    { text: 'termsP30' },
    {
      text: 'termsP31',
      indent: true,
    },
    {
      text: 'termsP32',
      indent: true,
    },
    {
      text: 'termsP33',
      indent: true,
    },
    { text: 'termsP34' },
    { text: 'termsP35' },
    { text: 'termsP36' },
    { text: 'termsP37' },
    { text: 'termsP38' },
    { text: 'termsP39' },
    { text: 'termsP40' },
    { text: 'termsP41' },
    { text: 'termsP42' },
  ]

  return (
    <ResponsivePage>
      <h1 className="text-3xl leading-12 font-semibold mx-auto text-center">
        {t('houdiniLLC')}
      </h1>
      <h1 className="text-3xl leading-12 mx-auto text-center">
        {t('termsP1')}
      </h1>

      <TranslatedContent contentKeys={termsContentKeys} />
    </ResponsivePage>
  )
}
