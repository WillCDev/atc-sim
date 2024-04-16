import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { HomePage } from './pages/HomePage'
import { WsSync } from './WSSync'

export const App: FC = () => (
  <ThemeProvider theme={{}}>
    <WsSync />
    <HomePage />
  </ThemeProvider>
)
