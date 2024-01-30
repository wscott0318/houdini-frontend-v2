// import { t } from 'i18next'
import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'
import { DownloadSvg, LoadingSvg } from '@/components/Svg'

import ButtonGroup from '../ButtonGroup'
import ListLine, { IGroupedData } from './ListLine'
import { HISTORY_QUERY } from '@/lib/apollo/query'
import { useQuery } from '@apollo/client'

// import CheckBox from './CheckBox'
// import Timeframe from './Timeframe'

const HistoryModalBox = () => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const [selectedEventType, setSelectedEventType] = useState(t('all'))

  const { data, loading: loadingHistory } = useQuery(HISTORY_QUERY, {
    variables: {
      address,
    },
    fetchPolicy: 'no-cache',
    pollInterval: 3000,
  })

  const eventTypes = {
    Staked: t('Staked'),
    Withdrawn: t('Withdrawn'),
    RewardPaid: t('RewardPaid'),
    RequestUnlock: t('RequestUnlock'),
    FallenWizardFee: t('FallenWizardFee'),
    MultiplierChanged: t('MultiplierChanged'),
  }

  const reverseMapping = Object.keys(eventTypes).reduce(
    (acc: any, key: any) => {
      acc[(eventTypes as any)[key]] = key
      return acc
    },
    {},
  )

  const handleSelectType = (translatedType: any) => {
    const originalType = reverseMapping[translatedType] || translatedType
    setSelectedEventType(originalType)
  }


  const events: IGroupedData[] = []
  const allEvents = data?.history;
  if (allEvents?.length) {
    allEvents.map((v: any) => {
      // console.log(v)
      events.push({
        type: v.name,
        date: new Date(v.timestamp).toLocaleString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          },
        ),
        amount: Math.round(
          v.value,
        ).toString(),
        addressUp: v.user,
        addressDown: v.hash,
      })
    })
  }


  // const [headValue, setHeadValue] = useState(0)

  let filteredEvents = events

  if (selectedEventType !== t('all')) {
    filteredEvents = events.filter((event) => event?.type === selectedEventType)
  }

  const availableEventTypes = Array.from(
    new Set(events.map((event) => event?.type)),
  )
  const buttonNames = [t('all'), ...availableEventTypes.map((type) => t(type))]

  // if (!address) {
  //   return (
  //     <div className="p-4 mb-4 w-[100%] text-sm text-white rounded-lg bg-orange-900 dark:bg-gray-800 dark:text-red-400">
  //       Please connect your wallet first
  //     </div>
  //   )
  // }
  return (
    <div className="flex flex-col items-center backdrop-blur-[46px] custom-modal-step2-drop-shadow rounded-[28px]  xl:w-[1071px] p-[1px] z-[1]">
      <div className="w-full h-full p-[30px] rounded-[28px] custom-balances-box-inner-shadow relative">
        {/* <div className="flex flex-row gap-[10px] absolute right-[30px] top-[30px] justify-center items-center">
          <button className="h-[56px] rounded-[16px] justify-center items-center flex bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] px-[20px] py-[12px]">
            <DownloadSvg className="w-[20px] h-[20px]" />
          </button>
          <Timeframe />
        </div> */}

        <div className="flex flex-col gap-[20px] overflow-x-auto max-w-[60vw] min-h-[500px]">
          <span className="rainbow-text text-[18px] font-medium">History</span>
          <ButtonGroup names={buttonNames} onSelect={handleSelectType} />
          <table>
            <thead >
              <th className="text-[18px] lg:ml-[50px] leading-normal font-medium">
                Type
              </th>
              <th className="text-[18px] leading-normal font-medium">
                Date
              </th>
              <th className="text-[18px] leading-normal font-medium">
                Amount
              </th>
              <th className="text-[18px] leading-normal font-medium">
                Address
              </th>
            </thead>
            <tbody>
              {!filteredEvents.length ? (
                <span className="text-slate-400">{t('noEvents')}</span>
              ) : (
                filteredEvents.map((data, index) => (
                  <ListLine key={index} data={data} index={index} length={filteredEvents.length} />
                ))
              )}
            </tbody>
          </table>
          <span className="text-[12px] font-semibold leading-[14px] text-center text-[#A0AEC0]">
            Please note: transaction times displayed are UTC
          </span>
          <div className="w-full flex items-center justify-center">
            {loadingHistory ? (
              <a className="w-[96px] h-[48px] rounded-[15px] bg-gradient-to-b from-[#6C5DD3] to-[#4154C9] items-center justify-center flex">
                <LoadingSvg className="w-[16px] h-[16px]" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModalBox
