import { useEffect, useState } from 'react'
import { Account } from 'viem'
import { useAccount, useToken } from 'wagmi'

import {
  useScaffoldContract,
  useScaffoldContractRead,
} from '@/contracts/hooks/scaffold-eth'

import { Buyback } from './Buyback'
import { PoolStats } from './PoolStats'
import { StakeForm } from './StakeForm'
import { UserStats } from './UserStats'

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export const StakingDashboard = () => {
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
      setApproved(approvedData as bigint)
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
    <div className="pb-10">
      <div className="flex justify-end	">
        {clientAddress?.address ? (
          <small className="text-success">
            Connected wallet <b>{clientAddress?.address}</b>
          </small>
        ) : (
          <small className="text-warning">
            Wallet <b>NOT connected</b>
          </small>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
        <div className="card card-compact bg-base-100 shadow-xl grid gap-4 sm:grid-cols-1 md:grid-cols-1">
          <div className="card-body">
            <UserStats
              user={user}
              apy={apy}
              earned={earned}
              timeLeft={timeLeft}
            ></UserStats>
          </div>
        </div>
        <div className="card card-compact bg-base-100 shadow-xl grid gap-4 sm:grid-cols-1 md:grid-cols-1">
          <div className="card-body">
            <PoolStats
              apy={poolApy}
              pool={pool}
              supply={supply}
              weightedSupply={weightedSupply}
              rewardForDuration={rewardForDuration}
              rewardRemaining={rewardRemaining}
            ></PoolStats>
          </div>
        </div>
      </div>

      <div className="card card-compact bg-base-100 shadow-xl grid gap-4 sm:grid-cols-1 md:grid-cols-1 mt-10">
        <div className="card-body">
          <StakeForm
            user={user}
            token={token}
            staker={deployedStakerData}
            approved={approved}
            timeLeft={timeLeft}
          ></StakeForm>
        </div>
      </div>

      <div className="card card-compact bg-base-100 shadow-xl grid gap-4 sm:grid-cols-1 md:grid-cols-1 mt-10">
        <div className="card-body">
          <Buyback
            token={token}
            staker={deployedStakerData}
            approved={approved}
          ></Buyback>
        </div>
      </div>
    </div>
  )
}
