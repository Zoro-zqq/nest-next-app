import { User } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsNotEmpty } from 'class-validator'

export class UserEntity implements User {
  id: string
  name: string
  @IsNotEmpty()
  email: string | null
  phone: bigint | null
  avatar: string | null
  @IsNotEmpty()
  password: string
  verify_key: string | null
  created_at: Date
  updated_at: Date | null
  deleted_at: Date | null
  @Transform(({ value }) => value.toNumber())
  role: number
  @Transform(({ value }) => value.toNumber())
  status: number

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
