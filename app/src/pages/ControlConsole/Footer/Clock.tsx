import { FC, memo, useEffect, useState } from 'react'
import { DisplayItem } from '@/components/ItemDisplay'
import { format } from 'date-fns'

const Clock: FC = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <DisplayItem value={format(time, 'HHmm:ss')} bold fontSize="1.4rem" />
}

export const ClockDisplay = memo(Clock)
