import { useSimStore } from '@/store'
import { CenteredContent } from '@/components/CenteredContent'
import { TowerControlConsole } from './TowerControlConsole'
import { LoadingPage } from '../LoadingPage'

export const ControlConsole = () => {
  const isSimulatorRunning = useSimStore((state) => state.started)
  const simType = useSimStore((state) => state.simType)

  if (!isSimulatorRunning) {
    return <LoadingPage text="Waiting for SIM to start..." />
  }

  if (simType === 'tower') {
    return <TowerControlConsole />
  }

  return <CenteredContent>Radar Sim not yet implements</CenteredContent>
}
