import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service.ts'
import { JWT_SECRET } from '../../../shared/constants/env.ts'
import { RedisCacheService } from '../redisCache/redisCache.service.ts'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly redisCacheService: RedisCacheService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true
    })
  }

  async validate(req, payload: { userId: string; role: number | string }) {
    return payload
  }
}
