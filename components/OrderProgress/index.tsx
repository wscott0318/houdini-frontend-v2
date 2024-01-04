'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ORDER_STATUS } from '@/utils/constants'

import ProgressProvider from '../GeneralModal/ProgressProvider'

export const OrderProgress = ({ order }: { order: any }) => {
  const { t } = useTranslation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [orderReceivedProgress, setOrderReceivedProgress] = useState(0)
  const [fundsReceivedProgress, setFundsReceivedProgress] = useState(0)
  const [anonymizingProgress, setAnonymizingProgress] = useState(0)
  const [convertingProgress, setConvertingProgress] = useState(0)
  const [completedProgress, setCompletedProgress] = useState(0)

  useEffect(() => {
    clearAnimation()

    switch (order?.status) {
      case ORDER_STATUS.NEW:
      case ORDER_STATUS.WAITING:
        animateProgressBar(setOrderReceivedProgress, 100)
        break
      case ORDER_STATUS.CONFIRMING:
        setOrderReceivedProgress(100)
        animateProgressBar(setFundsReceivedProgress, 100)
        break
      case ORDER_STATUS.EXCHANGING:
        setOrderReceivedProgress(100)
        setFundsReceivedProgress(100)
        animateProgressBar(setConvertingProgress, 100)
        break
      case order?.anonymous === true && ORDER_STATUS.ANONYMIZING:
        setOrderReceivedProgress(100)
        setFundsReceivedProgress(100)
        setConvertingProgress(100)
        animateProgressBar(setAnonymizingProgress, 100)
        break
      case ORDER_STATUS.FINISHED:
        setOrderReceivedProgress(100)
        setFundsReceivedProgress(100)
        setAnonymizingProgress(100)
        setConvertingProgress(100)
        animateProgressBar(setCompletedProgress, 100)
        break
    }

    return () => clearAnimation()
  }, [order?.status])

  const clearAnimation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const animateProgressBar = (setProgress: any, target: any) => {
    const totalDuration = 300000 // 5 minutes in milliseconds
    const updateInterval = 5000 // update every 5 seconds for smoother animation
    const totalSteps = totalDuration / updateInterval
    const incrementPerStep = target / totalSteps

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress: any) => {
        const newProgress = prevProgress + incrementPerStep
        if (newProgress >= target) {
          clearInterval(intervalRef?.current as unknown as number)
          return target
        }
        return newProgress
      })
    }, updateInterval)
  }
  return (
    <>
      <ProgressProvider
        text={t('orderDetailsOrderReceived')}
        valueStart={0}
        valueEnd={orderReceivedProgress}
      />
      <ProgressProvider
        text={t('orderDetailsFundsReceived')}
        valueStart={0}
        valueEnd={fundsReceivedProgress}
      />
      <ProgressProvider
        text={t('orderDetailsConverting')}
        valueStart={0}
        valueEnd={convertingProgress}
      />
      {order?.anonymous === true ? (
        <ProgressProvider
          text={t('orderDetailsAnonymizing')}
          valueStart={0}
          valueEnd={anonymizingProgress}
        />
      ) : null}
      <ProgressProvider
        text={t('orderDetailsCompleted')}
        valueStart={0}
        valueEnd={completedProgress}
      />
    </>
  )
}
