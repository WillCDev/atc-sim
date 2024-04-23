import { CSSProperties, FC } from 'react'
import { DisplayItem } from '../ItemDisplay'
import { Colors } from '@/constants/styles'
import { useFlightStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'

interface Props {
  style?: CSSProperties
  data: FlightStripData
  location: FlightStripLocation
  disabled?: boolean
}

export const CallSign: FC<Props> = ({ style, data, location, disabled }) => {
  const selectedStrip = useFlightStore((state) => state.selectedFlightStrip)
  const selectCallSign = useFlightStore((state) => state.setSelectedFlightStrip)
  const moveFlightstrip = useFlightStore((state) => state.moveFlightStrip)

  const selectedCallsign = selectedStrip?.callsign
  const isSelected = selectedCallsign === data.callsign

  const handleClick = () => {
    console.log('CallSign handleClick', data.callsign, location, selectedCallsign)
    if (disabled) return
    if (!selectedCallsign) {
      return selectCallSign({ ...data, location })
    }
    if (selectedCallsign === data.callsign) {
      return selectCallSign(null)
    }

    moveFlightstrip({ callsign: data.callsign, location })
  }

  return (
    <DisplayItem
      style={style}
      color={isSelected ? Colors.blue : Colors.white}
      value={data.callsign ?? ''}
      align="left"
      bold
      onClick={handleClick}
    />
  )
}
