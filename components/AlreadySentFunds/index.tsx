import { useEffect } from 'react'

import { ORDER_STEPS } from '@/utils/constants'

export const AlreadySentFunds = ({
  alreadySent,
  setAlreadySent,
  currentStep,
  setCurrentStep,
}: {
  alreadySent: any
  setAlreadySent: any
  currentStep: any
  setCurrentStep: any
}) => {
  useEffect(() => {
    if (alreadySent) {
      setCurrentStep(ORDER_STEPS.ORDER_DETAILS)
    }
  }, [alreadySent, setAlreadySent, setCurrentStep])

  return (
    <div className="flex flex-row gap-[6px] justify-center items-center">
      <input
        type="checkbox"
        id="alreadySent"
        className="custom-checkbox hidden"
        checked={alreadySent}
        onChange={(e) => setAlreadySent(e.target.checked)}
      />

      <label
        onClick={() => setAlreadySent((prev: any) => !prev)}
        htmlFor="alreadySent"
        className="w-6 h-6 bg-black border-2 border-gray-400 rounded-sm relative cursor-pointer"
      />

      <div
        className="text-[#8C9AE9] text-sm hover:cursor-pointer font-medium"
        onClick={() => setAlreadySent((prev: any) => !prev)}
      >
        Already Sent Your Funds?
      </div>
    </div>
  )
}
