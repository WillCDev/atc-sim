import { FC, useState } from 'react'
import { useSimStore } from '@/store'
import { CenteredContent } from '@/components/CenteredContent'
import { endSim } from '@/api/sim'
import { FancyText } from '@/constants/styles'
import styled from 'styled-components'
import { Spacer } from '@/components/Spacer'
import { Button } from '@/components/Button'
import { FlightManager } from './FlightManager'
import { SimSetup } from './SimSetup'

export const CoordinatorConsole: FC = () => {
  const [hasAcceptedSim, setHasAcceptedSim] = useState(false)
  const simStarted = useSimStore((state) => state.started)

  if (!simStarted) {
    return <SimSetup onSimStart={() => setHasAcceptedSim(true)} />
  }

  return hasAcceptedSim ? (
    <FlightManager />
  ) : (
    <CenteredContent>
      <Text>Sim already active</Text>
      <h2>Do you want to continue the Sim?</h2>
      <Spacer $size="20px" $vertical />
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button $size="md" onClick={() => setHasAcceptedSim(true)}>
          Yes
        </Button>
        <Button $size="md" onClick={endSim}>
          No
        </Button>
      </div>
    </CenteredContent>
  )
}

const Text = styled.span`
  ${FancyText}
`
