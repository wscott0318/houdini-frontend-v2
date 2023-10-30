'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { TranslatedContent } from '@/components/TranslatedContent'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  const privacyContentKeys = [
    { text: 'privacyPolicyTitle', title: true },
    { text: 'privacyC1' },
    { text: 'privacyC2' },
    { text: 'privacyC3', indent: true },
    { text: 'privacyC4', indent: true },
    { text: 'privacyC5' },
    { text: 'privacyC6' },
    { text: 'privacyC7' },
    { text: 'privacyC8' },
    { text: 'privacyC9', title: true },
    { text: 'privacyC10' },
    { text: 'privacyC11' },
    { text: 'privacyC12' },
    { text: 'privacyC13' },
    { text: 'cookies', title: true },
    { text: 'privacyC14' },
    { text: 'privacyC15', title: true },
    { text: 'privacyC16' },
    { text: 'sharing', title: true },
    { text: 'privacyC17' },
    { text: 'privacyC18' },
    { text: 'privacyC19' },
  ]

  return (
    <ResponsivePage>
      <h1 className="text-3xl leading-12 font-semibold mx-auto text-center">
        {t('houdiniLLC')}
      </h1>
      <h1 className="text-3xl leading-12 mx-auto text-center">
        {t('privacyPolicyH1')}
      </h1>

      <TranslatedContent contentKeys={privacyContentKeys} />
    </ResponsivePage>
  )
}
