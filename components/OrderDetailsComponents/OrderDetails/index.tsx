import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { NeedHelp } from '@/components/NeedHelp'
import OrderDeletedModal from '@/components/OrderDetailsComponents/OrderDeletedModal'
import { OrderDetailsModal } from '@/components/OrderDetailsComponents/OrderDetailsModal'
import { ORDER_STATUS, OrderStep } from '@/utils/constants'

export const OrderDetails = ({ order, currentStep, setCurrentStep }: { order: any, setCurrentStep: Function, currentStep: OrderStep }) => {
  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

  const { t } = useTranslation()
  const isDeleted = order?.status === ORDER_STATUS.DELETED
  const isExpired = order?.status === ORDER_STATUS.EXPIRED

  return (
    <>
      {!isDeleted && !isExpired && (
        <div
          id="orderdetails"
          className={`flex flex-col relative z-30 ${!widgetMode ? 'gap-[30px] pb-[50px]' : 'mb-10'}`}
        >
          <div className="lg:text-[81px] text-[50px] text-center font-extrabold text-[#FFFFFF] lg:leading-[102px] leading-[50px]">
            {t('orderDetailsPageTitle')}
          </div>
          <div className="lg:text-[19px] font-normal lg:leading-[30px] leading-[20px] text-[#B8CAFC] text-center">
            {t('orderDetailsContent')}
          </div>
        </div>
      )}

      <div className="flex flex-col last:pb-[165px] w-full">
        <div className="flex flex-col items-center gap-[10px] w-full">
          {!isDeleted ? (
            <OrderDetailsModal order={order} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          ) : (
            <OrderDeletedModal orderId={order?.houdiniId} />
          )}

          {!widgetMode ? (
            <div className="flex py-[10px] md:px-[100px] md:py-[50px] items-center w-full">
              <div className="flex py-[10px] md:px-[100px] md:py-[20px] items-center w-full justify-center">
                <NeedHelp />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
