import { useConnectModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isAddress } from 'viem'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'

import avatar from '@/assets/avatar.png'
import logo from '@/assets/logo.png'
import { useTargetNetwork } from '@/staking/hooks/scaffold-eth/useTargetNetwork'
import { getBlockExplorerAddressLink } from '@/staking/utils/scaffold-eth'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

import NoPenaltyWithdrawalBox from '../StakingDashboard/NoPenaltyWithdrawalBox'
import { BlockieAvatar } from '../StakingDashboard/RainbowKitCustomConnectButton/BlockieAvatar'
import WithdrawalBox from '../StakingDashboard/WithdrawalBox'
import WithdrawalExplainerBox from '../StakingDashboard/WithdrawalExplainerBox'
import StateMachine from '../StateMachine'
import {
  ChartSvg,
  DocumentSvg,
  IconSvg,
  NotificationSvg,
  SettingSvg,
  SidebarBigLogo,
  SidebarQuestionSvg,
  WidthrawSvg,
} from '../Svg'

export function SideBar() {
  const { t } = useTranslation()
  const [width] = useWindowSize()
  const { targetNetwork } = useTargetNetwork()
  const { openConnectModal } = useConnectModal()

  const account = useAccount()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [ens, setEns] = useState<string | null>()
  const [ensAvatar, setEnsAvatar] = useState<string | null>()
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [isPenalty, setIsPenalty] = useState(false)
  // const [user, setUser] = useState<any>()

  // const { data: userData } = useScaffoldContractRead({
  //   contractName: 'Staker',
  //   functionName: 'UserInfo',
  //   args: [account?.address],
  // } as any)
  // useEffect(() => {
  //   if (userData) {
  //     const userDataArr = userData as any
  //     setUser(userDataArr[0])
  //   }

  // }, [userData, account?.address])

  useEffect(() => {
    if (width > 768) {
      setIsSidebarOpen(true)
    }
  }, [width, isSidebarOpen])

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const blockExplorerAddressLink = account
    ? getBlockExplorerAddressLink(targetNetwork, account?.address ?? '')
    : undefined

  const { data: fetchedEns } = useEnsName({
    address: account?.address,
    enabled: isAddress(account?.address ?? ''),
    chainId: 1,
  })
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns,
    enabled: Boolean(fetchedEns),
    chainId: 1,
    cacheTime: 30_000,
  })

  // We need to apply this pattern to avoid Hydration errors.
  useEffect(() => {
    setEns(fetchedEns)
  }, [fetchedEns])

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar)
  }, [fetchedEnsAvatar])

  return (
    <>
      {width < 768 && (
        <button onClick={handleSidebar} className="text-3xl">
          ☰
        </button>
      )}
      {isSidebarOpen ? (
        <div
          className={`flex relative z-[9999] flex-col transition-all duration-300 h-full lg:min-w-[271px] lg:max-w-[271px] min-w-[110px] max-w-[110px] pl-[29px] pr-[30px] pt-[44px] pb-[36px] overflow-y-auto custom-sidebar-background gap-[29px] lg:rounded-[50px] rounded-l-[50px]`}
        >
          <Link href="/" className="flex flex-col justify-center items-center">
            <SidebarBigLogo className="lg:w-[209px] lg:h-[71px] lg:block hidden fill-white" />
            <Image
              src={logo}
              className="w-[55px] h-[55px] lg:hidden block"
              alt="logo"
            />
          </Link>
          <div className="flex flex-col justify-between h-full">
            <ul className="space-y-2 font-semibold text-[14px]">
              <li>
                <Link
                  href="/staking-dashboard"
                  className="flex items-center p-[16px] text-[#A0AEC0]  hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <IconSvg className="w-[24px] h-[24px] stroke-white" />
                  <span className="lg:text-[14px] lg:block hidden lg:ms-[16px]">
                    {t('sidebarDashboard')}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/staking-dashboard/performance"
                  className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <ChartSvg className="w-[24px] h-[24px] " />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarPerformance')}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/staking-dashboard/history"
                  className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <DocumentSvg className="w-[24px] h-[24px] " />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarHistory')}
                  </span>
                </Link>
              </li>
              {/* <li>
            <a
              href="/staking-dashboard/notifications"
              className="flex justify-between items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
            >
              <div className="relative flex items-center">
                <NotificationSvg className="w-[24px] h-[24px] " />
                <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                  {t('sidebarNotifications')}
                </span>
                <span className="absolute lg:top-[0px] lg:right-[0px] top-[-6px] right-[-6px] inline-flex items-center justify-center lg:w-0 lg:h-0 w-[18px] h-[18px] text-[11px] lg:text-[0px] font-medium text-white bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 rounded-full">
                  {value}
                </span>
              </div>
              <span className="inline-flex mr-[0px] items-center justify-center w-[0px] h-[0px] lg:w-[24px] lg:h-[24px] lg:text-[12px] text-[0px] font-medium text-white bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 rounded-full">
                {value}
              </span>
            </a>
          </li> */}
              {/* <li>
            <a
              href="#"
              className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
            >
              <SettingSvg className="w-[24px] h-[24px] " />
              <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                {t('sidebarSettings')}
              </span>
            </a>
          </li> */}
            </ul>
            <ul className="space-y-2 font-semibold text-[14px]">
              <li>
                <div
                  onClick={() =>
                    account?.address
                      ? setWithdrawOpen(true)
                      : openConnectModal?.()
                  }
                  className="flex items-center cursor-pointer p-[16px] text-[#A0AEC0]  hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <WidthrawSvg className="w-[24px] h-[24px] stroke-white" />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarWidthraw')}
                  </span>
                </div>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://t.me/HoudiniSwapSupport_bot"
                  className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <SidebarQuestionSvg className="w-[24px] h-[24px] fill-white" />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarSupport')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href={blockExplorerAddressLink}
                  rel="noopener noreferrer"
                  className="flex items-center lg:pl-[16px] lg:justify-start justify-center text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  {account?.address ? (
                    <BlockieAvatar
                      size={24}
                      address={account?.address ?? ''}
                      ensImage={ensAvatar ?? ''}
                    />
                  ) : (
                    <Image
                      src={avatar}
                      className="lg:w-[24px] lg:h-[24px] w-[40px] h-[40px]"
                      alt="avatar"
                    />
                  )}
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarAccount')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      <StateMachine
        steps={[
          {
            Component: WithdrawalExplainerBox,
            key: 'withdraw-step-0',
            props: { setIsPenalty: setIsPenalty, address: account?.address },
          },
          {
            Component: isPenalty ? WithdrawalBox : NoPenaltyWithdrawalBox,
            key: 'withdraw-step-1',
            props: { setIsPenalty: setIsPenalty, address: account?.address },
          },
        ]}
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        stateMachine={{
          step0: {
            previous: 'step0',
            next: 'step1',
          },
          step1: {
            previous: 'step0',
            next: 'step1',
          },
        }}
        maxStep={1}
        minStep={0}
      />
    </>
  )
}
