import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsNotEmpty()
  @MaxLength(100)
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  status: number = 1

  @IsNotEmpty()
  role: number = 1
  @IsNotEmpty()
  captcha: string
  phone?: number | string
}
