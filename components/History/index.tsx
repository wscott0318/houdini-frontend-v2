'use client'

import { useTranslation } from 'react-i18next'

import HistoryModalBox from '../StakingDashboard/HistoryModalBox'

export default function History() {
  const { t } = useTranslation()

  return (
    <div className="mobile:px-4 mobile:py-4 mx-auto pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex flex-col">
        {/* <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
          Hi Houdini Wizard, check out your
        </span> */}
        <span className="text-[48px] font-semibold leading-[54px] text-[#fff] mobile:text-[44px]">
          Activity History
        </span>
      </div>
      <div className="flex flex-row flex-wrap gap-[40px] justify-center">
        <HistoryModalBox />
      </div>
    </div>
  )
}
