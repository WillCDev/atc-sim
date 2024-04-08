import { FC } from 'react'

export const ArrivalStrip: FC<{ data: FlightStripData }> = ({ data }) => {
  return <div>{data.callsign}</div>
}
