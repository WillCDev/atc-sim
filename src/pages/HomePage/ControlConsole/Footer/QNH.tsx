import { FC } from 'react'
import styled from 'styled-components'
import { DisplayItem } from '@/components/ItemDisplay'
import { useSimStore } from '@/store'

export const QNH: FC = () => {
  const qnh = useSimStore((state) => state.qnh)

  return (
    <Wrapper>
      <DisplayItem value={qnh} color="white" bold grow />
      QNH
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.6rem;
  text-align: center;
  font-weight: bold;
  gap: 3px;
  flex-basis: 100px;
  margin-left: 20px;
`
