import { Button } from '@/components/Button'
import { DisplayItem } from '@/components/ItemDisplay'
import { FC } from 'react'
import styled from 'styled-components'

export const DepAtis: FC = () => (
  <Wrapper>
    <div style={{ display: 'flex', marginBottom: 1 }}>
      <StyledButton>&#8679;</StyledButton>
      <DisplayItem value="N" color="white" bold />
      <StyledButton>&#8681;</StyledButton>
    </div>
    DEP ATIS
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  text-align: center;
  font-weight: bold;
  margin-left: 10px;
`

const StyledButton = styled(Button)`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0 8px;
`
