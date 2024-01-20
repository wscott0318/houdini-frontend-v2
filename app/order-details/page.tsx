'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { OrderContent } from '@/components/OrderDetailsComponents'
import { ResponsivePage } from '@/components/ResponsivePage'

export default function OrderDetails() {
  const [isOpen, setIsOpen] = useState(false)

  const searchParams = useSearchParams()

  const widgetMode = searchParams.get('widgetMode')

  const { t } = useTranslation()

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
