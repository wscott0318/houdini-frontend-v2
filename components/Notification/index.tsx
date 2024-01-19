'use client'

import { useTranslation } from 'react-i18next'

import NotificationBox from '@/components/StakingDashboard/NotificationBox'

export default function Notification() {
  const { t } = useTranslation()

  return (
    <div className="px-[50px] pt-[50px] pb-[60px] flex flex-col gap-[40px]">
      <div className="flex flex-col">
        <span className="text-[24px] font-medium leading-[32px] text-[#fff]">
          Hi Houdini Wizard, here’s your
        </span>
        <span className="text-[48px] font-semibold leading-[32px] text-[#fff]">
          Notifications
        </span>
      </div>
      <div className="flex flex-row gap-[40px]">
        <NotificationBox />
      </div>
    </div>
  )
}
