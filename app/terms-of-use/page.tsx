'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { useTranslation } from 'react-i18next'

export default function TermsOfUse() {
  const { t } = useTranslation()

  return (
    <ResponsivePage>
      <div className="works">
        <h1 className="head center bold">{t('houdiniLLC')}</h1>
        <h1 className="head center">{t('termsP1')}</h1>

        <div>{t('general')}</div>
        <div>{t('termsP2')}</div>
        <div>{t('termsP3')}</div>
        <div>{t('termsP4')}</div>
        <div>{t('termsP5')}</div>
        <ol style={{ marginLeft: '1em' }}>
          <li>
            <div>{t('termsP6')}</div>
          </li>
          <li>
            <div>{t('termsP7')}</div>
          </li>
          <li>
            <div>{t('termsP8')}</div>
          </li>
          <li>
            <div>{t('termsP9')}</div>
          </li>
          <li>
            <div>{t('termsP10')}</div>
          </li>
        </ol>
        <div>{t('termsP11')}</div>
        <div>{t('termsP12')}</div>
        <div>{t('termsP13')}</div>
        <div>{t('termsP14')}</div>
        <div>{t('termsP15')}</div>
        <div>{t('termsP16')}</div>
        <div>{t('termsP17')}</div>
        <div>{t('termsP18')}</div>
        <div>{t('termsP19')}</div>
        <div>{t('termsP20')}</div>
        <div>{t('termsP21')}</div>
        <div>{t('termsP22')}</div>
        <div>{t('termsP23')}</div>
        <div>{t('termsP24')}</div>
        <div>{t('termsP25')}</div>
        <div>{t('termsP26')}</div>
        <div>{t('termsP27')}</div>
        <div>{t('termsP28')}</div>
        <div>{t('termsP29')}</div>
        <div>{t('termsP30')}</div>
        <ul style={{ marginLeft: '1em' }}>
          <li>
            <div>{t('termsP31')}</div>
          </li>
          <li>
            <div>{t('termsP32')}</div>
          </li>
          <li>
            <div>{t('termsP33')}</div>
          </li>
        </ul>
        <div>{t('termsP34')}</div>
        <div>{t('termsP35')}</div>
        <div>{t('termsP36')}</div>
        <div>{t('termsP37')}</div>
        <div>{t('termsP38')}</div>
        <div>{t('termsP39')}</div>
        <div>{t('termsP40')}</div>
        <div>{t('termsP41')}</div>
        <div>{t('termsP42')}</div>
      </div>
    </ResponsivePage>
  )
}
