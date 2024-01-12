import React from 'react'

import { FCheckWhiteSvg, QuestionMarkSvg } from '@/components/Svg'

import CTAButton from '../CTAButton'

const HistoryModalBox = () => {
  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[1069px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col gap-[20px]">
          <span className="rainbow-text text-[18px] font-medium">History</span>
          <div className="flex flex-row">
            <button className="px-[30px] py-[10px] rounded-[20px]">
              <span className="text-[18px] font-medium rainbow-text">All</span>
            </button>
            <button className="px-[30px] py-[10px] rounded-[20px]">
              <span className="text-[18px] font-medium rainbow-text">
                Staking Rewards
              </span>
            </button>
            <button className="px-[30px] py-[10px] rounded-[20px]">
              <span className="text-[18px] font-medium rainbow-text">
                Deposits
              </span>
            </button>
            <button className="px-[30px] py-[10px] rounded-[20px]">
              <span className="text-[18px] font-medium rainbow-text">Buys</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModalBox
