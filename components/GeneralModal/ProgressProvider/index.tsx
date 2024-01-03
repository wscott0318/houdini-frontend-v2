import React, { useEffect } from 'react'

import { DigitalLockup } from '../DigitalLockup'

interface ProgressProviderProps {
  valueStart: number
  valueEnd: number
  text: string
}

const ProgressProvider = ({
  valueStart,
  valueEnd,
  text,
}: ProgressProviderProps) => {
  const [value, setValue] = React.useState(valueStart)
  useEffect(() => {
    const interval = setInterval(() => {
      if (value == valueEnd) {
        clearInterval(interval)
      } else {
        if (valueStart < valueEnd) setValue((value) => value + 1)
        else setValue((value) => value - 1)
      }
    }, 5)
    return () => clearInterval(interval)
  }, [value, valueEnd, valueStart])

  return <DigitalLockup value={value} status={false} text={text} />
}

export default ProgressProvider
