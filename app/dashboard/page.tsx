'use client'

import { ResponsivePage } from '@/components/ResponsivePage'

export default function Dashboard() {
  return (
    <ResponsivePage>
      <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
        Your Staking Dashboard
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-row justify-center items-center gap-10">
          <div className="w-[271px] h-[149px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              Your $POOF Locked
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              0
            </div>
          </div>
          <div className="w-[231px] h-[149px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              Your First Unlock
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
          <div className="w-[271px] h-[149px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              Your Blended APR Rate
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
          <div className="w-[231px] h-[149px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center">
            <div className="text-[23px] rainbow-text leading-[34px] text-center font-light">
              Your Commission
            </div>
            <div className="text-[35px] text-white leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="w-[493px] h-[460px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center"></div>
          <div className="w-[700px] h-[460px] rounded-[24px] bg-gray-500 sm:flex hidden flex-col justify-center items-center"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10 w-[1218px] h-[551px] rounded-[24px] bg-gray-500"></div>
      </div>
    </ResponsivePage>
  )
}
