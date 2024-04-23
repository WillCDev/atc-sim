export const sids = [
  'KUXEM_1R',
  'EKLAD_1R',
  'SONEX_1R',
  'POL_5R',
  'SANBA_1R',
  'LISTO_2R',
] as const

export const getRandomSid = () => {
  return sids[Math.floor(Math.random() * sids.length)]
}
