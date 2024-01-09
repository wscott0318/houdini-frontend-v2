'use client'

import { useQuery } from '@apollo/client'
import { AnimatePresence, motion } from 'framer-motion'
import { CardComponent, Portal } from 'houdini-react-sdk'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OrderContent } from '@/components/OrderDetailsComponents'
import { ResponsivePage } from '@/components/ResponsivePage'
import { XLetterSvg } from '@/components/Svg'
import { MULTI_STATUS_QUERY } from '@/lib/apollo/query'
import { useWindowSize } from '@/utils/hooks/useWindowSize'

const animation = {
  hidden: {
    y: '100%',
    transition: { duration: 0.3 },
  },
  visible: {
    y: '0',
    transition: { duration: 0.3 },
  },
}

export default function OrderDetails() {
  const [isOpen, setIsOpen] = useState(true)
  const [orders, setOrders] = useState([])

  const searchParams = useSearchParams()

  const { t } = useTranslation()

  const [width] = useWindowSize()

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const { loading, data } = useQuery(MULTI_STATUS_QUERY, {
    variables: {
      multiId: searchParams.get('multiId'),
    },
    fetchPolicy: 'no-cache',
    pollInterval: 3000,
  })

  useEffect(() => {
    if (!loading && data) {
      setOrders(data.multiStatus)
    }
  }, [data, loading])

  return (
    <>
      <ResponsivePage>
        <OrderContent loading={loading} orders={orders} t={t} />
      </ResponsivePage>

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
                    <div className="text-center w-full lg:text-[46px] text-[20px] lg:leading-[75.43px] font-semibold whitespace-nowrap">
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
