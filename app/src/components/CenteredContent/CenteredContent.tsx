import styled from 'styled-components'

export const CenteredContent = styled.div<{ $align?: 'left' | 'center' | 'right' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: ${({ $align = 'center' }) => $align};
  overflow: auto;
`
