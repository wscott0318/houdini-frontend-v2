'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Account } from 'viem'
import { useAccount } from 'wagmi'

import BalanceBox from '@/components/StakingDashboard/BalanceBox'
import PoolAPYBox from '@/components/StakingDashboard/PoolAPYBox'
import { useScaffoldContractRead } from '@/staking/hooks/scaffold-eth'

import MiniModalBox from '../StakingDashboard/MiniModalBox'
import StakedReport from '../StakingDashboard/StakedReport'
import StateMachine from '../StateMachine'

export default function Dashboard() {
  const { t } = useTranslation()

  const [clientAddress] = useState<Account>()
  const { address } = useAccount()

  const { data: historicalData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'UserInfo',
    args: [address],
    blockNumber: 123323,
  } as any)

  // User stats
  const [user, setUser] = useState<any>()
  const [timeLeft, setTimeLeft] = useState(0)
  const [earned, setEarned] = useState(0n)
  const [userApy, setUserApy] = useState(0n)
  const [stakeOpen, setStakeOpen] = useState(false)

  const { data: userData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'UserInfo',
    args: [address],
  } as any)

  useEffect(() => {
    if (userData) {
      const userDataArr = userData as any
      setUser(userDataArr[0])
      setTimeLeft(Number(userDataArr[1]))
      setEarned(userDataArr[2])
      setUserApy(userDataArr[3])
    }
  }, [userData, address])

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
          <BalanceBox
            address={address}
            setStakeOpen={setStakeOpen}
            user={user}
            earned={earned}
          />
          <PoolAPYBox
            poolApy={poolApy}
            userApy={userApy}
            earned={earned}
            balance={user?.balance}
          />
        </div>
      </div>
      <StateMachine
        steps={[
          { Component: MiniModalBox, key: 'stake-step-0' },
          { Component: StakedReport, key: 'stake-step-1' },
        ]}
        isOpen={stakeOpen}
        onClose={() => setStakeOpen(false)}
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
