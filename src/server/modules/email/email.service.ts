import { Injectable } from '@nestjs/common'
import { sendCode, sendRegisterEmail } from '../../lib/nodemailer.ts'
import { PrismaService } from '../prisma/prisma.service.ts'

@Injectable()
export class EmailService {
  constructor(private readonly prismaService: PrismaService) {}
  //发送注册成功链接到邮箱
  public sendRegisterUrlEmail(info) {
    return sendRegisterEmail(info)
  }
  //发送验证码到邮箱
  public async sendCodeEmail(info) {
    try {
      await this.testEmailCodeLimit(info.email)
      await this.prismaService.emailVerifyQueue.create({
        data: info
      })
      return sendCode(info)
    } catch (e) {
      throw e
    }
  }
  //发送验证码是否达到上限
  private async testEmailCodeLimit(email) {
    const resultQueue: {
      id: number
      created_at: Date
    }[] = await this.prismaService.emailVerifyQueue.findMany({
      where: {
        email,
        vcode: {
          gt: 0
        },
        created_at: {
          gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          lt: new Date()
        }
      },
      select: {
        id: true,
        created_at: true
      },
      orderBy: {
        id: 'desc'
      }
    })
    //一天不超过5条验证码
    if (resultQueue.length >= 5) {
      throw '一天不超过5条验证码'
    }
    //一分钟之内只能发一条
    if (
      resultQueue &&
      resultQueue[0] &&
      Date.now() - resultQueue[0]!.created_at.getTime() <= 60000
    ) {
      throw '一分钟之内只能发一条'
    }
  }

  //验证校验码是否正确
  public async verifyVCode(email, vcode) {
    //两分钟内的验证码有效
    return await this.prismaService.emailVerifyQueue.findFirst({
      where: {
        email,
        vcode,
        created_at: {
          gt: new Date(Date.now() - 2 * 60 * 1000),
          lt: new Date()
        }
      },
      select: {
        vcode: true,
        created_at: true
      }
    })
  }
}
