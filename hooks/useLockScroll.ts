import { useEffect } from 'react'

export const useLockScroll = (lock: boolean): void => {
  useEffect(() => {
    const toggleScrollLock = () => {
      if (lock) {
        document.body.classList.add('overflow-y-hidden')
      } else {
        document.body.classList.remove('overflow-y-hidden')
      }
    }

    toggleScrollLock()

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [lock])
}
