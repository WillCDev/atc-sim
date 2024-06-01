import styled from 'styled-components'
import { Colors, PanelCSS } from '@/constants/styles'

export const Button = styled.button<{
  $size?: 'inherit' | 'sm' | 'md' | 'lg'
  $color?: string
}>`
  ${PanelCSS}
  cursor: pointer;
  padding: ${({ $size }) =>
    $size === 'lg'
      ? '1rem 2rem'
      : $size === 'md'
      ? '0.75rem 1.5rem'
      : $size === 'inherit'
      ? 'inherit'
      : '0.25rem 0.75rem'};
  font-size: ${({ $size }) =>
    $size === 'lg'
      ? '1.5rem'
      : $size === 'md'
      ? '1.25rem'
      : $size === 'inherit'
      ? 'inherit'
      : '1rem'};
  background-color: ${(props) => props.$color || Colors.lightGrey};
`
