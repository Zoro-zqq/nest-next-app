import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({ message: 'email不能为空' })
  email: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsNotEmpty({ message: '验证码不能为空' })
  captcha: string
}
