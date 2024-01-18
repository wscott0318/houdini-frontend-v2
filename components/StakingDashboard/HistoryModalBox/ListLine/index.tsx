import React, { useState } from 'react'

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

  return (
    <>
      {value == 0 ? (
        <div className="h-[80px] flex flex-row items-center justify-center  relative">
          {index == 0 ? (
            <div className="w-full h-full rounded-[12px] bg-[#fff] opacity-[0.05] absolute top-0 left-0"></div>
          ) : (
            <div className="w-full h-full rounded-[12px] bg-[#fff] opacity-[0.1] absolute top-0 left-0"></div>
          )}
          <div className="flex flex-row w-full h-full items-center justify-center absolute top-0 left-0">
            <div className="w-full h-full flex items-center justify-between pl-[27px] pt-[20px] pr-[80px] pb-[16px]">
              <div className="flex items-center">
                <CheckBox value={value} setValue={setValue} />
                <LockTokenIconSvg className="w-[32px] h-[32px] ml-[26px]" />
                <span className="ml-[15px] text-[15px] font-semibold leading-[20px] custom-xBlock-gold-gradient-text">
                  {data.type}
                </span>
              </div>
              <span className="text-[14px] leading-[24px] font-normal">
                {data.date}
              </span>
              <span className="text-[15px] font-semibold leading-[20px]">
                {data.amount}
              </span>
              <div className="flex flex-col ">
                <span className="text-[15px] leading-[20px] font-semibold">
                  {data.addressUp}
                </span>
                <span className="text-[12px] font-semibold leading-[24px] text-[#A0AEC0]">
                  {data.addressDown}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[80px] flex flex-row items-center justify-center pl-[27px] pt-[20px] rounded-[12px] pr-[80px] pb-[16px] bg-white border-[#355DFF] border-[2px]">
          <div className="flex flex-row w-full items-center justify-between">
            <div className="flex items-center">
              <CheckBox value={value} setValue={setValue} />
              <LockTokenIconSvg className="w-[32px] h-[32px] ml-[26px]" />
              <span className="ml-[15px] text-[15px] font-semibold leading-[20px] custom-xBlock-gold-gradient-text">
                Staking Rewards
              </span>
            </div>
            <span className="text-[14px] leading-[24px] font-normal text-black">
              Dec 7th, 2023 10:56:41
            </span>
            <span className="text-[15px] font-semibold leading-[20px] text-black">
              453.12300 $LOCK
            </span>
            <div className="flex flex-col ">
              <span className="text-[15px] leading-[20px] font-semibold text-black">
                Zja7BQo420YolOe4so
              </span>
              <span className="text-[12px] font-semibold leading-[24px] text-[#A0AEC0]">
                RAXAEIFASDhwY3123412798949
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ListLine
