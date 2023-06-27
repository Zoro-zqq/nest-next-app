import { Module } from '@nestjs/common'
import { AuthService } from './auth.service.ts'
import { AuthController } from './auth.controller.ts'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from '../../../shared/constants/env.ts'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy.ts'
import { RedisCacheService } from '../redisCache/redisCache.service.ts'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET
      // signOptions: { expiresIn: null } // e.g. 7d, 24h
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisCacheService]
})
export class AuthModule {}
