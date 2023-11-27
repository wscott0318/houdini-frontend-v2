'use client'

import { ResponsivePage } from '@/components/ResponsivePage'
import { QuestionSvg } from '@/components/Svg'
import { CardSmall, HoudiniButton } from 'houdini-react-sdk'

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

  const cardsData = [
    { title: 'Your $POOF Locked', text: '0' },
    { title: 'Your First Unlock', text: 'n/a' },
    { title: 'Your Blended APR Rate', text: 'n/a' },
    { title: 'Your Commission', text: 'n/a' },
  ]

  return (
    <ResponsivePage>
      <div className="lg:text-[81px] text-center text-[35px] font-bold leading-[54px] capitalize tracking-[-0.85px]">
        Your Staking Dashboard
      </div>
      <button
        className="text-[#FBD20F] lg:hidden flex justify-center items-center rounded-full border border-[#FBD20F] w-[178px] h-[48px] bg-black font-bold text-[19px] leading-[31px]"
        onClick={() => {
          console.log('connect wallet')
        }}
      >
        Connect Wallet
      </button>
      <div className="flex flex-col justify-center items-center gap-[60px] lg:gap-10">
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 place-items-center place-content-center gap-10">
          {cardsData.map((item, index) => (
            <CardSmall key={index} title={item.title} text={item.text} />
          ))}
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-[60px] lg:gap-5">
          <div className="w-full lg:w-[493px] h-full rounded-[24px] bg-gray-500 flex flex-col justify-start p-[16px] lg:p-[30px] items-center">
            <div className="text-[20px] leading-[31px] lg:text-[27px] lg:leading-[47px] pb-[10px] font-medium">
              Commission Tiers
            </div>
            <div className="flex flex-col justify-between items-center w-full gap-[10px] lg:gap-[5px]">
              <div className="flex py-[10px] pb-[10px] flex-row text-[15px] leading-[25px] lg:text-[22px] lg:leading-[37px] font-bold w-full justify-between items-center">
                <div>$POOF Locked</div>
                <div className="flex flex-row justify-start items-center gap-[10px]">
                  <div>Swap Commission</div>
                  <QuestionSvg />
                </div>
              </div>
              {poofData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row w-full font-poppins gap-[6px] lg:px-[20px] text-[15px] leading-[25px] lg:text-[19px] lg:leading-[30px] justify-between items-center"
                >
                  <div>{item.amount} $POOF</div>
                  <div>{item.percentage}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[700px] h-full rounded-[24px] bg-gray-500 flex flex-col justify-start p-[16px] lg:p-[30px] items-center gap-[10px] lg:gap-[5px]">
            <div className="text-[20px] leading-[31px] lg:text-[27px] lg:leading-[47px] pb-[10px] font-medium flex flex-row gap-[10px] justify-start items-center">
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
                } flex flex-row w-full font-poppins gap-[6px] whitespace-nowrap lg:px-[20px] text-[14px] leading-[25px] lg:text-[19px] lg:leading-[30px] justify-between items-center`}
              >
                <div>{item.text}</div>
                <div>{item.amount}</div>
              </div>
            ))}
            <div className="gradient-text hidden lg:block text-xs text-center w-full py-[15px] mt-[10px]">
              *Total commission is constantly updated with other metrics updated
              every $20 worth of attributable commission
            </div>
            <div className="gradient-text block lg:hidden text-[13px] leading-[22px] text-center w-full py-[15px] mt-[10px]">
              *Total commission is updating instantly as it is pulled directly
              from the DB. While the rest are stored in the Rewards contract and
              only updated every min $20 worth of attributable commission stats
            </div>
            <HoudiniButton text={'Claim Commission'} onClick={() => {}} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-10 w-full xl:w-[1218px] p-[30px] xl:h-[551px] rounded-[24px] bg-gray-500">
          <div className="text-[20px] leading-[31px] lg:text-[27px] lg:leading-[47px] lg:pb-[10px] font-medium flex flex-col lg:flex-row gap-[10px] justify-start items-center">
            <div>Commission Account Settings</div>
            <QuestionSvg />
          </div>
          <div className="flex flex-col justify-start w-full items-center gap-[16px] lg:gap-[30px]">
            <div className="flex flex-col justify-start items-start px-[35px] py-[20px] w-full h-[100px] xl:h-[110px] rounded-[24px] bg-gray-300">
              <div className="flex flex-row justify-center gap-1 items-center text-[15px] lg:text-[22px] leading-normal font-bold">
                <span className="gradient-text">*</span>
                <span>Set your Account ID:</span>
              </div>
              <div className="bg-gray-400 w-full h-[40px] rounded-[15px]">
                <input
                  className="w-full h-full bg-transparent text-[18px] font-poppins leading-[30px] focus:outline-none px-[34px]"
                  placeholder="Your account ID .."
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start px-[35px] py-[20px] w-full h-[100px] xl:h-[110px] rounded-[24px] bg-gray-300">
              <div className="flex flex-row justify-center gap-1 items-center text-[15px] lg:text-[22px] leading-normal font-bold">
                <span className="gradient-text">*</span>
                <span>Set your Account URL:</span>
              </div>
              <div className="bg-gray-400 w-full h-[40px] rounded-[15px]">
                <input
                  className="w-full h-full bg-transparent text-[18px] font-poppins leading-[30px] focus:outline-none px-[34px]"
                  placeholder="https://houdiniswap.com/?id="
                />
              </div>
            </div>
          </div>
          <HoudiniButton text={'Save'} onClick={() => {}} />
        </div>
      </div>
    </ResponsivePage>
  )
}
