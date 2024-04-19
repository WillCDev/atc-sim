const domain = 'localhost:3001'

export const httpEndpoint = `http://${domain}`
export const wsEndpoint = `ws://${domain}`

export interface Response<T> {
  data: T
  error?: string
}
