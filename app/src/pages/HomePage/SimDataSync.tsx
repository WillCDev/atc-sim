import { getSimData } from '@/api/sim'
import { CenteredContent } from '@/components/CenteredContent'
import { useSimStore } from '@/store'
import { memo, useEffect, useRef, useState } from 'react'

const SimDataSyncComponent = () => {
  const timer = useRef<number>()
  const [error, setError] = useState<string>()
  const setSimData = useSimStore((state) => state.setSimData)

  const retrySimData = async (timeout: number) => {
    clearTimeout(timer.current)
    timer.current = undefined

    timer.current = window.setTimeout(async () => {
      try {
        const { data, error } = await getSimData()
        if (error) {
          setError(error)
        } else if (!data || !data.started) {
          return retrySimData(5000)
        } else
          setSimData({
            arrivalRunway: data.arrivalRunway,
            departureRunway: data.departureRunway,
            qnh: data.qnh.toString(),
            simStarted: data.started,
            simType: data.simType,
          })
      } catch (err: unknown) {
        return retrySimData(5000)
      }
    }, timeout)
  }

  useEffect(() => {
    retrySimData(0)
    return () => {
      clearTimeout(timer.current)
      timer.current = undefined
    }
  }, [])

  if (error)
    return (
      <CenteredContent>
        <h1>{error}</h1>
      </CenteredContent>
    )
  return null
}

export const SimDataSync = memo(SimDataSyncComponent)
