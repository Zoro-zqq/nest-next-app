import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import isMobile from 'is-mobile'
import { Reflector } from '@nestjs/core'
import { ExtractJwt } from 'passport-jwt'
import { RedisCacheService } from '../modules/redisCache/redisCache.service.ts'
import { AuthService } from '../modules/auth/auth.service.ts'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //在这里取metadata中的no-auth，得到的会是一个bool
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler())
    if (noAuth) return true
    const req = context.switchToHttp().getRequest()
    const token = await ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    if (!token) {
      throw new UnauthorizedException('没有登录用户信息')
    }
    // const refreshToken = req.header('Authorization').split(' ')[1];
    const payload = this.jwtService.verify(token)
    const cacheToken = await this.redisCacheService.cacheGet(payload.userId)
    if (!cacheToken) {
      throw new UnauthorizedException('token 已过期')
    }
    if (token != cacheToken) {
      throw new UnauthorizedException('token不正确')
    }
    const user = await this.authService.validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException('身份验证失败')
    }
    this.redisCacheService.cacheSet(user.id, token, 24 * 60 * 60 * 1000)
    return true
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const ctx = context.switchToHttp()
    const res = ctx.getResponse()
    const req = ctx.getRequest()
    // 是否为移动端（平板电脑不算做移动端）
    const isMobileDevice = isMobile({ ua: req, tablet: false })
    // 是否为平板电脑
    const isTabletDevice = !isMobileDevice && isMobile({ ua: req, tablet: true })
    const isPC = !isMobileDevice && !isTabletDevice
    //pc端才需要登陆验证
    if ((err || !user) && isPC) {
      if (!req.path.includes('api')) {
        res.redirect('/pc/login')
      } else {
        throw new UnauthorizedException(err)
      }
    }
    return user
  }
}
