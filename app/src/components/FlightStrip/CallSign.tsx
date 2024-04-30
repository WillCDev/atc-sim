import { CSSProperties, FC } from 'react'
import { DisplayItem } from '../ItemDisplay'
import { Colors } from '@/constants/styles'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripData, FlightStripLocation } from '@/types'
import { isStripAllowedInBay } from '../StripBay'

interface Props {
  style?: CSSProperties
  data: FlightStripData
  location: FlightStripLocation
  disabled?: boolean
}

export const CallSign: FC<Props> = ({ style, data, location, disabled }) => {
  const isDualRunway = useSimStore((state) => state.isDualRunway)
  const selectedStrip = useFlightStore((state) => state.selectedFlightStrip)
  const selectCallSign = useFlightStore((state) => state.setSelectedFlightStrip)
  const moveFlightstrip = useFlightStore((state) => state.moveFlightStrip)

  const selectedCallsign = selectedStrip?.callsign
  const isSelected = selectedCallsign === data.callsign

  const handleClick = () => {
    if (disabled) return
    if (!selectedCallsign) {
      return selectCallSign({ ...data, location })
    }
    if (selectedCallsign === data.callsign) {
      return selectCallSign(null)
    }
    if (isStripAllowedInBay(selectedStrip.type, location, isDualRunway)) {
      moveFlightstrip({ callsign: data.callsign, location })
    }
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
