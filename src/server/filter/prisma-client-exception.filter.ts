import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import moment from 'moment'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT
        const message = exception.message.replace(/\n/g, '')
        response.status(status).json({
          code: status,
          message: message,
          timestamp: moment().format('yyyy-MM-DD HH:mm:ss')
        })
        break
      default:
        // 默认的500错误
        super.catch(exception, host)
        break
    }
  }
}
