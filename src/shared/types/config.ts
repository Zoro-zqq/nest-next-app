export interface UserInfo {
  id: string
  name: string
  email?: string | null
  phone?: bigint | null
  avatar?: string | null
  password: string
  verify_key?: string | null
  created_at: Date
  updated_at?: Date | null
  deleted_at?: Date | null
  role: number
  status: number
}
declare type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type CreateUser = RequireAtLeastOne<
  Omit<UserInfo, 'id' | 'updated_at' | 'deleted_at'>,
  'phone' | 'email'
>
