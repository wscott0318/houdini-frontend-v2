import React from 'react'
import { useTranslation } from 'react-i18next'

import { InfoCircleSvg, ShareSvg } from '@/components/Svg'

import CTAButton from '../CTAButton'
import { StackedBarChart } from './StackedBarChart'

export interface IGroupedData {
  label: string
  values: number[]
}

const GROUPED_BAR_CHART_DATA: IGroupedData[] = [
  { label: 'Jan', values: [120] },
  { label: 'Feb', values: [100] },
  { label: 'Mar', values: [150] },
  { label: 'Apr', values: [170] },
  { label: 'May', values: [130] },
]

const PoolAPYBox = ({poolApy, userApy}: {poolApy: bigint, userApy: bigint}) => {
  const { t } = useTranslation()
  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] w-full custom-modal-step2-drop-shadow rounded-[28px] h-auto xl:w-[360px] xl:h-[706px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row w-full justify-between items-center">
              <span>{t('poolApyTitle')}</span>
              <InfoCircleSvg className="w-[20px] h-[20px]" />
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="bg-gradient-to-b from-green-300 to-green-700 font-medium bg-clip-text text-transparent text-[50px]">
                +{Number(poolApy)}%
              </span>
              <div className="flex flex-col gap-[6px]">
                <span className="pb-[10px] text-[20px]">
                  {t('poolApycustomerAvgApy')}
                </span>
                <span className="text-[50px] font-medium">+{Number(userApy)}%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <div className="flex flex-row pb-[10px] w-full justify-between">
              <span className="text-[20px]">{t('poolApyAccEarnings')}</span>
              <InfoCircleSvg className="w-[20px] h-[20px]" />
            </div>
            <div className="w-full">
              <StackedBarChart
                data={GROUPED_BAR_CHART_DATA}
                widthCustom={300}
                heightCustom={287}
              />
            </div>
          </div>
          <div className="justify-center items-center w-full flex">
            <CTAButton width="204px" height="48px">
              <div className="w-[204px] h-[48px] justify-center items-center text-center flex flex-row gap-[7px]">
                <ShareSvg className="w-[14px] h-[14px]" />
                <span>{t('share')}</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolAPYBox
