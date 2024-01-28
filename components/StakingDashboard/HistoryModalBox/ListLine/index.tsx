import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FCheckWhiteSvg } from '@/components/Svg'
import { LockTokenIconSvg } from '@/components/Svg'

import CheckBox from '../CheckBox'

export interface IGroupedData {
  type: string
  date: string
  amount: string
  addressUp: string
  addressDown: string
}

interface Props {
  data: IGroupedData
  index: number
}

const ListLine = ({ data, index }: Props) => {
  const [value, setValue] = useState(0)
  const { t } = useTranslation()

  return (
    <>
      <div className="h-[80px] flex flex-row items-center justify-center relative">
        {index == 0 ? (
          <div className="w-full h-full rounded-[12px] bg-[#fff] opacity-[0.05] absolute top-0 left-0"></div>
        ) : (
          <div className="w-full h-full rounded-[12px] bg-[#fff] opacity-[0.1] absolute top-0 left-0"></div>
        )}
        <div className="flex flex-row w-full h-full items-center justify-center absolute top-0 left-0">
          <div className="w-full h-full flex gap-[40px] items-center justify-between pl-[27px] pt-[20px] pr-[80px] pb-[16px]">
            <div className="flex items-center justify-start">
              {/* <CheckBox value={value} setValue={setValue} /> */}
              <LockTokenIconSvg className="min-w-[32px] min-h-[32px] ml-[26px]" />
              <span className="ml-[15px] text-[15px] font-semibold leading-[20px] custom-xBlock-gold-gradient-text">
                {t(data.type)}
              </span>
            </div>
            <span className="text-[14px] leading-[24px] font-normal">
              {data.date}
            </span>
            <span className="text-[15px] font-semibold leading-[20px]">
              {data.amount} $LOCK
            </span>
            <div className="flex flex-col ">
              <span className="text-[15px] leading-[20px] font-semibold">
                <Link
                  target="_blank"
                  href={`https://etherscan.io/address/${data.addressUp}`}
                >
                  {data.addressUp?.substring(0, 6)}...
                  {data.addressUp?.substring(data.addressUp.length - 4)}
                </Link>
              </span>
              <span className="text-[12px] font-semibold leading-[24px] text-[#A0AEC0]">
                <Link
                  target="_blank"
                  href={`https://etherscan.io/tx/${data.addressDown}`}
                >
                  {data.addressDown?.substring(0, 6)}...
                  {data.addressDown?.substring(data.addressDown.length - 4)}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListLine
