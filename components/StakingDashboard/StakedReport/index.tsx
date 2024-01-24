import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Humanize from 'humanize-plus'
import { CloseSvg } from '@/components/Svg'
import { formatUnits } from 'viem'
import { useScaffoldContractRead } from '@/staking/hooks/scaffold-eth'
import { useAccount } from 'wagmi'

const StakedReport = ({
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
}: {
  handleNext: any
  handlePrevious: any
  handleClose: any
  handleResetState: any
}) => {
  const { t } = useTranslation()

  const { address } = useAccount()

  // User stats
  const [user, setUser] = useState<any>()

  const { data: userData } = useScaffoldContractRead({
    contractName: 'Staker',
    functionName: 'UserInfo',
    args: [address],
  } as any)

  useEffect(() => {
    if (userData) {
      const userDataArr = userData as any
      setUser(userDataArr[0])
    }
  }, [userData, address])

  const handleFinish = () => {
    handleClose()
    handleResetState?.()
  }

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] p-[1px]">
      <div className="absolute top-[30px] right-[30px]">
        <button onClick={handleClose}>
          <CloseSvg className="w-[20px] h-[20px]" />
        </button>
      </div>
      <div className="w-[612px] p-[30px] rounded-[28px] custom-balances-box-inner-shadow flex flex-col gap-[10px]  justify-center items-center">
        <div className="flex flex-col items-center gap-[10px] pb-[20px] w-[496px] text-center">
          <div className="flex flex-col gap-[30px] items-center">
            <div className="text-[40px] font-medium leading-normal">
              🧙 YOU&apos;RE A WIZARD 🧙‍
            </div>
            <div className='gradient-text rainbow-text font-medium text-lg'> ✨ Thou funds are now Staked ✨</div>

            <div className="text-[14px] font-normal leading-normal">
              <div className='font-medium text-lg mb-2'>
                Your Total Staked Balance is
              </div>
              <h1 className='text-5xl'>{Humanize.formatNumber(parseFloat(formatUnits(user?.balance ?? 0n, 18)))}</h1>
            </div>
            <button
              className='p-[16px] flex justify-center items-center rounded-[120px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] w-[190px]'
              onClick={handleFinish}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakedReport
