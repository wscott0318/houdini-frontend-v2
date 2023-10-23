'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <ResponsivePage>
      <h1 className="head center bold">{t('houdiniLLC')}</h1>
      <h1 className="head center">{t('privacyPolicyH1')}</h1>

      <div>{t('privacyPolicyTitle')}</div>
      <div>{t('privacyC1')}</div>
      <div>{t('privacyC2')}</div>
      <div>(1) {t('privacyC3')}</div>
      <div>(2) {t('privacyC4')}.</div>
      <div>{t('privacyC5')}</div>
      <div>{t('privacyC6')}</div>
      <div>{t('privacyC7')}</div>
      <div>{t('privacyC8')}</div>
      <div>{t('privacyC9')}</div>
      <div>{t('privacyC10')}</div>
      <div>{t('privacyC11')}</div>
      <div>{t('privacyC12')}</div>
      <div>{t('privacyC13')}</div>
      <div>{t('cookies')}</div>
      <div>{t('privacyC14')}</div>
      <div>{t('privacyC15')}</div>
      <div>{t('privacyC16')}</div>
      <div>{t('sharing')}</div>
      <div>{t('privacyC17')}</div>
      <div>{t('privacyC18')}</div>
      <div>{t('privacyC19')}</div>
    </ResponsivePage>
  )
}
