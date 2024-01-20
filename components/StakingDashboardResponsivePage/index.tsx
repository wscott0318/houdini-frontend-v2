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
          {/* <CTAButton width="191px" height="44px">
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
                  className="lg:w-[24px] lg:h-[24px]"
                  alt="avatar"
                />
              </div>
            </div>
          </div> */}
          {/* <ConnectWalletAccount user={user} token={token} staker={deployedStakerData} approved={approved} timeLeft={timeLeft}/> */}
        </div>
        {children}
      </div>
    </div>
  )
}
