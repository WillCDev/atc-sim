import { FC } from 'react'

import { MainPageWrapper } from './HomePage.styles'
import { TowerControlConsole } from './ControlConsole'

export const HomePage: FC = () => (
  <MainPageWrapper>
    <TowerControlConsole />
  </MainPageWrapper>
)
