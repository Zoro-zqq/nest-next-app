import { IsNumber, IsString } from 'class-validator'
export class OnlyofficeCallback {
  /**
   * 返回 0 表示成功，否则表示失败
   */
  @IsNumber()
  error: number
}

export class OnlyofficeForceSave {
  /**
   * 状态码
   */
  @IsNumber()
  code: number

  /**
   * 状态码
   */
  @IsNumber()
  error: number

  /**
   * 消息
   */
  @IsString()
  message?: string
}
