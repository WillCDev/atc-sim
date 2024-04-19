import { FC } from 'react'
import { CenteredContent } from '@/components/CenteredContent'
import { postSimData } from '@/api/sim'
import { Button } from '@/components/Button'
import { useSimStore } from '@/store'

interface Props {
  onSimStart: () => void
}

export const SimSetup: FC<Props> = ({ onSimStart }) => {
  const applySimData = useSimStore((state) => state.setSimData)

  const setSimData = (dualRunway?: boolean) => {
    const simData = {
      simType: 'tower',
      arrivalRunway: '23R',
      departureRunway: dualRunway ? '23L' : '23R',
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
        <Button $size="md" onClick={() => setSimData()}>
          Single Runway
        </Button>
        <Button $size="md" onClick={() => setSimData(true)}>
          Dual Runway
        </Button>
      </div>
    </CenteredContent>
  )
}
