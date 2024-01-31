import { useQuery } from '@apollo/client'
import Humanize from 'humanize-plus'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatUnits, parseUnits } from 'viem'
import { useNetwork } from 'wagmi'

import LockTokenIcon1 from '@/assets/LockTokenIcon1.png'
import { QuestionMarkSvg } from '@/components/Svg'
import { PERFORMANCE_STATS_QUERY, PRICEUSD_QUERY } from '@/lib/apollo/query'
import {
  useScaffoldContract,
  useScaffoldContractRead,
} from '@/staking/hooks/scaffold-eth'
import { ADDRESSES, USD_DECIMALS } from '@/utils/constants'
import Tooltip from '@/components/Tooltip'

const NextBurnBox = () => {
  const { t } = useTranslation()

  const { chain } = useNetwork()

  const { data: tokenContract } = useScaffoldContract({
    contractName: 'Houdini',
  })

  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  const [tvl, setTvl] = useState(0)
  const [burnDate, setBurnDate] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  })

  const { data, loading } = useQuery(PERFORMANCE_STATS_QUERY)

  const calculateCountdown = (endDate: string) => {
    const now = new Date()
    const distance = +new Date(endDate) - +now

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let secs = Math.floor((distance % (1000 * 60)) / 1000)

    return { days, hours, mins, secs }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (burnDate) {
        setCountdown(calculateCountdown(burnDate))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [burnDate])

  useEffect(() => {
    if (!loading && data) {
      setBurnDate(data?.nextBurnDate?.value)
      setBurnAmount(data?.nextBurnAmount?.value)
    }
  }, [loading, data])

  const addressPath = [
    tokenContract?.address,
    ADDRESSES[chain?.id ?? 1]?.weth,
    ADDRESSES[chain?.id ?? 1]?.usd,
  ]
  // const { data: tvl } = useScaffoldContractRead({
  //   contractName: 'UniswapRouter2',
  //   functionName: 'getAmountsOut',
  //   args: [parseUnits(burnAmount, 18), addressPath],
  //   enabled: parseUnits(burnAmount, 18) > 0n,
  // } as any)

  const { data: priceUsd, loading: loadingPrice } = useQuery(PRICEUSD_QUERY, {
    fetchPolicy: 'no-cache',
    pollInterval: 30000,
  })
  useEffect(() => {
    setTvl(priceUsd?.priceUsd* data?.nextBurnAmount?.value)
  }, [priceUsd, data])

  return (
    <div className="relative flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px] w-full h-auto md:w-[422px] md:h-[297px] p-[1px]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow">
        <div className="flex flex-col justify-between w-full h-full gap-[20px]">
          <div className="flex flex-row justify-between">
            <span className="text-[20px] font-medium">{t('nextBurn')}</span>
            <div className='relative'>
              <Tooltip
                additionalClassNames="right-[0px] top-[20px] w-[250px]"
                text={<>
                  Previous buybacks accumulated approximately 7.8m $LOCK (7.8% of total supply), all of which will be burnt.<br />
                  A portion will be burnt each week over time until this happens, in addition to 20% of the Fallen Wizard Toll, which will be added to the burn each week.
                </>}
              >
                <QuestionMarkSvg className="w-[18px] h-[18px]" />
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-[10px] justify-center items-center">
                <Image
                  src={LockTokenIcon1}
                  className="w-[42px] h-[42px]"
                  alt="LockTokenIcon1"
                />
                <span className="text-[50px] font-medium rainbow-text">
                  {Humanize.formatNumber(parseFloat(burnAmount))}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#A0AEC0]">
                (
                {formatter.format(
                  Math.round(tvl),
                )}{' '}
                $USD)
              </span>
            </div>
            <span className="text-[22px] font-medium rainbow-text">
              {t('getsBurnedIn')}
            </span>
            <div className="flex flex-row justify-center items-center gap-[10px]">
              <div className="w-[44px] h-[44px] flex flex-col justify-between items-center">
                <span className="text-[20px] font-medium">
                  {countdown.days}
                </span>
                <span className="text-[#A0AEC0] text-[12px] font-semibold">
                  {t('days')}
                </span>
              </div>
              <div className="w-[44px] h-[44px] flex flex-col justify-between items-center">
                <span className="text-[20px] font-medium">
                  {countdown.hours}
                </span>
                <span className="text-[#A0AEC0] text-[12px] font-semibold">
                  {t('hours')}
                </span>
              </div>
              <div className="w-[44px] h-[44px] flex flex-col justify-between items-center">
                <span className="text-[20px] font-medium">
                  {countdown.mins}
                </span>
                <span className="text-[#A0AEC0] text-[12px] font-semibold">
                  {t('mins')}
                </span>
              </div>
              <div className="w-[44px] h-[44px] flex flex-col justify-between items-center">
                <span className="text-[20px] font-medium">
                  {countdown.secs}
                </span>
                <span className="text-[#A0AEC0] text-[12px] font-semibold">
                  {t('sec')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextBurnBox
