import { CSSProperties, FC } from 'react'
import { DisplayItem } from '../ItemDisplay'
import { Colors } from '@/constants/styles'
import { FlightStripLocation, useFlightStore } from '@/store'

interface Props {
  style?: CSSProperties
  data: FlightStripData
  location: FlightStripLocation
}

export const CallSign: FC<Props> = ({ style, data, location }) => {
  const selectedStrip = useFlightStore((state) => state.selectedFlightStrip)
  const selectCallSign = useFlightStore((state) => state.setSelectedFlightStrip)
  const moveFlightstrip = useFlightStore((state) => state.moveFlightStrip)

  const selectedCallsign = selectedStrip?.callsign
  const isSelected = selectedCallsign === data.callsign

  const handleClick = () => {
    if (!selectedCallsign) {
      return selectCallSign({ ...data, location })
    }
    if (selectedCallsign === data.callsign) {
      return selectCallSign(null)
    }

    moveFlightstrip({
      source: { callsign: selectedCallsign, location: selectedStrip.location },
      dest: { callsign: data.callsign, location },
    })
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
