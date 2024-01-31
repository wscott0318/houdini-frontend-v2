import Humanize from 'humanize-plus'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { formatUnits } from 'viem'
import { useNetwork } from 'wagmi'

import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import {
  BackIconSvg,
  CloseSvg,
  FCheckSvg,
  InfoCircleSvg,
  InfoSquareSvg,
  InfoSquarewhiteSvg,
  WalletSvg,
  WidthrawSvg,
} from '@/components/Svg'
import Tooltip from '@/components/Tooltip'
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from '@/staking/hooks/scaffold-eth'
import { ADDRESSES, USD_DECIMALS } from '@/utils/constants'

import SwitchButton from './SwitchButton'

const WithdrawalBox = ({
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
  address,
  unlockRequested,
}: {
  handleNext: any
  handlePrevious: any
  handleClose: any
  handleResetState: any
  address: string
  unlockRequested: boolean
}) => {
  const [value, setValue] = useState(0)
  const { t } = useTranslation()
  const { chain } = useNetwork()
  const { data: tokenContract } = useScaffoldContract({
    contractName: 'Houdini',
  })

  // User stats
  const [user, setUser] = useState<any>()
  const [timeLeft, setTimeLeft] = useState(0)
  const [earned, setEarned] = useState(0n)
  const [unstakeFee, setUnstakeFee] = useState(0)

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

  // Pool Data
  const { data: poolData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'pool',
  } as any)

  useEffect(() => {
    if (poolData && poolData[0]) {
      setUnstakeFee(Number((poolData?.[0] as any).earlyUnstakeFee) / 10000)
    }
  }, [poolData])

  const addressPath = [
    tokenContract?.address,
    ADDRESSES[chain?.id ?? 1]?.weth,
    ADDRESSES[chain?.id ?? 1]?.usd,
  ]
  const userTotalLocked =
    ((user?.balance as bigint) ?? 0n) + ((earned as bigint) ?? 0n)

  const { data: balanceUsd } = useScaffoldContractRead({
    contractName: 'UniswapRouter2',
    functionName: 'getAmountsOut',
    args: [userTotalLocked ?? 0n, addressPath],
    enabled: userTotalLocked ?? 0n > 0n,
  } as any)

  const userTotalLockedNumber = parseFloat(
    formatUnits((userTotalLocked as bigint) ?? 0n, 18),
  )

  const totalUsdNumber = parseFloat(
    formatUnits((balanceUsd?.[2] as unknown as bigint) ?? 0n, USD_DECIMALS),
  )

  const { writeAsync: writeRequestExit, isLoading: requestExitLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'requestUnlock',
      args: [],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        toast.success('Your request to unstake has been submitted!')
        handleClose()
        handleResetState?.()
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
      args: [],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        toast.success('Withdrawal Successful')
        handleClose()
        handleResetState?.()
        console.log(
          '📦 Transaction blockHash',
          txnReceipt.blockHash,
          txnReceipt,
        )
      },
    } as any)

  // const handleEmergencyExit = () => {
  //   toast.success('Withdrawal Successful')
  //   handleClose()
  //   handleResetState()
  // }

  // const handleRequestExit = () => {
  //   toast.success('Withdrawal Successful')
  //   handleClose()
  //   handleResetState()
  // }

  const handleRequestExit = () => {
    if (!user?.balance) {
      toast.error('You have no funds staked!')
      return
    }
    writeRequestExit()
  }

  const handleEmergencyExit = () => {
    if (!user?.balance) {
      toast.error('You have no funds staked!')
      return
    }
    writeEmergencyExit()
  }

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
      <div className="w-full h-full p-[30px] justify-center sm:max-w-full max-w-[300px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[22px] items-center justify-center">
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
                <div className="flex flex-col px-[10px] gap-[5px]">
                  <span className="text-[20px] leading-normal font-semibold">
                    End Stake
                  </span>
                  <span className="text-[#A5A5A5] font-[14px]">$LOCK</span>
                </div>
              </div>
            </div>
            <button onClick={handleClose}>
              <CloseSvg className="w-[20px] h-[20px]" />
            </button>
          </div>
          <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px] w-[280px] sm:w-[380px] h-[80px]">
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
                    <span className="text-xs sm:text-[20px] font-medium leading-[19px]">
                      {address.substring(0, 18)}...
                      {address.substring(address.length - 4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[16px] w-[280px] sm:w-[380px] h-[96px] bg-gradient-to-b from-[#9687FF] to-[#334AD3] pl-[24px] pt-[15px] pb-[9px]">
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

          {value == 0 ? (
            <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-t-[16px] rounded-b-[30px] justify-center items-center flex flex-col p-[2px] w-[280px] sm:w-[380px] h-[115px]">
              <div className="w-full h-[75px] pl-[23px] pt-[18px] rounded-t-[16px] flex flex-col justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
                <div className="flex justify-between w-[332px] items-start">
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[10px] font-semibold uppercase">
                      AMOUNT TO WITHDRAW
                    </span>
                    <span className="text-xs sm:text-[20px] font-medium leading-[19px]">
                      {Humanize.formatNumber(
                        userTotalLockedNumber * (1 - unstakeFee),
                        2,
                      )}{' '}
                      $LOCK
                    </span>
                  </div>
                  {/* <span className="text-[#9C8EFF] text-[12px] font-bold leading-normal uppercase">
                    Max Amount
                  </span> */}
                </div>
              </div>
              <div className="h-[40px] w-full bg-gradient-to-b rounded-b-[30px] from-[#6C5DD380] to-[#4154C980] flex items-center justify-center">
                <span className="text-[10px] uppercase leading-normal font-semibold text-[#ffffff80]">
                  A Penalty Cost will be applied to this amount
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-[#fff] to-[#000] rounded-[16px] justify-center items-center flex p-[2px] w-[280px] sm:w-[380px] h-[92px]">
              <div className="rounded-[16px] w-full h-full pl-[23px] pt-[25px] flex flex-row justify-between bg-gradient-to-b from-[#0b0d11] to-[#343d50]">
                <div className="flex justify-between w-[332px] items-start">
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[10px] font-semibold uppercase">
                      AMOUNT TO WITHDRAW
                    </span>
                    <span className="text-xs sm:text-[20px] font-medium leading-[19px]">
                      {Humanize.formatNumber(userTotalLockedNumber, 2)} $LOCK
                    </span>
                  </div>
                  {/* <span className="text-[#9C8EFF] text-[12px] font-bold leading-normal uppercase">
                    Max Amount
                  </span> */}
                </div>
              </div>
            </div>
          )}

          {!unlockRequested && (
            <div className="flex flex-row gap-[13px] items-center">
              <span
                className={
                  value == 0
                    ? `text-[17px] font-bold leading-[20px]`
                    : `text-[17px] font-bold leading-[20px]`
                }
              >
                Pay Penalty
              </span>
              <SwitchButton value={value} setValue={setValue} />
              <div className="flex flex-row gap-[8px] items-center h-full">
                <span
                  className={
                    value == 1
                      ? `text-[17px] font-bold leading-[20px]`
                      : `text-[17px] font-bold leading-[20px]`
                  }
                >
                  No Penalty
                </span>
                <InfoCircleSvg className="w-[16px] h-[16px]" />
              </div>
            </div>
          )}
          {value == 0 && (
            <div className="flex relative w-full items-start justify-start">
              <div className="absolute top-0 left-0 w-[250px] sm:w-[380px] h-[80px] rounded-[16px] bg-gradient-to-b from-[#ffffff80] to-[#ffffff00] pt-[17px] pl-[24px] opacity-[0.2]"></div>
              <div className="w-[380px] h-[80px] rounded-[16px] pt-[17px] pl-[24px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="flex flex-row gap-[5px] items-center">
                    <span className="text-[#F98F3B] text-[10px]">
                      Fallen Wizard Toll
                    </span>

                    <div className="relative">
                      <Tooltip
                        additionalClassNames="right-[0px] top-[20px] w-[250px]"
                        text={
                          <>
                            Wizards, who withdraw immediately, fall foul of a
                            25% toll on their total $LOCK staked i.e. deposited
                            $LOCK + $LOCK rewards, with 60% going to the staking
                            pool.
                            <br />
                            You can find out more{' '}
                            <a
                              className="underline"
                              href="https://docs.houdiniswap.com/houdini-swap/staking-program"
                              target="_blank"
                            >
                              here
                            </a>
                          </>
                        }
                      >
                        <InfoSquareSvg className="w-[16px] h-[16px]" />
                      </Tooltip>
                    </div>
                  </div>
                  <span className="text-[#F98F3B] text-[20px] leading-[19px] font-semibold">
                    {Humanize.formatNumber(
                      userTotalLockedNumber * unstakeFee,
                      2,
                    )}{' '}
                    $LOCK
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="flex relative w-full items-start justify-start">
            <div className="absolute top-0 left-0 w-[250px] sm:w-[380px] rounded-[16px] h-[80px] bg-gradient-to-b from-[#ffffff80] to-[#ffffff00] opacity-[0.2]"></div>
            <div className="w-[380px] h-[80px] rounded-[16px]  pt-[17px] pl-[24px]">
              <div className="flex flex-col gap-[8px]">
                <span className="text-[#fff] text-[10px] uppercase">TOTAL</span>
                <span className="text-[#fff] text-[20px] leading-[19px] font-semibold">
                  {Humanize.formatNumber(
                    userTotalLockedNumber * (!value ? 1 - unstakeFee : 1),
                    2,
                  )}{' '}
                  $LOCK
                </span>
              </div>
            </div>
          </div>
          {value == 0 ? (
            <button
              className={
                'p-[16px] flex w-[271px] h-[58px] justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
              }
              onClick={handleEmergencyExit}
            >
              <div className="flex flex-row mobile:flex-col gap-[7px] justify-center items-center">
                <WalletSvg className="w-[16px] h-[16px]" />
                <span className="text-[20px] font-semibold">
                  Instant Withdrawal
                </span>
              </div>
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default WithdrawalBox
