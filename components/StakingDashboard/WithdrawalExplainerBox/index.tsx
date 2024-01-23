import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { CloseSvg, StakeMoreSvg } from '@/components/Svg'

import QTYButton from '../QTYButton'
import { useScaffoldContractRead, useScaffoldContractWrite } from '@/staking/hooks/scaffold-eth'
import humanizeDuration from 'humanize-duration'

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


  const { writeAsync: writeExit, isLoading: exitLoading } = useScaffoldContractWrite({
    contractName: "Staker",
    functionName: "exit",
    args: [],
    onBlockConfirmation: (txnReceipt: { blockHash: any; contractAddress: any }) => {
      toast.success('Withdrawal Successful')
      handleClose()
      handleResetState?.()
      console.log("📦 Transaction blockHash", txnReceipt.blockHash, txnReceipt);
    },
  } as any);

  const handleExit = () => {
    writeExit();
  };

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
              {timeLeft > 0 ?
                <span>Time left until you can unstake: {humanizeDuration(timeLeft * 1000)}</span> : <>
                  <button
                    className={
                      'p-[16px] flex w-full justify-center items-center rounded-[120px] custom-instant-withdrawal-button-gradient'
                    }
                    onClick={handleExit}
                  >
                    <div className="flex flex-row gap-[7px] justify-center items-center">
                      <StakeMoreSvg className="w-[16px] h-[16px]" />
                      <span className="text-[16px] font-semibold">
                        Unstake
                      </span>
                    </div>
                  </button></>
              }
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
              Fallen Wizard Penalty
            </span>
            <div className="text-[14px] font-normal leading-normal">
              🧙‍♂️ {`"Beware, Fellow Wizard!`} 🧙‍♂️
              <br />
              <p>
                ✨ {`Learn the Principles of the 'Fallen Wizard Penalty'`} ✨
              </p>
              <br />
              <p>
                When thou seeks to retrieve thy magical funds, two paths lay
                before thee:
              </p>
              <br />
              <p>
                The{' '}
                <span className="text-[#F6AD49]">{`'Instant Withdrawal Spell'`}</span>{' '}
                🌟💰
                {`: With a mere incantation, you may withdraw your riches in haste! Yet, beware the 'Fallen Wizard Penalty,' for it shall exact a toll of 15% of your $LOCK treasure. `}
                💸💔
              </p>
              <br />
              <p>
                The{' '}
                <span className="text-[#6CD185]">{`'Wise Wizard's 90 Day Spell'`}</span>{' '}
                🧙‍♂️🕰️: Should your patience rival the sages of old, you can
                choose to wait for 90 days. This path holds no penalty, and your
                wealth shall remain untouched until the appointed hour arrives.
                ⏳
              </p>
              <br />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-[25px] font-medium">{`Wise Wizard's Reprieve`}</span>
            <span className="text-[14px] leading-normal font-normal">
              <p>
                If you choose the 90-day path, an additional boon awaits you!
              </p>
              <p>
                {`You shall be granted the 'Cancel and Reclaim' spell`} 📜🔮
              </p>
              <br />
              <p>
                Should you change your mind before the appointed hour, you can
                cancel your withdrawal and regain the interest that would have
                otherwise accrued during that time. 💰🔁
              </p>
            </span>
          </div>
          <span className="text-[14px] leading-normal font-normal">
            Choose wisely, O Wizard, for your fate lies in your hands! ✨📜{`"`}
          </span>
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
