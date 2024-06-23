import { useCallback, useEffect, useState } from 'react'

export function useThrottleCallback(fn: () => void, ms: number) {
  const [isReady, setIsReady] = useState(true)

  const callback = useCallback(() => {
    if (isReady) {
      fn()
      setIsReady(false)
    }
  }, [fn, isReady])

  useEffect(() => {
    if (isReady === false) {
      setTimeout(() => {
        setIsReady(true)
      }, ms)
    }
  }, [isReady, ms])

  return callback
}
