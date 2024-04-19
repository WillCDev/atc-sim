import { FC } from 'react'
import { Button } from '../Button'
import { Colors } from '@/constants/styles'
import { FlightStripData } from '@/types'
import styled from 'styled-components'
import { createFlight, deletePendingFlight } from '@/api/flights'

interface Props {
  data: FlightStripData
}

export const CoordinatorButtons: FC<Props> = ({ data }) => {
  const handleRemove = () => {
    deletePendingFlight(data.callsign)
  }

  const handleTransfer = () => {
    deletePendingFlight(data.callsign)
    createFlight(data)
  }

  return (
    <>
      <TransferButton onClick={handleTransfer}>Transfer</TransferButton>
      <RemoveButton onClick={handleRemove}>Remove</RemoveButton>
    </>
  )
}

const TransferButton = styled(Button)`
  background-color: ${Colors.green};
`

const RemoveButton = styled(Button)`
  background-color: ${Colors.red};
`
