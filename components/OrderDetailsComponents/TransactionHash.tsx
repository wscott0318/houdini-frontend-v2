import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { MetalboarderedTransRoundbox } from '@/components/GeneralModal/MetalboarderedTransRoundbox'
import { useTokens } from '@/hooks'
import { OrderStatusResult } from '@/types/backend/typegql/entities/abstract/order.status'

interface TransactionHashProps {
  order: OrderStatusResult
}

export const TransactionHash: React.FC<TransactionHashProps> = ({ order }) => {
  const { t } = useTranslation()

  const { getExplorerUrl } = useTokens()

  return (
    <>
      {order.status === 4 && order.transactionHash ? (
        <MetalboarderedTransRoundbox>
          <div className="flex flex-row justify-center items-center gap-[32px] px-[60px] py-[10px] h-full">
            <div className="text-center md:text-[19px] md:leading-[24px] font-medium rainbow-text md:whitespace-nowrap">
              {t('viewTransaction')}:
            </div>
            <div className="text-center md:text-[19px] md:leading-[24px] font-bold md:whitespace-nowrap">
              <Link
                href={`${getExplorerUrl(order.outSymbol)}${
                  order.transactionHash
                }`}
                target="_blank"
              >
                {order.transactionHash}
              </Link>
            </div>
          </div>
        </MetalboarderedTransRoundbox>
      ) : null}
    </>
  )
}
