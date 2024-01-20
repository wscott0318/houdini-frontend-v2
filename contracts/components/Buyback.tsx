import { MaxUint256 } from '@uniswap/sdk-core'
import { useState } from 'react'
// import { MaxUint256 } from "@uniswap/sdk-core";
import { formatEther, parseEther } from 'viem'
import { useAccount, useBalance } from 'wagmi'

import { useScaffoldContractWrite } from '@/contracts/hooks/scaffold-eth'

export const Buyback = ({ token, staker, approved }: any) => {
  const [inputAmount, setInputAmount] = useState('0')
  const [balance, setBalance] = useState('0')
  const { address } = useAccount()

  useBalance({
    address,
    token: token?.address,
    watch: true,
    onSuccess(data: any) {
      console.log('Success', data)
      setBalance(data.formatted)
    },
  } as any)

  const { writeAsync: writeBuyback, isLoading: stakeLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'addRewardAmount',
      args: [parseEther(inputAmount)],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        console.log(
          '📦 Transaction blockHash',
          txnReceipt.blockHash,
          txnReceipt,
        )
        setInputAmount('0')
      },
    } as any)

  const handleBuyback = () => {
    if (parseFloat(inputAmount) > 0) {
      writeBuyback()
    }
  }

  const { writeAsync: writeApprove, isLoading: approveLoading } =
    useScaffoldContractWrite({
      contractName: 'Houdini',
      functionName: 'approve',
      args: [staker?.address, MaxUint256],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        console.log(
          '📦 Transaction blockHash',
          txnReceipt.blockHash,
          txnReceipt,
        )
      },
    } as any)

  const handleApprove = () => {
    writeApprove()
  }

  if (!staker) {
    return <>Please switch to correct chain...</>
  }
  return (
    <div className="">
      <h2>Manual Buyback</h2>

      {!approved || BigInt(approved) === 0n ? (
        <button className="btn btn-primary" onClick={() => handleApprove()}>
          Approve
        </button>
      ) : (
        <>
          <div>
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Buyback Amount {token?.symbol}
            </label>
            <div className="join">
              <input
                type="text"
                id="amount"
                className="stake-amount join-item input-bordered 0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                onChange={(e) => {
                  setInputAmount(e.target.value)
                }}
                value={inputAmount}
                max={balance}
                min="0.0"
                disabled={parseFloat(balance) == 0}
                required
              ></input>
              <button
                disabled={parseFloat(balance) == 0}
                className="btn join-item"
                onClick={() => {
                  setInputAmount(balance?.toString())
                }}
              >
                {' '}
                Max
              </button>
            </div>

            <button
              disabled={parseInt(inputAmount, 10) <= 0}
              className="btn btn-success m-2"
              onClick={() => handleBuyback()}
            >
              Send to Pool
            </button>
          </div>
        </>
      )}
    </div>
  )
}
