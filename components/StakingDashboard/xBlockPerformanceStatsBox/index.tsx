import { useQuery } from '@apollo/client'
import Humanize from 'humanize-plus'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { QuestionMarkSvg } from '@/components/Svg'
import { PERFORMANCE_STATS_QUERY } from '@/lib/apollo/query'

import CTAButton from '../CTAButton'

const XBlockPerformanceStatsBox = () => {
  const { t } = useTranslation()

  const { data, loading } = useQuery(PERFORMANCE_STATS_QUERY)

  const [totalVolume, setTotalVolume] = useState<any>()
  const [lastMonthVolume, setLastMonthVolume] = useState<any>()
  const [lastWeekVolume, setLastWeekVolume] = useState<any>()

  useEffect(() => {
    if (!loading && data) {
      setTotalVolume(data?.totalVolume)
      setLastMonthVolume(data?.lastMonth)
      setLastWeekVolume(data?.lastWeek)
    }
  }, [loading, data])

  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] h-auto w-full xl:w-[422px] xl:h-[447px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-row justify-between">
            <span>{t('xBlockPerformanceStatistics')}</span>
            <button>
              <QuestionMarkSvg className="w-[18px] h-[18px]" />
            </button>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col md:flex-row gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-gold-gradient-text leading-normal">
                  {t('lastWeekSwaps')}
                </span>
                <span className="text-[20px] font-medium leading-normal">
                  {Humanize.formatNumber(lastWeekVolume?.count) ?? 0}
                </span>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-gold-gradient-text leading-normal">
                  {t('totalSwaps')}
                </span>
                <span className="text-[20px] font-medium leading-normal">
                  {Humanize.formatNumber(totalVolume?.count) ?? 0}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-[50px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-blue-gradient-text leading-normal">
                  {t('monthlyVolume')}
                </span>
                <div className="flex flex-row gap-[5px] items-center">
                  <span className="text-[20px] font-medium leading-normal">
                    {Humanize.formatNumber(
                      lastMonthVolume?.totalTransactedUSD,
                    ) ?? 0}
                  </span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $USD
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-blue-gradient-text leading-normal">
                  {t('totalVolume')}
                </span>
                <div className="flex flex-row gap-[5px] items-center">
                  <span className="text-[20px] font-medium leading-normal">
                    {Humanize.formatNumber(totalVolume?.totalTransactedUSD) ??
                      0}
                  </span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $USD
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col  md:flex-row gap-[30px]">
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-purple-gradient-text leading-normal">
                  {t('lastWeekBuybacks')}
                </span>
                <div className="flex flex-row gap-[5px] items-center">
                  <span className="text-[20px] font-medium leading-normal">
                    {Humanize.formatNumber(lastWeekVolume?.totalBuybackUSD) ??
                      0}
                  </span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $USD
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-[18px] font-medium custom-xBlock-purple-gradient-text">
                  {t('totalBuybacks')}
                </span>
                <div className="flex flex-row gap-[5px] items-center">
                  <span className="text-[20px] font-medium">
                    {Humanize.formatNumber(totalVolume?.totalBuybackUSD) ?? 0}
                  </span>
                  <span className="bg-[#0000004D] rounded-[8px] px-[8px] py-[5px] text-[10px]">
                    $USD
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <CTAButton height="48px" width="190px">
              <div className="flex flex-row gap-[7px] justify-center items-center mx-[60px] my-[12px]">
                <span className="text-[16px] font-medium">{t('moreInfo')}</span>
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default XBlockPerformanceStatsBox
