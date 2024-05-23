const startingpoints = [
  'H1',
  'H1',
  'F1',
  'F1',
  'F1',
  'P1',
  'P1',
  'P1',
  'P1',
  'P1',
] as const

export const getRandomHoldingPoint = () => {
  const index = Math.floor(Math.random() * startingpoints.length)
  return startingpoints[index]
}
