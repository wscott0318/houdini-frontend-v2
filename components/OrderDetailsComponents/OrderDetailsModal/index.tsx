import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfirmDeposit } from '@/components/ConfirmDepositModal'
import { EraseOrder } from '@/components/EraseModal'
import { GeneralModal } from '@/components/GeneralModal'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { MetalboarderedTransRoundbox } from '@/components/GeneralModal/MetalboarderedTransRoundbox'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { OrderProgress } from '@/components/OrderProgress'
import { useTokens } from '@/hooks'
import { ORDER_STATUS } from '@/utils/constants'
import { dateFormatter, timeFormatter } from '@/utils/helpers'

interface OrderDetailsModalProps {
  order: any
}

export const OrderDetailsModal = ({ order }: OrderDetailsModalProps) => {
  const [confirmDepositModal, setConfirmDepositModal] = useState(false)
  const [eraseModal, setEraseModal] = useState(false)

  const { t } = useTranslation()

  const orderExpired = order?.status === ORDER_STATUS.EXPIRED
  const recipientWallet = order?.receiverAddress
  const orderId = order?.houdiniId
  const swapTime = order?.eta

  const { getAddressUrl, findTokenBySymbol } = useTokens()

  return (
    <>
      <GeneralModal>
        <div className="flex md:flex-row flex-wrap lg:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
          <div className="md:w-35% sm:w-50%">
            <OrderDetailRoundbox border="custom-step-gradient1">
              <div className="text-center lg:text-[15px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
                {t('orderDetailModalOrderID')}:
              </div>
              <Clipboardbox
                concept={`${orderId}`}
                fontSize="lg:text-[15px] text-[12px]"
                textColor="text-[#FFFFFF99]"
              />
            </OrderDetailRoundbox>
          </div>
          <div className="md:w-10% md:pt-0 lg:pt-[5px] sm:w-50%">
            <OrderDetailRoundbox border="custom-step-gradient1">
              <div className="text-center lg:text-[14px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-60 font-bold">
                {t('orderDetailModalCreationTime')}
              </div>
              <div className="text-center lg:text-[15px] text-[12px] text-[#FFFFFF] leading-[24px] text-opacity-50 font-normal">
                {`${dateFormatter(order?.created)}, ${timeFormatter(
                  order?.created,
                )}`}
              </div>
            </OrderDetailRoundbox>
          </div>
        </div>
        <IndustrialCounterLockup>
          <div className="flex flex-col w-full items-center justify-center gap-[20px] px-[20px]">
            <div className="items-center w-full justify-center">
              <MetalboarderedTransRoundbox>
                <div className="relative flex flex-col lg:flex-row gap-[32px] px-[50px] py-[30px]">
                  <OrderProgress order={order} />
                </div>
              </MetalboarderedTransRoundbox>
            </div>
            <MetalboarderedTransRoundbox>
              {orderExpired ? (
                <h2 className="text-3xl text-red-600 mx-[50px] md:mx-[100px] my-[20px] text-center">
                  {t('orderExpiredText')}
                </h2>
              ) : (
                <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
                  <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
                    {t('orderDetailsModalTodaysAverageSwapTime')}:
                  </div>
                  <div className="text-center md:text-[19px] md:leading-[24px] font-bold md:whitespace-nowrap">
                    {`${swapTime} ${t('orderDetailsSwapTimeMinute')}`}
                  </div>
                </div>
              )}
            </MetalboarderedTransRoundbox>
          </div>
        </IndustrialCounterLockup>

        <div className="pt-[15px] lg:px-[10px] pb-[5px] w-full">
          <div className="p-[2px] w-full rounded-[20px] custom-houdini-id-gradient1">
            <div className="flex flex-wrap lg:flex-nowrap lg:justify-between justify-center items-center rounded-[20px] w-full custom-houdini-id-gradient custom-houdini-id-shadow lg:px-[30px] px-[5px] py-[10px]">
              <div className="sm:flex block lg:w-[60%] w-full lg:justify-between justify-center px-[4px] gap-4">
                <div className="text-center lg:text-[15px] lg:leading-[24px] text-[14px] font-bold text-opacity-60 text-[#FFFFFF99]">
                  {t('orderDetailModalRecipientWallet')}:
                </div>
                <div className="text-center text-xs overflow-hidden lg:text-[15px] lg:leading-[24px] text-[13px] font-normal text-opacity-50 text-[#FFFFFF99]">
                  <Link
                    href={`${getAddressUrl(order.outSymbol)}${recipientWallet}`}
                    target="_blank"
                  >
                    {recipientWallet}
                  </Link>
                </div>
              </div>
              <div className="flex lg:w-[40%] lg:justify-between justify-center flex-row items-center gap-2.5 px-[4px]">
                <div className="text-center lg:text-[15px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 lg:pl-[60px] text-[#FFFFFF99]">
                  {t('orderDetailModalWillReceive')}
                </div>
                <div className="flex gap-2.5 items-center">
                  <div className="text-center lg:text-[15px] text-[14px] font-normal">
                    {order?.outAmount}
                  </div>
                  <img
                    src={findTokenBySymbol(order?.outSymbol)?.icon}
                    className="w-[20px] h-[20px]"
                    alt="outSymbol"
                  />
                  <div className="text-base text-center lg:text-[15px] text-[14px] font-normal">
                    {findTokenBySymbol(order?.outSymbol)?.displayName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GeneralModal>

      <ConfirmDeposit
        confirmDepositModal={confirmDepositModal}
        setConfirmDepositModal={setConfirmDepositModal}
        houdiniId={order?.houdiniId}
      />

      <EraseOrder
        eraseModal={eraseModal}
        setEraseModal={setEraseModal}
        houdiniId={order?.houdiniId}
      />
    </>
  )
}
