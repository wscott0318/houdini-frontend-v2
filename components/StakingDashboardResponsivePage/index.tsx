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
    <div className="flex flex-row w-full">
      <div className="md:w-[271px] z-[99] mobile:w-0">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex pt-[0] xl:px-[50px] w-full px-[10px] xl:pt-[30px] justify-end gap-[24px]">
          <ConnectWalletAccount />
        </div>
        {children}
      </div>
    </div>
  )
}
