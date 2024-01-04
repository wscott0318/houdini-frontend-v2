import React from 'react'
import { useTranslation } from 'react-i18next'
import CTAButton from '../CTAButton';
import {
  StakeMoreSvg,
  ShareSvg,
  StakedCircleIconSvg,
  TVLCircleIconSvg,
  SupplyCircleIconSvg,
  RewardsCircleIconSvg,
  RainbowQuestionMarkSvg,
} from '@/components/Svg';
import DonutChart from './DonutChart';

const PoolStatsBox = () => {
  const { t } = useTranslation()
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[482px] h-[697px] p-[30px]">
        <div className="flex flex-col justify-between w-full h-full">
          <div className='flex flex-row justify-between w-full'>
            <span className='text-[20px] font-medium'>Pool Statistics</span>
            <CTAButton width="98px" height="42px">
              <div className='justify-center items-center w-full text-center flex flex-row gap-[7px]'>
                <ShareSvg className="w-[14px] h-[14px]"/>
                <span>Share</span>
              </div>
            </CTAButton>
          </div>
          <div className='flex flex-row gap-[20px] pt-[10px] pb-[20px]'>
            <div className='flex flex-col gap-[30px]'>
              <div className='flex flex-col gap-[14px]'>
                <div className="flex flex-row gap-[5px] items-center">
                  <StakedCircleIconSvg className="w-[35px] h-[35px]"/>
                  <span className="rainbow-text text-[18px] font-semibold">Total $LOCK Staked</span>
                </div>
                <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                  <span>920.4M</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>LOCK</span>
                </div>
              </div>
              <div className='flex flex-col gap-[14px]'>
                <div className="flex flex-row gap-[5px] items-center">
                  <TVLCircleIconSvg className="w-[35px] h-[35px]"/>
                  <span className="rainbow-text text-[18px] font-semibold">Total TVL</span>
                </div>
                <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                  <span>$48.4M</span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>$USD</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-[30px]'>
            <div className='flex flex-col gap-[14px]'>
                <div className="flex flex-row gap-[5px] items-center">
                  <SupplyCircleIconSvg className="w-[35px] h-[35px]"/>
                  <span className="rainbow-text text-[18px] font-semibold">% of Supply</span>
                  <button><RainbowQuestionMarkSvg className="w-[18px] h-[18px]"/></button>
                </div>
                <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                  <span>2.75%</span>
                </div>
              </div>
              <div className='flex flex-col gap-[14px]'>
                <div className="flex flex-row gap-[5px] items-center">
                  <RewardsCircleIconSvg className="w-[35px] h-[35px]"/>
                  <span className="rainbow-text text-[18px] font-semibold">Total Rewards Paid</span>
                </div>
                <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                  <span>1,323,920.42 </span>
                  <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>LOCK</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[17px]">
            <span className="text-[20px]">Last Week’s APY Breakdown</span>
            <div className="flex flex-row gap-[71px]">
              <DonutChart />
              <div className="flex flex-col gap-[16px]">
                <div className='flex flex-row gap-[20px] items-center'>
                  <div className='w-[10px] h-[36px] bg-gradient-to-b from-[#BCAAFF] to-[#B364D1] rounded-t-[100px] rounded-b-[100px]'></div>
                  <div className='flex flex-col gap-[8px]'>
                    <span className="text-[18px] font-semibold rainbow-text">Buyback</span>
                    <span>90%</span>
                  </div>
                </div>
                <div className='flex flex-row gap-[20px] items-center'>
                <div className='w-[10px] h-[36px] bg-gradient-to-b from-[#FB792F] via-[#F3C755] to-[#F5C341] rounded-t-[100px] rounded-b-[100px]'></div>
                  <div className='flex flex-col gap-[8px]'>
                    <span className="text-[18px] font-semibold rainbow-text">Fallen Wizards</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <CTAButton height='48px'>
              <div className='flex flex-row gap-[7px] justify-center items-center'>
                <span className="text-[16px] font-semibold">Buy $LOCK</span>
              </div>
            </CTAButton>
            <CTAButton height='48px'>
              <div className='flex flex-row gap-[7px] justify-center items-center'>
                <StakeMoreSvg className="w-[16px] h-[16px]"/>
                <span className="text-[16px] font-semibold">Stake More</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
  );
}

export default PoolStatsBox;