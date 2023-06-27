import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'

import { PcService } from './pc.service.ts'

import type { Request, Response } from 'express'

import { NextService } from '../next/next.service.ts'

import { NoAuth } from '../../decorator/customize.ts'

@Controller('pc')
export class PcController {
  constructor(private readonly pcService: PcService, private readonly next: NextService) {}

  @Get() @NoAuth() getPcIndex(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc', { title: '首页' }, req, res)
  }

  @Get('login') @NoAuth() loginPage(@Req() req: Request, @Res() res: Response) {
    // 把原本由Nest处理的主页转交给next
    return this.next.render('/login', { title: '登录页' }, req, res)
  }

  @Get('register') @NoAuth() getRegisterIndex(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/register', { title: '注册页' }, req, res)
  }

  @Get('forgetPassword') @NoAuth() getForgetPasswordIndex(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return this.next.render('/pc/forgetPassword', req, res)
  }

  @Get('workflow') @NoAuth() getWorkFlow(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/workflow', req, res)
  }

  @Get('sheetDesigner') @NoAuth() getSheetDesigner(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/sheetDesigner', req, res)
  }

  @Get('myBlog') @NoAuth() getMyBlog(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/myBlog', req, res)
  }

  @Get('onlyOffice') @NoAuth() getOnlyOffice(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/onlyOffice', req, res)
  }
  @Get('information') @NoAuth() getInformation(@Req() req: Request, @Res() res: Response) {
    return this.next.render('/pc/information', req, res)
  }
}
