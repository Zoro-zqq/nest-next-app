import { Controller, Get, Post, Body, Query, UseGuards, Req, Session } from '@nestjs/common'
import { AuthService } from './auth.service.ts'
import { AuthGuard } from '@nestjs/passport'
import { NoAuth } from '../../decorator/customize.ts'
import { LoginDto } from './dto/login-auth.dto.ts'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @Post('login')
  login(@Body() user: LoginDto, @Session() session) {
    return this.authService.login(user, session)
  }

  @NoAuth()
  @Post('refreshToken')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<any> {
    return this.authService.refreshToken(refreshToken)
  }
}
