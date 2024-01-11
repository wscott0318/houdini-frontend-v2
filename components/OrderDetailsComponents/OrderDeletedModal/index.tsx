import React from 'react'
import { GeneralModal } from '@/components/GeneralModal'
import { useTranslation } from 'react-i18next'
import OrderIdRoundBox from '@/components/OrderDetailsComponents/OrderIdRoundBox'

const OrderDeletedModal = ({ orderId }: { orderId?: string }) => {
  const { t } = useTranslation()
  return <GeneralModal >
    <div className='min-h-[200px] flex flex-col justify-center items-center text-center space-evenly'>
      <h2 className='text-3xl text-red-600'>{t('orderDeleted')}</h2>
      <p className='my-6'>{t('orderDeletedMessage')}</p>
      {orderId && <OrderIdRoundBox orderId={orderId} />}
    </div>

  </GeneralModal>
}

export default OrderDeletedModal