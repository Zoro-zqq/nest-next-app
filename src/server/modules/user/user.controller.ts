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
  Session,
  Query
} from '@nestjs/common'
import { UserService } from './user.service.ts'
import { CreateUserDto } from './dto/create-user.dto.ts'
import { UpdateUserDto } from './dto/update-user.dto.ts'
import type { Request, Response } from 'express'
import { NoAuth } from '../../decorator/customize.ts'
import { getCaptcha } from '../../lib/utils.ts'
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //注册
  @NoAuth()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto, @Session() session) {
    return this.userService.register(createUserDto, session)
  }
  //获取登录验证码
  @NoAuth()
  @Get('getCaptcha')
  getCaptcha(@Session() session, @Res() res) {
    const { text, data } = getCaptcha()
    session.captcha = text.toLowerCase()
    res.type('image/svg+xml')
    res.send({
      data,
      code: 200,
      message: '请求成功'
    })
  }

  //邮箱注册验证
  @NoAuth()
  @Get('emailRegisterVerify')
  emailRegisterVerify(@Query() query) {
    return this.userService.emailRegisterVerify(query)
  }

  // 发送邮箱验证码（4位数， 暂时只用于找回密码）
  @NoAuth()
  @Post('sendEmailVerifyCode')
  sendEmailVerifyCode(@Body('email') email: string) {
    return this.userService.sendEmailVerifyCode(email)
  }

  //找回密码
  @NoAuth()
  @Post('retrievePassword')
  retrievePassword(@Body() body) {
    return this.userService.retrievePassword(body)
  }

  //退出登录
  @Delete('logout')
  loginOut(@Session() session) {
    return this.userService.loginOut(session)
  }

  @Get(':userId')
  getUserInfo(@Param('userId') userId: string) {
    return this.userService.getUserInfo(userId)
  }
}
