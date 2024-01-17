import React, { useEffect } from 'react'

import { DigitalLockup } from '../DigitalLockup'

interface ProgressProviderProps {
  text: string
  value: number
}

const ProgressProvider = ({
  value,
  text,
}: ProgressProviderProps) => {
  return <DigitalLockup value={value} status={false} text={text} />
}

export default ProgressProvider
