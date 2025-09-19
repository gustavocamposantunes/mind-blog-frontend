export interface AuthenticateUserModel {
  accessToken: string
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    image?: string
  }
}
