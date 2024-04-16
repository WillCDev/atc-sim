import { FC } from 'react'

import { MainPageWrapper } from './HomePage.styles'
import { ControlConsole } from './ControlConsole'
import { useSimStore } from '@/store'
import { CenteredContent } from '@/components/CenteredContent'
import { FancyText } from '@/constants/styles'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Spacer } from '@/components/Spacer'
import { postSimData } from '@/api/sim'

export const HomePage: FC = () => {
  const selectedRole = useSimStore((state) => state.selectedRole)
  const setSelectedRole = useSimStore((state) => state.setSelectedRole)

  const setDefaultSimData = () => {
    postSimData({
      simType: 'tower',
      arrivalRunway: '23R',
      departureRunway: '23R',
      qnh: '1014',
      started: true,
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
