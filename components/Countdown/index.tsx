import React, { useEffect, useState } from 'react'

import { OrderStatusResult } from '@/types/backend/typegql/entities/abstract/order.status'

interface CountdownProps {
  order: OrderStatusResult
  setMinutes?: (value: number) => void
}

export const Countdown: React.FC<CountdownProps> = ({
  order: { status, fixed, anonymous, created },
  setMinutes,
}) => {
  const [timerMinutes, setTimerMinutes] = useState(30) // default to 30 to avoid marking it expired by default
  const [timerSeconds, setTimerSeconds] = useState(0)

  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (status === 0) {
      let minutes = 30
      if (fixed) {
        minutes = 15
        if (anonymous) {
          minutes = 5
        }
      }
      const expiredTimeInDate = new Date(
        new Date(created).getTime() + minutes * 60 * 1000,
      )
      const countdownDate = expiredTimeInDate.getTime()
      const id = setInterval(() => {
        const now = new Date().getTime()

        const distance = countdownDate - now
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (distance < 0) {
          clearInterval(id)
          setTimerMinutes(0)
          setTimerSeconds(0)
          setExpired(true)

          if (setMinutes) {
            setMinutes(0)
          }
        } else {
          setTimerMinutes(minutes)
          setTimerSeconds(seconds)

          if (setMinutes) {
            setMinutes(minutes)
          }
        }
      }, 1000)
      return () => clearInterval(id)
    }
  }, [created, status])

  return (
    <>
      Send your funds in by:{' '}
      {expired ? (
        <span className="font-bold text-red-400">Expired</span>
      ) : (
        <span
          className={
            timerMinutes < 3
              ? 'font-bold text-red-400'
              : 'font-bold text-amber-400'
          }
        >
          {timerMinutes.toString().padStart(2, '0')} :{' '}
          {timerSeconds.toString().padStart(2, '0')}
        </span>
      )}
    </>
  )
}
