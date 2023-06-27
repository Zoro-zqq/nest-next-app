import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../lib/log4js.ts'
import moment from 'moment'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    // 用于接收主动发错的错误信息
    const { message, code } = exception.getResponse() as any

    const logFormat = `
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n
    `
    Logger.info(logFormat)
    const errorResponse = {
      data: {
        error: message
      }, // 获取全部的错误信息
      url: request.originalUrl, // 错误的url地址
      code: code || status,
      timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
      path: request.url,
      error: 'Bad Request',
      message
    }
    if (code == 404 || status == 404) {
      return response.status(status).redirect('https://zorq.top/404.html')
    }
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status).json(errorResponse)
  }
}
