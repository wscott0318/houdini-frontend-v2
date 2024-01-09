import { useQuery } from '@apollo/client'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { GeneralModal } from '@/components/GeneralModal'
import { Clipboardbox } from '@/components/GeneralModal/Clipboardbox'
import { IndustrialCounterLockup } from '@/components/GeneralModal/IndustrialCounterLockup'
import { MetalboarderedTransRoundbox } from '@/components/GeneralModal/MetalboarderedTransRoundbox'
import { OrderDetailRoundbox } from '@/components/GeneralModal/OrderDetailRoundbox'
import { OrderProgress } from '@/components/OrderProgress'
import { Protocol4Svg } from '@/components/Svg'
import { TOKENS_QUERY } from '@/lib/apollo/query'

interface OrderDetailsModalProps {
  orderId: string
  creationTime: Date
  recipientWallet: string
  receiveAmount: number
  tokenType: string
  swapTime: number
  order: any
}

export const OrderDetailsModal = (props: OrderDetailsModalProps) => {
  const { t } = useTranslation()
  const { data: tokensData, loading } = useQuery(TOKENS_QUERY)

  const DateFormatter = () => {
    const date = props.creationTime
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const formattedDate = formatter.format(date)
    return formattedDate
  }
  const TimeFormatter = () => {
    const date = props.creationTime
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
    const formattedTime = formatter.format(date)
    return formattedTime
  }

  const findTokenBySymbol = useCallback(
    (symbol: string) => {
      if (!loading) {
        const tokens = tokensData?.tokens
        const token = tokens?.find((token: any) => token.symbol === symbol)
        return token
          ? { displayName: token.displayName, icon: token.icon }
          : null
      }
      return { displayName: '', icon: '' }
    },
    [loading],
  )

  return (
    <GeneralModal>
      <div className="flex md:flex-row flex-wrap lg:justify-between lg:gap-0 gap-[5px] items-center justify-center w-full px-[10px] py-[5px]">
        <div className="md:w-35% sm:w-50%">
          <OrderDetailRoundbox border="custom-step-gradient1">
            <div className="text-center lg:text-[15px] text-[12px] font-bold text-[#FFFFFF] text-opacity-60">
              {t('orderDetailModalOrderID')}:
            </div>
            <Clipboardbox
              concept={`${props.orderId}`}
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
              {`${DateFormatter()}, ${TimeFormatter()}`}
            </div>
          </OrderDetailRoundbox>
        </div>
      </div>
      <IndustrialCounterLockup>
        <div className="flex flex-col w-full items-center justify-center gap-[20px] px-[20px]">
          <div className="items-center w-full justify-center">
            <MetalboarderedTransRoundbox>
              <div className="relative flex flex-col lg:flex-row gap-[32px] px-[50px] py-[30px]">
                <OrderProgress order={props?.order} />
              </div>
            </MetalboarderedTransRoundbox>
          </div>
          <MetalboarderedTransRoundbox>
            <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
              <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
                {t('orderDetailsModalTodaysAverageSwapTime')}:
              </div>
              <div className="text-center md:text-[19px] md:leading-[24px] font-bold md:whitespace-nowrap">
                {`${props.swapTime} ${t('orderDetailsSwapTimeMinute')}`}
              </div>
            </div>
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
                {`${props.recipientWallet}`}
              </div>
            </div>
            <div className="flex lg:w-[40%] lg:justify-between justify-center flex-row items-center gap-2.5 px-[4px]">
              <div className="text-center lg:text-[15px] lg:leading-[24px] text-[14px] font-normal text-opacity-50 lg:pl-[60px] text-[#FFFFFF99]">
                {t('orderDetailModalWillReceive')}
              </div>
              <div className="flex gap-2.5 items-center">
                <div className="text-center lg:text-[15px] text-[14px] font-normal">
                  {props?.order?.outAmount}
                </div>
                <img
                  src={findTokenBySymbol(props?.order?.outSymbol)?.icon}
                  className="w-[20px] h-[20px]"
                  alt="outSymbol"
                />
                <div className="text-base text-center lg:text-[15px] text-[14px] font-normal">
                  {findTokenBySymbol(props?.order?.outSymbol)?.displayName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralModal>
  )
}
