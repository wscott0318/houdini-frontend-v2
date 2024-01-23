import React from 'react'
import { useTranslation } from 'react-i18next'
import Humanize from 'humanize-plus'
import { CloseSvg } from '@/components/Svg'
import { formatUnits } from 'viem'

const StakedReport = ({
  handleNext,
  handlePrevious,
  handleClose,
  handleResetState,
  user
}: {
  handleNext: any
  handlePrevious: any
  handleClose: any
  handleResetState: any
  user: any
}) => {
  const handleFinish = () => {
    handleClose()
    handleResetState()
  }

  const { t } = useTranslation()
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
              🧙YOU`&apos;`RE A WIZARD 🧙‍
            </span>
            <div className="text-[14px] font-normal leading-normal">
              ✨ Thou funds are now Staked ✨
              <br />
              Your Total Staked Balance is
              <br />
              <h1 className='text-[24px]'>{Humanize.formatNumber(parseFloat(formatUnits(user?.balance ?? 0n, 18)))}</h1>
              <br />
              <button onClick={handleFinish}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakedReport
