import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import avatar from '@/assets/avatar.png'
import { SideBar } from '@/components/SideBar'
import CTAButton from '@/components/StakingDashboard/CTAButton'

import { ConnectWalletAccount } from './ConnectWalletAccount'
import { useMediaQuery } from '@/hooks'

export default function StakingDashboardResponsivePage({
  children,
}: LayoutProps) {
  const { t } = useTranslation()
  const isNavCollapsible = useMediaQuery('(max-width: 768px)')

  const connectWalletButton = <div className="flex pt-[0] xl:px-[50px] px-[10px] xl:pt-[30px] justify-end gap-[24px] ml-[28px] mr-1">
    <ConnectWalletAccount />
  </div>

  return (
    <div className='flex tablet:flex-col mobile:flex-col gap-[30px]'>
      <div className='flex justify-between'>
        <div className="lg:w-[271px] z-[99] mobile:w-0">
          <SideBar />
        </div>
        {isNavCollapsible && connectWalletButton}
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full">
          {!isNavCollapsible && connectWalletButton}
          {children}
        </div>
      </div >
    </div>
  )
}
