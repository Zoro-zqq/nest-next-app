import { IsString, IsNumber } from 'class-validator'

export class DocumentForceSave {
  /**
   * 状态码
   */
  @IsNumber()
  code: number

  /**
   * 消息
   */
  @IsString()
  message?: string
}
