export const NativeType: Array<string> = [
  'span',
  'select',
  'input',
  'string',
  'textarea',
  'image',
  'radio',
  'datetime',
  'date',
  'time',
  'switch',
  'number'
]
export const PREFIX = 'sheet-'

export interface UserInfo {
  userId?: string | number
  name?: string
  email?: string
  avatar?: string
  desc?: string
  roles?: number
  token?: string
  createdAt?: string | Date
}

export interface AuthState {
  userInfo: UserInfo
  token: string
  refreshToken: string
  isLogin: boolean
}
export interface LoginParams {
  email: string
  password: string
  captcha: string | number
}
