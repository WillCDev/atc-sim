import { FC } from 'react'
import { CenteredContent } from '@/components/CenteredContent'
import { StripBay } from '@/components/StripBay'
import { InfoStrip } from '@/components/InfoStrip'
import { useFlightStore, useSimStore } from '@/store'
import { FlightStripLocation } from '@/types'
import styled from 'styled-components'
import { Colors, PanelCSS } from '@/constants/styles'
import { endSim } from '@/api/sim'
import { Button } from '@/components/Button'
import { generateFlight } from './utils.ts/generateFlight'
import { createPendingFlight } from '@/api/flights'

const defaultItemProps = { width: '220px', height: '30px', fontSize: '1rem' } as const

export const FlightManager: FC = () => {
  const { arrivalRunway, departureRunway, qnh, simType } = useSimStore()
  const flights = useFlightStore((state) => Object.values(state.flights))
  const pendingFlights = useFlightStore((state) => Object.values(state.pendingFlights))

  const isDualRunway = arrivalRunway !== departureRunway
  const arrivals = flights.filter((flight) => flight.type === 'arrival')
  const departures = flights.filter((flight) => flight.type === 'departure')

  const generateArrival = () => {
    const flightData = generateFlight('arrival', qnh, isDualRunway)
    createPendingFlight(flightData)
  }

  const generateDeparture = () => {
    const flightData = generateFlight('departure', qnh, isDualRunway)
    createPendingFlight(flightData)
  }

  return (
    <CenteredContent>
      <Wrapper>
        <StripBay
          strips={pendingFlights.map((flight) => flight.callsign)}
          location={FlightStripLocation.UNASSIGNED}
        >
          <InfoStrip
            items={
              simType === 'tower'
                ? [
                    {
                      value: `${isDualRunway ? 'Dual Runway' : 'Single Runway'}`,
                      ...defaultItemProps,
                    },
                    {
                      value: `${arrivals.length} Arrivals in SIM`,
                      ...defaultItemProps,
                    },
                    {
                      value: `${departures.length} Departures in SIM`,
                      ...defaultItemProps,
                    },
                    {
                      value: `${pendingFlights.length} Pending Flights`,
                      ...defaultItemProps,
                    },
                  ]
                : [
                    { value: 'Radar', ...defaultItemProps },
                    { value: `${arrivals.length} Flights in SIM`, ...defaultItemProps },
                    {
                      value: `${pendingFlights.length} Pending Flights`,
                      ...defaultItemProps,
                    },
                  ]
            }
            buttons={[
              {
                value: 'End Sim',
                color: Colors.red,
                onClick: endSim,
                ...defaultItemProps,
              },
            ]}
          />
          <div style={{ display: 'flex' }}>
            <GenerateButton $size="md" onClick={generateArrival}>
              Generate Arrival
            </GenerateButton>
            {simType === 'tower' && (
              <GenerateButton $size="md" onClick={generateDeparture}>
                Generate Departure
              </GenerateButton>
            )}
          </div>
        </StripBay>
      </Wrapper>
    </CenteredContent>
  )
}

const Wrapper = styled.div`
  ${PanelCSS}
  background-color: ${Colors.lightSkyBlue};
  width: 100%;
  max-width: 750px;
  height: 100%;
  max-height: 600px;
`

const GenerateButton = styled(Button)`
  flex: 1;
  flex-basis: 100%;
`
