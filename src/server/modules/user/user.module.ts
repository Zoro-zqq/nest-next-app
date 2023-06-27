import { Module } from '@nestjs/common'
import { UserService } from './user.service.ts'
import { UserController } from './user.controller.ts'
import { EmailService } from '../email/email.service.ts'
import { RedisCacheService } from '../redisCache/redisCache.service.ts'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, EmailService, RedisCacheService]
})
export class UserModule {}
