import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { role } from '../../shared/constants/enum.ts'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorator/customize.ts'

@Injectable()
export class RbacGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1--普通用户（只能查看）
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 1.通过反射获取到装饰器的权限
    const requireRole = this.reflector.get<role>(ROLES_KEY, context.getHandler())

    // 2.获取req拿到鉴权后的用户数据
    const req = context.switchToHttp().getRequest()

    // 3.通过用户数据从数据查询权限
    const userRole = req.user.role

    if (userRole > requireRole) {
      throw new ForbiddenException('对不起，您无权操作')
    }
    return true
  }
}
