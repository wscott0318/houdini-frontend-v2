'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Portal } from 'houdini-react-sdk'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Account } from 'viem'
import { useAccount, useToken } from 'wagmi'

import BalanceBox from '@/components/StakingDashboard/BalanceBox'
import PoolAPYBox from '@/components/StakingDashboard/PoolAPYBox'
import {
  useScaffoldContract,
  useScaffoldContractRead,
} from '@/staking/hooks/scaffold-eth'
import { animation } from '@/utils/helpers'

import MiniModalBox from '../StakingDashboard/MiniModalBox'
import UnstakeModalBox from '../StakingDashboard/UnstakeModalBox'
import StakedReport from '../StakingDashboard/StakedReport'

export default function Dashboard() {
  const { t } = useTranslation()

  const [clientAddress] = useState<Account>()
  const { address } = useAccount()

  const { data: deployedTokenData, isLoading: deployedTokenLoading } =
    useScaffoldContract({
      contractName: 'Houdini',
    })

  const { data: deployedStakerData, isLoading: deployedStakerLoading } =
    useScaffoldContract({
      contractName: 'Staker',
    })
  // console.log(deployedStakerData, 'deployedStakerData')
  const { data: token } = useToken({
    address: deployedTokenData?.address as `0x${string}` | undefined,
  } as any)

  // User stats
  const [user, setUser] = useState<any>()
  const [timeLeft, setTimeLeft] = useState(0)
  const [earned, setEarned] = useState(0n)
  const [userApy, setUserApy] = useState(0n)
  const [approved, setApproved] = useState(0n)
  const [stakeOpen, setStakeOpen] = useState(false)

  const { data: userData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'UserInfo',
    args: [address],
  } as any)

  const { data: approvedData } = useScaffoldContractRead({
    contractName: 'Houdini',
    functionName: 'allowance',
    args: [address, deployedStakerData?.address],
  } as any)

  useEffect(() => {
    if (userData) {
      const userDataArr = userData as any
      setUser(userDataArr[0])
      setTimeLeft(Number(userDataArr[1]))
      setEarned(userDataArr[2])
      setUserApy(userDataArr[3])
    }
    if (approvedData) {
      setApproved(approvedData as any)
    }
  }, [userData, address, approvedData])

  // Pool stats
  const [pool, setPool] = useState<any>()
  const [supply, setSupply] = useState(0n)
  const [weightedSupply, setWeightedSupply] = useState(0n)
  const [rewardForDuration, setRewardForDuration] = useState(0n)
  const [poolApy, setPoolApy] = useState(0n)
  const [rewardRemaining, setRewardRemaining] = useState(0n)

  const { data: poolData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'pool',
  } as any)

  useEffect(() => {
    if (poolData) {
      const poolDataArr = poolData as any
      setPool(poolDataArr[0])
      setSupply(poolDataArr[1])
      setWeightedSupply(poolDataArr[2])
      setRewardForDuration(poolDataArr[3])
      setPoolApy(poolDataArr[4])
      setRewardRemaining(poolDataArr[5])
    }
  }, [poolData])

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

  const components = [
    { Component: MiniModalBox, key: 'withdraw-step-0' },
    { Component: UnstakeModalBox, key: 'withdraw-step-1' },
    { Component: StakedReport, key: 'withdraw-step-2'}
  ]

  const { Component, key } = components[state.step] as any

  const handleClose = () => {
    setStakeOpen(false)
  }

  const handleResetState = () => {
    setState(initialState)
  }

  return (
    <>
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
          <BalanceBox setStakeOpen={setStakeOpen} user={user} earned={earned} />
          <PoolAPYBox poolApy={poolApy} userApy={userApy} />
        </div>
      </div>
      <AnimatePresence>
        {stakeOpen ? (
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
                      user={user}
                      token={token}
                      staker={deployedStakerData}
                      approved={approved}
                      timeLeft={timeLeft}
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
