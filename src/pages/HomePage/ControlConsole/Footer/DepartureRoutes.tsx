import { DisplayItem } from '@/components/ItemDisplay'
import { Colors } from '@/constants/styles'
import { FC } from 'react'
import styled from 'styled-components'

export const DepartureRoutes: FC = () => (
  <Wrapper>
    <DisplayItem value="MONTY" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="EKLAD" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="KUXEM" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="05R" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="POL" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="DESIG" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="SONEX" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="THL" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="SAMBA" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <DisplayItem value="LISTO" color={Colors.green} basis="100px" fontSize="0.5rem" />
    <span />
    <DisplayItem value="MAC" color={Colors.green} basis="100px" fontSize="0.5rem" />
  </Wrapper>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1px;
  text-align: center;
  margin-left: 8px;
  font-size: 0.6rem;
`
