'use client'

import { useTranslation } from 'react-i18next'

import BalanceBox from '@/components/StakingDashboard/BalanceBox'
import PoolAPYBox from '@/components/StakingDashboard/PoolAPYBox'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex flex-col">
        <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
          Hi Houdini Wizard,
        </span>
        <span className="text-[48px] font-semibold leading-[32px] text-[#fff]">
          Welcome Back
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-[40px]">
        <BalanceBox />
        <PoolAPYBox />
      </div>
    </div>
  )
}
