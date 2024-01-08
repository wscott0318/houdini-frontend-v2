'use client'

import {
  CardComponent,
  CommissionAccountSettings,
  HoudiniButton,
} from 'houdini-react-sdk'

import { ConnectButtonHoudini } from '@/components/ConnectButtonHoudini'
import { ResponsivePage } from '@/components/ResponsivePage'
import { QuestionSvg } from '@/components/Svg'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

export default function Dashboard() {
  const [width] = useWindowSize()

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
    { text: 'Total commissions:', amount: '0 $LOCK' },
    { text: 'Commission claimed:', amount: '0 $LOCK' },
    { text: 'Commission claimable:', amount: '0 $LOCK' },
  ]

  const cardsData = [
    { title: 'Your $LOCK Locked', text: '0' },
    { title: 'Your First Unlock', text: 'n/a' },
    { title: 'Your Blended APR Rate', text: 'n/a' },
    { title: 'Your Commission', text: 'n/a' },
  ]

  return (
    <ResponsivePage>
      <div className="lg:text-[81px] text-center text-[35px] font-bold leading-[54px] capitalize tracking-[-0px]">
        Your Staking Dashboard
      </div>
      <ConnectButtonHoudini />
      <div className="z-[1] flex flex-col justify-center items-center gap-[60px] lg:gap-10">
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 place-items-center place-content-center gap-10">
          {cardsData.map((item, index) => (
            <CardComponent key={index}>
              <div className="text-center rainbow-text text-base leading-[20px] md:text-[25px] md:leading-[38px] w-full font-light whitespace-nowrap overflow-hidden text-overflow-ellipsis min-w-0">
                {item.title}
              </div>
              <div className="text-center w-full font-medium text-[32px] md:text-[40px] leading-normal text-white">
                {item.text}
              </div>
            </CardComponent>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row justify-center items-center gap-[60px] lg:gap-5">
          <CardComponent>
            <div className="text-[20px] leading-[31px] lg:text-[27px] lg:leading-[47px] pb-[10px] font-medium">
              Commission Tiers
            </div>
            <div className="flex flex-col justify-between items-center w-full gap-[10px] lg:gap-[5px]">
              <div className="flex py-[10px] pb-[10px] flex-row text-[15px] leading-[25px] lg:text-[22px] lg:leading-[37px] font-bold w-full justify-between items-center">
                <div>$LOCK Locked</div>
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
                  <div>{item.amount} $LOCK</div>
                  <div>{item.percentage}</div>
                </div>
              ))}
            </div>
          </CardComponent>
          <CardComponent>
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
          </CardComponent>
        </div>
        <CommissionAccountSettings onSave={() => {}} />
      </div>
    </ResponsivePage>
  )
}
