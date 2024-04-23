import { DisplayItem } from '@/components/ItemDisplay'
import { useSimStore } from '@/store'
import { FC } from 'react'
import styled from 'styled-components'

export const Runways: FC = () => {
  const { arr, dep } = useSimStore((state) => ({
    arr: state.arrivalRunway,
    dep: state.departureRunway,
  }))

  return (
    <Wrapper>
      <label style={{ gridArea: '1 / 1 / 2 / 2' }}>ARR</label>
      <ArrivalRunway value={arr} color="white" bold />

      <label style={{ gridArea: '2 / 1 / 3 / 2' }}>DEP</label>
      <DepartureRunway value={dep} color="white" bold />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  text-align: center;
  font-weight: bold;
  margin-left: 10px;
  & label {
    position: relative;
    top: 2px;
  }
`

const ArrivalRunway = styled(DisplayItem)`
  grid-area: 2 / 1 / 3 / 2;
`

const DepartureRunway = styled(DisplayItem)`
  grid-area: 2 / 2 / 3 / 3;
`
