import styled from 'styled-components'

export const Spacer = styled.div<{ $size: string; $vertical?: boolean }>`
  width: ${({ $size, $vertical }) => ($vertical ? 'initial' : $size)};
  height: ${({ $size, $vertical }) => ($vertical ? $size : 'initial')};
`
