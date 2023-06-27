import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Logger } from '../lib/log4js.ts'

/**
 * 全局WebSocket服务响应拦截器
 * 该Interceptor在网关中通过装饰器 @UseInterceptors 使用
 * 仅处理WebSocket服务成功响应拦截，异常是不会进入该拦截器
 */
@Injectable()
export class WsServiceResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // 进入该拦截器，说明没有异常，使用成功返回
        const logFormat = `
        websocket!!!!!!!!!!
        Response data:\n ${JSON.stringify(data)}\n
    `
        Logger.info(logFormat)
        Logger.access(logFormat)
        return {
          data,
          code: 200,
          message: '请求成功'
        }
      })
    )
  }
}
