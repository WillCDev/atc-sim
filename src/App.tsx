import { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import { HomePage } from './pages/HomePage'

export const App: FC = () => (
  <ThemeProvider theme={{}}>
    <HomePage />
  </ThemeProvider>
)
