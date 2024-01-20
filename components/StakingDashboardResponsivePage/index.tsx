import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import avatar from '@/assets/avatar.png'
import { SideBar } from '@/components/SideBar'
import CTAButton from '@/components/StakingDashboard/CTAButton'

import { ConnectWalletAccount } from './ConnectWalletAccount'

export default function StakingDashboardResponsivePage({
  children,
}: LayoutProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row">
      <div className="w-[271px] z-[1]">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex px-[50px] pt-[30px] justify-end gap-[24px]">
          <ConnectWalletAccount />
        </div>
        {children}
      </div>
    </div>
  )
}
