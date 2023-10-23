'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { useTranslation } from 'react-i18next'

export default function BugBountyProgram() {
  const { t } = useTranslation()
  return (
    <ResponsivePage>
      <h1 className="">{t('houdiniLLC')}</h1>
      <h1 className="">{t('houdiniBugBountyHeader')}</h1>
      <div>{t('bugBountyP1')}</div>
      <div>
        {t('bugBountyP2')}{' '}
        <a target="_blank" href="https://houdini-swap.gitbook.io/product-docs/">
          {t('gitbook')}
        </a>
      </div>
      <div>{t('bugBountyP3')}</div>
      <div>{t('bugBountyP4')}</div>
      <div>{t('bugBountyP5')}</div>
      <div>{t('bugBountyP6')}</div>
      <div>{t('bugBountyP7')}</div>
      <div>{t('bugBountyP8')}</div>
      <div>{t('bugBountyP9')}</div>
      <div>{t('bugBountyP10')}</div>
      <div>{t('bugBountyP11')}</div>
      <div>{t('bugBountyP12')}</div>
      <div>{t('bugBountyP13')}</div>
      <div>{t('bugBountyP14')}</div>
      <div>{t('bugBountyP15')}</div>
      <div>{t('bugBountyP16')}</div>
      <div>{t('bugBountyP17')}</div>
      <div>{t('bugBountyP18')}</div>
      <div>{t('bugBountyP19')}</div>
      <div>{t('bugBountyP20')}</div>
      <div>{t('bugBountyP21')}</div>
      <div>{t('bugBountyP22')}</div>
      <div>{t('bugBountyP23')}</div>
      <div>{t('bugBountyP24')}</div>
      <div>{t('bugBountyP25')}</div>
      <div>{t('bugBountyP26')}</div>
      <button
          className="submit-report-button"
          onClick={() => {
            // setModalOpen(true);
          }}
        >
          {t('submitReportText')}
        </button>
    </ResponsivePage>
  )
}
