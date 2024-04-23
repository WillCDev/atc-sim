const domain = 'localhost:3001'
export const httpEndpoint = `http://${domain}`
export const wsEndpoint = `ws://${domain}`

// const domain = 'atc-sim.onrender.com'
// export const httpEndpoint = `https://${domain}`
// export const wsEndpoint = `wss://${domain}`

export interface Response<T> {
  data: T
  error?: string
}
