import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'houdini-react-sdk'
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
import { animation } from '@/utils/helpers'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

import NoPenaltyWithdrawalBox from '../StakingDashboard/NoPenaltyWithdrawalBox'
import { BlockieAvatar } from '../StakingDashboard/RainbowKitCustomConnectButton/BlockieAvatar'
import WithdrawalBox from '../StakingDashboard/WithdrawalBox'
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
import WithdrawalExplainerBox from '../StakingDashboard/WithdrawalExplainerBox'

export function SideBar() {
  const { t } = useTranslation()
  const [width] = useWindowSize()
  const { targetNetwork } = useTargetNetwork()
  const account = useAccount()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [ens, setEns] = useState<string | null>()
  const [ensAvatar, setEnsAvatar] = useState<string | null>()
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [isPenalty, setIsPenalty] = useState(false)

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

  const initialState = {
    step: 0,
  }
  const [state, setState] = useState(initialState)

  const currentState = `step${state.step}`

  const stateMachine = {
    step0: {
      previous: 'step0',
      next: 'step1',
    },
    step1: {
      previous: 'step0',
      next: 'step2',
    },
    step2: {
      previous: 'step1',
      next: 'step3',
    },
  }

  const MAX_STEP = 2
  const MIN_STEP = 0

  const handleNext = () => {
    const nextState = (stateMachine as any)[currentState]?.next ?? ''
    const nextStep = parseInt(nextState.slice(-1), 10)

    setState({
      step: Math.min(nextStep, MAX_STEP),
    })
  }

  const handlePrevious = () => {
    const previousState = (stateMachine as any)[currentState]?.previous ?? ''
    const previousStep = parseInt(previousState.slice(-1), 10)

    setState({
      step: Math.max(previousStep, MIN_STEP),
    })
  }

  const PenaltyDecision = () => {
    return (
      <div className="flex flex-row justify-center items-center gap-[40px]">
        <button
          onClick={() => {
            setIsPenalty(false)
            handleNext()
          }}
        >
          Without Penalty
        </button>
        <button
          onClick={() => {
            setIsPenalty(true)
            handleNext()
          }}
        >
          With Penalty
        </button>
      </div>
    )
  }

  const components = [
    { Component: PenaltyDecision, key: 'withdraw-step-0' },
    {
      Component: isPenalty ? WithdrawalBox : NoPenaltyWithdrawalBox,
      key: 'withdraw-step-1',
    },
    {
      Component: WithdrawalExplainerBox,
      key: 'withdraw-step-2',
    },
  ]

  const { Component, key } = components[state.step] as any

  const handleClose = () => {
    setWithdrawOpen(false)
  }

  const handleResetState = () => {
    setState(initialState)
  }

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
                <a
                  href="/staking-dashboard"
                  className="flex items-center p-[16px] text-[#A0AEC0]  hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <IconSvg className="w-[24px] h-[24px] stroke-white" />
                  <span className="lg:text-[14px] lg:block hidden lg:ms-[16px]">
                    {t('sidebarDashboard')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/staking-dashboard/performance"
                  className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <ChartSvg className="w-[24px] h-[24px] " />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarPerformance')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/staking-dashboard/history"
                  className="flex items-center p-[16px] text-[#A0AEC0] hover:fill-white hover:text-[#ffffff] rounded-[16px] hover:bg-gradient-to-b from-indigo-600 to-blue-500 group h-[56px]"
                >
                  <DocumentSvg className="w-[24px] h-[24px] " />
                  <span className="lg:text-[14px] text-[0px] lg:ms-[16px]">
                    {t('sidebarHistory')}
                  </span>
                </a>
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
                  onClick={() => setWithdrawOpen(true)}
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
      <AnimatePresence>
        {withdrawOpen ? (
          <Portal>
            <motion.div
              className="z-10 fixed left-0 top-0 w-screen h-screen"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              exit="hidden"
              animate="visible"
              variants={animation}
            >
              <div
                onClick={(e) => {
                  e.preventDefault()
                  const target = e.target as HTMLElement
                  if (target.id === 'dropdownClickable') {
                    handleClose()
                  }
                }}
                className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
              >
                <div
                  id="dropdownClickable"
                  className="flex relative min-h-full items-start justify-center sm:items-center p-6 md:p-0"
                >
                  <div className="flex flex-col xl:flex-row justify-center items-start gap-[56px]">
                    <Component
                      handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      handleClose={handleClose}
                      handleResetState={handleResetState}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  )
}
