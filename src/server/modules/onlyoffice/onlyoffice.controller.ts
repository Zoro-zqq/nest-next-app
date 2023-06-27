import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common'
import { OnlyofficeService } from './onlyoffice.service'
import { NoAuth } from '../../decorator/customize'
import { OnlyofficeCallbackDto } from './dto/onlyoffice.dto'
import { OnlyofficeCallback } from './entity/onlyoffice.entity'

@Controller('api/onlyoffice')
export class OnlyofficeController {
  constructor(private readonly onlyofficeService: OnlyofficeService) {}

  @NoAuth()
  @Post('callback')
  // 这里表示成功的 statusCode 状态不能返回 201，否则会报错「这份文件无法保存。请检查连接设置或联系您的管理员」，因为在 Onlyoffice 如果 statusCode 不等于 200 认为是失败
  @HttpCode(HttpStatus.OK)
  async callback(@Body() body) {
    return await this.onlyofficeService.callback(body)
  }
}
