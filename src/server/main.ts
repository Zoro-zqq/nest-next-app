import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module.ts'
import { PrismaClientExceptionFilter } from './filter/prisma-client-exception.filter.ts'
import { HttpExceptionFilter } from './filter/http-exception.filter.ts'
import { NextModule } from './modules/next/next.module.ts'
import { PORT, PROJECT_DOMAIN } from '../../src/shared/constants/env.ts'
import { logger } from './middleware/logger.middleware.ts'
import { json, urlencoded } from 'express'
import { TransformInterceptor } from './interceptor/transform.interceptor.ts'
// import { AllExceptionsFilter } from './filter/any-exception.filter'
import session from 'express-session'
import { NestExpressApplication } from '@nestjs/platform-express'
// import { JwtAuthGuard } from './guard/jwt-auth.guard'
import { join } from 'path'
// import { readFileSync } from 'fs'
import { APP_ONLYOFFICE_SERVER } from '../../src/shared/constants/env.ts'

async function bootstrap() {
  // const httpsOptions = {
  //   key: readFileSync(join(__dirname, './secrets/9547427_zorq.top.key')),
  //   cert: readFileSync(join(__dirname, './secrets/9547427_zorq.top.pem'))
  // }

  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions
  // })
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(json()) // For parsing application/json
  app.use(urlencoded({ extended: true })) // For parsing application/x-www-form-urlencoded
  //
  app.useStaticAssets(join(__dirname, '../../public'))
  //允许office服务跨域
  app.enableCors({
    origin: APP_ONLYOFFICE_SERVER
  })
  //session
  app.use(
    session({
      resave: false,
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 2 months
        secure: process.env.NODE_ENV === 'production'
      }
    })
  )
  // 监听所有的请求路由，并打印日志
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe())
  //
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  //auth guard
  // app.useGlobalGuards(new JwtAuthGuard())
  const { httpAdapter } = app.get(HttpAdapterHost)
  // 过滤处理 prismas 异常
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  // 过滤处理 HTTP 异常
  app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalFilters(new AllExceptionsFilter())
  // 使next初始化
  await app
    .get(NextModule)
    .prepare()
    .then(() => {
      app.listen(PORT)
    })
  console.log(`☞ Started on ${PROJECT_DOMAIN}:${PORT}`)
}
bootstrap()
