export interface CustomerProfile {
  id: string
  totalOrders: number
  totalSpent: number
  lastLogin: Date
  dateOfBirth?: Date | null
  gender?: 'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY' | null
  cartItemsCount?: number
}

export interface CustomerUser {
  id: string
  name: string
  email: string
  image: string | null
  emailVerified: boolean
  role: 'CUSTOMER'
  profile: CustomerProfile | null
}

export interface LoginSuccessResponse {
  success: true
  message: string
  token: string | null
  customer: CustomerUser
}

export interface LoginErrorResponse {
  success: false
  error: string
  issues?: Array<{
    code: string
    path: (string | number)[]
    message: string
  }>
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse

export interface RegisterSuccessResponse {
  success: true
  message: string
  token: string | null
  customer: CustomerUser
}

export interface RegisterErrorResponse {
  success: false
  error: string
  issues?: Array<{
    code: string
    path: (string | number)[]
    message: string
  }>
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse
