import { MaxUint256 } from '@uniswap/sdk-core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Account } from 'viem'
import { formatEther, parseEther } from 'viem'
import { useAccount, useToken } from 'wagmi'
import { useBalance } from 'wagmi'

import { StakeMoreSvg } from '@/components/Svg'
import { useScaffoldContractWrite } from '@/staking/hooks/scaffold-eth'

import QTYButton from '../QTYButton'
import SwitchButton from './SwitchButton'

const styles = {
  modal: `flex justify-center place-self-center vertical-align-center`,
  wrapper: `h-full  grid grid-cols-1 gap-4 rounded-xl  bg-gray-50 max-w-sm mx-autoflex flex-col 
    justify-start items-center gap-[1rem] p-[1rem] m-auto font-mediumSerif overflow-scroll`,
  title: `my-[2rem] font-bold text-3xl`,
  smallField: `w-full flex justify-between gap-[1rem]`,
  fieldTitle: `flex-1 text-end`,
  inputContainer: `flex-[5] h-min border-2 border-[#787878]`,
  inputField: `w-full border-0 outline-none bg-transparent`,
}

const MiniModalBox = ({
  user,
  token,
  staker,
  approved,
  timeLeft,
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
}: any) => {
  const { t } = useTranslation()
  const [inputAmount, setInputAmount] = useState('0')
  const [balance, setBalance] = useState('0')
  const { address } = useAccount()
  const [percentAmount, setPercentAmount] = useState(0.5)
  useBalance({
    address,
    token: token?.address,
    watch: true,
    onSuccess(data: any) {
      console.log('Success', data)
      setBalance(data.formatted)
    },
  } as any)

  const { writeAsync: writeStake, isLoading: stakeLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'stake',
      args: [parseEther(inputAmount) - 1n],
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

  const { writeAsync: writeRequestExit, isLoading: requestExitLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'requestUnlock',
      args: [],
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

  const { writeAsync: writeExit, isLoading: exitLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'exit',
      args: [],
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

  const { writeAsync: writeEmergencyExit, isLoading: emergencyExitLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'emergencyWithdraw',
      args: [user?.balance ?? 0],
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
    toast.success('Approve Successful')
    handleNext()
  }

  const handleStakePool = () => {
    if (parseFloat(inputAmount) > 0) {
      writeStake()
    }
  }

  const handleRequestExit = () => {
    writeRequestExit()
  }
  const handleExit = () => {
    writeExit()
  }

  const handleEmergencyExit = () => {
    writeEmergencyExit()
  }

  // if (!staker) {
  //   return <>Please switch to correct chain...</>
  // }

  return (
    <div className="flex items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px] w-[409px]">
      <div className="flex flex-col w-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow gap-[30px]">
        {/* <div className="flex flex-col gap-[30px]"> */}
        {/* <SwitchButton /> */}
        <div className="flex flex-col">
          <span className="text-[18px] font-medium leading-normal">
            Unstaked $LOCK Balance
          </span>
          <span className="text-[50px] font-medium leading-normal">
            {balance}
          </span>
        </div>
        <div className="flex flex-row w-full gap-[10px]">
          <QTYButton
            text="50%"
            isSet={percentAmount == 0.5}
            onClick={() => {
              setPercentAmount(0.5)
              setInputAmount((parseInt(inputAmount) * percentAmount).toString())
            }}
          />
          <QTYButton
            text="75%"
            isSet={percentAmount == 0.75}
            onClick={() => {
              setPercentAmount(0.75)
            }}
          />
          <QTYButton
            text="90%"
            isSet={percentAmount == 0.9}
            onClick={() => {
              setPercentAmount(0.9)
            }}
          />
          <QTYButton
            text="Max"
            isSet={percentAmount == 1}
            onClick={() => {
              setPercentAmount(1)
            }}
          />
        </div>
        <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px]">
          <div className="rounded-[16px] h-[78px] w-full px-[24px] py-[15px] flex flex-row justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
            <div className="flex flex-col justify-between">
              <span className="text-[10px] font-semibold uppercase">
                {t('amountToStake')}
              </span>
              {/* <input
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
              ></input> */}
              <span>{inputAmount}</span>
            </div>
            <div className="flex items-end">
              <span className="text-[14px] font-bold leading-[24px] uppercase">
                {t('lock')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[10px]">
          <span className="text-[12px] leading-[16px] font-medium">
            I understand & accept the Staking Terms & Conditions
          </span>
        </div>
        {!approved || BigInt(approved) === 0n ? (
          <button
            className={
              'p-[16px] flex justify-center items-center rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]'
            }
            onClick={() => handleApprove()}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <StakeMoreSvg className="w-[16px] h-[16px]" />
              <span className="text-[16px] font-semibold">Approve</span>
            </div>
          </button>
        ) : (
          <button
            disabled={parseInt(inputAmount, 10) <= 0}
            className={
              'p-[16px] flex justify-center items-center rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]'
            }
            onClick={() => handleStakePool()}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <StakeMoreSvg className="w-[16px] h-[16px]" />
              <span className="text-[16px] font-semibold">{t('stake')}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default MiniModalBox
