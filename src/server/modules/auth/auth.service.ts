import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from './../prisma/prisma.service.ts'
import { LoginDto } from './dto/login-auth.dto.ts'
import { RedisCacheService } from '../redisCache/redisCache.service.ts'
import { cryptoPassword } from '../../lib/utils.ts'
import { PROJECT_NAME } from '../../../shared/constants/env.ts'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService
  ) {}
  async login(user: LoginDto, session) {
    const { email, password, captcha } = user
    //登录验证码不正确
    if (session.captcha != captcha.toLowerCase()) {
      throw new BadRequestException('验证码不正确！')
    }
    const userInfo = await this.prismaService.user.findUnique({ where: { email } })

    if (!userInfo) {
      throw new BadRequestException('用户名不正确！')
    }
    if (userInfo.status === -1) {
      throw new BadRequestException('用户还未注册！')
    }
    if (`${PROJECT_NAME}${cryptoPassword(password)}` !== userInfo.password) {
      throw new BadRequestException('密码错误！')
    }
    const res = {
      token: this.jwtService.sign(
        { userId: userInfo.id, role: userInfo.role },
        {
          expiresIn: '1d'
        }
      ),
      refreshToken: this.jwtService.sign(
        { type: 'refresh', id: userInfo.id },
        {
          expiresIn: '7d'
        }
      ),
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar,
      roles: userInfo.role,
      createdAt: userInfo.created_at
    }
    session.userId = userInfo.id
    await this.redisCacheService.cacheSet(userInfo.id, res.token, 24 * 60 * 60 * 1000)
    await this.redisCacheService.cacheSet(
      `refresh_${userInfo.id}`,
      res.refreshToken,
      7 * 24 * 60 * 60 * 1000
    )
    return res
  }

  validateUser(userId: string) {
    return this.prismaService.user.findUnique({ where: { id: userId } })
  }

  async refreshToken(refreshToken: string) {
    if (refreshToken) {
      try {
        //处理jwt信息
        const decodeRefreshToken: { type: string; id: string } = await this.jwtService.verify(
          refreshToken
        )
        const { id, type } = decodeRefreshToken
        const REDIS_REFRESH_TOKEN = await this.redisCacheService.cacheGet(`${type}_${id}`) // 获取redis中储存的refreshToken

        if (refreshToken !== REDIS_REFRESH_TOKEN) {
          // 判断接收的refreshToken是否和redis保存的一致
          throw new BadRequestException('refreshToken 已过期')
        }
        // 获取用户信息
        const userInfo = await await this.prismaService.user.findUnique({ where: { id } })
        // 生成新的ACCESS_TOKEN、REFRESH_TOKEN
        const newAccessToken = this.jwtService.sign(
          { userId: userInfo.id, role: userInfo.role },
          {
            expiresIn: '1d'
          }
        )
        const res = {
          token: newAccessToken,
          userId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.avatar,
          roles: userInfo.role,
          createdAt: userInfo.created_at
        }
        await this.redisCacheService.cacheSet(userInfo.id, res.token, 24 * 60 * 60 * 1000)
        return res
      } catch (err) {
        throw new BadRequestException(err)
      }
    } else {
      throw new BadRequestException('没有refreshToken')
    }
  }
}
