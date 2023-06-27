import { RedisCacheService } from './redisCache.service.ts'
import { Global, Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { REDIS_CONFIG } from '../../../shared/constants/env.ts'
import { readFileSync } from 'fs'
import { join } from 'path'
@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: typeof redisStore,
          host: REDIS_CONFIG.host,
          port: REDIS_CONFIG.port,
          db: REDIS_CONFIG.db, //目标库,
          ttl: REDIS_CONFIG.ttl,
          auth_pass: REDIS_CONFIG.password, // 密码,没有可以不写
          tls: {
            key: readFileSync(join(__dirname, './secerts/zorq.top.key')),
            cert: readFileSync(join(__dirname, './secerts/zorq.top.pem'))
          }
        }
      }
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
