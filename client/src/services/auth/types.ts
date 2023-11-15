export type AuthResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type AuthRequest = {
  email: string
  password: string
}

export type User = {
  email: string
  isActivated: boolean
  _id: string
}