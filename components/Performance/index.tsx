'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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
    <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex xl:flex-row gap-[50px] flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
              Hi Houdini Wizard, here’s some
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
  )
}
