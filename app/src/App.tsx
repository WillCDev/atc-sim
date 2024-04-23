import { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { WsSync } from './WSSync'
import { FancyText } from './constants/styles'
import { CenteredContent } from './components/CenteredContent'
import { Spacer } from './components/Spacer'
import { Button } from './components/Button'
import { useSimStore } from './store'
import { ControlConsole } from './pages/ControlConsole'
import { CoordinatorConsole } from './pages/CoordinatorConsole'
import { LoadingPage } from './pages/LoadingPage'

export const App: FC = () => {
  const selectedRole = useSimStore((state) => state.selectedRole)
  const setSelectedRole = useSimStore((state) => state.setSelectedRole)
  const isConnected = useSimStore((state) => state.connected)

  return (
    <ThemeProvider theme={{}}>
      <WsSync />
      {!isConnected && <LoadingOverlay text="Connecting to server..." />}
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

        {selectedRole === 'coordinator' && <CoordinatorConsole />}
      </MainPageWrapper>
    </ThemeProvider>
  )
}

const Text = styled.span`
  ${FancyText}
`

const MainPageWrapper = styled.main`
  overflow: hidden;
  height: 100vh;
  background: #d3edff;
`

const LoadingOverlay = styled(LoadingPage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`
