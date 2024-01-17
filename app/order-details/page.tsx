'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CardComponent, Portal } from 'houdini-react-sdk'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OrderContent } from '@/components/OrderDetailsComponents'
import { ResponsivePage } from '@/components/ResponsivePage'
import { XLetterSvg } from '@/components/Svg'
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
  const [isOpen, setIsOpen] = useState(false)

  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

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

  return (
    <>
      {widgetMode ? (
        <OrderContent t={t} />
      ) : (
        <>
          <ResponsivePage>
            <OrderContent t={t} />
          </ResponsivePage>
        </>
      )}
    </>
  )
}
