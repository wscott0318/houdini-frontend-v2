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
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[482px] h-[697px] p-[1px]">
        <div className='p-[30px] w-full h-full rounded-[28px] custom-balances-box-inner-shadow'>
          <div className="flex flex-col justify-between w-full h-full">
            <div className='flex flex-row justify-between w-full'>
              <span className='text-[20px] font-medium'>{t('poolStats')}</span>
              <CTAButton height='42px' width='98px'>
                <div className='flex flex-row gap-[7px] w-full h-full justify-center items-center my-[11px] mx-[18px]'>
                  <ShareSvg className="w-[14px] h-[14px]"/>
                  <span className='text-[14px] font-semibold leading-normal'>{t('share')}</span>
                </div>
              </CTAButton>
            </div>
            <div className='flex flex-row gap-[20px] pt-[10px] pb-[20px]'>
              <div className='flex flex-col gap-[30px]'>
                <div className='flex flex-col gap-[14px]'>
                  <div className="flex flex-row gap-[5px] items-center">
                    <StakedCircleIconSvg className="w-[35px] h-[35px]"/>
                    <span className="rainbow-text text-[18px] font-semibold">{t('totalLockStaked')}</span>
                  </div>
                  <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                    <span>920.4M</span>
                    <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px] uppercase'>{t('lock')}</span>
                  </div>
                </div>
                <div className='flex flex-col gap-[14px]'>
                  <div className="flex flex-row gap-[5px] items-center">
                    <TVLCircleIconSvg className="w-[35px] h-[35px]"/>
                    <span className="rainbow-text text-[18px] font-semibold">{t('totalTVL')}</span>
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
                    <span className="rainbow-text text-[18px] font-semibold">{t('totalRewardsPaid')}</span>
                  </div>
                  <div className='flex flex-row items-center pl-[40px] gap-[5px]'>
                    <span>1,323,920.42 </span>
                    <span className='bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]'>{t('lock')}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[17px]">
              <span className="text-[20px]">{t('lastWeeksAPYbreakdown')}</span>
              <div className="flex flex-row gap-[71px]">
                <DonutChart />
                <div className="flex flex-col gap-[16px]">
                  <div className='flex flex-row gap-[20px] items-center'>
                    <div className='w-[10px] h-[36px] bg-gradient-to-b from-[#BCAAFF] to-[#B364D1] rounded-t-[100px] rounded-b-[100px]'></div>
                    <div className='flex flex-col gap-[8px]'>
                      <span className="text-[18px] font-semibold rainbow-text">{t('buyBack')}</span>
                      <span>90%</span>
                    </div>
                  </div>
                  <div className='flex flex-row gap-[20px] items-center'>
                  <div className='w-[10px] h-[36px] bg-gradient-to-b from-[#FB792F] via-[#F3C755] to-[#F5C341] rounded-t-[100px] rounded-b-[100px]'></div>
                    <div className='flex flex-col gap-[8px]'>
                      <span className="text-[18px] font-semibold rainbow-text">{t('fallenWizards')}</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-[50px]">
              <CTAButton height='48px' width='150px'>
                <div className='flex flex-row gap-[7px] w-full h-full justify-center items-center'>
                  <span className="text-[16px] font-semibold">{t('buyLock')}</span>
                </div>
              </CTAButton>
              <CTAButton height='48px' width='150px'>
                <div className='flex flex-row gap-[7px] w-full h-full justify-center items-center'>
                  <StakeMoreSvg className="w-[16px] h-[16px]"/>
                  <span className="text-[16px] font-semibold">{t('stakeMore')}</span>
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PoolStatsBox;