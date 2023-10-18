import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const Portal: React.FC<{ children: ReactNode; target?: string }> = (
  props,
) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  const target = props.target || '#portal'

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(target)
    setMounted(true)
  }, [target])

  return mounted && ref.current
    ? createPortal(<div>{props.children}</div>, ref.current)
    : null
}
