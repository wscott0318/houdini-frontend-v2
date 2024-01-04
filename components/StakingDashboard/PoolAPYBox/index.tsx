import React from 'react'
import CTAButton from '../CTAButton';

import {
  InfoCircleSvg,
  ShareSvg
} from '@/components/Svg'
import { useTranslation } from 'react-i18next'

const PoolAPYBox = () => {
  const { t } = useTranslation()
  return (
      <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-[360px] h-[706px] p-[30px]">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row w-full justify-between items-center">
              <span>{t('poolApyTitle')}</span>
              <InfoCircleSvg className="w-[20px] h-[20px]" />
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="bg-gradient-to-b from-green-300 to-green-700 font-medium bg-clip-text text-transparent text-[50px]">+17.40%</span>
              <div className="flex flex-col gap-[6px]">
                <span className="pb-[10px] text-[20px]">{t('poolApycustomerAvgApy')}</span>
                <span className="text-[50px] font-medium">+15.00%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row pb-[10px] justify-between">
              <span className="text-[20px]">{t('poolApyAccEarnings')}</span>
              <InfoCircleSvg className="w-[20px] h-[20px]" />
            </div>
            <div>
              {/* <BarChart /> */}
            </div>
          </div>
          <div className="justify-center items-center w-full flex">
            <CTAButton width="204px" height="48px">
              <div className='justify-center items-center w-full text-center flex flex-row gap-[7px]'>
                <ShareSvg className="w-[14px] h-[14px]"/>
                <span>Share</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
  );
}

export default PoolAPYBox;