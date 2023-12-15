import { CardComponent } from 'houdini-react-sdk'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Maintenance = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[700px] flex justify-center items-center">
      <CardComponent>
        <div className="text-3xl font-light text-center">{t('maintananceText')}</div>
      </CardComponent>
    </div>
  )
}

export default Maintenance
