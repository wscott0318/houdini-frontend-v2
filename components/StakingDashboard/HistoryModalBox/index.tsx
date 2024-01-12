import React, { useState } from 'react'

import ValueDropDown from '../ValueDropDown'
import CheckBox from './CheckBox'
import ListLine from './ListLine'

const HistoryModalBox = () => {
  const [headValue, setHeadValue] = useState(0)
  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[1071px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow relative">
        <div className="flex flex-row gap-[10px] items-start absolute right-[30px] top-[30px] ">
          <ValueDropDown />
        </div>

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
            <ListLine />
          </div>
          <span className="text-[12px] font-semibold leading-[14px] text-center text-[#A0AEC0]">
            Please note: Transaction times are displayed in UTC
          </span>
          <div className="w-full flex items-center justify-center">
            <button className="w-[96px] h-[48px] rounded-[15px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] items-center justify-center flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <circle cx="8.57617" cy="2" r="1.5" fill="white" />
                <circle
                  opacity="0.4"
                  cx="8.57617"
                  cy="14"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.6"
                  cx="2.57617"
                  cy="8"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.4"
                  cx="14.5762"
                  cy="8"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.4"
                  cx="12.8193"
                  cy="3.75684"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.4"
                  cx="4.33301"
                  cy="12.2432"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.8"
                  cx="4.33301"
                  cy="3.75684"
                  r="1.5"
                  fill="white"
                />
                <circle
                  opacity="0.4"
                  cx="12.8193"
                  cy="12.2432"
                  r="1.5"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModalBox
