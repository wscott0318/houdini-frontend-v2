import { MaxUint256 } from '@uniswap/sdk-core'
import { CheckBox } from 'houdini-react-sdk'
import Humanize from 'humanize-plus'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { parseEther } from 'viem'
import { useBalance } from 'wagmi'
import { useAccount, useToken } from 'wagmi'

import { CloseSvg, StakeMoreSvg } from '@/components/Svg'
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from '@/staking/hooks/scaffold-eth'

import QTYButton from '../QTYButton'

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
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
}: any) => {
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

  const { t } = useTranslation()
  const [inputAmount, setInputAmount] = useState('0')
  const [balance, setBalance] = useState('0')
  const [balanceInt, setBalanceInt] = useState(0)
  const { address } = useAccount()
  const [percentAmount, setPercentAmount] = useState(0.5)
  const [approved, setApproved] = useState(0n)
  const [termsApproved, setTermsApproved] = useState(false)

  const { data: approvedData } = useScaffoldContractRead({
    contractName: 'Houdini',
    functionName: 'allowance',
    args: [address, deployedStakerData?.address],
  } as any)

  useEffect(() => {
    if (approvedData) {
      setApproved(approvedData as any)
    }
  }, [address, approvedData])

  useBalance({
    address,
    token: token?.address,
    watch: true,
    onSuccess(data: any) {
      if (token?.address) {
        setBalanceInt(parseFloat(data.formatted))
        setBalance(Humanize.formatNumber(parseFloat(data.formatted)))
      }
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
        toast.success('Stake Successful')
        handleNext()

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
      args: [deployedStakerData?.address, MaxUint256],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        toast.success('Approve Successful')
        console.log(
          '📦 Transaction blockHash',
          txnReceipt.blockHash,
          txnReceipt,
        )
      },
    } as any)

  const handleApprove = () => {
    if (termsApproved) {
      writeApprove()
    } else {
      toast.warning('Please accept the terms and conditions')
    }
  }

  const handleStakePool = () => {
    if (parseFloat(inputAmount) > 0) {
      writeStake()
    }
  }

  return (
    <div className="flex relative items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px] w-[409px]">
      <div className="absolute top-[30px] right-[30px]">
        <button onClick={handleClose}>
          <CloseSvg className="w-[20px] h-[20px]" />
        </button>
      </div>
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
              setInputAmount((balanceInt * percentAmount).toString())
            }}
          />
          <QTYButton
            text="75%"
            isSet={percentAmount == 0.75}
            onClick={() => {
              setPercentAmount(0.75)
              setInputAmount((balanceInt * percentAmount).toString())
            }}
          />
          <QTYButton
            text="90%"
            isSet={percentAmount == 0.9}
            onClick={() => {
              setPercentAmount(0.9)
              setInputAmount((balanceInt * percentAmount).toString())
            }}
          />
          <QTYButton
            text="Max"
            isSet={percentAmount == 1}
            onClick={() => {
              setPercentAmount(1)
              setInputAmount(balanceInt.toString())
            }}
          />
        </div>
        <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px]">
          <div className="rounded-[16px] h-[78px] w-full px-[24px] py-[15px] flex flex-row justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
            <div className="flex flex-col justify-between">
              <span className="text-[10px] font-semibold uppercase">
                {t('amountToStake')}
              </span>
              <input
                type="text"
                id="amount"
                className="stake-amount bg-transparent text-sm rounded-lg block w-full p-2.5 "
                placeholder="0"
                onChange={(e) => {
                  setInputAmount(e.target.value)
                }}
                value={inputAmount}
                max={balanceInt}
                min="0.0"
                disabled={parseFloat(balance) == 0 || !approved}
                required
              />
            </div>
            <div className="flex items-end">
              <span className="text-[14px] font-bold leading-[24px] uppercase">
                {t('lock')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[10px]">
          <div className="flex items-center gap-[8px] cursor-pointer">
            <input
              type="checkbox"
              id="customCheckbox2"
              className="custom-checkbox hidden"
              checked={termsApproved}
              onChange={(e) => setTermsApproved(e.target.checked)}
            />

            <label
              onClick={() => setTermsApproved(!termsApproved)}
              htmlFor="customCheckbox2"
              className="w-6 h-6 bg-black border-2 border-gray-400 rounded-sm relative cursor-pointer"
            />

          </div>
          <div className="text-[12px] leading-[16px] font-medium">
            I understand & accept the{' '}
            <span className="underline font-semibold hover:cursor-pointer">
              <Link target="_blank" href="https://docs.houdiniswap.com/">
                Staking Terms & Conditions
              </Link>
            </span>
          </div>
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
