import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import {
  BackIconSvg,
  CloseSvg,
  FCheckSvg,
  InfoCircleSvg,
  InfoSquareSvg,
  InfoSquarewhiteSvg,
  WalletSvg,
  WidthrawSvg,
} from '@/components/Svg'

import SwitchButton from './SwitchButton'

const WithdrawalBox = () => {
  const [value, setValue] = useState(0)
  const { t } = useTranslation()
  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[22px] items-center">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row gap-[16px] items-center">
              <button>
                <BackIconSvg className="w-[20px] h-[20px]" />
              </button>
              <div className="flex flex-row gap-[10px] items-center">
                <Image
                  src={LockTokenIcon1}
                  className="w-[42px] h-[42px]"
                  alt="LockTokenIcon1"
                />
                <div className="flex flex-col px-[10px] gap-[5px]">
                  <span className="text-[14px] font-medium">End Stake</span>
                  <span className="text-[#A5A5A5] font-[14px]">$LOCK</span>
                </div>
              </div>
            </div>
            <button>
              <CloseSvg className="w-[20px] h-[20px]" />
            </button>
          </div>
          <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px] w-[380px] h-[80px]">
            <div className="rounded-[16px] h-full w-full pl-[20px] pt-[17px] flex justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
              <div className="flex flex-col w-[336px] gap-[8px]">
                <div className="flex flex-row gap-[5px]">
                  <span className="text-[10px] font-semibold uppercase">
                    address
                  </span>
                  <InfoSquarewhiteSvg className="w-[16px] h-[16px]" />
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-row gap-[10px]">
                    <span className="text-[20px] font-medium leading-[19px]">
                      JH74XU73UUdqwdq....32wd01
                    </span>
                    <div className="w-[2px] h-[20px] bg-white" />
                  </div>
                  <FCheckSvg className="w-[23px] h-[18px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[16px] w-[380px] h-[96px] bg-gradient-to-b from-[#9687FF] to-[#334AD3] pl-[24px] pt-[15px] pb-[9px]">
            <div className="h-[72px] flex flex-col justify-between">
              <span className="text-[10px]">AVAILABLE BALANCE</span>
              <div className="gap-[5px] h-[49px] flex flex-col">
                <span className="text-[25px] font-medium leading-[20px]">
                  420,000.74 $LOCK
                </span>
                <span className="text-[14px] font-medium leading-normal text-[#ffffff80]">
                  $1,224.56 USD
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px] w-[380px] h-[92px]">
            <div className="rounded-[16px] w-full h-full pl-[23px] pt-[25px] flex flex-row justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
              <div className="flex justify-between w-[332px] items-start">
                <div className="flex flex-col gap-[8px]">
                  <span className="text-[10px] font-semibold uppercase">
                    AMOUNT TO WITHDRAW
                  </span>
                  <span className="text-[20px] font-medium leading-[19px]">
                    10,000.20 $LOCK
                  </span>
                </div>
                <span className="text-[#9C8EFF] text-[12px] font-bold leading-normal uppercase">
                  Max Amount
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-t-[16px] rounded-b-[30px] justify-center items-center flex flex-col p-[2px] w-[380px] h-[115px]">
            <div className="w-full h-[75px] pl-[23px] pt-[18px] rounded-t-[16px] flex flex-col justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
              <div className="flex justify-between w-[332px] items-start">
                <div className="flex flex-col gap-[8px]">
                  <span className="text-[10px] font-semibold uppercase">
                    AMOUNT TO WITHDRAW
                  </span>
                  <span className="text-[20px] font-medium leading-[19px]">
                    10,000.20 $LOCK
                  </span>
                </div>
                <span className="text-[#9C8EFF] text-[12px] font-bold leading-normal uppercase">
                  Max Amount
                </span>
              </div>
            </div>
            <div className="h-[40px] w-full bg-gradient-to-b rounded-b-[30px] from-[#6C5DD380] to-[#4154C980] flex items-center justify-center">
              <span className="text-[10px] uppercase leading-normal font-semibold text-[#ffffff80]">
                A Penalty Cost will be applied to this amount
              </span>
            </div>
          </div>

          <div className="flex flex-row gap-[13px] items-center">
            <span
              className={
                value == 0
                  ? `text-[17px] font-bold leading-[20px]`
                  : `text-[17px] font-bold leading-[20px]`
              }
            >
              Pay Penalty
            </span>
            <SwitchButton value={value} setValue={setValue} />
            <div className="flex flex-row gap-[8px] items-center h-full">
              <span
                className={
                  value == 1
                    ? `text-[17px] font-bold leading-[20px]`
                    : `text-[17px] font-bold leading-[20px]`
                }
              >
                No Penalty
              </span>
              <InfoCircleSvg className="w-[16px] h-[16px]" />
            </div>
          </div>
          <div className="w-[380px] h-[80px] rounded-[16px] bg-gradient-to-b from-[#ffffff80] to-[#ffffff00] pt-[17px] pl-[24px]">
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row gap-[5px] items-center">
                <span className="text-[#F98F3B] text-[10px]">
                  Fallen Wizard Tax
                </span>
                <InfoSquareSvg className="w-[16px] h-[16px]" />
              </div>
              <span className="text-[#F98F3B] text-[20px] leading-[19px] font-semibold">
                5,000.20 $LOCK
              </span>
            </div>
          </div>
          <div className="w-[380px] h-[80px] rounded-[16px] bg-gradient-to-b from-[#ffffff80] to-[#ffffff00] pt-[17px] pl-[24px]">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[#fff] text-[10px] uppercase">TOTAL</span>
              <span className="text-[#fff] text-[20px] leading-[19px] font-semibold">
                5,000.20 $LOCK
              </span>
            </div>
          </div>
          <button
            className={
              'p-[16px] flex w-[271px] h-[58px] justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
            }
            onClick={() => {}}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <WalletSvg className="w-[16px] h-[16px]" />
              <span className="text-[20px] font-semibold">
                Instant Withdrawal
              </span>
            </div>
          </button>
          <button
            className={
              'p-[16px] flex w-[271px] h-[58px] justify-center items-center rounded-[120px] custom-day-widthrawal-button-gradient'
            }
            onClick={() => {}}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <WalletSvg className="w-[16px] h-[16px]" />
              <span className="text-[20px] font-semibold">
                90 Day Withdrawal
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalBox
