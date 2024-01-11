import React from 'react'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { useTranslation } from 'react-i18next'

const OrderIdRoundBox = ({ orderId }: { orderId: string }) => {
    const { t } = useTranslation()
    return (
        <div className='md:w-35% sm:w-50%'><OrderDetailRoundbox border="custom-houdini-id-gradient1">
            <div className="text-center lg:text-[15px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                {t('orderDetailModalOrderID')}:
            </div>
            <Clipboardbox
                concept={`${orderId}`}
                fontSize="lg:text-[15px] text-[12px]"
                textColor="text-[#FFFFFF99]"
            />
        </OrderDetailRoundbox></div>
    )
}

export default OrderIdRoundBox