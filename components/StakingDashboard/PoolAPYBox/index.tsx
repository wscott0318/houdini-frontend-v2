import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'

import { InfoCircleSvg } from '@/components/Svg'

import { StackedBarChart } from './StackedBarChart'
import Tooltip from '@/components/Tooltip'
import { useMediaQuery } from 'usehooks-ts'

export interface IGroupedData {
  label: string
  values: number[]
}

const currentDate = new Date()
const currentMonth = currentDate.getMonth() + 1 // Note: Month index starts from 0
const lastFiveMonths: string[] = []

for (let i = 0; i < 5; i++) {
  let month = currentMonth - i
  let year = currentDate.getFullYear()

  if (month <= 0) {
    // Adjusting for previous year
    month += 12
    year--
  }

  lastFiveMonths.push(
    new Date(year, month - 1).toLocaleString('default', { month: 'short' }),
  )
}

const PoolAPYBox = ({
  poolApy,
  userApy,
  earned,
  balance,
}: {
  poolApy: bigint
  userApy: bigint
  earned: bigint
  balance: bigint
}) => {
  const { t } = useTranslation()
  let GROUPED_BAR_CHART_DATA: IGroupedData[] = lastFiveMonths.map((month) => ({
    label: month,
    values: [0, 0],
  }))
  GROUPED_BAR_CHART_DATA = GROUPED_BAR_CHART_DATA.reverse()

  GROUPED_BAR_CHART_DATA[GROUPED_BAR_CHART_DATA.length - 1].values = [
    // Number(formatUnits(balance ?? 0n, 18)),
    Number(formatUnits(earned ?? 0n, 18)),
  ]

  const isXlSize = useMediaQuery('(min-width: 1280px)')
  const isSmallSize = useMediaQuery('(max-width: 640px) and (min-width: 561px)')
  const isXsSize = useMediaQuery('(max-width: 360px)')

  return (
    <div className='sm:w-1/2 sm:h-full'>
      <div className="sm:h-full relative flex flex-col items-center backdrop-blur-[46px] w-full custom-modal-step2-drop-shadow rounded-[28px] h-auto my-[10px] sm:my-0 sm:mx-[10px] lg:mx-[20px] xl:h-[706px]">
        <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
          <div className="flex flex-col justify-between w-full h-full">
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-row w-full justify-between items-center">
                <span className='text-[20px] font-medium'>{t('poolApyTitle')}</span>
                <div className='relative'>
                  <Tooltip
                    additionalClassNames="right-[0px] top-[25px] w-[250px]"
                    text={<>
                      Pool APY is the annual projected calculation of last week&#39;s $LOCK
                      buybacks based on the current total staked $LOCK.
                      <br />
                      Your average APY is an annual projected calculation of your $LOCK rewards earned based on your total staked $LOCK.
                      Calculations are updated approximately every 30 seconds.
                    </>}
                  >
                    <InfoCircleSvg className="w-[20px] h-[20px]" />
                  </Tooltip>
                </div>

              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="bg-gradient-to-b from-green-300 to-green-700 font-medium bg-clip-text text-transparent text-[50px]">
                  +{Number(poolApy)}%
                </span>
                <div className="flex flex-col gap-[6px]">
                  <span className="pb-[10px] text-[20px]">
                    {t('poolApycustomerAvgApy')}
                  </span>
                  <span className="text-[50px] font-medium">
                    +{Number(userApy)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <div className="flex flex-row pb-[10px] w-full justify-between">
                <span className="text-[20px]">{t('poolApyAccEarnings')}</span>
                <div className='relative'>
                  <Tooltip
                    additionalClassNames="right-[0px] top-[25px] w-[150px]"
                    text={<>
                      Shows your staking deposits and rewards earned per month
                    </>}
                  >
                    <InfoCircleSvg className="w-[20px] h-[20px]" />
                  </Tooltip>
                </div>
              </div>
              <div className="w-full">
                <StackedBarChart
                  data={GROUPED_BAR_CHART_DATA}
                  widthCustom={isXlSize || isSmallSize ? 300 : isXsSize ? 160 : 200}
                  heightCustom={287}
                />
              </div>
            </div>
            {/* <div className="justify-center items-center w-full flex">
            <CTAButton width="204px" height="48px">
              <div className="w-[204px] h-[48px] justify-center items-center text-center flex flex-row gap-[7px]">
                <ShareSvg className="w-[14px] h-[14px]" />
                <span>{t('share')}</span>
              </div>
            </CTAButton>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolAPYBox
