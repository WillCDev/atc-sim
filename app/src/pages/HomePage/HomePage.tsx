import { FC } from 'react'

import { MainPageWrapper } from './HomePage.styles'
import { ControlConsole } from './ControlConsole'
import { useSimStore } from '@/store'
import { CenteredContent } from '@/components/CenteredContent'
import { FancyText } from '@/constants/styles'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'

export const HomePage: FC = () => {
  const selectedRole = useSimStore((state) => state.selectedRole)
  const setSelectedRole = useSimStore((state) => state.setSelectedRole)
  const setSimData = useSimStore((state) => state.setSimData)

  const setDefaultSimData = () => {
    setSimData({
      simType: 'tower',
      arrivalRunway: '23R',
      departureRunway: '23R',
      qnh: '1014',
      simStarted: true,
    })
    setSelectedRole('controller')
  }

  return (
    <MainPageWrapper>
      {!selectedRole && (
        <CenteredContent>
          <Text>Select a Role</Text>
          <Spacer $size="20px" $vertical />
          <div style={{ display: 'flex', gap: '32px' }}>
            <Button $size="lg" onClick={() => setSelectedRole('controller')}>
              Controller
            </Button>

            <Button $size="lg" onClick={() => setSelectedRole('coordinator')}>
              Coordinator
            </Button>
          </div>
        </CenteredContent>
      )}
      {selectedRole === 'controller' && <ControlConsole />}

      {selectedRole === 'coordinator' && (
        <CenteredContent>
          <Text>Not Yet Implemented</Text>
          <Spacer $size="20px" $vertical />
          <Button $size="lg" onClick={setDefaultSimData}>
            Start Default Sim
          </Button>
        </CenteredContent>
      )}
    </MainPageWrapper>
  )
}

const Text = styled.span`
  ${FancyText}
`

// const Icon = styled.div`
//   width: 150px;
//   height: 150px;
//   position: absolute;
//   top: 20%;
//   background-size: cover;
//   background-image: url('/images/airport.png');
// `
