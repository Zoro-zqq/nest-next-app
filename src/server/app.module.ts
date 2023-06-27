import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { NextMiddleware } from './modules/next/next.middleware.ts'
import { PcModule } from './modules/pc/pc.module.ts'
import { UserModule } from './modules/user/user.module.ts'
import { AuthModule } from './modules/auth/auth.module.ts'
import { EmailModule } from './modules/email/email.module.ts'
import { JwtAuthGuard } from './guard/jwt-auth.guard.ts'
import { MyWebSocketModule } from './modules/websocket/websocket.module.ts'
import { PrismaModule } from './modules/prisma/prisma.module.ts'
import { RedisCacheModule } from './modules/redisCache/redisCache.module.ts'
import { APP_GUARD } from '@nestjs/core'
import { CoopModule } from './modules/coop/coop.module.ts'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from '../shared/constants/env.ts'
import { AuthService } from './modules/auth/auth.service.ts'
import { ChatModule } from './modules/chat/chat.module.ts'
import { OnlyofficeModule } from './modules/onlyoffice/onlyoffice.module'
import { DocumentModule } from './modules/document/document.module'
import { GlobalModule } from './modules/global/global.module.ts'

@Module({
  imports: [
    PcModule,
    UserModule,
    AuthModule,
    EmailModule,
    MyWebSocketModule,
    PrismaModule,
    RedisCacheModule,
    CoopModule,
    JwtModule.register({
      secret: JWT_SECRET
      // signOptions: { expiresIn: null } // e.g. 7d, 24h
    }),
    ChatModule,
    OnlyofficeModule,
    DocumentModule,
    GlobalModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AuthService
  ]
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    AppModule.handleAssets(consumer)
  }

  // 注意：这里很重要，_next*是nextjs静态资源请求的前缀，这里这么处理是将静态资源相关的请求由Nest转交个Next处理
  private static handleAssets(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware).forRoutes({
      path: '.next*',
      method: RequestMethod.GET
    })
  }
}
