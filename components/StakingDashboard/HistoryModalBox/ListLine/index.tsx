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
  length: number
}

const ListLine = ({ data, index, length }: Props) => {
  const [value, setValue] = useState(0)
  const { t } = useTranslation()

  return (
    <tr key={index} className={`bg-[#fff] ${index % 2 ? 'bg-opacity-5' : 'bg-opacity-10'}`}>
      <td className={`p-[12px] ${index === 0 ? 'rounded-tl-xl' : index === (length - 1) ? 'rounded-bl-xl ' : ''}`}>
        <div className='flex'>
          {/* <CheckBox value={value} setValue={setValue} /> */}
          <LockTokenIconSvg className="min-w-[32px] min-h-[32px] ml-[26px]" />
          <span className="ml-[15px] text-[15px] font-semibold leading-[20px] custom-xBlock-gold-gradient-text">
            {t(data.type)}
          </span>
        </div>
      </td>
      <td className='text-[14px] leading-[24px] font-normal p-[12px]'>
        {data.date}
      </td>
      <td className="text-[15px] font-semibold leading-[20px] p-[12px]">
        {data.amount} $LOCK
      </td>
      <td className={`p-[12px] ${index === 0 ? 'rounded-tr-xl' : index === (length - 1) ? 'rounded-br-xl ' : ''}`}>
        <div className='flex flex-col'>
          <Link
            className="text-[15px] leading-[20px] font-semibold z-10"
            target="_blank"
            href={`https://etherscan.io/address/${data.addressUp}`}
          >
            {data.addressUp?.substring(0, 6)}...
            {data.addressUp?.substring(data.addressUp.length - 4)}
          </Link>

          <Link
            className="text-[12px] font-semibold leading-[24px] text-[#A0AEC0] z-10"
            target="_blank"
            href={`https://etherscan.io/tx/${data.addressDown}`}
          >
            {data.addressDown?.substring(0, 6)}...
            {data.addressDown?.substring(data.addressDown.length - 4)}
          </Link>
        </div>
      </td>
    </tr >
  )
}

export default ListLine
