import { Controller, Get, Req, Res } from '@nestjs/common'
import { NextService } from './next.service.ts'
import type { Request, Response } from 'express'
import isMobile from 'is-mobile'
import { NoAuth } from '../../decorator/customize.ts'

@Controller()
export class NextController {
  constructor(private readonly next: NextService) {}

  @Get()
  @NoAuth()
  getIndex(@Req() req: Request, @Res() res: Response) {
    // 是否为移动端（平板电脑不算做移动端）
    const isMobileDevice = isMobile({ ua: req, tablet: false })
    // 是否为平板电脑
    const isTabletDevice = !isMobileDevice && isMobile({ ua: req, tablet: true })
    let route = '/pc'
    if (isMobileDevice) {
      route = '/mobile'
    } else if (isTabletDevice) {
      route = '/tablet'
    }
    // 把原本由Nest处理的主页转交给next
    return this.next.render(route, req, res)
  }
}
