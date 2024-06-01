import { FC } from 'react'
import { CenteredContent } from '@/components/CenteredContent'
import { Button } from '@/components/Button'
import { SimState, useSimStore } from '@/store'
import { postSimData } from '@/api/sim'

interface Props {
  onSimStart: () => void
}

export const SimSetup: FC<Props> = ({ onSimStart }) => {
  const applySimData = useSimStore((state) => state.setSimData)

  const setSimData = (
    args: Pick<SimState, 'simType' | 'arrivalRunway' | 'departureRunway'>
  ) => {
    const simData = {
      ...args,
      qnh: 1014,
      started: true,
    } as const

    applySimData(simData)
    onSimStart()
    postSimData(simData)
  }

  return (
    <CenteredContent>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button
          $size="md"
          onClick={() =>
            setSimData({ simType: 'tower', arrivalRunway: '23R', departureRunway: '23R' })
          }
        >
          Tower: Single Runway
        </Button>
        <Button
          $size="md"
          onClick={() =>
            setSimData({ simType: 'tower', arrivalRunway: '23R', departureRunway: '23L' })
          }
        >
          Tower: Dual Runway
        </Button>
        <Button
          $size="md"
          onClick={() =>
            setSimData({ simType: 'radar', arrivalRunway: '23R', departureRunway: null })
          }
        >
          Radar
        </Button>
      </div>
    </CenteredContent>
  )
}
