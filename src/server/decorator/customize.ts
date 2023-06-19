import { SetMetadata } from '@nestjs/common'
import { role } from '../../shared/constants/enum.ts'

export const NoAuth = () => SetMetadata('no-auth', true)

// 装饰器Roles SetMetadata将装饰器的值缓存
export const ROLES_KEY = 'roles'
export const Roles = (roles: role) => SetMetadata(ROLES_KEY, roles)
