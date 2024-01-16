import React, { useState } from 'react'

import { DownloadSvg, LoadingSvg } from '@/components/Svg'

import ButtonGroup from '../ButtonGroup'
import CheckBox from './CheckBox'
import ListLine from './ListLine'
import Timeframe from './Timeframe'

const listData = [
  {
    type: 'Staking Rewards',
    date: 'Dec 7th, 2023 10:56:41',
    amount: '453.12300 $LOCK',
    addressUp: 'Zja7BQo420YolOe4so',
    addressDown: 'RAXAEIFASDhwY3123412798949',
  },
  {
    type: 'Deposited $LOCK',
    date: 'Dec 7th, 2023 10:56:41',
    amount: '453.12300 $LOCK',
    addressUp: 'Zja7BQo420YolOe4so',
    addressDown: 'RAXAEIFASDhwY3123412798949',
  },
  {
    type: 'Stake $LOCK',
    date: 'Dec 7th, 2023 10:56:41',
    amount: '453.12300 $LOCK',
    addressUp: 'Zja7BQo420YolOe4so',
    addressDown: 'RAXAEIFASDhwY3123412798949',
  },
  {
    type: 'Stake $LOCK',
    date: 'Dec 7th, 2023 10:56:41',
    amount: '453.12300 $LOCK',
    addressUp: 'Zja7BQo420YolOe4so',
    addressDown: 'RAXAEIFASDhwY3123412798949',
  },
]

const buttonNames = ['All', 'Staking Rewards', 'Deposits', 'Buys']

const HistoryModalBox = () => {
  const [headValue, setHeadValue] = useState(0)
  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[1071px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow relative">
        <div className="flex flex-row gap-[10px] absolute right-[30px] top-[30px] justify-center items-center">
          <button className="h-[56px] rounded-[16px] justify-center items-center flex bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] px-[20px] py-[12px]">
            <DownloadSvg className="w-[20px] h-[20px]" />
          </button>
          <Timeframe />
        </div>

        <div className="flex flex-col gap-[20px]">
          <span className="rainbow-text text-[18px] font-medium">History</span>
          <ButtonGroup names={buttonNames} />
          <div className="flex flex-col">
            <div className="flex flex-row px-[121px] py-[20px] gap-[178px] relative items-center">
              <div className="absolute top-[26px] left-[27px]">
                <CheckBox />
              </div>
              <span className="text-[18px] leading-normal font-medium">
                Type
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Date
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Amount
              </span>
              <span className="text-[18px] leading-normal font-medium">
                Address
              </span>
            </div>
            <div className="flex flex-col">
              {listData.map((item, index) => (
                <div key={index}>
                  <ListLine data={item} index={index % 2} />
                </div>
              ))}
            </div>
          </div>
          <span className="text-[12px] font-semibold leading-[14px] text-center text-[#A0AEC0]">
            Please note: Transaction times are displayed in UTC
          </span>
          <div className="w-full flex items-center justify-center">
            <button className="w-[96px] h-[48px] rounded-[15px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] items-center justify-center flex">
              <LoadingSvg className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModalBox
