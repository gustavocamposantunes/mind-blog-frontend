export type HttpRemoteResponse<T> = {
  statusCode: number
  data?: T
  error?: string
}
