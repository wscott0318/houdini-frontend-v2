'use client'

import {
  CardSmall,
  CommissionAccountSettings,
  CommissionTiers,
  YourCommission,
} from 'houdini-react-sdk'

import { ConnectButtonHoudini } from '@/components/ConnectButtonHoudini'
import { ResponsivePage } from '@/components/ResponsivePage'
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
      <ConnectButtonHoudini />
      <div className="flex flex-col justify-center items-center gap-[60px] lg:gap-10">
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 place-items-center place-content-center gap-10">
          {cardsData.map((item, index) => (
            <CardSmall key={index} title={item.title} text={item.text} />
          ))}
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-[60px] lg:gap-5">
          <CommissionTiers
            data={poofData}
            widthClass={width >= 1024 ? '493px' : '100%'}
          />
          <YourCommission
            data={yourPoofData}
            widthClass={width >= 1024 ? '700px' : '100%'}
          />
        </div>
        <CommissionAccountSettings onSave={() => {}} />
      </div>
    </ResponsivePage>
  )
}
