'use client'

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

import MiniModalBox from '../StakingDashboard/MiniModalBox'
import UnstakeModalBox from '../StakingDashboard/UnstakeModalBox'

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
  const [apy, setApy] = useState(0n)
  const [approved, setApproved] = useState(0n)

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
      setApy(userDataArr[3])
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

  return (
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
        <BalanceBox user={user} earned={earned} />
        <PoolAPYBox />
      </div>
      <MiniModalBox
        user={user}
        token={token}
        staker={deployedStakerData}
        approved={approved}
        timeLeft={timeLeft}
      />
      <UnstakeModalBox
        token={token}
        staker={deployedStakerData}
        approved={approved}
      />
    </div>
  )
}
