import { useEffect, useState } from 'react'

import EaseOutCubic from '../utils/EaseOutCubic'

const useCountUp = (target: number): number => {
  const [count, setCount] = useState(0)

  const CountUp = () => {
    let StartTime = 0
    const duration = 2000

    const animate = (timeStamp: number): void => {
      if (!StartTime) {
        StartTime = timeStamp
      }
      const runTime = timeStamp - StartTime
      const relativeProgress = runTime / duration
      const easeProgress = EaseOutCubic(relativeProgress)
      const currentCount = Math.floor(target * Math.min(easeProgress, 1))
      setCount(currentCount)
      if (runTime < duration) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    CountUp()
  }, [target])
  return count
}

export default useCountUp
