import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Humanize from 'humanize-plus'

import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import {
  BackIconSvg,
  CloseSvg,
  FCheckSvg,
  InfoCircleSvg,
  InfoSquareSvg,
  InfoSquarewhiteSvg,
  WalletSvg,
} from '@/components/Svg'
import { toast } from 'react-toastify'
import { ADDRESSES, USD_DECIMALS } from '@/utils/constants'
import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from '@/staking/hooks/scaffold-eth'
import { formatUnits } from 'viem'
import { useNetwork } from 'wagmi'

const NoPenaltyWithdrawalBox = ({
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
  address,
}: {
  handleNext: any
  handlePrevious: any
  handleClose: any
  handleResetState: any
  address: string
}) => {
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { data: tokenContract } = useScaffoldContract({
    contractName: 'Houdini',
  })

  // User stats
  const [user, setUser] = useState<any>()
  const [timeLeft, setTimeLeft] = useState(0)
  const [earned, setEarned] = useState(0n)

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
    }

  }, [userData, address])

  const addressPath = [
    tokenContract?.address,
    ADDRESSES[chain?.id ?? 1]?.weth,
    ADDRESSES[chain?.id ?? 1]?.usd,
  ]
  const userTotalLocked = (user?.balance as bigint ?? 0n) + (earned as bigint ?? 0n);

  const { data: balanceUsd } = useScaffoldContractRead({
    contractName: 'UniswapRouter2',
    functionName: 'getAmountsOut',
    args: [userTotalLocked ?? 0n, addressPath],
    enabled: userTotalLocked > 0n,
  } as any)

  const userTotalLockedNumber = parseFloat(
    formatUnits(
      (userTotalLocked as bigint) ?? 0n,
      18,
    ),
  );

  const totalUsdNumber = parseFloat(
    formatUnits(
      (balanceUsd?.[2] as unknown as bigint) ?? 0n,
      USD_DECIMALS,
    ),
  );

  const { writeAsync: writeRequestExit, isLoading: requestExitLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "requestUnlock",
    args: [],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      toast.success('Your request to unstake has been submitted!')
      handleClose()
      handleResetState?.()
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);
  
  const handleRequestExit = () => {
    if (!user?.balance) {
      toast.error('You have no funds staked!')
      return
    }
    writeRequestExit();
  };

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[22px] items-center">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row gap-[16px] items-center">
              <button onClick={handlePrevious}>
                <BackIconSvg className="w-[20px] h-[20px]" />
              </button>
              <div className="flex flex-row gap-[10px] items-center">
                <Image
                  src={LockTokenIcon1}
                  className="w-[42px] h-[42px]"
                  alt="LockTokenIcon1"
                />
                <span className="text-[20px] leading-normal font-semibold">
                  End Stake
                </span>
              </div>
            </div>
            <button onClick={handleClose}>
              <CloseSvg className="w-[20px] h-[20px]" />
            </button>
          </div>
          <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px] w-[380px] h-[80px]">
            <div className="rounded-[16px] h-full w-full pl-[20px] pt-[17px] flex justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
              <div className="flex flex-col w-[336px] gap-[8px]">
                <div className="flex flex-row gap-[5px]">
                  <span className="text-[10px] font-semibold uppercase">
                    address
                  </span>
                  <InfoSquarewhiteSvg className="w-[16px] h-[16px]" />
                </div>
                <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-row gap-[10px]">
                    <span className="text-[20px] font-medium leading-[19px]">
                      {address.substring(0, 18)}...
                      {address.substring(address.length - 4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[16px] w-[380px] h-[96px] bg-gradient-to-b from-[#9687FF] to-[#334AD3] pl-[24px] pt-[15px] pb-[9px]">
            <div className="h-[72px] flex flex-col justify-between">
              <span className="text-[10px]">AVAILABLE BALANCE</span>
              <div className="gap-[5px] h-[49px] flex flex-col">
                <span className="text-[25px] font-medium leading-[20px]">
                  {Humanize.formatNumber(userTotalLockedNumber, 2)} $LOCK
                </span>
                <span className="text-[14px] font-medium leading-normal text-[#ffffff80]">
                  ${Humanize.formatNumber(totalUsdNumber, 2)} USD
                </span>
              </div>
            </div>
          </div>

          <span className="font-bold text-[16px] leading-normal text-[#6CD185]">
            You unlock in 90 days.
          </span>
          <div className="flex relative">
            <div className="absolute top-0 left-0 w-[380px] rounded-[16px] h-[80px] bg-gradient-to-b from-[#ffffff80] to-[#ffffff00] opacity-[0.2]"></div>
            <div className="w-[380px] h-[80px] rounded-[16px]  pt-[17px] pl-[24px]">
              <div className="flex flex-col gap-[8px]">
                <span className="text-[#fff] text-[10px] uppercase">
                  You Recieve
                </span>
                <span className="text-[#fff] text-[20px] leading-[19px] font-semibold">
                {Humanize.formatNumber(userTotalLockedNumber, 2)} $LOCK
                </span>
              </div>
            </div>
          </div>

          <button
            className={
              'p-[16px] flex w-[271px] h-[58px] justify-center items-center rounded-[120px] custom-day-widthrawal-button-gradient'
            }
            onClick={handleRequestExit}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <WalletSvg className="w-[16px] h-[16px]" />
              <span className="text-[20px] font-semibold">
                90 Day Withdrawal
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoPenaltyWithdrawalBox
