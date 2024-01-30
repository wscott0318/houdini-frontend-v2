import humanizeDuration from 'humanize-duration'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { CloseSvg, StakeMoreSvg, WalletSvg } from '@/components/Svg'
import {
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from '@/staking/hooks/scaffold-eth'

const WithdrawalExplainerBox = ({
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
  setIsPenalty,
  address,
}: {
  handleNext: any
  handlePrevious: any
  handleClose: any
  handleResetState: any
  setIsPenalty: any
  address: string
}) => {
  const handlePenalty = () => {
    setIsPenalty(true)
    handleNext()
  }

  const handleNoPenalty = () => {
    setIsPenalty(false)
    handleNext()
  }

  const { t } = useTranslation()

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

  const { writeAsync: writeExit, isLoading: exitLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'exit',
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

  const handleExit = () => {
    writeExit()
  }

  const handleEmergencyExit = () => {
    if (!user?.balance) {
      toast.error('You have no funds staked!')
      return
    }

    setIsPenalty(true)
    handleNext()
  };

  const { writeAsync: writeStake, isLoading: stakeLoading } =
    useScaffoldContractWrite({
      contractName: 'Staker',
      functionName: 'stake',
      args: [0n],
      onBlockConfirmation: (txnReceipt: {
        blockHash: any
        contractAddress: any
      }) => {
        toast.success('Stake Successful')

        handleClose()
        handleResetState?.()

        console.log(
          '📦 Transaction blockHash',
          txnReceipt.blockHash,
          txnReceipt,
        )
      },
    } as any)

  const handleStakePool = () => {
    writeStake()
  }

  if (user?.unlockRequested) {
    return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
        <div className="absolute top-[30px] right-[30px]">
          <button onClick={handleClose}>
            <CloseSvg className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="w-[612px] p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]  justify-center items-center">
          <div className="flex flex-col gap-[10px] pb-[20px] text-center w-[496px]">
            <div className="flex flex-col gap-[5px]">
              <span className="text-[25px] font-medium leading-normal">
                You have requested to Unstake.
              </span>
            </div>
            <div className="flex flex-col gap-[5px]">
              {timeLeft > 0 ? (
                <>
                  <span>
                    Time left until you can unstake:{' '}
                    {humanizeDuration(timeLeft * 1000)}
                  </span>

                  <div className="flex flex-row gap-[17px] justify-center items-center mt-10">
                    <button
                      className={
                        'p-[16px] flex w-[271px] h-[58px] justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
                      }
                      onClick={handleEmergencyExit}
                    >
                      <div className="flex flex-row gap-[7px] justify-center items-center">
                        <WalletSvg className="w-[16px] h-[16px]" />
                        <span className="text-[20px] font-semibold">
                          Instant Withdrawal
                        </span>
                      </div>
                    </button>

                    <button
                      className={
                        `p-[16px] flex justify-center items-center rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9]}`
                      }
                      onClick={() => handleStakePool()}
                    >
                      <div className="flex flex-row gap-[7px] justify-center items-center">
                        <StakeMoreSvg className="w-[16px] h-[16px]" />
                        <span className="text-[16px] font-semibold">{t('cancelRequest')}</span>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className={
                      'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
                    }
                    onClick={handleExit}
                  >
                    <div className="flex flex-row gap-[7px] justify-center items-center">
                      <StakeMoreSvg className="w-[16px] h-[16px]" />
                      <span className="text-[16px] font-semibold">Unstake</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
      <div className="absolute top-[30px] right-[30px]">
        <button onClick={handleClose}>
          <CloseSvg className="w-[20px] h-[20px]" />
        </button>
      </div>
      <div className="w-[612px] p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]  justify-center items-center">
        <div className="flex flex-col gap-[10px] pb-[20px] text-center w-[496px]">
          <div className="flex flex-col gap-[5px]">
            <span className="text-[25px] font-medium leading-normal">
              Your Options to Unstake!
            </span>
            <div className="text-[14px] font-normal leading-normal">
              <p className="text-[18px]">Greetings fellow Wizard!</p>
              <br />
              <p>There are two ways to unstake your $LOCK.</p>
              <p>You must unstake 100% of your staked balance.</p>
              <br />

              <p className="text-[18px] font-bold">
                Option 1 - 90 Day Notice, in Full
              </p>
              <p>
                You provide a 90-day notice period during which your $LOCK
                remains locked and no further rewards are accumulated.
                Afterwards, you can claim 100% of your accumulated staked
                balance.
              </p>

              <br />

              <p className="text-[18px] font-bold">
                Option 2 - Immediate, with Penalty
              </p>
              <p>
                Allows you to instantly unstake your $LOCK but with a 25% toll
                applied to your total accumulated balance, meaning the 25% toll
                is applied against your deposited $LOCK as well as your $LOCK
                rewards earned.
              </p>

              <br />

              <p>
                <a
                  className='underline'
                  href="https://docs.houdiniswap.com/houdini-swap/staking-program"
                  target="_blank"
                >
                  Explore here to discover more
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between gap-[10px]">
          <button
            className={
              'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-day-widthrawal-button-gradient'
            }
            onClick={handleNoPenalty}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <StakeMoreSvg className="w-[16px] h-[16px]" />
              <span className="text-[16px] font-semibold">
                90 Day Withdrawal
              </span>
            </div>
          </button>
          <button
            className={
              'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
            }
            onClick={handlePenalty}
          >
            <div className="flex flex-row gap-[7px] justify-center items-center">
              <StakeMoreSvg className="w-[16px] h-[16px]" />
              <span className="text-[16px] font-semibold">
                Instant Withdrawal
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WithdrawalExplainerBox
