import styled from 'styled-components'
import { PanelCSS } from '@/constants/styles'

export const Button = styled.button<{ $size?: 'sm' | 'md' | 'lg' }>`
  ${PanelCSS}
  cursor: pointer;
  padding: ${({ $size }) =>
    $size === 'lg' ? '1rem 2rem' : $size === 'md' ? '0.75rem 1.5rem' : '0.25rem 0.75rem'};
  font-size: ${({ $size }) =>
    $size === 'lg' ? '1.5rem' : $size === 'md' ? '1.25rem' : '1rem'};
`
