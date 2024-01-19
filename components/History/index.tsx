'use client'

import { useTranslation } from 'react-i18next'

import HistoryModalBox from '../StakingDashboard/HistoryModalBox'

export default function History() {
  const { t } = useTranslation()

  return (
    <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex flex-col">
        <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
          Hi Houdini Wizard, check out your
        </span>
        <span className="text-[48px] font-semibold leading-[32px] text-[#fff]">
          Activity History
        </span>
      </div>
      <div className="flex flex-row gap-[40px]">
        <HistoryModalBox />
      </div>
    </div>
  )
}
