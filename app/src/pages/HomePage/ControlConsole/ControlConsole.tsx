import styled from 'styled-components'
import { useSimStore } from '@/store'
import { FancyText, fadeIn } from '@/constants/styles'
import { CenteredContent } from '@/components/CenteredContent'
import { TowerControlConsole } from './TowerControlConsole'

export const ControlConsole = () => {
  const isSimulatorRunning = useSimStore((state) => state.started)
  const simType = useSimStore((state) => state.simType)

  if (!isSimulatorRunning) {
    return (
      <LoadingWrapper>
        <SimLoadingText>Waiting for SIM to start...</SimLoadingText>
      </LoadingWrapper>
    )
  }

  if (simType === 'tower') {
    return <TowerControlConsole />
  }

  return <CenteredContent>Radar Sim not yet implements</CenteredContent>
}

const LoadingWrapper = styled(CenteredContent)`
  background-image: url('/images/loading_plane.gif');
  background-size: cover;
  background-position: center;
  animation: ${fadeIn} 500ms ease-in-out;
`

const SimLoadingText = styled.h1`
  top: -25%;
  position: relative;
  ${FancyText}
`
