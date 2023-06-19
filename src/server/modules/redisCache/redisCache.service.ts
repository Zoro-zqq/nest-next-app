import { Injectable, Inject } from '@nestjs/common'
import type { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async cacheSet(key: string, value: string, ttl: number) {
    await this.cacheManager.set(key, value, ttl)
  }

  async cacheGet(key: string) {
    return await this.cacheManager.get(key)
  }

  async cacheRemove(key: string) {
    await this.cacheManager.del(key)
  }

  async cacheReset() {
    await this.cacheManager.reset()
  }
}
