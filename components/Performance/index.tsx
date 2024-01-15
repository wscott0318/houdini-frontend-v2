'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import avatar from '@/assets/avatar.png'
import { SideBar } from '@/components/SideBar'
import CTAButton from '@/components/StakingDashboard/CTAButton'

import NextBurnBox from '../StakingDashboard/NextBurnBox'
import PoolStatsBox from '../StakingDashboard/PoolStatsBox'
import XBlockPerformanceStatsBox from '../StakingDashboard/xBlockPerformanceStatsBox'

export default function Performance() {
  const { t } = useTranslation()

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="flex px-[50px] pt-[30px] justify-end gap-[24px]">
          <CTAButton width="191px" height="44px">
            <span className="px-[30px] py-[12px] justify-center items-center">
              Disconnect Wallet
            </span>
          </CTAButton>
          <div className="inline-flex items-center justify-center p-[2px] rounded-[120px] bg-gradient-to-b from-white to-black">
            <div className="inline-flex justify-center rounded-[120px] w-full h-full items-center bg-gradient-to-br from-black to-[#252932] px-[30px] py-[8px]">
              <div className="flex flex-row gap-[10px]">
                <span className="text-[16px] font-semibold leading-normal">
                  0xeed9978.....e372b0154
                </span>
                <Image
                  src={avatar}
                  className="lg:w-[24px] lg:h-[24px] w-[40px] h-[40px]"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
          <div className="flex lg:flex-row gap-[50px] flex-col">
            <div className="flex flex-col justify-between">
              <div className="flex flex-col">
                <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
                  Hi Houdini-ID, here’s some
                </span>
                <span className="text-[48px] font-semibold leading-[32px] text-[#fff]">
                  Performance Data
                </span>
              </div>
              <PoolStatsBox />
            </div>
            <div className="flex flex-col gap-[50px] justify-end">
              <XBlockPerformanceStatsBox />
              <NextBurnBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
