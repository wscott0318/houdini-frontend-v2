'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import avatar from '@/assets/avatar.png'
import { SideBar } from '@/components/SideBar'
import BalanceBox from '@/components/StakingDashboard/BalanceBox'
import CTAButton from '@/components/StakingDashboard/CTAButton'
import PoolAPYBox from '@/components/StakingDashboard/PoolAPYBox'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex flex-col">
        <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
          Hi Houdini-ID, check out your
        </span>
        <span className="text-[48px] font-semibold leading-[32px] text-[#fff]">
          Activity History
        </span>
      </div>
      <div className="flex flex-row gap-[40px]">
        <BalanceBox />
        <PoolAPYBox />
      </div>
    </div>
  )
}
