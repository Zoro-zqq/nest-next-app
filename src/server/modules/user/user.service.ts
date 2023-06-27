import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.ts'
import { CreateUserDto } from './dto/create-user.dto.ts'
import { cryptoPassword, randomNumber } from '../../lib/utils.ts'
import { RedisCacheService } from '../redisCache/redisCache.service.ts'
import { PROJECT_NAME } from '../../../shared/constants/env.ts'
import { EmailService } from '../email/email.service.ts'
import { randomUUID } from 'crypto'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly redisCacheService: RedisCacheService
  ) {}

  //邮箱注册
  async register(createUserDto: CreateUserDto, session) {
    //session失效时间内已发送链接至邮箱
    if (session && session.verify_key) {
      throw new BadRequestException('已发送注册链接至邮箱，请注意查收')
    }

    const { name, email, password, captcha } = createUserDto
    //登录验证码不正确
    if (session.captcha != captcha.toLowerCase()) {
      throw new BadRequestException('验证码不正确！')
    }
    const hasUser = await this.findUserByEmail(email)
    //若已存在该用户 状态不为-1未注册
    if (hasUser && hasUser.status != -1) {
      throw new BadRequestException('用户已存在')
    }

    //注册时发送邮箱具体逻辑
    //生成校验码
    const verify_key = randomUUID()
    console.log('verify_key' + verify_key)

    try {
      await this.emailService.sendRegisterUrlEmail({ name, email, verify_key })
      //发送邮件成功
      session.verify_key = verify_key
      //未提交注册过 or 未注册成功的 更新verify_key
      await this.prismaService.user.upsert({
        where: {
          email
        },
        update: {
          verify_key
        },
        create: {
          email,
          password: `${PROJECT_NAME}${cryptoPassword(password)}`,
          name,
          status: -1,
          verify_key
        }
      })
      return '注册成功!!!'
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  //通过邮箱/手机号查找用户信息
  async findUserByEmail(email) {
    return await this.prismaService.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        password: true
      }
    })
  }

  //发送邮箱注册链接
  async emailRegisterVerify({ name, verify_key, email }) {
    const userInfo = await this.prismaService.user.findFirst({
      where: {
        email,
        name,
        verify_key
      }
    })
    if (userInfo) {
      //注册成功
      await this.prismaService.user.update({
        where: {
          email
        },
        data: {
          verify_key: '',
          status: 1
        }
      })
      return '注册成功'
    } else {
      throw new BadRequestException('用户不存在')
    }
  }

  async findOrCreateUser(info) {
    const { name, email, password, role = 0, status = -1 } = info
    const userInfo = await this.findUserByEmail(email)
    if (userInfo) {
      return userInfo
    } else {
      return await this.prismaService.user.create({
        data: {
          name,
          email,
          password: `${PROJECT_NAME}${cryptoPassword(password)}`,
          role,
          status
        }
      })
    }
  }

  // 发送邮箱验证码（4位数， 暂时只用于找回密码）
  async sendEmailVerifyCode(email: string) {
    const hasUser = await this.prismaService.user.findFirst({
      where: {
        email,
        status: 1
      }
    })
    //该邮箱的用户不存在
    if (!hasUser) {
      throw new BadRequestException('用户不存在')
    } else {
      const vcode = randomNumber(4)
      //检测验证码，发送校验码到邮箱
      try {
        return await this.emailService.sendCodeEmail({ email, vcode })
      } catch (e) {
        throw new BadRequestException(String(e) + '请求失败！')
      }
    }
  }

  //找回密码
  async retrievePassword(body) {
    const { email, vcode, newPassword } = body
    try {
      const hasUser = await this.prismaService.user.findFirst({
        where: {
          email,
          status: 1
        }
      })
      //该邮箱的用户不存在
      if (!hasUser) {
        throw new BadRequestException('用户不存在')
      } else {
        //判断验证码是否有效
        const vaildCode = await this.emailService.verifyVCode(email, vcode)
        if (vaildCode) {
          //更新密码
          await this.prismaService.user.update({
            where: {
              email
            },
            data: {
              password: `${PROJECT_NAME}${cryptoPassword(newPassword)}`
            }
          })
          return 'ok'
        } else {
          throw new BadRequestException('验证码错误')
        }
      }
    } catch (e) {
      throw new BadRequestException(String(e) + '请求失败！')
    }
  }

  //退出登录
  async loginOut(session) {
    if (session && session.userId) {
      this.redisCacheService.cacheRemove(session.userId)
    }
    return 'ok'
  }

  async getUserInfo(userId) {
    const userInfo = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        role: true,
        created_at: true
      }
    })
    return {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar,
      status: userInfo.status,
      roles: userInfo.role,
      createdAt: userInfo.created_at
    }
  }
}
