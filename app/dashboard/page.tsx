'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { QuestionSvg } from '@/components/Svg'
import { HoudiniButton } from 'houdini-react-sdk'

export default function Dashboard() {
  const poofData = [
    { amount: '100', percentage: '0.05 %' },
    { amount: '25,000', percentage: '0.10 %' },
    { amount: '50,000', percentage: '0.15 %' },
    { amount: '100,000', percentage: '0.20 %' },
    { amount: '250,000', percentage: '0.25 %' },
    { amount: '500,000', percentage: '0.30 %' },
    { amount: '750,000', percentage: '0.35 %' },
    { amount: '100,000,000', percentage: '0.40 %' },
  ]

  const yourPoofData = [
    { text: 'Number of swaps with commission:', amount: '0' },
    { text: 'Swaps total value:', amount: '$0' },
    { text: 'Staked:', amount: '0' },
    { text: 'Total commissions:', amount: '0 $POOF' },
    { text: 'Commission claimed:', amount: '0 $POOF' },
    { text: 'Commission claimable:', amount: '0 $POOF' },
  ]

  return (
    <ResponsivePage>
      <div className="lg:text-[81px] text-center text-[35px] font-bold leading-normal capitalize tracking-[-0.85px]">
        Your Staking Dashboard
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-row justify-center items-center gap-10 flex-wrap">
          <div className="w-[136px] lg:w-[271px] h-[136px] lg:h-[149px] rounded-[24px] bg-gray-500 flex flex-col justify-center items-center">
            <div className="min-h-[40px] text-[16px] lg:text-[23px] rainbow-text leading-[20px] lg:leading-[34px] text-center font-light">
              Your $POOF Locked
            </div>
            <div className="text-[32px] lg:text-[35px] text-white leading-[40px] lg:leading-[50px] font-medium text-center">
              0
            </div>
          </div>
          <div className="w-[136px] lg:w-[231px] h-[136px] lg:h-[149px] rounded-[24px] bg-gray-500 flex flex-col justify-center items-center">
            <div className="min-h-[40px] text-[16px] lg:text-[23px] rainbow-text leading-[20px] lg:leading-[34px] text-center font-light">
              Your First Unlock
            </div>
            <div className="text-[32px] lg:text-[35px] text-white leading-[40px] lg:leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
          <div className="w-[136px] lg:w-[271px] h-[136px] lg:h-[149px] rounded-[24px] bg-gray-500 flex flex-col justify-center items-center">
            <div className="min-h-[40px] text-[16px] lg:text-[23px] rainbow-text leading-[20px] lg:leading-[34px] text-center font-light">
              Your Blended APR Rate
            </div>
            <div className="text-[32px] lg:text-[35px] text-white leading-[40px] lg:leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
          <div className="w-[136px] lg:w-[231px] h-[136px] lg:h-[149px] rounded-[24px] bg-gray-500 flex flex-col justify-center items-center">
            <div className="min-h-[40px] text-[16px] lg:text-[23px] rainbow-text leading-[20px] lg:leading-[34px] text-center font-light">
              Your Commission
            </div>
            <div className="text-[32px] lg:text-[35px] text-white leading-[40px] lg:leading-[50px] font-medium text-center">
              n/a
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-5">
          <div className="w-full lg:w-[493px] h-full rounded-[24px] bg-gray-500 flex flex-col justify-start p-[30px] items-center">
            <div className="text-[27px] leading-[47px] pb-[10px] font-medium">
              Commission Tiers
            </div>
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex py-[10px] pb-[10px] flex-row text-[22px] leading-[37px] font-bold w-full justify-between items-center">
                <div>$POOF Locked</div>
                <div className="flex flex-row justify-start items-center gap-[10px]">
                  <div>Swap Commission</div>
                  <QuestionSvg />
                </div>
              </div>
              {poofData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row w-full font-poppins gap-[6px] px-[20px] text-[19px] leading-[30px] justify-between items-center"
                >
                  <div>{item.amount} $POOF</div>
                  <div>{item.percentage}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[700px] h-full rounded-[24px] bg-gray-500 flex flex-col justify-start p-[30px] items-center">
            <div className="text-[27px] leading-[47px] pb-[10px] font-medium flex flex-row gap-[10px] justify-start items-center">
              <div>Your Commission</div>
              <QuestionSvg />
            </div>
            {yourPoofData.map((item, index) => (
              <div
                key={index}
                className={`${
                  index === yourPoofData.length - 1
                    ? 'border-t-[2px] border-white'
                    : ''
                } flex flex-row w-full font-poppins gap-[6px] px-[20px] text-[19px] leading-[30px] justify-between items-center`}
              >
                <div>{item.text}</div>
                <div>{item.amount}</div>
              </div>
            ))}
            <div className="gradient-text text-xs text-center w-full py-[15px] mt-[10px]">
              *Total commission is constantly updated with other metrics updated
              every $20 worth of attributable commission
            </div>
            <HoudiniButton text={'Claim Commission'} onClick={() => {}} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10 w-full xl:w-[1218px] p-[30px] xl:h-[551px] rounded-[24px] bg-gray-500">
          <div className="text-[27px] leading-[47px] pb-[10px] font-medium flex flex-row gap-[10px] justify-start items-center">
            <div>Commission Account Settings</div>
            <QuestionSvg />
          </div>
          <div className="flex flex-col justify-start w-full items-center gap-[30px]">
            <div className="flex flex-col justify-start items-start px-[35px] py-[20px] w-full h-[140px] xl:h-[110px] rounded-[24px] bg-gray-300">
              <div className="flex flex-row justify-center gap-1 items-center text-[22px] leading-normal font-bold">
                <span className="gradient-text">*</span>
                <span>Set your Account ID:</span>
              </div>
              <div className="bg-gray-400 w-full h-[40px] rounded-[15px]">
                <input className="w-full h-full bg-transparent text-[18px] font-poppins leading-[30px] focus:outline-none px-[34px]" placeholder='Your account ID ..'/>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start px-[35px] py-[20px] w-full h-[140px] xl:h-[110px] rounded-[24px] bg-gray-300">
              <div className="flex flex-row justify-center gap-1 items-center text-[22px] leading-normal font-bold">
                <span className="gradient-text">*</span>
                <span>Set your Account URL:</span>
              </div>
              <div className="bg-gray-400 w-full h-[40px] rounded-[15px]">
                <input className="w-full h-full bg-transparent text-[18px] font-poppins leading-[30px] focus:outline-none px-[34px]" placeholder='https://houdiniswap.com/?id='/>
              </div>
            </div>
          </div>
          <HoudiniButton text={'Save'} onClick={() => {}} />
        </div>
      </div>
    </ResponsivePage>
  )
}
