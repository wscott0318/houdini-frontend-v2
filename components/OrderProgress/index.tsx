import { AnimatePresence, motion } from 'framer-motion'
import { CardComponent, Portal } from 'houdini-react-sdk'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useWindowSize } from '@/hooks'
import { ORDER_STATUS } from '@/utils/constants'
import {
  animation,
  loadFromLocalStorage,
  saveToLocalStorage,
} from '@/utils/helpers'

import ProgressProvider from '../GeneralModal/ProgressProvider'
import { XLetterSvg } from '../Svg'

interface OrderProgressProps {
  order: any
}

export const OrderProgress: React.FC<OrderProgressProps> = ({ order }) => {
  const { t } = useTranslation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [width] = useWindowSize()

  const loadProgressInitialState = () => {
    const storedData = loadFromLocalStorage(order?.houdiniId) || {}
    return {
      orderReceivedProgress: storedData.orderReceivedProgress || 0,
      fundsReceivedProgress: storedData.fundsReceivedProgress || 0,
      anonymizingProgress: storedData.anonymizingProgress || 0,
      convertingProgress: storedData.convertingProgress || 0,
      completedProgress: storedData.completedProgress || 0,
    }
  }

  const initialProgress = loadProgressInitialState()

  const [orderReceivedProgress, setOrderReceivedProgress] = useState<number>(
    initialProgress.orderReceivedProgress,
  )
  const [fundsReceivedProgress, setFundsReceivedProgress] = useState<number>(
    initialProgress.fundsReceivedProgress,
  )
  const [anonymizingProgress, setAnonymizingProgress] = useState<number>(
    initialProgress.anonymizingProgress,
  )
  const [convertingProgress, setConvertingProgress] = useState<number>(
    initialProgress.convertingProgress,
  )
  const [completedProgress, setCompletedProgress] = useState<number>(
    initialProgress.completedProgress,
  )

  // State variables to control the start of each progress bar
  const [startOrderReceived, setStartOrderReceived] = useState<boolean>(true)
  const [startFundsReceived, setStartFundsReceived] = useState<boolean>(false)
  const [startConverting, setStartConverting] = useState<boolean>(false)
  const [startAnonymizing, setStartAnonymizing] = useState<boolean>(false)
  const [startCompleting, setStartCompleting] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const loadInitialState = () => {
    const storedData = loadFromLocalStorage(order?.houdiniId)
    if (storedData && typeof storedData.paid === 'boolean') {
      return storedData.paid
    }
    return false
  }

  const [isPaid, setIsPaid] = useState(
    loadInitialState() || order?.status >= ORDER_STATUS.CONFIRMING,
  )

  const fundsDuration = 10000
  const convertingDuration = 3 * 60 * 1000
  const anonymizingDuration = 20 * 60 * 1000
  const completingDuration = 10000

  const clearAnimation = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const animateProgressBar = (
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    target: number,
    duration: number,
  ): void => {
    clearAnimation()
    const updateInterval = 100
    const totalSteps = duration / updateInterval
    const incrementPerStep = target / totalSteps

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + incrementPerStep
        if (newProgress >= target) {
          clearInterval(intervalRef.current as unknown as number)
          return target
        }
        return newProgress
      })
    }, updateInterval)
  }

  useEffect(() => {
    clearAnimation()

    const orderStatus = order?.status

    if (orderStatus >= ORDER_STATUS.CONFIRMING) {
      setIsPaid(true)
    }

    if (startOrderReceived) {
      animateProgressBar(setOrderReceivedProgress, 100, 10000)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
      })
    }

    if (
      isPaid &&
      startOrderReceived &&
      startFundsReceived &&
      orderStatus < ORDER_STATUS.EXCHANGING
    ) {
      animateProgressBar(setFundsReceivedProgress, 100, fundsDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
      })
    }

    if (isPaid && startConverting && orderStatus < ORDER_STATUS.ANONYMIZING) {
      animateProgressBar(setConvertingProgress, 80, convertingDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
        convertingProgress: convertingProgress,
      })
      if (convertingProgress === 80) {
        setIsOpen(true)
      }
    } else if (startConverting) {
      animateProgressBar(setConvertingProgress, 100, convertingDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
        convertingProgress: convertingProgress,
      })
    }

    if (isPaid && startAnonymizing && orderStatus < ORDER_STATUS.FINISHED) {
      animateProgressBar(setAnonymizingProgress, 80, anonymizingDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
        convertingProgress: convertingProgress,
        anonymizingProgress: anonymizingProgress,
      })
      if (anonymizingProgress === 80) {
        setIsOpen(true)
      }
    } else if (startAnonymizing) {
      animateProgressBar(setAnonymizingProgress, 100, anonymizingDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
        convertingProgress: convertingProgress,
        anonymizingProgress: anonymizingProgress,
      })
    }

    if (startCompleting) {
      animateProgressBar(setCompletedProgress, 100, completingDuration)
      saveToLocalStorage(order?.houdiniId, {
        paid: isPaid,
        orderReceivedProgress: orderReceivedProgress,
        fundsReceivedProgress: fundsReceivedProgress,
        convertingProgress: convertingProgress,
        anonymizingProgress: anonymizingProgress,
        completedProgress: completedProgress,
      })
    }

    setStartOrderReceived(true)

    if (orderReceivedProgress === 100) {
      setStartFundsReceived(true)
    }
    if (orderStatus === ORDER_STATUS.CONFIRMING) {
      setOrderReceivedProgress(100)
      setStartFundsReceived(true)
      if (fundsReceivedProgress === 100) {
        setStartConverting(true)
      }
    } else if (orderStatus === ORDER_STATUS.EXCHANGING) {
      setOrderReceivedProgress(100)
      setFundsReceivedProgress(100)
      setStartConverting(true)
    } else if (orderStatus === ORDER_STATUS.ANONYMIZING) {
      setOrderReceivedProgress(100)
      setFundsReceivedProgress(100)
      setConvertingProgress(100)
      setStartAnonymizing(true)
    } else if (orderStatus === ORDER_STATUS.FINISHED) {
      setOrderReceivedProgress(100)
      setFundsReceivedProgress(100)
      setAnonymizingProgress(100)
      setConvertingProgress(100)
      setStartCompleting(true)
    }

    return () => clearAnimation()
  }, [
    isPaid,
    order?.status,
    startOrderReceived,
    startFundsReceived,
    startConverting,
    startAnonymizing,
    startCompleting,
    completedProgress,
    orderReceivedProgress,
    fundsReceivedProgress,
    convertingProgress,
    anonymizingProgress,
  ])

  return (
    <>
      <ProgressProvider text={'ORDER CREATED'} value={orderReceivedProgress} />
      <ProgressProvider
        text={t('orderDetailsFundsReceived')}
        value={fundsReceivedProgress}
      />
      <ProgressProvider
        text={t('orderDetailsConverting')}
        value={convertingProgress}
      />
      {order?.anonymous === true ? (
        <ProgressProvider
          text={t('orderDetailsAnonymizing')}
          value={anonymizingProgress}
        />
      ) : null}
      <ProgressProvider
        text={t('orderDetailsCompleted')}
        value={completedProgress}
      />

      <AnimatePresence>
        {isOpen ? (
          <Portal>
            <motion.div
              className="z-10 fixed left-0 top-0 w-screen h-screen"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              initial="hidden"
              exit="hidden"
              animate="visible"
              variants={animation}
            >
              <div
                onClick={(e) => {
                  e.preventDefault()
                  const target = e.target as HTMLElement
                  if (target.id === 'dropdownClickable') {
                    setIsOpen(false)
                  }
                }}
                className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 drop-shadow-2xl backdrop-blur-[5px]"
              >
                <div
                  id="dropdownClickable"
                  className="flex relative min-h-full items-end justify-center sm:items-center p-6 md:p-0"
                >
                  <CardComponent
                    widthClass={width > 1024 ? '540px' : '100%'}
                    heightClass={width > 1024 ? '212px' : '100%'}
                  >
                    <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75px] font-semibold whitespace-nowrap">
                      Taking a bit longer
                    </div>
                    <div className="text-center w-full lg:text-[17px] font-medium rainbow-text ">
                      Things are busier than usual
                    </div>
                    <XLetterSvg
                      onClick={() => {
                        setIsOpen(false)
                      }}
                      className="absolute top-6 right-6 fill-white w-3 h-3 hover:cursor-pointer"
                    />
                  </CardComponent>
                </div>
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  )
}
